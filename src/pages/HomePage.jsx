import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiDownload, FiCode, FiCpu, FiZap, FiStar, FiTrendingUp, FiLayers, FiGitBranch } from 'react-icons/fi';
import { GiPunchBlast } from 'react-icons/gi';
import { useCodeforces } from '../utils/useCodeforces';

const stats = [
  { value: '15+', label: 'Projects', unit: 'built', icon: FiLayers },
  { value: '500+', label: 'Problems', unit: 'solved', icon: FiCode },
  { value: '2', label: 'Research', unit: 'papers', icon: FiTrendingUp },
  { value: '2026', label: 'Graduating', unit: '', icon: FiStar },
];

const capabilities = [
  { title: 'AI & Machine Learning', desc: 'Building intelligent systems, LLM workflows, and AI-powered applications', icon: FiCpu, color: 'var(--arc-blue)' },
  { title: 'Full-Stack Development', desc: 'End-to-end product engineering from database to deployment', icon: FiZap, color: 'var(--accent-gold)' },
  { title: 'Competitive Programming', desc: '500+ DSA problems solved across platforms', icon: FiCode, color: 'var(--accent-red)' },
];

// Animated counter component
function AnimatedCounter({ value, duration = 2 }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration * 0.3 }}
    >
      {value}
    </motion.span>
  );
}

