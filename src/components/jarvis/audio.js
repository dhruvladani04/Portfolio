// Browser audio for the Gemini Live voice session: microphone capture as
// 16 kHz 16-bit PCM, and gapless playback of the model's 24 kHz PCM replies.
// Pure Web Audio — no dependencies. Loaded only with the panel chunk.

export const INPUT_RATE = 16000;
export const OUTPUT_RATE = 24000;
const CHUNK_MS = 100;

// Runs on the audio thread: downsamples whatever rate the device uses to
// 16 kHz (averaging each output sample's span), converts to Int16 and posts
// ~100 ms chunks with their RMS level.
const CAPTURE_WORKLET = `
class PcmCapture extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.ratio = sampleRate / options.processorOptions.targetRate;
    this.chunk = new Int16Array(options.processorOptions.chunkSamples);
    this.filled = 0;
    this.acc = 0;
    this.accCount = 0;
    this.pos = 0;
    this.sumSq = 0;
  }
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (!ch) return true;
    for (let i = 0; i < ch.length; i++) {
      this.acc += ch[i];
      this.accCount++;
      this.pos += 1;
      if (this.pos >= this.ratio) {
        this.pos -= this.ratio;
        const s = Math.max(-1, Math.min(1, this.acc / this.accCount));
        this.acc = 0;
        this.accCount = 0;
        this.sumSq += s * s;
        this.chunk[this.filled++] = s < 0 ? s * 0x8000 : s * 0x7fff;
        if (this.filled === this.chunk.length) {
          const level = Math.sqrt(this.sumSq / this.filled);
          this.port.postMessage({ pcm: this.chunk.buffer.slice(0), level });
          this.filled = 0;
          this.sumSq = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor('pcm-capture', PcmCapture);
`;

export function int16ToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

export function base64ToFloat32(b64) {
  const binary = atob(b64);
  const samples = new Float32Array(binary.length >> 1);
  for (let i = 0; i < samples.length; i++) {
    const lo = binary.charCodeAt(i * 2);
    const hi = binary.charCodeAt(i * 2 + 1);
    let v = (hi << 8) | lo;
    if (v >= 0x8000) v -= 0x10000;
    samples[i] = v / 0x8000;
  }
  return samples;
}

// Asks for the microphone and streams base64 PCM chunks to onChunk.
// Rejects with the browser's error (NotAllowedError, NotFoundError…) if the
// visitor refuses or has no microphone.
export async function startMicrophone({ onChunk }) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  });
  const ctx = new AudioContext();
  const url = URL.createObjectURL(new Blob([CAPTURE_WORKLET], { type: 'application/javascript' }));
  try {
    await ctx.audioWorklet.addModule(url);
  } finally {
    URL.revokeObjectURL(url);
  }
  const source = ctx.createMediaStreamSource(stream);
  const node = new AudioWorkletNode(ctx, 'pcm-capture', {
    processorOptions: { targetRate: INPUT_RATE, chunkSamples: (INPUT_RATE * CHUNK_MS) / 1000 },
  });
  let muted = false;
  let level = 0;
  node.port.onmessage = ({ data }) => {
    level = muted ? 0 : data.level;
    if (!muted) onChunk(int16ToBase64(data.pcm));
  };
  source.connect(node);
  if (ctx.state === 'suspended') await ctx.resume();

  return {
    setMuted(value) {
      muted = Boolean(value);
      for (const t of stream.getAudioTracks()) t.enabled = !muted;
    },
    getLevel: () => Math.min(1, level * 4),
    stop() {
      node.port.onmessage = null;
      source.disconnect();
      node.disconnect();
      for (const t of stream.getTracks()) t.stop();
      ctx.close().catch(() => {});
    },
  };
}

// Queues PCM chunks back to back. interrupt() drops everything queued — the
// model was cut off by the visitor speaking.
export function createPlayer() {
  const ctx = new AudioContext({ sampleRate: OUTPUT_RATE });
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  analyser.connect(ctx.destination);
  const levelBuf = new Float32Array(analyser.fftSize);
  const sources = new Set();
  let nextStart = 0;

  return {
    async resume() {
      if (ctx.state === 'suspended') await ctx.resume();
    },
    enqueue(b64) {
      const samples = base64ToFloat32(b64);
      if (!samples.length) return;
      const buffer = ctx.createBuffer(1, samples.length, OUTPUT_RATE);
      buffer.copyToChannel(samples, 0);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(analyser);
      const startAt = Math.max(nextStart, ctx.currentTime + 0.05);
      src.start(startAt);
      nextStart = startAt + buffer.duration;
      sources.add(src);
      src.onended = () => sources.delete(src);
    },
    interrupt() {
      for (const s of sources) {
        try {
          s.stop();
        } catch (_) {
          /* already stopped */
        }
      }
      sources.clear();
      nextStart = 0;
    },
    isPlaying: () => sources.size > 0,
    getLevel() {
      if (!sources.size) return 0;
      analyser.getFloatTimeDomainData(levelBuf);
      let sum = 0;
      for (const v of levelBuf) sum += v * v;
      return Math.min(1, Math.sqrt(sum / levelBuf.length) * 4);
    },
    close() {
      this.interrupt();
      ctx.close().catch(() => {});
    },
  };
}
