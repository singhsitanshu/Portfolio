import { CaseStudyLayout, CaseStudySection } from '../components/CaseStudyLayout';
import { TextLink } from '../components/ui';
import { taskforgeCaseStudy as content } from '../content/taskforge-case-study';
import { taskforgeFeature } from '../content/taskforge';
import type { Project } from '../content/portfolio';

export function TaskForgeCaseStudy({ project }: { project: Project }) {
  const [system, submission, claiming, execution, recovery, benchmarks, tradeoffs, repository] = content.sections;
  return <CaseStudyLayout project={project} introduction={content.introduction} overview={content.overview} sections={content.sections}>
    <CaseStudySection section={system}>
      <p>{content.system}</p>
      <figure className="case-study-architecture" aria-labelledby="taskforge-architecture-title">
        <p className="eyebrow" id="taskforge-architecture-title">{content.architecture.title}</p>
        <ol>{content.architecture.layers.map(layer => <li key={layer.label}><div className="case-study-layer"><p className="eyebrow">{layer.label}</p><h3>{layer.title}</h3><p>{layer.body}</p></div>{'connection' in layer && <p className="case-study-connection">{layer.connection}</p>}</li>)}</ol>
        <figcaption>{content.architecture.caption}</figcaption>
      </figure>
    </CaseStudySection>
    <CaseStudySection section={submission}><div className="case-study-cards">{content.submission.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div></CaseStudySection>
    <CaseStudySection section={claiming}>
      <p>{content.claiming.introduction}</p>
      <ol className="case-study-walkthrough">{content.claiming.example.map((step, index) => <li key={step.title}><span className="eyebrow" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
      <p className="case-study-note">{content.claiming.boundary}</p>
    </CaseStudySection>
    <CaseStudySection section={execution}>
      {content.execution.paths.map(path => <div className="taskforge-execution-path" key={path.title}><h3>{path.title}</h3><ol className="case-study-walkthrough">{path.steps.map((step, index) => <li key={step.title}><span className="eyebrow" aria-hidden="true">0{index + 1}</span><div><h4>{step.title}</h4><p>{step.body}</p></div></li>)}</ol></div>)}
      <p>{content.execution.retry}</p><p>{content.execution.history}</p>
    </CaseStudySection>
    <CaseStudySection section={recovery}>
      <div className="case-study-cards">{content.recovery.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
      <div role="note" className="case-study-missing" aria-label="Execution guarantee"><p>{content.guarantee}</p></div>
    </CaseStudySection>
    <CaseStudySection section={benchmarks}>
      <p>{content.benchmarks.methodology}</p><p>{content.benchmarks.configuration}</p>
      <p>{content.benchmarks.limits}</p><p className="case-study-note">{taskforgeFeature.benchmarks.host}</p>
      <p className="case-study-formula">{content.benchmarks.formula}</p><p>{content.benchmarks.aggregation}</p>
      {content.benchmarks.charts.map(chart => <figure className="taskforge-benchmark-chart" key={chart.id} aria-labelledby={`${chart.id}-chart-title`}>
        <h3 id={`${chart.id}-chart-title`}>{chart.title}</h3><p className="taskforge-chart-unit">{chart.unit}</p>
        <div className="taskforge-chart-scale" aria-hidden="true"><span>0</span><span>{chart.maximum} tasks/sec</span></div>
        <ol>{chart.rows.map(row => <li key={row.workers}><div className="taskforge-chart-label"><span>{row.workers} {row.workers === 1 ? 'worker' : 'workers'}</span><strong>{row.value.toFixed(3)} <span className="sr-only">tasks/sec</span></strong></div><div className="taskforge-chart-track" aria-hidden="true"><div style={{ width: `${row.value / chart.maximum * 100}%` }} /></div></li>)}</ol>
        <figcaption>{chart.caption}<span className="taskforge-chart-source">3 trials per configuration</span></figcaption>
      </figure>)}
      <dl className="case-study-evidence">{content.benchmarks.failures.map(item => <div key={item.label}><dt>{item.label}</dt><dd><strong>{item.value}</strong><p>{item.detail}</p></dd></div>)}</dl>
      <p>{content.benchmarks.recoveryTiming}</p>
    </CaseStudySection>
    <CaseStudySection section={tradeoffs}><div className="case-study-cards">{content.tradeoffs.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.benefit}</p><p>{item.tradeoff}</p><p className="taskforge-lesson">{item.lesson}</p></div>)}</div></CaseStudySection>
    <CaseStudySection section={repository}><p>{content.repository}</p><div className="actions"><a className="text-link" href={project.repository}>View {project.name} repository ↗</a><TextLink to="/#projects">← Back to projects</TextLink></div></CaseStudySection>
  </CaseStudyLayout>;
}
