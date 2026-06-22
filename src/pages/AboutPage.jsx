import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiCodeforces, SiLeetcode, SiCodechef } from 'react-icons/si';
import { experience } from '../data/experience';

const skills = [
  { category: 'AI & Machine Learning', items: ['LangGraph', 'LangChain', 'Gemini & GPT APIs', 'RAG Systems', 'Prompt Engineering', 'Multi-Agent Systems', 'CrewAI', 'pgvector'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Streamlit', 'Gradio'] },
  { category: 'Backend', items: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'Supabase', 'Prisma', 'SQLAlchemy'] },
  { category: 'Tools & Other', items: ['Git', 'Docker', 'LangSmith', 'Vercel', 'Figma', 'Linux', 'C++', 'Flutter'] },
];

const journeyPhases = [
  {
    year: 'Pre-2022',
    title: 'The Beginning',
    desc: 'Started with Java, fell into competitive programming — solved 500+ DSA problems and earned CodeChef 5-star & Codeforces ratings.',
  },
  {
    year: 'Aug 2022',
    title: 'PDEU — B.Tech Computer Engineering',
    desc: 'Joined Pandit Deendayal Energy University. Dove deep into algorithms, data structures, and foundational CS. CGPA: 9.34.',
  },
  {
    year: 'Jul–Oct 2023',
    title: 'Campus Leadership Begins',
    desc: 'Joined ACM PDEU Student Chapter (Core Committee), CSI PDEU (Technical Sub-Committee), GeeksForGeeks PDEU, Encode PDEU, and Symmetry PDEU simultaneously.',
  },
  {
    year: 'Aug 2024 — Aug 2024',
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
    year: 'Jan 2026 – Present',
    title: 'AI/ML Intern — Impresa.ai Consulting',
    desc: 'Shaping client proposals with PMs, designing GenAI prompt workflows, building Python automation scripts, and delivering POC demos for enterprise clients.',
  },
  {
    year: 'Jul 2026',
    title: 'Graduating',
    desc: 'Completing B.Tech in Computer Engineering. Ready for full-time roles in AI engineering, agentic systems, and product management.',
  },
];

const profiles = [
  { label: 'GitHub', href: 'https://github.com/dhruvladani04', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-ladani-a65578252', icon: FiLinkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/dhruvcodes04/', icon: SiLeetcode },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/dhruvcodes04', icon: SiCodeforces },
  { label: 'CodeChef', href: 'https://www.codechef.com/users/dhruv_codes04', icon: SiCodechef },
];

export default function AboutPage() {
  return (
    <div className="section-shell pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link to="/" className="link-inline inline-flex items-center gap-2 mb-12 group">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Hero */}
        <motion.div
          className="grid lg:grid-cols-[1.2fr_1fr] gap-12 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>ABOUT</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Dhruv Ladani</span>
            </h1>

            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              I'm a Computer Engineering student at Pandit Deendayal Energy University (PDEU)
              with a CGPA of <span style={{ color: 'var(--arc-blue)' }}>9.34</span> and a strong
              bias toward building products that actually help people.
            </p>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              My journey started with Java, evolved through competitive programming in C++,
              and now spans AI workflows, full-stack products, and data-driven systems.
              I've solved <span style={{ color: 'var(--accent-gold)' }}>500+ DSA problems</span> across
              platforms and achieved CodeChef 5-star rating.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Across projects, I enjoy the blend of reasoning and craft: shaping the right
              user flow, choosing practical architecture, and iterating until the experience
              feels clear and reliable.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="/Dhruv_Ladani_Resume_Tech.pdf" download className="btn-primary">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                  Download Resume
                </span>
                <FiDownload />
              </a>
              <Link to="/contact" className="btn-secondary">
                Contact Me
                <FiArrowUpRight />
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="panel p-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 opacity-30" style={{ borderColor: 'var(--arc-blue)' }} />
              <img
                src="/avatar.jpg"
                alt="Dhruv Ladani"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
              <div className="absolute inset-2 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(0, 217, 255, 0.1)' }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>MY JOURNEY</span>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, var(--arc-blue), var(--accent-gold), var(--accent-red), transparent)' }} />

            {journeyPhases.map((phase, i) => (
              <motion.div
                key={phase.year}
                className="relative pl-8 pb-8 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-[1px]" style={{ background: 'var(--arc-blue)', boxShadow: 'var(--arc-glow)' }} />
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-xs" style={{ color: 'var(--arc-blue)' }}>{phase.year}</span>
                  <span className="font-display text-xl font-semibold text-white">{phase.title}</span>
                </div>
                <p className="text-slate-400">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>SKILLS & TOOLS</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillSet, i) => (
              <motion.div
                key={skillSet.category}
                className="panel p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--accent-gold)' }}>
                  {skillSet.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillSet.items.map((item) => (
                    <span key={item} className="tag text-xs py-1 px-2">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>EXPERIENCE</span>
          </div>

          <div className="grid gap-4">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                className="panel p-6 relative overflow-hidden group hover:scale-[1.01] transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 opacity-20 group-hover:opacity-50 transition-opacity" style={{ borderColor: 'var(--arc-blue)' }} />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <span className="tag mb-2 inline-block">{item.timeframe}</span>
                    <h3 className="font-display text-xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-1" style={{ color: 'var(--arc-blue)' }}>{item.company}</p>
                  </div>
                  <ul className="feature-list md:w-2/3">
                    {item.bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet} className="feature-item">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Links */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--arc-blue))' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--arc-blue)' }}>FIND ME ONLINE</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {profiles.map((profile) => {
              const Icon = profile.icon;
              return (
                <a
                  key={profile.label}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tag group hover:scale-105 transition-transform"
                >
                  <Icon className="text-sm" />
                  {profile.label}
                  <FiArrowUpRight className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
