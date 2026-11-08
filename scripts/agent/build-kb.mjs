#!/usr/bin/env node
// Builds the J.A.R.V.I.S. knowledge base from the site's own data files plus
// each project's public GitHub README.
//
//   npm run agent:kb   → writes .agent-kb/profile.md, .agent-kb/readmes/*.md and
//                        .agent-kb/kb.json (what the Netlify Functions load)
//
// The Netlify build runs this before bundling the functions, so
// what you review here is exactly what the agent will know.

import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const OUT_DIR = path.join(ROOT, '.agent-kb');
export const GITHUB_USER = 'dhruvladani04';

// README sections that are setup noise for a recruiter conversation.
const DROP_SECTION = /^(installation|install|setup|set ?up|getting started|quick ?start|prerequisites|requirements|running( it)?( locally| the app| the project)?|run( it)?( locally)?|local (development|setup)|development|usage|how to (run|use)|environment( variables)?|env vars|configuration|config|(live |cloud )*deploy(ment|ing)?|project structure|folder structure|directory structure|file structure|repo(sitory)? structure|repo(sitory)? layout|contributing|contributors|license|acknowledg(e)?ments|credits|support|author|screenshots?|table of contents|contents|tests?|testing|running tests|scripts|commands|cli( reference)?|api reference|api endpoints|endpoints|troubleshooting|faq|add(ing)? your own)\b/i;

// Substance that READMEs sometimes nest under a dropped heading (e.g.
// "Quick Start → Evaluation → Current Baseline"): a matching subheading
// ends the drop so the numbers survive.
const KEEP_SECTION = /(result|evaluat|baseline|benchmark|metric|performance|impact|outcome|architecture|how it works)/i;

// Per-repo lines that state claims Dhruv never measured (see doNotClaim in
// src/data/recruiter-faq.js). Matching lines are removed from the README.
export const README_REDACTIONS = {
  EdgeSynth: [/80\s*%/],
};

export function repoFromLink(url) {
  const m = new RegExp(`github\\.com/${GITHUB_USER}/([^/?#\\s]+)`, 'i').exec(url || '');
  return m ? m[1].replace(/\.git$/i, '') : null;
}

function headingText(line) {
  const m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
  if (!m) return null;
  const text = m[2]
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]/g, '')
    .replace(/^[^\p{L}\p{N}]+/u, '')
    .trim();
  return { level: m[1].length, text };
}

