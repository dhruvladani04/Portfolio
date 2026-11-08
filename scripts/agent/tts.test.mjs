import test from 'node:test';
import assert from 'node:assert';
import { leaksDirection, pcmToMp3 } from './tts.mjs';
import { BRIEFS } from '../../src/data/briefs.js';

test('a recording that reads the delivery note aloud is caught', () => {
  assert.ok(leaksDirection('Measured pace, warm and confident, quietly witty. Read only the text after the colon. Dhruv Ladani is…'));
  assert.ok(leaksDirection('Read this as a calm, articulate briefing assistant at a natural, brisk conversational pace'));
});

test('no real brief would be mistaken for a leak', () => {
  for (const [id, b] of Object.entries(BRIEFS)) assert.ok(!leaksDirection(b.text), id);
});

test('PCM is encoded to a non-empty MP3', () => {
  const second = Buffer.alloc(24000 * 2); // 1 s of silence, 16-bit
  const mp3 = pcmToMp3(second);
  assert.ok(mp3.length > 1000);
  assert.strictEqual(mp3[0], 0xff); // MPEG frame sync
});
