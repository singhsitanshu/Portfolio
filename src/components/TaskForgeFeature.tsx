import type { Project } from '../content/site';
import { FrontStory } from './FrontStory';

export function TaskForgeFeature({ project }: { project: Project & { id: 'taskforge' } }) {
  const visual = project.story.visual;
  return <FrontStory project={project} size="secondary" className="front-second span-md-3 rule-md">
    <figure className="showcase-visual coordination-visual" aria-labelledby="taskforge-concept-caption">
      <div className="coordination-map">
        <div className="queue-preview">
          <p className="visual-label">{visual.queue} <span aria-hidden="true">→</span></p>
          <div className="queue-items" aria-hidden="true"><i /><i /><i /></div>
          <p className="queue-caption">{visual.queueCaption}</p>
        </div>
        <div className="worker-preview">
          <p className="visual-label">{visual.workers}</p>
          <div className="worker-items" aria-hidden="true"><span /><span /></div>
          <p className="queue-caption">{visual.workersCaption}</p>
        </div>
        <div className="outcome-preview"><p><span aria-hidden="true">✓</span> {visual.completion}</p><p><span aria-hidden="true">↶</span> {visual.retry}</p></div>
        <p className="retry-return"><span aria-hidden="true">↶</span> {visual.retryReturn}</p>
      </div>
      <figcaption id="taskforge-concept-caption"><strong>{visual.label}</strong><span>{visual.note}</span></figcaption>
    </figure>
  </FrontStory>;
}
