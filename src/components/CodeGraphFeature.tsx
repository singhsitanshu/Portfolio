import type { Project } from '../content/site';
import { Figure } from './print';
import { FrontStory } from './FrontStory';

// T-14: the conceptual view as an ink infographic: three ordered stages,
// hairline arrows, small-caps labels and mono node names.
export function CodeGraphFeature({ project }: { project: Project & { id: 'codegraph' } }) {
  const visual = project.story.visual;
  return <FrontStory project={project} size="lead" className="front-lead">
    <Figure className="infographic" caption={<><strong>{visual.label}.</strong> {visual.note}</>} credit={visual.credit}>
      <ol className="infographic-flow">
        <li className="infographic-stage">
          <p className="infographic-label">{visual.repository}</p>
          <ul className="infographic-tree">
            <li><span className="infographic-file" aria-hidden="true" />{visual.files}<ul>{visual.children.map(child => <li key={child}>{child}</li>)}</ul></li>
          </ul>
        </li>
        <li className="infographic-stage">
          <p className="infographic-label">{visual.relationships}</p>
          <svg className="infographic-graph" viewBox="0 0 220 130" width="220" height="130" aria-hidden="true" focusable="false">
            <g className="graph-edges"><path d="M110 65 30 28M110 65 185 22M110 65 195 108M110 65 47 110M30 28 185 22M47 110 195 108" /></g>
            <g className="graph-nodes"><circle cx="30" cy="28" r="9" /><circle cx="185" cy="22" r="9" /><circle cx="195" cy="108" r="9" /><circle cx="47" cy="110" r="9" /></g>
            <circle className="graph-center" cx="110" cy="65" r="19" />
            <path className="graph-focus" d="m102 65 6 6 11-13" />
          </svg>
        </li>
        <li className="infographic-stage">
          <p className="infographic-label">{visual.context}</p>
          <p className="infographic-node">{visual.retrieval}</p>
          <div className="infographic-lines" aria-hidden="true"><i /><i /><i /></div>
        </li>
      </ol>
    </Figure>
  </FrontStory>;
}
