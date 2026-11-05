import ContactPage from '../../views/ContactPage';
import { buildMetadata, pageTitle } from '../../lib/metadata';

export const metadata = buildMetadata({
  title: pageTitle('Contact'),
  description: 'Hiring for a full-time AI/ML role or have a freelance project? A short form for each, plus email, LinkedIn, GitHub, and resumes.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
