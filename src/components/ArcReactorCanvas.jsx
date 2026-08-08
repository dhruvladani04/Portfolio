'use client';

import React, { useEffect, useRef } from 'react';

const BLUE = '#00d9ff';
const COILS = 10;

// Canvas arc reactor: rotating tick ring, counter-rotating copper coils,
// inward-spiralling energy particles, gold + blue accent rings, breathing core.
export default function ArcReactorCanvas({ resolution = 960, className = '', label = 'Animated arc reactor' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    const CW = canvas.width;
    const CH = canvas.height;
    const cx = CW / 2;
    const cy = CH / 2;
    const R = CW * 0.44;

    const particles = Array.from({ length: 42 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: R * (0.62 + Math.random() * 0.42),
      speed: 0.6 + Math.random(),
      size: 0.8 + Math.random() * 1.7,
    }));

    // pre-rendered glow sprite: drawImage is far cheaper than per-draw shadowBlur
    const glow = document.createElement('canvas');
    glow.width = glow.height = 64;
    {
      const g = glow.getContext('2d');
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(230, 250, 255, 1)');
      grad.addColorStop(0.25, 'rgba(79, 195, 247, 0.8)');
      grad.addColorStop(1, 'rgba(0, 217, 255, 0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
    }

    let t = 0;
    let rafId = 0;
    let visible = true;

    function roundedRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    function draw() {
      t += reduce ? 0 : 0.016;
      ctx.clearRect(0, 0, CW, CH);
      ctx.save();
      ctx.translate(cx, cy);
      const breathe = 1 + Math.sin(t * 1.6) * 0.02;

      // ambient glow
      const amb = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.3);
      amb.addColorStop(0, 'rgba(0,217,255,0.16)');
      amb.addColorStop(0.5, 'rgba(0,217,255,0.05)');
      amb.addColorStop(1, 'rgba(0,217,255,0)');
      ctx.fillStyle = amb;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // outer ticks
      ctx.save();
      ctx.rotate(t * 0.18);
      ctx.strokeStyle = 'rgba(0,217,255,0.35)';
      ctx.lineWidth = 2;
      for (let d = 0; d < 72; d++) {
        const ang = (d / 72) * Math.PI * 2;
        const long = d % 6 === 0;
        const r1 = R * 1.02;
        const r2 = R * (long ? 0.95 : 0.985);
        ctx.globalAlpha = long ? 0.8 : 0.4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
        ctx.lineTo(Math.cos(ang) * r2, Math.sin(ang) * r2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // copper coil windings
      ctx.save();
      ctx.rotate(-t * 0.32);
      const coilR = R * 0.72;
      for (let c = 0; c < COILS; c++) {
        const ca = (c / COILS) * Math.PI * 2;
        const glow = 0.55 + 0.45 * Math.sin(t * 3 + c * 0.9);
        ctx.save();
        ctx.rotate(ca);
        ctx.translate(coilR, 0);
        ctx.fillStyle = 'rgba(10,14,22,0.95)';
        ctx.strokeStyle = `rgba(0,217,255,${0.3 + glow * 0.4})`;
        ctx.lineWidth = 3;
        roundedRect(ctx, -R * 0.055, -R * 0.1, R * 0.11, R * 0.2, 6);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,165,2,${0.35 + glow * 0.45})`;
        ctx.lineWidth = 2;
        for (let w = -3; w <= 3; w++) {
          ctx.beginPath();
          ctx.moveTo(-R * 0.05, w * R * 0.028);
          ctx.lineTo(R * 0.05, w * R * 0.028);
          ctx.stroke();
        }
        ctx.restore();
      }
      ctx.restore();

      // inward-spiralling particles (glow sprite, no shadowBlur)
      ctx.save();
      for (const pt of particles) {
        if (!reduce) {
          pt.r -= pt.speed;
          pt.a += 0.01;
        }
        if (pt.r < R * 0.3) {
          pt.r = R * (0.75 + Math.random() * 0.28);
          pt.a = Math.random() * Math.PI * 2;
        }
        const px = Math.cos(pt.a) * pt.r;
        const py = Math.sin(pt.a) * pt.r;
        const fade = Math.min(1, (pt.r - R * 0.3) / (R * 0.4));
        const s = pt.size * 7;
        ctx.globalAlpha = 0.7 * fade;
        ctx.drawImage(glow, px - s / 2, py - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // gold ring
      ctx.save();
      ctx.rotate(t * 0.5);
      ctx.strokeStyle = 'rgba(255,165,2,0.55)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.52, 0, Math.PI * 1.55);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255,165,2,0.3)';
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.52, Math.PI * 1.7, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // blue inner arcs
      ctx.save();
      ctx.rotate(-t * 0.7);
      ctx.strokeStyle = 'rgba(0,217,255,0.6)';
      ctx.lineWidth = 3;
      for (let s = 0; s < 3; s++) {
        ctx.beginPath();
        ctx.arc(0, 0, R * 0.42, s * ((Math.PI * 2) / 3) + 0.2, s * ((Math.PI * 2) / 3) + Math.PI * 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // breathing triangular core
      ctx.save();
      ctx.scale(breathe, breathe);
      const coreR = R * 0.3;
      const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * 1.4);
      cg.addColorStop(0, 'rgba(220,250,255,0.95)');
      cg.addColorStop(0.35, 'rgba(0,217,255,0.7)');
      cg.addColorStop(1, 'rgba(0,217,255,0)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.rotate(t * 0.1);
      ctx.beginPath();
      for (let v = 0; v < 3; v++) {
        const va = -Math.PI / 2 + v * ((Math.PI * 2) / 3);
        const vx = Math.cos(va) * coreR;
        const vy = Math.sin(va) * coreR;
        if (v === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 24;
      ctx.shadowColor = BLUE;
      ctx.stroke();
      const tg = ctx.createLinearGradient(-coreR, -coreR, coreR, coreR);
      tg.addColorStop(0, 'rgba(180,240,255,0.9)');
      tg.addColorStop(1, 'rgba(0,180,220,0.85)');
      ctx.fillStyle = tg;
      ctx.fill();
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#fff';
      ctx.fillStyle = '#eafcff';
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
      ctx.restore();

      if (visible) rafId = requestAnimationFrame(draw);
    }

    // pause rendering while scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) rafId = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    draw();
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={resolution}
      height={resolution}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label={label}
      role="img"
    />
  );
}
