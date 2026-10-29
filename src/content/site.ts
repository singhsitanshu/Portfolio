// The homepage content file: every user-facing homepage string, plus the facts
// shared with case studies and metadata. Layout components never hold copy.
// Selected facts only, from the owner's project notes and résumé.
// Explicit user updates take precedence over historical résumé variants.
// Imports keep explicit .ts extensions: Node scripts load this module directly.
import { codegraphFeature } from './codegraph.ts';
import { taskforgeMeasurements } from './taskforge.ts';

// Newspaper presentation fields (kicker, headline, deck, pull quote, caption,
// dateline) were added empty in T-01; each front-page ticket writes its own.

export const profile = {
  name: 'Aansh Singh',
  email: 'singhsitanshu@ucla.edu',
  links: {
    linkedin: 'https://www.linkedin.com/in/aansh-singh/',
    github: 'https://github.com/singhsitanshu',
  },
  // From the owner's résumé, p. 1 Education.
  education: {
    institution: 'University of California, Los Angeles (UCLA)',
    school: 'Henry Samueli School of Engineering',
    degree: 'Bachelor of Science in Computer Science',
    expectedGraduation: 'June 2028',
  },
  resumeUrl: '/aansh-singh-resume.pdf',
  role: 'Software Engineer',
  educationLabel: 'UCLA Computer Science',
  positioning: 'Pragmatic, system-minded | AI Engineering, Developer Tools & Distributed Systems | UCLA CS',
  hero: {
    greeting: 'Hi, I’m',
    introduction: 'A computer science student at UCLA building developer tools, AI systems, and reliable backend software.',
    perspective: 'Pragmatic, system-minded.',
    portrait: {
      src: '/images/aansh-singh-trim.jpg',
      // Resized copies keep the original's Display P3 profile and full proportions.
      srcSet: '/images/aansh-singh-trim-320.jpg 320w, /images/aansh-singh-trim-640.jpg 640w, /images/aansh-singh-trim.jpg 1277w',
      // T-18: WebP copies (same proportions), encoded color-managed into sRGB by
      // Chromium. WebP rather than AVIF: macOS sips AVIFs carry clap/irot
      // properties Firefox refuses, and tile into grids Chrome drew blank.
      webpSrcSet: '/images/aansh-singh-trim-320.webp 320w, /images/aansh-singh-trim-640.webp 640w, /images/aansh-singh-trim-960.webp 960w',
      alt: 'Aansh Singh wearing a brown hoodie and backpack at Rockefeller Center.',
      width: 1277,
      height: 1804,
      // T-09: the alt text rewritten as a visible caption. No credit line (owner, Oct 18, 2026).
      caption: 'Aansh Singh at Rockefeller Center, New York.',
    },
  },
} as const;

// Shared interface copy: skip link, header, footer, motion control, links.
export const ui = {
  skipLink: 'Skip to content',
  homeLink: { label: `${profile.name} home`, initials: ['A', 'S'], separator: ' / ' },
  resume: { label: 'Resume', fileLabel: 'PDF' },
  github: 'GitHub',
  linkedin: 'LinkedIn',
  external: '↗',
  socialLabel: 'Social profiles',
  footerSocialLabel: 'Footer social profiles',
  primaryNavLabel: 'Inside today',
  newTab: '(opens in a new tab)',
  loading: 'Loading page…',
  motion: { toggle: 'Reduce motion', system: 'Reduced motion (system)' },
} as const;

// Inside-page feature articles (T-13): the two case studies.
export const article = {
  back: '← Back to projects',
  repository: (name: string) => `View ${name} repository ↗`,
  navLabel: 'Case study sections',
  navHeading: 'In this article',
  dateline: (dates: string) => `Case study · ${dates}`,
  graphicCredit: 'Graphic',
} as const;

// Not-found page, restyled as an inside page in T-13.
export const notFound = {
  kicker: '404 · Page not found',
  title: 'Page not found.',
  lede: 'That page isn’t here. You can return home or explore the selected projects.',
  home: 'Return home',
  homeLabel: 'Front page',
  projects: 'View Projects',
  projectsLabel: 'Inside',
} as const;

