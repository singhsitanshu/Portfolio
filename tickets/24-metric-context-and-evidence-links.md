# Ticket 24 — Make result definitions and supporting evidence easy to inspect

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P2  
**Review recommendation:** 9 of 12  
**Depends on / coordinates with:** Tickets 16 and 23; may proceed independently as a focused source/link review.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

The numbers are owner-verified. This ticket improves readers' ability to understand their scope and follow relevant public evidence, without downgrading accepted claims or turning missing links into public warnings.

## Implementation scope

- Treat `docs/content-sources.md` source precedence and Ticket 15's owner verification as authoritative: all existing website statistics are verified and true. Do not request benchmark artifacts as a condition for preserving or promoting them.
- CodeGraph: retain the baseline, tool-context definition, formula, and short exclusion of model prompts/generated answers. If existing authorized sources identify the measured repository, question set, sample count, or aggregation, add concise supporting context. Do not infer those details from unrelated examples.
- TaskForge: retain the workload, worker count, local Docker environment, median aggregation, and trial context already provided. Keep detailed setup close to its charts/methodology.
- Inspect the verified public repositories for relevant existing benchmark documentation, harnesses, or published reports. Add descriptive links to exact verified destinations where useful; a link to a harness is not automatically evidence of the displayed run.
- Do not link to local filesystem paths, private manuals, ignored artifacts, guessed raw-report URLs, or nonexistent anchors. Do not publish private source files to satisfy this ticket.
- Keep headline labels faithful to what was measured: retrieved context size, no-op processing throughput, synthetic-wait scaling, and scoped retry/recovery observations.
- Maintain an internal compact map from displayed metric to canonical data, definition, and any public supporting link. Record absent optional context internally without putting “unverified” or “missing evidence” banners on the site.
- Avoid an unnecessary extra citation on every repeated headline; provide a clear “Measurement details” path to the detailed section.

## Files to inspect

- `docs/content-sources.md`
- `optional docs/project-metric-map.md`
- `src/content/codegraph.ts`
- `src/content/taskforge.ts`
- `src/content/codegraph-case-study.ts`
- `src/content/taskforge-case-study.ts`
- `case-study pages`

## Acceptance criteria

- A reader can reach the definition and conditions of each headline metric from its display.
- All new public links resolve and substantiate their labels; local/private artifacts are absent from rendered HTML and assets.
- No existing verified metric is removed, weakened, hidden, or blocked by optional artifact availability.
- Unknown repository/sample/aggregation facts remain unknown internally, rather than becoming invented public claims.
- Metric language consistently avoids converting context reduction into accuracy/cost savings or local throughput into production capacity.

## Verification

Open every added evidence destination and check its relevance, not only its HTTP status. Compare metric definitions across hero/cards/case studies and scan generated output for private source paths. Run shared checks if content changes.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-24-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

This refines recommendation 9 in light of the repository's existing owner-confirmed metric policy. Link/context enrichment is optional where sources are unavailable; preservation of accepted achievements is mandatory.
