import WorkWithMePage from '../../views/WorkWithMePage';
import { buildMetadata, pageTitle } from '../../lib/metadata';

export const metadata = buildMetadata({
  title: pageTitle('Work with me'),
  description: 'Freelance AI and ML builds: pitch prototypes, data pipelines with models, and RAG or agent pilots with evals. Fixed price after a 30-minute scoping call.',
  path: '/work-with-me',
});

export default function Page() {
  return <WorkWithMePage />;
}
