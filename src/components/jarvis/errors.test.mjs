import test from 'node:test';
import assert from 'node:assert';
import { friendlyError } from './errors.js';

test('a blocked microphone points to chat', () => {
  const e = friendlyError('mic');
  assert.strictEqual(e.mic, true);
  assert.match(e.text, /Chat tab/);
});

test('rate limits and quota say J.A.R.V.I.S. is busy, not broken', () => {
  const e = friendlyError('busy');
  assert.ok(!e.mic);
  assert.match(e.text, /capacity/);
});

test('the five-minute limit is not an error', () => {
  const e = friendlyError('ended');
  assert.ok(!e.error);
  assert.match(e.text, /five minutes/);
});

test('anything else is a generic offline message', () => {
  for (const k of ['offline', 'timeout', '', undefined]) {
    assert.match(friendlyError(k).text, /Couldn't reach/);
  }
});
