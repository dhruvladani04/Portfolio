import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 pb-8">
      <div className="mx-auto" style={{ width: 'min(var(--max-width), calc(100% - 2rem))' }}>
        <motion.div
          className="panel panel-highlight p-8 md:p-10"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Thanks for visiting</p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-white">
                Let&apos;s build the next meaningful thing.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                I enjoy ambitious ideas, clean execution, and products that create obvious value
                for the people using them.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Start a conversation
                <FiArrowUpRight />
              </a>
              <a href="#home" className="btn-secondary">
                Back to top
                <FiArrowUpRight className="-rotate-45" />
              </a>
            </div>
          </div>

          <div className="soft-divider my-8" />

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Copyright {currentYear} Dhruv Ladani. Built with React, Tailwind CSS, Framer Motion, and Vite.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="tag"
                    aria-label={social.label}
                  >
                    <Icon />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
