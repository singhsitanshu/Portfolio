# Ticket 07: Motion and engineering-visualization pass

**Depends on:** Tickets 5 and 6

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Add restrained hero entrances, section reveals, hover feedback, and navigation/page transitions where useful.
- Animate CodeGraph’s progression from repository structure to focused context.
- Animate TaskForge’s queue, atomic claiming, lease/heartbeat, and completion/retry sequence.
- Use deterministic frontend sequences; no backend simulation is needed.
- Simplify motion on mobile and provide reduced-motion alternatives.

## Acceptance criteria

- Motion explains system behavior and never delays access to information.
- Scrolling remains natural; there is no scroll hijacking or loading-screen gate.
- Reduced-motion mode preserves every meaningful state and result.
- Offscreen animations avoid unnecessary continuous work.
- Animated metric endpoints exactly match the stated values.
