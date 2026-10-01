# Ticket 23 — Present TaskForge benchmark conclusions before methodology

**Status:** Ready for implementation planning; not implemented by this ticket-writing task.  
**Priority:** P1  
**Review recommendation:** 8 of 12  
**Depends on / coordinates with:** Ticket 16 defines the separate top-of-page summary.

## Shared requirements

Read [the employer-portfolio ticket index](README.md) for controlling facts, source precedence, common verification, and implementation boundaries. These requirements are part of this ticket.

## Problem and intended outcome

TaskForge's benchmark anchor currently opens on several paragraphs of method, hardware details, and a formula before the charts. Make the detailed section communicate its conclusions first while preserving all measured evidence.

## Implementation scope

- Reorder the detailed `#benchmarks` section: concise findings → charts with immediate workload captions → retry/recovery findings → methodology/environment/formulas and complete conditions.
- Lead with three findings: four workers delivered the highest tested no-op median (**1,284.015 tasks/sec**); synthetic 50 ms waits scaled **15.842×** at 16 workers (**99.0% parallel efficiency**); **30 abandoned attempts** had successful replacements in the hard-kill experiments.
- Use concise rounded summary displays (≈1,284; 15.84×) while retaining exact original values in charts/data/details. Do not mutate source measurements to their rounded displays.
- Keep no-op and synthetic-wait plots visibly distinct, with their own zero-based axes, units, all tested worker counts, and captions explaining the scaling shape.
- Preserve trial counts, 100 excluded warmup tasks, workload sizes, independently reset blocks, recorded host, throughput formula, and median/efficiency definitions.
- Preserve fail-once retries as **3,000 tasks / 6,000 attempts** in their own experiment. Preserve the hard-kill configuration and limits on observed zero-duplicate findings.
- Preserve **36.681 ms median-trial p95 recovery lag from lease expiration** and **25.271239 seconds median kill-to-final-drain** as different timing measures. Do not headline the former as crash-to-recovery time.
- Use a clearly titled method subsection; a native disclosure is optional only if deep linking, no-JS access, and keyboard behavior remain sensible.

## Files to inspect

- `src/pages/TaskForgeCaseStudy.tsx`
- `src/content/taskforge-case-study.ts`
- `src/content/taskforge.ts`
- `src/styles.css`

## Acceptance criteria

- Visiting `#benchmarks` presents a useful conclusion before formulas or long setup paragraphs.
- Every original numerical result, chart point, trial count, unit, and material condition remains accessible.
- Rounded headline and exact detail are consistent; no-op, wait, retry, and hard-kill experiments stay distinct.
- All charts have readable text equivalents and do not depend on hover or color alone.
- The section adds interpretation without claiming production capacity, universal reliability, or exactly-once execution.

## Verification

Compare all metric/configuration values before and after the edit. Review benchmark section at desktop/mobile sizes and verify axes/captions, deep links, and keyboard disclosures if used. Run shared checks.

Record the implementation, checks actually performed, screenshots where relevant, and any remaining dependency in `docs/ticket-23-verification.md`. Do not report unperformed checks as passing.

## Scope boundaries and handoff

This owns detailed-result storytelling; Ticket 16 owns the short header summary and Ticket 24 owns optional evidence links. Do not rerun or reopen verification of accepted statistics.
