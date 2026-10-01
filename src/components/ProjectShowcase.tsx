import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../content/portfolio';

export function ProjectShowcase({ project, summary, highlights, technologies, children }: {
  project: Project;
  summary: string;
  highlights: readonly { title: string; body: string }[];
  technologies: readonly string[];
  children: ReactNode;
}) {
  return <article id={project.id} className={`project-showcase ${project.id}-showcase`} aria-labelledby={`${project.id}-title`} tabIndex={-1}>
    {children}
    <div className="showcase-copy">
      <header>
        <p className="eyebrow">Personal project / {project.dates}</p>
        <h3 id={`${project.id}-title`}>{project.name}</h3>
        <p className="showcase-summary">{summary}</p>
      </header>
      <div className="showcase-actions">
        <Link className="button" to={project.path} aria-label={`Read ${project.name} case study`}>Read case study <span aria-hidden="true">↗</span></Link>
        <a className="text-link" href={project.repository} aria-label={`${project.name} on GitHub`}>GitHub <span aria-hidden="true">↗</span></a>
      </div>
      <ul className="showcase-highlights">{highlights.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.body}</p></li>)}</ul>
      <ul className="showcase-technologies" aria-label={`${project.name} technologies`}>{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
    </div>
  </article>;
}
