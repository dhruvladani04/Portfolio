// /work-with-me content as plain data, shared with the J.A.R.V.I.S.
// knowledge-base builder so the page and the agent quote the same terms.
// Billing terms confirmed by Dhruv 2026-11-06: hourly only, 10–20 h/week.

export { TOPMATE_URL } from './recruiter-faq.js';
export const FREELANCE_EMAIL_URL = 'mailto:dhruvladani04@gmail.com?subject=Freelance%20project';

// Each package points at shipped work that shows the same kind of build.
export const packages = [
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

export const pricingNote = 'Billed hourly. The rate depends on the type of work, the effort involved and the project, and is agreed after a 30-minute scoping call.';

export const steps = [
  '30-minute call to understand the problem.',
  'One-page scope and an hourly rate for the work.',
  'A working demo every week.',
  'Handover: code, README, and a walkthrough video.',
];

export const availability = '10–20 hours a week, IST (UTC+5:30). My evenings overlap with Europe afternoons and US East Coast mornings.';
