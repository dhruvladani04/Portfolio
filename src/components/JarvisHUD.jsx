import React, { useEffect, useRef } from 'react';

// J.A.R.V.I.S. helmet-HUD background (2D canvas, replaces the old 3D scene):
// rotating corner reticles with a radar sweep, drifting target brackets that
// periodically lock on, a scrolling telemetry ruler, and faint mono readouts.
export default function JarvisHUD() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const MONO = '"Share Tech Mono", monospace';
    let w = 0;
    let h = 0;
    let dpr = 1;
    let rafId = 0;
    const start = performance.now();

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    }

    // --- target brackets: drift → lock (red flash) → fade → respawn ---
    const DRIFT = 7;
    const LOCK = 1.3;
    const FADE = 0.9;
    const CYCLE = DRIFT + LOCK + FADE;
    const brackets = Array.from({ length: 3 }, (_, i) => spawnBracket(i * (CYCLE / 3)));

    function spawnBracket(offset) {
      return {
        x: 0.15 + Math.random() * 0.7,
        y: 0.18 + Math.random() * 0.64,
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.008,
        size: 26 + Math.random() * 18,
        tag: Math.random() < 0.25 ? 'HAMMER DRONE' : 'TGT LOCK',
        offset,
      };
    }

    function drawBracket(b, t) {
      const local = (t + b.offset) % CYCLE;
      let alpha = 0.16;
      let size = b.size;
      let color = `rgba(0, 217, 255,`;
      let drift = 1;

      if (local > DRIFT && local <= DRIFT + LOCK) {
        const k = (local - DRIFT) / LOCK;
        size = b.size * (1 - 0.35 * k);
        alpha = 0.16 + 0.24 * Math.sin(k * Math.PI);
        color = `rgba(230, 57, 70,`;
        drift = 1 - k;
      } else if (local > DRIFT + LOCK) {
        const k = (local - DRIFT - LOCK) / FADE;
        alpha = 0.16 * (1 - k);
        drift = 0;
        if (k > 0.98) Object.assign(b, spawnBracket(b.offset));
      }

      b.x = Math.min(0.92, Math.max(0.08, b.x + b.vx * drift * 0.016));
      b.y = Math.min(0.9, Math.max(0.1, b.y + b.vy * drift * 0.016));

      const x = b.x * w;
      const y = b.y * h;
      const s = size / 2;
      const c = size * 0.28;
      ctx.strokeStyle = `${color}${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // four corners of the bracket
      ctx.moveTo(x - s, y - s + c); ctx.lineTo(x - s, y - s); ctx.lineTo(x - s + c, y - s);
      ctx.moveTo(x + s - c, y - s); ctx.lineTo(x + s, y - s); ctx.lineTo(x + s, y - s + c);
      ctx.moveTo(x + s, y + s - c); ctx.lineTo(x + s, y + s); ctx.lineTo(x + s - c, y + s);
      ctx.moveTo(x - s + c, y + s); ctx.lineTo(x - s, y + s); ctx.lineTo(x - s, y + s - c);
      ctx.stroke();

      if (local > DRIFT && local <= DRIFT + LOCK) {
        ctx.fillStyle = `${color}${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `9px ${MONO}`;
        ctx.fillText(b.tag, x + s + 6, y - s + 8);
      }
    }

    // --- corner reticle: concentric rotating arcs + ticks, optional sweep ---
    function drawReticle(cx, cy, r, t, withSweep) {
      ctx.save();
      ctx.translate(cx, cy);

      // tick ring
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.10)';
      ctx.lineWidth = 1;
      for (let d = 0; d < 48; d++) {
        const ang = (d / 48) * Math.PI * 2 + t * 0.05;
        const long = d % 4 === 0;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
        ctx.lineTo(Math.cos(ang) * r * (long ? 0.94 : 0.975), Math.sin(ang) * r * (long ? 0.94 : 0.975));
        ctx.stroke();
      }

      // counter-rotating arc segments
      const arcs = [
        { rr: 0.82, from: 0.2, len: 1.4, speed: 0.22, a: 0.14 },
        { rr: 0.82, from: 2.4, len: 0.7, speed: 0.22, a: 0.14 },
        { rr: 0.66, from: 1.1, len: 2.2, speed: -0.3, a: 0.1 },
        { rr: 0.52, from: 0, len: 1.0, speed: 0.45, a: 0.12 },
      ];
      for (const a of arcs) {
        ctx.strokeStyle = `rgba(0, 217, 255, ${a.a})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, r * a.rr, a.from + t * a.speed, a.from + t * a.speed + a.len);
        ctx.stroke();
      }

      // gold accent arc
      ctx.strokeStyle = 'rgba(255, 165, 2, 0.10)';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.4, -t * 0.35, -t * 0.35 + 0.9);
      ctx.stroke();

      // crosshair
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.07)';
      ctx.beginPath();
      ctx.moveTo(-r * 1.06, 0); ctx.lineTo(r * 1.06, 0);
      ctx.moveTo(0, -r * 1.06); ctx.lineTo(0, r * 1.06);
      ctx.stroke();

      if (withSweep) {
        const sweep = t * 0.7;
        // fading trail behind the sweep line
        for (let i = 0; i < 14; i++) {
          ctx.strokeStyle = `rgba(0, 217, 255, ${0.09 * (1 - i / 14)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(sweep - i * 0.045) * r * 0.9, Math.sin(sweep - i * 0.045) * r * 0.9);
          ctx.stroke();
        }
        ctx.fillStyle = 'rgba(0, 217, 255, 0.25)';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // --- right-edge telemetry ruler ---
    function drawRuler(t) {
      const x = w - 22;
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.10)';
      ctx.lineWidth = 1;
      const scroll = (t * 12) % 28;
      for (let y = -28; y < h + 28; y += 28) {
        const yy = y + scroll;
        const major = Math.round((yy - scroll) / 28) % 4 === 0;
        ctx.beginPath();
        ctx.moveTo(x, yy);
        ctx.lineTo(x + (major ? 12 : 6), yy);
        ctx.stroke();
      }
    }

    // --- mono readouts ---
    function drawReadouts(t) {
      ctx.font = `10px ${MONO}`;
      const blink = 0.35 + 0.3 * Math.sin(t * 2.4);
      const pwr = String(Math.round(98 + Math.sin(t * 0.3) * 1.5)).padStart(3, '0');
      const up = Math.floor(t);
      const mm = String(Math.floor(up / 60)).padStart(2, '0');
      const ss = String(up % 60).padStart(2, '0');

      // bottom-left cluster
      ctx.fillStyle = `rgba(0, 217, 255, ${blink})`;
      ctx.beginPath();
      ctx.arc(26, h - 73, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(0, 217, 255, 0.30)';
      ctx.fillText('SYS ONLINE', 34, h - 70);
      ctx.fillStyle = 'rgba(0, 217, 255, 0.18)';
      ctx.fillText(`PWR ${pwr}%`, 34, h - 55);
      ctx.fillStyle = 'rgba(255, 165, 2, 0.18)';
      ctx.fillText('OUTPUT 400% CAPACITY', 34, h - 40);
      ctx.fillStyle = 'rgba(0, 217, 255, 0.18)';
      ctx.fillText('23.02°N 72.57°E', 34, h - 25);

      // bottom-right cluster
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 165, 2, 0.22)';
      ctx.fillText('J.A.R.V.I.S.', w - 40, h - 40);
      ctx.fillStyle = 'rgba(0, 217, 255, 0.16)';
      ctx.fillText(`T+${mm}:${ss}`, w - 40, h - 25);
      ctx.textAlign = 'left';
    }

    // altitude readout under the top-right reticle; every ~24s the IM1
    // icing problem kicks in, then clears
    function drawAltitude(t) {
      const x = w * 0.92;
      const y = h * 0.16 + Math.min(w, h) * 0.13 + 26;
      const phase = t % 24;
      ctx.font = `9px ${MONO}`;
      ctx.textAlign = 'center';
      if (phase >= 18 && phase < 21) {
        const flash = Math.sin(t * 8) > 0;
        if (flash) {
          ctx.fillStyle = 'rgba(230, 57, 70, 0.5)';
          ctx.fillText('WARNING: ICE BUILDUP', x, y);
        }
      } else if (phase >= 21 && phase < 23) {
        ctx.fillStyle = 'rgba(255, 165, 2, 0.3)';
        ctx.fillText('DEICING COMPLETE', x, y);
      } else {
        ctx.fillStyle = 'rgba(0, 217, 255, 0.2)';
        ctx.fillText('ALT 12192 M', x, y);
      }
      ctx.textAlign = 'left';
    }

    // rotating J.A.R.V.I.S. quotes, fading in and out
    const QUOTES = [
      'FOR YOU SIR, ALWAYS.',
      'WORKING ON A SECRET PROJECT, SIR?',
      'SHALL I RENDER USING PROPOSED SPECIFICATIONS?',
      'ALL WRAPPED UP HERE, SIR.',
      'COMMENCING AUTOMATED ASSEMBLY.',
    ];

    function drawQuote(t) {
      const PERIOD = 12;
      const local = t % PERIOD;
      const idx = Math.floor(t / PERIOD) % QUOTES.length;
      let alpha = 0;
      if (local > 1 && local < 2.5) alpha = (local - 1) / 1.5;
      else if (local >= 2.5 && local < 9) alpha = 1;
      else if (local >= 9 && local < 10.5) alpha = 1 - (local - 9) / 1.5;
      if (alpha <= 0) return;
      ctx.font = `10px ${MONO}`;
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(0, 217, 255, ${0.26 * alpha})`;
      ctx.fillText(`J.A.R.V.I.S.: “${QUOTES[idx]}”`, w / 2, h - 25);
      ctx.textAlign = 'left';
    }

    function draw(now) {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      const R = Math.min(w, h);
      drawReticle(w * 0.1, h * 0.84, R * 0.2, t, true);
      if (w >= 640) {
        drawReticle(w * 0.92, h * 0.16, R * 0.13, -t * 0.8, false);
        drawRuler(t);
        drawAltitude(t);
        drawQuote(t);
      }
      for (const b of brackets) drawBracket(b, t);
      drawReadouts(t);

      if (!reduce) rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    if (!reduce) rafId = requestAnimationFrame(draw);
    else draw(start);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />;
}
