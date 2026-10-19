import type { ReactNode } from 'react';
import { article, profile, type Project } from '../content/site';
import type { CaseStudyResultSummary } from '../content/case-study';
import { TextLink } from './ui';
import { Byline, Dateline, Deck, Kicker } from './print';

type Section = { id: string; title: string };

export function sectionsById<T extends readonly Section[]>(sections: T) {
  return Object.fromEntries(sections.map(section => [section.id, section])) as Record<T[number]['id'], Section>;
}

// Inside-page feature article (T-13): kicker, headline, deck, byline and
// dateline, the measured result, then sections set in two columns on desktop
// beside an "In this article" index.
export function CaseStudyLayout({ project, introduction, resultSummary, overview, sections, children }: {
  project: Project; introduction: string;
  resultSummary: CaseStudyResultSummary;
  overview: readonly { label: string; value: string }[];
  sections: readonly Section[]; children: ReactNode;
}) {
  return <article className="case-study" aria-labelledby="case-study-title">
    <header className="case-study-header">
      <TextLink className="article-back" to="/#projects">{article.back}</TextLink>
      <Kicker>{project.story.kicker}</Kicker>
      <h1 id="case-study-title" className="headline-lead article-headline">{project.name}</h1>
      <Deck className="case-study-lede">{introduction}</Deck>
      <div className="article-credits">
        <Byline className="byline-with-photo"><img className="byline-photo" src={profile.hero.portrait.srcSet.split(' ')[0]} alt="" width={profile.hero.portrait.width} height={profile.hero.portrait.height} loading="lazy" decoding="async" />{project.story.byline}</Byline>
        <Dateline>{article.dateline(project.dates)}</Dateline>
      </div>
      <section className="case-study-result-summary" id={resultSummary.id} tabIndex={-1} aria-labelledby={`${resultSummary.id}-title`}>
        <h2 id={`${resultSummary.id}-title`} className="label">{resultSummary.title}</h2>
        {resultSummary.context && <p className="case-study-result-context">{resultSummary.context}</p>}
        <dl className="case-study-result-metrics">{resultSummary.metrics.map(metric => <div key={metric.label}>
          <dt>{metric.label}</dt><dd><strong>{metric.value}</strong><p>{metric.detail}</p></dd>
        </div>)}</dl>
        {resultSummary.note && <p className="case-study-result-note">{resultSummary.note}</p>}
        {resultSummary.scope && <p className="case-study-result-scope">{resultSummary.scope}</p>}
        <TextLink to={`${project.path}#${resultSummary.evidence.id}`}>{resultSummary.evidence.label} ↓</TextLink>
      </section>
      <p className="case-study-ownership">{project.ownership.statement} {project.ownership.scope}</p>
      <dl className="case-study-overview">{overview.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
      <a className="text-link" href={project.repository}>{article.repository(project.name)}</a>
    </header>
    <div className="article-columns">
      <nav className="case-study-nav" aria-label={article.navLabel}>
        <p className="label" aria-hidden="true">{article.navHeading}</p>
        <TextLink to={`${project.path}#${resultSummary.id}`}>{resultSummary.title}</TextLink>
        {sections.map(section => <TextLink key={section.id} to={`${project.path}#${section.id}`}>{section.title}</TextLink>)}
      </nav>
      <div className="article-sections">{children}</div>
    </div>
  </article>;
}

export function CaseStudySection({ section, children }: { section: Section; children: ReactNode }) {
  return <section className="case-study-section" id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-title`}>
    <h2 id={`${section.id}-title`} className="section-head">{section.title}</h2>
    <div className="case-study-section-body">{children}</div>
  </section>;
}

// A diagram or chart in ink, with its caption and a "Graphic" credit.
export function ArticleGraphic({ caption, className = '', labelledBy, children }: { caption: ReactNode; className?: string; labelledBy?: string; children: ReactNode }) {
  return <figure className={`article-graphic ${className}`} aria-labelledby={labelledBy}>
    {children}
    <figcaption><span className="caption">{caption}</span><span className="credit">{article.graphicCredit}</span></figcaption>
  </figure>;
}
