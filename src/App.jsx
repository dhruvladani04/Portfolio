import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HUDCursor from './components/HUDCursor';
import JarvisHUD from './components/JarvisHUD';
import WorkshopHolo from './components/WorkshopHolo';
import RepulsorField from './components/RepulsorField';
import CommsTelemetry from './components/CommsTelemetry';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="w-16 h-16 rounded-full border-2 relative"
          style={{ borderColor: 'var(--arc-blue)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, var(--arc-blue-glow), var(--arc-blue))',
              boxShadow: 'var(--arc-glow)',
            }}
          />
        </motion.div>
        <motion.p
          className="font-mono text-sm tracking-widest uppercase"
          style={{ color: 'var(--arc-blue)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing...
        </motion.p>
      </div>
    </div>
  );
}

// Arc-reactor boot sequence: spinning reactor + progress bar + percentage,
// then fades out to reveal the app.
function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 16 + 7;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(onDone, 240);
      }
      setProgress(p);
    }, reduce ? 30 : 110);
    return () => clearInterval(tick);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
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
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--arc-blue), var(--accent-gold))',
              boxShadow: '0 0 12px var(--arc-blue)',
            }}
          />
        </div>
        <p className="font-mono text-[10px]" style={{ color: 'var(--muted)', letterSpacing: '0.2em' }}>
          {Math.floor(progress)}%
        </p>
      </div>
    </motion.div>
  );
}

// One Iron Man-themed background per page, crossfaded on route change:
// Home = J.A.R.V.I.S. HUD, Work = workshop holograms, About = repulsor
// energy field, Contact = open comms channel.
const backgrounds = [
  { key: 'work', match: (p) => p.startsWith('/work'), Component: WorkshopHolo },
  { key: 'about', match: (p) => p.startsWith('/about'), Component: RepulsorField },
  { key: 'contact', match: (p) => p.startsWith('/contact'), Component: CommsTelemetry },
  { key: 'home', match: () => true, Component: JarvisHUD },
];

function HUDBackground() {
  const { pathname } = useLocation();
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

export default function App() {
  // Boot sequence plays once per session; repeat visits skip straight in
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('dl:booted');
    } catch (_) {
      return true;
    }
  });
  const location = useLocation();

  useEffect(() => {
    // Always use dark mode
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const finishBoot = () => {
    setIsLoading(false);
    try {
      sessionStorage.setItem('dl:booted', '1');
    } catch (_) { /* private mode */ }
  };

  return (
    <div className="app-shell">
      <AnimatePresence>
        {isLoading && <BootScreen onDone={finishBoot} />}
      </AnimatePresence>
      <HUDCursor />
      <HUDBackground />
      {!isLoading && (
        <>
      <Navbar />
      <main className="content-stack relative z-10">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            {/* Key by section so /work -> /work/:slug opens in place (no page remount) */}
            <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>
              <Route
                path="/"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <HomePage />
                  </motion.div>
                }
              />
              <Route
                path="/work"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <WorkPage />
                  </motion.div>
                }
              />
              <Route
                path="/work/:slug"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <WorkPage />
                  </motion.div>
                }
              />
              <Route
                path="/about"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <AboutPage />
                  </motion.div>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <ContactPage />
                  </motion.div>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
        </>
      )}
    </div>
  );
}
