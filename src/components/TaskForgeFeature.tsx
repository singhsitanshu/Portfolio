import type { Project } from '../content/site';
import { Figure } from './print';
import { FrontStory } from './FrontStory';

// T-14: the conceptual view as an ink infographic: queue, workers and
// outcomes as ordered stages, with the retry path written out.
export function TaskForgeFeature({ project }: { project: Project & { id: 'taskforge' } }) {
  const visual = project.story.visual;
  return <FrontStory project={project} size="secondary" className="front-second rule-lg">
    <Figure className="infographic" caption={<><strong>{visual.label}.</strong> {visual.note}</>} credit={visual.credit}>
      <ol className="infographic-flow">
        <li className="infographic-stage">
          <p className="infographic-label">{visual.queue}</p>
          <div className="infographic-queue" aria-hidden="true"><i /><i /><i /></div>
          <p className="infographic-node">{visual.queueCaption}</p>
        </li>
        <li className="infographic-stage">
          <p className="infographic-label">{visual.workers}</p>
          <div className="infographic-workers" aria-hidden="true"><span /><span /></div>
          <p className="infographic-node">{visual.workersCaption}</p>
        </li>
        <li className="infographic-stage">
          <ul className="infographic-outcomes">
            <li><span aria-hidden="true">✓ </span>{visual.completion}</li>
            <li><span aria-hidden="true">↶ </span>{visual.retry}</li>
          </ul>
        </li>
      </ol>
      <p className="infographic-return"><span aria-hidden="true">↶ </span>{visual.retryReturn}</p>
    </Figure>
  </FrontStory>;
}
