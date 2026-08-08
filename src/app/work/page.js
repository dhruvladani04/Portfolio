import WorkPage from '../../views/WorkPage';
import { buildMetadata, pageTitle } from '../../lib/metadata';

export const metadata = buildMetadata({
  title: pageTitle('Projects'),
  description: '15+ projects across AI agents, RAG systems, and full-stack products — including an award-winning Google DeepMind competition entry.',
  path: '/work',
});

export default function Page() {
  return <WorkPage />;
}
