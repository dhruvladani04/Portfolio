// Projects displayed on the portfolio with detailed information from READMEs

export const projects = [
  {
    id: 'smart-job-tracker',
    title: 'Smart Job Tracker',
    timeframe: 'April 2026',
    summary: 'An AI-powered job search pipeline that automates lead generation and evaluation. It solves the fragmentation of job boards by aggregating sources, scoring leads via LLMs, and refining accuracy through feedback loops.',
    bullets: [
      'Aggregates 100+ job sources via Apify API. Product Impact: Centralizes fragmented job market data into a single, reliable source of truth.',
      'Applies a 9-factor weighted scoring rubric evaluated by Gemini. Product Impact: Standardizes evaluation with objective, data-driven metrics.',
      'Implements a feedback-driven calibration loop for AI scoring. Product Impact: Continuously improves system reliability, boosting scoring correlation from 62% to 87%.',
      'Deploys a 3-tier deduplication system (URL, composite key, fuzzy match). Product Impact: Ensures high data integrity (~98% accuracy) for end-users.',
      'Provides dual output options with CLI reports and a FastAPI dashboard. Product Impact: Accommodates diverse user preferences with flexible, accessible interfaces.'
    ],
    tech: [
      'Python', 'FastAPI', 'Apify API', 'Google Gemini',
      'SQLite', 'SQLAlchemy', 'Docker', 'asyncio'
    ],
    link: 'https://github.com/dhruvladani04/smart-job-tracker',
    features: [
      'Multi-source Aggregation',
      'LLM-based Scoring',
      'Feedback Calibration',
      'Priority Ranking',
      'CLI + Web Dashboard'
    ]
  },
  {
    id: 'edgesynth',
    title: 'EdgeSynth',
    timeframe: 'March 2026',
    summary: 'An autonomous, Agent-First pipeline that fabricates structurally sound, adversarially diverse datasets for stress-testing AI models. Architected around the Antigravity philosophy, it uses a central Mission Control to orchestrate Task-Specific Agents for rigorous pre-production validation.',
    bullets: [
      'Orchestrates a Multi-agent DAG (Schema, Fabrication, Adversarial, Validator) via Mission Control. Product Impact: Establishes a scalable, autonomous pipeline for generating complex data structures.',
      'Generates targeted adversarial scenarios including prompt injections and tool loops. Product Impact: Proactively mitigates security vulnerabilities and improves the robustness of downstream AI products.',
      'Enforces bias-audited outputs with automated disparity analysis. Product Impact: Drives ethical AI product development by systematically evaluating and addressing fairness metrics.',
      'Integrates LangSmith-tracked, versioned evaluation datasets into CI/CD pipelines. Product Impact: Creates reliable verification artifacts that standardize performance tracking and model governance.',
      'Optimizes processing pipelines to accelerate development cycles by 10-20x. Product Impact: Dramatically reduces time-to-market and infrastructure costs, enabling faster product iterations.'
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
    id: 'ai-pm-copilot',
    title: 'AI PM Co-pilot',
    timeframe: 'March 2026',
    summary: 'A dynamic utility designed for Product Managers to manage probabilistic AI systems. It leverages background agents to automate the synthesis, prototyping, and testing of new features.',
    bullets: [
      'Architects a three-phase workflow: Discovery Hub, Technical Drafting Studio, and Eval Dashboard. Product Impact: Streamlines the entire product lifecycle from ideation to evaluation.',
      'Automates synthetic dataset generation using 50 Commune transcripts. Product Impact: Accelerates testing phases by providing immediate, relevant test data without manual collection.',
      'Utilizes LangGraph-powered persistence with shared state utilities. Product Impact: Ensures consistent context and reliability across complex, multi-step AI workflows.',
      'Develops a dual UI with Streamlit for dashboards and Gradio for interactive drafting. Product Impact: Optimizes the user experience by matching the right interface to the specific PM task.',
      'Integrates Gemini via LangChain with timeout and fallback protections. Product Impact: Delivers a resilient product experience by gracefully handling API failures and latency.'
    ],
    tech: [
      'Python', 'LangGraph', 'LangChain', 'Streamlit',
      'Gradio', 'Gemini 2.5 Flash', 'NetworkX', 'Pandas'
    ],
    link: 'https://github.com/dhruvladani04/AI_PM-Co-pilot',
    features: [
      'Discovery Hub',
      'Technical Drafting Studio',
      'Eval & Governance Dashboard',
      'Graph Visualization',
      'LangSmith Telemetry'
    ]
  },
  {
    id: 'gateguru',
    title: 'GateGuru',
    timeframe: 'February 2026',
    summary: 'An adaptive, AI-powered study mentor for GATE aspirants that personalizes the learning journey through real-time adjustments and proactive nudges.',
    bullets: [
      'Engineers a LangGraph-based orchestration engine for autonomous study plan generation. Product Impact: Delivers highly personalized, adaptive learning paths for each user.',
      'Supports comprehensive 52-week adaptive study plans with continuous progress tracking. Product Impact: Enhances user retention by dynamically adjusting to individual learning paces.',
      'Implements a RAG pipeline with pgvector for intelligent resource retrieval. Product Impact: Ensures high-quality, relevant educational content is surfaced instantly to the user.',
      'Designs a proactive nudge workflow based on behavioral triggers. Product Impact: Actively re-engages users and keeps them on track, boosting completion rates.',
      'Ingests domain-specific data from official GATE Portals and GateOverflow. Product Impact: Builds user trust by anchoring AI responses in authoritative, accurate source material.'
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
    id: 'recruitai-platform',
    title: 'Recruit-AI Platform',
    timeframe: 'February 2026',
    summary: 'An Agent-First recruitment platform for SMBs powered by Agentic Orchestration. The platform acts as a Mission Control, coordinating Task-Specific Agents to autonomously parse, evaluate, and rank candidate profiles against dynamic job requirements.',
    bullets: [
      'Implements an Agentic workflow for autonomous resume parsing and continuous semantic JD matching. Product Impact: Automates top-of-funnel screening, freeing recruiters to focus on strategic hiring initiatives.',
      'Provides a real-time analytics dashboard tracking Time-to-Hire and Screening Accuracy. Product Impact: Empowers hiring managers with actionable KPIs to optimize the recruitment lifecycle.',
      'Deploys user funnel analytics to actively monitor and reduce candidate drop-off rates. Product Impact: Enhances the applicant experience, improving overall candidate conversion and retention.',
      'Utilizes advanced semantic search to intelligently match candidate capabilities with job descriptions. Product Impact: Increases the quality of hires by replacing rigid keyword matching with nuanced contextual evaluation.',
      'Replaces manual evaluation processes with an autonomous ranking pipeline. Product Impact: Delivers immediate operational ROI by reducing manual screening time by 20+ hours per week.'
    ],
    tech: [
      'React', 'TypeScript', 'Tailwind CSS', 'Supabase',
      'OpenAI GPT-4o', 'Lovable'
    ],
    link: 'https://github.com/dhruvladani04/recruitaiplatform',
    features: [
      'Agentic Resume Parsing',
      'Candidate Ranking',
      'Analytics Dashboard',
      'Semantic JD Matching',
      'Retention Metrics'
    ]
  },
  {
    id: 'cp-report-automation',
    title: 'AI Diary: Weekly Report Generator',
    timeframe: 'January 2026',
    summary: 'An AI-powered productivity tool that transforms unstructured daily logs and handwritten notes into formal, structured Weekly Progress Reports for university compliance.',
    bullets: [
      'Leverages Gemini Vision to digitize and structure handwritten diary photos. Product Impact: Eliminates manual data entry, saving users significant administrative time.',
      'Features an analytics dashboard tracking productivity streaks and report readiness. Product Impact: Gamifies the reporting process, encouraging consistent user engagement.',
      'Incorporates a smart editor with AI-generated draft review capabilities. Product Impact: Ensures high-quality, professional outputs with minimal user friction.',
      'Enables one-click PDF exports automatically formatted to university standards. Product Impact: Streamlines the final delivery process, reducing compliance overhead to zero.',
      'Delivers a premium UI with persistent theme preferences and Dark Mode. Product Impact: Enhances overall user satisfaction and accessibility during extended usage.'
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
  },
  {
    id: 'agile-sprint-guardian',
    title: 'Agile Sprint Guardian',
    timeframe: 'December 2025',
    summary: 'A multi-agent system that simulates an Agile squad to autonomously refine feature requests into comprehensive, estimated tickets, streamlining the product planning phase.',
    bullets: [
      'Orchestrates specialized AI agents (Product Owner, Tech Lead, SecOps, QA). Product Impact: Simulates cross-functional collaboration to produce well-rounded, thoroughly vetted tickets.',
      'Automates the translation of generic requests into detailed technical specifications. Product Impact: Reduces ambiguity for engineering teams, leading to more accurate sprint planning.',
      'Integrates a security-first approach with dedicated risk analysis agents. Product Impact: Proactively identifies and mitigates security risks before development begins.',
      'Provides seamless JIRA integration for direct export of refined tickets. Product Impact: Integrates smoothly into existing enterprise workflows without disrupting current tools.',
      'Powered by CrewAI and Gemini 2.5 Flash for intelligent, contextual collaboration. Product Impact: Ensures high-quality, context-aware outputs that rival human PM refinement.'
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
    summary: 'An intelligent debugging assistant that leverages multimodal AI to accelerate root cause identification by analyzing screen recordings alongside source code.',
    bullets: [
      'Correlates MP4/WEBM screen recordings with component code using multimodal analysis. Product Impact: Drastically reduces time-to-resolution for complex, visually-manifesting bugs.',
      'Features a Smart Code Editor for on-the-fly code inspection and live patching. Product Impact: Creates a seamless, integrated debugging environment that keeps developers in flow.',
      'Includes a "Sherlock Mode" interactive chat for deep-dive contextual queries. Product Impact: Empowers developers to intuitively explore complex codebases and edge cases.',
      'Automatically identifies visual anomalies and traces them to underlying logic errors. Product Impact: Bridges the gap between QA observations and engineering fixes.',
      'Recognized as an award-winning Google DeepMind Competition Entry. Product Impact: Validates the innovative approach and market potential of the solution.'
    ],
    tech: [
      'TypeScript', 'React', 'Vite', 'Prismjs',
      'Gemini 3 Pro', 'Gemini 2.5 Flash'
    ],
    link: 'https://github.com/dhruvladani04/BugVision-AI',
    features: [
      'Multimodal Analysis',
      'Smart Code Editor',
      'Sherlock Mode Chat',
      'Root Cause Identification',
      'Visual Bug Tracing'
    ]
  },
  {
    id: 'nexus-ai',
    title: 'Nexus AI',
    timeframe: 'December 2025',
    summary: 'A production-grade, modular RAG application designed to handle complex information retrieval across diverse data formats using intelligent query routing.',
    bullets: [
      'Deploys a smart routing system distinguishing between Resume, Technical, and Web queries. Product Impact: Ensures users receive highly accurate, context-appropriate responses instantly.',
      'Ingests diverse data streams including PDFs, YouTube videos, and general web pages. Product Impact: Breaks down information silos, creating a unified, accessible knowledge base.',
      'Utilizes a Planner Agent to generate structured learning plans with multi-source references. Product Impact: Transforms raw data into actionable, educational roadmaps for users.',
      'Orchestrates workflows using MongoDB Vector Search and LangGraph. Product Impact: Delivers enterprise-grade scalability and reliability for complex retrieval tasks.',
      'Maintains a robust architecture capable of handling ambiguous user inputs. Product Impact: Enhances user trust through consistent, high-quality performance in varied scenarios.'
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
    id: 'predictive-maintenance-dashboard',
    title: 'Predictive Maintenance Dashboard',
    timeframe: 'October 2025',
    summary: 'An end-to-end machine learning application that predicts critical machine failures in real-time, enabling proactive intervention in industrial settings.',
    bullets: [
      'Simulates live IoT sensor data (temperature, vibration) for real-time analysis. Product Impact: Proves the viability of the predictive model in dynamic, real-world conditions.',
      'Deploys a LightGBM classification model to flag "FAILURE IMMINENT" states. Product Impact: Minimizes costly unplanned downtime through early warning detection.',
      'Features a dynamic web dashboard for visualizing live data streams and predictions. Product Impact: Translates complex ML outputs into actionable insights for operational teams.',
      'Encompasses a complete ML pipeline from data engineering to model evaluation. Product Impact: Ensures robust, reproducible, and easily maintainable AI infrastructure.',
      'Integrates an automated event logging system for critical failures. Product Impact: Facilitates post-incident audits and continuous model improvement.'
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
      'Provides a multi-page interactive chat interface for health-related queries. Product Impact: Offers users an intuitive, conversational way to navigate health information.',
      'Analyzes technical medical reports using Google Gemini AI. Product Impact: Empowers patients by translating complex medical jargon into understandable insights.',
      'Summarizes relevant web articles via Tavily API integration. Product Impact: Ensures users receive the most current, synthesized context for their health questions.',
      'Implements secure API key management and environment variables. Product Impact: Guarantees data security and privacy compliance in a sensitive domain.',
      'Deployed scalably on Streamlit Community Cloud. Product Impact: Achieves high availability with a lean, efficient deployment architecture.'
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
    id: 'globetrotter',
    title: 'GlobeTrotter',
    timeframe: 'August 2025',
    summary: 'A full-stack travel booking platform that streamlines the trip planning experience with dynamic content management, secure payments, and AI-driven advisory.',
    bullets: [
      'Engineers a two-stage blueprint-to-live lifecycle for dynamic trip creation. Product Impact: Allows content managers to seamlessly draft, review, and publish new offerings.',
      'Integrates an AI-powered travel chatbot with verified source citations. Product Impact: Elevates the user experience by providing personalized, trustworthy travel recommendations.',
      'Implements secure OTP-based authentication with JWT sessions. Product Impact: Reduces login friction while maintaining robust user account security.',
      'Embeds the Razorpay payment gateway for frictionless online booking. Product Impact: Drives revenue by ensuring a smooth, secure checkout experience for customers.',
      'Delivers a comprehensive admin dashboard for holistic platform management. Product Impact: Empowers business operators to efficiently manage inventory and monitor platform health.'
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
    id: 'skill-sage-ai',
    title: 'Skill Sage AI Assistant',
    timeframe: 'July 2025',
    summary: 'An intelligent learning companion that accelerates professional development by creating personalized, actionable roadmaps based on user goals.',
    bullets: [
      'Conducts personalized skill assessments to generate tailored recommendations. Product Impact: Customizes the onboarding experience to immediately deliver relevant value.',
      'Generates interactive learning roadmaps with step-by-step guidance. Product Impact: Reduces user overwhelm by breaking complex goals into manageable milestones.',
      'Curates targeted tutorials, documentation, and external resources. Product Impact: Saves users hours of research time, keeping them focused on actual learning.',
      'Features a modern, responsive UI with smooth interactive animations. Product Impact: Enhances user engagement and satisfaction through premium design aesthetics.',
      'Incorporates visual progress tracking for the user\'s learning journey. Product Impact: Motivates users through clear visualizations of their advancement and achievements.'
    ],
    tech: [
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Google Gemini API', 'Marked.js',
      'Responsive Design', 'Font Awesome', 'Modern CSS'
    ],
    link: 'https://skill-sage-ai-assistant.vercel.app/',
    features: [
      'Personalized Learning Paths',
      'Interactive Roadmap',
      'Resource Curation',
      'Responsive Design',
      'Progress Visualization'
    ]
  },
  {
    id: 'mental-fitness-journal',
    title: 'Mental Fitness Journal',
    timeframe: 'June 2025',
    summary: 'A secure, full-stack journaling application that helps users cultivate self-awareness by tracking mental health trends and analyzing emotional states.',
    bullets: [
      'Provides complete CRUD functionality with rich text support for entries. Product Impact: Offers users a flexible, expressive environment for their daily reflections.',
      'Integrates mood tracking with visual analytics via Chart.js. Product Impact: Empowers users to easily identify patterns and triggers in their mental well-being.',
      'Leverages AI for automated emotion analysis of journal entries. Product Impact: Delivers deep, objective insights into the user\'s underlying emotional state over time.',
      'Implements a secure JWT authentication system. Product Impact: Builds critical user trust by guaranteeing the privacy and security of highly personal data.',
      'Ensures a fully responsive design across all devices. Product Impact: Increases daily active usage by allowing users to journal conveniently from anywhere.'
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
      'Responsive Design',
      'Secure Data Storage'
    ]
  },
  {
    id: 'smart-job-prep',
    title: 'Smart Job Prep Assistant',
    timeframe: 'May 2025',
    summary: 'A comprehensive career optimization tool that maximizes candidate success by using AI to align resume bullet points directly with target job descriptions.',
    bullets: [
      'Powers resume rewriting with AI suggestions tailored to specific job postings. Product Impact: Drastically improves ATS pass rates and recruiter callback metrics.',
      'Integrates the STAR method framework for crafting experience narratives. Product Impact: Guides users to produce consistently high-impact, results-oriented content.',
      'Performs automated keyword analysis to highlight critical JD terminology. Product Impact: Ensures candidate profiles are perfectly aligned with employer expectations.',
      'Features an interactive, responsive UI powered by Framer Motion. Product Impact: Delivers a seamless, engaging user experience during a typically stressful process.',
      'Secures user sessions and data persistence with robust JWT authentication. Product Impact: Maintains the confidentiality of sensitive career and personal information.'
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
      'Responsive Design',
      'Secure Authentication'
    ]
  }
];
