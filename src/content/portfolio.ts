// Selected facts only. Source index and editorial constraints: docs/content-sources.md.
// Explicit user updates take precedence over historical résumé variants.
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
      alt: 'Aansh Singh wearing a brown hoodie and backpack at Rockefeller Center.',
      width: 1277,
      height: 1804,
    },
  },
} as const;

export const projects = [
  {
    id: 'codegraph',
    name: 'CodeGraph',
    path: '/projects/codegraph',
    repository: 'https://github.com/singhsitanshu/Codegraph',
    dates: 'Summer 2026',
    summary: 'Repository intelligence through interactive code graphs, source inspection, and natural-language analysis.',
    source: 'projects/CODEGRAPH.md',
  },
  {
    id: 'taskforge',
    name: 'TaskForge',
    path: '/projects/taskforge',
    repository: 'https://github.com/singhsitanshu/TaskForge',
    dates: 'Summer 2026',
    summary: 'Fault-tolerant background-task processing with durable admission, retries, crash recovery, and operational visibility.',
    source: 'projects/TASKFORGE.md',
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
