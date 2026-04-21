import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaSchool } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import { cardPop, viewport } from '../utils/motion';

const education = [
  {
    id: 1,
    institution: 'Pandit Deendayal Energy University',
    location: 'Gujarat, India',
    degree: 'B.Tech in Computer Engineering',
    board: 'Graduating in 2026',
    score: 'CGPA 9.34 / 10',
    icon: FaGraduationCap,
  },
  {
    id: 2,
    institution: "Saint Paul's School",
    location: 'Rajkot, Gujarat',
    degree: '12th Grade',
    board: 'Council for the Indian School Certificate Examinations',
    score: '95.2%',
    icon: FaSchool,
  },
  {
    id: 3,
    institution: "Saint Paul's School",
    location: 'Rajkot, Gujarat',
    degree: '10th Grade',
    board: 'Council for the Indian School Certificate Examinations',
    score: '88.6%',
    icon: FaBook,
  },
];

export default function Education() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Education"
        title="A strong academic base paired with a habit of learning by building."
        description="My academic record reflects consistency, but the bigger story is how coursework, self-learning, and projects have compounded into practical capability."
      />

      <div className="grid gap-5 xl:grid-cols-3">
        {education.map((item) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.id}
              className="panel panel-muted p-6"
              variants={cardPop}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="accent-icon icon-shell inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
                  <Icon />
                </span>
                <span className="tag">{item.score}</span>
              </div>

              <p className="mt-6 text-sm uppercase tracking-[0.22em] text-slate-400">
                {item.location}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                {item.institution}
              </h3>
              <p className="mt-3 text-lg text-slate-300">{item.degree}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.board}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
