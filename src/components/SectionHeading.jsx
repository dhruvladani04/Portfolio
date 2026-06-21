import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../utils/motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      className={`section-heading ${alignment} relative`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="w-8 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          <span className="kicker">{eyebrow}</span>
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }}
            animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      )}
      <h2 className="section-title text-balance">{title}</h2>
      {description && (
        <p className="section-copy">{description}</p>
      )}

      {/* Bottom HUD line */}
      <motion.div
        className="absolute -bottom-2 left-0 h-px"
        style={{
          background: 'linear-gradient(90deg, var(--accent-red), var(--arc-blue), var(--accent-gold), transparent)',
        }}
        initial={{ scaleX: 0, width: '30%' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
}
