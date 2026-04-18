import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiBarChart2, FiCalendar, FiMapPin, FiTarget } from 'react-icons/fi';
import SectionHeading from './SectionHeading';
import { cardPop, fadeUp, staggerContainer, viewport } from '../utils/motion';

const quickFacts = [
  {
    icon: FiMapPin,
    label: 'Based In',
    value: 'Gujarat, India',
    copy: 'Open to remote, hybrid, and on-site opportunities.',
  },
  {
    icon: FiCalendar,
    label: 'Graduation',
    value: '2026',
    copy: 'B.Tech in Computer Engineering at PDEU.',
  },
  {
    icon: FiTarget,
    label: 'What I Like',
    value: 'Complex product problems',
    copy: 'Especially ones mixing AI, UX, and systems thinking.',
  },
  {
    icon: FiBarChart2,
    label: 'Strength',
    value: 'Technical + product lens',
    copy: 'I enjoy translating user needs into shippable software.',
  },
];

const strengths = [
  'Comfortable moving from idea framing to working prototype quickly.',
  'Strong base in competitive programming, algorithms, and structured problem solving.',
  'Interested in AI workflows, analytics, experimentation, and growth-minded product thinking.',
  'Enjoy collaborating across engineering, data, and product to shape useful outcomes.',
];

export default function About() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="About"
        title="A builder who likes the hard middle between ideas and execution."
        description="I care about turning ambitious concepts into real products with clear logic, polished interfaces, and measurable value."
      />

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          className="panel p-8 md:p-10"
          variants={cardPop}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <div className="space-y-6">
            <span className="pill">
              <span className="pill-dot" />
              Curious engineer with a product-first mindset
            </span>

            <div className="space-y-5 text-base leading-8 text-slate-200">
              <p>
                I&apos;m Dhruv Ladani, a Computer Engineering student at Pandit Deendayal Energy
                University with a CGPA of 9.34 and a strong bias toward building things that
                actually help people. My journey started with Java, evolved through competitive
                programming in C++, and now spans AI workflows, full-stack products, and
                data-driven systems.
              </p>
              <p>
                Across projects, I enjoy the blend of reasoning and craft: shaping the right
                user flow, choosing practical architecture, and iterating until the experience
                feels clear and reliable. That&apos;s what keeps pulling me toward AI-enabled
                products, analytics tooling, and software with a strong product narrative.
              </p>
            </div>

            <div className="soft-divider" />

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://github.com/dhruvladani04"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">GitHub</p>
                  <p className="mt-2 font-semibold text-white">github.com/dhruvladani04</p>
                </div>
                <FiArrowUpRight className="text-slate-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhruv-ladani-a65578252"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">LinkedIn</p>
                  <p className="mt-2 font-semibold text-white">Connect and follow my work</p>
                </div>
                <FiArrowUpRight className="text-slate-400" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div variants={cardPop} className="panel panel-muted p-6">
            <h3 className="font-display text-2xl font-semibold text-white">What I bring to teams</h3>
            <ul className="feature-list mt-5">
              {strengths.map((item) => (
                <li key={item} className="feature-item">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <motion.div key={fact.label} variants={fadeUp} className="panel panel-muted p-5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-xl text-[#7cf7d4]">
                    <Icon />
                  </span>
                  <p className="mt-4 text-sm uppercase tracking-[0.22em] text-slate-400">
                    {fact.label}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">
                    {fact.value}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{fact.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
