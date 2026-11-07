#!/usr/bin/env node
// Local stand-in for Netlify Functions: serves netlify/functions/* at their
// configured paths on http://localhost:8787, reading GEMINI_API_KEY from .env.
// `npm run dev` starts it next to `next dev`, and next.config.js forwards
// /api/jarvis/* to it in development, so the browser code is identical to
// production. (Netlify's per-IP rate limits only apply when deployed.)

import http from 'node:http';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const DEV_API_PORT = Number(process.env.JARVIS_DEV_API_PORT || 8787);

try {
  process.loadEnvFile(path.join(ROOT, '.env'));
} catch {
  /* no .env — the functions will answer 503 */
}

if (!existsSync(path.join(ROOT, '.agent-kb/kb.json'))) {
  console.log('[jarvis-dev] building the knowledge base first (npm run agent:kb)…');
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/agent/build-kb.mjs')], { stdio: 'inherit' });
}

const dir = path.join(ROOT, 'netlify/functions');
const routes = new Map();
for (const file of (await readdir(dir)).filter((f) => f.endsWith('.mjs'))) {
  const mod = await import(pathToFileURL(path.join(dir, file)).href);
  for (const p of [mod.config.path].flat()) routes.set(p.replace(/\/$/, ''), mod.default);
}

const server = http.createServer(async (nodeReq, nodeRes) => {
  const url = new URL(nodeReq.url, `http://localhost:${DEV_API_PORT}`);
  const handler = routes.get(url.pathname.replace(/\/$/, ''));
  if (!handler) {
    nodeRes.writeHead(404).end('not found');
    return;
  }
  const chunks = [];
  for await (const c of nodeReq) chunks.push(c);
  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  const req = new Request(url, {
    method: nodeReq.method,
    headers: Object.entries(nodeReq.headers).flatMap(([k, v]) => (Array.isArray(v) ? v.map((x) => [k, x]) : [[k, v]])),
    body: ['GET', 'HEAD'].includes(nodeReq.method) ? undefined : body,
  });
  try {
    const res = await handler(req, {});
    nodeRes.writeHead(res.status, Object.fromEntries(res.headers));
    nodeRes.end(Buffer.from(await res.arrayBuffer()));
  } catch (err) {
    console.error('[jarvis-dev]', err);
    nodeRes.writeHead(500).end('error');
  }
});

server.listen(DEV_API_PORT, () => {
  const key = process.env.GEMINI_API_KEY?.trim() ? 'GEMINI_API_KEY loaded' : 'GEMINI_API_KEY missing in .env';
  console.log(`[jarvis-dev] API on http://localhost:${DEV_API_PORT} (${[...routes.keys()].join(', ')}) — ${key}`);
});
