// Projects displayed on the portfolio with detailed information from READMEs

export const projects = [
  {
    id: 'smart-job-tracker',
    title: 'Smart Job Tracker',
    timeframe: 'April 2026',
    summary: 'An AI-powered job search pipeline with multi-source scraping, LLM-based candidate scoring, and feedback-driven calibration.',
    bullets: [
      'Aggregates 100+ job sources (LinkedIn, Indeed, etc.) via Apify API',
      '9-factor weighted scoring rubric with LLM-based evaluation using Gemini',
      'Feedback-driven calibration improving AI scoring accuracy (62% -> 87% correlation)',
      '3-tier deduplication system: URL -> composite key -> fuzzy match (~98% accuracy)',
      'Dual output with CLI reports and FastAPI web dashboard'
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
    summary: 'An autonomous multi-agent pipeline that fabricates structurally sound, adversarially diverse datasets for stress-testing AI agents before production data exists.',
    bullets: [
      'Multi-agent DAG with Schema, Fabrication, Adversarial, and Validator agents',
      'Generates adversarial scenarios: prompt injections, tool loops, boundary conditions',
      'Bias-audited outputs with disparity analysis for fairness evaluation',
      'LangSmith-tracked, versioned evaluation datasets with CI/CD integration',
      'Accelerates dev cycles 10-20x with up to 80% infrastructure cost reduction'
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
    summary: 'A dynamic tool for managing probabilistic AI systems using background agents to automate synthesis, prototyping, and testing for Product Managers.',
    bullets: [
      'Three-phase workflow: Discovery Hub, Technical Drafting Studio, and Eval Dashboard',
      'Synthetic dataset generation with 50 Commune transcripts for testing',
      'LangGraph-powered graph persistence with shared state utilities',
      'Dual UI: Streamlit for dashboards + Gradio for interactive drafting studio',
      'Gemini integration via LangChain with timeout/fallback protections'
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
    summary: 'An AI-powered, agentic study mentor for GATE CS/IT and DA aspirants with adaptive learning plans and proactive nudges.',
    bullets: [
      'LangGraph-based agentic orchestration with autonomous study plan generation',
      'Supports 52-week adaptive study plans with real-time progress tracking',
      'RAG-powered with pgvector for intelligent retrieval from GATE resources',
      'Proactive nudge workflow to keep students on track with their preparation',
      'Data ingested from official GATE Portal and GateOverflow resources'
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
    summary: 'An agentic AI recruitment platform for SMBs that autonomously parses resumes, matches candidates against job descriptions, and ranks them by fit.',
    bullets: [
      'Agentic workflow for autonomous resume parsing and JD matching',
      'Real-time analytics dashboard tracking Time-to-Hire and Screening Accuracy KPIs',
      'User funnel analytics to identify and reduce drop-off rates',
      'Semantic search for intelligent candidate-to-JD matching',
      'Reduces manual screening time from 20+ hours/week for recruiters'
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
    summary: 'An AI-powered application that transforms rough daily logs and handwritten notes into formal, university-ready Weekly Progress Reports using Gemini Vision.',
    bullets: [
      'Gemini Vision reads handwritten diary photos and converts them to structured data',
      'Analytics dashboard tracking productivity streaks and report readiness',
      'Smart editor with calendar-based date selection and AI-generated draft review',
      'One-click PDF export in exact university report format with auto-populated headers',
      'Premium UI with full Dark Mode support and persistent theme preferences'
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
    summary: 'A multi-agent AI system acting as a virtual Agile squad, collaborating to refine feature requests into comprehensive, estimated tickets.',
    bullets: [
      'Orchestrates a team of specialized AI agents (Product Owner, Tech Lead, SecOps, QA)',
      'Automated generic ticket refinement into detailed technical specifications',
      'Security-first approach with dedicated risk analysis and mitigation strategies',
      'Seamless JIRA integration for exporting refined tickets',
      'Powered by CrewAI and Gemini 2.5 Flash for intelligent collaboration'
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
    summary: 'An intelligent debugging assistant that uses multimodal AI to analyze screen recordings and code for rapid root cause identification.',
    bullets: [
      'Multimodal analysis correlating MP4/WEBM screen recordings with component code',
      'Smart Code Editor for on-the-fly code inspection and patching',
      '"Sherlock Mode" interactive chat for deep-dive debugging and queries',
      'Identifies visual anomalies and traces them back to logic errors',
      'Awarded Google DeepMind Competition Entry'
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
    summary: 'A production-grade, modular RAG application with intelligent query routing and multi-source data ingestion.',
    bullets: [
      'Smart routing system distinguishing between Resume, Technical, and Web queries',
      'Ingests data from PDFs, YouTube videos, and general web pages',
      'Planner Agent generates structured learning plans with multi-source references',
      'Powered by MongoDB Vector Search and LangGraph for orchestration',
      'Robust architecture for handling complex information retrieval tasks'
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
    summary: 'A complete, end-to-end machine learning web application that predicts machine failure in real-time by simulating IoT sensor data.',
    bullets: [
      'Simulates live IoT sensor data (temperature, vibration, etc.) for real-time analysis',
      'Uses LightGBM classification model to predict "HEALTHY" vs "FAILURE IMMINENT" states',
      'Dynamic web dashboard for visualizing live data streams and model predictions',
      'Comprehensive ML pipeline covering data engineering, EDA, training, and evaluation',
      'Automated event logging system for auditing critical failures'
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
    summary: 'An AI-powered health assistant that analyzes medical reports, answers health-related questions, and summarizes web articles using Google Gemini and Tavily API.',
    bullets: [
      'Multi-page health assistant with interactive chat interface',
      'Medical report analysis using Google Gemini AI',
      'Web article summarization with Tavily API integration',
      'Secure API key management with environment variables',
      'Deployed on Streamlit Community Cloud'
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
    summary: 'A full-stack travel booking platform with admin content management, secure payments via Razorpay, and an AI-powered chatbot for travel advice.',
    bullets: [
      'Dynamic trip creation with blueprint-to-live two-stage lifecycle management',
      'Secure OTP-based authentication with JWT sessions and email verification',
      'Integrated Razorpay payment gateway for seamless online booking',
      'AI-powered travel chatbot using Gemini AI and Tavily Search with source citations',
      'Comprehensive admin dashboard for managing locations, hotels, and activities'
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
    summary: 'An intelligent learning companion that creates personalized development roadmaps based on your skills and goals.',
    bullets: [
      'Personalized skill assessment with tailored recommendations',
      'Interactive learning roadmap with step-by-step guidance',
      'Curated list of tutorials, documentation, and learning resources',
      'Modern, responsive UI with smooth animations',
      'Progress tracking to visualize learning journey'
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
    summary: 'A full-stack journaling application designed to help users track their mental health and personal growth journey.',
    bullets: [
      'Complete CRUD operations for journal entries with rich text support',
      'Mood tracking with visual analytics using Chart.js',
      'AI-powered emotion analysis of journal entries',
      'Secure JWT authentication system',
      'Responsive design that works across all devices'
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
    summary: 'A comprehensive job preparation tool that helps users optimize their resume bullet points using AI-powered suggestions based on job descriptions.',
    bullets: [
      'AI-powered resume rewriting with tailored suggestions based on job descriptions',
      'STAR method integration for crafting compelling work experience stories',
      'Keyword analysis to identify and highlight important terms from job postings',
      'Interactive and responsive UI with smooth animations using Framer Motion',
      'Secure user authentication with JWT and data persistence'
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
]
