import type { CSSProperties } from 'react';
import type { Project } from '../content/site';
import { Figure } from './print';
import { FrontStory } from './FrontStory';

type Visual = (Project & { id: 'codegraph' })['story']['visual'];
type Point = { x: number; y: number };

// The graph drawing's geometry. Labels come from site.ts; positions live here.
// Three communities of functions, two external calls outside every hull, and
// four files; CALLS edges are dense inside each hull and sparse between them.
const node = {
  sendRequest: { x: 145, y: 127 }, buildHeaders: { x: 95, y: 83 }, retrySend: { x: 45, y: 118 }, openSession: { x: 62, y: 172 }, setTimeout: { x: 128, y: 187 },
  verifySignature: { x: 280, y: 95 }, handleWebhook: { x: 345, y: 118 }, refreshToken: { x: 262, y: 45 }, computeDigest: { x: 340, y: 54 },
  parseBody: { x: 270, y: 179 }, decodeFields: { x: 340, y: 190 }, readError: { x: 296, y: 215 },
  jsonLoads: { x: 40, y: 237 }, hmacNew: { x: 402, y: 64 },
} satisfies Record<string, Point>;
type NodeId = keyof typeof node;

const file = { session: { x: 95, y: 135 }, signing: { x: 294, y: 64 }, webhooks: { x: 392, y: 135 }, decode: { x: 302, y: 194 } } satisfies Record<string, Point>;
const defines: [keyof typeof file, NodeId][] = [
  ['session', 'sendRequest'], ['session', 'buildHeaders'], ['session', 'retrySend'], ['session', 'openSession'], ['session', 'setTimeout'],
  ['signing', 'verifySignature'], ['signing', 'refreshToken'], ['signing', 'computeDigest'], ['webhooks', 'handleWebhook'],
  ['decode', 'parseBody'], ['decode', 'decodeFields'], ['decode', 'readError'],
];
// [caller, callee, part of the retrieval slice]
const calls: [NodeId, NodeId, boolean?][] = [
  ['retrySend', 'sendRequest'], ['sendRequest', 'buildHeaders'], ['sendRequest', 'setTimeout'], ['openSession', 'setTimeout'], ['retrySend', 'openSession'],
  ['handleWebhook', 'verifySignature', true], ['refreshToken', 'verifySignature', true], ['verifySignature', 'computeDigest'], ['refreshToken', 'computeDigest'],
  ['parseBody', 'decodeFields'], ['parseBody', 'readError'], ['readError', 'decodeFields'],
  ['sendRequest', 'verifySignature', true], ['sendRequest', 'parseBody'], ['handleWebhook', 'parseBody'],
  ['sendRequest', 'jsonLoads'], ['computeDigest', 'hmacNew'],
];
const hulls = {
  transport: ['buildHeaders', 'sendRequest', 'setTimeout', 'openSession', 'retrySend'],
  auth: ['refreshToken', 'computeDigest', 'handleWebhook', 'verifySignature'],
  parsing: ['parseBody', 'decodeFields', 'readError'],
} satisfies Record<string, NodeId[]>;
const externals: NodeId[] = ['jsonLoads', 'hmacNew'];
const entry: NodeId = 'verifySignature';
const callers: NodeId[] = ['sendRequest', 'handleWebhook', 'refreshToken'];
const radius = { function: 4.5, entry: 6.5 };

// Name labels: [node, x offset, y offset, anchor]. Unlabeled functions read as texture.
const labels: [keyof Visual['graph']['functions'], number, number, 'start' | 'middle' | 'end'][] = [
  ['sendRequest', -10, -13, 'end'], ['verifySignature', -10, -11, 'end'], ['handleWebhook', -8, 14, 'end'],
  ['refreshToken', -9, 16, 'end'], ['jsonLoads', 9, 3, 'start'], ['hmacNew', 12, 17, 'end'],
];
const fileLabels: [keyof typeof file, number, number, 'start' | 'middle' | 'end'][] = [
  ['session', 0, 19, 'middle'], ['signing', 8, 3, 'start'], ['webhooks', 0, 19, 'middle'], ['decode', 8, 12, 'start'],
];

