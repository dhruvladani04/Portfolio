#!/usr/bin/env node
// Evaluates J.A.R.V.I.S. against scripts/agent/eval-cases.json.
//
//   npm run agent:eval                      all cases
//   npm run agent:eval -- --only notice,visa
//   npm run agent:eval -- --failed          only cases that failed last run
//
// Each case is one fresh chat question answered by runChat() — the same code
// the /api/jarvis/chat function runs — with GEMINI_API_KEY from .env and the
// knowledge base in .agent-kb/kb.json. Free-tier rate limits (429) and
// overload (503) are retried with a delay; if 429s persist the run stops early.
// Subset runs are merged into the last report; summary.mixedRuns marks a
// report that isn't one clean full run. Every reply is written to
// .agent-kb/eval-report.json for review.

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHAT_MODEL } from './config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const CASES_FILE = path.join(ROOT, 'scripts/agent/eval-cases.json');
const KB_FILE = path.join(ROOT, '.agent-kb/kb.json');
const REPORT_FILE = path.join(ROOT, '.agent-kb/eval-report.json');
const CONCURRENCY = Number(process.env.EVAL_CONCURRENCY || 2);
const MAX_RETRIES = 3;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Month names covering "four to five weeks from today".
function startMonthsPattern(now = new Date()) {
  const names = new Set();
  for (let d = 28; d <= 35; d++) names.add(MONTHS[new Date(now.getTime() + d * 86400000).getMonth()]);
  return [...names].join('|');
}

function compile(pattern) {
  return new RegExp(pattern.replace('$START_MONTHS', startMonthsPattern()), 'iu');
}

export function scoreCase(c, result) {
  const text = result.responses.join('\n');
  const failures = [];
  if (result.error) failures.push(result.error);
  for (const p of c.mustInclude || []) if (!compile(p).test(text)) failures.push(`missing /${p}/`);
  for (const p of c.mustNotInclude || []) if (compile(p).test(text)) failures.push(`contains /${p}/`);
  if (c.expectTool) {
    const hit = result.tools.find(
      (t) => t.name === c.expectTool.name && Object.entries(c.expectTool.params || {}).every(([k, v]) => t.params?.[k] === v),
    );
    if (!hit) failures.push(`no ${c.expectTool.name}(${JSON.stringify(c.expectTool.params || {})}) call`);
  }
  return failures;
}

const isRateLimit = (err) => Number(err?.status) === 429 || /RESOURCE_EXHAUSTED|\b429\b|quota/i.test(String(err?.message));
const isOverloaded = (err) => Number(err?.status) === 503 || /UNAVAILABLE|high demand|overloaded/i.test(String(err?.message));

