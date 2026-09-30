# Portfolio foundation

Ticket 01 only: React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Requires Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The three routes are `/`, `/projects/codegraph`, and `/projects/taskforge`. The root is a temporary component/foundation preview, and the project routes are explicit placeholders. Homepage composition, project features, case studies, and the broader animation pass belong to later tickets.

## Structure

- `src/components/ui.tsx`: shared container, semantic headings, button, internal text link, and metric display.
- `src/styles.css`: Tailwind theme, color/type/spacing/layout/border/motion tokens, focus and responsive rules.
- `src/pages/`: foundation preview and project route placeholder.
- `docs/content-checklist.md`: required content and evidence.

## Static hosting

`npm run build` emits `dist/`. There is no server runtime, CMS, authentication, or form service. Cloudflare Pages can serve this output with its default SPA fallback (do not add a top-level `404.html` without providing route fallback handling). Cloudflare account setup, deployment, and production configuration are deferred to ticket 10.

## Design direction

Reviewed https://www.radnaabazar.com/en for hierarchy and pacing: a prominent introduction, grouped project content, and clear section boundaries help readers scan. This foundation uses its own warm paper/ink palette, restrained green accent, system typography, fine rules, and generous spacing. It does not reuse the reference's assets, copy, biography, claims, or visual identity.

The foundation has native links and buttons, a skip link, route-change focus handling, visible keyboard focus, and reduced-motion support. Fonts are local system fonts; no remote font request or heavy visual library is required.
