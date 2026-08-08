import AboutPage from '../../views/AboutPage';
import { buildMetadata, pageTitle } from '../../lib/metadata';

export const metadata = buildMetadata({
  title: pageTitle('About'),
  description: 'Computer Engineering graduate from PDEU, now Associate Application Engineer (AI/ML) at Impresa.ai. 500+ DSA problems, CodeChef 5-star, 2 research papers.',
  path: '/about',
});

export default function Page() {
  return <AboutPage />;
}
