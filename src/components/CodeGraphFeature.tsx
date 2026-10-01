import { codegraphFeature as content } from '../content/codegraph';
import type { Project } from '../content/portfolio';
import { ProjectShowcase } from './ProjectShowcase';

export function CodeGraphFeature({ project }: { project: Project }) {
  return <ProjectShowcase project={project} {...content.showcase} technologies={content.technologies}>
    <figure className="showcase-visual repository-visual" aria-labelledby="codegraph-concept-caption">
      <div className="repository-map">
        <div className="repository-tree">
          <p className="visual-label">Repository <span aria-hidden="true">→</span></p>
          <ul><li><span className="mini-file" aria-hidden="true" />Files<ul><li>Functions</li><li>Calls</li></ul></li></ul>
        </div>
        <div className="dependency-map">
          <p className="visual-label">Relationships</p>
          <svg viewBox="0 0 220 130" width="220" height="130" aria-hidden="true" focusable="false">
            <g className="graph-edges"><path d="M110 65 30 28M110 65 185 22M110 65 195 108M110 65 47 110M30 28 185 22M47 110 195 108" /></g>
            <g className="graph-nodes"><circle cx="30" cy="28" r="9" /><circle cx="185" cy="22" r="9" /><circle cx="195" cy="108" r="9" /><circle cx="47" cy="110" r="9" /></g>
            <circle className="graph-center" cx="110" cy="65" r="19" />
            <path className="graph-focus" d="m102 65 6 6 11-13" />
          </svg>
        </div>
        <div className="context-preview">
          <p className="visual-label">Focused context <span aria-hidden="true">↗</span></p>
          <p>Graph + vector retrieval</p>
          <div className="context-lines" aria-hidden="true"><i /><i /><i /></div>
        </div>
      </div>
      <figcaption id="codegraph-concept-caption"><strong>Conceptual view</strong><span>{content.showcase.visualNote}</span></figcaption>
    </figure>
  </ProjectShowcase>;
}
