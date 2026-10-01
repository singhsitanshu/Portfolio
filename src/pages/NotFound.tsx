import { Heading, TextLink } from '../components/ui';

export function NotFound() {
  return <section className="intro" aria-labelledby="not-found-title">
    <Heading as="h1" id="not-found-title" eyebrow="404 / Page not found">Page not found.</Heading>
    <p className="lede">That page isn’t here. You can return home or explore the selected projects.</p>
    <div className="actions"><TextLink to="/">Return home</TextLink><TextLink to="/#projects">View Projects</TextLink></div>
  </section>;
}
