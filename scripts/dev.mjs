#!/usr/bin/env node
// `npm run dev`: the J.A.R.V.I.S. dev API (scripts/jarvis-dev-api.mjs) plus
// `next dev`, stopped together. Extra arguments go to `next dev`.

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const children = [
  spawn(process.execPath, [path.join(ROOT, 'scripts/jarvis-dev-api.mjs')], { stdio: 'inherit', cwd: ROOT }),
  spawn(process.execPath, [path.join(ROOT, 'node_modules/next/dist/bin/next'), 'dev', ...process.argv.slice(2)], {
    stdio: 'inherit',
    cwd: ROOT,
  }),
];

const stopAll = (code = 0) => {
  for (const c of children) if (c.exitCode === null) c.kill();
  process.exit(code);
};
for (const c of children) c.on('exit', (code) => stopAll(code ?? 0));
process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
