# Audit: /depoimentos (`src/app/depoimentos/page.tsx` + `src/components/testimonials/TestimonialsPage.tsx`)

## Snapshot
- **Path(s):**
  - `src/app/depoimentos/page.tsx` — 25 lines, last edit `df657b1 — 2026-03-22 (pre-fix baseline)`
  - `src/components/testimonials/TestimonialsPage.tsx` — 302 lines, last edit `880efe4 — 2026-05-18 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/cards.html`
- Vivo: `src/components/home/TestimonialsCarousel.tsx`, `src/components/ui/Badge.tsx`
- Pilar mapping: lime (pilar ensino)

## Findings

### 1. Type scale + hierarquia
- 🔴 `h1` at TestimonialsPage.tsx:187 uses raw Tailwind `text-2xl md:text-4xl font-bold` instead of `.h1` DS class (`clamp(36px,4vw,48px)`, weight 800, letter-spacing -0.02em) — Fix: replace with `className="h1 ..."`
- 🔴 CTA `h2` at TestimonialsPage.tsx:283 uses raw `text-xl md:text-2xl font-bold` instead of `.h2` DS class (`clamp(28px,3vw,36px)`, weight 800) — Fix: replace with `className="h2 ..."`
- 🟡 "Destaques" section label `h2` at TestimonialsPage.tsx:202 uses `text-lg font-semibold` — this is a section label not a content heading; `.eyebrow` would change semantics; acceptable as label style — Fix: none (deferred, structural concern)

### 2. Spacing + rhythm
- 🟢 Section spacing (`mb-12`, `mb-8`, `py-12 md:py-16`) uses standard Tailwind rhythm; no anomalies found
- 🟢 Card internal padding (`p-6 md:p-8`, `p-5`) consistent with DS card motif spec

### 3. Color treatment
- 🟢 No raw hex colors; all color usage via `var(--color-*)` DS tokens — V-HEX clean
- 🟢 No raw Tailwind palette classes (no `blue-`, `green-`, etc.) — V-PALETTE clean
- 🟢 `shadow-sm` / `hover:shadow-md` at TestimonialsPage.tsx:42,102 resolve to DS tokens (`--shadow-sm`, `--shadow-md` are inside Tailwind v4 `@theme`) — compliant
- 🟡 `bg-white` on FeaturedCard (line 42) and TestimonialCard (line 102) — DS has `--color-paper: #FFFFFF` but `bg-white` is the v4 alias; functionally identical in light mode; dark mode handled via `dark:bg-[var(--color-background-alt)]` — Fix: none (deferred)

### 4. Animações framer-motion
- 🔴 Filter `<button>` elements at TestimonialsPage.tsx:226 and 239 use hardcoded `duration-200` (200ms) — DS tokens are `duration-fast` (150ms) or `duration-base` (250ms); `duration-200` is not a DS token — Fix: replace with `duration-fast`
- 🟡 `TestimonialCard` framer-motion prop `transition={{ duration: 0.2 }}` at TestimonialsPage.tsx:101 — 0.2s = 200ms, not referencing DS token; framer-motion props cannot reference CSS vars directly, inline numeric value is acceptable — Fix: none (deferred)

## Fix Plan
(ONLY 🔴 RED items)
1. Replace `h1` raw Tailwind sizing with `.h1` DS class in the page header (TestimonialsPage.tsx:187)
2. Replace `h2` raw Tailwind sizing with `.h2` DS class in the CTA section (TestimonialsPage.tsx:283)
3. Replace `duration-200` with `duration-fast` on both filter `<button>` elements (TestimonialsPage.tsx:226, 239)

## Out of scope (for this audit)
- Copy / content (testimonial quotes/data in `src/data/`)
- Structural rewrites (masonry layout, carousel conversion)
- New features (pagination, search)
- `src/components/ui/Badge.tsx` — Badge `info`/`warning`/`error` variants use raw Tailwind palette; Badge is a shared primitive, out of scope
