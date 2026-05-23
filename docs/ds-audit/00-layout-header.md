# Audit: layout Header (`src/components/layout/Header.tsx`)

## Snapshot
- **Path(s):** `src/components/layout/Header.tsx`
- **Linhas:** 99
- **Última edição:** `ad81790 — 2026-05-18`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/buttons.html`, `inputs.html`, `capsule-motif.html`
- DS tokens: `design-system-extract/colors_and_type.css`
- Vivo: `src/components/home/Hero.tsx`
- Global focus convention: `src/app/globals.css` lines 343–349
- Pilar mapping (from spec sec 6): navy (institutional)

## Findings

### 1. Type scale + hierarquia
- 🟢 Nav links: `text-sm font-medium` → DS `--text-sm = 14px`, weight 500. Appropriate for nav secondary role.
- 🟢 Fallback brand text (pre-hydration): `font-bold text-lg` → 18px/700 matches DS `--text-lg` token.
- 🟢 Font family inherited from body (Poppins via globals.css). No explicit override needed.

### 2. Spacing + rhythm
- 🟢 Nav inter-item gap: `gap-1` (4px) with per-item `px-3 py-2` (12px/8px) padding — tight but functional; DS scale starts at 4px.
- 🟢 Header height: `h-16` (64px) aligns with DS `--spacing-16: 64px`.
- 🟢 Right-side gap: `gap-2` (8px) = DS `--spacing-2`.

### 3. Color treatment
- 🟢 Background uses semantic token `var(--color-background)` — correct.
- 🟢 Hover overlays use `bg-black/5` and `dark:bg-white/10` — opacity-based, token-agnostic, acceptable pattern.
- 🟢 No raw hex values (`#...`) detected.
- 🟢 No Tailwind color-palette classes (e.g. `gray-500`) detected.
- 🔴 **Mobile menu button focus ring** (line 43): `focus:ring-[var(--color-brand-navy)]` — violates DS focus ring convention. `globals.css` line 344 establishes `*:focus-visible { outline: 2px solid var(--color-brand-purple) }`. The explicit focus ring override should use `var(--color-brand-purple)` (violet) for light mode. Dark mode `dark:focus:ring-[var(--color-brand-green)]` is correct (matches globals.css line 349). Fix: change `focus:ring-[var(--color-brand-navy)]` → `focus:ring-[var(--color-brand-purple)]`.
- 🔴 **Scrolled shadow** (line 34): `shadow-sm` is Tailwind's built-in shadow (`0 1px 3px rgba(0,0,0,0.1)...`), not the DS shadow token. DS defines `--shadow-sm: 0 1px 2px rgba(37,37,102,0.06), 0 2px 8px rgba(37,37,102,0.06)` (navy-tinted, matching brand). Fix: replace `shadow-sm` → `shadow-[var(--shadow-sm)]`.

### 4. Animações framer-motion
- 🟢 No framer-motion used. Header uses CSS transitions only (`transition-all duration-200`).
- 🟡 **Duration token mismatch** (line 32): `duration-200` (200ms) is not a DS motion token. DS defines `--duration-fast: 150ms` and `--duration-base: 250ms`. For a scroll-state background transition, `--duration-base` (250ms) is the right fit. No fix required this PR (cosmetic), but recommended follow-up.
- 🔴 **Z-index token** (line 32): `z-40` (Tailwind = 40) instead of the DS sticky z-index token. DS defines `--z-sticky: 100`. The header is a `sticky` element and must use the DS sticky layer. MobileNav correctly sits at `z-50` (Tailwind 50). Fix: replace `z-40` → `z-[var(--z-sticky)]`.

## Fix Plan
1. Replace `focus:ring-[var(--color-brand-navy)]` → `focus:ring-[var(--color-brand-purple)]` on mobile menu button (line 43) — align focus ring to DS violet convention.
2. Replace `shadow-sm` → `shadow-[var(--shadow-sm)]` on scrolled header (line 34) — use DS brand-tinted shadow token.
3. Replace `z-40` → `z-[var(--z-sticky)]` on header element (line 32) — use DS sticky z-index token.

## Out of scope (for this audit)
- Copy / content
- Structural rewrites
- New features
- ThemeToggle internal focus ring (separate component, audited in its own pass)
- MobileNav z-index (audited as Task 3)
- `duration-200` → DS token migration (YELLOW, cosmetic — not fixed this PR)
