'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createHologram } from './hologram-core';

/**
 * Holographic point-cloud avatar.
 * Put holo-color.jpg and holo-data.png in /public/hologram/.
 * The canvas is transparent: place this inside the arc-reactor core
 * (position it absolutely over the reactor canvas, centred).
 *
 *   <div className="reactor-core">
 *     <HologramAvatar className="holo" />
 *   </div>
 */
export default function HologramAvatar({
  colorSrc = '/hologram/holo-color.jpg',
  depthSrc = '/hologram/holo-data.png',
  tint = '#22d3ee',
  hot = '#e0fbff',
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let holo;
    try {
      holo = createHologram(el, { THREE, colorSrc, depthSrc, tint, hot });
    } catch (err) {
      // No WebGL: fall back to the static cutout so the core is never empty
      el.style.background = `center / contain no-repeat url(${colorSrc})`;
      el.style.filter = 'grayscale(1) sepia(1) hue-rotate(150deg) saturate(3) brightness(0.9)';
      return undefined;
    }
    return () => holo.dispose();
  }, [colorSrc, depthSrc, tint, hot]);

  return (
    <div
      ref={ref}
      className={className}
      role="img"
      aria-label="Hologram of Dhruv Ladani"
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
}
