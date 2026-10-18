import type { ReactNode } from 'react';
import { experience, profile, projects } from '../content/site';

// Development-only reference for the print system. Routed only when
// import.meta.env.DEV is true, never prerendered, and noindex like any
// unlisted path. Sample text is drawn from the content file.
const [codegraph, taskforge] = projects;

function Specimen({ name, children }: { name: string; children: ReactNode }) {
  return <div className="styleguide-specimen"><p className="credit">{name}</p>{children}</div>;
}

export function Styleguide() {
  return <div className="paper styleguide">
    <h1 className="headline-lead">Styleguide</h1>
    <p className="deck">Every print style, grid and primitive in The Aansh Times, rendered from tokens.</p>

    <section className="styleguide-section" aria-labelledby="styleguide-type">
      <h2 className="section-head" id="styleguide-type">Typography</h2>
      <Specimen name=".kicker"><p className="kicker">Developer Tools</p></Specimen>
      <Specimen name=".headline-lead"><p className="headline-lead">{codegraph.name}: {codegraph.summary}</p></Specimen>
      <Specimen name=".headline-secondary"><p className="headline-secondary">{taskforge.name}: {taskforge.story.summary}</p></Specimen>
      <Specimen name=".headline-brief"><p className="headline-brief">{experience[0].role}, {experience[0].organization}</p></Specimen>
      <Specimen name=".section-head"><p className="section-head">Business &amp; Campus</p></Specimen>
      <Specimen name=".deck"><p className="deck">{profile.hero.introduction}</p></Specimen>
      <Specimen name=".byline"><p className="byline">By {profile.name} · {codegraph.ownership.label}</p></Specimen>
      <Specimen name=".dateline"><p className="dateline">Los Angeles, {experience[0].dates}</p></Specimen>
      <Specimen name=".label"><p className="label">{profile.role} · {profile.educationLabel}</p></Specimen>
      <Specimen name=".body-copy.drop-cap">
        <div className="body-copy drop-cap">
          <p>{codegraph.ownership.statement} {codegraph.ownership.scope} {codegraph.summary}</p>
          <p>{taskforge.ownership.statement} {taskforge.ownership.scope} {taskforge.summary}</p>
        </div>
      </Specimen>
      <Specimen name=".caption + .credit"><p className="caption">{profile.hero.portrait.alt} <span className="credit">Graphic</span></p></Specimen>
      <Specimen name=".mono"><p className="mono">{codegraph.story.technologies.join(' · ')}</p></Specimen>
    </section>
  </div>;
}
