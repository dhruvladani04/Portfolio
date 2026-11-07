// One Gemini Live voice conversation, browser side:
// token from /api/jarvis/token → microphone → Live API WebSocket → speakers.
// The token is single-use and locked to J.A.R.V.I.S.'s prompt, voice and
// tools on the server; this file never sees the API key.

import { createPlayer, startMicrophone } from './audio';

export class VoiceError extends Error {
  constructor(kind, message) {
    super(message || kind);
    this.kind = kind; // 'mic' | 'busy' | 'offline' | 'timeout' | 'ended'
  }
}

const GREETING_TRIGGER = '(voice session started)';
const CONNECT_TIMEOUT_MS = 15000;

async function fetchToken({ page, audience }) {
  let res;
  try {
    res = await fetch('/api/jarvis/token/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ page, audience }),
    });
  } catch (err) {
    throw new VoiceError('offline', err.message);
  }
  if (res.status === 429) throw new VoiceError('busy');
  if (!res.ok) throw new VoiceError('offline', `token ${res.status}`);
  return res.json();
}

async function projectDetails(id) {
  try {
    const res = await fetch(`/api/jarvis/project/?id=${encodeURIComponent(id)}`);
    if (res.ok) return await res.json();
  } catch (_) {
    /* fall through */
  }
  return { error: 'Not available right now; answer from the profile.' };
}

/**
 * Starts a voice session. Callbacks:
 *  onStatus('connecting' | 'live' | 'ended')
 *  onUserText(text)          — what the visitor said (final, per turn)
 *  onAgentText(text, final)  — what J.A.R.V.I.S. is saying (streams, then final)
 *  onAction(name, args)      — a site tool call; returns a short result string
 *  onEnd(error | null)
 * Returns a controller right away — { stop, setMuted, getLevel, isSpeaking } —
 * so the visitor can cancel while it is still connecting.
 */
export function startVoiceSession({ page, audience, onStatus, onUserText, onAgentText, onAction, onEnd }) {
  // Created inside the click that started the session, so playback is allowed.
  const player = createPlayer();
  let mic = null;
  let session = null;
  let ended = false;
  let endTimer = null;
  let userBuf = '';
  let agentBuf = '';

  const flushUser = () => {
    if (userBuf.trim()) onUserText(userBuf.trim());
    userBuf = '';
  };
  const flushAgent = () => {
    if (agentBuf.trim()) onAgentText(agentBuf.trim(), true);
    agentBuf = '';
  };

  const finish = (error = null) => {
    if (ended) return;
    ended = true;
    clearTimeout(endTimer);
    flushUser();
    flushAgent();
    mic?.stop();
    try {
      session?.close();
    } catch (_) {
      /* already closed */
    }
    player.close();
    onStatus('ended');
    onEnd(error);
  };

  const controller = {
    stop: () => finish(null),
    setMuted: (m) => mic?.setMuted(m),
    getLevel: () => Math.max(player.getLevel(), (mic?.getLevel() || 0) * 0.7),
    isSpeaking: () => player.isPlaying(),
  };

  const connect = async () => {
    onStatus('connecting');
    try {
      await player.resume();
      try {
        mic = await startMicrophone({
          onChunk: (data) => {
            if (ended || !session) return;
            try {
              session.sendRealtimeInput({ audio: { data, mimeType: 'audio/pcm;rate=16000' } });
            } catch (_) {
              /* socket closing — finish() is on its way */
            }
          },
        });
      } catch (err) {
        throw new VoiceError('mic', err?.name || err?.message);
      }
      mic.setMuted(true); // nothing is sent until the session is up

      const { token, model, sessionSeconds } = await fetchToken({ page, audience });
      if (ended) return;
      const { GoogleGenAI, Modality } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: 'v1alpha' } });

      const handleMessage = async (msg) => {
        const sc = msg.serverContent;
        if (sc) {
          for (const part of sc.modelTurn?.parts || []) {
            if (part.inlineData?.data) player.enqueue(part.inlineData.data);
          }
          if (sc.inputTranscription?.text) userBuf += sc.inputTranscription.text;
          if (sc.outputTranscription?.text) {
            flushUser(); // the visitor's turn is over once the reply starts
            agentBuf += sc.outputTranscription.text;
            onAgentText(agentBuf.trim(), false);
          }
          if (sc.interrupted) {
            player.interrupt();
            flushAgent();
          }
          if (sc.turnComplete) flushAgent();
        }
        if (msg.toolCall?.functionCalls?.length) {
          const functionResponses = [];
          for (const call of msg.toolCall.functionCalls) {
            const response =
              call.name === 'getProjectDetails'
                ? await projectDetails(call.args?.id)
                : { result: onAction(call.name, call.args || {}) };
            functionResponses.push({ id: call.id, name: call.name, response });
          }
          if (!ended) session?.sendToolResponse({ functionResponses });
        }
        if (msg.goAway) endTimer = setTimeout(() => finish(null), 1000);
      };

      const connectTimer = setTimeout(() => finish(new VoiceError('timeout')), CONNECT_TIMEOUT_MS);
      session = await ai.live.connect({
        model,
        config: { responseModalities: [Modality.AUDIO] }, // the rest is locked into the token
        callbacks: {
          onmessage: (msg) => {
            handleMessage(msg).catch((err) => console.warn('[jarvis] message', err));
          },
          onerror: (e) => finish(new VoiceError('offline', e?.message)),
          onclose: (e) => {
            // 1000 = normal close (we ended it, or the time limit). Anything else
            // after a working session is a drop; before it, a refusal.
            const reason = String(e?.reason || '');
            if (e?.code === 1000 && !/quota|exhaust|limit/i.test(reason)) finish(null);
            else finish(new VoiceError(/quota|exhaust|limit|429/i.test(reason) ? 'busy' : 'offline', reason));
          },
        },
      });
      clearTimeout(connectTimer);
      if (ended) {
        session.close();
        return;
      }

      session.sendClientContent({ turns: [{ role: 'user', parts: [{ text: GREETING_TRIGGER }] }], turnComplete: true });
      mic.setMuted(false);
      onStatus('live');
      endTimer = setTimeout(() => finish(new VoiceError('ended')), sessionSeconds * 1000);
    } catch (err) {
      finish(err instanceof VoiceError ? err : new VoiceError('offline', err?.message));
    }
  };
  connect();
  return controller;
}