// Colophon footer (T-12): the closing lines of every page.
export const colophon = {
  text: 'The Aansh Times is set in Playfair Display and Libre Caslon. Printed in Los Angeles.',
  signature: `${profile.name} / ${profile.role}`,
} as const;

// Front-page masthead (T-06). The edition date is the build date, added by the
// Masthead component; it is not content. Motto approved by the owner, Oct 18, 2026.
export const masthead = {
  nameplate: 'The Aansh Times',
  motto: 'All the code that’s fit to ship.',
  edition: ['Los Angeles', profile.role, profile.educationLabel, 'Vol. 1, No. 1'],
  indexLabel: 'Inside Today',
  frontPage: 'front page',
  sections: { projects: 'Projects' },
} as const;

// October 1, 2026 owner clarification: both projects were built independently
// before the school year began. This does not establish a college-entry date.
const projectDates = 'Summer 2026';
const projectOwnershipLabel = `Solo project · ${projectDates}`;
const { result } = codegraphFeature;
const profileName = profile.name;
const codegraphOwnership = {
  label: projectOwnershipLabel,
  statement: 'I designed and built CodeGraph independently during summer 2026, before the school year began.',
  scope: 'My work spans the full system: repository ingestion and parsing, the graph and retrieval pipeline, the API, and the interactive dashboard.',
} as const;
const taskforgeOwnership = {
  label: projectOwnershipLabel,
  statement: 'I designed and built TaskForge independently during summer 2026, before the school year began.',
  scope: 'My work spans the full system: the API and console, PostgreSQL task and attempt model, Go workers and schedulers, observability, and benchmark harness.',
} as const;
const taskforgeStory = {
  summary: 'Coordinate durable background work with concurrent Go workers, atomic claims, retries, and crash recovery.',
  highlight: { title: 'Recovery with history', body: 'Keep numbered attempts for completion, retry, and crash recovery.' },
} as const;
const codegraphStory = {
  summary: 'Explore codebases through interactive graphs and question-specific retrieval.',
  highlight: { title: 'Structure & source', body: 'Inspect source on demand and trace direct callers and architectural communities.' },
} as const;
const { syntheticWait } = taskforgeMeasurements;

