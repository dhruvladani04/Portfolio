// Projects — ordered to highlight AI/ML + Product Management intersection first
export const projects = [
  {
    id: 'news-digest',
    title: 'Daily News Digest',
    timeframe: 'August 2026',
    summary: 'A five-sector daily news dashboard that runs on zero infrastructure: a scheduled GitHub Action pulls ~71 RSS feeds, dedupes and ranks the survivors, and Netlify redeploys a static site on every commit.',
    bullets: [
      'Runs entirely inside a GitHub Actions cron job that fetches ~71 public RSS feeds across five sectors and commits the result as JSON — the repository is the database.',
      'Deduplicates near-identical stories across outlets in two passes: exact canonical-URL matching, then fuzzy token-bucketed title comparison.',
      'Ranks every story with a weighted score across source tier, recency (exponential decay), cross-outlet corroboration, and sector-specific keywords.',
      'Ships a fully static dashboard with no server, no database, and no API keys — if a build fails, yesterday’s page keeps serving.',
      'Includes a separate feed-validation workflow to prune sources that genuinely stop working.'
    ],
    tech: [
      'Python', 'GitHub Actions', 'RSS', 'Netlify',
      'Vanilla JS', 'JSON'
    ],
    link: 'https://github.com/dhruvladani04/news-digest',
    caseStudy: {
      problem:
        'A useful news digest needs to survive duplicate coverage (the same wire story from ten outlets), stay cheap to run indefinitely, and keep working even when a build or a feed breaks.',
      approach:
        'Split the system into three independently-failing parts: a scheduled fetch job, a git-committed data layer, and a static CDN read layer. Deduplication runs in two passes — exact canonical-URL grouping after stripping tracking params, then fuzzy token-bucketed comparison for near-identical headlines. Ranking combines source tier, a recency half-life decay, corroboration count, and sector keyword rules into one score per story.',
      outcome:
        'A daily-refreshing five-sector dashboard (AI & Tech, Finance & Markets, Geopolitics & Defense, Startups/Science/Energy, Entertainment) with zero running cost — no server, database, or paid tier — and no single point of failure: a bad fetch or build still leaves the previous day’s digest live.',
    },
    features: [
      'Zero-Cost Static Pipeline',
      'Two-Pass Deduplication',
      'Weighted Story Ranking',
      'GitHub Actions Cron',
      'Self-Healing Feed Validation'
    ]
  },
  {
    id: 'deep-work-timer',
    title: 'Deep Work Timer',
    timeframe: 'January 2026',
    summary: 'A professional-grade Pomodoro timer built in Flutter with an AI coach: natural-language session input, Gemini-powered productivity insights, and ambient soundscapes for staying in flow.',
    bullets: [
      'Parses natural-language input like "Focus for 45m on Project X" into a configured session via smart NLP.',
      'Generates personalized, context-aware coaching and motivation from actual work history using Gemini.',
      'Automatically categorizes tasks (Work, Study, Health, Chores) for a statistics dashboard with bar-chart breakdowns.',
      'Bundles ambient soundscapes (rain, forest, fireplace, cafe) to mask distractions during focus sessions.',
      'Ships dynamic Material 3 theming with multiple color presets that adapt to the current timer phase.'
    ],
    tech: [
      'Flutter', 'Dart', 'Google Gemini', 'Material 3'
    ],
    link: 'https://github.com/dhruvladani04/deep-work-timer',
    caseStudy: {
      problem:
        'Most Pomodoro apps just count down a timer. Setting up a session is manual, and there is no feedback loop that helps someone understand or improve their actual focus patterns over time.',
      approach:
        'Built a Flutter app where session setup is a natural-language sentence rather than a form, and layered a Gemini-powered coach on top of session history to surface personalized insights instead of generic streak counts. Automatic categorization and a statistics dashboard turn raw session logs into a productivity breakdown by task type.',
      outcome:
        'A focus timer that reduces the friction of starting a session and closes the loop with AI-generated, history-aware coaching — paired with ambient soundscapes and adaptive theming for the session itself.',
    },
    features: [
      'Smart NLP Session Input',
      'Gemini AI Coach',
      'Automatic Task Categorization',
      'Ambient Soundscapes',
      'Adaptive Material 3 Theming'
    ]
  },
  {
    id: 'agentic-compliance-auditor',
    title: 'Agentic Compliance Auditor',
    timeframe: 'July 2026',
    summary: 'An autonomous compliance auditor that ingests policy documents and delivers grounded, multi-step answers through a self-correcting CRAG + Self-RAG workflow.',
    bullets: [
      'Orchestrates a four-node LangGraph workflow that retrieves, grades, rewrites, and generates compliance answers with configurable retry protection.',
      'Supports policy ingestion from Markdown, text, PDF, and Word documents for flexible internal knowledge bases.',
      'Uses Ragas evaluation with custom golden datasets, dynamic field mapping, and exportable benchmark reports.',
      'Implements BYOK security in a Streamlit interface, keeping visitor Gemini API keys out of the server.',
      'Adds grounded web-search fallback and LangSmith traces for resilient, observable audit workflows.'
    ],
    tech: [
      'Python', 'LangGraph', 'Google Gemini', 'ChromaDB',
      'Ragas', 'Streamlit', 'LangSmith', 'Tavily'
    ],
    link: 'https://github.com/dhruvladani04/agentic-compliance-auditor',
    caseStudy: {
      problem:
        'Compliance teams need precise answers from dense, conflicting policy documents, but ordinary RAG systems can retrieve weak context or return ungrounded conclusions.',
      approach:
        'Built a corrective and self-reflective RAG workflow that grades retrieved context, rewrites weak queries, optionally searches the web, and checks every generated response for grounding and usefulness. The product also provides multi-format ingestion, BYOK access, and custom Ragas evaluation datasets.',
      outcome:
        'Creates an observable, evaluable compliance assistant with benchmarked retrieval and answer-quality metrics instead of a black-box document chatbot.',
    },
    features: [
      'CRAG + Self-RAG Workflow',
      'Multi-Format Policy Ingestion',
      'Golden Dataset Evaluation',
      'BYOK Security',
      'Grounded Web Fallback'
    ]
  },
  {
    id: 'feedbackiq',
    title: 'FeedbackIQ',
    timeframe: 'June 2026',
    summary: 'An AI feedback synthesizer that turns fragmented product feedback into citation-verified weekly briefs through a multi-agent LangGraph pipeline.',
    bullets: [
      'Verifies every brief quote against its source corpus, retrying synthesis or flagging a brief for human review when verification fails.',
      'Coordinates preprocessing, classification, embedding-based deduplication, prioritization, and synthesis in a stateful five-agent workflow.',
      'Ingests Slack feedback through MCP and CSV uploads while redacting PII before analysis.',
      'Uses offline adapters so the full FastAPI, ChromaDB, SQLite, and scheduling workflow runs without credentials.',
      'Schedules hourly ingestion and Monday-morning briefs with Celery and Redis.'
    ],
    tech: [
      'Python', 'LangGraph', 'FastAPI', 'React',
      'ChromaDB', 'SQLite', 'Celery', 'Model Context Protocol'
    ],
    link: 'https://github.com/dhruvladani04/feedbackIQ',
    caseStudy: {
      problem:
        'Product feedback lives across tools and is expensive to triage. A useful stakeholder brief must preserve evidence, not invent it.',
      approach:
        'Designed a five-stage LangGraph pipeline that redacts and classifies source feedback, deduplicates themes with embeddings, prioritizes them, then synthesizes a brief whose quotes are copied from and independently verified against the source material.',
      outcome:
        'Produces weekly feedback briefs with an anti-hallucination verification loop, along with a production-shaped workflow that can run entirely offline for safe demos and testing.',
    },
    features: [
      'Citation-Verified Briefs',
      'Multi-Agent Feedback Pipeline',
      'Slack MCP Ingestion',
      'PII Redaction',
      'Offline-First Adapters'
    ]
  },
  {
    id: 'docmind',
    title: 'DocMind',
    timeframe: 'May 2026',
    summary: 'A production-grade multi-agent RAG system for PDF intelligence, delivering cited answers through LangGraph orchestration and a scalable cloud ingestion pipeline.',
    bullets: [
      'Routes queries through a LangGraph supervisor that coordinates retrieval and grounded web-search agents.',
      'Builds a PDF ingestion pipeline from upload through GCS and Pub/Sub to chunking, embedding, and Qdrant storage.',
      'Returns cited answers with source PDF names, page numbers, and relevance scores.',
      'Adds end-to-end Langfuse tracing, session-level observability, health checks, retries, and dead-letter queues.',
      'Ships a dark Next.js chat interface with drag-and-drop uploads and collapsible agent traces.'
    ],
    tech: [
      'Python', 'LangGraph', 'FastAPI', 'Next.js',
      'Google Gemini', 'Qdrant', 'Google Cloud', 'Langfuse'
    ],
    link: 'https://github.com/dhruvladani04/docmind',
    caseStudy: {
      problem:
        'Teams need trustworthy answers from long PDFs, with a clear path from an answer back to its supporting source material.',
      approach:
        'Implemented a supervisor-led RAG architecture with Qdrant retrieval, web-grounding fallback, and an event-driven PDF ingestion pipeline using GCS and Pub/Sub. Responses surface source pages and relevance scores while Langfuse records each agent decision.',
      outcome:
        'Delivers a deployable document-intelligence workflow with cited answers, production hardening, and visibility across both query and ingestion paths.',
    },
    features: [
      'Multi-Agent RAG',
      'Cited PDF Answers',
      'Cloud Ingestion Pipeline',
      'Grounded Web Search',
      'Langfuse Observability'
    ]
  },
  {
    id: 'ai-pm-copilot',
    title: 'AI PM Co-pilot',
    timeframe: 'March 2026',
    summary: 'A dynamic utility designed for Product Managers to manage probabilistic AI systems. Leverages background agents to automate the synthesis, prototyping, and testing of new product features.',
    bullets: [
      'Architects a three-phase workflow: Discovery Hub, Technical Drafting Studio, and Eval Dashboard — streamlining the entire product lifecycle from ideation to evaluation.',
      'Automates synthetic dataset generation using 50 Commune transcripts, accelerating testing phases without manual data collection.',
      'Utilizes LangGraph-powered persistence with shared state utilities, ensuring consistent context across complex multi-step AI workflows.',
      'Develops a dual UI with Streamlit for dashboards and Gradio for interactive drafting, matching the right interface to the specific PM task.',
      'Integrates Gemini via LangChain with timeout and fallback protections for resilient API handling.'
    ],
    tech: [
      'Python', 'LangGraph', 'LangChain', 'Streamlit',
      'Gradio', 'Gemini 2.5 Flash', 'NetworkX', 'Pandas'
    ],
    link: 'https://github.com/dhruvladani04/AI_PM-Co-pilot',
    caseStudy: {
      problem:
        'Product managers shipping AI features work with probabilistic systems — the same prompt can produce different outputs, which makes speccing, prototyping, and evaluating features slow and manual. Nothing in the standard PM toolkit is built for this.',
      approach:
        'Built a three-phase workflow that mirrors how PM work actually flows: a Discovery Hub for ideation, a Technical Drafting Studio for speccing, and an Eval Dashboard for governance. Background agents automate synthesis, prototyping, and testing along the way. LangGraph-powered persistence keeps shared state consistent across multi-step workflows, and Gemini is integrated via LangChain behind timeout and fallback protections. A dual UI — Streamlit for dashboards, Gradio for interactive drafting — matches the interface to each task.',
      outcome:
        'Synthetic dataset generation from 50 Commune transcripts removed manual data collection from the testing loop, so a feature can travel from ideation to evaluated prototype inside a single tool.',
    },
    features: [
      'Discovery Hub',
      'Technical Drafting Studio',
      'Eval & Governance Dashboard',
      'Graph Visualization',
      'LangSmith Telemetry'
    ]
  },
  {
    id: 'smart-job-tracker',
    title: 'Smart Job Tracker',
    timeframe: 'April 2026',
    summary: 'An AI-powered job search pipeline that automates lead generation and evaluation. Solves the fragmentation of job boards by aggregating sources, scoring leads via LLMs, and refining accuracy through feedback loops.',
    bullets: [
      'Aggregates 100+ job sources via Apify API — centralizing fragmented job market data into a single, reliable source of truth.',
      'Applies a 9-factor weighted scoring rubric evaluated by Gemini, standardizing evaluation with objective, data-driven metrics.',
      'Implements a feedback-driven calibration loop that improved scoring correlation from 62% to 87%.',
      'Deploys a 3-tier deduplication system (URL, composite key, fuzzy match) ensuring ~98% data accuracy.',
      'Provides dual output options with CLI reports and a FastAPI dashboard.'
    ],
    tech: [
      'Python', 'FastAPI', 'Apify API', 'Google Gemini',
      'SQLite', 'SQLAlchemy', 'Docker', 'asyncio'
    ],
    link: 'https://github.com/dhruvladani04/smart-job-tracker',
    caseStudy: {
      problem:
        'Job listings are fragmented across dozens of boards, full of duplicates, and there is no consistent way to judge fit — evaluating leads by hand simply does not scale during an active search.',
      approach:
        'An aggregation pipeline pulls 100+ job sources through the Apify API into a single source of truth. Every lead is scored by Gemini against a 9-factor weighted rubric, and a 3-tier deduplication system (URL, composite key, fuzzy match) keeps the dataset clean. Results are served two ways: CLI reports for quick scans and a FastAPI dashboard for deeper review.',
      outcome:
        'A feedback-driven calibration loop raised scoring correlation from 62% to 87%, and the deduplication system holds data accuracy at ~98% — turning a fragmented job market into one ranked, trustworthy list.',
    },
    features: [
      'Multi-source Aggregation',
      'LLM-based Scoring',
      'Feedback Calibration',
      'Priority Ranking',
      'CLI + Web Dashboard'
    ]
  },
  {
    id: 'agile-sprint-guardian',
    title: 'Agile Sprint Guardian',
    timeframe: 'December 2025',
    summary: 'A multi-agent system that simulates an Agile squad to autonomously refine feature requests into comprehensive, estimated tickets — streamlining the product planning phase.',
    bullets: [
      'Orchestrates specialized AI agents (Product Owner, Tech Lead, SecOps, QA) simulating cross-functional collaboration to produce thoroughly vetted tickets.',
      'Automates the translation of generic requests into detailed technical specifications, reducing ambiguity for engineering teams.',
      'Integrates a security-first approach with dedicated risk analysis agents, proactively identifying vulnerabilities before development begins.',
      'Provides seamless JIRA integration for direct export of refined tickets into existing enterprise workflows.',
      'Powered by CrewAI and Gemini 2.5 Flash for high-quality, context-aware outputs that rival human PM refinement.'
    ],
    tech: [
      'Python', 'FastAPI', 'React', 'CrewAI',
      'Google Gemini 2.5 Flash', 'JavaScript'
    ],
    link: 'https://github.com/dhruvladani04/Agile-Sprint-Guardian',
    features: [
      'Multi-agent Collaboration',
      'Automated Ticket Refinement',
      'JIRA Integration',
      'SecOps Risk Analysis',
      'Role-based Agents'
    ]
  },
  {
    id: 'bugvision-ai',
    title: 'BugVision AI',
    timeframe: 'December 2025',
    summary: 'An intelligent debugging assistant that leverages multimodal AI to accelerate root cause identification by analyzing screen recordings alongside source code. Award-winning Google DeepMind competition entry.',
    bullets: [
      'Correlates MP4/WEBM screen recordings with component code using multimodal analysis, drastically reducing time-to-resolution for visually-manifesting bugs.',
      'Features a Smart Code Editor for on-the-fly code inspection and live patching, creating a seamless integrated debugging environment.',
      'Includes a "Sherlock Mode" interactive chat for deep-dive contextual queries into complex codebases.',
      'Automatically identifies visual anomalies and traces them to underlying logic errors, bridging the gap between QA and engineering.',
      'Recognized as an award-winning Google DeepMind Competition entry.'
    ],
    tech: [
      'TypeScript', 'React', 'Vite', 'Prismjs',
      'Gemini 3 Pro', 'Gemini 2.5 Flash'
    ],
    link: 'https://github.com/dhruvladani04/BugVision-AI',
    caseStudy: {
      problem:
        'Visually-manifesting bugs are painful to trace: the symptom lives in a screen recording while the cause lives in the code, and nothing connects the two. QA hands engineering a video; engineering starts from zero.',
      approach:
        'BugVision correlates MP4/WEBM screen recordings with component code using multimodal analysis (Gemini 3 Pro + Gemini 2.5 Flash). A Smart Code Editor enables on-the-fly inspection and live patching inside the tool, and "Sherlock Mode" adds an interactive chat for deep contextual queries into the codebase.',
      outcome:
        'The system automatically identifies visual anomalies and traces them to the underlying logic errors — bridging QA and engineering and drastically reducing time-to-resolution. Recognized as an award-winning Google DeepMind competition entry.',
    },
    features: [
      'Multimodal Analysis',
      'Smart Code Editor',
      'Sherlock Mode Chat',
      'Root Cause Identification',
      'Visual Bug Tracing'
    ]
  },
  {
    id: 'recruitai-platform',
    title: 'Recruit-AI Platform',
    timeframe: 'February 2026',
    summary: 'An Agent-First recruitment platform for SMBs powered by Agentic Orchestration. Acts as a Mission Control coordinating Task-Specific Agents to autonomously parse, evaluate, and rank candidate profiles.',
    bullets: [
      'Implements an Agentic workflow for autonomous resume parsing and continuous semantic JD matching, automating top-of-funnel screening.',
      'Provides a real-time analytics dashboard tracking Time-to-Hire and Screening Accuracy with actionable KPIs.',
      'Deploys user funnel analytics to actively monitor and reduce candidate drop-off rates.',
      'Utilizes advanced semantic search to intelligently match candidate capabilities with job descriptions — replacing rigid keyword matching.',
      'Reduces manual screening time by 20+ hours per week through autonomous ranking pipelines.'
    ],
    tech: [
      'React', 'TypeScript', 'Tailwind CSS', 'Supabase',
      'Gemini 2.5 Flash', 'n8n', 'Lovable'
    ],
    link: 'https://github.com/dhruvladani04/recruitaiplatform',
    prd: 'https://docs.google.com/document/d/1TO486UWCW7NqxEYCm3LrTeva7EdhocAIfpf9Cg470jg/edit?usp=sharing',
    caseStudy: {
      problem:
        'Recruiters at SMBs spend 20+ hours a week screening resumes by hand. The persona behind the product — "Sarah", a solo talent-acquisition manager at a 50–150 person company — gets 500+ applications within 24 hours of posting a remote role, driven by one-click apply and AI resume spam. She burns 3–4 hours a day reviewing PDFs; by the 50th resume, decision fatigue sets in and hidden gems get rejected. Screening 200 CVs takes ~5 days, while candidates wait 14 days for a response — or get ghosted.',
      approach:
        'An event-driven serverless agent (n8n + Gemini 2.5 Flash) replicates recruiter decision-making: webhook ingestion, OCR perception of the resume, then a gap analysis against the job description under a "Senior Talent Acquisition" persona, producing a weighted 0–100 score (40% skills, 30% experience, 30% soft skills) as schema-enforced JSON with summary, pros, and cons. The scoring prompt took three documented iterations — a chain-of-thought rubric finally caught nuances like "used React for 1 year" vs "Senior React Developer". When CORS and 15–20s AI latency broke the synchronous flow, the architecture pivoted to fire-and-forget: upload to Supabase Storage, process in the background, and push scores to the Kanban UI over Supabase Realtime, so the app feels instant. The split-screen candidate view came from user research: recruiters will not trust a black-box score unless the evidence sits beside it.',
      outcome:
        'Shipped as the Phase-1 "Screener" agent with a live demo and a full product paper trail — PRD, metrics & roadmap doc, and a process/decision log. Defined KPI targets: time-to-shortlist cut from 5 days to under 1 hour, interview conversion lifted from 15% to 40%+, and cost-per-hire pushed from the $4,700 industry average toward $500. The roadmap scales the same agent core into Coordinator (auto-scheduling), Hunter (autonomous sourcing), and Compliance (bias-audit) phases.',
    },
    features: [
      'Agentic Resume Parsing',
      'Candidate Ranking',
      'Analytics Dashboard',
      'Semantic JD Matching',
      'Retention Metrics'
    ]
  },
  {
    id: 'edgesynth',
    title: 'EdgeSynth',
    timeframe: 'March 2026',
    summary: 'An autonomous, Agent-First pipeline that fabricates structurally sound, adversarially diverse datasets for stress-testing AI models. Uses Mission Control to orchestrate Task-Specific Agents for rigorous pre-production validation.',
    bullets: [
      'Orchestrates a Multi-agent DAG (Schema, Fabrication, Adversarial, Validator) via Mission Control, establishing a scalable autonomous pipeline.',
      'Generates targeted adversarial scenarios including prompt injections and tool loops, proactively mitigating security vulnerabilities in AI products.',
      'Enforces bias-audited outputs with automated disparity analysis, driving ethical AI product development.',
      'Integrates LangSmith-tracked, versioned evaluation datasets into CI/CD pipelines for reliable model governance.',
      'Optimizes processing pipelines to accelerate development cycles by 10–20x.'
    ],
    tech: [
      'Python', 'LangGraph', 'LangChain', 'Gemini 2.5 Flash',
      'LangSmith', 'Streamlit', 'Pandas'
    ],
    link: 'https://github.com/dhruvladani04/EdgeSynth',
    features: [
      'Multi-agent DAG Pipeline',
      'Adversarial Data Generation',
      'Bias Auditing',
      'LangSmith Observability',
      'No-LLM Fallback Mode'
    ]
  },
  {
    id: 'gateguru',
    title: 'GateGuru',
    timeframe: 'February 2026',
    summary: 'An adaptive, AI-powered study mentor for GATE aspirants that personalizes the learning journey through real-time adjustments and proactive nudges.',
    bullets: [
      'Engineers a LangGraph-based orchestration engine for autonomous study plan generation with highly personalized, adaptive learning paths.',
      'Supports comprehensive 52-week adaptive study plans with continuous progress tracking.',
      'Implements a RAG pipeline with pgvector for intelligent resource retrieval from official GATE Portals and GateOverflow.',
      'Designs a proactive nudge workflow based on behavioral triggers to re-engage users and boost completion rates.',
    ],
    tech: [
      'Python', 'FastAPI', 'LangGraph', 'Google Gemini 2.0 Flash',
      'PostgreSQL', 'pgvector', 'Gemini Embeddings'
    ],
    link: 'https://github.com/dhruvladani04/GateGuru-',
    features: [
      'Agentic Study Planning',
      'Adaptive Update Loop',
      'Proactive Nudges',
      'RAG with pgvector',
      '52-Week Plans'
    ]
  },
  {
    id: 'nexus-ai',
    title: 'Nexus AI',
    timeframe: 'December 2025',
    summary: 'A production-grade, modular RAG application designed to handle complex information retrieval across diverse data formats using intelligent query routing.',
    bullets: [
      'Deploys a smart routing system distinguishing between Resume, Technical, and Web queries, ensuring highly accurate context-appropriate responses.',
      'Ingests diverse data streams including PDFs, YouTube videos, and general web pages, breaking down information silos.',
      'Utilizes a Planner Agent to generate structured learning plans with multi-source references.',
      'Orchestrates workflows using MongoDB Vector Search and LangGraph for enterprise-grade scalability.',
    ],
    tech: [
      'Python', 'Streamlit', 'MongoDB Vector Search', 'LangGraph',
      'Gemini 2.5 Flash', 'yt-dlp'
    ],
    link: 'https://github.com/dhruvladani04/nexus-ai',
    features: [
      'Smart Query Routing',
      'Multi-source Ingestion',
      'Planner Agent',
      'Vector Search',
      'LangGraph Orchestration'
    ]
  },
  {
    id: 'globetrotter',
    title: 'GlobeTrotter',
    timeframe: 'August 2025',
    summary: 'A full-stack travel booking platform that streamlines trip planning with dynamic content management, secure payments, and AI-driven advisory.',
    bullets: [
      'Engineers a two-stage blueprint-to-live lifecycle for dynamic trip creation, allowing seamless drafting, review, and publishing.',
      'Integrates an AI-powered travel chatbot with verified source citations for personalized, trustworthy recommendations.',
      'Implements secure OTP-based authentication with JWT sessions.',
      'Embeds the Razorpay payment gateway for frictionless online booking, driving revenue through smooth checkout.',
    ],
    tech: [
      'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL',
      'Razorpay', 'Google Gemini API', 'Tavily API', 'JWT'
    ],
    link: 'https://github.com/dhruvladani04/GlobeTrotter',
    features: [
      'Admin Content Management',
      'Dynamic Trip Creation',
      'Secure Payments',
      'AI Travel Chatbot',
      'User Dashboard'
    ]
  },
  {
    id: 'predictive-maintenance-dashboard',
    title: 'Predictive Maintenance Dashboard',
    timeframe: 'October 2025',
    summary: 'An end-to-end machine learning application that predicts critical machine failures in real-time, enabling proactive intervention in industrial settings.',
    bullets: [
      'Simulates live IoT sensor data (temperature, vibration) for real-time analysis, proving viability in dynamic real-world conditions.',
      'Deploys a LightGBM classification model to flag "FAILURE IMMINENT" states, minimizing costly unplanned downtime.',
      'Features a dynamic web dashboard for visualizing live data streams and predictions.',
      'Encompasses a complete ML pipeline from data engineering to model evaluation with automated event logging.',
    ],
    tech: [
      'Python', 'Flask', 'LightGBM', 'Tailwind CSS', 'Chart.js',
      'Pandas', 'Scikit-learn'
    ],
    link: 'https://github.com/dhruvladani04/Predictive-Maintenance-Dashboard',
    features: [
      'Real-time Data Simulation',
      'End-to-End ML Pipeline',
      'LightGBM Classifier',
      'Dynamic Web Dashboard',
      'Event Logging'
    ]
  },
  {
    id: 'medical-ai-assistant',
    title: 'Medical AI Assistant',
    timeframe: 'September 2025',
    summary: 'An AI-powered health assistant that democratizes access to complex medical information by analyzing reports and summarizing dense web articles.',
    bullets: [
      'Provides a multi-page interactive chat interface for health-related queries.',
      'Analyzes technical medical reports using Google Gemini AI, translating jargon into understandable insights.',
      'Summarizes relevant web articles via Tavily API for the most current synthesized context.',
      'Deployed scalably on Streamlit Community Cloud with secure API key management.',
    ],
    tech: [
      'Python', 'Streamlit', 'Google Gemini API', 'Tavily API',
      'Fitz', 'GenAI', 'Web Scraping'
    ],
    link: 'https://mental-ai-assistant.streamlit.app/AI_Chat_Assistant',
    features: [
      'Medical Report Analysis',
      'AI-Powered Q&A',
      'Web Article Summarization',
      'Multi-page Interface',
      'Secure Deployment'
    ]
  },
  {
    id: 'smart-job-prep',
    title: 'Smart Job Prep Assistant',
    timeframe: 'May 2025',
    summary: 'A comprehensive career optimization tool that maximizes candidate success by using AI to align resume bullet points directly with target job descriptions.',
    bullets: [
      'Powers resume rewriting with AI suggestions tailored to specific job postings, dramatically improving ATS pass rates.',
      'Integrates the STAR method framework for crafting consistent, high-impact experience narratives.',
      'Performs automated keyword analysis to highlight critical JD terminology.',
      'Features an interactive responsive UI powered by Framer Motion with JWT authentication.',
    ],
    tech: [
      'React.js', 'Node.js', 'Express', 'MongoDB',
      'Google Gemini API', 'Tailwind CSS', 'Framer Motion',
      'JWT', 'Zod'
    ],
    link: 'https://github.com/dhruvladani04/smart-job-prep-assistant',
    features: [
      'AI-Powered Resume Rewriting',
      'STAR Method Integration',
      'Keyword Analysis',
      'Interactive UI',
      'Secure Authentication'
    ]
  },
  {
    id: 'skill-sage-ai',
    title: 'Skill Sage AI Assistant',
    timeframe: 'July 2025',
    summary: 'An intelligent learning companion that accelerates professional development by creating personalized, actionable roadmaps based on user goals.',
    bullets: [
      'Conducts personalized skill assessments to generate tailored recommendations.',
      'Generates interactive learning roadmaps with step-by-step guidance.',
      'Curates targeted tutorials, documentation, and external resources, saving hours of research.',
    ],
    tech: [
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Google Gemini API', 'Marked.js',
      'Font Awesome', 'Responsive Design'
    ],
    link: 'https://skill-sage-ai-assistant.vercel.app/',
    features: [
      'Personalized Learning Paths',
      'Interactive Roadmap',
      'Resource Curation',
      'Progress Visualization'
    ]
  },
  {
    id: 'mental-fitness-journal',
    title: 'Mental Fitness Journal',
    timeframe: 'June 2025',
    summary: 'A secure, full-stack journaling application that helps users cultivate self-awareness by tracking mental health trends and analyzing emotional states.',
    bullets: [
      'Provides complete CRUD functionality with rich text support and mood tracking via visual Chart.js analytics.',
      'Leverages AI for automated emotion analysis of journal entries, delivering objective insights over time.',
      'Implements a secure JWT authentication system, guaranteeing privacy for highly personal data.',
    ],
    tech: [
      'React', 'Material-UI', 'Chart.js', 'Node.js',
      'Express', 'MongoDB', 'Mongoose', 'JWT'
    ],
    features: [
      'User Authentication',
      'Journal Entry Management',
      'Mood Tracking',
      'Data Visualization',
      'Secure Data Storage'
    ]
  },
  {
    id: 'cp-report-automation',
    title: 'AI Diary: Weekly Report Generator',
    timeframe: 'January 2026',
    summary: 'An AI-powered productivity tool that transforms unstructured daily logs and handwritten notes into formal, structured Weekly Progress Reports for university compliance.',
    bullets: [
      'Leverages Gemini Vision to digitize and structure handwritten diary photos, eliminating manual data entry.',
      'Features an analytics dashboard tracking productivity streaks and report readiness.',
      'Enables one-click PDF exports automatically formatted to university standards.',
    ],
    tech: [
      'Python', 'Streamlit', 'Google Gemini 3 Flash',
      'Gemini Vision', 'PDF Generation'
    ],
    link: 'https://github.com/dhruvladani04/cp_report_automation',
    features: [
      'Visual Entry (Gemini Vision)',
      'Analytics Dashboard',
      'Smart Editor',
      'One-Click PDF Export',
      'Dark Mode'
    ]
  }
];