// Magnetic button effect
function MagneticButton({ children, className, ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated text reveal
function TextReveal({ children, delay = 0 }) {
  const words = children.split(' ');
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Glitch text effect
function GlitchText({ children, className }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 -ml-0.5 z-0"
        style={{ color: 'var(--arc-blue)' }}
        animate={{ x: [0, -2, 2, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        aria-hidden
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 ml-0.5 z-0"
        style={{ color: 'var(--accent-red)' }}
        animate={{ x: [0, 2, -2, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  );
}

// Scanning line animation
function ScanningLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue), transparent)' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function HomePage() {
  const { ref, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.5]);

  const { rank: cfRank } = useCodeforces('dhruvcodes04');

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div ref={ref} className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="section-shell pt-32 md:pt-40 pb-20 relative overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Scanning line overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <ScanningLine />
        </div>

        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-6 relative"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Status badge */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="stark-badge relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.2), transparent)' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-current relative z-10"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">AI PRODUCT MANAGER & PRODUCT BUILDER</span>
            </motion.span>
            <motion.span
              className="pill"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="pill-dot"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Open to 2026 opportunities
            </motion.span>
          </motion.div>

          {/* Main headline with glitch effect */}
          <motion.div className="relative">
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.span
                className="text-gradient inline-block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Dhruv
              </motion.span>
              <br />
              <motion.span
                className="text-white inline-block"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Ladani
              </motion.span>
            </motion.h1>

            {/* Floating particles around name */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: 'var(--arc-blue)',
                  boxShadow: 'var(--arc-glow)',
                  top: `${20 + i * 15}%`,
                  left: i % 2 === 0 ? '-10px' : 'auto',
                  right: i % 2 !== 0 ? '-10px' : 'auto',
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.5, 1],
                }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>

          {/* Animated intro text */}
          <motion.div
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TextReveal delay={0.6}>
              AI Product Builder with hands-on experience designing and deploying Generative AI applications using multi-agent systems and RAG pipelines. Skilled in translating user needs into product features, defining metrics, and collaborating across engineering and design teams to deliver impactful AI-driven products.
            </TextReveal>
          </motion.div>

          {/* CTA buttons with magnetic effect */}
          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <MagneticButton className="inline-block">
              <Link to="/work" className="btn-primary group">
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <GiPunchBlast className="text-lg" />
                  </motion.span>
                  View Projects
                </span>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </MagneticButton>

            <MagneticButton className="inline-block">
              <Link to="/about" className="btn-secondary group">
                About Me
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </MagneticButton>

            <MagneticButton className="inline-block">
              <a href="/Dhruv_Ladani_Resume_Tech.pdf" download className="btn-secondary group">
                Download Resume
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiDownload className="transition-transform group-hover:translate-y-0.5" />
                </motion.span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Stats with counter animation */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="stat-card relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />

                  <motion.div
                    className="absolute top-2 right-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-sm" style={{ color: 'var(--arc-blue)', opacity: 0.5 }} />
                  </motion.div>

                  <motion.span
                    className="stat-value"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                  >
                    <AnimatedCounter value={stat.value} />
                  </motion.span>
                  <p className="text-sm text-slate-400">{stat.label} {stat.unit}</p>

                  {/* Pulse ring on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: '1px solid var(--arc-blue)' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.2] }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Capabilities with scroll-driven parallax */}
      <motion.section
        className="section-shell py-20 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Background grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${25 + i * 25}%`,
                background: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.1), transparent)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <motion.div
            className="flex items-center gap-3 mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
            />
            <motion.span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'var(--arc-blue)' }}
              whileHover={{ letterSpacing: '0.3em' }}
              transition={{ duration: 0.3 }}
            >
              CAPABILITIES
            </motion.span>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  className="panel p-8 group relative overflow-hidden"
                  style={{ y: i % 2 === 0 ? y1 : y2 }}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      background: 'linear-gradient(45deg, transparent 40%, rgba(0, 217, 255, 0.1) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(0, 217, 255, 0.1)' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Icon className="text-lg" style={{ color: cap.color }} />
                      </motion.span>
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold text-white">{cap.title}</h3>
                  </div>
                  <p className="text-slate-400 relative z-10">{cap.desc}</p>

                  {/* Corner decorations */}
                  <motion.div
                    className="absolute bottom-2 right-2 w-4 h-4 border-r border-b opacity-20"
                    style={{ borderColor: 'var(--arc-blue)' }}
                    whileHover={{ scale: 1.5, opacity: 0.5 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Work Preview with 3D card effect */}
      <motion.section
        className="section-shell py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
              <motion.span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: 'var(--arc-blue)' }}
                whileHover={{ letterSpacing: '0.3em' }}
              >
                FEATURED WORK
              </motion.span>
            </div>
            <MagneticButton>
              <Link to="/work" className="link-inline group">
                View all projects
                <motion.span
                  animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiArrowUpRight />
                </motion.span>
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { title: 'AI PM Co-pilot', desc: 'Dynamic utility for Product Managers to manage probabilistic AI systems with automated synthesis and testing', tag: 'AI/ML + PM', gradient: 'var(--arc-blue)' },
              { title: 'Smart Job Tracker', desc: 'AI-powered job search pipeline that aggregates 100+ sources and scores leads via LLMs', tag: 'AI/ML', gradient: 'var(--accent-gold)' },
              { title: 'Agile Sprint Guardian', desc: 'Multi-agent system simulating an Agile squad to autonomously refine feature requests', tag: 'Multi-Agent AI', gradient: 'var(--accent-red)' },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                className="panel panel-highlight p-6 group cursor-pointer relative overflow-hidden"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: `0 10px 40px rgba(0, 217, 255, 0.2)`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.gradient}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.span
                      className="tag"
                      whileHover={{ scale: 1.1 }}
                      style={{ borderColor: project.gradient }}
                    >
                      {project.tag}
                    </motion.span>
                    <span className="font-mono text-sm" style={{ color: 'var(--arc-blue)' }}>
                      0{i + 1}
                    </span>
                  </div>
                  <motion.h3
                    className="font-display text-2xl font-semibold text-white mb-2"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-slate-400">{project.desc}</p>
                </div>

                {/* HUD corner */}
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-20 group-hover:opacity-50 transition-opacity"
                  style={{ borderColor: 'var(--arc-blue)' }}
                  whileHover={{ width: 80, height: 80 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section with particles */}
      <motion.section
        className="section-shell py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 ? 'var(--arc-blue)' : i % 3 === 1 ? 'var(--accent-gold)' : 'var(--accent-red)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's build something
            <motion.span
              className="text-gradient inline-block ml-2"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              together
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            I'm actively looking for AI, software engineering, and product roles.
            If you're working on something interesting, I'd love to chat.
          </motion.p>

          <MagneticButton className="inline-block">
            <Link to="/contact" className="btn-primary group">
              <span className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full bg-white/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Get in Touch
              </span>
              <motion.span
                animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiArrowUpRight />
              </motion.span>
            </Link>
          </MagneticButton>
        </div>
      </motion.section>
    </div>
  );
}
