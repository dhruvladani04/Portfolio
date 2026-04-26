import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiExternalLink, FiX } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { projects } from '../data/projects';
import { cardPop, fadeUp, staggerContainer, viewport } from '../utils/motion';

function ProjectCard({ project, index, compact = false, onPreview }) {
  const visibleBullets = project.bullets.slice(0, compact ? 2 : 3);
  const visibleTech = project.tech.slice(0, compact ? 4 : 6);

  return (
    <motion.article
      variants={cardPop}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`panel ${compact ? 'panel-muted' : 'panel-highlight'} project-card`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="tag">{project.timeframe}</span>
          <h3 className="mt-4 font-display text-2xl font-semibold text-white">
            {project.title}
          </h3>
        </div>
        <span className="text-sm uppercase tracking-[0.22em] text-slate-500">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <p className="text-base leading-7 text-slate-300">{project.summary}</p>

      <ul className="feature-list">
        {visibleBullets.map((bullet) => (
          <li key={bullet} className="feature-item">
            {bullet}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {visibleTech.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>

      {!compact && project.features?.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {project.features.slice(0, 4).map((feature) => (
            <div key={feature} className="surface-card rounded-2xl border px-4 py-3 text-sm text-slate-300">
              {feature}
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="link-inline"
          >
            View project
            <FiExternalLink />
          </a>
        ) : (
          <button type="button" onClick={() => onPreview(project)} className="link-inline text-left">
            View project
            <FiArrowUpRight />
          </button>
        )}

        <span className="text-sm text-slate-500">{project.tech.length} technologies</span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [previewProject, setPreviewProject] = useState(null);
  const featuredProjects = projects.slice(0, 4);
  const moreProjects = projects.slice(4);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work across agentic AI, product tooling, and full-stack systems."
        description="A portfolio of experiments, polished applications, and ambitious prototypes built to solve real workflows rather than just demo isolated features."
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
          <h3 className="font-display text-2xl font-semibold text-white">More builds and experiments</h3>
          <p className="text-sm text-slate-400">From AI dashboards to learning tools and production apps.</p>
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
              className="panel panel-highlight relative w-full max-w-xl p-8"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                className="icon-button absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition"
                aria-label="Close project preview"
              >
                <FiX size={20} />
              </button>

              <span className="tag">{previewProject.timeframe}</span>
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
                  Ask about this project
                  <FiArrowUpRight />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
