import { resume } from './resume.ts';
import { experience, masthead, profile, projects } from './site.ts';

// Production origin explicitly supplied by the user for Ticket 09.
// T-17: the share image is the newspaper front page (scripts/social-preview.mjs).
export const site = {
  origin: 'https://aanshsingh.com',
  name: masthead.nameplate,
  image: '/social-preview-times-v1.jpg',
  // Plain Markdown version of the site for AI agents (src/content/llms.ts).
  llms: '/llms.txt',
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
    { tag: 'link', attributes: { rel: 'alternate', type: 'text/markdown', href: site.llms, title: `${profile.name}: plain-text profile for AI agents` } },
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

// Structured data (schema.org JSON-LD): the person, both projects, and the
// page itself, as one @graph linked by @id. Agents read this before page text.
const ids = {
  person: `${site.origin}/#person`,
  ucla: `${site.origin}/#ucla`,
  project: (id: string) => `${site.origin}/projects/${id}#project`,
  page: (path: string) => `${new URL(path, site.origin).href}#webpage`,
};

const ucla = { '@type': 'CollegeOrUniversity', '@id': ids.ucla, name: 'University of California, Los Angeles', alternateName: 'UCLA', url: 'https://www.ucla.edu/' } as const;

export const personSchema = {
  '@type': 'Person',
  '@id': ids.person,
  name: profile.name,
  url: `${site.origin}/`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.international,
  jobTitle: profile.role,
  description: `${profile.hero.introduction} Seeking: ${profile.availability.seeking} ${profile.availability.workAuthorization} ${profile.availability.location}`,
  image: `${site.origin}/images/aansh-singh-trim-640.jpg`,
  homeLocation: [
    { '@type': 'Place', name: 'Los Angeles, CA', address: { '@type': 'PostalAddress', addressLocality: 'Los Angeles', addressRegion: 'CA', addressCountry: 'US' } },
    { '@type': 'Place', name: 'Austin, TX', address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX', addressCountry: 'US' } },
  ],
  alumniOf: ucla,
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    name: `${profile.education.degree} (expected ${profile.education.expectedGraduation})`,
    educationalLevel: 'Bachelor',
    recognizedBy: { '@id': ids.ucla },
  },
  affiliation: experience.filter(entry => entry.dates.endsWith('Present')).map(entry => ({ '@type': 'Organization', name: entry.organization })),
  knowsAbout: resume.skills.flatMap(group => group.items),
  subjectOf: { '@type': 'DigitalDocument', name: `${profile.name} résumé`, encodingFormat: 'application/pdf', url: new URL(profile.resumeUrl, site.origin).href },
  sameAs: [profile.links.github, profile.links.linkedin],
} as const;

const projectSchemas = projects.map(project => ({
  '@type': 'SoftwareSourceCode',
  '@id': ids.project(project.id),
  name: project.name,
  description: project.summary,
  url: new URL(project.path, site.origin).href,
  codeRepository: project.repository,
  programmingLanguage: resume.projects.find(entry => entry.id === project.id)?.technologies ?? [],
  keywords: project.story.technologies.join(', '),
  dateCreated: '2026',
  author: { '@id': ids.person },
  creator: { '@id': ids.person },
}));

export function structuredData(path: string) {
  const page = metadataFor(path);
  const project = projects.find(entry => entry.path === page.path);
  const webPage = page.canonical ? {
    '@type': page.path === '/' ? 'ProfilePage' : 'WebPage',
    '@id': ids.page(page.path),
    url: page.canonical,
    name: page.title,
    description: page.description,
    ...(page.path === '/' ? { mainEntity: { '@id': ids.person } } : { about: { '@id': ids.project(project!.id) }, author: { '@id': ids.person } }),
  } : undefined;
  return { '@context': 'https://schema.org', '@graph': [...(webPage ? [webPage] : []), personSchema, ...projectSchemas] };
}

// Self-hosted fonts (T-18, src/styles/fonts.css): preload each page's
// above-the-fold display faces. Only the front page sets the name banner.
export function fontPreloads(path: string) {
  const fonts = ['/fonts/unifrakturmaguntia-400-nameplate.woff2', ...(path === '/' ? ['/fonts/noto-serif-display-condensed-900-caps.woff2'] : [])];
  return fonts.map(href => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin />`).join('\n');
}

export function renderHead(path: string) {
  // JSON in a script element: escape "<" so no value can close the element.
  const jsonLd = JSON.stringify(structuredData(path)).replace(/</g, '\\u003c');
  return `${fontPreloads(path)}\n<title>${escapeHtml(metadataFor(path).title)}</title>\n` + metadataTags(path).map(({ tag, attributes }) =>
    `<${tag} data-portfolio-metadata ${Object.entries(attributes).map(([name, value]) => `${name}="${escapeHtml(value)}"`).join(' ')} />`,
  ).join('\n') + `\n<script type="application/ld+json">${jsonLd}</script>`;
}
