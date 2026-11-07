// POST /api/jarvis/token — a single-use Gemini Live token for one voice
// session. Body: { page, audience }. The session's prompt, voice and tools are
// locked into the token, so the browser never sees the API key.
import kb from '../lib/kb.mjs';
import { createVoiceToken, errorResponse, geminiClient, json, originAllowed, readJson } from '../lib/jarvis-server.mjs';
import { sanitizeContext } from '../../scripts/agent/config.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  if (!originAllowed(req)) return json(403, { error: 'forbidden' });
  try {
    const { page, audience } = sanitizeContext(await readJson(req, 4_000));
    return json(200, await createVoiceToken({ ai: geminiClient(), kb, page, audience }));
  } catch (err) {
    return errorResponse(err);
  }
};

export const config = {
  path: ['/api/jarvis/token', '/api/jarvis/token/'],
  rateLimit: { windowLimit: 4, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
