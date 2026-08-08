import WorkPage from '../../../views/WorkPage';
import { buildMetadata, caseStudyTitle } from '../../../lib/metadata';
import { projects } from '../../../data/projects';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

// Static export: no server to resolve unlisted slugs at request time —
// an unknown project id must 404 at build time, not fall back at runtime.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return buildMetadata({
    title: caseStudyTitle(project.title),
    description: project.summary,
    path: `/work/${project.id}`,
  });
}

export default function Page() {
  return <WorkPage />;
}
