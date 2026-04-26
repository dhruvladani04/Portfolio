import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { experience } from '../data/experience';
import { cardPop, viewport } from '../utils/motion';

export default function Experience() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Experience"
        title="Hands-on roles where I moved from learning fast to shipping value."
        description="Internships that strengthened my product intuition, software delivery discipline, and appetite for solving real user and business problems."
      />

      <div className="timeline">
        {experience.map((item) => (
          <motion.article
            key={item.id}
            className="panel timeline-card p-6 md:p-8"
            variants={cardPop}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <span className="timeline-dot" />

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Role</p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-2 text-lg text-slate-300">{item.company}</p>
              </div>
              <span className="tag w-fit">{item.timeframe}</span>
            </div>

            <ul className="feature-list mt-6">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="feature-item">
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
