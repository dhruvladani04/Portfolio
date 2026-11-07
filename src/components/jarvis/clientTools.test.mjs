import test from 'node:test';
import assert from 'node:assert';
import { resolveToolCall } from './clientTools.js';
import { TOOL_DEFS } from '../../lib/jarvis-tools.js';

const projects = [
  { id: 'tollgate', title: 'Tollgate' },
  { id: 'llm-atlas', title: 'LLM Atlas' },
];

test('every declared tool has a handler', () => {
  const sample = { navigate: { path: '/' }, showProject: { id: 'tollgate' }, openResume: { kind: 'tech' }, openContact: { form: 'hiring' } };
  for (const t of TOOL_DEFS) {
    const r = resolveToolCall(t.name, sample[t.name], { projects });
    assert.notStrictEqual(r.type, 'error', `${t.name} has no handler`);
  }
});

test('navigate only allows known routes', () => {
  assert.deepStrictEqual(resolveToolCall('navigate', { path: '/work' }, { projects }), { type: 'navigate', href: '/work' });
  for (const bad of ['https://evil.example', '//evil.example', '/work/../../x', 'javascript:alert(1)', undefined]) {
    assert.strictEqual(resolveToolCall('navigate', { path: bad }, { projects }).type, 'error');
  }
});

test('showProject maps ids to case-study pages', () => {
  assert.deepStrictEqual(resolveToolCall('showProject', { id: 'llm-atlas' }, { projects }), {
    type: 'navigate',
    href: '/work/llm-atlas',
    label: 'LLM Atlas',
  });
  assert.strictEqual(resolveToolCall('showProject', { id: 'nope' }, { projects }).type, 'error');
});

test('openResume and openContact use fixed targets', () => {
  assert.strictEqual(resolveToolCall('openResume', { kind: 'pm' }, { projects }).href, '/Dhruv_Ladani_Resume_PM.pdf');
  assert.strictEqual(resolveToolCall('openResume', { kind: '../.env' }, { projects }).type, 'error');
  assert.strictEqual(resolveToolCall('openContact', { form: 'freelance' }, { projects }).href, '/contact?form=freelance');
  assert.strictEqual(resolveToolCall('openContact', { form: 'x' }, { projects }).type, 'error');
});

test('unknown tools and junk params are rejected', () => {
  assert.strictEqual(resolveToolCall('deleteEverything', {}, { projects }).type, 'error');
  assert.strictEqual(resolveToolCall('navigate', null, { projects }).type, 'error');
});
