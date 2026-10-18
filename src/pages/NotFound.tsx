import { Deck, JumpLink, Kicker } from '../components/print';
import { notFound } from '../content/site';

export function NotFound() {
  return <section className="not-found" aria-labelledby="not-found-title">
    <Kicker>{notFound.kicker}</Kicker>
    <h1 id="not-found-title" className="headline-lead">{notFound.title}</h1>
    <Deck>{notFound.lede}</Deck>
    <div className="not-found-links"><JumpLink to="/" label={notFound.homeLabel}>{notFound.home}</JumpLink><JumpLink to="/#projects" label={notFound.projectsLabel}>{notFound.projects}</JumpLink></div>
  </section>;
}
