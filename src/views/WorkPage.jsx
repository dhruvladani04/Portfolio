'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter, notFound } from 'next/navigation';
import { FiArrowUpRight, FiExternalLink, FiX, FiArrowLeft } from 'react-icons/fi';
import { projects } from '../data/projects';

function ProjectPreview({ project, onClose }) {
  const closeRef = React.useRef(null);

  // dialog behavior: Escape to close, lock page scroll, focus the close button
  React.useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'var(--modal-backdrop)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="panel panel-highlight w-full max-w-4xl max-h-[90vh] overflow-auto relative"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — project details`}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 opacity-40" style={{ borderColor: 'var(--arc-blue)' }} />

        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid var(--border)' }}
        >
          <FiX size={20} style={{ color: 'var(--arc-blue)' }} />
        </button>

        <div className="p-8 md:p-10">
          {/* Status */}
          <div className="flex items-center gap-3 mb-6">
            <span className="tag">{project.timeframe}</span>
            <span className="font-mono text-xs" style={{ color: 'var(--arc-blue)' }}>
              {project.tech.length} technologies
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {project.title}
          </h2>

          {/* Summary */}
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            {project.summary}
          </p>

          {/* Case study (flagship projects) */}
          {project.caseStudy && (
            <div className="mb-8 grid gap-6">
              {[
                ['The Problem', project.caseStudy.problem, 'var(--accent-red-bright)'],
                ['The Approach', project.caseStudy.approach, 'var(--arc-blue)'],
                ['The Outcome', project.caseStudy.outcome, 'var(--accent-gold)'],
              ].map(([label, text, color]) => (
                <div key={label} className="relative pl-4" style={{ borderLeft: `2px solid ${color}` }}>
                  <h3 className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color }}>
                    {label}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Bullets */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-gold)' }}>
              Key Features
            </h3>
            <ul className="grid gap-3">
              {project.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                  <span className="text-slate-300">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent-gold)' }}>
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  className="tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                  Launch Project
                </span>
                <FiExternalLink />
              </a>
            )}
            {project.prd && (
              <a
                href={project.prd}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Read the PRD
                <FiExternalLink />
              </a>
            )}
            <Link href="/contact" className="btn-secondary">
              Ask about this project
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ROLE_VALUES = ['AI/ML', 'Product/PM', 'Full-Stack'];
const STACK_VALUES = ['Agentic AI', 'Backend', 'Frontend', 'Mobile', 'Data/ML'];

export default function WorkPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [viewBy, setViewBy] = React.useState('role'); // 'role' | 'stack'
  const [activeChip, setActiveChip] = React.useState('All');

  // /work and /work/:slug are separate route segments under the App Router
  // and remount WorkPage when navigating between them — restore the
  // last-used filter from sessionStorage so it survives that remount within
  // a session instead of silently resetting to the defaults above.
  React.useLayoutEffect(() => {
    try {
      const storedViewBy = sessionStorage.getItem('work:viewBy');
      const storedChip = sessionStorage.getItem('work:activeChip');
      if (storedViewBy) setViewBy(storedViewBy);
      if (storedChip) setActiveChip(storedChip);
    } catch (_) { /* private mode: keep defaults */ }
  }, []);

  React.useEffect(() => {
    try { sessionStorage.setItem('work:viewBy', viewBy); } catch (_) { /* private mode */ }
  }, [viewBy]);

  React.useEffect(() => {
    try { sessionStorage.setItem('work:activeChip', activeChip); } catch (_) { /* private mode */ }
  }, [activeChip]);

  const chipValues = viewBy === 'role' ? ROLE_VALUES : STACK_VALUES;
  const filteredProjects = activeChip === 'All'
    ? projects
    : projects.filter((p) => p[viewBy].includes(activeChip));

  const handleViewByChange = (next) => {
    setViewBy(next);
    setActiveChip('All');
  };

  // Project selection is URL-driven so every project has a shareable link.
  // generateStaticParams only ever emits project ids, so a slug that
  // doesn't match one is genuinely unreachable — send it to a real 404
  // instead of silently falling back to the unfiltered grid.
  const selectedProject = slug ? projects.find((p) => p.id === slug) || null : null;
  if (slug && !selectedProject) {
    notFound();
  }

  const handleCloseProject = () => {
    router.push('/work');
  };

  return (
    <div className="section-shell pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Back link */}
        <Link href="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>MY WORK</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            Projects I've{' '}
            <span className="text-gradient">built</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            From AI-powered applications to full-stack products. Each project taught me something new about building software that matters.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="nav-links-shell inline-flex mb-4"
            role="group"
            aria-label="View projects by"
          >
            <button
              type="button"
              className={`nav-link ${viewBy === 'role' ? 'nav-link-active' : ''}`}
              aria-pressed={viewBy === 'role'}
              onClick={() => handleViewByChange('role')}
            >
              Role
            </button>
            <button
              type="button"
              className={`nav-link ${viewBy === 'stack' ? 'nav-link-active' : ''}`}
              aria-pressed={viewBy === 'stack'}
              onClick={() => handleViewByChange('stack')}
            >
              Tech Stack
            </button>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={`Filter by ${viewBy === 'role' ? 'role' : 'tech stack'}`}
          >
            {['All', ...chipValues].map((value) => (
              <button
                key={value}
                type="button"
                className={`tag tag-filter ${activeChip === value ? 'tag-filter-active' : ''}`}
                aria-pressed={activeChip === value}
                onClick={() => setActiveChip(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        {filteredProjects.length === 0 ? (
          <div className="panel p-10 text-center">
            <p className="text-slate-400 mb-4">No projects match this filter yet.</p>
            <button type="button" className="btn-secondary" onClick={() => setActiveChip('All')}>
              Reset filter
            </button>
          </div>
        ) : (
        <div className="grid gap-8">
          {filteredProjects.map((project, i) => (
            <motion.article
              key={project.id}
              className="panel panel-highlight p-6 md:p-8 group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => router.push(`/work/${project.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/work/${project.id}`);
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={`View ${project.title} details`}
            >
              {/* HUD corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="tag">{project.timeframe}</span>
                    <motion.span
                      className="font-mono text-sm"
                      style={{ color: 'var(--arc-blue)' }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">
                    {project.title}
                  </h2>

                  <p className="text-slate-300 mb-4">{project.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 6).map((t) => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="tag text-xs">+{project.tech.length - 6}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0, 217, 255, 0.1)' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiArrowUpRight size={20} style={{ color: 'var(--arc-blue)' }} />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        )}
      </div>

      {/* Project preview modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPreview project={selectedProject} onClose={handleCloseProject} />
        )}
      </AnimatePresence>
    </div>
  );
}
