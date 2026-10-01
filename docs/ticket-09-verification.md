# Ticket 09 — Metadata and production-build readiness

Verified September 30, 2026. Implemented Ticket 09 only. Canonical origin and paths follow the user's explicit update: **https://aanshsingh.com**, without `www`. Existing project claims and portfolio content remain unchanged. Deployment, account access, DNS, HTTPS, and domain redirects remain Ticket 10 work.

## Changes

- Centralized route metadata in `src/content/metadata.ts`: distinct titles/descriptions, canonical tags, Open Graph type/site/title/description/URL/image details, large-image social cards, and descriptive image alternative text. The same canonical origin drives sitemap, robots, and image URLs.
- Added build-time rendering using the existing React/Vite dependencies. The shared app is rendered with synchronous page components during generation and hydrated with lazy page components in the browser. Focus effects commit with resolved route content, preserving hash navigation. Saved motion preferences are read after hydration so server/client markup agrees.
- Generated complete HTML at `dist/index.html`, `dist/projects/codegraph.html`, and `dist/projects/taskforge.html`. Metadata and readable page content require no crawler-side JavaScript. There is exactly one local client-entry script per page; no Suspense reveal scripts or hidden loading output remain.
- Added a custom `404.html` with a page heading, explanation, and links back home and to selected work. Unknown URLs use `noindex, follow` and have no canonical or `og:url` that could misrepresent them as valid pages. Preview responds with HTTP 404 for unknown paths and missing assets.
- Generated a three-URL sitemap and robots reference, without invented modification dates or update frequencies.
- Added a 1200 × 630 JPEG social image (42,477 bytes), editable vector artwork, and a 397-byte SVG favicon using the existing palette and supported identity/project content.
- Split homepage and both case-study code into on-demand chunks. Fonts remain system fonts and diagrams remain HTML/CSS; there is no remote font or content-image download. The social image is referenced by metadata, not loaded as an unnecessary page image.
- Added output/HTTP tests and adapted the existing accessibility/fault preview to serve the generated route files and custom 404. Added only Node type definitions as a development dependency; no production dependency was added. Temporary server build files are removed and not deployed.

