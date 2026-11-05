'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HUDCursor from '../components/HUDCursor';

// Route-matched ambient backgrounds are pure client-side canvas animations
// (never render anything server-side worth keeping) and only one ever
// mounts per route — load each as its own chunk instead of bundling all
// four into every route's JS.
const JarvisHUD = dynamic(() => import('../components/JarvisHUD'), { ssr: false });
const WorkshopHolo = dynamic(() => import('../components/WorkshopHolo'), { ssr: false });
const RepulsorField = dynamic(() => import('../components/RepulsorField'), { ssr: false });
const CommsTelemetry = dynamic(() => import('../components/CommsTelemetry'), { ssr: false });

// Arc-reactor boot flash: a ~300 ms progress sweep, then a quick fade out to
// reveal the app. Kept short on purpose — it gates content that's already
// rendered underneath, so every extra millisecond is pure wait.
const BOOT_MS = 300;

function BootScreen({ onDone }) {
  const [filled, setFilled] = useState(false);
  // Ref so a re-render of the parent (new onDone identity) can't restart
  // the timer.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // The bar is a CSS width transition kicked off on the next frame; the
    // dismissal is a plain timer, so the screen always clears even where
    // rAF is paused (background tabs, headless capture).
    const rafId = requestAnimationFrame(() => setFilled(true));
    const timer = setTimeout(() => onDoneRef.current(), BOOT_MS);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-6" style={{ width: 'min(320px, 78vw)' }}>
        <motion.div
          className="w-20 h-20 rounded-full border-2 relative"
          style={{ borderColor: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, var(--arc-blue-glow), var(--arc-blue) 70%)',
              boxShadow: 'var(--arc-glow)',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [1, 0.75, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <p
          className="font-mono text-[11px] uppercase"
          style={{ color: 'var(--arc-blue)', letterSpacing: '0.28em' }}
        >
          Initializing Arc Reactor
        </p>
        <div className="w-full h-0.5 overflow-hidden" style={{ background: 'rgba(0, 217, 255, 0.12)' }}>
          <div
            className="h-full"
            style={{
              width: filled ? '100%' : '0%',
              transition: `width ${BOOT_MS}ms linear`,
              background: 'linear-gradient(90deg, var(--arc-blue), var(--accent-gold))',
              boxShadow: '0 0 12px var(--arc-blue)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// One Iron Man-themed background per page, crossfaded on route change:
// Home = J.A.R.V.I.S. HUD, Work = workshop holograms, About = repulsor
// energy field, Contact = open comms channel.
const backgrounds = [
  // /work and /work/:slug only — not /work-with-me, which shares the
  // contact page's comms background below.
  { key: 'work', match: (p) => /^\/work(\/|$)/.test(p), Component: WorkshopHolo },
  { key: 'about', match: (p) => p.startsWith('/about'), Component: RepulsorField },
  { key: 'contact', match: (p) => p.startsWith('/contact') || p.startsWith('/work-with-me'), Component: CommsTelemetry },
  { key: 'home', match: () => true, Component: JarvisHUD },
];

function HUDBackground() {
  const pathname = usePathname();
  const { key, Component } = backgrounds.find((b) => b.match(pathname));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence>
        <motion.div
          key={key}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
      <div className="app-noise" />
    </div>
  );
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ClientShell({ children }) {
  // Boot flash plays once per browser (localStorage, not per tab); repeat
  // visits skip straight in. Always starts true (deterministic on both
  // server and client — the storage check only runs after mount) to avoid a
  // hydration mismatch between the prerendered HTML and the first client
  // render.
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useLayoutEffect(() => {
    try {
      if (localStorage.getItem('dl:booted')) setIsLoading(false);
    } catch (_) { /* storage blocked: keep boot screen */ }
  }, []);

  useEffect(() => {
    // Always use dark mode
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const finishBoot = () => {
    setIsLoading(false);
    try {
      localStorage.setItem('dl:booted', '1');
    } catch (_) { /* storage blocked */ }
  };

  return (
    // reducedMotion="user": framer-motion animations respect OS motion settings
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <a href="#main" className="skip-link">Skip to content</a>
        <AnimatePresence>
          {isLoading && <BootScreen onDone={finishBoot} />}
        </AnimatePresence>
        <HUDCursor />
        <HUDBackground />
        {/* Always mounted (not gated behind isLoading) so the static export's
            prerendered HTML contains real content instead of just the boot
            screen. Visually unchanged: the opaque BootScreen fully covers
            this while isLoading, and `inert` keeps it out of the tab order
            and accessibility tree until boot finishes. */}
        <div inert={isLoading}>
          <Navbar ready={!isLoading} />
          <main id="main" className="content-stack relative z-10">
            <AnimatePresence mode="wait">
              {/* /work and /work/:slug are separate route segments under the
                  App Router and do remount on navigation between them —
                  WorkPage restores its role/stack filter from sessionStorage
                  across that remount instead of relying on this key. */}
              <motion.div
                key={pathname.split('/')[1] || 'home'}
                variants={pageVariants}
                initial="initial"
                animate={isLoading ? 'initial' : 'enter'}
                exit="exit"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
