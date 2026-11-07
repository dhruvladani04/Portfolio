// GET /api/jarvis/project?id=<project id> — a project's cleaned README, for
// the voice assistant's getProjectDetails tool (chat answers it server-side).
// Public GitHub content, so no key is involved.
import kb from '../lib/kb.mjs';
import { json, originAllowed } from '../lib/jarvis-server.mjs';

export default async (req) => {
  if (!originAllowed(req) && req.headers.get('sec-fetch-site') !== 'same-origin') return json(403, { error: 'forbidden' });
  const id = new URL(req.url).searchParams.get('id') || '';
  const readme = kb.readmes[id];
  return readme ? json(200, { readme }) : json(404, { error: 'No README for that project.' });
};

export const config = {
  path: ['/api/jarvis/project', '/api/jarvis/project/'],
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
