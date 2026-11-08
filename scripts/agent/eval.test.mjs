import test from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { scoreCase } from './eval.mjs';

const ok = (responses, tools = []) => ({ responses, tools, error: null });

test('eval cases are well-formed and every pattern compiles', () => {
  const { cases } = JSON.parse(readFileSync(new URL('./eval-cases.json', import.meta.url), 'utf8'));
  const ids = new Set();
  for (const c of cases) {
    assert.ok(c.id && c.ask, `case missing id/ask: ${JSON.stringify(c)}`);
    assert.ok(!ids.has(c.id), `duplicate id ${c.id}`);
    ids.add(c.id);
    // A "\b" written unescaped in JSON is a backspace character, which
    // silently turns a word boundary into a pattern that never matches.
    for (const p of [...(c.mustInclude || []), ...(c.mustNotInclude || [])]) {
      assert.ok(!/[\u0000-\u001f]/.test(p), `case ${c.id} has a control character in ${JSON.stringify(p)}`);
    }
    // scoring an empty reply exercises every regex without throwing
    scoreCase(c, ok(['']));
  }
});

test('mustInclude / mustNotInclude', () => {
  const c = { mustInclude: ['10.{0,10}12', 'discuss'], mustNotInclude: ['100 ?K'] };
  assert.deepStrictEqual(scoreCase(c, ok(['He expects 10 to 12 LPA, open to discussion.'])), []);
  assert.strictEqual(scoreCase(c, ok(['He expects 100K, happy to discuss 10 to 12.'])).length, 1);
  assert.strictEqual(scoreCase(c, ok(['No idea.'])).length, 2);
});

test('expected tool calls match on name and params', () => {
  const c = { expectTool: { name: 'openResume', params: { kind: 'pm' } } };
  assert.deepStrictEqual(scoreCase(c, ok(['Here you go.'], [{ name: 'openResume', params: { kind: 'pm' } }])), []);
  assert.strictEqual(scoreCase(c, ok(['Here you go.'], [{ name: 'openResume', params: { kind: 'tech' } }])).length, 1);
});

test('$START_MONTHS covers four to five weeks out', () => {
  const c = { mustInclude: ['$START_MONTHS'] };
  const inFiveWeeks = new Date(Date.now() + 32 * 86400000).toLocaleString('en-US', { month: 'long' });
  assert.deepStrictEqual(scoreCase(c, ok([`Around mid-${inFiveWeeks}.`])), []);
});

test('errors always fail the case', () => {
  assert.deepStrictEqual(scoreCase({}, { responses: [], tools: [], error: 'timed out' }), ['timed out']);
});