// Each function's embedding: five ticks of varying height, like a fingerprint.
function VectorGlyph({ at, index, offset, strong }: { at: Point; index: number; offset: number; strong?: boolean }) {
  const d = Array.from({ length: 5 }, (_, i) => {
    const height = Math.round((2 + ((index * 7 + i * 5) % 6) * (strong ? 1.1 : 0.8)) * 10) / 10;
    const x = Math.round((at.x + offset + 1.5 + i * 1.8) * 10) / 10;
    return `M${x} ${at.y - 2}v${-height}`;
  }).join('');
  return <path className={`graph-vector${strong ? ' is-slice' : ''}`} d={d} />;
}

function edgePath(from: Point, to: Point, startGap: number, endGap: number) {
  const dx = to.x - from.x, dy = to.y - from.y, length = Math.hypot(dx, dy);
  const ux = dx / length, uy = dy / length;
  const r = (n: number) => Math.round(n * 10) / 10;
  return `M${r(from.x + ux * startGap)} ${r(from.y + uy * startGap)}L${r(to.x - ux * endGap)} ${r(to.y - uy * endGap)}`;
}

const nodeRadius = (id: NodeId) => (id === entry ? radius.entry : radius.function);
const hullPoints = (ids: NodeId[]) => ids.map(id => `${node[id].x},${node[id].y}`).join(' ');

function Numeral({ at, children }: { at: Point; children: string }) {
  return <g className="graph-numeral"><circle cx={at.x} cy={at.y} r="6.5" /><text x={at.x} y={at.y + 3}>{children}</text></g>;
}

// The hero drawing: one graph with three overlaid layers (structure,
// communities, embeddings) and the retrieval slice ①②③ in heavy ink.
function GraphDrawing({ graph }: { graph: Visual['graph'] }) {
  const functionIds = (Object.keys(node) as NodeId[]).filter(id => !externals.includes(id));
  return <svg className="pipeline-graph" viewBox="0 0 420 252" width="420" height="252" focusable="false" aria-hidden="true">
    <defs>
      <marker id="graph-arrow" className="graph-arrow" viewBox="0 0 6 6" refX="6" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 6 3 0 6z" /></marker>
      <marker id="graph-arrow-slice" className="graph-arrow is-slice" viewBox="0 0 6 6" refX="6" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 6 3 0 6z" /></marker>
    </defs>
    <rect className="graph-frame" x="0.5" y="8.5" width="419" height="243" />
    <text className="graph-frame-label" x="12" y="12">{graph.repository}</text>

    {/* Layer 2: communities, as soft hulls. Auth & Signing is the retrieved subsystem. */}
    <g className="graph-hulls">
      {Object.entries(hulls).map(([id, ids]) => <g key={id} className={id === 'auth' ? 'is-slice' : undefined}>
        {id === 'auth' && <polygon className="graph-hull-edge" points={hullPoints(ids)} />}
        <polygon className="graph-hull" points={hullPoints(ids)} />
      </g>)}
    </g>
    <g className="graph-community-labels">
      <text className="graph-community" x="20" y="44">{graph.communities.transport.name}</text>
      <text className="graph-community-note" x="20" y="56">{graph.communities.transport.description}</text>
      <text className="graph-community is-slice" x="244" y="24">{graph.communities.auth.name}</text>
      <text className="graph-community" x="305" y="246" textAnchor="middle">{graph.communities.parsing.name}</text>
    </g>

    {/* Layer 1: structure. DEFINES is dotted and unarrowed; CALLS is a directed line. */}
    <g className="graph-defines">{defines.map(([from, to]) => <path key={`${from}-${to}`} d={edgePath(file[from], node[to], 7, nodeRadius(to) + 1.5)} />)}</g>
    <g className="graph-calls">{calls.filter(([, , slice]) => !slice).map(([from, to]) => <path key={`${from}-${to}`} d={edgePath(node[from], node[to], nodeRadius(from) + 1.5, nodeRadius(to) + 2)} markerEnd="url(#graph-arrow)" />)}</g>
    <g className="graph-calls is-slice">{calls.filter(([, , slice]) => slice).map(([from, to]) => <path key={`${from}-${to}`} d={edgePath(node[from], node[to], nodeRadius(from) + 1.5, nodeRadius(to) + 2)} markerEnd="url(#graph-arrow-slice)" />)}</g>

    <g className="graph-files">{Object.entries(file).map(([id, at]) => <path key={id} d={`M${at.x - 4.5} ${at.y - 6}h6l3 3v9h-9zM${at.x + 1.5} ${at.y - 6}v3h3`} />)}</g>
    <g className="graph-functions">
      {functionIds.map((id, index) => <g key={id} className={id === entry ? 'is-entry' : callers.includes(id) ? 'is-slice' : undefined}>
        {/* Layer 3: every function carries its embedding. */}
        <VectorGlyph at={node[id]} index={index} offset={nodeRadius(id)} strong={id === entry} />
        <circle cx={node[id].x} cy={node[id].y} r={nodeRadius(id)} />
      </g>)}
    </g>
    <g className="graph-externals">{externals.map(id => <circle key={id} cx={node[id].x} cy={node[id].y} r={radius.function} />)}</g>

    <g className="graph-labels">
      {fileLabels.map(([id, dx, dy, anchor]) => <text key={id} className="graph-file-label" x={file[id].x + dx} y={file[id].y + dy} textAnchor={anchor}>{graph.files[id]}</text>)}
      {labels.map(([id, dx, dy, anchor]) => <text key={id} className={id === entry ? 'is-entry' : callers.includes(id as NodeId) ? 'is-slice' : undefined} x={node[id].x + dx} y={node[id].y + dy} textAnchor={anchor}>{graph.functions[id]}</text>)}
    </g>

    {/* The retrieval slice, numbered to match the agent's trace. */}
    <Numeral at={{ x: node.verifySignature.x, y: node.verifySignature.y + 17 }}>1</Numeral>
    <Numeral at={{ x: 205, y: 102 }}>2</Numeral>
    <Numeral at={{ x: 235, y: 21 }}>3</Numeral>
  </svg>;
}

