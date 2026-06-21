import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
} from 'react-icons/fi';
import { SiCodeforces, SiCodechef, SiLeetcode } from 'react-icons/si';
import { cardPop, fadeUp, staggerContainer } from '../utils/motion';
import { useCodeforces } from '../utils/useCodeforces';

const resumeTech = '/Dhruv_Ladani_Resume_Tech.pdf';
const resumePM = '/Dhruv_Ladani_Resume_PM.pdf';

const stats = [
  { value: '9.34', label: 'CGPA in Computer Engineering' },
  { value: '6+', label: 'Years spent coding and shipping' },
  { value: '15+', label: 'Portfolio projects across AI and web' },
  { value: '500+', label: 'DSA problems solved' },
];

const profiles = [
  { label: 'GitHub', href: 'https://github.com/dhruvladani04', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252', icon: FiLinkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/dhruvcodes04/', icon: SiLeetcode },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/dhruvcodes04', icon: SiCodeforces },
  { label: 'CodeChef', href: 'https://www.codechef.com/users/dhruv_codes04', icon: SiCodechef },
];

const focusTags = ['AI systems', 'Full-stack builds', 'Product-minded execution'];

function ArcReactorCore({ size = 120, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: 'var(--arc-blue)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <div
            key={angle}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'var(--arc-blue)',
              boxShadow: 'var(--arc-glow)',
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateY(-${size / 2 - 4}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          inset: size * 0.15,
          borderColor: 'rgba(0, 217, 255, 0.5)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <div
            key={angle}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--arc-blue)',
              boxShadow: 'var(--arc-glow)',
              top: '50%',
              left: '50%',
              transform: `rotate(${angle}deg) translateY(-${size * 0.35 - 2}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Inner ring */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          inset: size * 0.35,
          borderColor: 'var(--accent-gold)',
          boxShadow: 'var(--gold-glow)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: size * 0.42,
          background: 'radial-gradient(circle at 30% 30%, var(--arc-blue-glow), var(--arc-blue))',
          boxShadow: 'var(--arc-glow)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function HUDScanner({ className = '' }) {
  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--arc-blue), transparent)',
          boxShadow: '0 0 20px var(--arc-blue)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const { rank: cfRank } = useCodeforces('dhruvcodes04');

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] xl:grid-cols-[1fr_1fr]">
      <motion.div
        className="space-y-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-3">
            <span className="stark-badge">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              STARK INDUSTRIES
            </span>
            <span className="pill">
              <span className="pill-dot" />
              Open to AI, software, and product roles in 2026
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-5">
          <p className="eyebrow">DHRUV LADANI</p>
          <h1 className="font-display text-balance text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
            Building{' '}
            <span className="text-gradient">intelligent systems</span>
            {' '}with engineering precision.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Computer Engineering student blending AI, full-stack development, data thinking,
            and product strategy to ship thoughtful software that feels useful from day one.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <a href={resumeTech} download="Dhruv_Ladani_Resume_Tech.pdf" className="btn-primary">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/30 glow-blue animate-pulse" />
              Download Tech Resume
            </span>
            <FiDownload />
          </a>
          <a href={resumePM} download="Dhruv_Ladani_Resume_PM.pdf" className="btn-secondary">
            Download PM Resume
            <FiDownload />
          </a>
          <a href="mailto:dhruvladani04@gmail.com" className="btn-secondary">
            Email Me
            <FiMail />
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {focusTags.map((tag) => (
            <span key={tag} className="tag">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--arc-blue)]" style={{ boxShadow: 'var(--arc-glow)' }} />
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          animate="show"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={cardPop} className="stat-card relative">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-br" />
              <span className="stat-value">{stat.value}</span>
              <p className="text-sm leading-6 text-slate-400">{stat.label}</p>
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--arc-blue)] to-transparent opacity-50"
                style={{ width: `${(index + 1) * 25}%` }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <a
                key={profile.label}
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                className="contact-link group"
              >
                <div className="flex items-center gap-3">
                  <span className="accent-icon icon-shell inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg transition-all duration-300 group-hover:shadow-[var(--arc-glow)]">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{profile.label}</p>
                    <p className="text-sm text-slate-400">View profile</p>
                  </div>
                </div>
                <FiArrowUpRight className="text-slate-400 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
              </a>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        className="panel panel-highlight hero-visual"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <HUDScanner />

        {/* Arc Ring Decorations */}
        <motion.div
          className="absolute left-4 top-4 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-20 h-20 rounded-full border border-dashed" style={{ borderColor: 'var(--arc-blue)' }} />
        </motion.div>

        <motion.div
          className="floating-orb left-12 top-12 h-32 w-32"
          animate={{ y: [0, -18, 0], x: [0, 12, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'var(--orb-three)' }}
        />
        <motion.div
          className="floating-orb bottom-12 right-12 h-40 w-40"
          animate={{ y: [0, 15, 0], x: [0, -12, 0], scale: [1.02, 1, 1.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'var(--orb-one)' }}
        />
        <motion.div
          className="floating-orb right-20 top-1/3 h-24 w-24"
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'var(--orb-two)' }}
        />

        <motion.div
          className="absolute left-8 top-8 z-20 hidden max-w-[14rem] lg:flex"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit-card relative overflow-hidden">
            <div className="hud-corner hud-corner-tl" style={{ borderColor: 'var(--arc-blue)' }} />
            <div className="hud-corner hud-corner-br" style={{ borderColor: 'var(--arc-blue)' }} />
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--arc-blue)]">TARGET LOCK</span>
            <span className="font-display text-lg font-semibold text-white">
              Agentic AI products and intelligent tooling
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-8 z-20 hidden max-w-[14rem] lg:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit-card">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--accent-gold)]">BUILD PROTOCOL</span>
            <span className="font-display text-lg font-semibold text-white">
              Prototype fast, measure clearly, polish intentionally
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-8 top-24 z-20 hidden max-w-[11rem] xl:flex"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit-card">
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--arc-blue)]">RANK ACHIEVED</span>
            <span className="font-display text-lg font-semibold text-white">CodeChef 5-star</span>
            <span className="text-sm text-slate-400">Codeforces {cfRank}</span>
          </div>
        </motion.div>

        {/* Arc Reactor Decoration */}
        <motion.div
          className="absolute right-12 bottom-1/3 z-10 hidden xl:block opacity-60"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <ArcReactorCore size={60} />
        </motion.div>

        <div className="hero-portrait relative">
          <motion.img
            src="/avatar.jpg"
            alt="Dhruv Ladani portrait"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="hero-image-overlay absolute inset-0" />

          {/* HUD Corners on portrait */}
          <div className="absolute inset-4 pointer-events-none">
            <div className="hud-corner hud-corner-tl" style={{ borderColor: 'var(--arc-blue)' }} />
            <div className="hud-corner hud-corner-tr" style={{ borderColor: 'var(--arc-blue)' }} />
            <div className="hud-corner hud-corner-bl" style={{ borderColor: 'var(--arc-blue)' }} />
            <div className="hud-corner hud-corner-br" style={{ borderColor: 'var(--arc-blue)' }} />
          </div>

          <div className="hero-overlay-card absolute inset-x-4 bottom-4 z-10 rounded-[22px] border p-5 backdrop-blur-md relative overflow-hidden">
            <div className="hud-corner hud-corner-tl" style={{ borderColor: 'var(--arc-blue)', width: 14, height: 14 }} />
            <div className="hud-corner hud-corner-br" style={{ borderColor: 'var(--arc-blue)', width: 14, height: 14 }} />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--arc-blue)]">ACTIVE PROJECTS</p>
                <p className="mt-2 font-display text-xl font-semibold text-white">
                  AI agents, dashboards, and product workflows
                </p>
              </div>
              <motion.span
                className="accent-icon hidden rounded-full border p-3 sm:inline-flex"
                style={{ borderColor: 'var(--stat-border)' }}
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FiArrowDownRight size={20} />
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
