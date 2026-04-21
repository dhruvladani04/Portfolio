import React from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TestPdf from './TestPdf';

function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="floating-orb -left-24 top-8 h-72 w-72"
        animate={{ x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'rgba(60, 188, 255, 0.2)' }}
      />
      <motion.div
        className="floating-orb right-[-7rem] top-48 h-80 w-80"
        animate={{ x: [0, -24, 0], y: [0, 18, 0], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'rgba(155, 125, 255, 0.18)' }}
      />
      <motion.div
        className="floating-orb bottom-[-7rem] left-1/3 h-96 w-96"
        animate={{ x: [0, -10, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'rgba(121, 118, 255, 0.14)' }}
      />
      <div className="app-noise" />
    </div>
  );
}

function MainContent() {
  return (
    <div className="app-shell">
      <BackgroundDecor />
      <Navbar />
      <main className="content-stack flex flex-col gap-24 md:gap-32">
        <section id="home" className="section-shell pt-24 md:pt-32">
          <Hero />
        </section>
        <section id="about" className="section-shell">
          <About />
        </section>
        <section id="projects" className="section-shell">
          <Projects />
        </section>
        <section id="experience" className="section-shell">
          <Experience />
        </section>
        <section id="education" className="section-shell">
          <Education />
        </section>
        <section id="skills" className="section-shell">
          <Skills />
        </section>
        <section id="achievements" className="section-shell">
          <Achievements />
        </section>
        <section id="contact" className="section-shell">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/test-pdf" element={<TestPdf />} />
    </Routes>
  );
}
