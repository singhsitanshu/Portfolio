# Ticket 28 — refreshed homepage social preview

## Follow-up: reduced side whitespace (October 2, 2026)

The current asset is now `public/social-preview-homepage-v3.jpg` (1200 × 630 JPEG, 72,877 bytes). This supersedes the v2 image described below. The composition places text 60 px from the left edge and the portrait 72 px from the right edge, versus approximately 300 px and 212 px in v2. Larger text and portrait fill the standard wide preview while retaining the complete hero copy, full original portrait, and comfortable padding. Navbar remains excluded. The wide framing takes precedence over v2's square-crop optimization; a square crop cannot retain all the content of this wider arrangement.

Updated the composition source, Open Graph/Twitter image URL, README, and production fixture to v3. Reviewed the actual JPEG at full size and [360 × 189](verification/social-preview-v3/small-preview.jpg). Build, production/HTTP checks (10 passed; optional Workers redirect check skipped), and `git diff --check` passed. Checks include JPEG signature, dimensions, size, matching image URLs/alt text, route metadata, and HTTP image delivery.

A fresh unauthenticated fetch of the live canonical homepage on October 2 still advertised `https://aanshsingh.com/social-preview-homepage-v2.jpg` in both image tags. The updated URL is `https://aanshsingh.com/social-preview-homepage-v3.jpg`. Actual messaging-app verification remains pending deployment through the existing owner-controlled workflow; the local small-preview screenshot is not a real shared-message result. No deployment or message was sent.

The following sections record the original v2 implementation and checks.

Local implementation verified October 2, 2026. Deployment and a real messaging-app share remain pending, following the ticket's owner-controlled deployment handoff.

## Deployed state inspected before changes

Fetched the canonical homepage's raw HTML and its referenced JPEG without authentication on October 2, 2026, approximately 09:51 UTC. Both responses returned HTTP 200; the image response was `image/jpeg`. Both `og:image` and `twitter:image` pointed to **https://aanshsingh.com/social-preview.jpg**.

The publicly served image was the old graphic featuring the name, developer-tool diagrams, and project names, with no portrait. Its 37,915 bytes exactly matched the repository's old JPEG. This establishes that the public image response itself is outdated relative to the current homepage; the report cannot be attributed solely to a messaging-app cache. Both public responses had `cf-cache-status: HIT`, which alone does not establish whether Cloudflare differs from the origin. No cache purge or platform refresh was performed.

Evidence: [metadata and image hash](verification/ticket-28/live-before.json), [homepage response headers](verification/ticket-28/live-homepage-headers.txt), and [image response headers](verification/ticket-28/live-image-headers.txt). The initial web reader could not fetch these URLs; direct HTTP retrieval succeeded. The old image remains at [public/social-preview.jpg](../public/social-preview.jpg) for old incoming image URLs.

## Implementation

