import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { homepage, ui, type Project } from '../content/site';

export function ProjectShowcase({ project, children }: { project: Project; children: ReactNode }) {
  const { summary, result, highlights, technologies } = project.story;
  const copy = homepage.projects;
  return <article id={project.id} className={`project-showcase ${project.id}-showcase`} aria-labelledby={`${project.id}-title`} tabIndex={-1}>
    <div className="showcase-copy showcase-intro">
      <header>
        <p className="eyebrow">{project.ownership.label}</p>
        <h3 id={`${project.id}-title`}>{project.name}</h3>
        <p className="showcase-summary">{summary}</p>
      </header>
      <div className="showcase-result">
        <p className="showcase-result-headline"><strong>{result.headline}</strong></p>
        <p className="showcase-result-context">{result.context}</p>
      </div>
      <div className="showcase-actions">
        <Link className="button" to={project.path} aria-label={copy.caseStudyLabel(project.name)}>{copy.caseStudy} <span aria-hidden="true">{ui.external}</span></Link>
        <a className="text-link" href={project.repository} aria-label={copy.githubLabel(project.name)}>{ui.github} <span aria-hidden="true">{ui.external}</span></a>
      </div>
    </div>
    {children}
    <div className="showcase-copy showcase-details">
      <ul className="showcase-highlights">{highlights.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.body}</p></li>)}</ul>
      <ul className="showcase-technologies" aria-label={copy.technologiesLabel(project.name)}>{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
    </div>
  </article>;
}
