import type { ReactNode } from 'react';
import type { Project } from '../content/portfolio';
import { Heading, TextLink } from './ui';
import { Entrance } from './Motion';

type Section = { id: string; title: string };

export function CaseStudyLayout({ project, introduction, overview, sections, children }: {
  project: Project; introduction: string;
  overview: readonly { label: string; value: string }[];
  sections: readonly Section[]; children: ReactNode;
}) {
  return <article className="case-study" aria-labelledby="case-study-title">
    <header className="case-study-header">
      <TextLink to={`/#${project.id}`}>← Back to homepage work</TextLink>
      <Entrance><Heading as="h1" id="case-study-title" eyebrow={`Case study / ${project.dates}`}>{project.name}</Heading></Entrance>
      <p className="case-study-lede">{introduction}</p>
      <dl className="case-study-overview">{overview.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      <a className="text-link" href={project.repository}>View {project.name} repository ↗</a>
    </header>
    <nav className="case-study-nav" aria-label="Case study sections">{sections.map(section => <TextLink key={section.id} to={`${project.path}#${section.id}`}>{section.title}</TextLink>)}</nav>
    {children}
  </article>;
}

export function CaseStudySection({ section, children }: { section: Section; children: ReactNode }) {
  return <section className="section case-study-section" id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-title`}>
    <Entrance><Heading id={`${section.id}-title`}>{section.title}</Heading></Entrance>
    <div className="case-study-section-body">{children}</div>
  </section>;
}
