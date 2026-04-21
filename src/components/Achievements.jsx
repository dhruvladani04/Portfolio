import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaBolt, FaCode, FaFileAlt, FaSearch, FaTrophy } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { cardPop, staggerContainer, viewport } from '../utils/motion';

const highlightStats = [
  { label: 'CodeChef max rating', value: '2093' },
  { label: 'Codeforces max rating', value: '1685' },
  { label: 'Problems solved', value: '500+' },
];

const achievements = [
  {
    id: 1,
    title: 'CodeChef 5-star Coder',
    description: 'Achieved a 5-star rating on CodeChef with a maximum rating of 2093.',
    icon: FaTrophy,
    date: '2025',
  },
  {
    id: 2,
    title: 'Codeforces Expert',
    description: 'Reached Expert rank on Codeforces with a maximum rating of 1685.',
    icon: FaBolt,
    date: '2025',
  },
  {
    id: 3,
    title: '500+ DSA Problems Solved',
    description: 'Solved 500+ problems across LeetCode, CodeChef, and Codeforces.',
    icon: FaCode,
    date: '2025',
  },
  {
    id: 4,
    title: 'Odoo Hackathon Finalist',
    description: 'Selected as a finalist for the Odoo Hackathon with a strong product and implementation approach.',
    icon: FaAward,
    date: '2025',
  },
  {
    id: 5,
    title: 'Research Paper: API Access Behavior Analysis',
    description: 'Presented at AIMV 2025 on using machine learning to improve API security through behavior analysis.',
    icon: FaSearch,
    date: '2025',
    link: 'https://ieeexplore.ieee.org/document/11225867',
  },
  {
    id: 6,
    title: 'Research Paper: Advanced Water Quality Assessment',
    description: 'Published at ICCCBEA 2024 on integrated machine learning models for water quality classification.',
    icon: FaFileAlt,
    date: '2024',
    link: 'https://ieeexplore.ieee.org/document/10775218/',
  },
];

export default function Achievements() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Achievements"
        title="Signals of consistency, curiosity, and competitive drive."
        description="These milestones reflect both technical growth and the kind of persistence I bring when a problem is worth solving well."
      />

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          className="panel panel-highlight p-6 md:p-8"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">At a glance</p>
          <h3 className="mt-2 font-display text-3xl font-semibold text-white">
            Performance, research, and execution.
          </h3>
          <p className="mt-4 text-base leading-7 text-slate-300">
            I enjoy competing, publishing, and building because each sharpens a different side of
            the same skill: solving difficult problems under real constraints.
          </p>

          <div className="mt-8 grid gap-3">
            {highlightStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[22px] border border-white/8 bg-white/[0.03] px-5 py-4"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <motion.article key={achievement.id} variants={cardPop} className="panel panel-muted p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="accent-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-xl">
                    <Icon />
                  </span>
                  <span className="tag">{achievement.date}</span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                  {achievement.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{achievement.description}</p>

                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noreferrer"
                    className="link-inline mt-5"
                  >
                    Read paper
                    <FiArrowUpRight />
                  </a>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
