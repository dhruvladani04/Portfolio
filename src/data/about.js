// About-page content as plain data, so the About page and the J.A.R.V.I.S.
// knowledge-base builder (scripts/agent) read the same source. Icons for the
// profile links are mapped by label in src/views/AboutPage.jsx.

export const skills = [
  { category: 'AI, ML & Data', items: ['PySpark', 'Pandas', 'scikit-learn', 'SQL', 'LangGraph', 'LangChain', 'Gemini & GPT APIs', 'RAG Systems', 'Ragas & Evals', 'MCP', 'Prompt Engineering', 'Multi-Agent Systems', 'CrewAI', 'pgvector'] },
  { category: 'Product Management', items: ['JIRA', 'Agile/Scrum', 'KPI Definition', 'POC Scoping', 'Feature Prioritization', 'Stakeholder Management', 'Product Documentation', 'Proposal Writing'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Streamlit', 'Gradio'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'Supabase', 'Prisma', 'SQLAlchemy'] },
  { category: 'Tools & Other', items: ['Git', 'Docker', 'LangSmith', 'Vercel', 'Figma', 'Linux', 'C++', 'Flutter'] },
];

export const journeyPhases = [
  {
    year: 'Pre-2022',
    title: 'The Beginning',
    desc: 'Started with Java, fell into competitive programming — solved 500+ DSA problems and earned CodeChef 5-star & Codeforces ratings.',
  },
  {
    year: 'Aug 2022',
    title: 'PDEU — B.Tech Computer Engineering',
    desc: 'Joined Pandit Deendayal Energy University. Dove deep into algorithms, data structures, and foundational CS.',
  },
  {
    year: 'Jul–Oct 2023',
    title: 'Campus Leadership Begins',
    desc: 'Joined ACM PDEU Student Chapter (Core Committee), CSI PDEU (Technical Sub-Committee), GeeksForGeeks PDEU, Encode PDEU, and Symmetry PDEU simultaneously.',
  },
  {
    year: 'Aug 2024',
    title: 'First Research Published',
    desc: '"Advanced Water Quality Assessment through Integrated Machine Learning Models" published at IEEE ICCUBEA 2024. First step into academic research.',
  },
  {
    year: 'Jun–Sep 2024',
    title: 'First Internships',
    desc: 'Android App Developer Intern at Prodigy InfoTech (Jun–Jul). Followed by Mobile App Dev Intern at WebMobi360, exploring Flutter and app architecture.',
  },
  {
    year: 'Oct–Dec 2024',
    title: 'MitJayn Corporation',
    desc: 'Mobile App Developer — managed the alpha phase of a healthcare management app, built from scratch in Flutter, and designed the UI in Figma.',
  },
  {
    year: 'Aug 2024 – Jul 2025',
    title: 'Application Dev Head & Technical Head',
    desc: 'Elected Application Development Head at ACM PDEU and Technical Head at CSI PDEU simultaneously — led technical events, workshops, and app initiatives.',
  },
  {
    year: 'Aug 2025',
    title: 'Second Research Published',
    desc: '"Analysing API Access Behaviour for Enhanced Security: A Machine Learning Approach" published at AIMV 2025 (2nd International Conference on AI and Machine Vision).',
  },
  {
    year: 'May–Aug 2025',
    title: 'AI/ML Engineer Intern — WebMobi360',
    desc: 'Integrated Generative AI, Agentic AI, and LLM-based solutions into product workflows. Built prototypes and evaluated agentic AI feature feasibility.',
  },
  {
    year: 'Jan–Jun 2026',
    title: 'AI/ML Intern — Impresa.ai Consulting',
    desc: 'Shaped client proposals with PMs, designed GenAI prompt workflows, built Python automation scripts, and delivered POC demos for enterprise clients.',
  },
  {
    year: 'May 2026',
    title: 'Graduated',
    desc: 'Completed B.Tech in Computer Engineering with a 9.4 CGPA. Ready for full-time roles in AI engineering, agentic systems, and product management.',
  },
  {
    year: 'Jul 2026 – Present',
    title: 'Promoted to Associate Application Engineer (AI/ML)',
    desc: 'Converted to full-time at Impresa.ai Consulting after the internship — data pipelines, ML models, and GenAI prototypes for client work, and currently an agentic AI project.',
  },
];

export const papers = [
  {
    title: 'Advanced Water Quality Assessment through Integrated Machine Learning Models',
    venue: 'IEEE ICCUBEA 2024',
    year: '2024',
    summary: 'Integrated machine learning models for water quality classification.',
    href: 'https://ieeexplore.ieee.org/document/10775218/',
  },
  {
    title: 'Analysing API Access Behaviour for Enhanced Security: A Machine Learning Approach',
    venue: 'AIMV 2025 (2nd International Conference on AI and Machine Vision)',
    year: '2025',
    summary: 'Using machine learning on API access behaviour to improve API security.',
    href: 'https://ieeexplore.ieee.org/document/11225867',
  },
];

export const competitive = [
  'CodeChef 5-star, maximum rating 2093.',
  'Codeforces maximum rating 1685.',
  '500+ DSA problems solved across LeetCode, CodeChef and Codeforces.',
  'Odoo Hackathon finalist (2025).',
];

export const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/dhruvladani04' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252' },
  { label: 'LeetCode', href: 'https://leetcode.com/dhruvcodes04/' },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/dhruvcodes04' },
  { label: 'CodeChef', href: 'https://www.codechef.com/users/dhruv_codes04' },
];
