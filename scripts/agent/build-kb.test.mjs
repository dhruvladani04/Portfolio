import test from 'node:test';
import assert from 'node:assert';
import { cleanReadme, repoFromLink, buildProfile, loadSiteData } from './build-kb.mjs';

test('repoFromLink', () => {
  assert.strictEqual(repoFromLink('https://github.com/dhruvladani04/tollgate'), 'tollgate');
  assert.strictEqual(repoFromLink('https://github.com/dhruvladani04/GateGuru-/tree/main'), 'GateGuru-');
  assert.strictEqual(repoFromLink('https://github.com/dhruvladani04/docmind.git'), 'docmind');
  assert.strictEqual(repoFromLink('https://github.com/someoneelse/tollgate'), null);
  assert.strictEqual(repoFromLink(undefined), null);
});

test('cleanReadme drops setup sections, code, badges and links', () => {
  const md = [
    '# Tollgate [![CI](https://x/badge.svg)](https://x)',
    '<!-- hidden -->',
    'An MCP proxy. See [the docs](https://example.com/docs).',
    '',
    '## 🚀 Getting Started',
    'Run this:',
    '### Sub-step',
    'more setup',
    '## Results',
    '| Metric | Value |',
    '| --- | --- |',
    '| Caught | 96.3% |',
    '```bash',
    'pip install tollgate',
    '```',
    '<p align="center"><img src="x.png"/>Diagram</p>',
    '## License',
    'MIT',
  ].join('\r\n');
  const out = cleanReadme(md);
  assert.match(out, /^# Tollgate$/m);
  assert.match(out, /An MCP proxy\. See the docs\./);
  assert.match(out, /\| Caught \| 96\.3% \|/);
  assert.match(out, /Diagram/);
  for (const gone of ['Getting Started', 'more setup', 'pip install', 'MIT', 'hidden', 'badge.svg', 'x.png']) {
    assert.ok(!out.includes(gone), `expected "${gone}" to be removed`);
  }
});

test('cleanReadme keeps results nested under a dropped setup section', () => {
  const md = [
    '## Quick Start',
    'clone the repo',
    '### Live Cloud Deployment',
    'deploy steps',
    '### Ragas Evaluation',
    '#### Current Baseline',
    'citation support 0.989',
    '## Adding Your Own Documents',
    'put files in docs/',
    '## Tech Stack',
    'LangGraph',
  ].join('\n');
  const out = cleanReadme(md);
  assert.match(out, /citation support 0\.989/);
  assert.match(out, /LangGraph/);
  for (const gone of ['clone the repo', 'deploy steps', 'put files in docs/']) {
    assert.ok(!out.includes(gone), `expected "${gone}" to be removed`);
  }
});

test('cleanReadme removes superseded <details> blocks and redacted lines', () => {
  const md = [
    '## Results',
    'Current: 0.989',
    '<details>',
    '<summary>Superseded — old run</summary>',
    '| Context Precision | 68.9% | 81.8% |',
    '</details>',
    '<details><summary>More detail</summary>keep me</details>',
    '| Infrastructure cost reduction | **Up to 80%** |',
  ].join('\n');
  const out = cleanReadme(md, { redact: [/80\s*%/] });
  assert.ok(!out.includes('68.9%'));
  assert.ok(!out.includes('Up to 80%'));
  assert.match(out, /keep me/);
  assert.match(out, /Current: 0\.989/);
});

test('buildProfile covers recruiter facts, every project and the corrections', async () => {
  const data = await loadSiteData();
  const profile = buildProfile(data);
  for (const p of data.projects) {
    assert.ok(profile.includes(`(id: ${p.id})`), `missing project ${p.id}`);
  }
  for (const needle of [
    'Notice period',
    '10 to 12 LPA',
    'USD 50K or more',
    'Hourly only',
    '/contact?form=hiring',
    'Dhruv_Ladani_Resume_Tech.pdf',
    'ICCUBEA 2024',
    'AIMV 2025',
    '## Corrections',
  ]) {
    assert.ok(profile.includes(needle), `profile missing "${needle}"`);
  }
  // The international range must stay a floor, never an upper number.
  assert.ok(!/100K/i.test(profile));
  // LinkedIn details are in, but its unconfirmed Impresa figures are not.
  assert.ok(profile.includes('## From his LinkedIn profile'));
  assert.ok(profile.includes('ticket-management'));
  for (const bad of [/100\s*M rows/i, /52 features/i, /6\s*hrs/i, /70%\s*to\s*~?85%/, /≤\s*2 days/]) {
    assert.ok(!bad.test(profile), `profile leaks unconfirmed figure ${bad}`);
  }
});

test('linkedinSection is empty without data and skips missing fields', async () => {
  const { linkedinSection } = await import('./build-kb.mjs');
  assert.deepStrictEqual(linkedinSection(undefined), []);
  assert.deepStrictEqual(linkedinSection({}), []);
  const [section] = linkedinSection({ headline: 'ML Engineer', certifications: ['A', 'B'] });
  assert.ok(section.includes('LinkedIn headline: ML Engineer'));
  assert.ok(section.includes('Certifications: A; B'));
  assert.ok(!section.includes('Top skills'));
});

test('communitySections only emits what Dhruv filled in', async () => {
  const { communitySections } = await import('./build-kb.mjs');
  const empty = communitySections({
    forEngineers: { currentlyExploring: [], howHeBuilds: [], setup: [], collaboration: '' },
    forStudents: { journey: '', advice: [], resources: [], mentorship: '' },
    personal: { hometown: '', interests: [], funFacts: [], offLimits: [] },
    socials: [],
  });
  assert.strictEqual(empty.length, 1);
  assert.match(empty[0], /^## Personal boundaries/);

  const filled = communitySections({
    forEngineers: { currentlyExploring: ['MCP servers'], collaboration: 'Open to hackathons' },
    forStudents: { advice: [{ topic: 'DSA', tip: 'Practise daily' }], mentorship: 'LinkedIn DMs' },
    personal: { interests: ['Cricket'], philosophy: 'Karma', offLimits: ['salary history'] },
    socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/in/x' }],
    socialsNote: 'Rarely on X',
  }).join('\n');
  for (const s of ['## For fellow engineers', 'MCP servers', '## For students and freshers', 'DSA: Practise daily', '## Beyond work', 'Cricket', 'Outlook on life: Karma', '## Social profiles', 'LinkedIn: https://linkedin.com/in/x', 'Rarely on X', 'salary history']) {
    assert.ok(filled.includes(s), `missing ${s}`);
  }
});
