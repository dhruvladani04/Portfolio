import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../utils/motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      className={`section-heading ${alignment}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {eyebrow && <span className="kicker">{eyebrow}</span>}
      <h2 className="section-title text-balance">{title}</h2>
      {description && <p className="section-copy">{description}</p>}
    </motion.div>
  );
}