export const projects = [
  {
    id: 'codegraph',
    name: 'CodeGraph',
    path: '/projects/codegraph',
    repository: 'https://github.com/singhsitanshu/Codegraph',
    dates: projectDates,
    ownership: codegraphOwnership,
    summary: 'Repository intelligence through interactive code graphs, source inspection, and natural-language analysis.',
    source: 'projects/CODEGRAPH.md',
    // Homepage story. Authoritative bank: projects/CODEGRAPH.md; metric wording B0013/B0032/B0185.
    story: {
      summary: codegraphStory.summary,
      highlights: [codegraphStory.highlight],
      result: {
        headline: `${result.reduction} less LLM context`,
        context: `${result.baseline} → ${result.focused} tokens/query; supported source vs. retrieved tool context`,
      },
      technologies: ['React / TypeScript', 'Python / FastAPI', 'Tree-sitter', 'Neo4j', 'LangGraph'],
      // The pipeline graphic: ingest, parse, graph, answer, then the context
      // payoff. The example is tiangolo/fastapi, the repository behind the
      // measured token figures. File paths, functions and every drawn call are
      // FastAPI's own (release 0.143.3, bb7f314); subsystem names are illustrative.
      visual: {
        label: 'Conceptual view',
        note: 'Calls excerpted from tiangolo/fastapi; subsystem names illustrative; bars to scale.',
        credit: 'Graphic',
        stages: {
          ingest: { title: 'Ingest', detail: 'Full repo or per-commit', output: 'source files' },
          parse: { title: 'Parse', detail: 'Tree-sitter', output: 'files · functions · calls' },
          graph: { title: 'Graph', detail: 'Typed · embedded · clustered', output: 'focused subgraph' },
          answer: { title: 'Answer', detail: 'Claude agent · 7 graph tools' },
        },
        sources: [
          { name: 'github.com/tiangolo/fastapi', tag: 'Full · default branch' },
          { name: 'push / pull_request', tag: 'Webhook · changed files @ commit' },
        ],
        tree: {
          root: 'tiangolo/fastapi/',
          entries: [
            { name: 'fastapi/', children: ['routing.py · utils.py', 'dependencies/utils.py', 'openapi/utils.py'] },
            { name: 'tests/ · docs_src/' },
            { name: 'docs/…/termynal.js' },
          ],
          // Not a supported source type, so never parsed or counted.
          skipped: ['README.md', 'uv.lock'],
          tokens: `${result.baseline} tokens`,
        },
        // An excerpt of analyze_param: each line is plain text around the one
        // span the parser extracts; an ellipsis line stands for skipped code.
        code: {
          file: 'fastapi/dependencies/utils.py',
          lines: [
            { before: 'def ', mark: 'analyze_param', after: '(…):', kind: 'fn' },
            { before: '    if ', mark: 'is_typealiastype', after: '(…):', kind: 'external' },
            { before: '    …' },
            { before: '        field = ', mark: 'create_model_field', after: '(…)', kind: 'call' },
          ],
          kinds: { fn: 'fn', call: '→ calls', external: '→ calls' },
          languages: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Java'],
        },
        graph: {
          repository: 'tiangolo/fastapi',
          communities: {
            routing: { name: 'Request Routing', description: 'Builds routes and handles requests' },
            dependencies: { name: 'Dependency Injection' },
            openapi: { name: 'OpenAPI Schema' },
          },
          files: { routing: 'routing.py', utils: 'utils.py', dependencies: 'dependencies/utils.py', openapi: 'openapi/utils.py' },
          functions: {
            populateRouteState: '_populate_api_route_state', createModelField: 'create_model_field', analyzeParam: 'analyze_param',
            getBodyField: '_get_body_field', runInThreadpool: 'run_in_threadpool', deepcopy: 'deepcopy',
          },
          legend: { file: 'File', function: 'Function', external: 'External', defines: 'Defines', calls: 'Calls', vector: 'Embedding' },
        },
        answer: {
          question: 'What breaks if I change create_model_field?',
          questionLabel: 'Q.',
          trace: [
            { tool: 'semantic_code_search', result: 'create_model_field' },
            { tool: 'query_graph_blast_radius', result: '3 callers' },
            { tool: 'analyze_architectural_subsystems', result: 'Dependency Injection' },
          ],
          loop: 'Repeats until it has enough context',
          contextLabel: 'Focused context',
          context: [
            { name: 'create_model_field', file: 'utils.py' },
            { name: '← analyze_param', file: 'dependencies/utils.py' },
            { name: '← _get_body_field', file: 'dependencies/utils.py' },
            { name: '← _populate_api_route_state', file: 'routing.py' },
            { name: 'subsystem: Dependency Injection' },
          ],
          contextTokens: `${result.focused} tokens`,
          stub: '3 call sites across 2 subsystems…',
        },
        payoff: {
          title: 'Context sent to the model',
          full: { label: 'Full repository', value: `${result.baseline} tokens`, tokens: result.baselineTokens },
          focused: { label: 'Retrieved context', value: `${result.focused} tokens`, tokens: result.focusedTokens },
          result: `${result.reduction} fewer tokens`,
        },
        // The long description read in place of the drawing.
        description: [
          'Ingest: the tiangolo/fastapi repository, in full from its default branch or as the files a push or pull request changed at that commit, merges into one stream of supported source files: the fastapi package, its tests and documentation examples, and the documentation’s JavaScript. Files such as README.md and uv.lock are skipped, and every source file is token-counted.',
          'Parse: Tree-sitter reads Python, JavaScript, TypeScript, Go and Java. In fastapi/dependencies/utils.py it extracts the function analyze_param, its call to the external is_typealiastype, and its call to create_model_field.',
          'Graph: inside the tiangolo/fastapi boundary, files define functions and functions call functions; calls to code outside the repository, such as run_in_threadpool and deepcopy, are marked external. Every function carries an embedding, and clustering groups functions into labeled subsystems, shown here as Request Routing, Dependency Injection and OpenAPI Schema.',
          'Answer: asked “What breaks if I change create_model_field?”, a Claude agent finds create_model_field by semantic search, walks to its 3 callers (analyze_param and _get_body_field, and _populate_api_route_state in the routing subsystem), and reads the Dependency Injection subsystem, repeating until it has enough context.',
          `Context sent to the model: ${result.baseline} tokens for the full repository against ${result.focused} tokens of retrieved context, ${result.reduction} fewer.`,
        ],
      },
      // T-07 front-page lead. Headline approved by the owner, Oct 18, 2026.
      kicker: 'Developer Tools',
      headline: 'Repository Tool Cuts LLM Context 97.5%',
      deck: 'CodeGraph indexes a repository’s files, functions and calls so an AI agent retrieves only the context a question needs.',
      byline: `By ${profileName} · ${projectOwnershipLabel}`,
      dateline: '',
      pullQuote: {
        quote: `${result.reduction} less LLM context`,
        attribution: `${result.baseline} → ${result.focused} tokens/query; supported source vs. retrieved tool context`,
      },
      // Body paragraphs are existing copy: the story summary, its highlight, and the ownership statement.
      body: [
        { runIn: '', text: codegraphStory.summary },
        { runIn: `${codegraphStory.highlight.title}.`, text: codegraphStory.highlight.body },
        { runIn: '', text: `${codegraphOwnership.statement} ${codegraphOwnership.scope}` },
      ],
    },
  },
  {
    id: 'taskforge',
    name: 'TaskForge',
    path: '/projects/taskforge',
    repository: 'https://github.com/singhsitanshu/TaskForge',
    dates: projectDates,
    ownership: taskforgeOwnership,
    summary: 'Fault-tolerant background-task processing with durable admission, retries, crash recovery, and operational visibility.',
    source: 'projects/TASKFORGE.md',
    // Homepage story. Supplied bank: projects/TASKFORGE.md; 04_METRICS.md E1/E2.
    story: {
      summary: taskforgeStory.summary,
      highlights: [taskforgeStory.highlight],
      result: {
        headline: `${syntheticWait.speedup.toFixed(2)}× worker scaling`,
        context: `${syntheticWait.baselineWorkers} → ${syntheticWait.workers} workers on synthetic ${syntheticWait.milliseconds} ms waits; local Docker benchmark`,
      },
      technologies: ['Go', 'PostgreSQL', 'Docker Compose', 'Prometheus', 'Grafana'],
      visual: {
        label: 'Conceptual view',
        note: 'Task coordination and retry flow.',
        credit: 'Graphic',
        queue: 'Queue',
        queueCaption: 'Durable tasks',
        workers: 'Workers',
        workersCaption: 'Atomic claims',
        completion: 'Completion',
        retry: 'Retry / backoff',
        retryReturn: 'Due retries return to the queue',
      },
      // T-08 second story. Headline approved by the owner, Oct 18, 2026. The
      // benchmark caveat is the pull quote's visible attribution.
      kicker: 'Distributed Systems',
      headline: 'Go Workers Scale 15.84× Under Load',
      deck: 'TaskForge coordinates durable background tasks through PostgreSQL, with concurrent workers, retries and crash recovery.',
      byline: `By ${profileName} · ${projectOwnershipLabel}`,
      dateline: '',
      pullQuote: {
        quote: `${syntheticWait.speedup.toFixed(2)}× worker scaling`,
        attribution: `${syntheticWait.baselineWorkers} → ${syntheticWait.workers} workers on synthetic ${syntheticWait.milliseconds} ms waits; local Docker benchmark`,
      },
      body: [
        { runIn: '', text: taskforgeStory.summary },
        { runIn: `${taskforgeStory.highlight.title}.`, text: taskforgeStory.highlight.body },
        { runIn: '', text: `${taskforgeOwnership.statement} ${taskforgeOwnership.scope}` },
      ],
    },
  },
] as const;

