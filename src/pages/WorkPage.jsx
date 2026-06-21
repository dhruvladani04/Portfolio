import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiExternalLink, FiX, FiArrowLeft } from 'react-icons/fi';
import { projects } from '../data/projects';

function ProjectPreview({ project, onClose }) {
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
          onClick={onClose}
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
            <Link to="/contact" className="btn-secondary">
              Ask about this project
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  // Find project by slug if present
  React.useEffect(() => {
    if (slug) {
      const project = projects.find((p) => p.id === slug || p.title.toLowerCase().replace(/\s+/g, '-') === slug);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [slug]);

  const handleCloseProject = () => {
    setSelectedProject(null);
    navigate('/work');
  };

  return (
    <div className="section-shell pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Back link */}
        <Link to="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
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

        {/* Projects grid */}
        <div className="grid gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="panel panel-highlight p-6 md:p-8 group cursor-pointer hover:scale-[1.01] transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
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
