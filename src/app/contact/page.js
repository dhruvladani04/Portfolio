import ContactPage from '../../views/ContactPage';
import { buildMetadata, pageTitle } from '../../lib/metadata';

export const metadata = buildMetadata({
  title: pageTitle('Contact'),
  description: 'Get in touch about AI, software engineering, and product roles. Email, LinkedIn, GitHub, and resumes.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
