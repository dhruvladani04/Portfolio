import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiDownload, FiCode, FiCpu, FiZap } from 'react-icons/fi';
import { GiPunchBlast } from 'react-icons/gi';
import { useCodeforces } from '../utils/useCodeforces';

const stats = [
  { value: '9.34', label: 'CGPA', unit: '' },
  { value: '15+', label: 'Projects', unit: 'built' },
  { value: '500+', label: 'Problems', unit: 'solved' },
  { value: '2026', label: 'Graduating', unit: '' },
];

const capabilities = [
  { title: 'AI & Machine Learning', desc: 'Building intelligent systems, LLM workflows, and AI-powered applications', icon: FiCpu },
  { title: 'Full-Stack Development', desc: 'End-to-end product engineering from database to deployment', icon: FiZap },
  { title: 'Competitive Programming', desc: '500+ DSA problems solved across platforms', icon: FiCode },
];

export default function HomePage() {
  const { ref, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const { rank: cfRank } = useCodeforces('dhruvcodes04');

  return (
    <div ref={ref} className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="section-shell pt-32 md:pt-40 pb-20"
        style={{ opacity }}
      >
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Status badge */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="stark-badge">
              <motion.span
                className="w-2 h-2 rounded-full bg-current"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              STARK INDUSTRIES
            </span>
            <span className="pill">
              <span className="pill-dot" />
              Open to 2026 opportunities
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-gradient">Dhruv</span>
            <br />
            <span className="text-white">Ladani</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Computer Engineering student at PDEU with a{' '}
            <span style={{ color: 'var(--arc-blue)' }}>strong bias toward building</span>{' '}
            products that help people. Passionate about{' '}
            <span style={{ color: 'var(--accent-gold)' }}>AI, full-stack development</span>, and solving complex problems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/work" className="btn-primary group">
              <span className="flex items-center gap-2">
                <GiPunchBlast className="text-lg" />
                View Projects
              </span>
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link to="/about" className="btn-secondary group">
              About Me
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <a href="/Dhruv_Ladani_Resume_Tech.pdf" download className="btn-secondary group">
              Download Resume
              <FiDownload className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-card relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />
                <span className="stat-value">{stat.value}</span>
                <p className="text-sm text-slate-400">{stat.label} {stat.unit}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Capabilities */}
      <motion.section
        className="section-shell py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>CAPABILITIES</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  className="panel p-8 group hover:scale-[1.02] transition-transform duration-300"
                  style={{ y: i % 2 === 0 ? y1 : y2 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(0, 217, 255, 0.1)' }}
                    >
                      <Icon className="text-lg" style={{ color: 'var(--arc-blue)' }} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">{cap.title}</h3>
                  </div>
                  <p className="text-slate-400">{cap.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Work Preview */}
      <motion.section
        className="section-shell py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>FEATURED WORK</span>
            </div>
            <Link to="/work" className="link-inline group">
              View all projects
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Nexus - AI Interview Platform', desc: 'AI-powered hiring platform for structured, bias-free interviews', tag: 'AI/ML' },
              { title: 'Stock Pro Inventory System', desc: 'Complete inventory management with billing for retail businesses', tag: 'Full-Stack' },
              { title: 'LLM Research Publication', desc: 'Sector classification of software requirements using LLMs - ACM SAC 2026', tag: 'Research' },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                className="panel panel-highlight p-6 group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="tag">{project.tag}</span>
                  <span className="font-mono text-sm" style={{ color: 'var(--arc-blue)' }}>0{i + 1}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="section-shell py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Let's build something
            <span className="text-gradient"> together</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            I'm actively looking for AI, software engineering, and product roles.
            If you're working on something interesting, I'd love to chat.
          </p>
          <Link to="/contact" className="btn-primary">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
              Get in Touch
            </span>
            <FiArrowUpRight />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
