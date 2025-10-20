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
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Google Gemini API','Marked.js',
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
  }
]
