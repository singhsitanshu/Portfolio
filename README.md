# Portfolio foundation

Portfolio foundation, homepage, case studies, restrained motion, accessibility, static production metadata, and Cloudflare deployment readiness (Tickets 01–10): React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Requires Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The three routes are `/`, `/projects/codegraph`, and `/projects/taskforge`. The root has a portrait hero, Projects, Experience, Education, and Contact. Both projects have case studies using a shared reading layout. Motion highlights the existing content without hiding copy or changing numerical values.

## Structure

- `src/components/ui.tsx`: shared container, semantic headings, button, internal text link, and metric display.
- `src/styles.css`: Tailwind theme, color/type/spacing/layout/border/motion tokens, focus and responsive rules.
- `src/pages/`: homepage, retained foundation component preview, and project route placeholder.
- `public/aansh-singh-resume.pdf`: unchanged supplied résumé, copied into static build output.
- `src/components/Contact.tsx`: email link and accessible copy feedback.
- `src/content/portfolio.ts`: selected authoritative facts and shared project/contact data.
- `src/content/metadata.ts`: route metadata and the user-confirmed canonical origin, `https://aanshsingh.com`.
- `src/App.tsx`: shared route/layout tree, with focus committed after lazy page content resolves.
- `src/main.tsx`: browser entry; hydrates generated HTML and loads each page's code on demand.
- `src/entry-server.tsx` and `scripts/prerender.mjs`: build-time rendering of complete pages; no deployed server bundle.
- `public/social-preview-homepage-v3.jpg`: current 1200 × 630 hero-only social image with tighter side padding. `scripts/social-preview.mjs` is its reproducible composition source. Previous JPEGs remain for old incoming image URLs; the obsolete SVG source is retired. `public/favicon.svg` is the small vector favicon.
- `src/content/codegraph.ts`: sourced CodeGraph homepage copy and result.
- `src/components/CodeGraphFeature.tsx`: semantic system visual with a finite highlight sequence and project feature.
- `src/content/taskforge.ts`: sourced TaskForge homepage copy and workload-qualified benchmarks.
- `src/components/TaskForgeFeature.tsx`: coordination visual with a finite execution/retry sequence and project feature.
- `src/components/Motion.tsx`: shared preferences, finite diagram sequences, entrances, and decorative rules. Desktop sequences pause offscreen and when the document is hidden; mobile and reduced-motion modes show static completed visuals. The footer's Reduce motion control persists its preference, and system reduced motion always takes precedence.
- `src/components/CaseStudyLayout.tsx`: reusable case-study header, section navigation, and reading layout.
- `src/content/codegraph-case-study.ts`: selected details from the attached CodeGraph mastery manual.
- `src/pages/CodeGraphCaseStudy.tsx`: architecture, walkthrough, tradeoffs, correctness, results, and lessons.
- `src/content/taskforge-case-study.ts`: selected architecture, coordination, and benchmark details from the attached mastery manual.
- `src/pages/TaskForgeCaseStudy.tsx`: task lifecycle, execution/retry walkthroughs, recovery boundaries, and workload-qualified charts.
- `docs/content-sources.md`: source references and content selection constraints for subsequent tickets.
- `docs/content-checklist.md`: required content and evidence.

## Static hosting

`npm run build` emits `dist/index.html`, `dist/projects/codegraph.html`, `dist/projects/taskforge.html`, and `dist/404.html`, with complete rendered content and route-specific head metadata. It also generates `sitemap.xml` and `robots.txt`. Client hydration preserves navigation, contact, and motion behavior; page code is split into on-demand chunks. The temporary `.prerender/` server bundle is removed after generation.

There is no production server runtime, CMS, authentication, or form service. `wrangler.jsonc` configures **Cloudflare Workers Static Assets** to serve `dist/`, drop trailing slashes on project URLs, and serve the generated `404.html` with HTTP 404 for unknown paths ([static routing documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)). There is no Worker script or SPA catch-all. Run `npm run preview:cloudflare` after building to verify these rules locally with the pinned Wrangler runtime; `npm run preview` remains available for a Vite preview. Actual deployment and domain setup are manual owner actions after Ticket 10.

The exact canonical URLs are `https://aanshsingh.com/`, `https://aanshsingh.com/projects/codegraph`, and `https://aanshsingh.com/projects/taskforge`. The same apex origin is used for sitemap, robots, Open Graph, and social-image URLs. Unknown pages are `noindex` and receive no canonical tag.

## Design direction

Reviewed https://www.radnaabazar.com/en for hierarchy and pacing: a prominent introduction, grouped project content, and clear section boundaries help readers scan. This foundation uses its own warm paper/ink palette, restrained green accent, system typography, fine rules, and generous spacing. It does not reuse the reference's assets, copy, biography, claims, or visual identity.

