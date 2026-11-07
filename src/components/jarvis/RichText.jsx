import Link from 'next/link';

// Renders the agent's chat replies: paragraphs, bullet/numbered lists, **bold**,
// site paths (/work/tollgate) as in-app links and https URLs as external
// links. Builds React elements only — model output never reaches innerHTML.

const INLINE =
  /(\*\*[^*\n]+\*\*|https?:\/\/[^\s)<>"']+|\/(?:work-with-me|work|about|contact)(?:\/[a-z0-9-]+)?(?:\/?\?form=(?:hiring|freelance))?\/?)/gi;

function inline(text, keyBase) {
  const out = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE)) {
    const token = m[0];
    const start = m.index;
    // A site path only counts at a word boundary, not inside "a/work".
    if (token.startsWith('/') && start > 0 && /[\w./]/.test(text[start - 1])) continue;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyBase}-${i++}`;
    if (token.startsWith('**')) {
      out.push(<strong key={key} className="text-white font-semibold">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('http')) {
      const href = token.replace(/[.,;:!?]+$/, '');
      out.push(
        <a key={key} href={href} target="_blank" rel="noreferrer" className="jarvis-link">
          {href.replace(/^https?:\/\//, '')}
        </a>,
      );
      if (href.length < token.length) out.push(token.slice(href.length));
    } else {
      out.push(
        <Link key={key} href={token} className="jarvis-link">
          {token}
        </Link>,
      );
    }
    last = start + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function RichText({ text }) {
  const lines = String(text || '').split('\n');
  const blocks = [];
  let list = null;

  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    blocks.push(
      <Tag key={`l${blocks.length}`} className={list.ordered ? 'jarvis-ol' : 'jarvis-ul'}>
        {list.items.map((item, i) => (
          <li key={i}>{inline(item, `l${blocks.length}-${i}`)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet || numbered)[1]);
      continue;
    }
    flushList();
    if (!line) continue;
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    blocks.push(
      <p key={`p${blocks.length}`} className={heading ? 'text-white font-semibold' : undefined}>
        {inline(heading ? heading[1] : line, `p${blocks.length}`)}
      </p>,
    );
  }
  flushList();
  return <div className="jarvis-rich">{blocks}</div>;
}
