import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import { GiPunchBlast } from 'react-icons/gi';
import { SiCodeforces, SiLeetcode } from 'react-icons/si';

const socials = [
  { label: 'GitHub', href: 'https://github.com/dhruvladani04', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252', icon: FaLinkedin },
  { label: 'Email', href: 'mailto:dhruvladani04@gmail.com', icon: FiMail },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/dhruvcodes04', icon: SiCodeforces },
  { label: 'LeetCode', href: 'https://leetcode.com/dhruvcodes04/', icon: SiLeetcode },
];

const footerLinks = [
  { path: '/work', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 pb-6">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="panel p-6 md:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* HUD corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-20" style={{ borderColor: 'var(--arc-blue)' }} />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 opacity-20" style={{ borderColor: 'var(--arc-blue)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <Link to="/" className="brand-mark">
                DL
              </Link>
              <div>
                <p className="font-display text-sm font-semibold">Dhruv Ladani</p>
                <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>AI | Full-Stack | Product</p>
              </div>
            </div>

            {/* Center - Links */}
            <div className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-mono text-xs uppercase tracking-wider hover:text-white transition-colors"
                  style={{ color: 'var(--arc-blue)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side - Socials */}
            <div className="flex items-center gap-2">
              {socials.slice(0, 3).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    aria-label={social.label}
                  >
                    <Icon className="text-sm" style={{ color: 'var(--muted)' }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'var(--muted)' }}>
              <p>
                <span className="font-mono" style={{ color: 'var(--arc-blue)' }}>STARK ARCHIVES</span>
                {' '}&copy; {currentYear}
              </p>
              <p className="font-mono">
                Built with React + Three.js + Framer Motion
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