// Lets a path or URL wrap after its slashes rather than mid-word.
const breakAfterSlashes = (text: string) => text.split('/').flatMap((part, index) => index ? ['/', <wbr key={index} />, part] : [part]);

// The legend's glyphs, drawn as in the graph.
const legendGlyphs = {
  file: <path d="M6.5 1h6l3 3v9h-9zM12.5 1v3h3" />,
  function: <circle cx="11" cy="7" r="4.5" />,
  external: <circle className="is-external" cx="11" cy="7" r="4.5" />,
  defines: <path className="is-defines" d="M1 7h20" />,
  calls: <><path className="is-calls" d="M1 7h16" /><path className="is-head" d="M16 4.5 21 7l-5 2.5z" /></>,
  vector: <path className="is-vector" d="M7 11V5M9 11V8M11 11V4M13 11V7M15 11V6" />,
} as const;

// T-14, redrawn: the conceptual view as a four-stage ink infographic. Ingest,
// parse, graph and answer read left to right and top to bottom, with a
// payoff band drawn to scale. Shape and line style carry meaning, never color.
export function CodeGraphFeature({ project }: { project: Project & { id: 'codegraph' } }) {
  const visual = project.story.visual;
  const { stages, code, answer, payoff } = visual;
  const focusedShare = payoff.focused.tokens / payoff.full.tokens;
  return <FrontStory project={project} size="lead" className="front-lead">
    <Figure className="infographic infographic-pipeline" caption={<><strong>{visual.label}.</strong> {visual.note}</>} credit={visual.credit}>
      <div className="pipeline-diagram" aria-hidden="true">
        <ol className="pipeline">
          <li className="pipeline-stage pipeline-ingest">
            <p className="pipeline-head"><span className="pipeline-step">01</span> {stages.ingest.title} <span className="pipeline-detail">{stages.ingest.detail}</span></p>
            <div className="ingest-body">
              <ul className="ingest-sources">{visual.sources.map(source => <li key={source.name}><span className="ingest-source">{breakAfterSlashes(source.name)}</span><span className="ingest-tag">{source.tag}</span></li>)}</ul>
              <div className="ingest-files">
                <p className="ingest-root">{visual.tree.root}</p>
                <ul className="ingest-tree">
                  {visual.tree.files.map(name => <li key={name}>{name}</li>)}
                  <li className="is-skipped">{visual.tree.skipped.map((name, index) => <span key={name}>{index > 0 && ' · '}<s>{name}</s></span>)}</li>
                </ul>
                <p className="token-tag"><span className="token-swatch is-full" />{visual.tree.tokens}</p>
              </div>
            </div>
            <p className="pipeline-output">→ {stages.ingest.output}</p>
          </li>
          <li className="pipeline-stage pipeline-parse">
            <p className="pipeline-head"><span className="pipeline-step">02</span> {stages.parse.title} <span className="pipeline-detail">{stages.parse.detail}</span></p>
            <div className="parse-body">
              <p className="parse-file">{code.file}</p>
              {code.lines.map(line => <div key={line.mark} className="parse-row">
                <code className="parse-line">{line.before}<span className={`parse-mark is-${line.kind}`}>{line.mark}</span>{line.after}</code>
                <span className="parse-leader" />
                <span className="parse-record"><span className="parse-kind">{code.kinds[line.kind]}</span> {line.mark}{line.kind === 'external' && <> <span className="external-glyph" /></>}</span>
              </div>)}
            </div>
            <p className="pipeline-languages">{code.languages.join(' · ')}</p>
            <p className="pipeline-output">→ {stages.parse.output}</p>
          </li>
          <li className="pipeline-stage pipeline-graph-stage">
            <p className="pipeline-head"><span className="pipeline-step">03</span> {stages.graph.title} <span className="pipeline-detail">{stages.graph.detail}</span></p>
            <GraphDrawing graph={visual.graph} />
            <div className="graph-key">
              <ul className="graph-legend">{(Object.keys(legendGlyphs) as (keyof typeof legendGlyphs)[]).map(key => <li key={key}>
                <svg viewBox="0 0 22 14" width="22" height="14" focusable="false">{legendGlyphs[key]}</svg>{visual.graph.legend[key]}
              </li>)}</ul>
              <p className="pipeline-output">→ {stages.graph.output}</p>
            </div>
          </li>
          <li className="pipeline-stage pipeline-answer">
            <p className="pipeline-head"><span className="pipeline-step">04</span> {stages.answer.title} <span className="pipeline-detail">{stages.answer.detail}</span></p>
            <p className="answer-question"><span className="answer-q">{answer.questionLabel}</span> {answer.question}</p>
            <div className="answer-trace">
              <ol>{answer.trace.map((step, index) => <li key={step.tool}>
                <span className="answer-numeral">{index + 1}</span>
                <span className="answer-step"><span className="answer-tool">{step.tool}</span> <span className="answer-result">→ {step.result}</span></span>
              </li>)}</ol>
              <p className="answer-loop">{answer.loop}</p>
            </div>
            <div className="answer-context">
              <p className="answer-context-label">{answer.contextLabel} <span className="token-tag"><span className="token-swatch is-focused" />{answer.contextTokens}</span></p>
              <ul>{answer.context.map(record => <li key={record.name}>{record.name}{'file' in record && <span> · {record.file}</span>}</li>)}</ul>
              <p className="answer-stub">{answer.stub}</p>
            </div>
          </li>
        </ol>
        <div className="pipeline-payoff">
          <p className="payoff-title">{payoff.title}</p>
          <p className="payoff-result">{payoff.result}</p>
          {[payoff.full, payoff.focused].map((row, index) => <div key={row.label} className="payoff-row">
            <span className="payoff-label">{row.label}</span>
            <span className="payoff-track">
              <span className={`payoff-bar ${index ? 'is-focused' : 'is-full'}`} style={{ '--share': index ? focusedShare : 1 } as CSSProperties} />
              <span className="payoff-value">{row.value}</span>
            </span>
          </div>)}
        </div>
      </div>
      <div className="sr-only">{visual.description.map(sentence => <p key={sentence}>{sentence}</p>)}</div>
    </Figure>
  </FrontStory>;
}
