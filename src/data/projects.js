// Projects — ordered to highlight AI/ML + Product Management intersection first
// Optional fields: linkNote (string) — shown instead of a "Launch Project"
// button when `link` is absent, so a missing link reads as an explained
// choice rather than silence. pmArtifact ({ metrics, experiment?, cut? }) —
// an optional "Product Process" block rendered after the case study/stack,
// showing the success metrics chosen (and, where available, an experiment
// run and what got cut). Both are real content only, never fabricated.
export const projects = [
  {
    id: 'tollgate',
    title: 'Tollgate',
    timeframe: 'October 2026',
    role: ['AI/ML'],
    stack: ['Agentic AI', 'Backend'],
    featured: false,
    summary: 'Teams letting AI agents call real tools get a checkpoint in front of every call — an MCP proxy that allows, holds for a person, or blocks each tool call and scans what tools return for planted instructions. On 229 held-out calls it caught 96.3% of risky calls in a median 321 ms, about 12x faster and 60x cheaper than asking Gemini on every call.',
    bullets: [
      'Sits between any MCP client (Claude Code, Cursor, a LangGraph agent) and its upstream MCP servers, so gating needs no change to the agent itself.',
      'Runs exact checks first — deny lists, secret patterns, out-of-sandbox paths — so a secret never reaches the model, then asks a small judgment model (Jev) up to four questions about risk, data loss, intent, and exfiltration.',
      'Holds calls the user never asked for sooner than requested ones, by passing the user\'s request alongside each call.',
      'Fails closed: if the model is slow or down, the call is held for a person — nothing runs by default.',
      'Scans tool results for instructions aimed at the agent and withholds them, recording every decision in a local audit log with a dashboard for answering held calls.'
    ],
    tech: [
      'Python', 'Model Context Protocol', 'Jev (TypeSafe)', 'LangGraph',
      'Gemini', 'uv', 'pytest'
    ],
    link: 'https://github.com/dhruvladani04/tollgate',
    caseStudy: {
      problem:
        'An agent with tool access can delete files, leak data, or follow instructions planted in a page it just read. Asking a person about every call defeats the point of an agent, and asking a general LLM to judge every call adds seconds and real cost to each step.',
      approach:
        'Built an MCP proxy that judges each call in three stages: deterministic exact checks, then a fast judgment model (Jev) answering up to four questions about the call, then thresholds in a policy file that map those answers to allow, ask, or block — with uncertain answers sent to a person, or optionally a second model. Framed the build as an experiment: can a small, fast judgment model gate tool calls as well as a general LLM, for much less? Thresholds were tuned on one set and measured on 229 labelled calls held back from tuning, plus a second set derived from the InjecAgent benchmark.',
      outcome:
        'Jev caught 96.3% of risky calls versus 91.1% for Gemini 3.8 Flash judging every call, at a median 321 ms versus 4.0 s, and $0.022 versus $1.31 per 1,000 calls. The trade-offs are documented rather than hidden: Jev is unsure more often, so a person is asked about roughly four calls in ten, and the test calls were written for the project, so the numbers are likely optimistic against real traffic.',
    },
    pmArtifact: {
      metrics:
        'Every configuration is scored on four numbers together — risky calls caught, benign calls held, calls a person is asked about, and median latency and cost per 1,000 calls — on 229 labelled calls kept out of tuning.',
      experiment:
        'Tried sending calls Jev was unsure about to a second model (Gemini 3.8 Flash or Gemma 4 31B) before asking a person. It cut the share of calls a person is asked about from 41.5% to about 31% — but fewer risky calls were caught, because some of the calls Jev was unsure about were risky and the second model let them through.',
      cut:
        'Shipped a policy with only the two "ask" thresholds tuned instead of the fully tuned set. The fully tuned set blocks more, but on the InjecAgent-derived set only 62.8% of the calls it blocked were truly malicious, against 100% for the shipped policy — and a blocked call cannot be approved by a person. Second-model escalation also ships off by default.',
    },
    features: [
      'Allow / Ask / Block Gating',
      'Fail-Closed by Default',
      'Tool-Result Injection Scan',
      'Audit Log + Dashboard',
      'Held-Out Evaluation'
    ]
  },
  {
    id: 'llm-atlas',
    title: 'LLM Atlas',
    timeframe: 'September 2026',
    role: ['Product/PM', 'Full-Stack'],
    stack: ['Frontend', 'Data/ML'],
    featured: false,
    summary: 'Developers choosing a model get a leaderboard that says not just who scored highest, but whether the benchmark still means anything and who reported the number — every score joined to its benchmark\'s health and labelled vendor-reported or independent, refreshed daily from five sources.',
    bullets: [
      'Joins every score to the benchmark that produced it and computes health flags from that join — saturated, deprecated, high-contamination, vendor-reported-only, disputed — instead of curating them by hand.',
      'Runs a daily GitHub Actions pipeline over five upstream sources that validates every payload with Zod and keeps the last good snapshot when a source fails or returns under half its previous records.',
      'Resolves model and benchmark names by exact match, alias, then normalisation — never fuzzy matching — so a near-miss queues for review instead of crediting the wrong model.',
      'Prices models from vendor pricing pages where the price is unambiguous, and labels OpenRouter\'s routed price as such everywhere else.',
      'Replaced a 444KB per-row leaderboard payload with a normalised table-plus-lookup shape, lifting mobile Lighthouse performance from 65–83 to 81–100.'
    ],
    tech: [
      'Next.js 16', 'TypeScript', 'React 19', 'Zod',
      'Tailwind CSS', 'GitHub Actions', 'Vitest', 'Playwright'
    ],
    link: 'https://lllm-atlas.vercel.app/',
    caseStudy: {
      problem:
        'Public LLM leaderboards mix scores from benchmarks that have quietly saturated or been contaminated, put vendor-reported numbers beside independent ones with no distinction, and mix list prices with router markups — with no way to tell which is which from the page.',
      approach:
        'Made a deliberately narrow product bet: not the most complete leaderboard, but the one that tells you when a number stops being trustworthy. Three rules are enforced in code, not prose — every score is joined to its benchmark, every row carries a provenance label, and a missing value never renders as a blank, dash, or zero. The site is static-first with no database: a scheduled job is the only thing that touches the internet, it commits dated snapshots to git, and that commit triggers the deploy, so every upstream change is a reviewable diff.',
      outcome:
        'A live leaderboard across text, agentic, and image-generation models, with a benchmark health matrix, side-by-side comparison restricted to benchmarks every compared model was measured on, an evals guide for application teams, and JSON/CSV exports that carry their own per-source licensing.',
    },
    pmArtifact: {
      metrics:
        'Success is defined as three rules checked against a written definition of done — every score joined to its benchmark, a provenance label on every row, and no missing value ever rendered as a blank, dash, or zero.',
      cut:
        'Excluded the most complete single data source (Artificial Analysis) because its free tier does not grant redistribution rights; left DeepSeek prices absent rather than picking one of its peak/off-peak and cache-hit/miss numbers; and dropped a planned "Biggest mover" card because no source provides a real score history to compute it from.',
    },
    features: [
      'Benchmark Health Flags',
      'Provenance on Every Score',
      'Daily Static Data Pipeline',
      'Model Compare',
      'JSON / CSV Export'
    ]
  },
  {
    id: 'news-digest',
    title: 'Daily News Digest',
    timeframe: 'August 2026',
    role: ['Full-Stack'],
    stack: ['Backend', 'Frontend'],
    featured: false,
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
    role: ['AI/ML', 'Full-Stack'],
    stack: ['Mobile'],
    featured: false,
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
    role: ['AI/ML'],
    stack: ['Agentic AI', 'Backend'],
    featured: false,
    summary: 'Compliance analysts auditing dense policy documents get cited answers they can check instead of a black-box chatbot — a self-correcting CRAG + Self-RAG pipeline backed by a four-layer evaluation harness, where 98.9% of citations are supported by their source on a 25-question golden set that includes adversarial and unanswerable questions.',
    bullets: [
      'Orchestrates a four-node LangGraph workflow that retrieves, grades, rewrites, and generates compliance answers with configurable retry protection.',
      'Retrieves with hybrid BM25 + dense search fused by Reciprocal Rank Fusion over parent-child chunks, from Markdown, text, PDF, and Word policies.',
      'Scores four layers separately — retrieval (per retriever arm), generation (Ragas), citation trust, and latency/cost — with a CI regression gate, so a bad answer can be traced to the stage that caused it.',
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
        'Compliance analysts need precise, defensible answers from dense policy documents — a standard RAG chatbot can retrieve weak context or generate an ungrounded conclusion, with no way to tell which one happened.',
      approach:
        'Built a self-correcting CRAG + Self-RAG workflow: a four-node LangGraph pipeline grades every retrieved document for relevance, rewrites the query when context is weak, falls back to web search once retries are exhausted, and grades its own generated answer for grounding before returning it. Retrieval fuses BM25 and dense vectors with Reciprocal Rank Fusion. The evaluation harness scores retrieval, generation, citation trust, and system cost as separate layers over a golden set spanning eight question categories — including unanswerable and adversarial prompts — because a suite of easy lookups reports a healthy score for a system that fails in production.',
      outcome:
        'On the current 25-question golden set, 98.9% of citations are supported by their source, Context Precision is 0.93 and Precision@1 is 0.85, and no answer ships past its grader. The same harness surfaced what to fix next: a hard 3-document cap holding recall at 0.62, a FlashRank reranker that trades recall for almost no ranking gain, and a web-search fallback that can answer an out-of-scope question from the open internet.',
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
    role: ['AI/ML', 'Product/PM'],
    stack: ['Agentic AI', 'Backend'],
    featured: false,
    summary: 'PMs who spend hours each week triaging feedback scattered across Slack, support exports, and documents get a weekly, citation-verified brief instead — a 5-agent LangGraph pipeline where every quote is copied verbatim from source and independently re-verified before it ships.',
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
        'PMs spend hours each week triaging product feedback scattered across Slack, support exports, and documents — and a synthesized brief is only useful if stakeholders can trust every quote in it.',
      approach:
        'Designed a 5-agent LangGraph state machine — preprocess (PII redaction), classify, deduplicate (embedding cosine similarity ≥0.92), prioritize, synthesize — with a self-looping retry edge on synthesis. The anti-hallucination guarantee is structural, not a prompt: every brief quote is copied verbatim from the source, then independently re-verified against the corpus (difflib similarity ≥0.95); a failed check retries with a stricter prompt or drops the quote and flags the brief for human review. Slack ingestion runs live over MCP; Google Drive ingestion was deliberately parked after research showed no available connector could scope to a single folder — indexing an entire Drive is a privacy problem, not just noise.',
      outcome:
        'Ships as a proof-of-concept with a production-shaped architecture — the real pipeline, persistence, scheduling, and quote-verification pass all run end-to-end; only the external model and connector calls fall back to deterministic mocks, so the whole system runs offline with zero credentials and flips to live calls with no code change once a key is added.',
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
    role: ['AI/ML', 'Full-Stack'],
    stack: ['Agentic AI', 'Frontend'],
    featured: false,
    summary: 'Knowledge workers who need trustworthy answers from long internal PDFs get every response with the source page number and a relevance score attached — a multi-agent RAG system built on LangGraph orchestration and an event-driven cloud ingestion pipeline.',
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
        'Long internal PDFs bury the answer a knowledge worker needs, and a typical chatbot response gives no way to verify it — no page reference, no way back to the source.',
      approach:
        'Built a supervisor-led multi-agent architecture in LangGraph: a Retrieval agent queries Qdrant and reranks results, a Web Search agent grounds answers via Gemini when the documents don’t have it, and every response carries the source PDF name, page number, and a relevance score. Wired an event-driven ingestion pipeline (upload → GCS → Pub/Sub → chunk → embed → Qdrant) that splits documents into 512-token chunks with 50-token overlap and retrieves the top 5 highest-scoring chunks per query, with health checks, a 3-attempt dead-letter retry instead of a silent drop, and end-to-end Langfuse tracing so every agent decision is inspectable.',
      outcome:
        'Every answer traces back to a specific page in a specific document — the citation is a first-class part of the response, not a bolt-on — backed by production-hardened ingestion and full request-level tracing.',
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
    role: ['AI/ML', 'Product/PM'],
    stack: ['Agentic AI', 'Backend'],
    featured: true,
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
    pmArtifact: {
      metrics:
        'Every generated feature is gated by two automated checks before it\'s considered shippable: a mitigation-coverage check (does the spec address the risks the Red-Team agent raised?) and a latency/pass-fail gate — a feature is flagged "Warning" if its telemetry-simulated latency exceeds 2.0s, treated as a trigger for another revision pass rather than a silent ship.',
      experiment:
        'Tried gemini-2.5-flash — a "thinking" model that runs an internal reasoning budget before responding — for the Phase 2 multi-agent drafting loop (Drafter → Red-Team → Evaluator), on the assumption that more reasoning would mean better specs.',
      cut:
        'Reverted Phase 2 to gemini-2.0-flash after finding 2.5-flash added 30–90s of latency per call on the full-PRD-length prompts this loop uses, and triggered 504 DEADLINE_EXCEEDED errors from Google\'s servers under load — with no measurable quality gain for this kind of structured generation. Kept 2.5-flash in Phase 1 and Phase 3, where single, shorter calls still benefit from the extra reasoning budget.',
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
    role: ['AI/ML'],
    stack: ['Backend'],
    featured: true,
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
        'In personal use it processed 1,247 jobs and led to 8 interviews and 2 offers. A feedback-driven calibration loop raised human–AI scoring correlation from 62% to 87%, and the deduplication system holds data accuracy at ~98% — turning a fragmented job market into one ranked, trustworthy list.',
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
    role: ['AI/ML', 'Product/PM'],
    stack: ['Agentic AI', 'Frontend'],
    featured: true,
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
    role: ['AI/ML', 'Full-Stack'],
    stack: ['Frontend'],
    featured: false,
    summary: 'Developers stuck turning "it looks broken in this recording" into a code fix get an assistant that watches the screen recording and reads the code at the same time — built end-to-end during Google DeepMind\'s one-week Vibe Code with Gemini 3 Pro sprint.',
    bullets: [
      'Correlates MP4/WEBM screen recordings with component code using multimodal analysis, drastically reducing time-to-resolution for visually-manifesting bugs.',
      'Features a Smart Code Editor for on-the-fly code inspection and live patching, creating a seamless integrated debugging environment.',
      'Includes a "Sherlock Mode" interactive chat for deep-dive contextual queries into complex codebases.',
      'Automatically identifies visual anomalies and traces them to underlying logic errors, bridging the gap between QA and engineering.',
      'Built and shipped within a 7-day hackathon window, co-built with a teammate.'
    ],
    tech: [
      'TypeScript', 'React', 'Vite', 'Prismjs',
      'Gemini 3 Pro', 'Gemini 2.5 Flash'
    ],
    link: 'https://github.com/dhruvladani04/BugVision-AI',
    caseStudy: {
      problem:
        'When a bug only shows up visually, the symptom lives in a screen recording and the cause lives in the code — nothing connects the two, so QA hands engineering a video and engineering starts from zero.',
      approach:
        'Co-built a multimodal analysis pipeline that correlates an uploaded screen recording (MP4/WEBM) with the relevant source code using Gemini 2.5 Flash, plus a "Sherlock Mode" interactive chat for follow-up questions and a side-by-side diff view for the suggested fix. Built with Gemini 3 Pro as the development/architecture assistant — a distinct role from the Gemini 2.5 Flash model doing the actual runtime analysis.',
      outcome:
        'A submitted entry to Google DeepMind\'s Vibe Code with Gemini 3 Pro competition — turns a screen recording plus an optional code snippet into a located root cause and a proposed fix in one pass, without needing to reproduce the bug from a written description alone.',
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
    role: ['AI/ML', 'Product/PM'],
    stack: ['Frontend', 'Agentic AI'],
    featured: true,
    summary: 'SMB recruiters who screen hundreds of resumes by hand — and lose good candidates to formatting, not fit — get autonomous parsing, scoring, and ranking with a reasoning trace behind every score. Shipped as the Phase-1 "Screener" agent in a roadmap that scales the same core into scheduling, sourcing, and bias-audit agents.',
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
    pmArtifact: {
      metrics:
        'As the product owner, defined and tracked three success metrics end-to-end: funnel analytics on the Job Post Creation flow to catch drop-off, a retention dashboard for daily recruiter activity and platform stickiness, and a North Star metric of reduction in average screening time per candidate.',
      experiment:
        'Started the resume-parsing pipeline on GPT-4o, then swapped to Gemini 2.0/2.5 Flash once the n8n workflow was underway — OCR-heavy resume parsing needs a large context window and low latency, and at the volume an SMB screening 500+ resumes actually sees, GPT-4o\'s per-call cost stops penciling out against Gemini Flash\'s price-to-performance.',
      cut:
        'Cut a custom Python backend in favor of building the agent workflow visually in n8n (Webhook → PDF parse → Gemini → JSON parse → Supabase) — as a solo founder, hand-building routing, auth, and state management would have consumed most of the build time; the visual graph made it possible to debug the agent\'s reasoning steps without restarting a server.',
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
    role: ['AI/ML'],
    stack: ['Agentic AI', 'Data/ML'],
    featured: false,
    summary: 'Engineering teams that need to stress-test AI agents before real production data exists get an autonomous multi-agent pipeline that fabricates structurally valid, adversarially diverse synthetic datasets — cutting dev-cycle time 10–20x versus hand-built test data.',
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
    caseStudy: {
      problem:
        'Engineering teams building AI agents can\'t rigorously test against adversarial, edge-case scenarios before production data exists — real data is often restricted by GDPR/HIPAA/CCPA, too expensive to annotate at scale, and statistically sparse in the true edge cases that matter.',
      approach:
        'Built a multi-agent DAG (Schema → Fabrication → Adversarial → Validator) that generates adversarial scenarios — prompt injections, tool loops, boundary conditions, multi-turn confusion — alongside bias-audited outputs with disparity analysis. Every dataset must clear evaluation gates before acceptance: ≥95% structural validity, ≥95% foreign-key integrity, a diversity score of ≥0.75 (1 minus mean Jaccard similarity across record pairs), and a disparity ratio under 1.1 across groups. Datasets are versioned and CI-gated through LangSmith for regression testing against future agent releases.',
      outcome:
        'Accelerates dev cycles 10–20x versus hand-curating test data, with thousands of scenarios covered per CI eval gate — every agent call traced end-to-end for latency, tokens, and output.',
    },
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
    role: ['AI/ML'],
    stack: ['Agentic AI', 'Backend'],
    featured: false,
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
    role: ['AI/ML'],
    stack: ['Agentic AI', 'Backend'],
    featured: false,
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
    role: ['Full-Stack', 'AI/ML'],
    stack: ['Frontend', 'Backend'],
    featured: false,
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
    id: 'skill-swap-platform',
    title: 'Skill Swap Platform',
    timeframe: 'July 2025',
    role: ['Full-Stack'],
    stack: ['Frontend', 'Backend'],
    featured: false,
    summary: 'A team-built hackathon web app where people trade skills instead of paying for lessons — profiles that list skills offered and wanted, swap requests with status tracking, and ratings to build trust between partners.',
    bullets: [
      'Lets users list the skills they offer and want, then search and filter others by skill, location, or availability.',
      'Tracks swap requests through Pending, Ongoing, and Completed states.',
      'Adds chat and a review-and-rating system so partners can coordinate and build trust.',
      'Built as a team hackathon project on Next.js with NextAuth.js authentication and a Prisma/PostgreSQL data layer.'
    ],
    tech: [
      'Next.js', 'TypeScript', 'PostgreSQL', 'Prisma',
      'NextAuth.js', 'Tailwind CSS'
    ],
    link: 'https://github.com/dhruvladani04/Skill-Swap-Platform',
    features: [
      'Skill Profiles',
      'Swap Requests',
      'Chat',
      'Ratings & Reviews'
    ]
  },
  {
    id: 'predictive-maintenance-dashboard',
    title: 'Predictive Maintenance Dashboard',
    timeframe: 'October 2025',
    role: ['AI/ML', 'Full-Stack'],
    stack: ['Backend', 'Data/ML'],
    featured: false,
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
    role: ['AI/ML'],
    stack: ['Backend'],
    featured: false,
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
    role: ['Full-Stack', 'AI/ML'],
    stack: ['Frontend', 'Backend'],
    featured: false,
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
    role: ['AI/ML'],
    stack: ['Frontend'],
    featured: false,
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
    role: ['Full-Stack', 'AI/ML'],
    stack: ['Frontend', 'Backend'],
    featured: false,
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
    linkNote: 'Private repo — not yet public.',
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
    role: ['AI/ML'],
    stack: ['Backend'],
    featured: false,
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
