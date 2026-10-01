# Employer-facing portfolio improvement tickets

Prepared October 1, 2026 from the homepage/case-study review and the current repository. This batch contains **12 implementation tickets**, one for each recommendation, numbered **16–27** to continue the existing backlog. Creating these tickets does not implement or deploy website changes. Earlier Tickets 01–15 remain historical context.

## Owner clarification and controlling facts

- CodeGraph's LangGraph ReAct agent is powered by **Claude Sonnet 5**, per the owner's October 1, 2026 clarification. Name it in technical architecture details; do not infer the model used for historical measurements.
- Aansh independently built **both CodeGraph and TaskForge during summer 2026 before the school year began**. All project contribution is his. Do not request confirmation of solo ownership again or describe him as a partial contributor.
- Public phrasing should use “Solo project · Summer 2026” and a concise first-person contribution statement. Do not infer that the summer preceded his first year of college.
- Existing owner-verified metrics remain accepted. `docs/content-sources.md` and Ticket 15 establish their precedence over older audit notes. This batch promotes achievements; it does not reopen their validity, ask for proof before using them, or restore “missing evidence” disclaimers.
- Preserve metric meanings and material conditions: CodeGraph context reduction is supported-source tokens versus retrieved tool context; TaskForge worker scaling uses synthetic 50 ms waits in local Docker. Do not convert either into unmeasured user/business outcomes.
- Exact numerical data, test counts, and configuration values remain intact. Concise displays may round values transparently, while detailed evidence preserves the existing precision.
- These tickets supersede older layout restrictions where necessary to implement the newly requested recommendations (e.g. original result placement and interleaved experience ordering). They do not supersede factual accuracy, owner-selected identity/contact details, or the solo-build clarification.
- Specific recruiting availability, desired season, location, and employment type are not supplied. Use evergreen employer-facing copy unless an explicit authoritative owner fact is available. Missing optional facts do not block otherwise independent work.

## Ticket map

| Original recommendation | Implementation ticket | Priority |
| --- | --- | --- |
| 1 | [16 — Move case-study achievements to the top](16-case-study-results-first.md) | P1 |
| 2 | [17 — Lead homepage project cards with measured results](17-homepage-project-results.md) | P1 |
| 3 | [18 — Condense and reposition engineering tradeoffs](18-focused-engineering-tradeoffs.md) | P2 |
| 4 | [19 — Make solo ownership and summer project context explicit](19-solo-project-ownership.md) | P1 |
| 5 | [20 — Give the homepage hero a concrete engineering pitch](20-employer-focused-hero.md) | P1 |
| 6 | [21 — Improve first-screen density and responsive reading order](21-information-density-and-reading-order.md) | P2 |
| 7 | [22 — Show real project interfaces and a concrete walkthrough](22-authentic-project-demonstrations.md) | P2 |
| 8 | [23 — Present TaskForge benchmark conclusions before methodology](23-taskforge-benchmark-story.md) | P1 |
| 9 | [24 — Make result definitions and supporting evidence easy to inspect](24-metric-context-and-evidence-links.md) | P2 |
| 10 | [25 — Replace generic technical narration with concrete engineering stories](25-specific-engineering-stories.md) | P2 |
| 11 | [26 — Prioritize engineering experience while preserving leadership breadth](26-engineering-experience-prominence.md) | P2 |
| 12 | [27 — Make the contact section invite software engineering opportunities](27-employer-contact-invitation.md) | P2 |

P1 means the first implementation group because it directly improves the visibility of achievements/ownership. P2 means a supporting improvement, not optional acceptance criteria.

## Suggested implementation sequence

1. **19 → 16 → 17:** establish ownership and reusable metric data, then surface results in case-study headers and homepage cards.
2. **27 → 20 → 23:** align employer invitation, hero pitch, and detailed TaskForge benchmark storytelling.
3. **18 → 25:** condense decisions, then build specific engineering stories without duplication.
4. **24 and 26:** enrich measurement context/public evidence links where available and reorganize experience.
5. **22 → 21:** add authentic product media, then perform the final density/responsive pass. If media is unavailable, complete 21 with existing labeled diagrams and document the media dependency.

The sequence is advisory, not permission to expand any individual ticket. Overlapping changes to shared components should be integrated sequentially. A ticket with optional missing evidence/media can report that dependency while unrelated completed work proceeds.

## Shared implementation requirements

- Retain the existing React/TypeScript/Vite static-first site, Cloudflare deployment compatibility, visual identity, portrait, verified routes, résumé, and contact destinations. No new backend, CMS, contact form, or deployment is implied.
- Use the existing content modules as the source for public facts. Add shared data only where it prevents divergent values or ownership copy; avoid a broad content-system rewrite.
- Follow actual rendering paths. Some old feature-module fields are unused; changing a dormant field does not satisfy a visible-content requirement.
- Prefer outcome → contribution → explanation in the first reading path. Keep essential metric context adjacent to the metric, with deeper methods farther down.
- Keep semantic headings, native links/buttons, visible focus, reduced motion, useful alt text, and responsive reading order. Reordering CSS alone is insufficient when it conflicts with document order.
- Preserve incoming anchors and navigation. The current case-study pages destructure sections by array position; take care that reordered navigation does not assign the wrong heading to a section body.
- Do not invent users, adoption, production deployment, commercial savings, security certification, exactly-once effects, personal motivations, or historical debugging incidents.
- Private manuals/source documents may inform copy but must not be copied into public assets or referenced through local paths on the website. Existing conceptual images remain labeled as such.
- Do not remove or rewrite unrelated career dates, graduation date, résumé bytes, repository URLs, or preferred contact information.

## Common verification for implementation

For tickets changing site content/components/styles, run `npm run build` and `npm run check:production`. Run existing focused navigation or copy-email checks when the changed behavior warrants it:

```sh
node --experimental-strip-types --test tests/navigation.test.mjs
node --experimental-strip-types --test tests/copy-email.test.mjs
```

Inspect affected routes in a browser at desktop and mobile sizes. For structural/layout changes use 1440×900, 768×1024, and 390×844; include 320-pixel reflow, 200% text enlargement, keyboard navigation, and reduced motion in Ticket 21's integration pass. Verify critical copy appears in prerendered HTML. Check actual final destinations for any new public links.

Use existing checks and focused manual verification. Do not add brittle tests that assert every sentence or pixel position. Add a regression test only where a meaningful behavioral risk justifies it. Update any existing assertion deliberately superseded by these tickets without weakening unrelated coverage.

Record actual outcomes in each ticket's verification note. A deployment is a separate action; completion of these tickets should yield a reviewable local implementation with clear remaining dependencies.

## Source references

- [Live homepage](https://aanshsingh.com/)
- [CodeGraph case study](https://aanshsingh.com/projects/codegraph)
- [TaskForge case study](https://aanshsingh.com/projects/taskforge)
- [Content source precedence](../docs/content-sources.md)
- [Previous editorial requirements](15-project-case-study-editorial-polish.md)
- [Career source map](../docs/ticket-14-content-map.md)

No current website implementation was changed by the creation of this backlog.
