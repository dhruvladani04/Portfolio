import React from 'react';
import { motion } from 'framer-motion';
import { FiClipboard, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { cardPop, fadeUp, staggerContainer, viewport } from '../utils/motion';

const coreStrengths = [
  'AI product prototyping',
  'Frontend systems',
  'Backend APIs',
  'Data-aware thinking',
  'Competitive programming',
];

const skillGroups = [
  {
    title: 'AI, Data, and Automation',
    summary: 'The area I am most excited to deepen right now.',
    icon: FiCpu,
    items: ['Python', 'Generative AI', 'LLMs', 'Data Analytics', 'AI/ML Prototyping', 'API Integration'],
  },
  {
    title: 'Frontend and Experience',
    summary: 'Interfaces that feel clear, responsive, and polished.',
    icon: FiCode,
    items: ['React', 'JavaScript', 'Tailwind CSS', 'Figma', 'Flutter', 'Responsive UI'],
  },
  {
    title: 'Backend and Platform',
    summary: 'Practical systems work from APIs to infrastructure basics.',
    icon: FiDatabase,
    items: ['Node.js', 'Express', 'Django', 'MongoDB', 'MySQL', 'SQLite', 'Docker', 'Git'],
  },
  {
    title: 'Product and Collaboration',
    summary: 'The layer that helps turn ideas into useful shipped outcomes.',
    icon: FiClipboard,
    items: ['Product Roadmaps', 'Feature Prioritization', 'KPI Definition', 'Jira', 'ClickUp', 'Growth Strategy'],
  },
];

export default function Skills() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Skills"
        title="A toolkit shaped by building real products end to end."
        description="I like being able to move across the stack when needed, especially when the work sits at the intersection of engineering, AI, product thinking, and user experience."
      />

      <motion.div
        className="flex flex-wrap gap-3"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {coreStrengths.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <motion.article key={group.title} variants={cardPop} className="panel panel-muted p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Capability</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {group.title}
                  </h3>
                </div>
                <span className="accent-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-xl">
                  <Icon />
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">{group.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        className="panel p-6 md:p-8"
        variants={cardPop}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Working Style</p>
            <h3 className="mt-2 font-display text-3xl font-semibold text-white">
              I like fast loops, strong reasoning, and polished delivery.
            </h3>
          </div>
          <p className="text-base leading-8 text-slate-300">
            The workflow that suits me best is simple: understand the user problem deeply,
            prototype with speed, validate with data or feedback, and then refine until the
            product feels intuitive and trustworthy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
