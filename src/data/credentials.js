import { FiAward, FiUsers, FiCheckCircle, FiBookOpen } from 'react-icons/fi';
import { SiCodechef } from 'react-icons/si';

// Named credentials that were previously buried three clicks deep in the
// About page's journey timeline — surfaced here so they're visible above
// the fold. Impresa.ai deliberately isn't repeated here since it's already
// in the hero's status badge and pill.
export const credentials = [
  {
    label: 'GATE 2025 & 2026 Qualified',
    detail: 'CS/IT',
    href: null,
    icon: FiCheckCircle,
  },
  {
    label: 'IEEE ICCUBEA 2024',
    detail: 'Published research paper',
    href: null,
    icon: FiAward,
  },
  {
    label: 'CodeChef 5★',
    detail: null,
    href: 'https://www.codechef.com/users/dhruv_codes04',
    icon: SiCodechef,
  },
  {
    label: 'IIT Patna',
    detail: 'PM & Agentic AI Program',
    href: null,
    icon: FiBookOpen,
  },
  {
    label: 'Elected Technical Head',
    detail: 'ACM PDEU + CSI PDEU',
    href: null,
    icon: FiUsers,
  },
];
