// POST /api/jarvis/chat — one chat turn. Body: { messages: [{ role, text }],
// page, audience }. Returns { text, actions } where actions are site actions
// (open a page, resume or form) for the browser to perform.
import kb from '../lib/kb.mjs';
import { errorResponse, geminiClient, json, originAllowed, parseChatBody, readJson, runChat } from '../lib/jarvis-server.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  if (!originAllowed(req)) return json(403, { error: 'forbidden' });
  try {
    const { messages, page, audience } = parseChatBody(await readJson(req));
    return json(200, await runChat({ ai: geminiClient(), kb, messages, page, audience }));
  } catch (err) {
    return errorResponse(err);
  }
};

export const config = {
  // Both forms: the site uses trailing slashes (next.config trailingSlash).
  path: ['/api/jarvis/chat', '/api/jarvis/chat/'],
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
