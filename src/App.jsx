import React from 'react';
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

function MainContent() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 md:px-12">
        <section id="home" className="pt-20">
          <Hero />
        </section>
        <section id="about" className="pt-20">
          <About />
        </section>
        <section id="education" className="pt-20">
          <Education />
        </section>
        <section id="projects" className="pt-20">
          <Projects />
        </section>
        <section id="experience" className="pt-20">
          <Experience />
        </section>
        <section id="skills" className="pt-20">
          <Skills />
        </section>
        <section id="achievements" className="pt-20">
          <Achievements />
        </section>
        <section id="contact" className="pt-20 pb-16">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/test-pdf" element={<TestPdf />} />
      </Routes>
    </div>
  );
}
