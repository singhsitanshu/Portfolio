# Ticket 13 — Turn the homepage projects into concise, visual showcases

## Objective

Make CodeGraph and TaskForge immediately understandable and visually memorable. A visitor should be able to scan both projects quickly and choose a case study, while detailed engineering explanations remain available on the existing dedicated pages.

## Context for an agent new to this website

- Website: https://aanshsingh.com. The September 30, 2026 review used the repository and rendered local site because the domain did not resolve in the review environment. Recheck the current checkout rather than assuming it exactly matches production.
- Repository on the originating machine: `/Users/sitanshusingh/Documents/AanshSingh.com`. Stack: React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, React Router, static prerendering. See `README.md`; use Node 22.12+ and `npm run dev` after installing dependencies if needed.
- Read `docs/content-sources.md`, `src/pages/Home.tsx`, `src/components/CodeGraphFeature.tsx`, `src/components/TaskForgeFeature.tsx`, `src/content/portfolio.ts`, `src/content/codegraph.ts`, `src/content/taskforge.ts`, both `*-case-study.ts` content files, and `src/styles.css`.
- CodeGraph and TaskForge are personal projects dated Summer 2026. Existing case-study routes are `/projects/codegraph` and `/projects/taskforge`.
- Ticket 12 establishes a more expressive shared visual system and portrait hero. Consume its tokens if present; avoid introducing a competing global theme. Ticket 14 owns the visible Projects heading, `#projects` anchor, navigation rename, and Experience/Education structure. This ticket owns the two project presentations inside that section and preserves their individual anchors.

## Observed problem

Each current project occupies a long homepage section: introductory prose, a five-stage diagram, multiple explanation blocks, benchmark details, technology lists, and a late case-study link. These are substantial engineering writeups before a visitor reaches the biography and career history. The visual treatments communicate system flow but do not provide a strong, quick impression of each project. Many repeated labels, rules, and text columns make the page feel more like documentation than a curated portfolio.

## Reference direction

- [Radnaabazar](https://www.radnaabazar.com/en) provides a useful image-led project-card pattern: distinct project identity, concise summary, technology cues, and obvious destination.
- [Dhruv](https://dhruvsingh.com/) demonstrates a consistent developer visual language and named Projects navigation. Borrow that cohesion; do not use long résumé-style project paragraphs as the target density.
- Create original visuals grounded in these two projects. Reference screenshots and imagery are not assets for Aansh’s site.

## Required implementation

1. Present two substantial showcase cards or compact feature rows under Projects. Prefer a two-column desktop composition if both previews remain legible; use a single-column stack on mobile. Give both projects equal discoverability. Let media lead each card and place actions close to its title/summary.
2. Each showcase must include its project name, Summer 2026 date, one short descriptive sentence, one or two capability/outcome highlights, a restrained technology list, a prominent “Read case study” link, and a GitHub link. Aim for roughly 60–100 words per project excluding technology names and necessary evidence qualifications. Do not hide essential summaries behind hover.
3. Use a real, authorized product screenshot when available. The current public asset folder contains no project screenshots, so do not assume they exist or make completion depend on obtaining them. The fallback is an original, clearly labeled conceptual visual built from documented architecture.
4. Give CodeGraph its own recognizable visual: a small repository/file view connected to a dependency graph and focused source context. If this is illustrative, label it “Conceptual view.” Avoid a fabricated screenshot that implies a shipped interface or working capability beyond the sources.
5. Give TaskForge a different visual within the same system: queue items moving through workers to completion/retry, or a compact static coordination view. Use an illustrative label where applicable. Do not invent live telemetry, production customer counts, uptime, or benchmark values to fill a dashboard.
6. Simplify existing diagrams for thumbnail-scale comprehension. Move or retain detailed architecture, tradeoffs, recovery behavior, and benchmark interpretation on the dedicated case-study pages. Before removing homepage detail, check whether it already appears there; retain meaningful unique information in the appropriate case study without duplicating entire sections.
7. Choose evidence carefully. CodeGraph's existing 97.5% figure is a supplied résumé claim about LLM context reduction, and the case-study source documents missing reproducible numeric evidence. Prefer a capability highlight; if displaying that number, keep the attribution and caveat adjacent. TaskForge's 99% parallel efficiency applies to synthetic 50 ms waits scaling from 1 to 16 workers. Its approximately 1,284 tasks/sec figure is a tested local no-op workload with four workers. Never turn these into production guarantees. A card can omit a metric when its qualifications overwhelm the summary.
8. Reuse the existing authoritative repository URLs from `portfolio.ts`: CodeGraph at `https://github.com/singhsitanshu/Codegraph` and TaskForge at `https://github.com/singhsitanshu/TaskForge`. Do not add “Live demo” unless an actual usable destination is supplied and verified.
9. Use semantic articles, headings, and separately focusable links. Avoid nested links or an entire clickable card containing buttons. Mirror hover emphasis with keyboard focus, and ensure touch users can access every action.
10. Keep motion optional and finite; use the existing motion preferences. Optimize raster previews and lazy-load media below the first screen. Reserve dimensions so images do not shift the page.

## Acceptance criteria

- At 1440 px, both project titles, summaries, and actions can be scanned within approximately one 900 px-high section; judge after fonts load. At narrow widths, allow natural stacking rather than shrinking diagrams into unreadable miniatures.
- Each project has an immediately distinguishable visual and a concise explanation of what it does. Generic decorative cards or the old five-stage diagrams pasted unchanged into smaller boxes do not satisfy the visual goal.
- A visitor can reach either case study or repository without reading a long technical section first.
- Existing `/projects/codegraph`, `/projects/taskforge`, `#codegraph`, and `#taskforge` destinations continue to work, including direct navigation and keyboard focus.
- Detailed case studies remain substantive; shortening the homepage must not silently erase unique supported project information.
- All displayed claims retain their meaning, provenance, and relevant workload limitations. No fabricated interfaces, metrics, awards, or deployments.
- Verify 360, 390, 768, and 1440 px, keyboard navigation, reduced motion, and 200% text enlargement. No overflow, clipped media, or hover-only content.

## Deliverables and validation

Provide before/after screenshots showing both showcases on desktop and mobile, identify real screenshots versus conceptual illustrations, and summarize any content moved into case studies. Run `npm run build` and `npm run check:production`; manually check case-study routes, repository links, anchors, and image loading. Update tests only where expected structure legitimately changes, keeping route/asset/accessibility assertions intact. This ticket does not add more projects, rebuild project backends, or deploy the website.