export type Project = (typeof projects)[number];

// From the owner's résumé, p. 1 Experience.
// Dates retain source precision. User requested BUR first; exploretech.la dates are owner-confirmed.
export const experience = [
  {
    organization: 'Bruin Underwater Robotics (BUR) @ UCLA', role: 'Software Engineer',
    dates: '2025 – Present', category: 'Engineering',
    contributions: [
      'Developed Python/YOLOv11 perception models for autonomous RoboSub and automated a Unity pipeline generating 3,000+ labeled training images.',
    ],
  },
  {
    organization: 'exploretech.la', role: 'Operations Team Member',
    dates: 'Sept 2025 – Present', category: 'Operations',
    contributions: [
      'Coordinated event logistics and procurement for an annual STEM outreach event serving ~500 high school students across Greater Los Angeles.',
      'Partnered with ASUCLA Catering and external vendors to source catering, event supplies, and custom merchandise, ensuring materials were ready for event.',
    ],
  },
  {
    organization: 'D-Tech', role: 'Software Engineering Team Lead Intern',
    dates: 'May 2024 – Sept 2025', category: 'Internship',
    contributions: [
      'Led 5 interns designing Flippper, an ePaper education platform, translating requirements into user flows and functional specifications.',
      'Directed UI/UX prototypes and visualizations to validate workflows and explain system behavior.',
    ],
  },
  {
    organization: 'Round Rock Independent School District (RRISD)', role: 'Advanced Academic Ambassador - Projects Chair',
    dates: 'August 2023 – May 2025', category: 'Student leadership',
    contributions: [
      'Led and mentored 30 ambassadors developing projects and educational presentations for the student body.',
      'Represented over 34,000 students, delivering presentations and answering questions at conferences and college fairs.',
    ],
  },
  {
    organization: 'CompuChild', role: 'Instructor',
    dates: 'May 2024 – Jan 2025', category: 'Teaching',
    contributions: [
      'Taught Python and Scratch to middle school students through hands-on coding projects.',
      'Guided line-following robot and solar-car projects, helping students debug code and devices.',
    ],
  },
] as const;

