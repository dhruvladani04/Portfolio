// Single source for the J.A.R.V.I.S. site tools: scripts/agent/config.mjs
// declares them to Gemini from this file, and the browser handlers in
// src/components/jarvis validate arguments against the same lists. Tool and
// parameter names are case-sensitive and must match on both sides.
// Plain data only — imported from Node as well as the browser.

export const NAV_ROUTES = ['/', '/work', '/about', '/work-with-me', '/contact'];
export const RESUME_KINDS = ['tech', 'pm'];
export const CONTACT_FORMS = ['hiring', 'freelance'];

export const TOOL_DEFS = [
  {
    name: 'navigate',
    description:
      'Open a page of the portfolio in the visitor\'s browser. Use when they ask to see something: "show me his work" → /work, "about him" / "his experience" → /about, freelance packages → /work-with-me, home → /.',
    params: {
      path: { enum: NAV_ROUTES, description: 'Site path to open.' },
    },
  },
  {
    name: 'showProject',
    description:
      'Open one project\'s case study page. Use when the visitor wants details or a walkthrough of a specific project. Use the project id from the knowledge base.',
    params: {
      id: { enum: 'PROJECT_IDS', description: 'Project id, e.g. "tollgate".' },
    },
  },
  {
    name: 'openResume',
    description:
      'Open Dhruv\'s resume PDF in a new tab. "tech" for engineering / AI / ML / FDE roles, "pm" for product roles. Offer it when a recruiter shows interest.',
    params: {
      kind: { enum: RESUME_KINDS, description: 'Which resume to open.' },
    },
  },
  {
    name: 'openContact',
    description:
      'Open the contact page with the right enquiry form selected: "hiring" for full-time roles, "freelance" for project work. Use when the visitor wants to reach Dhruv.',
    params: {
      form: { enum: CONTACT_FORMS, description: 'Which form to open.' },
    },
  },
];
