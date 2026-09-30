import { Heading, TextLink } from './ui';
import { taskforgeFeature as content } from '../content/taskforge';
import type { Project } from '../content/portfolio';

export function TaskForgeFeature({ project }: { project: Project }) {
  return <section id={project.id} className="section taskforge-feature" aria-labelledby="taskforge-title" tabIndex={-1}>
    <div className="project-meta"><span className="eyebrow">02 / Selected work</span><span className="eyebrow">{project.dates}</span></div>
    <div className="taskforge-introduction">
      <div><Heading id="taskforge-title">{project.name}</Heading><p className="taskforge-positioning">{content.positioning}</p></div>
      <div><p className="taskforge-question">{content.question}</p><p className="muted">{content.introduction}</p></div>
    </div>
    <figure className="taskforge-flow" aria-labelledby="taskforge-flow-title">
      <p id="taskforge-flow-title" className="eyebrow">{content.visual.title}</p>
      <ol className="taskforge-stages">
        {content.visual.stages.map((stage, index) => <li key={stage.title}>
          <span className={`taskforge-symbol taskforge-symbol-${stage.symbol}`} aria-hidden="true">
            {stage.symbol === 'claim' ? '✓' : stage.symbol === 'lease' ? '↻' : stage.symbol === 'outcome' ? '↗' : <><i /><i /><i /></>}
          </span>
          <span className="eyebrow taskforge-step">0{index + 1}</span>
          <h3>{stage.title}</h3><p>{stage.detail}</p>
          {index < content.visual.stages.length - 1 && <span className="taskforge-arrow" aria-hidden="true" />}
        </li>)}
      </ol>
      <figcaption>{content.visual.caption}</figcaption>
      <p className="taskforge-recovery">{content.visual.recovery}</p>
      <p className="taskforge-visual-note">{content.visual.note}</p>
    </figure>
    <div className="taskforge-explanations">
      {content.explanations.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}
    </div>
    <div className="taskforge-benchmarks" aria-labelledby="taskforge-benchmarks-title">
      <Heading as="h3" id="taskforge-benchmarks-title">{content.benchmarks.title}</Heading>
      <div className="taskforge-metric-grid">
        {content.benchmarks.metrics.map((metric) => <div className="taskforge-benchmark" key={metric.label}>
          <p className="eyebrow">{metric.experiment}</p>
          <dl><dt>{metric.label}</dt><dd>{metric.value}</dd></dl>
          <p className="taskforge-metric-context">{metric.context}</p>
        </div>)}
      </div>
      <p className="taskforge-host">{content.benchmarks.host}</p>
      <p className="taskforge-qualification">{content.benchmarks.qualification}</p>
    </div>
    <div className="taskforge-footer">
      <p className="taskforge-technologies"><span className="eyebrow">Built with</span>{content.technologies.join(' · ')}</p>
      <TextLink to={project.path}>{content.linkLabel} <span aria-hidden="true">↗</span></TextLink>
    </div>
  </section>;
}
