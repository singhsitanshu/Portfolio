import type { ReactNode } from 'react';
import type { Project } from '../content/portfolio';
import type { CaseStudyResultSummary } from '../content/case-study';
import { Heading, TextLink } from './ui';
import { Entrance } from './Motion';

type Section = { id: string; title: string };

export function sectionsById<T extends readonly Section[]>(sections: T) {
  return Object.fromEntries(sections.map(section => [section.id, section])) as Record<T[number]['id'], Section>;
}

export function CaseStudyLayout({ project, introduction, resultSummary, overview, sections, children }: {
  project: Project; introduction: string;
  resultSummary: CaseStudyResultSummary;
  overview: readonly { label: string; value: string }[];
  sections: readonly Section[]; children: ReactNode;
}) {
  return <article className="case-study" aria-labelledby="case-study-title">
    <header className="case-study-header">
      <TextLink to="/#projects">← Back to projects</TextLink>
      <Entrance><Heading as="h1" id="case-study-title" eyebrow={project.ownership.label}>{project.name}</Heading></Entrance>
      <p className="case-study-lede">{introduction}</p>
      <section className="case-study-result-summary" id={resultSummary.id} tabIndex={-1} aria-labelledby={`${resultSummary.id}-title`}>
        <h2 id={`${resultSummary.id}-title`}>{resultSummary.title}</h2>
        {resultSummary.context && <p className="case-study-result-context">{resultSummary.context}</p>}
        <dl className="case-study-result-metrics">{resultSummary.metrics.map(metric => <div key={metric.label}>
          <dt>{metric.label}</dt><dd><strong>{metric.value}</strong><p>{metric.detail}</p></dd>
        </div>)}</dl>
        {resultSummary.note && <p>{resultSummary.note}</p>}
        {resultSummary.scope && <p className="case-study-result-scope">{resultSummary.scope}</p>}
        <TextLink to={`${project.path}#${resultSummary.evidence.id}`}>{resultSummary.evidence.label} ↓</TextLink>
      </section>
      <p className="case-study-ownership">{project.ownership.statement} {project.ownership.scope}</p>
      <dl className="case-study-overview">{overview.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      <a className="text-link" href={project.repository}>View {project.name} repository ↗</a>
    </header>
    <nav className="case-study-nav" aria-label="Case study sections"><TextLink to={`${project.path}#${resultSummary.id}`}>{resultSummary.title}</TextLink>{sections.map(section => <TextLink key={section.id} to={`${project.path}#${section.id}`}>{section.title}</TextLink>)}</nav>
    {children}
  </article>;
}

export function CaseStudySection({ section, children }: { section: Section; children: ReactNode }) {
  return <section className="section case-study-section" id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-title`}>
    <Entrance><Heading id={`${section.id}-title`}>{section.title}</Heading></Entrance>
    <div className="case-study-section-body">{children}</div>
  </section>;
}
