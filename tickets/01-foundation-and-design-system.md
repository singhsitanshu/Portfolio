# Ticket 01: Foundation and design system

**Depends on:** None

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Initialize the preferred stack and establish the application structure.
- Define color, typography, spacing, layout, border, and motion tokens.
- Build shared containers, headings, buttons, text links, metric displays, and focus styles.
- Establish routes for `/`, `/projects/codegraph`, and `/projects/taskforge`.
- Review https://www.radnaabazar.com/en for pacing and visual polish without copying its identity.
- Create a content checklist for résumé, contact links, repository URLs, dates, and benchmark evidence.

## Acceptance criteria

- Development and production builds work.
- All three routes render.
- Reusable components demonstrate a coherent visual identity.
- Missing content is explicitly tracked.
- No unnecessary backend or heavyweight visual dependencies are introduced.
