import WorkPage from '../../views/WorkPage';
import { buildMetadata, pageTitle } from '../../lib/metadata';

export const metadata = buildMetadata({
  title: pageTitle('Projects'),
  description: '15+ projects across AI agents, RAG systems, and full-stack products — including an entry built for a Google DeepMind Gemini 3 Pro hackathon.',
  path: '/work',
});

export default function Page() {
  return <WorkPage />;
}
