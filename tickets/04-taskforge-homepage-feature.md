# Ticket 04: TaskForge homepage feature

**Depends on:** Ticket 3

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Introduce the question: “What happens when thousands of tasks compete for the same workers?”
- Present TaskForge as distributed task execution focused on correctness, reliability, and concurrency.
- Build a responsive, initially static queue → claim → workers → leases/heartbeats → completion/retry visual.
- Highlight atomic PostgreSQL claiming, priority scheduling, retries, and observability.
- Present the supplied benchmark results with workload context:
  - 60,000 validated task executions.
  - 1,284 tasks/sec median around the strongest measured worker configuration.
  - 99% parallel efficiency on the published synthetic workload.
- Link to `/projects/taskforge`.

## Acceptance criteria

- The visual explains worker coordination clearly.
- Benchmarks are qualified and never presented as universal production guarantees.
- The section has its own identity while sharing the site’s design system.
- Essential content works without motion or hover.
