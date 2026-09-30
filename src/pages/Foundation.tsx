import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, Heading, Metric, TextLink } from '../components/ui';

export function Foundation() {
  const [showNotes, setShowNotes] = useState(false);
  const reduceMotion = useReducedMotion();
  return <>
    <section className="intro" aria-labelledby="foundation-title">
      <Heading as="h1" id="foundation-title" eyebrow="01 / Foundation preview">Good work.<br /><span className="muted">Clearly presented.</span></Heading>
      <p className="lede">A quiet framework for projects, decisions, and the evidence behind them.</p>
      <p className="status">Design system preview · Portfolio content pending verification</p>
    </section>
    <section className="section" aria-labelledby="routes-title">
      <Heading id="routes-title" eyebrow="Structure / 01">Project routes</Heading>
      <div className="project-grid">
        {['CodeGraph', 'TaskForge'].map((name, index) => <article className="panel" key={name}>
          <span className="eyebrow">0{index + 1} / Project</span>
          <Heading as="h3">{name}</Heading>
          <p>Route established. Project details and supporting evidence are pending.</p>
          <TextLink to={`/projects/${name.toLowerCase()}`}>Open {name} <span aria-hidden="true">↗</span></TextLink>
        </article>)}
      </div>
    </section>
    <section className="section" aria-labelledby="primitives-title">
      <Heading id="primitives-title" eyebrow="Components / 02">Evidence before numbers.</Heading>
      <dl className="metric-grid">
        <Metric label="Project benchmark" note="Awaiting reproducible results and methodology." />
        <Metric label="Project dates" note="Awaiting verified start and completion dates." />
      </dl>
      <div className="component-demo">
        <Button aria-expanded={showNotes} aria-controls="design-notes" onClick={() => setShowNotes(!showNotes)}>{showNotes ? 'Hide' : 'Show'} design notes <span aria-hidden="true">{showNotes ? '−' : '+'}</span></Button>
        <div id="design-notes" hidden={!showNotes}>
          {showNotes && <motion.p initial={{ opacity: reduceMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>Warm neutral surfaces, an ink foreground, and one green accent. Shared spacing and fine rules give the content room to breathe.</motion.p>}
        </div>
      </div>
    </section>
  </>;
}
