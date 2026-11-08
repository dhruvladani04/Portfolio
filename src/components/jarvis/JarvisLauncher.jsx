'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { FiMic, FiPlay, FiX } from 'react-icons/fi';

// Each cue appears at most once per visit (sessionStorage), and every cue
// stops for good once the visitor has opened the panel.
const HINT_KEY = 'dl:jarvis-hint';
const NUDGE_KEY = 'dl:jarvis-nudge';
const HINT_AT = 2500;
const HINT_FOR = 5000;
const NUDGE_AT = 20000;
const NUDGE_FOR = 15000;
const SHIMMER_FIRST = 12000;
const SHIMMER_EVERY = 30000;
const SHIMMER_FOR = 1600;

function seen(key) {
  try {
    return Boolean(sessionStorage.getItem(key));
  } catch (_) {
    return false; // storage blocked: show the cue rather than hide it
  }
}

function markSeen(key) {
  try {
    sessionStorage.setItem(key, '1');
  } catch (_) { /* storage blocked */ }
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Floating arc-reactor orb, bottom-right on every page, with a mic in its
// core so it reads as a voice assistant at a glance. Three quiet cues explain
// it: the "Ask J.A.R.V.I.S." label slides out for a few seconds per visit
// (and on hover/focus), the core briefly turns into a sound wave every
// half-minute, and once per visit a bubble offers the 60-second brief.
// A red ring means a voice session is still live.
const JarvisLauncher = forwardRef(function JarvisLauncher({ hidden, live, engaged, onClick, onBrief }, ref) {
  const [hint, setHint] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const quiet = hidden || live || engaged;
  const quietRef = useRef(quiet);
  quietRef.current = quiet;

  useEffect(() => {
    if (seen(HINT_KEY)) return undefined;
    const show = setTimeout(() => {
      if (quietRef.current) return;
      setHint(true);
      markSeen(HINT_KEY);
    }, HINT_AT);
    const hide = setTimeout(() => setHint(false), HINT_AT + HINT_FOR);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (seen(NUDGE_KEY)) return undefined;
    let hide;
    const show = setTimeout(() => {
      if (quietRef.current || document.visibilityState !== 'visible') return;
      setNudge(true);
      markSeen(NUDGE_KEY);
      hide = setTimeout(() => setNudge(false), NUDGE_FOR);
    }, NUDGE_AT);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (quiet || prefersReducedMotion()) return undefined;
    let every;
    let off;
    const pulse = () => {
      if (document.visibilityState !== 'visible') return;
      setShimmer(true);
      off = setTimeout(() => setShimmer(false), SHIMMER_FOR);
    };
    const first = setTimeout(() => {
      pulse();
      every = setInterval(pulse, SHIMMER_EVERY);
    }, SHIMMER_FIRST);
    return () => {
      clearTimeout(first);
      clearInterval(every);
      clearTimeout(off);
      setShimmer(false);
    };
  }, [quiet]);

  const showNudge = nudge && !quiet;

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="jarvis-orb"
        data-hidden={hidden}
        data-live={live}
        data-hint={hint && !quiet}
        data-shimmer={shimmer}
        aria-label={live ? 'Return to J.A.R.V.I.S. — conversation in progress' : 'Ask J.A.R.V.I.S., Dhruv’s AI voice and chat assistant'}
        aria-haspopup="dialog"
        aria-controls="jarvis-panel"
        aria-expanded={hidden}
        tabIndex={hidden ? -1 : 0}
        onClick={onClick}
      >
        <span className="jarvis-orb-ring" aria-hidden />
        <span className="jarvis-orb-ring jarvis-orb-ring--gold" aria-hidden />
        <span className="jarvis-orb-core" aria-hidden>
          <FiMic className="jarvis-orb-mic" />
          <span className="jarvis-orb-wave">
            <i />
            <i />
            <i />
          </span>
        </span>
        <span className="jarvis-orb-label" aria-hidden>
          {live ? 'Session live' : 'Ask J.A.R.V.I.S.'}
        </span>
      </button>

      {showNudge && (
        <div className="jarvis-nudge" role="status">
          <button
            type="button"
            className="jarvis-nudge-main"
            onClick={() => {
              setNudge(false);
              onBrief();
            }}
          >
            <span className="jarvis-nudge-eyebrow">J.A.R.V.I.S.</span>
            <span className="jarvis-nudge-text">Want a 60-second brief on Dhruv?</span>
            <span className="jarvis-nudge-cta">
              <FiPlay aria-hidden /> Play the brief
            </span>
          </button>
          <button type="button" className="jarvis-nudge-close" aria-label="Dismiss" onClick={() => setNudge(false)}>
            <FiX aria-hidden />
          </button>
        </div>
      )}
    </>
  );
});

export default JarvisLauncher;
