import React, { useEffect, useRef } from 'react';

// About page background — repulsor energy field: soft drifting nebula glows,
// two parallax layers of twinkling particles, and an occasional repulsor
// streak crossing the screen. Calm ambience for long-form reading.
export default function RepulsorField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let rafId = 0;
    const start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(start);
    }

    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      far: i < 50,
      speed: 0.004 + Math.random() * 0.008,
      size: i < 50 ? 0.9 + Math.random() * 1.0 : 1.5 + Math.random() * 1.8,
      tw: Math.random() * Math.PI * 2,
      gold: Math.random() < 0.18,
    }));
    const near = particles.filter((p) => !p.far);

    // repulsor streak state
    let streak = null;
    let nextStreak = 2 + Math.random() * 3;

    function spawnStreak() {
      const fromLeft = Math.random() < 0.5;
      const y = 0.15 + Math.random() * 0.5;
      return {
        x: fromLeft ? -0.05 : 1.05,
        y,
        vx: (fromLeft ? 1 : -1) * (0.55 + Math.random() * 0.3),
        vy: (Math.random() - 0.4) * 0.12,
        life: 0,
      };
    }

    function drawNebulas(t) {
      const blobs = [
        { x: 0.2 + Math.sin(t * 0.05) * 0.04, y: 0.3 + Math.cos(t * 0.04) * 0.05, r: 0.5, c: '0, 217, 255', a: 0.10 },
        { x: 0.8 + Math.cos(t * 0.04) * 0.05, y: 0.7 + Math.sin(t * 0.05) * 0.04, r: 0.45, c: '255, 165, 2', a: 0.07 },
        { x: 0.6 + Math.sin(t * 0.03 + 2) * 0.05, y: 0.15 + Math.cos(t * 0.05 + 1) * 0.04, r: 0.32, c: '230, 57, 70', a: 0.055 },
      ];
      for (const b of blobs) {
        const r = b.r * Math.min(w, h);
        const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, r);
        g.addColorStop(0, `rgba(${b.c}, ${b.a})`);
        g.addColorStop(1, `rgba(${b.c}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(b.x * w - r, b.y * h - r, r * 2, r * 2);
      }
    }

    function drawParticles(t) {
      for (const p of particles) {
        if (!reduce) {
          p.x -= p.speed * (p.far ? 0.5 : 1) * 0.016;
          p.y -= p.speed * 0.3 * 0.016;
          if (p.x < -0.02) p.x = 1.02;
          if (p.y < -0.02) p.y = 1.02;
        }
        const twinkle = 0.55 + 0.45 * Math.sin(t * 1.2 + p.tw);
        const base = p.far ? 0.32 : 0.55;
        const color = p.gold ? '255, 165, 2' : '79, 195, 247';
        ctx.fillStyle = `rgba(${color}, ${base * twinkle})`;
        if (!p.far) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(0, 217, 255, 0.6)';
        }
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // energy web: link near-layer particles that drift close to each other
    function drawWeb() {
      const reach = Math.min(w, h) * 0.16;
      ctx.lineWidth = 1;
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const dx = (near[i].x - near[j].x) * w;
          const dy = (near[i].y - near[j].y) * h;
          const d = Math.hypot(dx, dy);
          if (d > reach) continue;
          const alpha = 0.13 * (1 - d / reach);
          ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(near[i].x * w, near[i].y * h);
          ctx.lineTo(near[j].x * w, near[j].y * h);
          ctx.stroke();
        }
      }
    }

    function drawStreak(dt) {
      if (!streak) {
        nextStreak -= dt;
        if (nextStreak <= 0 && !reduce) {
          streak = spawnStreak();
          nextStreak = 3 + Math.random() * 4;
        }
        return;
      }
      streak.life += dt;
      streak.x += streak.vx * dt;
      streak.y += streak.vy * dt;
      const fade = Math.min(1, streak.life / 0.15) * Math.max(0, 1 - streak.life / 1.1);
      const hx = streak.x * w;
      const hy = streak.y * h;
      const tx = hx - streak.vx * w * 0.16;
      const ty = hy - streak.vy * h * 0.16;
      const g = ctx.createLinearGradient(tx, ty, hx, hy);
      g.addColorStop(0, 'rgba(0, 217, 255, 0)');
      g.addColorStop(1, `rgba(120, 230, 255, ${0.75 * fade})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      ctx.fillStyle = `rgba(220, 250, 255, ${0.7 * fade})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00d9ff';
      ctx.beginPath();
      ctx.arc(hx, hy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (streak.life > 1.2 || streak.x < -0.1 || streak.x > 1.1) streak = null;
    }

    // vitals monitor: mini arc reactor beating alongside an EKG trace
    function ekgVal(tt) {
      const p = ((tt % 1.1) + 1.1) % 1.1 / 1.1;
      if (p >= 0.1 && p < 0.14) return ((p - 0.1) / 0.04) * -14; // spike up
      if (p >= 0.14 && p < 0.2) return (1 - (p - 0.14) / 0.06) * -14;
      if (p >= 0.42 && p < 0.52) return Math.sin(((p - 0.42) / 0.1) * Math.PI) * -4; // t-wave
      return 0;
    }

    function drawVitals(t) {
      const x = 30;
      const y = h - 64;
      const beat = 1 + Math.max(0, Math.sin(((t % 1.1) / 1.1) * Math.PI * 2)) * 0.12;
      // mini arc reactor
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 10 * beat, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      for (let v = 0; v < 3; v++) {
        const va = -Math.PI / 2 + v * ((Math.PI * 2) / 3);
        const px = x + Math.cos(va) * 5 * beat;
        const py = y + Math.sin(va) * 5 * beat;
        if (v === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(120, 230, 255, ${0.35 * beat})`;
      ctx.fill();
      // EKG trace
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.30)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 110; i += 2) {
        const px = x + 20 + i;
        const py = y + ekgVal(t - (110 - i) * 0.012);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(0, 217, 255, 0.28)';
      ctx.fillText('VITALS: STABLE', x + 20, y + 20);
    }

    // rare quotes that slowly fade in and out
    const QUOTES = ['I AM IRON MAN', 'LOVE YOU 3000', 'PART OF THE JOURNEY IS THE END'];

    function drawQuote(t) {
      const PERIOD = 22;
      const local = t % PERIOD;
      const idx = Math.floor(t / PERIOD) % QUOTES.length;
      let alpha = 0;
      if (local > 3 && local < 6) alpha = (local - 3) / 3;
      else if (local >= 6 && local < 11) alpha = 1;
      else if (local >= 11 && local < 14) alpha = 1 - (local - 11) / 3;
      if (alpha <= 0) return;
      ctx.font = '11px "Share Tech Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillStyle = `rgba(255, 165, 2, ${0.24 * alpha})`;
      ctx.fillText(QUOTES[idx], w - 36, h - 34);
      ctx.textAlign = 'left';
    }

    let last = start;
    function draw(now) {
      const t = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      drawNebulas(t);
      drawWeb();
      drawParticles(t);
      drawStreak(dt);
      drawVitals(t);
      drawQuote(t);
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
