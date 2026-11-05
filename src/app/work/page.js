import WorkPage from '../../views/WorkPage';
import { buildMetadata, pageTitle } from '../../lib/metadata';
import { projects } from '../../data/projects';

export const metadata = buildMetadata({
  title: pageTitle('Projects'),
  description: `${projects.length} projects across AI agents, RAG, evals, data pipelines and full-stack products — case studies with measured results and the product decisions behind them.`,
  path: '/work',
});

export default function Page() {
  return <WorkPage />;
}
