import { taskforgeFeature as content } from '../content/taskforge';
import type { Project } from '../content/portfolio';
import { ProjectShowcase } from './ProjectShowcase';

export function TaskForgeFeature({ project }: { project: Project }) {
  return <ProjectShowcase project={project} {...content.showcase} technologies={content.technologies}>
    <figure className="showcase-visual coordination-visual" aria-labelledby="taskforge-concept-caption">
      <div className="coordination-map">
        <div className="queue-preview">
          <p className="visual-label">Queue <span aria-hidden="true">→</span></p>
          <div className="queue-items" aria-hidden="true"><i /><i /><i /></div>
          <p className="queue-caption">Durable tasks</p>
        </div>
        <div className="worker-preview">
          <p className="visual-label">Workers</p>
          <div className="worker-items" aria-hidden="true"><span /><span /></div>
          <p className="queue-caption">Atomic claims</p>
        </div>
        <div className="outcome-preview"><p><span aria-hidden="true">✓</span> Completion</p><p><span aria-hidden="true">↶</span> Retry / backoff</p></div>
        <p className="retry-return"><span aria-hidden="true">↶</span> Due retries return to the queue</p>
      </div>
      <figcaption id="taskforge-concept-caption"><strong>Conceptual view</strong><span>{content.showcase.visualNote}</span></figcaption>
    </figure>
  </ProjectShowcase>;
}
