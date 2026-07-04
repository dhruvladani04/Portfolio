import React, { useEffect, useRef } from 'react';

// Contact page background — open comms channel: animated waveform lines,
// a soft scan band sweeping down, sonar pings expanding from random points,
// and a blinking "COMMS CHANNEL OPEN" readout.
export default function CommsTelemetry() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const MONO = '"Share Tech Mono", monospace';
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

    function drawWave(baseY, t, speed, amp, color, alpha) {
      ctx.strokeStyle = `rgba(${color}, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const k = x / w;
        const y =
          baseY +
          Math.sin(k * 14 + t * speed) * amp * 0.5 +
          Math.sin(k * 31 + t * speed * 1.7) * amp * 0.3 +
          Math.sin(k * 5 + t * speed * 0.6) * amp * 0.6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // sonar pings with rotating MCU caller IDs
    const CALLERS = ['SIGNAL', 'STARK IND.', 'S.H.I.E.L.D.', 'AVENGERS TWR', 'P. POTTS', 'H. HOGAN'];
    const pings = [];
    let nextPing = 1.5;
    let callerIdx = 0;

    function drawPings(t, dt) {
      nextPing -= dt;
      if (nextPing <= 0 && !reduce) {
        pings.push({
          x: (0.15 + Math.random() * 0.7) * w,
          y: (0.2 + Math.random() * 0.55) * h,
          age: 0,
          label: CALLERS[callerIdx++ % CALLERS.length],
        });
        nextPing = 3.5 + Math.random() * 3;
      }
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        p.age += dt;
        if (p.age > 2.4) {
          pings.splice(i, 1);
          continue;
        }
        // three staggered expanding rings
        for (let r = 0; r < 3; r++) {
          const age = p.age - r * 0.25;
          if (age < 0) continue;
          const radius = age * 70;
          const alpha = Math.max(0, 0.2 * (1 - age / 1.9));
          ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        // center crosshair
        const ca = Math.max(0, 0.35 * (1 - p.age / 2));
        ctx.strokeStyle = `rgba(255, 165, 2, ${ca})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x - 7, p.y); ctx.lineTo(p.x + 7, p.y);
        ctx.moveTo(p.x, p.y - 7); ctx.lineTo(p.x, p.y + 7);
        ctx.stroke();
        if (p.age < 1.2) {
          ctx.fillStyle = `rgba(0, 217, 255, ${ca})`;
          ctx.font = `9px ${MONO}`;
          ctx.fillText(p.label, p.x + 12, p.y - 8);
        }
      }
    }

    // soft scan band sweeping down the screen
    function drawScanBand(t) {
      const y = ((t * 40) % (h + 240)) - 120;
      const g = ctx.createLinearGradient(0, y - 100, 0, y + 100);
      g.addColorStop(0, 'rgba(0, 217, 255, 0)');
      g.addColorStop(0.5, 'rgba(0, 217, 255, 0.025)');
      g.addColorStop(1, 'rgba(0, 217, 255, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 100, w, 200);
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    function drawReadout(t) {
      ctx.font = `10px ${MONO}`;
      const cursor = Math.sin(t * 3) > 0 ? '▮' : ' ';
      ctx.fillStyle = 'rgba(0, 217, 255, 0.30)';
      ctx.fillText(`COMMS CHANNEL OPEN ${cursor}`, 26, h - 44);
      ctx.fillStyle = 'rgba(0, 217, 255, 0.16)';
      ctx.fillText('ENCRYPTION: STARKSECURE v9.4', 26, h - 29);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 165, 2, 0.20)';
      ctx.fillText('FREQ 040.12 MHz', w - 26, h - 30);
      ctx.textAlign = 'left';

      // every ~30s Fury tries to reach you
      const phase = t % 31;
      if (phase > 24 && phase < 29 && w >= 640) {
        const blink = Math.sin(t * 5) > -0.3;
        if (blink) {
          ctx.fillStyle = 'rgba(230, 57, 70, 0.42)';
          ctx.fillText('1 MISSED CALL — N. FURY', 26, 108);
        }
      }
    }

    let last = start;
    function draw(now) {
      const t = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      drawScanBand(t);
      // waveform pair along the bottom, echo along the top
      drawWave(h - 70, t, 1.6, 12, '0, 217, 255', 0.14);
      drawWave(h - 70, t, 1.1, 18, '255, 165, 2', 0.07);
      if (w >= 640) drawWave(96, t, 0.9, 8, '0, 217, 255', 0.08);
      drawPings(t, dt);
      drawReadout(t);
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