This follows Vite's [build-time prerendering approach](https://vite.dev/guide/ssr.html) and React's [synchronous rendering API](https://react.dev/reference/react-dom/server/renderToString). The server entry deliberately imports pages synchronously, avoiding that API's lazy/Suspense limitation. Cloudflare Pages' [extensionless HTML and custom 404 handling](https://developers.cloudflare.com/pages/configuration/serving-pages/) matches the generated file structure; this ticket did not publish it.

## Generated metadata

| Page | Title | Canonical and Open Graph URL |
| --- | --- | --- |
| Home | Aansh Singh \| Software Engineer | `https://aanshsingh.com/` |
| CodeGraph | CodeGraph Case Study \| Aansh Singh | `https://aanshsingh.com/projects/codegraph` |
| TaskForge | TaskForge Case Study \| Aansh Singh | `https://aanshsingh.com/projects/taskforge` |

All descriptions are distinct and use already supported content. All three pages reference `https://aanshsingh.com/social-preview.jpg` with `image/jpeg`, width 1200, height 630, and an image description. The sitemap contains exactly the three canonical URLs; robots points to `https://aanshsingh.com/sitemap.xml`. Unknown pages are excluded.

## Checks performed

- `npm run build`: TypeScript, Vite client build, build-time server compilation, and all four HTML outputs passed. The server build folder was cleaned up. No runtime server bundle, test/audit scripts, source maps, web fonts, or unsupported content source files were included in production output.
- `PREVIEW_URL=http://127.0.0.1:4177 npm run check:production`: **5 passed, 0 failed, 0 skipped**. Checks covered distinct metadata inside generated heads, complete static content, every generated local link/fragment/head asset, sitemap/robots, intentional noindex 404, JPEG signature/dimensions, asset sizes, unchanged résumé bytes, raw HTTP route metadata, HTTP 404 statuses, and asset response bytes/MIME types.
- `node --experimental-strip-types --test tests/copy-email.test.mjs`: **2 passed**.
- Direct loading of all pages and missing-page handling passed at **320, 768, and 1280px**. Both project routes refreshed successfully at all three widths. Each page had the correct title, a single description/canonical where applicable, the correct heading, and no horizontal overflow. Canonical/OG values exclude hashes and queries.
- Client navigation from homepage to both initially lazy case-study routes updated metadata without duplicates and focused `main`. Section links focused their targets; return links focused the corresponding homepage project. Direct CodeGraph architecture, TaskForge benchmarks, and homepage about hashes passed at 320 and 1280px.
- The skip link, cross-route Work/About links, and both not-found recovery actions passed keyboard checks at 320 and 1280px.
- Saved Reduce motion preference survived refresh without hydration warnings; toggling back restored the normal setting. System-reduced simulation still selected static reduced mode. Clipboard denied/unsupported feedback retained its usable fallback after hydration.
- The existing axe-core 4.10.3 audit reported **zero violations** for all four routes at 320 and 1280px. Decorative-glyph contrast review items remain covered by Ticket 08's manual assessment. 200% text enlargement passed all four routes at 320px without overflow.
- The clean production browser tab reported **no application errors or warnings** across direct loads, refreshes, client navigation, preferences, and regression checks.
- Social artwork and the not-found layout were visually reviewed. JPEG MIME and exact 1200 × 630 dimensions were verified independently of the browser export.
- `git diff --check` passed.

## Production asset review

Sizes below are final output bytes and gzip bytes, not Vite's pre-prerender shell size.

| Asset | Bytes | Gzip bytes |
| --- | ---: | ---: |
| Home HTML | 18,237 | 4,981 |
| CodeGraph HTML | 18,725 | 5,858 |
| TaskForge HTML | 23,330 | 6,936 |
| Custom 404 HTML | 3,653 | 1,224 |
| Client entry/shared libraries | 396,934 | 127,644 |
| Homepage chunk | 9,987 | 2,464 |
| CodeGraph case-study chunk | 13,140 | 4,974 |
| TaskForge case-study chunk | 16,667 | 6,127 |
| CSS | 28,606 | 6,326 |
| Social JPEG | 42,477 | 34,164 |
| SVG favicon | 397 | 273 |
| Supplied résumé PDF | 123,660 | 114,523 |

Additional shared page chunks range from 1,249 to 3,023 bytes. The previous build reported a single JavaScript entry of approximately 437.30 KB (139.28 KB gzip); the new entry is smaller and defers page-specific code. All individual production assets are below 500 KB, and compressed JavaScript chunks are below 150 KB. No tracking, third-party scripts, image framework, web fonts, or server renderer is loaded by the client. This is an asset/request-structure review, not a Lighthouse score or deployed Core Web Vitals claim.

## Reproduce

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4177 --strictPort
```

In another terminal:

```sh
PREVIEW_URL=http://127.0.0.1:4177 npm run check:production
node --experimental-strip-types --test tests/copy-email.test.mjs
```

Without `PREVIEW_URL`, output checks run and the HTTP test is explicitly skipped. The SVG artwork is the editable source; the committed JPEG is its browser export at 1200 × 630, rather than an image generated at build time. Keep that export synchronized if the artwork changes.

## Blockers and remaining limits

**No missing dependency or implementation blocker remains.** The canonical decision is recorded from the user; no domain ownership or live availability was inferred.

Actual Cloudflare routing/status responses, live canonical-domain HTTPS, CDN compression/caching, and third-party social-platform cache/debugger behavior require deployment and are unverified here. Ticket 09 verifies the generated files and local production preview only. Ticket 08's native zoom, physical touch, and spoken screen-reader verification limits remain unchanged; no additional device or screen-reader coverage is claimed.
