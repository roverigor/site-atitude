# DS Polish Index

Follow-up to PR #2 (DS rollout). Resolves the 🟡 YELLOW findings deferred during the rollout audits.

Plan: [2026-05-24-ds-polish.md](../superpowers/plans/2026-05-24-ds-polish.md)

## Status

| # | Piece | Audit doc | YELLOWs | State | Polish commits |
|---|---|---|---|---|---|
| 00 | Header | [00-layout-header.md](00-layout-header.md) | 1 | ✅ done | 1 |
| 02 | MobileNav | [02-layout-mobilenav.md](02-layout-mobilenav.md) | 2 | ⏸ still-deferred | 1 |
| 03 | /obrigado | [03-page-obrigado.md](03-page-obrigado.md) | 0 | ✅ done | 0 |
| 04 | /not-found | [04-page-notfound.md](04-page-notfound.md) | 7 | ⬜ pending | 0 |
| 05 | /blog (all) | [05-page-blog.md](05-page-blog.md) | 4 | ⬜ pending | 0 |
| 06 | /depoimentos | [06-page-depoimentos.md](06-page-depoimentos.md) | 3 | ⬜ pending | 0 |
| 07 | /formaturas | [07-page-formaturas.md](07-page-formaturas.md) | 3 | ⬜ pending | 0 |
| 08 | /sobre | [08-page-sobre.md](08-page-sobre.md) | 8 | ⬜ pending | 0 |
| 09 | /ingles | [09-page-ingles.md](09-page-ingles.md) | 1 | ⬜ pending | 0 |
| 10 | /parceiros | [10-page-parceiros.md](10-page-parceiros.md) | 13 | ⬜ pending | 0 |
| 11 | /contato | [11-page-contato.md](11-page-contato.md) | 5 | ⬜ pending | 0 |

**Total YELLOWs: 50.** Footer (01) had 0 YELLOWs at rollout time — skipped here.

Legend: ⬜ pending · 🟦 in progress · ✅ done · ⏸ still-deferred (structural)

## Polish commit prefix

`polish(<scope>): <one-line>` — distinct from rollout's `redesign(...)` / `fix(...)`.

## Still-deferred items

A subset of YELLOWs may stay 🟡 (with reason) even after this PR because they need:
- Cross-component refactors
- New DS token definitions
- Structural framer-motion changes

These are explicitly listed in each task's report and remain logged in the audit docs for future work.
