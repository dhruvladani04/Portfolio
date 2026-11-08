// Server side of J.A.R.V.I.S.: everything that needs the Gemini API key.
// Used by the Netlify Functions in netlify/functions, by the local dev API
// (scripts/jarvis-dev-api.mjs) and by the evals — so all three exercise the
// same code. The key never leaves the server.

import { GoogleGenAI, Modality } from '@google/genai';
import {
  CHAT_FALLBACK_MODEL,
  CHAT_MODEL,
  LIVE_MODEL,
  SITE_TOOL_NAMES,
  VOICE_NAME,
  VOICE_SESSION_SECONDS,
  buildSystemInstruction,
  functionDeclarations,
  sanitizeContext,
} from '../../scripts/agent/config.mjs';

export const LIMITS = {
  turns: 16, // messages of history sent per chat request
  messageChars: 6000, // a pasted job description fits
  totalChars: 24000,
  toolRounds: 3,
};

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function geminiClient(apiKey = process.env.GEMINI_API_KEY?.trim()) {
  if (!apiKey) throw new HttpError(503, 'GEMINI_API_KEY is not configured');
  return new GoogleGenAI({ apiKey });
}

const declarationsFor = (kb) =>
  functionDeclarations({ projectIds: kb.projectIds, readmeIds: Object.keys(kb.readmes) });

// ---------- chat ----------

// Keeps only well-formed, size-limited text turns; the newest must be the
// visitor's. Older turns are dropped first when the total is too large.
export function parseChatBody(body) {
  if (!body || !Array.isArray(body.messages)) throw new HttpError(400, 'messages must be an array');
  let messages = body.messages
    .slice(-LIMITS.turns)
    .map((m) => ({
      role: m?.role === 'model' ? 'model' : 'user',
      text: typeof m?.text === 'string' ? m.text.slice(0, LIMITS.messageChars) : '',
    }))
    .filter((m) => m.text.trim());
  if (!messages.length || messages.at(-1).role !== 'user') {
    throw new HttpError(400, 'the last message must be from the visitor');
  }
  while (messages.length > 1 && messages.reduce((n, m) => n + m.text.length, 0) > LIMITS.totalChars) {
    messages = messages.slice(1);
  }
  // Gemini expects the conversation to open with a user turn.
  while (messages[0].role !== 'user') messages = messages.slice(1);
  return { messages, ...sanitizeContext({ page: body.page, audience: body.audience, mode: 'chat' }) };
}

// Answers a server-side tool call, or records a site action for the browser.
export function handleToolCall(call, kb, actions) {
  const args = call.args || {};
  if (call.name === 'getProjectDetails') {
    const readme = kb.readmes[args.id];
    return readme ? { readme } : { error: 'No README for that project; answer from the profile.' };
  }
  if (SITE_TOOL_NAMES.includes(call.name)) {
    actions.push({ name: call.name, args });
    return { status: "Done — it is opening in the visitor's browser." };
  }
  return { error: `Unknown tool ${call.name}` };
}

// Overloaded (503/500) or out of quota (429): worth one try on another model.
export function isRetryable(err) {
  const status = Number(err?.status || err?.code);
  return [429, 500, 503].includes(status) || /RESOURCE_EXHAUSTED|UNAVAILABLE|high demand|overloaded|INTERNAL/i.test(String(err?.message));
}

export async function runChat({ model = CHAT_MODEL, fallbackModel = CHAT_FALLBACK_MODEL, ...args }) {
  try {
    return await chatOnce({ ...args, model });
  } catch (err) {
    if (!fallbackModel || fallbackModel === model || !isRetryable(err)) throw err;
    return chatOnce({ ...args, model: fallbackModel });
  }
}

async function chatOnce({ ai, kb, messages, page, audience, now = new Date(), model }) {
  const config = {
    systemInstruction: buildSystemInstruction({ profile: kb.profile, page, audience, mode: 'chat', now }),
    tools: [{ functionDeclarations: declarationsFor(kb) }],
    temperature: 0.3,
    maxOutputTokens: 900,
  };
  const contents = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
  const actions = [];
  const texts = [];
  for (let round = 0; round < LIMITS.toolRounds; round++) {
    const res = await ai.models.generateContent({ model, contents, config });
    const content = res.candidates?.[0]?.content;
    const parts = content?.parts || [];
    const text = parts.filter((p) => p.text && !p.thought).map((p) => p.text).join('').trim();
    if (text) texts.push(text);
    const calls = parts.filter((p) => p.functionCall).map((p) => p.functionCall);
    if (!calls.length) break;
    // Replay the model turn unchanged (it carries thought signatures), then
    // answer every call in one user turn.
    contents.push(content);
    contents.push({
      role: 'user',
      parts: calls.map((c) => ({
        functionResponse: { id: c.id, name: c.name, response: handleToolCall(c, kb, actions) },
      })),
    });
  }
  return { text: texts.join('\n\n'), actions };
}

// ---------- voice ----------

// A single-use token for one Live API session. Every field of the session
// config is locked to what is set here (lockAdditionalFields is left unset),
// so a token copied out of the browser can't change the prompt, voice or tools.
export async function createVoiceToken({ ai, kb, page, audience, now = new Date() }) {
  const expireTime = new Date(now.getTime() + (VOICE_SESSION_SECONDS + 60) * 1000);
  const config = {
    responseModalities: [Modality.AUDIO],
    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } } },
    systemInstruction: buildSystemInstruction({ profile: kb.profile, page, audience, mode: 'voice', now }),
    tools: [{ functionDeclarations: declarationsFor(kb) }],
    inputAudioTranscription: {},
    outputAudioTranscription: {},
  };
  const token = await ai.authTokens.create({
    config: {
      uses: 1,
      expireTime: expireTime.toISOString(),
      newSessionExpireTime: new Date(now.getTime() + 60_000).toISOString(),
      liveConnectConstraints: { model: LIVE_MODEL, config },
      httpOptions: { apiVersion: 'v1alpha' },
    },
  });
  return {
    token: token.name,
    model: LIVE_MODEL,
    expiresAt: expireTime.toISOString(),
    sessionSeconds: VOICE_SESSION_SECONDS,
  };
}

// ---------- HTTP helpers shared by the functions ----------

// Same-origin or local only. Origin headers can be forged by scripts, so this
// only stops other websites calling the API from their pages; per-IP rate
// limits (function config) and Gemini's free-tier quota are the real caps.
export function originAllowed(req) {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    const o = new URL(origin);
    return o.host === new URL(req.url).host || o.hostname === 'localhost' || o.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

export function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

// Maps failures to a status the panel understands without leaking details.
export function errorResponse(err, log = console) {
  if (err instanceof HttpError) return json(err.status, { error: err.message });
  const status = Number(err?.status || err?.code);
  const text = String(err?.message || err);
  // Out of quota or overloaded even after the fallback: "busy", not "broken".
  if (status === 429 || status === 503 || /RESOURCE_EXHAUSTED|UNAVAILABLE|high demand|quota|rate limit/i.test(text)) {
    return json(429, { error: 'busy' });
  }
  log.error('[jarvis]', text.slice(0, 500));
  return json(502, { error: 'upstream' });
}

export async function readJson(req, maxBytes = 64_000) {
  const raw = await req.text();
  if (raw.length > maxBytes) throw new HttpError(413, 'request too large');
  try {
    return JSON.parse(raw || '{}');
  } catch {
    throw new HttpError(400, 'invalid JSON');
  }
}
