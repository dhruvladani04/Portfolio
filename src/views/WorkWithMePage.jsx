'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiArrowUpRight, FiCalendar, FiMail, FiClock } from 'react-icons/fi';

const TOPMATE_URL = 'https://topmate.io/dhruv_ladani04/';
const EMAIL_URL = 'mailto:dhruvladani04@gmail.com?subject=Freelance%20project';

// Each package points at shipped work that shows the same kind of build.
const packages = [
  {
    title: 'AI prototype for a pitch',
    duration: '1–2 weeks',
    desc: 'You bring the idea and sample data. I deliver a clickable demo, the core model or LLM workflow behind it, and a one-page note on what it would take to put it into production.',
    proof: [{ label: 'Recruit-AI Platform', href: '/work/recruitai-platform' }],
    color: 'var(--arc-blue)',
  },
  {
    title: 'Data pipeline + model + demo',
    duration: '2–3 weeks',
    desc: 'A Python/PySpark pipeline over your data, engineered features, a baseline model with honest evaluation, and a dashboard your team can use.',
    proof: [{ label: 'Smart Job Tracker', href: '/work/smart-job-tracker' }],
    color: 'var(--accent-gold)',
  },
  {
    title: 'RAG or agent pilot with evals',
    duration: '2–3 weeks',
    desc: 'Retrieval over your documents, an agent workflow, and a test set that measures accuracy, so you see numbers, not just a demo.',
    proof: [
      { label: 'Agentic Compliance Auditor', href: '/work/agentic-compliance-auditor' },
      { label: 'Tollgate', href: '/work/tollgate' },
    ],
    color: 'var(--accent-red-bright)',
  },
];

const steps = [
  '30-minute call to understand the problem.',
  'One-page scope with a fixed price.',
  'A working demo every week.',
  'Handover: code, README, and a walkthrough video.',
];

export default function WorkWithMePage() {
  return (
    <div className="section-shell pt-32 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Back link */}
        <Link href="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>FREELANCE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">with me</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            I take on a small number of freelance builds alongside my full-time role. Best fit:
            early-stage startups and agencies that need a working AI or ML prototype fast.
          </p>
        </motion.div>

        {/* Packages */}
        <section className="mb-16" aria-labelledby="wwm-build">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <h2 id="wwm-build" className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>
              What I build
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.article
                key={pkg.title}
                className="panel p-6 md:p-7 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                <span className="tag self-start mb-4" style={{ borderColor: pkg.color }}>{pkg.duration}</span>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{pkg.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6">{pkg.desc}</p>
                <div className="mt-auto">
                  <p className="font-mono text-xs uppercase tracking-widest mb-2 text-slate-500">Similar work</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.proof.map((p) => (
                      <Link key={p.href} href={p.href} className="link-inline inline-flex items-center gap-1 text-sm group">
                        {p.label}
                        <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="text-slate-400 mt-6">
            Every package is a fixed price, agreed after a 30-minute scoping call.
          </p>
        </section>

        {/* Process */}
        <section className="mb-16" aria-labelledby="wwm-process">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <h2 id="wwm-process" className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>
              How it works
            </h2>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <li key={step} className="panel p-5">
                <span className="font-mono text-sm block mb-2" style={{ color: 'var(--accent-gold)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Availability + CTAs */}
        <section className="panel panel-highlight p-8 md:p-10 relative overflow-hidden" aria-labelledby="wwm-availability">
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 id="wwm-availability" className="font-display text-2xl font-semibold text-white mb-3 flex items-center gap-3">
                <FiClock style={{ color: 'var(--arc-blue)' }} aria-hidden />
                Availability
              </h2>
              <p className="text-slate-300 leading-relaxed">
                About 10 hours a week, IST (UTC+5:30). My evenings overlap with Europe
                afternoons and US East Coast mornings.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={TOPMATE_URL} target="_blank" rel="noreferrer" className="btn-primary group">
                <span className="flex items-center gap-2">
                  <FiCalendar />
                  Book a call
                </span>
                <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href={EMAIL_URL} className="btn-secondary group">
                <span className="flex items-center gap-2">
                  <FiMail />
                  Email me
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