export function cleanReadme(md, { redact = [] } = {}) {
  let s = String(md || '').replace(/\r\n?/g, '\n');

  // HTML comments, then collapsible blocks labelled as superseded/outdated.
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<details>[\s\S]*?<\/details>/gi, (block) => {
    const summary = /<summary>([\s\S]*?)<\/summary>/i.exec(block)?.[1] || '';
    return /superseded|deprecated|outdated|legacy|old run/i.test(summary) ? '' : block;
  });

  const out = [];
  let inFence = false;
  let fenceMarker = '';
  let dropLevel = 0; // >0 while skipping a dropped section of that level

  for (const raw of s.split('\n')) {
    const fence = /^\s*(```+|~~~+)/.exec(raw);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[1][0];
      } else if (fence[1][0] === fenceMarker) {
        inFence = false;
      }
      continue; // code blocks are noise in conversation
    }
    if (inFence) continue;

    const h = headingText(raw);
    if (h) {
      if (dropLevel && h.level > dropLevel && !KEEP_SECTION.test(h.text)) continue;
      dropLevel = DROP_SECTION.test(h.text) && !KEEP_SECTION.test(h.text) ? h.level : 0;
      if (dropLevel) continue;
    } else if (dropLevel) {
      continue;
    }

    if (redact.some((re) => re.test(raw))) continue;

    let line = raw
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images and badges
      .replace(/\[\s*\]\([^)]*\)/g, '') // links left empty by badge removal
      .replace(/\[([^\]]+)\]\((?:[^)(]|\([^)]*\))*\)/g, '$1') // [text](url) → text
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/?[a-z][^>]*>/gi, '') // remaining HTML tags, keep inner text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/[ \t]+$/g, '');

    if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) line = '';
    out.push(line);
  }

  return out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const bullet = (s) => `- ${s}`;
const list = (items) => items.map(bullet).join('\n');

function projectBlock(p) {
  const lines = [`### ${p.title} (id: ${p.id})`];
  const where = [`Portfolio page: /work/${p.id}`];
  if (p.link) where.push(`Link: ${p.link}`);
  if (p.prd) where.push(`PRD: ${p.prd}`);
  lines.push(bullet(where.join(' · ')));
  if (p.linkNote) lines.push(bullet(`Note on links: ${p.linkNote}`));
  lines.push(bullet(`When: ${p.timeframe} · Role: ${p.role.join(', ')} · Areas: ${p.stack.join(', ')}`));
  if (p.result) lines.push(bullet(`Headline result: ${p.result}`));
  lines.push(bullet(`Summary: ${p.summary}`));
  if (p.bullets?.length) lines.push(bullet('Highlights:'), ...p.bullets.map((b) => `  - ${b}`));
  if (p.tech?.length) lines.push(bullet(`Tech: ${p.tech.join(', ')}`));
  if (p.caseStudy) {
    lines.push(bullet(`Problem: ${p.caseStudy.problem}`));
    lines.push(bullet(`Approach: ${p.caseStudy.approach}`));
    lines.push(bullet(`Outcome: ${p.caseStudy.outcome}`));
  }
  if (p.pmArtifact) {
    lines.push(bullet(`Success metrics: ${p.pmArtifact.metrics}`));
    if (p.pmArtifact.experiment) lines.push(bullet(`Experiment run: ${p.pmArtifact.experiment}`));
    if (p.pmArtifact.cut) lines.push(bullet(`What was cut and why: ${p.pmArtifact.cut}`));
  }
  if (p.features?.length) lines.push(bullet(`Key features: ${p.features.join(', ')}`));
  return lines.join('\n');
}

// Details from his LinkedIn profile that the site doesn't carry.
export function linkedinSection(li) {
  if (!li) return [];
  const lines = [
    li.headline && `LinkedIn headline: ${li.headline}`,
    li.impresaWork?.length && `More on his Impresa.ai work:\n${li.impresaWork.map(bullet).join('\n')}`,
    li.topSkills?.length && `Top skills on LinkedIn: ${li.topSkills.join(', ')}`,
    li.certifications?.length && `Certifications: ${li.certifications.join('; ')}`,
  ].filter(Boolean);
  return lines.length ? [`## From his LinkedIn profile\n${lines.join('\n\n')}`] : [];
}

// Sections for engineers, students and friends. Only fields Dhruv has filled
// in src/data/community.js are emitted — an empty field never becomes a
// heading the model might feel obliged to fill.
export function communitySections(c = {}) {
  const out = [];
  const nonEmpty = (lines) => lines.filter(Boolean);

  const eng = c.forEngineers || {};
  const engLines = nonEmpty([
    ...(eng.currentlyExploring || []).map((x) => `Currently exploring: ${x}`),
    ...(eng.howHeBuilds || []).map((x) => `How he builds: ${x}`),
    ...(eng.setup || []).map((x) => `Tools and setup: ${x}`),
    eng.collaboration && `Collaboration: ${eng.collaboration}`,
  ]);
  if (engLines.length) out.push(`## For fellow engineers\n${list(engLines)}`);

  const stu = c.forStudents || {};
  const stuParts = [];
  if (stu.journey) stuParts.push(`His path, in his words: ${stu.journey}`);
  if (stu.advice?.length) stuParts.push(`Advice he gives:\n${stu.advice.map((a) => bullet(`${a.topic}: ${a.tip}`)).join('\n')}`);
  if (stu.resources?.length) {
    stuParts.push(`Resources he recommends:\n${stu.resources.map((r) => bullet(`${r.name}${r.why ? ` — ${r.why}` : ''}${r.href ? ` ${r.href}` : ''}`)).join('\n')}`);
  }
  if (stu.mentorship) stuParts.push(`Reaching out for guidance: ${stu.mentorship}`);
  if (stuParts.length) out.push(`## For students and freshers\n${stuParts.join('\n\n')}`);

  const me = c.personal || {};
  const meLines = nonEmpty([
    me.hometown && `Hometown: ${me.hometown}`,
    ...(me.interests || []),
    me.philosophy && `Outlook on life: ${me.philosophy}`,
    ...(me.funFacts || []).map((x) => `Fun fact: ${x}`),
  ]);
  if (meLines.length) out.push(`## Beyond work (fine to share with anyone)\n${list(meLines)}`);

  const socialLines = nonEmpty([
    ...(c.socials || []).map((s) => `${s.label}: ${s.href}${s.audience ? ` (for ${s.audience})` : ''}`),
    c.socialsNote,
  ]);
  if (socialLines.length) out.push(`## Social profiles\n${list(socialLines)}`);

  const offLimits = ['family', 'relationships', 'religion', 'politics', 'home address', 'phone number', ...(me.offLimits || [])];
  out.push(
    `## Personal boundaries\n${bullet(
      `Anything personal that is not written in this document is unknown — say so. Always decline questions about: ${offLimits.join(', ')}.`,
    )}`,
  );
  return out;
}

export function buildProfile(d) {
  const { faq } = d;
  const featured = d.featuredIds.map((id) => d.projects.find((p) => p.id === id)).filter(Boolean);
  const smaller = d.smallerBuildIds.map((id) => d.projects.find((p) => p.id === id)).filter(Boolean);
  const listed = new Set([...d.featuredIds, ...d.smallerBuildIds]);
  const more = d.projects.filter((p) => !listed.has(p.id));

  const sections = [
    `# Dhruv Ladani — profile`,
    `Built from the portfolio's own data files (${d.siteUrl}). ` +
      `This document is the source of truth: when a project README disagrees with it, trust this document. ` +
      `Never state anything about Dhruv that is not in this document or a project README.`,

    `## Snapshot\n${list([
      `Name: ${faq.basics.name}`,
      `Current role: ${faq.basics.currentRole}`,
      `Location: ${faq.basics.location}`,
      `Education: ${faq.basics.education}`,
      `Languages spoken: ${faq.basics.languages.join(', ')}`,
      `Portfolio: ${d.siteUrl}`,
    ])}`,

    `## What sets him apart\n${list(faq.positioning)}`,

    `## Target roles\n${list(faq.targetRoles)}\n- Preferred companies: ${faq.preferredCompanies}`,

    `## Availability and notice period\n${list([
      `Notice period: ${faq.availability.noticePeriod}`,
      `Earliest start: ${faq.availability.earliestStart} Work this out from today's date when asked, and give an approximate date range, not a promise.`,
    ])}`,

    `## Location and work setup\n${list([
      `Today: ${faq.workSetup.current}`,
      `Relocation: ${faq.workSetup.relocation}`,
      `Open to: ${faq.workSetup.openTo}`,
    ])}`,

    `## Compensation expectations (share only when asked)\n${list([
      faq.compensation.india,
      faq.compensation.international,
      faq.compensation.note,
    ])}`,

    `## Work authorization\n${bullet(faq.workAuthorization)}`,

    `## Experience\n${d.experience
      .map((e) =>
        [
          `### ${e.role} — ${e.company}`,
          bullet(`${e.timeframe}${e.location ? ` · ${e.location}` : ''}`),
          ...e.bullets.map(bullet),
        ].join('\n'),
      )
      .join('\n\n')}`,

    ...linkedinSection(d.linkedin),

    `## Featured projects (his strongest work, in order)\n${featured.map(projectBlock).join('\n\n')}`,
    `## More projects\n${more.map(projectBlock).join('\n\n')}`,
    `## Smaller or early builds\n${smaller.map(projectBlock).join('\n\n')}`,

    `## Skills\n${d.skills.map((s) => bullet(`${s.category}: ${s.items.join(', ')}`)).join('\n')}`,

    `## Research papers (2)\n${d.papers
      .map((p) => bullet(`"${p.title}" — ${p.venue}, ${p.year}. ${p.summary} ${p.href}`))
      .join('\n')}`,

    `## Credentials, competitive programming and leadership\n${list([
      ...d.credentials.map((c) => (c.detail ? `${c.label} — ${c.detail}` : c.label)),
      ...d.competitive,
    ])}`,

    `## Journey timeline\n${d.journeyPhases.map((j) => bullet(`${j.year} — ${j.title}: ${j.desc}`)).join('\n')}`,

    `## Freelance work\n${list([
      `Billing: ${faq.freelance.billing}`,
      `Hours: ${faq.freelance.hours}`,
      `Best fit: ${faq.freelance.bestFit}`,
      `Process: ${d.freelance.steps.join(' → ')}`,
      `Availability window: ${d.freelance.availability}`,
      `Book a scoping call: ${d.topmateUrl}`,
    ])}\n\nPackages he offers:\n${d.freelance.packages
      .map((p) => bullet(`${p.title} (${p.duration}): ${p.desc} Similar work: ${p.proof.map((x) => x.label).join(', ')}.`))
      .join('\n')}`,

    ...communitySections(d.community),

    `## Contact and resumes\n${list([
      `Hiring for a full-time role: the hiring form at /contact?form=hiring`,
      `Freelance project: the freelance form at /contact?form=freelance, or book a call at ${d.topmateUrl}`,
      `Email: ${d.contactEmail}`,
      ...Object.entries(d.resumes).map(([kind, r]) => `${r.label}: ${r.href} (kind: ${kind})`),
      ...d.profileLinks.map((l) => `${l.label}: ${l.href}`),
    ])}`,

    `## Site map (pages the assistant can open)\n${list([
      '/ — home',
      '/work — all projects',
      '/work/<project id> — one project case study (ids are listed with each project above)',
      '/about — experience, journey timeline, skills',
      '/work-with-me — freelance packages and booking',
      '/contact — hiring and freelance forms',
    ])}`,

    `## About his resumes (why they differ from this document)\n${list(d.resumeNotes || [])}`,

    `## Corrections (these override anything in a README)\n${list(d.doNotClaim)}`,
  ];

  return `${sections.join('\n\n')}\n`;
}

