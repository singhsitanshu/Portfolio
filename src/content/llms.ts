// /llms.txt: a plain Markdown version of the site for AI agents and automated
// tools (https://llmstxt.org). Built by scripts/prerender.mjs from the same
// content modules as the pages, so it cannot drift from them.
// Imports keep explicit .ts extensions: Node scripts load this module directly.
import { codegraphResultSummary } from './codegraph.ts';
import { pages, site } from './metadata.ts';
import { resume } from './resume.ts';
import { experience, masthead, profile, projects } from './site.ts';
import { taskforgeFeature } from './taskforge.ts';

const absolute = (path: string) => new URL(path, site.origin).href;
const list = (items: readonly string[]) => items.map(item => `- ${item}`).join('\n');

// Measured results per project, with the scope the case studies attach to them.
const measurements: Record<(typeof projects)[number]['id'], string[]> = {
  codegraph: [
    ...codegraphResultSummary.metrics.map(metric => `${metric.value} ${metric.label}: ${metric.detail}.`),
    `${codegraphResultSummary.note} ${codegraphResultSummary.scope}`,
  ],
  taskforge: [
    ...taskforgeFeature.benchmarks.metrics.map(metric => `${metric.value} ${metric.label} (${metric.experiment}): ${metric.context}`),
    `${taskforgeFeature.benchmarks.host} ${taskforgeFeature.benchmarks.qualification}`,
  ],
};

export function renderLlmsTxt() {
  const resumeOrganizations = new Set<string>(resume.experience.map(entry => entry.organization));
  const additional = experience.filter(entry => !resumeOrganizations.has(entry.organization));

  return [
    `# ${profile.name}`,
    `> ${profile.role} and ${profile.educationLabel} student (${profile.education.degree}, expected graduation ${profile.education.expectedGraduation}) building developer tools, AI systems, and reliable backend software.`,
    `This is the plain-text version of ${absolute('/')} for AI agents and automated tools: the full text of the résumé, every role listed on the site, and both projects with their measured results. It is generated from the same source as the website on every build. The website is styled as a newspaper called "${masthead.nameplate}"; its nameplate, edition line, volume number and printed date are decoration, not facts about ${profile.name}.`,

    '## Contact and links',
    list([
      `Email: ${profile.email}`,
      `Phone: ${profile.phone.display}`,
      `Website: ${absolute('/')}`,
      `GitHub: ${profile.links.github}`,
      `LinkedIn: ${profile.links.linkedin}`,
      `Résumé (PDF): ${absolute(profile.resumeUrl)}`,
    ]),

    '## Availability and eligibility',
    list([
      `Seeking: ${profile.availability.seeking}`,
      `Work authorization: ${profile.availability.workAuthorization}`,
      `Location: ${profile.availability.location}`,
      `Education: ${profile.education.degree}, ${profile.education.institution}; expected graduation ${profile.education.expectedGraduation}.`,
    ]),

    '## Résumé',
    `The text of the résumé PDF (${absolute(profile.resumeUrl)}), in its own words.`,
    '### Education',
    resume.education.map(entry => `**${entry.institution}**, ${entry.school} (${entry.location})\n${entry.degree}. ${entry.dates}.`).join('\n\n'),
    '### Experience',
    resume.experience.map(entry => `#### ${entry.role}, ${entry.organization}\n${entry.location} · ${entry.dates}\n\n${list(entry.bullets)}`).join('\n\n'),
    '### Projects',
    resume.projects.map(entry => `#### ${entry.title}\nTechnologies: ${entry.technologies.join(', ')}\n\n${list(entry.bullets)}`).join('\n\n'),
    '### Technical skills',
    list(resume.skills.map(group => `${group.category}: ${group.items.join(', ')}`)),

    '## Additional experience',
    'Roles listed on the website but not on the résumé.',
    additional.map(entry => `### ${entry.role}, ${entry.organization}\n${entry.category} · ${entry.dates}\n\n${list(entry.contributions)}`).join('\n\n'),

    '## Projects in depth',
    projects.map(project => [
      `### ${project.name}`,
      project.summary,
      list([
        `Case study: ${absolute(project.path)}`,
        `Source code: ${project.repository}`,
        `When and how: ${project.ownership.label}. ${project.ownership.statement}`,
        `Scope of work: ${project.ownership.scope}`,
        `Built with: ${project.story.technologies.join(', ')}`,
      ]),
      `Measured results:\n\n${list(measurements[project.id])}`,
    ].join('\n\n')).join('\n\n'),

    '## Pages',
    list(pages.map(page => `[${page.title}](${absolute(page.path)}): ${page.description}`)),
  ].join('\n\n') + '\n';
}