// Homepage section and control copy, in reading order.
export const homepage = {
  // T-09: the front page opens on the owner (Oct 18, 2026 direction): a name
  // banner, the original hero copy, the portrait, and what Aansh builds.
  intro: {
    banner: 'Aansh',
    kicker: `${profile.role} / ${profile.educationLabel}`,
    // Drawn from the hero introduction and edition bar; set as a ruled display list.
    focus: [profile.role, 'Developer Tools', 'AI Systems', 'Reliable Backend Software', 'UCLA · Los Angeles, CA.'],
    focusLabel: 'What Aansh builds',
    editionLabel: 'In this edition',
    // The portrait is a toggle button; aria-pressed reports whether color is on.
    photoToggle: 'Show photo in color',
    editionPage: (index: number) => `Page A${index + 2}`,
  },
  sections: { projects: 'Projects' },
  projects: {
    eyebrow: '01 / Selected projects',
    title: 'Projects',
    caseStudy: 'Read case study',
    builtWith: 'Built with',
    caseStudyJump: (name: string) => `${name} case study`,
    sourceLabel: 'Source',
    githubJump: (name: string) => `${name} on GitHub`,
    caseStudyLabel: (name: string) => `Read ${name} case study`,
    githubLabel: (name: string) => `${name} on GitHub`,
    technologiesLabel: (name: string) => `${name} technologies`,
  },
  // T-10: experience as the Business section's dated briefs. Datelines use the
  // entry's category rather than a city, since not every location is on record.
  experience: {
    title: 'Experience',
    section: 'Business & Campus',
    dateline: (entry: { category: string; dates: string }) => `${entry.category}, ${entry.dates}`,
    headline: (entry: { role: string; organization: string }) => `${entry.role}, ${entry.organization}`,
  },
  // T-11: education as a boxed notice beside the Business section.
  education: { kicker: 'Notice', title: 'Education', graduation: 'Expected graduation' },
  // T-12: contact as a classified ad; the existing title and lede are its copy.
  contact: {
    section: 'Classifieds',
    sectionAside: 'Contact',
    heading: 'Wanted',
    title: 'Let’s build something useful.',
    lede: 'Have a project or an idea to discuss? Get in touch.',
    replyLabel: 'Reply to',
    copyButton: 'Copy email',
    copying: 'Copying email…',
    copied: 'Email copied to clipboard.',
    copyFailed: (email: string) => `Couldn’t copy automatically. Select and copy ${email}, or use the email link.`,
  },
} as const;