- Added **`public/social-preview-homepage-v2.jpg`**: a valid **1200 × 630 JPEG, 61,379 bytes**. The composition uses the current homepage's exact hero copy and original portrait, Space Grotesk typography, colors, framed portrait, and background grid. It excludes the top navbar, browser chrome, development overlays, buttons, and social links. The owner's explicit navbar exclusion is satisfied.
- Changed `site.image` to **https://aanshsingh.com/social-preview-homepage-v2.jpg** through its versioned pathname. Open Graph and Twitter use this same absolute URL on all three pages. Image type/dimensions and `summary_large_image` remain intact.
- Updated the shared image alt text to: “Aansh Singh's homepage hero: his portrait, Software Engineer / UCLA Computer Science, and ‘Pragmatic, system-minded.’” The actual attribute uses double typographic quotation marks around the perspective. Both alt tags match.
- Added `scripts/social-preview.mjs` as the editable/reproducible composition source. It extracts the current prerendered hero and stylesheet into ignored `.social-preview/` HTML, with image-only layout overrides. The test preview serves the composition and actual-JPEG review pages under `/_test/`; none are included in production output. Retired the obsolete `public/social-preview.svg` rather than leaving it labeled as the new JPEG's source.
- Updated production checks for the new filename, exactly one image/alt tag per metadata family, aligned URLs/alt text, JPEG signature/dimensions, and the existing lightweight size limit. Existing route and HTTP checks remain intact.
- Documented capture and post-deployment refresh steps in [README](../README.md#social-preview-capture-and-refresh). Homepage source/styles, hero copy, favicon, page contents, canonical URLs, route titles/descriptions, and deployment configuration were not changed. The pre-existing ticket index edit and attached ticket were preserved.

## Capture recipe and image review

Run `npm run build`, `node scripts/social-preview.mjs`, and `node tests/homepage-preview.mjs`. Capture `http://127.0.0.1:4176/_test/social-preview.html` at a 1200 × 630 viewport, scale 1, 100% zoom, after fonts and the portrait finish loading. Save the viewport JPEG to the versioned public asset, rebuild, and inspect the delivered image using the small and center-crop routes documented in README.

The checked-in image was captured with the Codex browser screenshot API. The source reported loaded fonts, a loaded original portrait, zero navbar elements, and no horizontal overflow. The delivered JPEG was then viewed at full size, **360 × 189** messaging-preview size, and a **630 × 630 center crop**. The small preview keeps the name readable and face visible; supporting copy is finer at that scale. The square crop retains the full name, role/UCLA identity, perspective, and face, while cropping the outer portion of the portrait frame. No loading state or overlay appears.

- [Full-size delivered JPEG](../public/social-preview-homepage-v2.jpg)
- [Small preview screenshot](verification/ticket-28/small-preview.jpg)
- [Center crop screenshot](verification/ticket-28/center-crop.jpg)

## Checks actually performed

| Check | Outcome |
| --- | --- |
| `npm run build` | Passed TypeScript, Vite, and all route prerendering after the final JPEG capture. |
| `npm run check:production` | Passed: 9 tests; 2 optional HTTP/Workers checks skipped without URLs. |
| `PREVIEW_URL=http://127.0.0.1:4176 npm run check:production` | Passed on the final asset/build: 10 tests, 0 failures; optional Workers redirect test skipped. |
| Generated heads | Homepage and both case studies contain exactly one `og:image` and one `twitter:image`, with the new absolute URL; matching alt tags, JPEG declarations, 1200 × 630 dimensions, and large-image card pass. No JavaScript is required for these tags. |
| Preservation comparison | All three page bodies match the pre-ticket build after excluding the changed client script filename. Canonical links, titles, and every non-image meta tag match exactly. |
| JPEG and HTTP delivery | JPEG signature/dimensions and <150 KB limit pass. `sips` independently reports JPEG / 1200 × 630. Local GET returns HTTP 200 and `image/jpeg`; served bytes match the public file exactly. |
| Visual checks | Actual JPEG inspected at full size, 360 × 189, and 630 × 630 center crop. Navbar absent. |
| `git diff --check` | Passed. |

Final route metadata, preservation results, image size/hash, and local delivery evidence: [local-checks.json](verification/ticket-28/local-checks.json). Final JPEG SHA-256: `a1a786889e22f5ae8517e44f2af6fa5163b29ceaed33526e3c0277b9f97b7e36`.

No navigation or copy-email test was run because neither behavior changed. No live new-image delivery or messaging cache success is claimed.

## Pending acceptance and handoff

No missing dependency blocked the local implementation. The following checks require the owner-controlled deployment and an actual share:

1. **Pending deployment:** verify public raw HTML for all three canonical pages and the new JPEG return HTTP 200 without authentication, with correct metadata, content type, and expected image bytes. Verify preview crawlers can retrieve the image.
2. **Pending cache check:** if those public responses are stale, purge the affected Cloudflare URL entries and re-fetch them. Only after public delivery is correct, use supported platform refresh tools where available. README links the official Cloudflare instructions, Meta Sharing Debugger, and LinkedIn Post Inspector; these tools were not invoked.
3. **Pending messaging test:** make a fresh canonical-homepage share in at least one messaging app the owner uses. Record the app, date, screenshot/result, and whether the new preview appears. No app/share was tested here; any platform cache delay is currently unknown and must be recorded separately from successful public delivery.

Existing messages and all platform caches cannot be promised to refresh immediately. The local JPEG review screenshots above are image checks, not messaging-app results. No deployment, cache purge, or message was sent.