The foundation has native links and buttons, a skip link, route-change focus handling, visible keyboard focus, and reduced-motion support. Fonts are local system fonts; no remote font request or heavy visual library is required.

Clipboard checks: `node --experimental-strip-types --test tests/copy-email.test.mjs`.

Motion verification is recorded in `docs/ticket-07-verification.md`. The test-only server `node tests/homepage-preview.mjs` supports `/?motion=system-reduced` to simulate the application media signal before mount; it does not change the OS setting and is not included in production output.

Responsive and accessibility checks, audit setup, and verification limits are recorded in `docs/ticket-08-verification.md`. The test preview supports `?text=200` for text enlargement and `?audit=1` for an axe-core scan using the local file specified by `AXE_SCRIPT_PATH`. These scripts and query behaviors are absent from the production bundle.

Ticket 09 metadata, static routing, asset-size checks, and remaining deployment verification are recorded in `docs/ticket-09-verification.md`. After building, run `npm run check:production` for generated-file checks. With preview running at port 4177, `PREVIEW_URL=http://127.0.0.1:4177 npm run check:production` also tests HTTP route, asset, and 404 responses. The image's JPEG signature, 1200 × 630 dimensions, links, fragment targets, and supplied résumé bytes are checked. Fonts remain local system fonts; diagrams use HTML/CSS, and no noncritical content image requires a page request.

Ticket 10's manual deployment commands, local Cloudflare checks, environment assumptions, and verification results are in [the deployment handoff](docs/ticket-10-deployment-readiness.md). This follows the replacement deployment-readiness ticket supplied by the user, superseding the older deployment instructions in `tickets/10-cloudflare-deployment.md`.

Ticket 14 separates career and college content using the newly attached résumé. See [the source map and final copy](docs/ticket-14-content-map.md) and [verification](docs/ticket-14-verification.md). Canonical homepage sections use `#projects`, `#experience`, `#education`, and `#contact`; legacy `#work` and `#about` links resolve to Projects and the introduction. Focused navigation checks: `node --experimental-strip-types --test tests/navigation.test.mjs`.

## Social preview capture and refresh

Ticket 28 uses a faithful composition of the current rendered homepage hero, including its original portrait, copy, Space Grotesk typography, palette, portrait frame, and grid texture. It excludes the navbar, action buttons, and social links. The live homepage is not modified. Build-only composition overrides give the text and portrait balanced side padding and fill the wide social-preview frame. The full composition uses the standard 1200 × 630 aspect ratio; a square crop does not retain all of the wide composition.

To reproduce the JPEG:

1. Run `npm run build`, then `node scripts/social-preview.mjs`. The script extracts the hero and stylesheet from the generated homepage into ignored `.social-preview/` files; it does not ship these source/review pages.
2. Run `node tests/homepage-preview.mjs` and open `http://127.0.0.1:4176/_test/social-preview.html` in a desktop browser. Use a **1200 × 630 CSS-pixel viewport**, device scale 1, at 100% zoom. Wait for `document.fonts.status === 'loaded'` and the portrait image to finish loading. The source has no JavaScript, entrances, navbar, development overlay, or browser chrome.
3. Capture only the viewport as JPEG, without browser UI or resizing, and save it as `public/social-preview-homepage-v3.jpg`. The checked-in image was captured with the Codex browser screenshot API at those dimensions. View the actual JPEG at full size; after rebuilding, review `/_test/social-preview-small.html` at 360 × 189 and `/_test/social-preview-center.html` at 630 × 630.
4. Run `npm run build` and `PREVIEW_URL=http://127.0.0.1:4176 npm run check:production`. Both social metadata families use the absolute URL in `src/content/metadata.ts`; the checks cover unique image tags, shared alt text, route metadata, JPEG signature/dimensions, size, and local HTTP delivery. Use a **new filename** and update `site.image`, the review source, and check fixture for subsequent material redesigns.

Deployment remains the owner's existing workflow. After deployment, fetch the canonical homepage and both case-study HTML responses without executing JavaScript and confirm their new image URL, matching alt tags, route titles/descriptions, and canonical URLs. Fetch `https://aanshsingh.com/social-preview-homepage-v3.jpg` without authentication and confirm HTTP 200, `image/jpeg`, dimensions, and the expected new bytes. If public HTML or image responses are stale, purge only the affected URLs through the Cloudflare dashboard's Custom Purge, then fetch them again before requesting a platform refresh ([Cloudflare URL purge documentation](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/)).

Where supported, request a re-scrape, such as Meta's [Sharing Debugger](https://developers.facebook.com/tools/debug/) or LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/). For messaging apps without an available refresh tool, test a fresh share of the canonical homepage in an app the owner uses; record the app, date, result/screenshot, and any cache delay separately from public asset delivery. Existing messages and every platform cache cannot be guaranteed to refresh immediately. These deployment/share checks remain pending; see [Ticket 28 verification](docs/ticket-28-verification.md).
