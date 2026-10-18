import { masthead, profile, projects } from './site.ts';

// Production origin explicitly supplied by the user for Ticket 09.
// T-17: the share image is the newspaper front page (scripts/social-preview.mjs).
export const site = {
  origin: 'https://aanshsingh.com',
  name: masthead.nameplate,
  image: '/social-preview-times-v1.jpg',
  imageAlt: `The front page of ${masthead.nameplate}: the nameplate, the edition line “${profile.role} · ${profile.educationLabel}”, and ${profile.name}'s name in a banner headline.`,
} as const;

export const pages = [
  {
    path: '/',
    title: `${profile.name} | ${masthead.nameplate}`,
    description: `${profile.name} is a software engineer and UCLA computer science student building developer tools, AI systems, and reliable backend software. Read about CodeGraph and TaskForge in ${masthead.nameplate}.`,
  },
  {
    path: projects[0].path,
    title: `${projects[0].name} Case Study | ${profile.name}`,
    description: `${profile.name}'s CodeGraph case study: repository exploration with Tree-sitter, Neo4j, and question-specific retrieval for an AI agent.`,
  },
  {
    path: projects[1].path,
    title: `${projects[1].name} Case Study | ${profile.name}`,
    description: `${profile.name}'s TaskForge case study: PostgreSQL task coordination, concurrent Go workers, durable attempts, retries, and lease-based recovery.`,
  },
] as const;

export function metadataFor(path: string) {
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
  const page = pages.find(page => page.path === normalized);
  return page
    ? { ...page, canonical: new URL(page.path, site.origin).href, index: true }
    : { path, title: `Page Not Found | ${profile.name}`, description: 'This page could not be found. Return to the homepage to explore CodeGraph and TaskForge.', canonical: undefined, index: false };
}

export type HeadTag = { tag: 'meta' | 'link'; attributes: Record<string, string> };

export function metadataTags(path: string): HeadTag[] {
  const page = metadataFor(path);
  const tags: HeadTag[] = [
    { tag: 'meta', attributes: { name: 'description', content: page.description } },
    { tag: 'meta', attributes: { name: 'robots', content: page.index ? 'index, follow' : 'noindex, follow' } },
    { tag: 'meta', attributes: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attributes: { property: 'og:site_name', content: site.name } },
    { tag: 'meta', attributes: { property: 'og:title', content: page.title } },
    { tag: 'meta', attributes: { property: 'og:description', content: page.description } },
    { tag: 'meta', attributes: { property: 'og:image', content: new URL(site.image, site.origin).href } },
    { tag: 'meta', attributes: { property: 'og:image:type', content: 'image/jpeg' } },
    { tag: 'meta', attributes: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attributes: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attributes: { property: 'og:image:alt', content: site.imageAlt } },
    { tag: 'meta', attributes: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: page.title } },
    { tag: 'meta', attributes: { name: 'twitter:description', content: page.description } },
    { tag: 'meta', attributes: { name: 'twitter:image', content: new URL(site.image, site.origin).href } },
    { tag: 'meta', attributes: { name: 'twitter:image:alt', content: site.imageAlt } },
  ];
  if (page.canonical) tags.push(
    { tag: 'link', attributes: { rel: 'canonical', href: page.canonical } },
    { tag: 'meta', attributes: { property: 'og:url', content: page.canonical } },
  );
  return tags;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

// Site-wide structured data: the person this site is about.
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: `${site.origin}/`,
  jobTitle: profile.role,
  image: `${site.origin}/images/aansh-singh-trim-640.jpg`,
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of California, Los Angeles', alternateName: 'UCLA', url: 'https://www.ucla.edu/' },
  sameAs: [profile.links.github, profile.links.linkedin],
} as const;

export function renderHead(path: string) {
  // JSON in a script element: escape "<" so no value can close the element.
  const jsonLd = JSON.stringify(personSchema).replace(/</g, '\\u003c');
  return `<title>${escapeHtml(metadataFor(path).title)}</title>\n` + metadataTags(path).map(({ tag, attributes }) =>
    `<${tag} data-portfolio-metadata ${Object.entries(attributes).map(([name, value]) => `${name}="${escapeHtml(value)}"`).join(' ')} />`,
  ).join('\n') + `\n<script type="application/ld+json">${jsonLd}</script>`;
}