async function importData(rel) {
  return import(pathToFileURL(path.join(ROOT, rel)).href);
}

export async function loadSiteData() {
  const [projectsMod, experienceMod, credentialsMod, aboutMod, faqMod, freelanceMod, metaMod, communityMod] = await Promise.all([
    importData('src/data/projects.js'),
    importData('src/data/experience.js'),
    importData('src/data/credentials.js'),
    importData('src/data/about.js'),
    importData('src/data/recruiter-faq.js'),
    importData('src/data/freelance.js'),
    importData('src/lib/metadata.js'),
    importData('src/data/community.js'),
  ]);
  return {
    projects: projectsMod.projects,
    featuredIds: projectsMod.FEATURED_IDS,
    smallerBuildIds: projectsMod.SMALLER_BUILD_IDS,
    experience: experienceMod.experience,
    credentials: credentialsMod.credentials,
    skills: aboutMod.skills,
    journeyPhases: aboutMod.journeyPhases,
    papers: aboutMod.papers,
    competitive: aboutMod.competitive,
    profileLinks: aboutMod.profileLinks,
    faq: faqMod.recruiterFaq,
    doNotClaim: faqMod.doNotClaim,
    resumeNotes: faqMod.resumeNotes,
    linkedin: faqMod.linkedinProfile,
    resumes: faqMod.RESUMES,
    contactEmail: faqMod.CONTACT_EMAIL,
    topmateUrl: faqMod.TOPMATE_URL,
    freelance: {
      packages: freelanceMod.packages,
      steps: freelanceMod.steps,
      availability: freelanceMod.availability,
    },
    community: {
      forEngineers: communityMod.forEngineers,
      forStudents: communityMod.forStudents,
      personal: communityMod.personal,
      socials: communityMod.socials,
      socialsNote: communityMod.socialsNote,
    },
    siteUrl: metaMod.SITE_URL,
    generatedAt: new Date().toISOString().slice(0, 10),
  };
}

