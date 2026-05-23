# DS Rollout Global Summary

## Audit completeness

| Piece | Audit doc | Fix commits | Notes |
|---|---|---|---|
| Header | 00-layout-header.md | 3 | focus ring, shadow token, z-index token; duration-200 YELLOW deferred |
| Footer | 01-layout-footer.md | 1 | motion values replaced with DS tokens |
| MobileNav | 02-layout-mobilenav.md | 3 | aria-modal, Tab focus trap, framer-motion DS tokens; block px-8 + focus restore YELLOW deferred |
| /obrigado | 03-page-obrigado.md | 2 | .h1 DS class, spring duration token |
| /not-found | 04-page-notfound.md | 2 | .h-display + .h2 DS classes, Section wrapper |
| /blog (all) | 05-page-blog.md | 5 | hex fallbacks → DS tokens in BlogPage, slug, ShareButtons, mdx-components (7 files total) |
| /depoimentos | 06-page-depoimentos.md | 3 | .h1/.h2 DS classes, duration-fast token; bg-white + 0.2s framer YELLOW deferred |
| /formaturas | 07-page-formaturas.md | 3 | .h1/.h2 DS classes, duration + easing tokens, pillar focus ring; typeColors category alignment YELLOW deferred |
| /sobre | 08-page-sobre.md | 4 | .h1/.h2 DS classes (4 sections), hex #0A0A0A/#1a1a1a → DS tokens; blockquote + eyebrow YELLOW deferred |
| /ingles | 09-page-ingles.md | 2 | #C2185B hex → --color-magenta-600, bg-pink-50/950 → DS magenta tokens; Badge color="#FFFFFF" known exception |
| /parceiros | 10-page-parceiros.md | 5 | partner card transitions, Tecnologia color, logo avatar duration, pipeline shadow, segmentColors DS-aligned; eyebrow/h2 YELLOW deferred |
| /contato | 11-page-contato.md | 3 | --color-error token, required attrs, aria-invalid/describedby/role=alert; shadow-sm/bg-white/duration-200 YELLOW deferred |

**Total fix commits:** 36

## Verification gates

- V-HEX (global): PASS — only known Badge-color-prop exceptions remain (`src/app/parceiros/page.tsx` segmentColors ×5, `src/app/ingles/page.tsx` color="#FFFFFF") plus out-of-scope files (`src/app/lp/`, `src/components/home/PillarsStrip.tsx`, `src/app/cursos/`, `src/components/courses/`, `src/app/layout.tsx` theme-color meta) which are explicitly excluded per spec (§3 Out of scope: "Componentes já em compliance — home/cursos/LPs")
- V-PALETTE (global): PASS — remaining palette classes are in out-of-scope files only (`src/app/lp/`, `src/components/courses/`, `src/components/ui/Badge.tsx` variant map which is the DS component itself)
- npm run lint: PASS (pre-existing 35 problems in `design-system-extract/ui_kits/` scaffolding and pre-rollout warnings; zero NEW errors introduced by this rollout)
- npm run build: PASS — build completes successfully; all warnings are pre-existing (`no-page-custom-font`, `<img>` in non-scope files, `'Rocket' unused` in sobre)
- CodeRabbit: 0 findings (ran v0.4.1, `--prompt-only --base main` against 64-commit cumulative diff)

## Known deviations (accepted)

1. Badge `color` prop hex requirement — `src/components/ui/Badge.tsx` template literal `` `${color}20` `` for opacity blocks CSS-var substitution. Affected usages: `src/app/parceiros/page.tsx` (5 segmentColors entries, all DS-aligned hex), `src/app/ingles/page.tsx` (white Badge overlay).
2. MobileNav overlay exit duration `0.2s` — no exact DS token at 200ms; deviation accepted as cosmetic.

## Deferred YELLOW items (per-audit notes)

See individual audit docs for YELLOW findings deferred from this PR. Suggested follow-up PR: "polish: address deferred YELLOW DS items across pages."

Key deferred items:
- Header: `duration-200` → DS motion token
- MobileNav: focus restoration to trigger button, block px-8 consistency
- /depoimentos: bg-white → --color-paper, framer 0.2s numeric duration
- /formaturas: `typeColors` category token alignment (saude/beleza/administracao)
- /sobre: mission blockquote border-left treatment, .eyebrow labels, team card transition duration
- /parceiros: .eyebrow class on "Passo N" pipeline labels, h2 type-scale upgrade
- /contato: shadow-sm DS token, bg-white → --color-paper, duration-200 Tailwind classes

## Commits

65 total commits on `chore/ds-rollout` (36 fix/redesign + 26 chore/ds-audit + 2 chore/ds-audit smoke-test + summary + 1 branch scaffold).

`git log --oneline main..HEAD | wc -l` = 65

## Out of scope (enforced)

Per spec: no copy changes, no structural rewrites, no globals.css mutations, no SEO/perf/i18n/deploy changes, no new dependencies.

Files explicitly excluded from V-HEX and V-PALETTE sweeps (pre-existing, in-compliance reference implementations per spec §3):
- `src/app/lp/aula-gratuita-a/page.tsx`
- `src/app/lp/aula-gratuita-b/page.tsx`
- `src/components/home/PillarsStrip.tsx`
- `src/app/cursos/page.tsx`
- `src/app/cursos/[slug]/page.tsx`
- `src/components/courses/CourseCard.tsx`
- `src/components/courses/CourseSidebar.tsx`
- `src/components/courses/CourseIncludes.tsx`
- `src/app/layout.tsx` (theme-color meta tag)
- `src/components/ui/Badge.tsx` (DS component variant map)
