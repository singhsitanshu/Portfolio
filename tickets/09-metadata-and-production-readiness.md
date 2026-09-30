# Ticket 09: Metadata and production-build readiness

**Depends on:** Ticket 8

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Add route-specific titles, descriptions, canonical URLs, and Open Graph metadata.
- Create a social preview image and favicon.
- Add `sitemap.xml`, `robots.txt`, and an intentional not-found experience.
- Ensure project-page metadata is available to social crawlers through static generation or prerendering as appropriate.
- Optimize fonts and images; lazy-load noncritical assets and split code where useful.
- Verify direct navigation and refresh behavior for project routes.

## Acceptance criteria

- All three pages have correct, distinct metadata in their generated output.
- Canonical and sitemap URLs use the intended production domain.
- Production assets build successfully and contain no broken internal links.
- Unknown URLs have intentional handling.
- Performance checks identify no obvious oversized assets or unnecessary scripts.
