// The homepage content file: every user-facing homepage string, plus the facts
// shared with case studies and metadata. Layout components never hold copy.
// Selected facts only. Source index and editorial constraints: docs/content-sources.md.
// Explicit user updates take precedence over historical résumé variants.
// Imports keep explicit .ts extensions: Node scripts load this module directly.
import { codegraphFeature } from './codegraph.ts';
import { taskforgeMeasurements } from './taskforge.ts';

// Newspaper presentation fields. T-01 adds them empty; each front-page ticket
// writes the ones it names (headline, deck, kicker, pull quote, caption, dateline).
const pullQuote = { quote: '', attribution: '' } as const;

export const profile = {
  name: 'Aansh Singh',
  email: 'singhsitanshu@ucla.edu',
  links: {
    linkedin: 'https://www.linkedin.com/in/aansh-singh/',
    github: 'https://github.com/singhsitanshu',
  },
  // Ticket 14 attached résumé, p. 1 Education; see content map.
  education: {
    institution: 'University of California, Los Angeles (UCLA)',
    school: 'Henry Samueli School of Engineering',
    degree: 'Bachelor of Science in Computer Science',
    expectedGraduation: 'June 2029',
    kicker: '',
    headline: '',
  },
  resumeUrl: '/aansh-singh-resume.pdf',
  role: 'Software Engineer',
  educationLabel: 'UCLA Computer Science',
  positioning: 'Pragmatic, system-minded | AI Engineering, Developer Tools & Distributed Systems | UCLA CS',
  hero: {
    introduction: 'A computer science student at UCLA building developer tools, AI systems, and reliable backend software.',
    perspective: 'Pragmatic, system-minded.',
    portrait: {
      src: '/images/aansh-singh-trim.jpg',
      alt: 'Aansh Singh wearing a brown hoodie and backpack at Rockefeller Center.',
      width: 1277,
      height: 1804,
      caption: '',
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

// Front-page masthead (T-06). The edition date is the build date, added by the
// Masthead component; it is not content. Motto approved by the owner, Oct 18, 2026.
export const masthead = {
  nameplate: 'The Aansh Times',
  motto: 'All the code that’s fit to ship.',
  edition: ['Los Angeles', profile.role, profile.educationLabel, 'Vol. 1, No. 1'],
  indexLabel: 'Inside Today',
} as const;

// October 1, 2026 owner clarification: both projects were built independently
// before the school year began. This does not establish a college-entry date.
const projectDates = 'Summer 2026';
const projectOwnershipLabel = `Solo project · ${projectDates}`;
const { result } = codegraphFeature;
const { syntheticWait } = taskforgeMeasurements;

export const projects = [
  {
    id: 'codegraph',
    name: 'CodeGraph',
    path: '/projects/codegraph',
    repository: 'https://github.com/singhsitanshu/Codegraph',
    dates: projectDates,
    ownership: {
      label: projectOwnershipLabel,
      statement: 'I designed and built CodeGraph independently during summer 2026, before the school year began.',
      scope: 'My work spans the full system: repository ingestion and parsing, the graph and retrieval pipeline, the API, and the interactive dashboard.',
    },
    summary: 'Repository intelligence through interactive code graphs, source inspection, and natural-language analysis.',
    source: 'projects/CODEGRAPH.md',
    // Homepage story. Authoritative bank: projects/CODEGRAPH.md; metric wording B0013/B0032/B0185.
    story: {
      summary: 'Explore codebases through interactive graphs and question-specific retrieval.',
      highlights: [
        { title: 'Structure & source', body: 'Inspect source on demand and trace direct callers and architectural communities.' },
      ],
      result: {
        headline: `${result.reduction} less LLM context`,
        context: `${result.baseline} → ${result.focused} tokens/query; supported source vs. retrieved tool context`,
      },
      technologies: ['React / TypeScript', 'Python / FastAPI', 'Tree-sitter', 'Neo4j', 'LangGraph'],
      visual: {
        label: 'Conceptual view',
        note: 'Repository structure and retrieval flow.',
        repository: 'Repository',
        files: 'Files',
        children: ['Functions', 'Calls'],
        relationships: 'Relationships',
        context: 'Focused context',
        retrieval: 'Graph + vector retrieval',
      },
      kicker: '',
      headline: '',
      deck: '',
      byline: '',
      dateline: '',
      pullQuote,
    },
  },
  {
    id: 'taskforge',
    name: 'TaskForge',
    path: '/projects/taskforge',
    repository: 'https://github.com/singhsitanshu/TaskForge',
    dates: projectDates,
    ownership: {
      label: projectOwnershipLabel,
      statement: 'I designed and built TaskForge independently during summer 2026, before the school year began.',
      scope: 'My work spans the full system: the API and console, PostgreSQL task and attempt model, Go workers and schedulers, observability, and benchmark harness.',
    },
    summary: 'Fault-tolerant background-task processing with durable admission, retries, crash recovery, and operational visibility.',
    source: 'projects/TASKFORGE.md',
    // Homepage story. Supplied bank: projects/TASKFORGE.md; 04_METRICS.md E1/E2.
    story: {
      summary: 'Coordinate durable background work with concurrent Go workers, atomic claims, retries, and crash recovery.',
      highlights: [
        { title: 'Recovery with history', body: 'Keep numbered attempts for completion, retry, and crash recovery.' },
      ],
      result: {
        headline: `${syntheticWait.speedup.toFixed(2)}× worker scaling`,
        context: `${syntheticWait.baselineWorkers} → ${syntheticWait.workers} workers on synthetic ${syntheticWait.milliseconds} ms waits; local Docker benchmark`,
      },
      technologies: ['Go', 'PostgreSQL', 'Docker Compose', 'Prometheus', 'Grafana'],
      visual: {
        label: 'Conceptual view',
        note: 'Task coordination and retry flow.',
        queue: 'Queue',
        queueCaption: 'Durable tasks',
        workers: 'Workers',
        workersCaption: 'Atomic claims',
        completion: 'Completion',
        retry: 'Retry / backoff',
        retryReturn: 'Due retries return to the queue',
      },
      kicker: '',
      headline: '',
      deck: '',
      byline: '',
      dateline: '',
      pullQuote,
    },
  },
] as const;

export type Project = (typeof projects)[number];

export const contentReadiness = {
  preview: 'Design system preview · Authoritative content sources received',
  caseStudy: 'Case-study composition is deferred to its scheduled ticket.',
  benchmarks: { value: 'Documented', note: 'Results and experiment conditions are available in the information bank; selection is deferred to the project tickets.' },
  dates: { value: projects[0].dates, note: 'User-supplied project period for CodeGraph and TaskForge.' },
} as const;

// Ticket 14 attached résumé, p. 1 Experience. See docs/ticket-14-content-map.md.
// Dates retain source precision. User requested BUR first; exploretech.la dates are owner-confirmed.
export const experience = [
  {
    organization: 'Bruin Underwater Robotics (BUR) @ UCLA', role: 'Software Engineer',
    dates: '2025 – Present', category: 'Engineering', dateline: '', headline: '',
    contributions: [
      'Developed Python/YOLOv11 perception models for autonomous RoboSub and automated a Unity pipeline generating 3,000+ labeled training images.',
    ],
  },
  {
    organization: 'exploretech.la', role: 'Operations Team Member',
    dates: 'Sept 2025 – Present', category: 'Operations', dateline: '', headline: '',
    contributions: [
      'Coordinated event logistics and procurement for an annual STEM outreach event serving ~500 high school students across Greater Los Angeles.',
      'Partnered with ASUCLA Catering and external vendors to source catering, event supplies, and custom merchandise, ensuring materials were ready for event.',
    ],
  },
  {
    organization: 'D-Tech', role: 'Software Engineering Team Lead Intern',
    dates: 'May 2024 – Sept 2025', category: 'Internship', dateline: '', headline: '',
    contributions: [
      'Led 5 interns designing Flippper, an ePaper education platform, translating requirements into user flows and functional specifications.',
      'Directed UI/UX prototypes and visualizations to validate workflows and explain system behavior.',
    ],
  },
  {
    organization: 'Round Rock Independent School District (RRISD)', role: 'Advanced Academic Ambassador - Projects Chair',
    dates: 'August 2023 – May 2025', category: 'Student leadership', dateline: '', headline: '',
    contributions: [
      'Led and mentored 30 ambassadors developing projects and educational presentations for the student body.',
      'Represented over 34,000 students, delivering presentations and answering questions at conferences and college fairs.',
    ],
  },
  {
    organization: 'CompuChild', role: 'Instructor',
    dates: 'May 2024 – Jan 2025', category: 'Teaching', dateline: '', headline: '',
    contributions: [
      'Taught Python and Scratch to middle school students through hands-on coding projects.',
      'Guided line-following robot and solar-car projects, helping students debug code and devices.',
    ],
  },
] as const;

// Homepage section and control copy, in reading order.
export const homepage = {
  hero: {
    portraitIndex: '01 /',
  },
  projects: {
    eyebrow: '01 / Selected projects',
    title: 'Projects',
    caseStudy: 'Read case study',
    caseStudyLabel: (name: string) => `Read ${name} case study`,
    githubLabel: (name: string) => `${name} on GitHub`,
    technologiesLabel: (name: string) => `${name} technologies`,
  },
  experience: { eyebrow: '02 / Career & leadership', title: 'Experience', kicker: '' },
  education: { eyebrow: '03 / College', title: 'Education', graduation: 'Expected graduation' },
  contact: {
    eyebrow: '04 / Contact',
    title: 'Let’s build something useful.',
    lede: 'Have a project or an idea to discuss? Get in touch.',
    kicker: '',
    copyButton: 'Copy email',
    copying: 'Copying email…',
    copied: 'Email copied to clipboard.',
    copyFailed: (email: string) => `Couldn’t copy automatically. Select and copy ${email}, or use the email link.`,
  },
} as const;
