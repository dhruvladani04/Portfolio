// Recruiter-facing facts supplied by Dhruv (2026-11-06). The J.A.R.V.I.S.
// agent's knowledge base is built from this file on every production deploy,
// so editing a line here and redeploying is how the agent's answers change.
// Every line must stay true: recruiters cross-check the site, the resume and
// LinkedIn.

export const CONTACT_EMAIL = 'dhruvladani04@gmail.com';
export const TOPMATE_URL = 'https://topmate.io/dhruv_ladani04/';

export const RESUMES = {
  tech: { label: 'Tech resume (AI/ML engineering)', href: '/Dhruv_Ladani_Resume_Tech.pdf' },
  pm: { label: 'Product resume (PM / product roles)', href: '/Dhruv_Ladani_Resume_PM.pdf' },
};

export const recruiterFaq = {
  basics: {
    name: 'Dhruv Ladani',
    currentRole: 'Associate Application Engineer (AI/ML) at Impresa.ai Consulting, since July 2026 (converted from an AI/ML internship that began January 2026).',
    location: 'Ahmedabad, Gujarat, India (IST, UTC+5:30).',
    education: 'B.Tech in Computer Engineering, Pandit Deendayal Energy University (PDEU), 2022–2026, CGPA 9.4; graduated May 2026. Also completed the Product Management and Agentic AI Program at IIT Patna (online, 2025–2026).',
    languages: ['English', 'Hindi', 'Gujarati'],
  },

  availability: {
    noticePeriod: 'One month. It can be reduced to two or three weeks after a discussion with his manager.',
    // Deliberately relative: the agent turns this into a calendar date from
    // the current date at conversation time, so it never goes stale.
    earliestStart: 'About four to five weeks from the date of the conversation.',
  },

  workSetup: {
    current: 'Hybrid at Impresa.ai: three days a week in the Ahmedabad office, two days from home.',
    relocation: 'Willing to relocate to Hyderabad, Bangalore, Pune, Delhi or Mumbai.',
    openTo: 'On-site, hybrid and remote roles.',
  },

  compensation: {
    india: 'Expects 10 to 12 LPA (INR) for roles in India.',
    international: 'Expects USD 50K or more per year for international roles.',
    note: 'Always open to discussion. The best next step is to share the opportunity through the hiring form on the Contact page or by email.',
  },

  freelance: {
    billing: 'Hourly only. The hourly rate depends on the type of work, the effort involved and the kind of project.',
    hours: '10 to 20 hours per week, alongside his full-time role.',
    bestFit: 'Early-stage startups and agencies that need a working AI or ML prototype fast.',
  },

  targetRoles: [
    'Forward Deployed Engineer (FDE)',
    'AI/ML engineer roles with direct client interaction, not purely back-office engineering',
    'Product roles: product owner, product manager, product analyst',
  ],
  preferredCompanies: 'AI-first companies, or companies expanding into AI and adding AI features to their products.',

  workAuthorization: 'Authorized to work in India. Holds a passport; international roles depend on obtaining the relevant visa.',

  positioning: [
    'Not a typical engineer: he thinks like a product manager and ships things people actually like using.',
    'User-centric: starts from the user problem, defines KPIs, then builds and measures.',
    'Fits the forward-deployed profile the market wants: a forward-deployed engineer, or a forward-deployed PM who can code.',
    'Pairs product thinking with measured engineering: his agent and RAG projects ship with held-out evals and real numbers, not just demos.',
  ],
};

// Why his one-page resumes differ from the site, so the agent can explain
// rather than contradict when a recruiter compares the two (Dhruv, 2026-11-06).
export const resumeNotes = [
  'To keep the resume to one page, the Impresa.ai internship (January–June 2026) and the full-time Associate Application Engineer role (since July 2026) are condensed into a single "AI Engineer, Impresa.ai, January 2026 – Present" entry. Both describe the same continuous stint.',
  'The resume describes Recruit-AI as using GPT-4o. That was an earlier version; it now runs on Gemini 2.5 Flash, as the site says.',
  // The old figures themselves are deliberately not written here, so the
  // assistant can't volunteer them (an eval checks it never does).
  'The resume and his LinkedIn summary quote older Context Precision figures for the Agentic Compliance Auditor. Those come from an earlier, superseded 11-question run; the current 25-question baseline is what the site reports. Explain this only when a visitor brings the older figures up.',
  'The resumes include a few impact figures (for Smart Job Prep Assistant, Agile Sprint Guardian and his WebMobi360 internship) that are deliberately kept off the site. Do not quote them; if asked, say they are on his resume and Dhruv can walk through them directly.',
  'His phone number is on the resume PDFs. You still never read it out or repeat it — point to email or the contact form.',
];

// From Dhruv's LinkedIn profile export (2026-11-06): only what the site
// doesn't already say. The bracketed figures in his LinkedIn Impresa bullets
// (rows per run, runtime cut, hours saved, days per demo) and the
// feature-count / accuracy numbers are deliberately left out until he
// confirms them.
export const linkedinProfile = {
  headline:
    'ML/AI Engineer @ Impresa.ai | Spark pipelines → ML models → client-ready AI prototypes | Building agentic AI (LangGraph, RAG) | Builder who thinks like a PM',
  topSkills: ['Rapid prototyping', 'Claude Code subagents', 'Apache Spark'],
  certifications: [
    'Level 2: Cloud Security',
    'AI Fluency: Framework and Foundations',
    'Learn Advance Java',
    'Java for Problem Solving-2',
    'Introduction to Data Structures and Algorithms',
  ],
  impresaWork: [
    'Load prediction and disaggregation on utility client data, using boosting models and time-series models such as N-HiTS, with PySpark ETL pipelines and data-validation checks feeding them.',
    'Rapid prototypes built with the product team for client and internal demos, several of which fed into client proposals.',
    'Now contributing to an agentic AI ticket-management system.',
  ],
};

// Claims that must never be made, even if an older README still contains
// them. The knowledge-base builder also strips the matching README lines.
export const doNotClaim = [
  'Do not say EdgeSynth cuts infrastructure cost by "up to 80%" — that figure was never measured. The measured claim is 10–20x faster development.',
  'For the Agentic Compliance Auditor, quote only the current 25-question baseline (citation support 0.989, context precision 0.931). Never bring up older or different figures yourself. Only if the visitor mentions numbers from his resume or LinkedIn, explain they came from an earlier, superseded 11-question run.',
  'Dhruv has no Spark side project yet; PySpark is part of his day job at Impresa.ai, not a portfolio project.',
  'The Predictive Maintenance Dashboard has no measured results; do not attach metrics to it.',
  'Do not quote specific numbers for his Impresa.ai work (data volumes, runtime savings, hours saved, accuracy gains, feature counts), even if a visitor cites them from LinkedIn. Describe the work and say Dhruv can walk through the details directly.',
];
