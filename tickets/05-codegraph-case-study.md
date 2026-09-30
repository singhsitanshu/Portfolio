# Ticket 05: Project-page framework and CodeGraph case study

**Depends on:** Ticket 3

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Build a reusable case-study layout with clear navigation back to the homepage.
- Implement `/projects/codegraph`.
- Cover problem, system overview, architecture, execution flow, engineering challenges, design decisions, correctness, results, lessons, and repository.
- Create a responsive architecture diagram and a walkthrough from repository ingestion to focused agent context.
- Explain context-reduction measurement and its limitations using available project evidence.

## Acceptance criteria

- Recruiters can scan the overview; technical readers can follow the engineering details.
- Challenges, tradeoffs, and lessons are grounded in supplied material.
- Diagrams include a readable text explanation.
- The repository CTA uses the verified URL.
- Missing evidence is tracked rather than replaced with invented detail.
