import { Heading, TextLink } from './ui';
import { codegraphFeature as content } from '../content/codegraph';
import type { Project } from '../content/portfolio';
import { Entrance, MotionRule, SequencePulse, SequenceSymbol, useDiagramSequence } from './Motion';

export function CodeGraphFeature({ project }: { project: Project }) {
  const sequence = useDiagramSequence(content.visual.stages.length);
  return <section id={project.id} className="section codegraph-feature" aria-labelledby="codegraph-title" tabIndex={-1}>
    <div className="project-meta"><span className="eyebrow">01 / Selected work</span><span className="eyebrow">{project.dates}</span></div>
    <div className="codegraph-introduction">
      <div><Entrance><Heading id="codegraph-title">{project.name}</Heading></Entrance><p className="codegraph-positioning">{content.positioning}</p></div>
      <div><p className="codegraph-question">{content.question}</p><p className="muted">{content.problem}</p><p className="codegraph-system">{content.system}</p></div>
    </div>
    <figure ref={sequence.ref} className="codegraph-flow" aria-labelledby="codegraph-flow-title" data-sequence-state={sequence.state} data-sequence-step={sequence.phase}>
      <p id="codegraph-flow-title" className="eyebrow">{content.visual.title}</p>
      <ol className="codegraph-stages">
        {content.visual.stages.map((stage, index) => <li key={stage.title}>
          <SequenceSymbol className={`flow-symbol flow-symbol-${stage.symbol}`} active={sequence.active && sequence.phase === index} complete={sequence.phase > index}>{stage.symbol === 'function' ? 'ƒ' : stage.symbol === 'agent' ? '◎' : ''}</SequenceSymbol>
          <span className="flow-step eyebrow">0{index + 1}</span>
          <h3>{stage.title}</h3><p>{stage.detail}</p>
          {index < content.visual.stages.length - 1 && <span className="flow-arrow" aria-hidden="true"><SequencePulse active={sequence.active && sequence.phase === index} /></span>}
        </li>)}
      </ol>
      <figcaption>{content.visual.caption}</figcaption>
    </figure>
    <div className="codegraph-result">
      <div>
        <p className="eyebrow">{content.result.label}</p>
        <p className="context-comparison"><span>{content.result.baseline}</span><span className="context-arrow" aria-hidden="true">→</span><span className="sr-only">to</span><strong>{content.result.focused}</strong></p>
        <p className="context-unit">{content.result.unit}</p>
      </div>
      <dl className="context-reduction"><dt>{content.result.reductionLabel}</dt><dd>{content.result.reduction}</dd></dl>
      <p className="context-evidence">{content.result.note}</p>
      <MotionRule className="metric-motion" />
    </div>
    <div className="codegraph-explanations">
      {content.explanations.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}
    </div>
    <div className="codegraph-agent"><p className="eyebrow">{content.agent.label}</p><p>{content.agent.body}</p></div>
    <div className="codegraph-footer">
      <p className="codegraph-technologies"><span className="eyebrow">Built with</span>{content.technologies.join(' · ')}</p>
      <TextLink to={project.path}>{content.linkLabel} <span aria-hidden="true">↗</span></TextLink>
    </div>
  </section>;
}
