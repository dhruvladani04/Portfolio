import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Swap this single constant when the custom domain goes live.
export const SITE_URL = 'https://dhruvladaniportfolio.netlify.app';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Per-route document metadata: title, description, canonical, and OG tags.
export default function Seo({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = SITE_URL + (pathname === '/' ? '' : pathname);
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, pathname]);

  return null;
}
