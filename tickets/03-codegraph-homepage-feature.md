# Ticket 03: CodeGraph homepage feature

**Depends on:** Ticket 2

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Introduce the question: “What if an AI agent could understand a codebase before touching it?”
- Present CodeGraph as repository intelligence for AI-assisted software engineering.
- Build a responsive, initially static visual showing files → functions → calls/dependencies → focused context → agent.
- Explain repository-scoped analysis, source retrieval, graph reasoning, and vector search concisely.
- Feature the supplied result: approximately 737K → 18K tokens per query, a 97.5% context reduction.
- Mention the LangGraph ReAct agent and its seven repository-scoped tools.
- Link to `/projects/codegraph`.

## Acceptance criteria

- The section communicates the problem, system, and result without requiring animation.
- Metrics retain their approximate qualifiers and are traceable to supplied evidence.
- Technologies appear as supporting context.
- The visual remains understandable on narrow screens.
