import '../index.css';
import ClientShell from './ClientShell';
import { SITE_URL, buildMetadata } from '../lib/metadata';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: 'Dhruv Ladani — AI Product Builder & Engineer',
    description: 'A product manager who codes and an AI builder who ships. Agentic systems, RAG pipelines, and full-stack products — portfolio of Dhruv Ladani.',
    path: '',
  }),
  authors: [{ name: 'Dhruv Ladani' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050508',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dhruv Ladani',
  url: `${SITE_URL}/`,
  jobTitle: 'AI Product Builder',
  description: 'AI Product Builder with hands-on experience designing and deploying Generative AI applications using multi-agent systems and RAG pipelines.',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Pandit Deendayal Energy University',
  },
  email: 'mailto:dhruvladani04@gmail.com',
  sameAs: [
    'https://github.com/dhruvladani04',
    'https://www.linkedin.com/in/dhruv-ladani-a65578252',
    'https://leetcode.com/dhruvcodes04/',
    'https://codeforces.com/profile/dhruvcodes04',
    'https://www.codechef.com/users/dhruv_codes04',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-gradient-to-b from-gray-900 via-slate-900 to-black text-slate-100">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
