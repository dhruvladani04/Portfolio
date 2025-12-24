// Projects displayed on the portfolio with detailed information from READMEs

export const projects = [
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
  }
]
