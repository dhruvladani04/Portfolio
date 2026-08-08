// Swap this single constant when the custom domain goes live.
export const SITE_URL = 'https://dhruvladaniportfolio.netlify.app';

const BRAND = 'Dhruv Ladani';

// Centralizes the "Page — Dhruv Ladani" title suffix so every route composes
// it the same way instead of hand-typing (and drifting from) it per file.
export function pageTitle(name) {
  return `${name} — ${BRAND}`;
}

export function caseStudyTitle(projectTitle) {
  return `${projectTitle} — Case Study | ${BRAND}`;
}

// Next's Metadata API does not deep-merge openGraph/twitter between a layout
// and a page — a page-level openGraph replaces the layout's wholesale. Every
// route re-declares the full block here so og:image/site_name/type never
// silently drop off a non-home route.
export function buildMetadata({ title, description, path = '' }) {
  const url = SITE_URL + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'Dhruv Ladani',
      title,
      description,
      url,
      images: [`${SITE_URL}/og-image.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}
