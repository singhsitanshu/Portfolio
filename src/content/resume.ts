// Text transcription of public/aansh-singh-resume.pdf, published in /llms.txt so
// agents that cannot read PDFs still get the résumé. Wording is the PDF's own.
// The phone number is deliberately left out of the published text.
// When the PDF changes, update this file and pdfSha256 (shasum -a 256); the
// production test fails until both match.
// Imports keep explicit .ts extensions: Node scripts load this module directly.

export const resume = {
  pdfSha256: '670c39cae76de11ab08dece55468bb98f1ac383e58adbf0d4cca2130b0b18e91',
  location: 'Austin, TX',
  education: [
    {
      institution: 'University of California, Los Angeles',
      school: 'Henry Samueli School of Engineering',
      location: 'Los Angeles, CA',
      degree: 'Bachelor of Science in Computer Science',
      dates: 'Expected Graduation: June 2028',
    },
  ],
  experience: [
    {
      role: 'Software Engineer',
      organization: 'Bruin Underwater Robotics (BUR) @ UCLA',
      location: 'Los Angeles, CA',
      dates: '2025 – Present',
      bullets: [
        'Developed Python/YOLOv11 object-detection models for autonomous RoboSub perception, recognizing path markers, slalom gates, maps, and obstacles.',
        'Automated a Unity simulation pipeline to generate 3,000+ labeled images and bounding boxes for underwater perception model training.',
        'Exported PyTorch models to ONNX for TensorRT acceleration on NVIDIA Jetson; integrated Jetson and Raspberry Pi via ROS2 for onboard perception and real-time motor control.',
        'Collaborated with software, electrical, and mechanical engineers to integrate perception, computing, sensors, and propulsion.',
      ],
    },
    {
      role: 'Software Engineering Team Lead Intern',
      organization: 'D-Tech',
      location: 'Remote',
      dates: 'May 2024 – Sept 2025',
      bullets: [
        'Led 5 interns designing Flippper, an ePaper education platform; translated a German patent into software requirements, user flows, component interactions, and functional specifications.',
        'Defined ePaper workflows, interface behavior, and hardware/software integration points with the founder and an Oracle mentor to assess technical feasibility.',
        'Directed UI/UX prototypes, 3D models, and visualizations to validate workflows and explain system behavior.',
      ],
    },
    {
      role: 'Instructor',
      organization: 'CompuChild',
      location: 'Austin, TX',
      dates: 'May 2024 – Jan 2025',
      bullets: [
        'Taught Python and Scratch to middle school students through hands-on coding exercises and project-based lessons.',
        'Guided line-following robot and solar-car projects; debugged student code and devices.',
      ],
    },
  ],
  projects: [
    {
      id: 'codegraph',
      title: 'CodeGraph: Repository Intelligence',
      technologies: ['TypeScript', 'React', 'Python', 'FastAPI', 'Neo4j', 'LangGraph'],
      bullets: [
        'Built a full-stack React/TypeScript and Python/FastAPI repository intelligence app with GitHub ingestion, 32-way bounded Tree-sitter parsing, Neo4j file/function/call graphs, and NDJSON progress streaming.',
        'Developed a Claude-powered LangGraph ReAct agent with 7 repository-scoped tools for dependency, blast-radius, external-call, architecture, source, and vector-search analysis.',
        'Built Graph-RAG with Neo4j vector indexes, 1,536-dimensional OpenAI embeddings, and GDS Leiden subgraphs; reduced LLM context 97.5% from 737K to ~18K tokens per query.',
        'Automated Postman API tests for ingestion, graph retrieval, Graph-RAG, and cleanup with NDJSON assertions, negative cases, and HMAC-SHA256 webhook validation; verified with 82 Pytest cases and Node tests.',
      ],
    },
    {
      id: 'taskforge',
      title: 'TaskForge: Fault-Tolerant Task Processing',
      technologies: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'Prometheus'],
      bullets: [
        'Engineered Go/PostgreSQL task processing with atomic SQL claims, priority scheduling, heartbeats, renewable leases, backoff retries, and idempotent submission; added Prometheus/Grafana observability.',
        'Tested task-state integrity and crash recovery across 3,000 tasks / 6,000 ordered attempts with zero duplicates; recovered 30 hard-killed attempts with zero duplicate effects.',
        'Benchmarked 15.84× scaling across 16 workers at 99% efficiency with Prometheus reconciliation; persisted 30,000/30,000 API submissions at a 2,143/sec median with zero request/transport errors.',
      ],
    },
  ],
  skills: [
    { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Java', 'SQL', 'C++', 'C', 'HTML/CSS'] },
    { category: 'Web / APIs', items: ['React', 'React Flow', 'FastAPI', 'REST APIs', 'Postman', 'Pytest', 'Node Tests', 'Git'] },
    { category: 'Backend / Data', items: ['PostgreSQL', 'Redis', 'Docker', 'Prometheus', 'Grafana', 'Neo4j GDS', 'Tree-sitter'] },
    { category: 'AI / Robotics', items: ['LangGraph', 'RAG', 'OpenAI Embeddings', 'PyTorch', 'YOLOv11', 'ONNX', 'TensorRT', 'ROS2', 'NVIDIA Jetson', 'Raspberry Pi', 'Unity'] },
  ],
} as const;
