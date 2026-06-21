import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiExternalLink, FiX } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { projects } from '../data/projects';
import { cardPop, fadeUp, staggerContainer, viewport } from '../utils/motion';

function HUDOverlay({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue), transparent)' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function ProjectCard({ project, index, compact = false, onPreview }) {
  const visibleBullets = project.bullets.slice(0, compact ? 2 : 3);
  const visibleTech = project.tech.slice(0, compact ? 4 : 6);

  return (
    <motion.article
      variants={cardPop}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`panel ${compact ? 'panel-muted' : 'panel-highlight'} project-card relative group`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <HUDOverlay className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="tag">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
              {project.timeframe}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-white">
              {project.title}
            </h3>
          </div>
          <motion.span
            className="font-mono text-sm tracking-wider"
            style={{ color: 'var(--arc-blue)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </div>

        <p className="text-base leading-7 text-slate-300 mt-4">{project.summary}</p>

        <ul className="feature-list mt-4">
          {visibleBullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              className="feature-item"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {bullet}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-4">
          {visibleTech.map((tech, i) => (
            <motion.span
              key={tech}
              className="tag"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {!compact && project.features?.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-2 mt-4">
            {project.features.slice(0, 4).map((feature, i) => (
              <motion.div
                key={feature}
                className="surface-card rounded-2xl border px-4 py-3 text-sm text-slate-300 relative overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="absolute top-0 left-0 w-8 h-px" style={{ background: 'linear-gradient(90deg, var(--arc-blue), transparent)' }} />
                {feature}
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="link-inline group/link"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                Launch Project
              </span>
              <FiExternalLink className="transition-transform group-hover/link:translate-y-[-2px] group-hover/link:translate-x-[2px]" />
            </a>
          ) : (
            <button type="button" onClick={() => onPreview(project)} className="link-inline group/link">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                Access Files
              </span>
              <FiArrowUpRight className="transition-transform group-hover/link:translate-y-[-2px] group-hover/link:translate-x-[2px]" />
            </button>
          )}

          <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--muted)' }}>
            {project.tech.length} modules
          </span>
        </div>
      </div>
    </motion.article>
  );
}

const featuredProjects = projects.slice(0, 4);
const moreProjects = projects.slice(4);

export default function Projects() {
  const [previewProject, setPreviewProject] = useState(null);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="STARK ARCHIVES"
        title="Projects built with engineering precision"
        description="A portfolio of experiments, polished applications, and ambitious prototypes built to solve real workflows."
      />

      <motion.div
        className="grid gap-6 xl:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onPreview={setPreviewProject}
          />
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="space-y-4"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="font-display text-2xl font-semibold text-white">
            Additional Prototypes
          </h3>
          <p className="text-sm text-slate-400 font-mono tracking-wide">
            AI dashboards | Learning tools | Production apps
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moreProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + featuredProjects.length}
              compact
              onPreview={setPreviewProject}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {previewProject && (
          <motion.div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
          >
            <motion.div
              className="panel panel-highlight relative w-full max-w-xl p-8 overflow-hidden"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <HUDOverlay />

              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                className="icon-button absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition"
                aria-label="Close project preview"
              >
                <FiX size={20} />
              </button>

              <div className="relative z-10">
                <span className="tag">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                  {previewProject.timeframe}
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold text-white">
                  {previewProject.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  This project is being refined before a public walkthrough goes live. If you want,
                  I&apos;m happy to share more context about the architecture, thinking, and direction
                  behind it.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {previewProject.tech.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn-primary" onClick={() => setPreviewProject(null)}>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                      Request Access
                    </span>
                    <FiArrowUpRight />
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewProject(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
