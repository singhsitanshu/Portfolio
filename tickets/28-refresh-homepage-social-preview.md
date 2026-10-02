# Ticket 28 — Refresh the link thumbnail to match the current homepage

**Status:** Ready for implementation; not implemented by this ticket-writing task.  
**Priority:** P2  
**Created:** October 2, 2026  
**Depends on / coordinates with:** Existing Ticket 09 metadata infrastructure; use the final current homepage as the visual reference.

## Problem and intended outcome

The owner reports that sharing `https://aanshsingh.com/` in messages still displays the V1 homepage thumbnail. The repository explicitly points both Open Graph and Twitter card metadata at `/social-preview.jpg`; the thumbnail is a separate asset and does not automatically follow homepage edits. Live metadata and image contents were not verified during ticket creation, so distinguish an outdated deployed asset from platform caching during implementation.

New shares should present an image that accurately reflects the current homepage's visual identity, portrait, typography, colors, and composition, with readable content at messaging-preview size.

## Implementation scope

- Inspect the deployed homepage's raw HTML and referenced image before making changes. Record the existing `og:image` and `twitter:image` URLs and whether the image itself is outdated.
- Create a 1200 × 630 JPEG from a clean capture or faithful composition of the current rendered homepage. Preserve its existing hero copy, portrait, styling, and identity. Crop or arrange the preview to keep the name, portrait, and key identity visible; avoid shrinking an entire page into an unreadable thumbnail. Exclude browser chrome, development overlays, loading states, and unrelated UI.
- Keep a reproducible capture recipe or editable source. Update or retire `public/social-preview.svg` if it no longer represents the delivered image, and document the new source in the README.
- Publish the new image under a distinct versioned filename, such as `/social-preview-homepage-v2.jpg`, and point `site.image` in `src/content/metadata.ts` to it. Do not rely only on overwriting the old filename. Use a new filename for subsequent material redesigns.
- Keep `og:image` and `twitter:image` aligned on the same absolute HTTPS URL. Retain the JPEG type, 1200 × 630 dimensions, and `summary_large_image` card. Update both image alt tags through `site.imageAlt` to accurately describe the delivered image.
- Preserve canonical page URLs, route-specific titles/descriptions, and the existing prerendered metadata. The shared image setting currently affects the project case studies too: verify their metadata remains correct; separate project artwork is outside this ticket.
- Update existing production checks that hardcode the old image URL and asset path, retaining meaningful checks for URL consistency, JPEG signature, dimensions, and asset availability. Update the README asset references.
- Document the post-deployment refresh procedure: verify public HTML and image responses first; purge relevant Cloudflare cache entries if those responses are stale; then request a re-scrape using supported platform tools where available. For messaging platforms without a refresh tool, test a fresh share and record any remaining cache delay. Do not promise that existing messages or every platform cache can be refreshed immediately.

## Files to inspect

- `src/content/metadata.ts`
- `src/components/RouteMetadata.tsx`
- `src/pages/Home.tsx` and homepage styles as visual references only
- `public/social-preview.jpg` and `public/social-preview.svg`
- `tests/production.test.mjs`
- `README.md` and the existing prerender/build pipeline

## Acceptance criteria

- The new image visibly matches the current homepage, with legible identifying content at preview size and a usable center crop.
- The homepage's generated HTML contains exactly one `og:image` and one `twitter:image`, both pointing to the new absolute versioned image URL without requiring JavaScript execution.
- The declared image type, dimensions, and alt text match the delivered asset. The image is a valid 1200 × 630 JPEG.
- Existing canonical URLs and route-specific metadata remain correct for the homepage and both case studies.
- After deployment, the canonical homepage and new image return HTTP 200 publicly without authentication; the image response has the correct image content type and is accessible to preview crawlers.
- A fresh share is checked in at least one messaging app used by the owner. Record the app, date, screenshot/result, and whether the new preview appears. Any unresolved platform cache delay is explicitly recorded, separately from successful asset/metadata delivery.
- No homepage layout, hero copy, favicon, or unrelated site content changes are introduced.

## Verification and handoff

Run `npm run build` and `npm run check:production`. Inspect the generated homepage and case-study heads, view the actual JPEG at full size and a small preview size, and verify local HTTP image delivery using the existing production preview workflow.

Record implementation details, source/capture instructions, old and new image URLs, checks actually performed, and preview screenshots in `docs/ticket-28-verification.md`. Deliver a reviewable local change; deployment follows the existing owner-controlled workflow. Keep live verification and messaging-cache checks marked pending until deployment and actual testing occur.
