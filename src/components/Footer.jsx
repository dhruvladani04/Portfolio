import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { GiPunchBlast } from 'react-icons/gi';
import { SiCodeforces, SiCodechef, SiLeetcode } from 'react-icons/si';
import { cardPop, viewport } from '../utils/motion';

const socials = [
  { label: 'GitHub', href: 'https://github.com/dhruvladani04', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252', icon: FaLinkedin },
  { label: 'Email', href: 'mailto:dhruvladani04@gmail.com', icon: FiMail },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/dhruvcodes04', icon: SiCodeforces },
  { label: 'LeetCode', href: 'https://leetcode.com/dhruvcodes04/', icon: SiLeetcode },
  { label: 'CodeChef', href: 'https://www.codechef.com/users/dhruv_codes04', icon: SiCodechef },
];

function ArcReactorMini({ className = '' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <div className="w-10 h-10 rounded-full border" style={{ borderColor: 'var(--arc-blue)' }} />
      <div className="absolute inset-2 rounded-full border-t-2" style={{ borderColor: 'var(--accent-gold)' }} />
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, var(--arc-blue-glow), var(--arc-blue))',
          boxShadow: 'var(--arc-glow)',
        }}
      />
    </motion.div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 pb-8">
      <div className="mx-auto" style={{ width: 'min(var(--max-width), calc(100% - 2rem))' }}>
        <motion.div
          className="panel panel-highlight p-8 md:p-10 relative overflow-hidden"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {/* HUD Decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />

          {/* Arc Reactor Decoration */}
          <div className="absolute top-8 right-8 opacity-30 hidden lg:block">
            <ArcReactorMini />
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px opacity-20"
            style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue), var(--accent-gold), transparent)' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--arc-blue)' }}>
                  MISSION COMPLETE
                </p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold text-white">
                  Let's build the next mission together.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  I enjoy ambitious ideas, clean execution, and products that create obvious value
                  for the people using them. Ready when you are.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="#contact"
                  className="btn-primary group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <GiPunchBlast className="text-lg" />
                    Initialize Protocol
                  </span>
                  <FiArrowUpRight className="transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                </motion.a>
                <motion.a
                  href="#home"
                  className="btn-secondary group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    Return to Base
                  </span>
                  <FiArrowUpRight className="-rotate-45 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                </motion.a>
              </div>
            </div>

            <div className="soft-divider my-8" />

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  <span className="font-mono" style={{ color: 'var(--arc-blue)' }}>STARK ARCHIVES</span>
                  {' '}{currentYear} Dhruv Ladani. Built with React, Tailwind CSS, Framer Motion, and Vite.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="tag group"
                      aria-label={social.label}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                      <Icon className="transition-transform group-hover:scale-110" />
                      {social.label}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Powered by Stark Industries */}
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-3">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                Powered by
              </span>
              <span className="font-display text-sm font-bold" style={{ color: 'var(--accent-red)' }}>
                STARK INDUSTRIES
              </span>
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }}
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
