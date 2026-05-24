# Audit: /contato (`src/app/contato/page.tsx` + `src/components/contact/ContactPage.tsx`)

## Snapshot
- **Path(s):**
  - `src/app/contato/page.tsx` — 22 lines, last edit `df657b1 — 2026-03-22 (pre-fix baseline)`
  - `src/components/contact/ContactPage.tsx` — 412 lines, last edit `6161e6f — 2026-05-18 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/inputs.html`, `buttons.html`
- Vivo: `src/app/lp/aula-gratuita-a/page.tsx`, `src/components/ui/Button.tsx`
- Pilar mapping: orange (ação/calor)

## Findings

### 1. Type scale + hierarquia
- 🟢 `h1` heading uses `text-2xl md:text-4xl font-bold` with `--color-brand-navy` token (ContactPage.tsx line 158) — acceptable custom sizing.
- 🟢 `h2` contact info heading uses `text-lg font-semibold` (line 275) — appropriate hierarchy.
- 🟢 Form labels use `text-sm font-medium` consistently (lines 171, 198, 227) — matches DS input spec.
- 🟢 Error messages use `text-sm` size — correct relative scale.

### 2. Spacing + rhythm
- 🟢 `Section` + `Container` layout primitives used — consistent with DS layout system.
- 🟢 `space-y-5` form rhythm, `gap-10 lg:gap-16` grid gap — reasonable use of Tailwind scale.
- ✅ `shadow-sm` (Tailwind built-in) on contact card (line 274) vs `--shadow-sm` DS token — Fix: use `shadow-[var(--shadow-sm)]` (cosmetic only, YELLOW, not fixed this PR). — Resolved in e2c69fb

### 3. Color treatment
- 🔴 `text-red-500` (error paragraph text) at ContactPage.tsx line 190, 217 — Fix: `text-[var(--color-error)]`
- 🔴 `border-red-500` (error input border) at ContactPage.tsx line 185, 212 — Fix: `border-[var(--color-error)]`
- 🔴 `focus:ring-red-500/30` (error input focus ring) at ContactPage.tsx line 185, 212 — Fix: `focus:ring-[var(--color-error)]/30`
- 🟢 All other colors use DS tokens: `--color-brand-navy`, `--color-brand-green`, `--color-foreground`, `--color-foreground-muted`, `--color-border`, `--color-paper`, `--color-background-alt`, `--color-whatsapp`.
- ✅ `bg-white` hardcoded on contact info card (line 274) — Fix: use `bg-[var(--color-paper)]` for full dark-mode coverage (cosmetic, YELLOW, not fixed this PR). — Resolved in dfc306f

### 4. Animações framer-motion
- 🟢 `framer-motion` used for `fadeUp` entrance animation — consistent with other pages.
- 🟡 `duration: 0.5` raw float in `fadeUp` transition (line 57) vs `--duration-base` DS token — Fix: use `var(--duration-base)` (cosmetic, YELLOW, not fixed this PR). — **Still deferred:** framer-motion props cannot consume CSS vars; inline numeric is established constraint
- ✅ `duration-200` Tailwind class on inputs/links (lines 183, 210, 354, 363, 372) vs `duration-[var(--duration-fast)]` — cosmetic, YELLOW, not fixed this PR. — Resolved in a24d704

### 5. Form-specific (a11y + UX)
- 🟢 All inputs have associated `<label>` with matching `htmlFor` / `id` pairs (lines 169–170, 196–197, 225–226).
- 🟢 Submission uses `<Button>` UI primitive with `variant="whatsapp"` (line 253) — correct.
- 🟢 Form has `noValidate` — custom validation active, no browser UI interference.
- 🔴 Inputs missing `aria-invalid` attribute in error state — screen readers cannot announce validation failure. Both `nome` (line 175) and `whatsapp` (line 202) inputs omit `aria-invalid={!!(errors.X && touched.X)}`. Fix: add `aria-invalid` attribute.
- 🔴 Error `<p>` elements have no `id`; inputs have no `aria-describedby` — error message is not programmatically linked to its field. Fix: add `id="nome-error"` / `id="whatsapp-error"` to error paragraphs; add `aria-describedby="nome-error"` / `aria-describedby="whatsapp-error"` to inputs.
- 🔴 Required fields (`nome`, `whatsapp`) have no `required` attribute — screen readers and form validators cannot identify required fields. Fix: add `required` attribute to both inputs.
- 🟡 `prefers-reduced-motion` not observed by `framer-motion` `fadeUp` animation — the global CSS rule at globals.css line 220 only covers CSS transitions; framer-motion JS animations bypass it. Fix: use `useReducedMotion()` from framer-motion (YELLOW — pattern not enforced on any other page in the codebase, out of scope this PR). — **Still deferred:** pattern not enforced site-wide; out of scope for polish PR

## Fix Plan
(ONLY 🔴 RED items)

1. Replace `border-red-500` and `focus:ring-red-500/30` with `border-[var(--color-error)]` and `focus:ring-[var(--color-error)]/30` in ContactPage.tsx (error input border — both `nome` and `whatsapp` inputs, lines 185 and 212).
2. Replace `text-red-500` with `text-[var(--color-error)]` in ContactPage.tsx (error paragraph text — both error `<p>` elements, lines 190 and 217).
3. Add `required` attribute to `nome` input and `whatsapp` input in ContactPage.tsx.
4. Add `id="nome-error"` / `id="whatsapp-error"` to error paragraphs and `aria-describedby` + `aria-invalid` to their inputs in ContactPage.tsx.

## Out of scope
- Copy / form labels / placeholders
- Form submission logic (API endpoint behavior)
- Structural rewrites
- New features
- Server-side validation (only client-side a11y is in scope)
- `prefers-reduced-motion` for framer-motion (pattern not established site-wide)
