// Turns an agent tool call into a safe UI action. The agent's arguments are
// untrusted (an LLM chose them), so every value is checked against the same
// allow-lists the agent was configured with (src/lib/jarvis-tools.js) — the
// browser never navigates to, or opens, anything outside them.

import { NAV_ROUTES, RESUME_KINDS, CONTACT_FORMS } from '../../lib/jarvis-tools.js';
import { RESUMES } from '../../data/recruiter-faq.js';

const FORM_LABELS = { hiring: 'Hiring form', freelance: 'Freelance form' };

export function resolveToolCall(name, params, { projects }) {
  const p = params && typeof params === 'object' ? params : {};

  switch (name) {
    case 'navigate':
      if (NAV_ROUTES.includes(p.path)) return { type: 'navigate', href: p.path };
      return { type: 'error', message: `Unknown page "${p.path}".` };

    case 'showProject': {
      const project = projects.find((x) => x.id === p.id);
      if (project) return { type: 'navigate', href: `/work/${project.id}`, label: project.title };
      return { type: 'error', message: `Unknown project "${p.id}".` };
    }

    case 'openResume':
      if (RESUME_KINDS.includes(p.kind)) {
        const r = RESUMES[p.kind];
        return { type: 'link', href: r.href, label: r.label, download: true };
      }
      return { type: 'error', message: `Unknown resume "${p.kind}".` };

    case 'openContact':
      if (CONTACT_FORMS.includes(p.form)) {
        return { type: 'navigate', href: `/contact?form=${p.form}`, label: FORM_LABELS[p.form] };
      }
      return { type: 'error', message: `Unknown form "${p.form}".` };

    default:
      return { type: 'error', message: `Unknown tool "${name}".` };
  }
}
