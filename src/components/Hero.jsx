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

export default function Hero() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] xl:grid-cols-[1fr_1fr]">
      <motion.div
        className="space-y-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <span className="pill">
            <span className="pill-dot" />
            Open to AI, software, and product roles in 2026
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-5">
          <p className="eyebrow">Dhruv Ladani</p>
          <h1 className="font-display text-balance text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
            Building{' '}
            <span className="bg-gradient-to-r from-[#7cf7d4] via-[#47d9ff] to-[#ffd37a] bg-clip-text text-transparent">
              AI-first products
            </span>{' '}
            with engineering depth and product taste.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Computer Engineering student blending AI, full-stack development, data thinking,
            and product strategy to ship thoughtful software that feels useful from day one.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <a href={resumeTech} download="Dhruv_Ladani_Resume_Tech.pdf" className="btn-primary">
            Download Tech Resume
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
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={cardPop} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <p className="text-sm leading-6 text-slate-400">{stat.label}</p>
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
                className="contact-link"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] text-lg text-[#7cf7d4]">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{profile.label}</p>
                    <p className="text-sm text-slate-400">View profile</p>
                  </div>
                </div>
                <FiArrowUpRight className="text-slate-400" />
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
        <motion.div
          className="floating-orb left-8 top-8 h-28 w-28"
          animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'rgba(124, 247, 212, 0.22)' }}
        />
        <motion.div
          className="floating-orb bottom-10 right-8 h-36 w-36"
          animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'rgba(71, 217, 255, 0.22)' }}
        />

        <motion.div
          className="absolute left-6 top-6 z-20 hidden max-w-[14rem] lg:flex"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit-card">
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Current Focus</span>
            <span className="font-display text-lg font-semibold text-white">
              Agentic AI products and intelligent tooling
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-6 z-20 hidden max-w-[14rem] lg:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit-card">
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">How I Build</span>
            <span className="font-display text-lg font-semibold text-white">
              Prototype fast, measure clearly, polish intentionally
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-6 top-20 z-20 hidden max-w-[11rem] xl:flex"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="orbit-card">
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Competitive Coding</span>
            <span className="font-display text-lg font-semibold text-white">CodeChef 5-star</span>
            <span className="text-sm text-slate-400">Codeforces Expert</span>
          </div>
        </motion.div>

        <div className="hero-portrait">
          <motion.img
            src="/avatar.jpg"
            alt="Dhruv Ladani portrait"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#040916] via-transparent to-transparent" />

          <div className="absolute inset-x-4 bottom-4 z-10 rounded-[26px] border border-white/10 bg-[rgba(6,12,28,0.72)] p-5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recent Themes</p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">
                  AI agents, dashboards, and product workflows
                </p>
              </div>
              <span className="hidden rounded-full border border-white/10 bg-white/[0.04] p-3 text-[#7cf7d4] sm:inline-flex">
                <FiArrowDownRight size={22} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
