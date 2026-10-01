// Attached engineering-mastery at ecbb2fe (September 3, 2026).
// 01-system §§2–4; 02-database-correctness §§5–8; 04-performance §12;
// 05-decisions-critique §§16/19; 10-benchmark-evidence E1/E2/E5/E6.
// Lessons are derived from documented tradeoffs, not invented personal history.
export const taskforgeCaseStudy = {
  introduction: 'Coordinate background work through short PostgreSQL transactions, renewable ownership, and a durable record of every attempt.',
  overview: [
    { label: 'Authority', value: 'PostgreSQL tasks + attempt history' },
    { label: 'Execution', value: 'Go workers · one handler per process' },
    { label: 'Recovery', value: 'Go schedulers · leases + retries' },
  ],
  sections: [
    { id: 'system', title: 'System architecture' },
    { id: 'submission', title: 'Submission & idempotency' },
    { id: 'claiming', title: 'Competing workers' },
    { id: 'execution', title: 'Success & retry walkthrough' },
    { id: 'recovery', title: 'Lease renewal & recovery' },
    { id: 'benchmarks', title: 'Benchmark methodology & results' },
    { id: 'tradeoffs', title: 'Tradeoffs & lessons' },
    { id: 'repository', title: 'Repository' },
  ],
  system: 'Background work must outlive an HTTP request and remain inspectable when a process fails. TaskForge separates admission, execution, and lifecycle maintenance around one durable database.',
  architecture: {
    title: 'PostgreSQL coordinates independent processes',
    layers: [
      { label: '01 / Admission', title: 'React console → FastAPI', body: 'The console uses a same-origin Nginx API proxy. FastAPI validates submissions and reads task, worker, and attempt history.', connection: 'Submit / inspect / cancel ↔ PostgreSQL ↓' },
      { label: '02 / Authority', title: 'PostgreSQL tasks + numbered attempts', body: 'Committed rows hold priority, schedule, owner, lease, current state, outcomes, and the history of each execution attempt.', connection: 'Claim / renew / finalize ↔ workers · Recover / promote ↔ schedulers ↓' },
      { label: '03 / Execution & maintenance', title: 'Go workers + Go schedulers', body: 'Each worker runs one handler at a time, with independent heartbeat and lease-renewal loops. Schedulers recover expired ownership and promote due retries; replicas coordinate through row locks.' },
    ],
    caption: 'There is no central in-memory dispatcher. Workers poll PostgreSQL for eligible tasks; schedulers maintain eligibility and recovery. Prometheus scrapes API, worker, and scheduler metrics, and Grafana displays throughput, latency, retries, lease recovery, and system health. Metrics aid diagnosis while PostgreSQL remains the state authority.',
  },
  submission: [
    { title: 'Admit a logical task', body: 'FastAPI validates task type, payload, queue, priority, total-attempt budget, and optional schedule. A committed task starts QUEUED with no attempts. An optional idempotency key makes uncertain client retries safe for admission.' },
    { title: 'Arbitrate matching replays', body: 'A global partial unique index reserves the key. A SHA-256 fingerprint covers the canonical request, including queue, priority, budget, and normalized schedule. Concurrent inserts resolve to the stored task: matching fingerprints return its current state; different requests with the same key conflict.' },
    { title: 'Retain admission identity', body: 'Idempotency keys remain associated with their stored task records. Replaying a completed task does not create new work.' },
  ],
  claiming: {
    introduction: 'Workers select due QUEUED tasks with attempts remaining, ordered by descending priority, then creation time and ID. A short transaction uses FOR UPDATE SKIP LOCKED so replicas can claim different rows without a central dispatcher.',
    example: [
      { title: 'Worker A locks task X', body: 'It sets RUNNING, assigns its owner and lease, increments the attempt number, and inserts the matching RUNNING attempt. These changes commit together.' },
      { title: 'Worker B skips X', body: 'While X is locked, B can claim another eligible row or return no work. If A rolls back, X stays QUEUED without that attempt and becomes available to a later poll.' },
      { title: 'Execute after commit', body: 'The handler runs outside the claim transaction. Completion locks the task again and checks owner, attempt number, RUNNING state, and valid lease before committing task and attempt outcomes together.' },
    ],
    boundary: 'Workers prioritize eligible tasks and skip locked rows so other work can proceed.',
  },
  execution: {
    paths: [
      { title: 'Successful attempt', steps: [
        { title: 'QUEUED → RUNNING', body: 'Claim commits ownership and attempt N. The worker then invokes its allowlisted handler.' },
        { title: 'Renew while executing', body: 'An independent loop extends task ownership. Process heartbeats report liveness separately.' },
        { title: 'RUNNING → SUCCEEDED', body: 'Guarded completion persists task result and SUCCEEDED attempt output together, then clears ownership.' },
      ] },
      { title: 'Retryable failure → success', steps: [
        { title: 'Attempt N → FAILED · task → RETRYING', body: 'A typed retryable error records the failed attempt and schedules the same logical task, if its total-attempt budget remains.' },
        { title: 'RETRYING → QUEUED', body: 'The scheduler promotes it once due. Promotion creates no attempt; a later worker claim creates N + 1.' },
        { title: 'Next attempt → SUCCEEDED or FAILED', body: 'Success finalizes normally. Ordinary errors are terminal; a retryable error at the last allowed attempt makes the task FAILED.' },
      ] },
    ],
    retry: 'Default backoff starts at 2 seconds, doubles by failed-attempt number, applies 20% jitter, and caps at 300 seconds. The default budget is three total attempts, including the first claim and crash replacements. scheduled_at is earliest eligibility, not an exact start-time promise; promotion, polling, and contention add delay.',
    history: 'Logical task identity remains stable across retries and recovery. Numbered attempts retain RUNNING, SUCCEEDED, FAILED, or ABANDONED history. A failed attempt and a failed logical task are different outcomes.',
  },
  recovery: [
    { title: 'Lease and heartbeat answer different questions', body: 'Defaults are a 30-second task lease renewed every 10 seconds, and a process heartbeat every 5 seconds. A heartbeat shows recent communication; it neither proves useful progress nor revokes a task. Ownership comparisons use database time.' },
    { title: 'Expired ownership triggers recovery', body: 'A crash stops renewals but causes no immediate state transition. Schedulers lock expired RUNNING tasks and matching attempts, mark attempts ABANDONED, and requeue within the remaining budget—or mark the logical task FAILED when exhausted. Crash recovery requeues directly rather than applying retry backoff.' },
    { title: 'Guard completion with ownership', body: 'The owner and attempt number reject stale database completion after replacement.' },
  ],
  guarantee: 'Retries and crash recovery operate within the configured attempt budget; execution can be repeated.',
  benchmarks: {
    methodology: 'Benchmarks compare worker configurations across independently reset trials. Persisted task and attempt counts are reconciled with Prometheus metrics, excluding 100 warmup tasks.',
    configuration: 'The no-op workload uses 5,000 no-op tasks per trial; the synthetic-wait workload uses 1,000 synthetic 50 ms waits per trial. Both test 1, 4, 8, and 16 worker processes across three independently reset blocks: 12 trials each. The runs contain 60,000 and 12,000 tasks respectively.',
    formula: 'Processing tasks/sec = logical tasks / (latest attempt finish − earliest attempt start)',
    aggregation: 'Charts show medians of per-trial processing throughput. Speedup is the ratio of aggregate medians; parallel efficiency is speedup divided by worker count. Each chart has its own zero-based scale.',
    charts: [
      { id: 'noop', title: 'No-op coordination', maximum: 1400, unit: 'median processing tasks/sec', rows: [{ workers: 1, value: 779.748 }, { workers: 4, value: 1284.015 }, { workers: 8, value: 1279.605 }, { workers: 16, value: 1214.429 }], caption: 'Four workers produced the highest tested median: 1,284.015 tasks/sec. With minimal handler work, coordination overhead becomes the scaling constraint.' },
      { id: 'wait', title: 'Synthetic 50 ms waits', maximum: 320, unit: 'median processing tasks/sec', rows: [{ workers: 1, value: 18.764 }, { workers: 4, value: 74.668 }, { workers: 8, value: 149.442 }, { workers: 16, value: 297.264 }], caption: 'From 1 to 16 workers: 15.842× speedup and 99.0% parallel efficiency on synthetic 50 ms waits.' },
    ],
    failures: [
      { label: 'Fail-once retries', value: '3,000 tasks · 6,000 attempts', detail: 'Three trials; 10 workers and 3 schedulers; fixed 100 ms retry/promotion configuration. Exactly FAILED → SUCCEEDED histories, with zero duplicate identities or stranded leases in these runs.' },
      { label: 'Hard-kill recovery', value: '30 abandoned attempts replaced', detail: 'Three trials of 1,000 synthetic 500 ms waits; 20 workers, 3 schedulers, 10 killed owners per trial, and 5-second leases. Every captured abandoned attempt had exactly one later successful replacement, with zero duplicate recovery-state transitions in these runs.' },
    ],
    recoveryTiming: 'Median-trial p95 recovery lag was 36.681 ms from lease expiration to the recovery timestamp recorded in the SQL path. Median kill-to-final-drain was 25.271239 seconds.',
    limits: 'Measurements use synthetic workloads in local Docker; throughput depends on handler work and available resources.',
  },
  tradeoffs: [
    { title: 'Short transactions, explicit ownership', benefit: 'Claim and completion transactions keep task state and attempt history consistent while handlers run outside database locks.', tradeoff: 'Renewable leases protect ownership; handlers use destination idempotency when external effects must be deduplicated.', lesson: 'Design task-state consistency and external-effect safety together.' },
    { title: 'One durable authority', benefit: 'PostgreSQL coordinates admission, ownership, outcomes, and history in one place.', tradeoff: 'Polling and write contention make database pressure an important scaling consideration.', lesson: 'Use workload measurements to choose worker counts.' },
    { title: 'Priority and bounded attempts', benefit: 'Priority ordering supports urgent work, while attempt budgets bound repeated failures.', tradeoff: 'Fairness under sustained high-priority load remains a scheduling tradeoff.', lesson: 'Make scheduling and retry policy explicit.' },
  ],
  repository: 'Explore the API, Go workers and schedulers, SQL migrations, console, and benchmark harness on GitHub.',
} as const;
