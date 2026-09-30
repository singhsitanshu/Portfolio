import { Heading, TextLink } from '../components/ui';

export function ProjectPlaceholder({ name }: { name: string }) {
  return <section className="intro" aria-labelledby="project-title">
    <Heading as="h1" id="project-title" eyebrow="Project / Route placeholder">{name}</Heading>
    <p className="lede">This route is ready for its case study.</p>
    <p className="status">Content pending: verified summary, repository URL, dates, and benchmark evidence.</p>
    <TextLink to="/">Return to foundation <span aria-hidden="true">↗</span></TextLink>
  </section>;
}