async function fetchText(url, headers = {}) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

// raw.githubusercontent first (no rate limit); the API fallback finds READMEs
// whose filename isn't exactly README.md.
export async function fetchReadme(repo) {
  const raw = await fetchText(`https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/HEAD/README.md`);
  if (raw != null) return raw;
  return fetchText(`https://api.github.com/repos/${GITHUB_USER}/${repo}/readme`, {
    Accept: 'application/vnd.github.raw+json',
    'User-Agent': 'portfolio-kb-builder',
  });
}

export async function buildKnowledgeBase({ log = console } = {}) {
  const data = await loadSiteData();
  const profile = buildProfile(data);

  const withRepos = data.projects
    .map((p) => ({ project: p, repo: repoFromLink(p.link) }))
    .filter((x) => x.repo);

  const readmes = [];
  const missing = [];
  await Promise.all(
    withRepos.map(async ({ project, repo }) => {
      try {
        const md = await fetchReadme(repo);
        if (md == null) {
          missing.push(repo);
          return;
        }
        const body = cleanReadme(md, { redact: README_REDACTIONS[repo] || [] });
        if (body.length < 200) {
          missing.push(repo);
          return;
        }
        readmes.push({
          repo,
          projectId: project.id,
          title: project.title,
          text: `# ${project.title} — project README\nRepository: https://github.com/${GITHUB_USER}/${repo} · Portfolio page: /work/${project.id}\n\n${body}\n`,
        });
      } catch (err) {
        log.warn(`[kb] README fetch failed for ${repo}: ${err.message}`);
        missing.push(repo);
      }
    }),
  );
  readmes.sort((a, b) => a.repo.localeCompare(b.repo));
  if (missing.length) log.warn(`[kb] skipped (no README): ${missing.sort().join(', ')}`);

  return { profile, readmes };
}

