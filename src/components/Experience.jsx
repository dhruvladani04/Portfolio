import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { experience } from '../data/experience';
import { cardPop, viewport } from '../utils/motion';

function ArcTimelineDot({ index }) {
  return (
    <motion.div
      className="absolute z-20"
      style={{
        top: '1.5rem',
        left: '0.4rem',
        width: '1.5rem',
        height: '1.5rem',
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: 'var(--arc-blue)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--arc-blue)',
            boxShadow: 'var(--arc-glow)',
            top: '50%',
            left: '50%',
            transform: 'rotate(0deg) translateY(-6px) translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '30%',
          background: 'radial-gradient(circle at 30% 30%, var(--arc-blue-glow), var(--arc-blue))',
          boxShadow: 'var(--arc-glow)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

function TimelinePhaseIndicator({ index, total }) {
  const phases = ['INITIATE', 'DEVELOP', 'BUILD', 'LAUNCH'];
  return (
    <div className="flex items-center gap-2 mt-2">
      <span
        className="font-mono text-xs tracking-wider uppercase"
        style={{ color: 'var(--arc-blue)' }}
      >
        PHASE {index + 1}: {phases[index % phases.length]}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-sm"
            style={{
              background: i <= index ? 'var(--arc-blue)' : 'var(--muted)',
              opacity: i <= index ? 1 : 0.3,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="MISSION LOG"
        title="Professional experience timeline"
        description="Internships that strengthened my product intuition, software delivery discipline, and appetite for solving real user and business problems."
      />

      <div className="timeline relative">
        {/* HUD Line decorations */}
        <div className="absolute left-4 top-0 bottom-0 w-px opacity-20" style={{ background: 'linear-gradient(180deg, var(--arc-blue), var(--accent-gold), var(--accent-red), transparent)' }} />
        <motion.div
          className="absolute left-4 w-1 h-20 opacity-50"
          style={{ background: 'linear-gradient(180deg, var(--arc-blue), transparent)' }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {experience.map((item, index) => (
          <motion.article
            key={item.id}
            className="panel timeline-card p-6 md:p-8 relative overflow-hidden group"
            variants={cardPop}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 opacity-30 group-hover:opacity-60 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />

            {/* Gradient line on left */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 opacity-60"
              style={{
                background: `linear-gradient(180deg, var(--arc-blue), ${index % 2 === 0 ? 'var(--accent-gold)' : 'var(--accent-red)'}, transparent)`,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />

            <ArcTimelineDot index={index} />

            <div className="relative z-10 pl-2">
              <TimelinePhaseIndicator index={index} total={experience.length} />

              <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    DESIGNATION
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-white">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-lg" style={{ color: 'var(--arc-blue)' }}>
                    {item.company}
                  </p>
                </div>
                <span className="tag w-fit">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                  {item.timeframe}
                </span>
              </div>

              <ul className="feature-list mt-6">
                {item.bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    className="feature-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {bullet}
                  </motion.li>
                ))}
              </ul>

              {/* Progress indicator */}
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--muted)' }}>
                    MISSION PROGRESS
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'var(--arc-blue)' }}>
                    {Math.round(((index + 1) / experience.length) * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, var(--arc-blue), var(--accent-gold))',
                      width: `${((index + 1) / experience.length) * 100}%`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((index + 1) / experience.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
