# Audit: /not-found (`src/app/not-found.tsx`)

## Snapshot
- **Path(s):** `src/app/not-found.tsx`
- **Linhas:** 25
- **Última edição:** `df657b1 — 2026-03-22 (pre-fix baseline)`
- **Estado geral:** YELLOW

## Reference Sources
- DS extract: `design-system-extract/preview/buttons.html`
- Vivo: `src/components/home/Hero.tsx`, `src/components/contact/ObrigadoContent.tsx`, `src/components/ui/Button.tsx`
- Pilar mapping: navy neutro

## Findings

### 1. Type scale + hierarquia
- 🔴 **Line 8 — 404 headline uses raw Tailwind scale:** `text-6xl font-bold` bypasses the DS semantic type system. Tailwind's `text-6xl` defaults to 60px/1em; DS `.h-display` is `clamp(48px, 6vw, 84px)` with `font-weight: 900`, `line-height: 1.08`, `letter-spacing: -0.02em`. The 404 acts as a mini-hero number, so `.h-display` is the correct DS class. Fix: replace with `className="h-display"` and apply navy color override via an additional class or inline token.
- 🟡 **Line 9 — subtitle uses raw `text-2xl font-semibold`:** DS `.h2` class (`clamp(28px, 3vw, 36px)`, weight 800, tracking -0.02em) is appropriate. Fix: replace with `className="h2"`.

### 2. Spacing + rhythm
- 🟡 **Line 7 — no `<Section>` wrapper, raw `py-24` on Container:** Every other page (ObrigadoContent, all marketing pages) wraps content in `<Section variant="...">` which applies `py-16 md:py-20` and the correct background token. Not-found skips this, breaking vertical rhythm and background consistency. Fix: wrap in `<Section variant="default">`, remove raw `py-24`.
- 🟢 **Centering — `text-center` + `max-w-md mx-auto` on paragraph:** consistent with ObrigadoContent pattern.

### 3. Color treatment
- 🟡 **Line 8 — `dark:text-[var(--color-brand-green)]` on 404 headline:** ObrigadoContent's `.h1` uses `dark:text-white`; Hero uses no dark override at all. Brand green as a display-scale text color in dark mode is high contrast but inconsistent with the post-Task-4 convention. After the `.h-display` fix the element should follow the same dark override as ObrigadoContent's `.h1`: `dark:text-white`.
- 🟢 **Line 10 — body paragraph uses `text-[var(--color-foreground-muted)]`:** correct DS semantic token.
- 🟢 **V-HEX clean:** no hardcoded hex values.
- 🟢 **V-PALETTE clean:** no raw Tailwind palette classes.

### 4. Animações framer-motion
- 🟡 **No entry animation:** ObrigadoContent uses `motion.div` with fade+slide for its hero block. A 404 page with a static layout is acceptable, but an entrance fade (opacity 0→1, y 20→0) would match site convention. **Out of scope as a new feature** — noted only.

## Fix Plan
1. **[RED — commit 1]** Replace `text-6xl font-bold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]` on the 404 `<h1>` with `h-display text-[var(--color-brand-navy)] dark:text-white`.
2. **[YELLOW — commit 2]** Wrap page in `<Section variant="default">`, replace `<Container className="py-24 text-center">` with `<Section variant="default"><Container className="text-center py-12 md:py-20">`.
3. **[YELLOW — bundle with commit 2]** Replace `text-2xl font-semibold` on `<h2>` with `h2`.

## Out of scope
- Copy / content
- Structural rewrites
- New features (entry animation)
- `globals.css`, SEO, performance, i18n
