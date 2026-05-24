# Audit: layout Footer (`src/components/layout/Footer.tsx`)

## Snapshot
- **Path(s):** `src/components/layout/Footer.tsx`
- **Linhas:** 99
- **Última edição:** `6161e6f — 2026-05-18 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/buttons.html`, `inputs.html`, `capsule-motif.html`, `motion.html`
- Vivo: `src/components/home/CTAFinal.tsx`, `src/components/home/Hero.tsx`
- Pilar mapping (from spec sec 6): navy (institutional)

## Findings

### 1. Type scale + hierarquia
- 🟢 Brand heading (line 13): `text-xl font-bold text-white` — xl/bold for section name, acceptable within navy context.
- 🟢 Section headings (lines 21, 50, 80): `text-sm font-semibold text-white uppercase tracking-wider` — matches DS eyebrow pattern (12px, 700, uppercase, tracking-wide).
- 🟢 Link and body text (lines 25, 31, etc.): `text-sm` with `text-white/80` base — consistent with DS `small` class (14px, muted).
- 🟢 Copyright (line 94): `text-sm text-center` — appropriate for footer metadata.

### 2. Spacing + rhythm
- 🟢 Section padding (line 10): `py-12` (48px) — maps to `--spacing-12`, correct DS value.
- 🟢 Column grid gap (line 10): `gap-8` (32px) — maps to `--spacing-8`, correct DS value.
- 🟢 Nav link spacing (line 22): `space-y-2` (8px) — maps to `--spacing-2`, correct DS value.
- 🟢 Contact item spacing (line 51): `space-y-3` (12px) — maps to `--spacing-3`, correct DS value.
- 🟢 Social icon gap (line 81): `gap-3` (12px) — maps to `--spacing-3`, correct DS value.
- 🟢 Copyright bar (line 93): `py-6` (24px) — maps to `--spacing-6`, correct DS value.
- 🟢 Icon+text gap (line 52): `gap-2` (8px) — maps to `--spacing-2`, correct DS value.

### 3. Color treatment
- 🟢 Background (line 8): `bg-[var(--color-brand-navy)]` — correct DS token, navy institutional pilar.
- 🟢 Base text (line 8): `text-white/80` — standard opacity treatment on navy surface, consistent with CTAFinal.tsx (line 17).
- 🟢 Heading color (lines 13, 21, 50, 80): `text-white` — full white for hierarchy on navy surface.
- 🟢 Social icon buttons (lines 82–87): `bg-white/10 hover:bg-white/20` — opacity-based contrast layer, appropriate for navy surface.
- 🟢 Separator (line 93): `border-white/10` — subtle divider on navy, appropriate.
- 🟢 Focus ring on contact links (lines 57, 63): `focus:ring-white/50` — context-appropriate override for navy surface (global `--color-brand-purple` outline would be invisible on navy dark background). This is a valid in-context adaptation, not a violation.

### 4. Animações framer-motion
- 🟢 No framer-motion used — no entry animations, no scroll-triggered behavior.
- 🔴 Social icon hover (lines 82, 85): `duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]` uses hardcoded arbitrary values where DS tokens `--duration-base` (250ms) and `--ease-pop` (cubic-bezier(0.2,0.8,0.2,1)) exist. Same class of violation as Task 1 Header fixes (raw values instead of token references). — fix: replace with `duration-[var(--duration-base)] ease-[var(--ease-pop)]`

## Fix Plan
1. Replace `duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]` on both social icon anchors (lines 82 and 85) with `duration-[var(--duration-base)] ease-[var(--ease-pop)]`.

## Out of scope (for this audit)
- Copy / content
- Structural rewrites
- New features