// The bundle the Netlify Functions import (netlify/lib/kb.mjs): the profile
// that rides in every prompt, plus READMEs served by getProjectDetails.
export function kbBundle({ profile, readmes, projectIds, generatedAt = new Date().toISOString() }) {
  return {
    generatedAt,
    profile,
    projectIds,
    readmes: Object.fromEntries(readmes.map((r) => [r.projectId, r.text])),
  };
}

async function main() {
  const { profile, readmes } = await buildKnowledgeBase();
  const { projects } = await import(pathToFileURL(path.join(ROOT, 'src/data/projects.js')).href);
  // Keep eval-report.json across rebuilds; everything else is regenerated.
  await rm(path.join(OUT_DIR, 'readmes'), { recursive: true, force: true });
  await mkdir(path.join(OUT_DIR, 'readmes'), { recursive: true });
  await writeFile(path.join(OUT_DIR, 'profile.md'), profile);
  for (const r of readmes) await writeFile(path.join(OUT_DIR, 'readmes', `${r.repo}.md`), r.text);
  const bundle = kbBundle({ profile, readmes, projectIds: projects.map((p) => p.id) });
  await writeFile(path.join(OUT_DIR, 'kb.json'), JSON.stringify(bundle));

  const readmeChars = readmes.reduce((n, r) => n + r.text.length, 0);
  console.log(`[kb] profile.md: ${profile.length.toLocaleString()} chars`);
  console.log(`[kb] ${readmes.length} READMEs: ${readmeChars.toLocaleString()} chars total`);
  console.log(`[kb] written to ${path.relative(ROOT, OUT_DIR)}/`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
