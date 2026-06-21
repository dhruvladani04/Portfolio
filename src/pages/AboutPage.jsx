import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiCodeforces, SiLeetcode, SiCodechef } from 'react-icons/si';
import { experience } from '../data/experience';

const skills = [
  { category: 'AI & ML', items: ['LLM Integration', 'RAG Systems', 'Agent Architecture', 'Prompt Engineering'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Supabase', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'Vercel', 'Docker', 'Figma', 'Linux'] },
];

const journeyPhases = [
  { year: 'Before 2020', title: 'The Beginning', desc: 'Started coding, discovered competitive programming' },
  { year: '2020', title: 'Creative Era', desc: 'Design through memes and videos, led Symmetry as President' },
  { year: '2023', title: 'AI Focus', desc: 'Deep dive into LLMs, first-author ACM SAC 2026 paper' },
  { year: '2024-25', title: 'Full Stack', desc: 'Built Serin, Invflow, and multiple production apps' },
  { year: '2026', title: 'Ready to Scale', desc: 'Open to roles, seeking ambitious product work' },
];

const profiles = [
  { label: 'GitHub', href: 'https://github.com/dhruvladani04', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252', icon: FiLinkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/dhruvcodes04/', icon: SiLeetcode },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/dhruvcodes04', icon: SiCodeforces },
  { label: 'CodeChef', href: 'https://www.codechef.com/users/dhruv_codes04', icon: SiCodechef },
];

export default function AboutPage() {
  return (
    <div className="section-shell pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link to="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Hero */}
        <motion.div
          className="grid lg:grid-cols-[1.2fr_1fr] gap-12 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>ABOUT</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Dhruv Ladani</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              A <span style={{ color: 'var(--arc-blue)' }}>designer who engineers</span> and a{' '}
              <span style={{ color: 'var(--accent-gold)' }}>researcher who ships</span>, building
              products end to end, from the Figma file to the model in production.
            </p>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              I work across the whole stack of building: the design that makes it feel right,
              the engineering that makes it hold, and the research that pushes it forward.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Computer Engineering student at PDEU with a passion for AI, full-stack development,
              and building products that solve real problems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="/Dhruv_Ladani_Resume_Tech.pdf" download className="btn-primary">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                  Download Resume
                </span>
                <FiDownload />
              </a>
              <Link to="/contact" className="btn-secondary">
                Contact Me
                <FiArrowUpRight />
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="panel p-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
              <img
                src="/avatar.jpg"
                alt="Dhruv Ladani"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
              <div className="absolute inset-2 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0, 217, 255, 0.1)' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>JOURNEY</span>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, var(--arc-blue), var(--accent-gold), var(--accent-red), transparent)' }} />

            {journeyPhases.map((phase, i) => (
              <motion.div
                key={phase.year}
                className="relative pl-8 pb-8 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-[1px]" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-xs" style={{ color: 'var(--arc-blue)' }}>{phase.year}</span>
                  <span className="font-display text-xl font-semibold text-white">{phase.title}</span>
                </div>
                <p className="text-slate-400">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>SKILLS</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillSet, i) => (
              <motion.div
                key={skillSet.category}
                className="panel p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--accent-gold)' }}>
                  {skillSet.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillSet.items.map((item) => (
                    <span key={item} className="tag text-xs py-1 px-2">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>EXPERIENCE</span>
          </div>

          <div className="grid gap-4">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                className="panel p-6 relative overflow-hidden group hover:scale-[1.01] transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="tag mb-2 inline-block">{item.timeframe}</span>
                    <h3 className="font-display text-xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-1" style={{ color: 'var(--arc-blue)' }}>{item.company}</p>
                  </div>
                  <ul className="feature-list md:w-2/3">
                    {item.bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet} className="feature-item">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Links */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>FIND ME</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <a
                  key={profile.label}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tag group hover:scale-105 transition-transform"
                >
                  <Icon className="text-sm" />
                  {profile.label}
                  <FiArrowUpRight className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
