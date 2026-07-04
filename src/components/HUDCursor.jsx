import React, { useEffect, useRef } from 'react';

// Custom HUD cursor: arc-blue dot + lerped ring that flares red over
// interactive elements. Only active on fine pointers with motion enabled.
export default function HUDCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    document.body.classList.add('hud-cursor-active');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    const isHot = (target) => target.closest?.('a, button, [role="button"], input, textarea, [data-hot]');
    const onOver = (e) => {
      if (isHot(e.target)) ring.classList.add('is-hot');
    };
    const onOut = (e) => {
      if (isHot(e.target)) ring.classList.remove('is-hot');
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('hud-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
