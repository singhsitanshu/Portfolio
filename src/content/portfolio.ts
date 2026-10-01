// Selected facts only. Source index and editorial constraints: docs/content-sources.md.
// Explicit user updates take precedence over historical résumé variants.
export const profile = {
  name: 'Aansh Singh',
  email: 'singhsitanshu@ucla.edu',
  links: {
    linkedin: 'https://www.linkedin.com/in/aansh-singh/',
    github: 'https://github.com/singhsitanshu',
  },
  education: {
    institution: 'University of California, Los Angeles',
    school: 'Henry Samueli School of Engineering',
    degree: 'Bachelor of Science in Computer Science',
    expectedGraduation: 'June 2029',
  },
  resumeUrl: '/aansh-singh-resume.pdf',
  role: 'Software Engineer',
  educationLabel: 'UCLA Computer Science',
  positioning: 'Pragmatic, systems-minded | AI Engineering, Developer Tools & Distributed Systems | UCLA CS',
  hero: {
    greeting: 'Hi, I’m',
    introduction: 'A computer science student at UCLA building developer tools, AI systems, and reliable backend software.',
    perspective: 'Pragmatic, systems-minded.',
    portrait: {
      src: '/images/aansh-singh-800.jpg',
      srcSet: '/images/aansh-singh-480.webp 480w, /images/aansh-singh-800.webp 800w, /images/aansh-singh-1120.webp 1120w',
      alt: 'Aansh Singh resting his chin on his hands, with city lights behind him.',
      width: 800,
      height: 778,
    },
  },
  introduction: 'I’m Aansh, a computer science student at UCLA. My work spans developer tooling, reliable backend systems, and underwater robotics. I enjoy connecting the details of implementation to a clear, useful experience.',
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

// Source: information-bank/01_PROFILE.md and 02_EXPERIENCE.md.
// “Present” is preserved as of the September 2026 source collection.
export const journey = [
  { organization: 'Bruin Underwater Robotics · UCLA', role: 'Software Engineer', dates: 'Sept 2025–Present', summary: 'Developing perception models and integrating onboard computing for autonomous underwater robotics.' },
  { organization: 'D-Tech', role: 'Software Engineering Team Lead Intern', dates: 'May 2024–Sept 2025', summary: 'Led five interns designing Flippper, translating requirements into workflows, interfaces, and prototypes.' },
  { organization: 'CompuChild', role: 'Instructor', dates: 'May 2024–Jan 2025', summary: 'Taught Python and Scratch through hands-on projects and helped students debug code and devices.' },
] as const;
