#!/usr/bin/env node
// Records the briefs in src/data/briefs.js as static MP3s in J.A.R.V.I.S.'s
// voice (the same Gemini voice as live conversations), so playing them costs
// nothing at runtime.
//
//   npm run agent:audio            only briefs whose text changed
//   npm run agent:audio -- --all   re-record everything
//   npm run agent:audio -- overview tollgate   just these ids
//
// Writes public/audio/briefs/<id>.mp3 and src/data/brief-audio.json (commit
// both). Uses GEMINI_API_KEY from .env; Gemini returns 24 kHz PCM, encoded
// here to 64 kbps MP3.

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';
import { Mp3Encoder } from '@breezystack/lamejs';
import { BRIEFS } from '../../src/data/briefs.js';
import { TTS_MODEL, VOICE_NAME } from './config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const MANIFEST = path.join(ROOT, 'src/data/brief-audio.json');
const AUDIO_DIR = path.join(ROOT, 'public/audio/briefs');
const SAMPLE_RATE = 24000;
const KBPS = 64; // ~240 KB per 30 s, plenty for speech

// How the briefs should sound; Gemini TTS takes delivery notes in the prompt.
const DIRECTION =
  'Read this as a calm, articulate briefing assistant at a natural, brisk conversational pace — warm, confident and quietly witty, never slow. Read only the text after the colon.';

export const briefHash = (s) =>
  createHash('sha256').update(`${TTS_MODEL}|${VOICE_NAME}|${DIRECTION}|${s}`).digest('hex').slice(0, 12);
const hash = briefHash;

const saveManifest = (manifest) => writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

export function pcmToMp3(pcm) {
  const samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.byteLength >> 1);
  const encoder = new Mp3Encoder(1, SAMPLE_RATE, KBPS);
  const chunks = [];
  for (let i = 0; i < samples.length; i += 1152 * 20) {
    const out = encoder.encodeBuffer(samples.subarray(i, i + 1152 * 20));
    if (out.length) chunks.push(Buffer.from(out.buffer, out.byteOffset, out.length));
  }
  const tail = encoder.flush();
  if (tail.length) chunks.push(Buffer.from(tail.buffer, tail.byteOffset, tail.length));
  return Buffer.concat(chunks);
}

async function speak(ai, text) {
  const res = await ai.models.generateContent({
    model: TTS_MODEL,
    contents: [{ role: 'user', parts: [{ text: `${DIRECTION}: ${text}` }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } } },
    },
  });
  const data = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData?.data;
  if (!data) throw new Error(`no audio returned by ${TTS_MODEL}`);
  return Buffer.from(data, 'base64');
}

// TTS models occasionally read the delivery note aloud. Every recording is
// transcribed and rejected if any of these phrases from DIRECTION show up.
const LEAK = /colon|briefing assistant|conversational pace|quietly witty|never slow|read only|read this/i;
const CHECK_MODEL = 'gemini-3.5-flash';

export function leaksDirection(transcript) {
  return LEAK.test(transcript);
}

async function transcribe(ai, mp3) {
  const res = await ai.models.generateContent({
    model: CHECK_MODEL,
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'audio/mpeg', data: mp3.toString('base64') } },
          { text: 'Transcribe this entire audio verbatim as plain text. Output only the transcript.' },
        ],
      },
    ],
    config: { temperature: 0 },
  });
  return res.text || '';
}

async function main() {
  try {
    process.loadEnvFile(path.join(ROOT, '.env'));
  } catch {
    /* rely on the environment */
  }
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set (add it to .env).');
  const ai = new GoogleGenAI({ apiKey });

  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const only = args.filter((a) => !a.startsWith('--'));
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8').catch(() => '{}'));

  const todo = Object.entries(BRIEFS).filter(([id, b]) => {
    if (only.length) return only.includes(id);
    return all || manifest[id]?.hash !== hash(b.text);
  });
  if (!todo.length) {
    console.log('[tts] all briefs up to date');
    return;
  }

  console.log(`[tts] recording ${todo.length} brief(s) with ${TTS_MODEL} / ${VOICE_NAME}`);
  await mkdir(AUDIO_DIR, { recursive: true });

  // Drop entries for briefs that no longer exist.
  for (const id of Object.keys(manifest)) if (!BRIEFS[id]) delete manifest[id];

  // The manifest is saved after every brief, so a quota stop keeps progress.
  for (const [id, brief] of todo) {
    let pcm;
    let mp3;
    try {
      // Up to two takes: a take that reads the delivery note aloud is discarded.
      for (let take = 1; take <= 2; take++) {
        pcm = await speak(ai, brief.text);
        mp3 = pcmToMp3(pcm);
        if (!leaksDirection(await transcribe(ai, mp3))) break;
        if (take === 2) throw new Error(`"${id}" read the delivery note aloud twice — not saved. Try again later.`);
        console.warn(`[tts] ${id}: take 1 read the delivery note aloud — recording again`);
      }
    } catch (err) {
      if (/RESOURCE_EXHAUSTED|\b429\b/.test(String(err?.message))) {
        await saveManifest(manifest);
        console.warn(`[tts] free-tier TTS quota reached (10 recordings a day) — stopped before "${id}". Run again tomorrow; finished briefs are kept.`);
        process.exitCode = 1;
        return;
      }
      throw err;
    }
    await writeFile(path.join(AUDIO_DIR, `${id}.mp3`), mp3);
    manifest[id] = { src: `/audio/briefs/${id}.mp3`, hash: hash(brief.text) };
    await saveManifest(manifest);
    const seconds = pcm.length / 2 / SAMPLE_RATE;
    console.log(`[tts] ${id}.mp3 (${seconds.toFixed(1)} s, ${Math.round(mp3.length / 1024)} KB)`);
  }
  console.log('[tts] updated src/data/brief-audio.json — commit it with the MP3s');
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
