# Ticket 10: Cloudflare deployment

**Depends on:** Ticket 9

## Shared requirements

- Use React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Keep the site static-first and deployable through Cloudflare.
- Build an intentional, project-led portfolio with strong typography, restrained color, and systems-inspired visuals.
- Treat mobile, semantic HTML, keyboard access, and reduced motion as baseline requirements.
- Use only supported project claims, verified experiences, and real links. Flag missing content rather than inventing it.
- Exclude backend services, CMS, authentication, blog infrastructure, and contact forms from V1.
- Keep each change limited to its ticket. Record what changed, how it was verified, and any remaining blockers.

## Scope

- Configure GitHub-connected Cloudflare hosting for the static build.
- Configure production deployments from `main` and preview deployments where supported.
- Connect the production domain and configure the required DNS and HTTPS settings.
- Verify route handling, static assets, résumé access, and metadata on the deployed site.
- Document deployment settings and rollback steps.

## Acceptance criteria

- A push to `main` triggers a successful production deployment.
- The production domain serves the site over HTTPS.
- Direct visits and refreshes work on both project pages.
- Preview and production builds use the correct configuration.
- Required account access or domain decisions are clearly identified if they block completion.