// Gemini's 429 body says how long to wait ("retryDelay": "34s").
function retryDelayMs(err) {
  const m = /retryDelay"?\s*:\s*"?(\d+(?:\.\d+)?)s/i.exec(String(err?.message));
  return Math.min(90_000, (m ? Number(m[1]) : 20) * 1000 + 500);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function runCase({ ai, kb, runChat }, c) {
  const out = { id: c.id, responses: [], tools: [], latencyMs: null, error: null, rateLimited: false };
  for (let attempt = 0; ; attempt++) {
    const t0 = performance.now();
    try {
      const { text, actions } = await runChat({
        ai,
        kb,
        messages: [{ role: 'user', text: c.ask }],
        page: c.page || '/',
        audience: c.audience || 'unspecified',
      });
      out.latencyMs = Math.round(performance.now() - t0);
      if (text) out.responses.push(text);
      out.tools = actions.map((a) => ({ name: a.name, params: a.args }));
      if (!text && !actions.length) out.error = 'empty reply';
      return out;
    } catch (err) {
      if ((isRateLimit(err) || isOverloaded(err)) && attempt < MAX_RETRIES) {
        await sleep(isRateLimit(err) ? retryDelayMs(err) : 5000 * (attempt + 1));
        continue;
      }
      out.rateLimited = isRateLimit(err);
      out.error = out.rateLimited ? 'rate limited (429)' : `error: ${String(err?.message).slice(0, 200)}`;
      return out;
    }
  }
}

const pct = (arr, p) => {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};

async function loadKb() {
  if (!existsSync(KB_FILE)) {
    throw new Error('No .agent-kb/kb.json — run `npm run agent:kb` first.');
  }
  return JSON.parse(await readFile(KB_FILE, 'utf8'));
}

async function main() {
  try {
    process.loadEnvFile(path.join(ROOT, '.env'));
  } catch {
    /* rely on the environment */
  }
  const { geminiClient, runChat } = await import('../../netlify/lib/jarvis-server.mjs');
  const ai = geminiClient();
  const kb = await loadKb();

  const { cases: all } = JSON.parse(await readFile(CASES_FILE, 'utf8'));
  const previous = await readFile(REPORT_FILE, 'utf8').then(JSON.parse, () => null);
  const onlyArg = process.argv.find((a) => a.startsWith('--only'));
  let only = onlyArg ? (onlyArg.split('=')[1] || process.argv[process.argv.indexOf(onlyArg) + 1] || '').split(',') : null;
  if (process.argv.includes('--failed')) {
    if (!previous) throw new Error('No previous report to take failures from — run the full set first.');
    only = previous.results.filter((r) => !r.pass).map((r) => r.id);
  }
  const cases = only ? all.filter((c) => only.includes(c.id)) : all;
  if (!cases.length) {
    console.log('[eval] nothing to run');
    return;
  }

  console.log(`[eval] ${cases.length} cases against ${CHAT_MODEL} (KB built ${kb.generatedAt.slice(0, 16)})\n`);
  const fresh = [];
  let next = 0;
  let limitHit = false;
  async function worker() {
    while (next < cases.length && !limitHit) {
      const c = cases[next++];
      const result = await runCase({ ai, kb, runChat }, c);
      if (result.rateLimited) {
        limitHit = true;
        continue;
      }
      const failures = scoreCase(c, result);
      fresh.push({ ...result, category: c.category, ask: c.ask, pass: failures.length === 0, failures });
      const mark = failures.length ? 'FAIL' : 'pass';
      console.log(`${mark}  ${c.id.padEnd(28)} ${String(result.latencyMs ?? '—').padStart(6)} ms  ${failures.join('; ')}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, cases.length) }, worker));
  if (limitHit) {
    console.warn(`\n[eval] Gemini kept rate-limiting; ${cases.length - fresh.length} case(s) not run. Rerun later with --failed or --only.`);
  }

  // A subset run (or one cut short) replaces just its own cases in the last report.
  const partial = Boolean(only) || limitHit;
  const freshIds = new Set(fresh.map((r) => r.id));
  const results = partial && previous ? [...previous.results.filter((r) => !freshIds.has(r.id)), ...fresh] : fresh;
  const passed = results.filter((r) => r.pass).length;
  const lat = results.map((r) => r.latencyMs).filter((x) => x != null);
  const summary = {
    ranAt: new Date().toISOString(),
    model: CHAT_MODEL,
    passed,
    total: results.length,
    passRate: results.length ? Math.round((passed / results.length) * 1000) / 10 : 0,
    latencyMs: { median: pct(lat, 50), p90: pct(lat, 90) },
    mixedRuns: partial && Boolean(previous),
  };
  console.log(`\n[eval] ${passed}/${results.length} passed (${summary.passRate}%) · median reply ${summary.latencyMs.median} ms · p90 ${summary.latencyMs.p90} ms`);

  await mkdir(path.dirname(REPORT_FILE), { recursive: true });
  await writeFile(REPORT_FILE, `${JSON.stringify({ summary, results }, null, 2)}\n`);
  console.log(`[eval] full replies in ${path.relative(ROOT, REPORT_FILE)}`);
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
