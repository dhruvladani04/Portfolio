import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArcReactorScene from './components/3d/ArcReactorScene';

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

function ThreeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ArcReactorScene />
      </Canvas>
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
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Always use dark mode
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-shell">
      <ThreeBackground />
      <Navbar />
      <main className="content-stack relative z-10">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location} key={location.pathname}>
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
    </div>
  );
}
