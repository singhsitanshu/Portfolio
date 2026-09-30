import { contentReadiness, type Project } from '../content/portfolio';
import { Heading, TextLink } from '../components/ui';

export function ProjectPlaceholder({ project }: { project: Project }) {
  return <section className="intro" aria-labelledby="project-title">
    <Heading as="h1" id="project-title" eyebrow="Project / Route placeholder">{project.name}</Heading>
    <p className="lede">{project.summary}</p>
    <p className="status">{project.dates} · {contentReadiness.caseStudy}</p>
    <p><a className="text-link" href={project.repository}>View {project.name} repository <span aria-hidden="true">↗</span></a></p>
    <TextLink to="/">Return home <span aria-hidden="true">↗</span></TextLink>
  </section>;
}
