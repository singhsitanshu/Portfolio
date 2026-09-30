# Portfolio foundation

Portfolio foundation, homepage shell, project features, and CodeGraph case study (Tickets 01–05): React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Requires Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The three routes are `/`, `/projects/codegraph`, and `/projects/taskforge`. The root has a hero, CodeGraph and TaskForge homepage features, about/journey, and contact. CodeGraph has a complete static case study; TaskForge remains an explicit route placeholder. Its case study and the broader animation pass belong to later tickets.

## Structure

- `src/components/ui.tsx`: shared container, semantic headings, button, internal text link, and metric display.
- `src/styles.css`: Tailwind theme, color/type/spacing/layout/border/motion tokens, focus and responsive rules.
- `src/pages/`: homepage, retained foundation component preview, and project route placeholder.
- `public/aansh-singh-resume.pdf`: unchanged supplied résumé, copied into static build output.
- `src/components/Contact.tsx`: email link and accessible copy feedback.
- `src/content/portfolio.ts`: selected authoritative facts and shared project/contact data.
- `src/content/codegraph.ts`: sourced CodeGraph homepage copy and result.
- `src/components/CodeGraphFeature.tsx`: static system visual and project feature.
- `src/content/taskforge.ts`: sourced TaskForge homepage copy and workload-qualified benchmarks.
- `src/components/TaskForgeFeature.tsx`: static coordination visual and project feature.
- `src/components/CaseStudyLayout.tsx`: reusable case-study header, section navigation, and reading layout.
- `src/content/codegraph-case-study.ts`: selected details from the attached CodeGraph mastery manual.
- `src/pages/CodeGraphCaseStudy.tsx`: architecture, walkthrough, tradeoffs, correctness, results, and lessons.
- `docs/content-sources.md`: source references and content selection constraints for subsequent tickets.
- `docs/content-checklist.md`: required content and evidence.

## Static hosting

`npm run build` emits `dist/`. There is no server runtime, CMS, authentication, or form service. Cloudflare Pages can serve this output with its default SPA fallback (do not add a top-level `404.html` without providing route fallback handling). Cloudflare account setup, deployment, and production configuration are deferred to ticket 10.

## Design direction

Reviewed https://www.radnaabazar.com/en for hierarchy and pacing: a prominent introduction, grouped project content, and clear section boundaries help readers scan. This foundation uses its own warm paper/ink palette, restrained green accent, system typography, fine rules, and generous spacing. It does not reuse the reference's assets, copy, biography, claims, or visual identity.

The foundation has native links and buttons, a skip link, route-change focus handling, visible keyboard focus, and reduced-motion support. Fonts are local system fonts; no remote font request or heavy visual library is required.

Clipboard checks: `node --experimental-strip-types --test tests/copy-email.test.mjs`.
