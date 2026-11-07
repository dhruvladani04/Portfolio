// Recorded briefs, read in J.A.R.V.I.S.'s voice. scripts/agent/tts.mjs turns
// each text into public/audio/briefs/<id>.mp3 and records it in
// src/data/brief-audio.json — the site only shows a player for briefs that
// have audio. Written for the ear: ~150 words ≈ 60 s, ~75 words ≈ 30 s.
// Every claim must match src/data/projects.js (no unmeasured numbers).

export const BRIEFS = {
  overview: {
    title: '60-second brief',
    text:
      "Dhruv Ladani is an AI and ML engineer at Impresa.ai Consulting in Ahmedabad, where he builds data pipelines, machine-learning models and GenAI prototypes for client work, and is currently on an agentic AI project. " +
      "What sets him apart is that he thinks like a product manager. He starts from the user's problem, defines how success will be measured, and ships systems with real evaluation numbers, not just demos. " +
      "Two examples. Tollgate, a safety checkpoint for AI agents, caught 96.3 percent of risky tool calls in about a third of a second. His Agentic Compliance Auditor backs 98.9 percent of its citations with the source. " +
      "He has published two IEEE research papers and is a five-star coder on CodeChef. " +
      "He's looking for forward-deployed engineer, client-facing AI engineer, or AI product roles. Whether you're hiring, building something of your own, or just starting out, ask me anything about his work and how he got here.",
  },
  tollgate: {
    title: 'Tollgate in 30 seconds',
    projectId: 'tollgate',
    text:
      "Tollgate is a checkpoint for AI agents that call real tools. It sits between the agent and its tools as an MCP proxy, and for every call decides: allow it, hold it for a person, or block it. " +
      "Fast exact checks run first, then a small judgment model answers a few questions about the risk. " +
      "On 229 held-out calls it caught 96.3 percent of risky calls in a median 321 milliseconds, about twelve times faster and sixty times cheaper than asking Gemini every time.",
  },
  'llm-atlas': {
    title: 'LLM Atlas in 30 seconds',
    projectId: 'llm-atlas',
    text:
      "LLM Atlas is a model leaderboard that tells developers not just who scored highest, but whether the benchmark still means anything. " +
      "Every score is joined to its benchmark's health, so saturated or contaminated benchmarks are flagged, and each number is labelled vendor-reported or independent. " +
      "It refreshes daily from five sources, and side-by-side comparisons only use benchmarks every compared model was actually measured on. Built with Next.js, TypeScript and GitHub Actions.",
  },
  'smart-job-tracker': {
    title: 'Smart Job Tracker in 30 seconds',
    projectId: 'smart-job-tracker',
    text:
      "Smart Job Tracker is the pipeline Dhruv built for his own job search. It pulls listings from more than a hundred sources, removes duplicates, and has Gemini score every lead against a nine-factor rubric. " +
      "A feedback loop raised agreement between his ratings and the AI's from 62 to 87 percent. " +
      "It processed 1,247 jobs and led to eight interviews and two offers. Built with Python, FastAPI and Gemini.",
  },
  'agentic-compliance-auditor': {
    title: 'Agentic Compliance Auditor in 30 seconds',
    projectId: 'agentic-compliance-auditor',
    text:
      "The Agentic Compliance Auditor answers detailed questions about dense policy documents, with citations an analyst can check. " +
      "It's a self-correcting retrieval pipeline built on LangGraph and Gemini, with a four-layer evaluation harness behind it. " +
      "On a 25-question golden set that includes adversarial and unanswerable questions, 98.9 percent of its citations are supported by their source. " +
      "The same evals exposed its weak spots, like a reranker that hurt recall, so the next fixes are already known.",
  },
  feedbackiq: {
    title: 'FeedbackIQ in 30 seconds',
    projectId: 'feedbackiq',
    text:
      "FeedbackIQ turns feedback scattered across Slack, support exports and documents into one weekly brief for product managers. " +
      "A five-agent LangGraph pipeline does the triage, and every quote in the brief is copied word for word from its source and re-checked before it ships; anything that doesn't match is flagged for a human. " +
      "It's a proof of concept with a production-shaped architecture that runs end to end, even offline, until real API keys are added.",
  },
  'recruitai-platform': {
    title: 'Recruit-AI in 30 seconds',
    projectId: 'recruitai-platform',
    text:
      "Recruit-AI helps small-business recruiters who screen hundreds of resumes by hand. Its first agent, the Screener, parses, scores and ranks candidates, with a reasoning trace behind every score. " +
      "Dhruv shipped it with a live demo and a full product paper trail: a PRD, a metrics and roadmap document, and a decision log, with KPI targets such as cutting time-to-shortlist from five days to under an hour. " +
      "Built with React, Supabase, Gemini and n8n.",
  },
};

export const briefForProject = (projectId) =>
  Object.entries(BRIEFS).find(([, b]) => b.projectId === projectId)?.[0] || null;
