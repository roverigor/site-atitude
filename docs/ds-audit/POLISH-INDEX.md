# DS Polish Index

Follow-up to PR #2 (DS rollout). Resolves the 🟡 YELLOW findings deferred during the rollout audits.

Plan: [2026-05-24-ds-polish.md](../superpowers/plans/2026-05-24-ds-polish.md)

## Status

| # | Piece | Audit doc | YELLOWs | State | Polish commits |
|---|---|---|---|---|---|
| 00 | Header | [00-layout-header.md](00-layout-header.md) | 1 | ✅ done | 1 |
| 02 | MobileNav | [02-layout-mobilenav.md](02-layout-mobilenav.md) | 2 | ⏸ still-deferred | 1 |
| 03 | /obrigado | [03-page-obrigado.md](03-page-obrigado.md) | 0 | ✅ done | 0 |
| 04 | /not-found | [04-page-notfound.md](04-page-notfound.md) | 4 | ✅ done | 0 |
| 05 | /blog (all) | [05-page-blog.md](05-page-blog.md) | 4 | ⏸ still-deferred | 3 |
| 06 | /depoimentos | [06-page-depoimentos.md](06-page-depoimentos.md) | 3 | ⏸ still-deferred | 0 |
| 07 | /formaturas | [07-page-formaturas.md](07-page-formaturas.md) | 2 | ⏸ still-deferred | 2 |
| 08 | /sobre | [08-page-sobre.md](08-page-sobre.md) | 5 | ⏸ still-deferred | 2 |
| 09 | /ingles | [09-page-ingles.md](09-page-ingles.md) | 1 | ⏸ still-deferred | 0 |
| 10 | /parceiros | [10-page-parceiros.md](10-page-parceiros.md) | 9 | ⏸ still-deferred | 4 |
| 11 | /contato | [11-page-contato.md](11-page-contato.md) | 5 | ⏸ still-deferred | 3 |

**Total YELLOWs: 47.** Footer (01) had 0 YELLOWs at rollout time — skipped here. (04 /not-found: 3 retroactively resolved during rollout + 1 still-deferred as new-feature = 4 effective YELLOWs.)

Legend: ⬜ pending · 🟦 in progress · ✅ done · ⏸ still-deferred (structural)

## Polish commit prefix

`polish(<scope>): <one-line>` — distinct from rollout's `redesign(...)` / `fix(...)`.

## Still-deferred items

A subset of YELLOWs may stay 🟡 (with reason) even after this PR because they need:
- Cross-component refactors
- New DS token definitions
- Structural framer-motion changes

These are explicitly listed in each task's report and remain logged in the audit docs for future work.

---

## Sign-off

- [x] All YELLOW backlog items addressed (resolved or explicitly still-deferred with reason)
- [x] Global V-HEX: only known Badge-color-prop exceptions remain in polished files; additional pre-existing hits (LP pages, `PillarsStrip.tsx`, `CourseCard.tsx`, `cursos/page.tsx`, `layout.tsx`) were not in scope for this polish PR and pre-date the branch on `main`
- [x] Global V-PALETTE: `Badge.tsx` and `CourseSidebar.tsx` are known rollout-era exceptions; LP pages (`aula-gratuita-a/b`) use `bg-pink-50`, `bg-indigo-50` as intentional non-semantic decoration — all pre-date this branch
- [x] npm run lint: PASS (35 problems = same pre-existing baseline; no new warnings introduced)
- [x] npm run build: PASS (compiled successfully, 77/77 static pages generated)
- [x] CodeRabbit: 4 findings total (0 critical, 0 high, 0 medium, 4 low/potential_issue — all in audit docs, stale "Out of scope" entries referencing resolved items; no source-code issues)

## Totals

- **Polish commits:** 15
- **Fix commits:** 1 (Task 7 hex correction — `fix(page-formaturas): correct typeColors hex values`)
- **YELLOWs resolved this PR:** 20 (Header×1, MobileNav×1, /not-found×3 retroactive, /blog×3, /formaturas×1, /sobre×2, /parceiros×6, /contato×3)
- **YELLOWs still-deferred:** 16

## Still-deferred summary

The following items were explicitly deferred with documented reasons and remain as future work:

- **MobileNav** (02-layout-mobilenav.md): Focus restoration on close — requires triggerRef from Header.tsx (structural cross-component refactor, out of scope for polish PR)
- **/not-found** (04-page-notfound.md): No entry animation — framer-motion entrance is new-feature, out of scope for DS-compliance polish PR
- **/blog** (05-page-blog.md): `BlogCard` raw `transition={{ duration: 0.35 }}` — falls between DS tokens; cross-component decision needed (CourseCard uses same value)
- **/depoimentos** (06-page-depoimentos.md): "Destaques" `h2` uses `text-lg font-semibold` — structural; section label semantics differ from content heading
- **/depoimentos** (06-page-depoimentos.md): `bg-white` on FeaturedCard/TestimonialCard — Tailwind 4 alias for `--color-paper` (functionally identical); dark mode already uses `--color-background-alt`
- **/depoimentos** (06-page-depoimentos.md): `TestimonialCard` framer-motion `transition={{ duration: 0.2 }}` — framer-motion props cannot reference CSS vars; inline numeric is accepted constraint
- **/formaturas** (07-page-formaturas.md): `h3` empty-state heading uses `text-lg font-semibold` — intentional 18px size for empty-state context; `.h3` 28px would be disproportionate
- **/sobre** (08-page-sobre.md): No entrance animation on Hero heading/subtitle — structural framer-motion addition (new feature, out of scope)
- **/sobre** (08-page-sobre.md): Milestone `h3` uses bare `text-lg font-semibold` — intentional smaller scale for repeating inline items
- **/sobre** (08-page-sobre.md): Milestone entries have no entrance animation — structural framer-motion addition (new feature, out of scope)
- **/ingles** (09-page-ingles.md): `border-white text-white hover:bg-white/10` raw Tailwind white on outline Button — accepted overlay idiom (used in /sobre, /formaturas CTAs too); no `.btn-overlay` DS class exists
- **/parceiros** (10-page-parceiros.md): `text-[var(--color-brand-navy)] dark:text-white` — `dark:text-white` could be `dark:text-[var(--color-foreground)]` for consistency; semantic equivalence in dark mode; not a blocker
- **/parceiros** (10-page-parceiros.md): "Passo N" label manually recreates `.eyebrow` pattern with inline style color — `.eyebrow` color (brand-purple) conflicts with violet section context; risk of visual regression
- **/parceiros** (10-page-parceiros.md): `h2` at line 251 uses inline `text-xl md:text-2xl font-bold text-white` on `variant="dark"` section — intentional white-on-dark for dark-variant section
- **/contato** (11-page-contato.md): `duration: 0.5` raw float in `fadeUp` transition — framer-motion props cannot consume CSS vars; inline numeric is established constraint
- **/contato** (11-page-contato.md): `prefers-reduced-motion` not observed by framer-motion `fadeUp` — global CSS rule only covers CSS transitions; `useReducedMotion()` pattern not enforced site-wide (out of scope)
