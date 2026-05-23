# Audit: /obrigado (`src/app/obrigado/page.tsx` + `src/components/contact/ObrigadoContent.tsx`)

## Snapshot
- **Path(s):**
  - `src/app/obrigado/page.tsx` — 12 lines, last edit `b895599 — 2026-02-22 (pre-fix baseline)`
  - `src/components/contact/ObrigadoContent.tsx` — 93 lines, last edit `df657b1 — 2026-03-22 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/buttons.html`, `inputs.html`
- Vivo: `src/components/home/CTAFinal.tsx`, `src/components/home/Hero.tsx`
- Pilar mapping: navy neutro

## Findings

### 1. Type scale + hierarquia
- 🔴 `ObrigadoContent.tsx:50` — `h1` uses `text-2xl md:text-4xl` (24px→36px) + `font-bold` (700) instead of DS `.h1` semantic class (`clamp(36px, 4vw, 48px)`, `font-weight: 800`). Under-scales at mobile (24px vs 36px floor) and misses weight (700 vs 800). Fix: replace `text-2xl md:text-4xl font-bold text-[var(--color-brand-navy)] dark:text-white` with `h1 dark:text-white`.
- 🟢 `ObrigadoContent.tsx:54,58,81` — body/muted copy uses `text-[var(--color-foreground-muted)]` DS token correctly.

### 2. Spacing + rhythm
- 🟢 `ObrigadoContent.tsx:36` — `py-12 md:py-20` (48px / 80px) coincide with `--spacing-12` and `--spacing-20`. Values are correct; expressed as raw utilities (no DS class), but within acceptable tolerance — YELLOW, no fix.
- 🟢 `ObrigadoContent.tsx:70` — flex gap-3 / mb-8 within DS 4px grid.

### 3. Color treatment
- 🟢 `ObrigadoContent.tsx:42` — `text-[var(--color-brand-green)]` on CheckCircle icon. `--color-brand-green` is a first-class DS alias; `--color-success` (`--color-lime-600`, slightly darker) would be more semantically precise for a success state, but both are valid DS tokens. Defer to spec sec 6 navy neutro — no red violation here.
- 🟢 `ObrigadoContent.tsx:64` — phone link uses `text-[var(--color-brand-navy)]` / `dark:text-[var(--color-brand-green)]`, both DS tokens.

### 4. Animações framer-motion
- 🔴 `ObrigadoContent.tsx:41` — icon spring uses `duration: 0.5` (500ms raw numeric). DS `--duration-slow` = 400ms is the longest defined motion token. Fix: align to `0.4` (matches `--duration-slow`) and add comment citing DS token, consistent with MobileNav pattern established in Task 3.
- 🟢 `ObrigadoContent.tsx:48` — text fade uses `delay: 0.3` (no explicit duration, framer defaults to ~0.3s ≈ `--duration-base`). Acceptable.

## Fix Plan
1. `ObrigadoContent.tsx:50` — Replace raw type utilities with `.h1` semantic class (type scale + weight correction).
2. `ObrigadoContent.tsx:41` — Align icon animation `duration` from `0.5` to `0.4` (DS `--duration-slow`) with comment.

## Out of scope (for this audit)
- Copy / content
- Structural rewrites
- New features
- `src/app/obrigado/page.tsx` — metadata-only file, no style tokens present; no changes needed
