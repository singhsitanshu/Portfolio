import type { ReactNode } from 'react';
import { experience, profile, projects } from '../content/site';
import { codegraphFeature } from '../content/codegraph';
import { Box, Byline, Dateline, Deck, Figure, Headline, JumpLink, Kicker, PullQuote, Rule } from '../components/print';

// Development-only reference for the print system. Routed only when
// import.meta.env.DEV is true, never prerendered, and noindex like any
// unlisted path. Sample text is drawn from the content file.
const [codegraph, taskforge] = projects;

function Specimen({ name, children }: { name: string; children: ReactNode }) {
  return <div className="styleguide-specimen"><p className="credit">{name}</p>{children}</div>;
}

export function Styleguide() {
  return <div className="paper paper-grain styleguide">
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

    <section className="styleguide-section" aria-labelledby="styleguide-grid">
      <h2 className="section-head" id="styleguide-grid">Grid: a four-story page</h2>
      <p className="caption">12 columns at 1100px+, 6 at 700–1099px, 1 below 700px. Stories collapse in source order.</p>
      <div className="np-grid styleguide-grid">
        <article className="span-md-6 span-lg-6">
          <p className="kicker">Developer Tools</p>
          <h3 className="headline-lead">{codegraph.name}</h3>
          <div className="body-copy"><p>{codegraph.ownership.statement} {codegraph.ownership.scope}</p></div>
          <p className="credit">span-md-6 · span-lg-6</p>
        </article>
        <article className="span-md-3 span-lg-3 rule-lg">
          <p className="kicker">Distributed Systems</p>
          <h3 className="headline-secondary">{taskforge.name}</h3>
          <div className="body-copy"><p>{taskforge.summary}</p></div>
          <p className="credit">span-md-3 · span-lg-3 · rule-lg</p>
        </article>
        <article className="span-md-3 span-lg-3 rule-md">
          <p className="kicker">Campus</p>
          <h3 className="headline-brief">{experience[0].role}, {experience[0].organization}</h3>
          <div className="body-copy"><p>{experience[0].contributions[0]}</p></div>
          <p className="credit">span-md-3 · span-lg-3 · rule-md</p>
        </article>
        <article className="span-md-6 span-lg-12">
          <h3 className="headline-brief">{experience[2].role}, {experience[2].organization}</h3>
          <div className="body-copy"><p>{experience[2].contributions.join(' ')}</p></div>
          <p className="credit">span-md-6 · span-lg-12</p>
        </article>
      </div>
    </section>

    <section className="styleguide-section" aria-labelledby="styleguide-primitives">
      <h2 className="section-head" id="styleguide-primitives">Print primitives</h2>
      <Specimen name="Rule: hairline · heavy · double"><Rule /><Rule variant="heavy" /><Rule variant="double" /></Specimen>
      <Specimen name="Kicker · Headline · Deck · Byline · Dateline">
        <Kicker>Developer Tools</Kicker>
        <Headline as="h3" size="lead">{codegraph.name}</Headline>
        <Deck>{codegraph.story.summary}</Deck>
        <Byline>By {profile.name} · {codegraph.ownership.label}</Byline>
        <Dateline>Los Angeles, {codegraph.dates}</Dateline>
      </Specimen>
      <Specimen name="PullQuote"><PullQuote quote={codegraph.story.result.headline} attribution={`${codegraphFeature.result.baseline} → ${codegraphFeature.result.focused} tokens/query`} /></Specimen>
      <Specimen name="Figure">
        <Figure caption={profile.hero.portrait.alt} credit="Graphic"><div className="styleguide-figure-well" /></Figure>
      </Specimen>
      <Specimen name="Box"><Box><p className="label">{profile.education.institution}</p><p className="caption">{profile.education.degree} · {profile.education.expectedGraduation}</p></Box></Specimen>
      <Specimen name="JumpLink"><JumpLink to={codegraph.path}>{codegraph.name} case study</JumpLink></Specimen>
      <Specimen name=".paper-grain"><p className="caption">This page carries the grain overlay: under 2 KB of inline SVG, fixed, pointer-events: none.</p></Specimen>
    </section>
  </div>;
}
