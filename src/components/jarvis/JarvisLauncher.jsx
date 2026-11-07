'use client';

import { forwardRef, useEffect, useState } from 'react';

const HINT_KEY = 'dl:jarvis-hint';

// Floating arc-reactor orb, bottom-right on every page. Pure CSS so it adds
// nothing measurable to page weight; the label shows once per browser as a
// hint, then only on hover/focus. A red ring means a session is still live.
const JarvisLauncher = forwardRef(function JarvisLauncher({ hidden, live, onClick }, ref) {
  const [hint, setHint] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = Boolean(localStorage.getItem(HINT_KEY));
    } catch (_) { /* storage blocked: skip the hint */ }
    if (seen) return undefined;
    const show = setTimeout(() => setHint(true), 2500);
    const hide = setTimeout(() => {
      setHint(false);
      try {
        localStorage.setItem(HINT_KEY, '1');
      } catch (_) { /* storage blocked */ }
    }, 9000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className="jarvis-orb"
      data-hidden={hidden}
      data-live={live}
      data-hint={hint}
      aria-label={live ? 'Return to J.A.R.V.I.S. — conversation in progress' : 'Ask J.A.R.V.I.S., Dhruv’s AI assistant'}
      aria-haspopup="dialog"
      aria-controls="jarvis-panel"
      aria-expanded={hidden}
      tabIndex={hidden ? -1 : 0}
      onClick={onClick}
    >
      <span className="jarvis-orb-ring" aria-hidden />
      <span className="jarvis-orb-ring jarvis-orb-ring--gold" aria-hidden />
      <span className="jarvis-orb-core" aria-hidden />
      <span className="jarvis-orb-label" aria-hidden>
        {live ? 'Session live' : 'Ask J.A.R.V.I.S.'}
      </span>
    </button>
  );
});

export default JarvisLauncher;
