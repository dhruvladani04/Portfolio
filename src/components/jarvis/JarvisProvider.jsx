'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { JARVIS_ENABLED } from '../../lib/jarvis-agent';
import JarvisLauncher from './JarvisLauncher';

// The panel (and the Gemini SDK inside it) is a separate chunk, fetched
// on the first click of the orb, so pages don't pay for it on load.
const JarvisPanel = dynamic(() => import('./JarvisPanel'), { ssr: false });

const JarvisContext = createContext(null);

// null when J.A.R.V.I.S. is switched off (JARVIS_ENABLED) — callers hide
// their J.A.R.V.I.S. entry points in that case.
export function useJarvis() {
  return useContext(JarvisContext);
}

// view: 'closed' (no session) | 'open' | 'minimized' (hidden, session kept —
// e.g. after the agent navigates on a phone, so the page is visible).
export default function JarvisProvider({ children }) {
  const [view, setView] = useState('closed');
  const [loaded, setLoaded] = useState(false);
  const [live, setLive] = useState(false);
  const [request, setRequest] = useState(null);
  const launcherRef = useRef(null);

  const open = useCallback((req) => {
    setLoaded(true);
    setView('open');
    if (req) setRequest({ ...req, nonce: Date.now() });
  }, []);

  const close = useCallback(() => {
    setView('closed');
    launcherRef.current?.focus();
  }, []);

  const minimize = useCallback(() => setView('minimized'), []);

  const value = useMemo(() => (JARVIS_ENABLED ? { open, close, view } : null), [open, close, view]);

  return (
    <JarvisContext.Provider value={value}>
      {children}
      {JARVIS_ENABLED && (
        <>
          <JarvisLauncher
            ref={launcherRef}
            hidden={view === 'open'}
            live={live}
            engaged={loaded}
            onClick={() => open()}
            onBrief={() => open({ mode: 'voice', brief: 'overview' })}
          />
          {loaded && (
            <JarvisPanel
              view={view}
              request={request}
              onClose={close}
              onMinimize={minimize}
              onLiveChange={setLive}
            />
          )}
        </>
      )}
    </JarvisContext.Provider>
  );
}
