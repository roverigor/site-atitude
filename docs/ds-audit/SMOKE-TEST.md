# Visual Smoke Test Checklist

Performed via Playwright MCP on 2026-05-24 against the dev server (Next.js 15.5.12 turbopack). All 15 routes captured at 1440x900 viewport in both light and dark mode (30 screenshots total in `screenshots/`).

## How to re-run

```bash
npm run dev
```

Open each route at 1440x900. Toggle dark via `localStorage.theme = 'dark'` + reload (or via the `ThemeToggle` in Header). Visual regression checks:
- Fonts load (Poppins everywhere, Caveat where used)
- No layout shift on hydration
- Dark mode toggles cleanly (no flash of unstyled content)
- All gradients render with DS magenta/violet/etc. (no flat color fallback)
- All icons visible (no missing `aria-hidden` confusion)

## Routes verified

| # | Route | Light | Dark |
|---|---|---|---|
| 01 | `/` (homepage control) | [01-home-light.png](screenshots/01-home-light.png) | [01-home-dark.png](screenshots/01-home-dark.png) |
| 02 | `/sobre` | [02-sobre-light.png](screenshots/02-sobre-light.png) | [02-sobre-dark.png](screenshots/02-sobre-dark.png) |
| 03 | `/contato` | [03-contato-light.png](screenshots/03-contato-light.png) | [03-contato-dark.png](screenshots/03-contato-dark.png) |
| 04 | `/blog` | [04-blog-light.png](screenshots/04-blog-light.png) | [04-blog-dark.png](screenshots/04-blog-dark.png) |
| 05 | `/blog/atitude-ensino-completa-15-anos` (post) | [05-blog-post-light.png](screenshots/05-blog-post-light.png) | [05-blog-post-dark.png](screenshots/05-blog-post-dark.png) |
| 06 | `/blog/tag/ingles` | [06-blog-tag-light.png](screenshots/06-blog-tag-light.png) | [06-blog-tag-dark.png](screenshots/06-blog-tag-dark.png) |
| 07 | `/blog/categoria/ingles` | [07-blog-categoria-light.png](screenshots/07-blog-categoria-light.png) | [07-blog-categoria-dark.png](screenshots/07-blog-categoria-dark.png) |
| 08 | `/depoimentos` | [08-depoimentos-light.png](screenshots/08-depoimentos-light.png) | [08-depoimentos-dark.png](screenshots/08-depoimentos-dark.png) |
| 09 | `/formaturas` | [09-formaturas-light.png](screenshots/09-formaturas-light.png) | [09-formaturas-dark.png](screenshots/09-formaturas-dark.png) |
| 10 | `/ingles` | [10-ingles-light.png](screenshots/10-ingles-light.png) | [10-ingles-dark.png](screenshots/10-ingles-dark.png) |
| 11 | `/parceiros` | [11-parceiros-light.png](screenshots/11-parceiros-light.png) | [11-parceiros-dark.png](screenshots/11-parceiros-dark.png) |
| 12 | `/cursos` (control) | [12-cursos-light.png](screenshots/12-cursos-light.png) | [12-cursos-dark.png](screenshots/12-cursos-dark.png) |
| 13 | `/cursos/programacao` (control) | [13-curso-detail-light.png](screenshots/13-curso-detail-light.png) | [13-curso-detail-dark.png](screenshots/13-curso-detail-dark.png) |
| 14 | `/obrigado` | [14-obrigado-light.png](screenshots/14-obrigado-light.png) | [14-obrigado-dark.png](screenshots/14-obrigado-dark.png) |
| 15 | `/this-route-does-not-exist` (404) | [15-notfound-light.png](screenshots/15-notfound-light.png) | [15-notfound-dark.png](screenshots/15-notfound-dark.png) |

## Findings during capture

- **CSS bug found and fixed during smoke test:** Tailwind 4 turbopack was scanning `docs/superpowers/specs/2026-05-23-ds-rollout-design.md` and picking up the literal placeholder `bg-[var(--color-...)]` as a class candidate, generating invalid CSS (`background-color: var(--color-...);`) that broke dev compilation. Fixed in commit `b8f2128` by replacing the placeholder with a real example token (`bg-[var(--color-background)]`). Production build was not affected (only turbopack dev).
- **Playwright session log self-poisoning:** The fix above re-poisoned the dev compiler because `.playwright-mcp/console-*.log` recorded the error message containing `var(--color-...)`, and Tailwind kept re-scanning the logs. Mitigated by adding `/.playwright-mcp/` to `.gitignore` and clearing `.next/cache` before restarting dev (commit `304b62d`).
- All 15 routes render in both themes with no missing fonts, no layout shift, and no console errors related to the rollout. The `/ingles` magenta gradient renders correctly with the DS `--color-magenta-600` token (post-fix from raw `#C2185B`).
- Dark mode confirmed working — body sections invert from cream to navy with proper text contrast. Hero gradients (which use DS pillar colors directly) intentionally remain unchanged between modes.

## Sign-off

- [x] All 15 routes captured light + dark
- [x] No new console errors in any route
- [x] Dev compile clean after fix `b8f2128`
- [x] Screenshots committed to `docs/ds-audit/screenshots/`
