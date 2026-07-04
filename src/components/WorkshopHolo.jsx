import React, { useEffect, useRef } from 'react';

// Work page background — Tony's workshop hologram: a perspective holo floor
// grid scrolling toward the viewer, plus floating wireframe schematics
// (hex cluster, blueprint plate, reactor sketch) that flicker like holograms.
export default function WorkshopHolo() {
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

    // hologram flicker: mostly steady, occasional dropouts
    function flicker(t, seed) {
      const n = Math.sin(t * 13.7 + seed * 91.3) * Math.sin(t * 7.1 + seed * 37.7);
      return n > 0.96 ? 0.35 : 1;
    }

    function drawFloor(t) {
      const horizon = h * 0.68;
      const vpx = w / 2;

      // horizon glow line
      const hg = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 40);
      hg.addColorStop(0, 'rgba(0, 217, 255, 0)');
      hg.addColorStop(0.5, 'rgba(0, 217, 255, 0.05)');
      hg.addColorStop(1, 'rgba(0, 217, 255, 0)');
      ctx.fillStyle = hg;
      ctx.fillRect(0, horizon - 40, w, 80);

      // horizontal lines with perspective spacing, scrolling toward viewer
      ctx.lineWidth = 1;
      const scroll = (t * 0.06) % (1 / 12);
      for (let i = 0; i < 14; i++) {
        const k = i / 12 + scroll;
        if (k > 1.1) continue;
        const y = horizon + (h - horizon) * k * k;
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.03 + k * 0.07})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // converging vertical lines
      for (let i = -9; i <= 9; i++) {
        const xBottom = vpx + i * (w / 10);
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
        ctx.beginPath();
        ctx.moveTo(vpx, horizon);
        ctx.lineTo(xBottom, h);
        ctx.stroke();
      }
    }

    function hexPath(x, y, r) {
      ctx.beginPath();
      for (let v = 0; v < 6; v++) {
        const a = (v / 6) * Math.PI * 2 + Math.PI / 6;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (v === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    // floating hex-plate cluster (armor schematic)
    function drawHexCluster(t) {
      const cx = w * 0.82;
      const cy = h * 0.3 + Math.sin(t * 0.5) * 10;
      const a = 0.12 * flicker(t, 1);
      const r = Math.min(w, h) * 0.028;
      ctx.strokeStyle = `rgba(0, 217, 255, ${a})`;
      ctx.lineWidth = 1;
      const cells = [[0, 0], [1.8, 0], [-1.8, 0], [0.9, 1.56], [-0.9, 1.56], [0.9, -1.56], [-0.9, -1.56]];
      for (const [ox, oy] of cells) {
        hexPath(cx + ox * r, cy + oy * r, r * 0.92);
        ctx.stroke();
      }
      ctx.fillStyle = `rgba(255, 165, 2, ${a * 0.9})`;
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillText('MK-VII PLATING', cx - r * 2.6, cy + r * 3.6);
    }

    // rotating blueprint plate with fake 3D yaw
    function drawPlate(t) {
      const cx = w * 0.14;
      const cy = h * 0.24 + Math.sin(t * 0.4 + 2) * 12;
      const a = 0.11 * flicker(t, 2);
      const yaw = Math.cos(t * 0.35);
      const pw = Math.min(w, h) * 0.09 * Math.max(0.25, Math.abs(yaw));
      const ph = Math.min(w, h) * 0.12;
      ctx.strokeStyle = `rgba(0, 217, 255, ${a})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - pw, cy - ph / 2, pw * 2, ph);
      // inner circuit lines
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - pw, cy - ph / 2 + (ph * i) / 4);
        ctx.lineTo(cx + pw, cy - ph / 2 + (ph * i) / 4);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx, cy - ph / 2);
      ctx.lineTo(cx, cy + ph / 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(0, 217, 255, ${a})`;
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillText('SCHEMATIC 04-A', cx - pw, cy - ph / 2 - 8);
    }

    // small reactor blueprint sketch
    function drawReactorSketch(t) {
      const cx = w * 0.68;
      const cy = h * 0.78 + Math.sin(t * 0.45 + 4) * 8;
      const a = 0.1 * flicker(t, 3);
      const r = Math.min(w, h) * 0.045;
      ctx.strokeStyle = `rgba(255, 165, 2, ${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = `rgba(0, 217, 255, ${a})`;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.62, t * 0.4, t * 0.4 + Math.PI * 1.4);
      ctx.stroke();
      ctx.beginPath();
      for (let v = 0; v < 3; v++) {
        const va = -Math.PI / 2 + v * ((Math.PI * 2) / 3) + t * 0.1;
        const px = cx + Math.cos(va) * r * 0.35;
        const py = cy + Math.sin(va) * r * 0.35;
        if (v === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      // dimension line
      ctx.beginPath();
      ctx.moveTo(cx + r + 8, cy - r);
      ctx.lineTo(cx + r + 8, cy + r);
      ctx.stroke();
      ctx.fillStyle = `rgba(0, 217, 255, ${a})`;
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillText('Ø1.90', cx + r + 12, cy + 3);
      ctx.fillStyle = `rgba(255, 165, 2, ${a * 0.9})`;
      ctx.fillText('PROOF THAT TONY STARK HAS A HEART', cx - r * 2.4, cy + r + 18);
    }

    // wireframe helmet blueprint with glowing eye slits
    function drawHelmet(t) {
      const cx = w * 0.09;
      const cy = h * 0.56 + Math.sin(t * 0.42 + 1) * 8;
      const a = 0.13 * flicker(t, 6);
      const hw = Math.min(w, h) * 0.05;
      const hh = hw * 1.3;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = `rgba(0, 217, 255, ${a})`;
      ctx.lineWidth = 1;
      // outline
      ctx.beginPath();
      ctx.moveTo(0, -hh);
      ctx.quadraticCurveTo(hw, -hh, hw, -hh * 0.2);
      ctx.lineTo(hw * 0.85, hh * 0.55);
      ctx.quadraticCurveTo(hw * 0.7, hh, hw * 0.4, hh);
      ctx.lineTo(-hw * 0.4, hh);
      ctx.quadraticCurveTo(-hw * 0.7, hh, -hw * 0.85, hh * 0.55);
      ctx.lineTo(-hw, -hh * 0.2);
      ctx.quadraticCurveTo(-hw, -hh, 0, -hh);
      ctx.stroke();
      // brow + jaw plate lines
      ctx.beginPath();
      ctx.moveTo(-hw * 0.9, -hh * 0.18);
      ctx.lineTo(-hw * 0.25, -hh * 0.1);
      ctx.lineTo(0, -hh * 0.16);
      ctx.lineTo(hw * 0.25, -hh * 0.1);
      ctx.lineTo(hw * 0.9, -hh * 0.18);
      ctx.moveTo(-hw * 0.55, hh * 0.15);
      ctx.lineTo(-hw * 0.4, hh * 0.85);
      ctx.moveTo(hw * 0.55, hh * 0.15);
      ctx.lineTo(hw * 0.4, hh * 0.85);
      ctx.moveTo(-hw * 0.3, hh * 0.55);
      ctx.lineTo(hw * 0.3, hh * 0.55);
      ctx.stroke();
      // glowing eye slits
      const eye = 0.5 + 0.4 * Math.sin(t * 1.1);
      ctx.fillStyle = `rgba(180, 240, 255, ${(0.3 + 0.3 * eye) * flicker(t, 6)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00d9ff';
      ctx.fillRect(-hw * 0.62, -hh * 0.02, hw * 0.4, 2.5);
      ctx.fillRect(hw * 0.22, -hh * 0.02, hw * 0.4, 2.5);
      ctx.shadowBlur = 0;
      ctx.restore();
      ctx.fillStyle = `rgba(0, 217, 255, ${a})`;
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillText('HUD CALIBRATION', cx - hw, cy + hh + 16);
    }

    // Dum-E: Tony's helper bot, slowly waving its arm
    function drawDumE(t) {
      const bx = w * 0.9;
      const by = h * 0.66;
      const a = 0.14 * flicker(t, 7);
      const s = Math.min(w, h) * 0.085;
      const a1 = -1.15 + Math.sin(t * 0.35) * 0.12; // lower arm angle
      const a2 = 1.05 + Math.sin(t * 0.5 + 1) * 0.3; // elbow bend
      ctx.save();
      ctx.translate(bx, by);
      ctx.strokeStyle = `rgba(0, 217, 255, ${a})`;
      ctx.lineWidth = 1.5;
      // wheeled base
      ctx.strokeRect(-s * 0.3, -s * 0.08, s * 0.6, s * 0.12);
      ctx.beginPath();
      ctx.arc(-s * 0.18, s * 0.08, s * 0.05, 0, Math.PI * 2);
      ctx.arc(s * 0.18, s * 0.08, s * 0.05, 0, Math.PI * 2);
      ctx.stroke();
      // arm segment 1
      const j1x = Math.cos(a1) * s * 0.55;
      const j1y = -s * 0.08 + Math.sin(a1) * s * 0.55;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.08);
      ctx.lineTo(j1x, j1y);
      ctx.stroke();
      // arm segment 2
      const j2x = j1x + Math.cos(a1 + a2) * s * 0.45;
      const j2y = j1y + Math.sin(a1 + a2) * s * 0.45;
      ctx.beginPath();
      ctx.moveTo(j1x, j1y);
      ctx.lineTo(j2x, j2y);
      ctx.stroke();
      // joints
      ctx.fillStyle = `rgba(0, 217, 255, ${a * 1.4})`;
      for (const [jx, jy] of [[0, -s * 0.08], [j1x, j1y]]) {
        ctx.beginPath();
        ctx.arc(jx, jy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // claw (opens and closes)
      const open = 0.35 + 0.25 * Math.sin(t * 0.9);
      const dir = a1 + a2;
      ctx.beginPath();
      ctx.moveTo(j2x, j2y);
      ctx.lineTo(j2x + Math.cos(dir + open) * s * 0.16, j2y + Math.sin(dir + open) * s * 0.16);
      ctx.moveTo(j2x, j2y);
      ctx.lineTo(j2x + Math.cos(dir - open) * s * 0.16, j2y + Math.sin(dir - open) * s * 0.16);
      ctx.stroke();
      ctx.restore();
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillStyle = `rgba(0, 217, 255, ${a * 1.6})`;
      ctx.fillText('DUM-E', bx - s * 0.3, by + s * 0.3);
      ctx.fillStyle = `rgba(255, 165, 2, ${a * 1.3})`;
      ctx.fillText('FIRE SAFETY: ACTIVE', bx - s * 0.3, by + s * 0.3 + 13);
    }

    // armor registry with a scanning highlight
    const REGISTRY = [
      ['MK I', 'DESTROYED'],
      ['MK II', 'RHODES'],
      ['MK III', 'DAMAGED'],
      ['MK IV', 'ACTIVE'],
      ['MK V', 'STANDBY'],
      ['MK VI', 'ACTIVE'],
    ];

    function drawRegistry(t) {
      const x = w * 0.045;
      const y = h * 0.76;
      const hot = Math.floor(t / 1.4) % REGISTRY.length;
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillStyle = 'rgba(255, 165, 2, 0.24)';
      ctx.fillText('ARMOR REGISTRY', x, y);
      for (let i = 0; i < REGISTRY.length; i++) {
        const active = i === hot;
        ctx.fillStyle = active ? 'rgba(0, 217, 255, 0.42)' : 'rgba(0, 217, 255, 0.14)';
        ctx.fillText(`${REGISTRY[i][0].padEnd(7, ' ')}${REGISTRY[i][1]}`, x, y + 15 + i * 13);
        if (active) {
          ctx.fillRect(x - 8, y + 11 + i * 13, 3, 3);
        }
      }
      ctx.fillStyle = 'rgba(136, 136, 160, 0.16)';
      ctx.fillText('NOTE: TRY SHAWARMA', x, y + 15 + REGISTRY.length * 13 + 8);
    }

    // IM2 "new element" hologram: nucleus cluster + three tilted electron
    // orbits with travelling electrons, synthesis pulse rings, and a readout
    function drawAtom(t) {
      const mobile = w < 640;
      const cx = mobile ? w * 0.8 : w * 0.64;
      const cy = mobile ? h * 0.26 : h * 0.3;
      const R = Math.min(w, h) * (mobile ? 0.1 : 0.12);
      const flick = flicker(t, 5);
      ctx.save();
      ctx.translate(cx, cy);

      // ambient holo glow
      const amb = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.5);
      amb.addColorStop(0, 'rgba(0, 217, 255, 0.10)');
      amb.addColorStop(1, 'rgba(0, 217, 255, 0)');
      ctx.fillStyle = amb;
      ctx.fillRect(-R * 1.5, -R * 1.5, R * 3, R * 3);

      // containment ring with ticks
      ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * flick})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.18, 0, Math.PI * 2);
      ctx.stroke();
      for (let d = 0; d < 24; d++) {
        const a = (d / 24) * Math.PI * 2 - t * 0.1;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * R * 1.18, Math.sin(a) * R * 1.18);
        ctx.lineTo(Math.cos(a) * R * 1.13, Math.sin(a) * R * 1.13);
        ctx.stroke();
      }

      // electron orbits (rotated squashed ellipses = fake 3D tilt)
      const rings = [
        { rot: 0.35 + t * 0.12, squash: 0.34, phase: t * 1.3 },
        { rot: 1.4 - t * 0.09, squash: 0.3, phase: t * 1.0 + 2.1 },
        { rot: 2.45 + t * 0.1, squash: 0.42, phase: t * 1.6 + 4.2 },
      ];
      for (const ring of rings) {
        ctx.save();
        ctx.rotate(ring.rot);
        ctx.scale(1, ring.squash);
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * flick})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // electron on this orbit (transform applied manually so glow stays round)
        const ea = ring.phase;
        const ex = Math.cos(ea) * R;
        const ey = Math.sin(ea) * R * ring.squash;
        const rx = ex * Math.cos(ring.rot) - ey * Math.sin(ring.rot);
        const ry = ex * Math.sin(ring.rot) + ey * Math.cos(ring.rot);
        const depth = 0.55 + 0.45 * Math.sin(ea); // dimmer at the "back"
        ctx.fillStyle = `rgba(180, 240, 255, ${0.75 * depth * flick})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00d9ff';
        ctx.beginPath();
        ctx.arc(rx, ry, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // nucleus: tight cluster of glowing protons/neutrons, breathing
      const breathe = 1 + Math.sin(t * 1.8) * 0.06;
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.32);
      core.addColorStop(0, `rgba(220, 250, 255, ${0.55 * flick})`);
      core.addColorStop(0.5, `rgba(0, 217, 255, ${0.25 * flick})`);
      core.addColorStop(1, 'rgba(0, 217, 255, 0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.32, 0, Math.PI * 2);
      ctx.fill();
      const cluster = [[0, 0], [1, 0.35], [-0.8, 0.6], [0.45, -0.9], [-0.55, -0.7], [0.95, -0.4], [-1.05, -0.1]];
      for (let i = 0; i < cluster.length; i++) {
        const [ox, oy] = cluster[i];
        const nr = R * 0.055 * breathe;
        ctx.fillStyle = i % 2 === 0
          ? `rgba(200, 245, 255, ${0.8 * flick})`
          : `rgba(0, 190, 235, ${0.7 * flick})`;
        ctx.beginPath();
        ctx.arc(ox * nr * 1.7, oy * nr * 1.7, nr, 0, Math.PI * 2);
        ctx.fill();
      }

      // synthesis pulse ring every ~4s
      const pulseAge = (t % 4.2) / 4.2;
      if (pulseAge < 0.6) {
        const pr = R * 0.3 + pulseAge * R * 1.4;
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.25 * (1 - pulseAge / 0.6)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, pr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // readout
      const pct = (95.5 + 4.4 * (0.5 + 0.5 * Math.sin(t * 0.2))).toFixed(1);
      ctx.font = '9px "Share Tech Mono", monospace';
      ctx.fillStyle = `rgba(0, 217, 255, ${0.3 * flick})`;
      ctx.fillText('NEW ELEMENT', -R * 0.9, R * 1.45);
      ctx.fillStyle = `rgba(255, 165, 2, ${0.28 * flick})`;
      ctx.fillText(`SYNTHESIS ${pct}%`, -R * 0.9, R * 1.45 + 14);

      ctx.restore();
    }

    // sparks drifting up from the floor
    const sparks = Array.from({ length: 16 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 0.008 + Math.random() * 0.014,
      size: 0.8 + Math.random() * 1.2,
    }));

    function drawSparks(t) {
      for (const p of sparks) {
        p.y -= p.s * 0.016;
        if (p.y < 0.45) {
          p.y = 1;
          p.x = Math.random();
        }
        const fade = Math.min(1, (p.y - 0.45) / 0.2) * Math.min(1, (1 - p.y) / 0.1 + 0.3);
        ctx.fillStyle = `rgba(0, 217, 255, ${0.25 * fade})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function draw(now) {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      drawFloor(t);
      drawSparks(t);
      drawAtom(t);
      if (w >= 640) {
        drawHexCluster(t);
        drawPlate(t);
        drawHelmet(t);
        drawDumE(t);
        drawRegistry(t);
      }
      drawReactorSketch(t);
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
