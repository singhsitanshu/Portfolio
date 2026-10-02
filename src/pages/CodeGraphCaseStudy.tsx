import { CaseStudyLayout, CaseStudySection, sectionsById } from '../components/CaseStudyLayout';
import { TextLink } from '../components/ui';
import { codegraphCaseStudy as content } from '../content/codegraph-case-study';
import { codegraphFeature, codegraphResultSummary } from '../content/codegraph';
import type { Project } from '../content/portfolio';

export function CodeGraphCaseStudy({ project }: { project: Project }) {
  const { problem, architecture, execution, challenges, decisions, correctness, results, lessons, repository } = sectionsById(content.sections);
  const result = codegraphFeature.result;
  return <CaseStudyLayout project={project} introduction={content.introduction} resultSummary={codegraphResultSummary} overview={content.overview} sections={content.sections}>
    <CaseStudySection section={problem}><p>{content.problem}</p></CaseStudySection>
    <CaseStudySection section={architecture}>
      <p>{content.system}</p>
      <figure className="case-study-architecture" aria-labelledby="architecture-figure-title">
        <p className="eyebrow" id="architecture-figure-title">{content.architecture.title}</p>
        <ol>{content.architecture.layers.map(layer => <li key={layer.label}>
          <div className="case-study-layer"><p className="eyebrow">{layer.label}</p><h3>{layer.title}</h3><p>{layer.detail}</p></div>
          {'connection' in layer && <p className="case-study-connection">{layer.connection}</p>}
        </li>)}</ol>
        <figcaption>{content.architecture.caption}</figcaption>
      </figure>
    </CaseStudySection>
    <CaseStudySection section={execution}>
      <ol className="case-study-walkthrough">{content.execution.map((step, index) => <li key={step.title}><span className="eyebrow" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
    </CaseStudySection>
    <CaseStudySection section={challenges}><div className="case-study-cards">{content.challenges.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div></CaseStudySection>
    <CaseStudySection section={correctness}>
      <p>{content.correctness.introduction}</p>
      <dl className="case-study-evidence">{content.correctness.evidence.map(item => <div key={item.label}><dt>{item.label}</dt><dd><strong>{item.value}</strong><p>{item.detail}</p></dd></div>)}</dl>
      <p>{content.correctness.controls}</p>
    </CaseStudySection>
    <CaseStudySection section={results}>
      <div className="codegraph-result">
        <div><p className="eyebrow">{result.label}</p><p className="context-comparison"><span>{result.baseline}</span><span className="context-arrow" aria-hidden="true">→</span><span className="sr-only">to</span><strong>{result.focused}</strong></p><p className="context-unit">{result.unit}</p></div>
        <dl className="context-reduction"><dt>{result.reductionLabel}</dt><dd>{result.reduction}</dd></dl>
        <p className="context-evidence">{result.note}</p>
      </div>
      <p>{content.results.baseline}</p><p>{content.results.context}</p><p className="case-study-formula">{content.results.formula}</p><p>{content.results.limits}</p>
    </CaseStudySection>
    <CaseStudySection section={decisions}><div className="case-study-decisions">{content.decisions.map(item => <div key={item.title}><h3>{item.title}</h3><p className="case-study-decision-choice">{item.choice}</p><dl><dt>Benefit</dt><dd>{item.benefit}</dd><dt>Accepted limitation</dt><dd>{item.tradeoff}</dd></dl></div>)}</div></CaseStudySection>
    <CaseStudySection section={lessons}><div className="case-study-cards">{content.lessons.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>)}</div></CaseStudySection>
    <CaseStudySection section={repository}><p>{content.repository}</p><div className="actions"><a className="text-link" href={project.repository}>View {project.name} repository ↗</a><TextLink to="/#projects">← Back to projects</TextLink></div></CaseStudySection>
  </CaseStudyLayout>;
}
