# Audit: /ingles (`src/app/ingles/page.tsx`)

## Snapshot
- **Path(s):** `src/app/ingles/page.tsx`
- **Linhas:** 290
- **Última edição:** `df657b1 — 2026-03-22 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/colors-magenta-scale.html`, `buttons.html`, `cards.html`
- Vivo: `src/app/cursos/[slug]/page.tsx`, `src/components/home/Hero.tsx`
- Pilar mapping: magenta (pilar idiomas)

## Findings

### Section: Hero (lines 79–138)

#### 1. Type scale
- 🟢 `text-4xl md:text-5xl lg:text-6xl font-bold` at L99 — matches DS h1 spec for hero headings.
- 🟢 `text-lg md:text-xl` at L106 — correct subtext scale.

#### 2. Spacing
- 🟢 `py-20 md:py-28` at L79 — consistent with other hero sections.
- 🟢 `mb-6`, `mb-8`, `mb-10` rhythm — standard DS vertical spacing.

#### 3. Color treatment
- 🔴 L79 — `via-[#C2185B]` raw hex literal in hero gradient class. `#C2185B` is a deep magenta that has no DS token mapping. The closest DS token is `--color-magenta-600: #D9003F` (the darkest defined shade; `#C2185B` is slightly cooler/darker but sits well within magenta-600 intent as gradient midpoint). — Fix: replace `via-[#C2185B]` with `via-[var(--color-magenta-600)]`.
- 🟢 L91 — `color="#FFFFFF"` is a Badge prop receiving explicit white for icon contrast on the colored hero background. Intentional and correct; not a DS violation.
- 🟢 L101 — `text-[var(--color-brand-green)]` — correct token usage for salary callout highlight.

#### 4. Motion
- 🟢 No non-standard transitions in hero.

---

### Section: Levels / Course Cards (lines 140–215)

#### 1. Type scale
- 🟢 `text-3xl md:text-4xl font-bold` at L144 — correct section heading scale.
- 🟢 `text-lg font-bold` at L163, `text-sm` at L167 — correct card title/body hierarchy.

#### 2. Spacing
- 🟢 `mb-12` section gap, `gap-6` grid — consistent with DS card grids.
- 🟢 `p-6`, `pt-2`, `mb-4` card internals — within DS spec.

#### 3. Color treatment
- 🔴 L173 — `bg-pink-50 dark:bg-pink-950/20` on course meta chip (`<span>`). Both are raw Tailwind palette classes with no DS token mapping. Context: light-wash tint behind icon + label in card; `bg-pink-50` is light-mode wash, `dark:bg-pink-950/20` is dark-mode wash with 20% opacity. DS equivalent: `bg-[var(--color-magenta-100)]` (light wash, `#FFD2DE`) and `dark:bg-[var(--color-magenta-600)]/20` (darkened accent at 20%). — Fix: replace both classes on L173.
- 🔴 L177 — `bg-pink-50 dark:bg-pink-950/20` — identical violation on second meta chip in the same card map. Same element pattern, same fix. — Fix: replace both classes on L177 (same replacement as L173).
- 🟢 L157 — `hover:border-[var(--color-brand-pink)]/40` — correct token usage.
- 🟢 L160 — gradient from/to via DS tokens `--color-brand-pink` / `--color-brand-purple` — clean.
- 🟢 L192 — `text-[var(--color-brand-pink)]` — correct.

#### 4. Motion
- 🟢 `transition-all duration-300 hover:-translate-y-1` at L157 — standard DS card hover.

---

### Section: Differentials (lines 217–251)

#### 1. Type scale
- 🟢 `text-3xl md:text-4xl font-bold` at L221 — correct section heading.
- 🟢 `font-bold` / `text-sm` card title/body — correct hierarchy.

#### 2. Spacing
- 🟢 `mb-12`, `gap-6`, `p-6`, `mb-4` — consistent with DS card grid spec.

#### 3. Color treatment
- 🔴 L237 — `bg-pink-50 dark:bg-pink-950/20` on differential icon container `<div>`. Same class pair as the chip violations above; same fix. Context: icon wrapper on differential card, light wash tint in light mode, subtle accent tint in dark mode. — Fix: replace with `bg-[var(--color-magenta-100)] dark:bg-[var(--color-magenta-600)]/20`.
- 🟢 L238 — `text-[var(--color-brand-pink)]` on icon — correct token usage.

#### 4. Motion
- 🟢 `hover:shadow-[var(--shadow-md)]` — correct DS token.

---

### Section: CTA Final (lines 253–287)

#### 1. Type scale
- 🟢 `text-3xl md:text-4xl font-bold` at L260 — correct CTA heading.
- 🟢 `text-lg text-white/85` at L264 — correct subtext.

#### 2. Spacing
- 🟢 `py-16 md:py-20` — standard CTA section padding.

#### 3. Color treatment
- 🟢 L254 — `bg-gradient-to-r from-[var(--color-brand-pink)] to-[var(--color-brand-purple)]` — clean, DS token only.
- 🟢 L262 — `text-[var(--color-brand-green)]` — correct highlight token.
- 🟡 L281 — `border-white text-white hover:bg-white/10` raw Tailwind white on outline Button. Technically `white` is not in the semantic token scale, but `white` is used idiomatically on colored hero overlays across the site as an intentional overlay pattern (see `/sobre`, `/formaturas` CTAs). Low risk, no token for `#FFFFFF` in DS scale. — Fix: no change this PR; acceptable as overlay idiom consistent with site-wide pattern.

#### 4. Motion
- 🟢 No non-standard motion.

---

## Fix Plan
(ONLY 🔴 RED items)

1. **Hero — Color**: Replace `via-[#C2185B]` (L79) with `via-[var(--color-magenta-600)]`
2. **Levels — Color**: Replace `bg-pink-50 dark:bg-pink-950/20` (L173) with `bg-[var(--color-magenta-100)] dark:bg-[var(--color-magenta-600)]/20`
3. **Levels — Color**: Replace `bg-pink-50 dark:bg-pink-950/20` (L177) with `bg-[var(--color-magenta-100)] dark:bg-[var(--color-magenta-600)]/20` (identical sibling chip — bundle with fix 2 as same element type in same `.map()`)
4. **Differentials — Color**: Replace `bg-pink-50 dark:bg-pink-950/20` (L237) with `bg-[var(--color-magenta-100)] dark:bg-[var(--color-magenta-600)]/20`

**Bundling rationale:**
- Fixes 2 + 3 are the same className string on two adjacent `<span>` elements inside the same `.map()` iteration — bundle as one commit.
- Fix 1 (hero gradient) is a separate element — separate commit.
- Fix 4 (differential icon container) is in a different section and different element type — separate commit.

## Out of scope
- Copy (English course descriptions, level names, salary stat)
- Structural rewrites or component extraction
- New features
- `color="#FFFFFF"` on Badge prop (intentional, overlay idiom)
- `border-white text-white` on outline Button in CTA (overlay idiom, consistent with site pattern)
- `globals.css`, SEO, performance, i18n
