# Ticket 06: TaskForge case study

**Depends on:** Tickets 4 and 5

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Implement `/projects/taskforge` using the shared case-study layout.
- Explain task submission, priority scheduling, `FOR UPDATE SKIP LOCKED` claiming, execution, lease renewal, retries, and durable attempt history.
- Explain idempotent submission and worker coordination without overstating execution guarantees.
- Add an architecture diagram and success/retry execution walkthrough.
- Present benchmark methodology, measured configuration, results, and limitations.
- Include actual engineering tradeoffs, lessons, and repository link.

## Acceptance criteria

- Readers can understand how competing workers claim tasks and how failures are handled.
- Reliability claims match the implementation and evidence.
- Benchmark charts retain units and workload qualifiers.
- The page works independently when opened directly.
