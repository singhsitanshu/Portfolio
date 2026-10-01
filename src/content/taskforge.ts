// Supplied bank: projects/TASKFORGE.md; 04_METRICS.md E1/E2;
// sources/manuals/taskforge/04-performance.md §12 and 10-benchmark-evidence.md.
export const taskforgeFeature = {
  showcase: {
    summary: 'Coordinate background tasks with durable PostgreSQL queues, concurrent Go workers, and bounded retries.',
    highlights: [
      { title: 'Atomic ownership', body: 'Claim eligible work in a short transaction, then execute independently while renewable leases guard database ownership.' },
      { title: 'Recovery with history', body: 'Keep numbered attempts for completion, retry, and crash recovery. External effects still need their own idempotency.' },
    ],
    visualNote: 'Illustrative coordination, not live telemetry or a benchmark setup.',
  },
  question: 'What happens when thousands of tasks compete for the same workers?',
  positioning: 'Distributed task execution built around correctness, reliability, and concurrency.',
  introduction: 'TaskForge coordinates durable task admission, concurrent Go workers, retries, and crash recovery through PostgreSQL.',
  visual: {
    title: 'Coordination before execution',
    stages: [
      { title: 'Queue', detail: 'Durable tasks, ordered by priority', symbol: 'queue' },
      { title: 'Atomic claim', detail: 'FOR UPDATE SKIP LOCKED', symbol: 'claim' },
      { title: 'Workers', detail: 'Concurrent Go processes', symbol: 'workers' },
      { title: 'Leases & heartbeats', detail: 'Ownership and process liveness', symbol: 'lease' },
      { title: 'Completion / retry', detail: 'Persist results or schedule backoff', symbol: 'outcome' },
    ],
    caption: 'Workers skip locked tasks instead of competing for the same claim. Renewable leases guard ownership; heartbeats report liveness. Due retries return to the queue through the scheduler.',
    recovery: 'When a lease expires, the scheduler abandons the stale attempt and requeues eligible work within its attempt budget.',
    retryPath: 'Alternative path / Retryable failure → backoff → due promotion → queue, within the attempt budget.',
    note: 'Conceptual coordination flow; worker symbols illustrate concurrency, not a benchmark configuration.',
  },
  explanations: [
    { title: 'Atomic ownership', body: 'A PostgreSQL transaction locks a candidate, assigns ownership, and records its attempt before execution starts.' },
    { title: 'Priority scheduling', body: 'Workers claim due queued tasks by descending priority, then creation time and ID. Execution happens outside the claim transaction.' },
    { title: 'Retries & recovery', body: 'Retryable failures use exponential backoff. Guarded renewals and completion writes prevent stale owners from updating the task.' },
    { title: 'Operational visibility', body: 'Prometheus metrics and Grafana dashboards track throughput, latency, retries, lease recovery, and system health.' },
  ],
  benchmarks: {
    title: 'Measured under defined workloads',
    metrics: [
      { experiment: 'E1 / No-op workload', value: '60,000', label: 'validated task executions', context: '12 trials × 5,000 no-op tasks, across 1 / 4 / 8 / 16 workers. Persisted task and attempt counts reconciled with Prometheus.' },
      { experiment: 'E1 / No-op workload', value: '≈1,284', label: 'tasks/sec median', context: 'Four workers: the highest tested median for this no-op workload (1,284.015 tasks/sec). Three independently reset blocks.' },
      { experiment: 'E2 / Synthetic waits', value: '99%', label: 'parallel efficiency', context: 'Synthetic 50ms waits, scaling from 1 to 16 workers. 12 trials and 12,000 tasks; 15.84× measured speedup at 16 workers.' },
    ],
    host: 'Recorded environment: Apple M4 Pro · 12 logical CPUs · 24 GiB RAM · local Docker.',
    qualification: 'These are controlled local results. Throughput and efficiency depend on the workload and resources; they are not production capacity guarantees.',
  },
  technologies: ['Go', 'PostgreSQL', 'Docker Compose', 'Prometheus', 'Grafana'],
  linkLabel: 'Explore TaskForge',
} as const;
