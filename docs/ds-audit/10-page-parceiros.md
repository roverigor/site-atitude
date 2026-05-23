# Audit: /parceiros (`src/app/parceiros/page.tsx`)

## Snapshot
- **Path(s):** `src/app/parceiros/page.tsx`
- **Linhas:** 303
- **Última edição:** `ad81790 — 2026-05-18 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/colors-violet-scale.html`, `cards.html`, `pills.html`, `motion.html`
- Vivo: `src/components/home/PillarsStrip.tsx`, `src/components/home/BrandMarquee.tsx`, `src/components/home/Hero.tsx`
- Pilar mapping: violet (pilar tecnologia/empregabilidade)

---

## Findings

### Section: Hero (lines 79–98)

#### 1. Type scale
- 🟡 `h1` at line 90 uses inline Tailwind utilities (`text-2xl md:text-3xl font-bold`) instead of the `.h1` DS class (clamp 36–48px, weight 800). The page-level heading is undersized vs. DS spec. Fix: apply `className="h1"` (or `.h2` per page hierarchy), drop inline `text-*` and `font-*`.

#### 2. Spacing
- 🟢 `pb-10 pt-6` — acceptable compact hero spacing for inner page.

#### 3. Color
- 🟡 `text-[var(--color-brand-navy)] dark:text-white` (line 90) — acceptable semantic token pair; minor: `dark:text-white` could be `dark:text-[var(--color-foreground)]` for consistency, but not a blocker.
- 🟢 `text-[var(--color-foreground-muted)]` (line 94) — correct DS token.
- 🟢 Icon container uses `var(--color-brand-orange)` (line 86–88) — orange pilar accent, acceptable (maps to emprego/general CTA convention).

#### 4. Motion
- 🟢 No transitions in hero section.

---

### Section: Pipeline / Steps (lines 100–160)

#### 1. Type scale
- 🟡 `h2` at line 103 uses inline `text-xl md:text-2xl font-bold` instead of `.h2` DS class (clamp 28–36px, weight 800). Fix: apply `className="h2"` and drop `text-*`/`font-*` utilities.
- 🟡 "Passo N" label at lines 120–124 manually recreates `.eyebrow` pattern (`text-xs font-bold uppercase tracking-wider`) with inline style color. Fix: use `className="eyebrow"` — the `.eyebrow` class is defined in globals.css and uses `var(--color-brand-purple)`. However, pilar = violet here, so orange accent conflicts with DS eyebrow color. Acceptable as YELLOW: keep manual override but note it.

#### 2. Spacing
- 🟢 `mb-12`, `gap-4 md:gap-0`, `w-56` — reasonable, no DS violation.

#### 3. Color
- 🟢 Step icons and arrows all use `var(--color-brand-orange)` consistently via inline style.
- 🟢 `text-[var(--color-foreground)]` and `text-[var(--color-foreground-muted)]` — correct DS tokens.

#### 4. Motion
- 🟢 No interactive transitions in this section.

---

### Section: Partner Grid (lines 162–244)

#### 1. Type scale
- 🟡 `h2` at line 165 uses inline `text-xl md:text-2xl font-bold` — same issue as Pipeline h2 (YELLOW, same fix).

#### 2. Spacing
- 🟢 `gap-4 md:gap-6`, `p-5`, `mb-3`, `mb-10` — acceptable.

#### 3. Color — CRITICAL
- 🔴 `segmentColors` (lines 36–42) contains 5 bare hex literals used as `backgroundColor` for logo placeholders and as `color` prop on `<Badge>`:
  - `Comércio: "#16A34A"` — Tailwind green-600, no DS token
  - `Saúde: "#FF6600"` — off-brand orange (DS brand-orange = `#FF4E09`)
  - `Governo: "#1B1464"` — dark navy variant, no DS token
  - `Serviços: "#6600FF"` — purple variant, no DS token
  - `Tecnologia: "#7C3AED"` — wrong! Should be `--color-pillar-tecnologia` = `#570CE8` (= `--color-brand-purple`)
  
  Per Badge API contract, `color` prop accepts a hex and appends `+20` opacity — this is a Badge-prop-special-case (same as Task 10). However, `Tecnologia` has a direct DS token (`--color-pillar-tecnologia` / `--color-brand-purple`) and should be updated. The others are intentional categorical colors (data-driven segment colors, not brand/pillar colors); those are out of scope as "partner names/logos data."
  
  **Net RED:** `Tecnologia` hex `#7C3AED` must become `--color-pillar-tecnologia` (`#570CE8`). The four other segment colors (`Comércio`, `Saúde`, `Governo`, `Serviços`) are data-domain categorical colors — out of scope.

- 🟡 `bg-white` at line 174 (partner card) — `bg-white` is a static value; should use `bg-[var(--color-background)]` for theme consistency. The `dark:bg-[var(--color-background-alt)]` is present but the light-mode base is bare white instead of `var(--color-background)`.

#### 4. Motion
- 🔴 Partner card (line 174): `duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]` — raw values should use DS tokens `[var(--duration-base)]` and `[var(--ease-pop)]`. The `PillarsStrip.tsx` reference component uses the same raw values (accepted pattern in that file); however the DS defines `--duration-base: 250ms` and `--ease-pop: cubic-bezier(0.2,0.8,0.2,1)` as tokens. Policy from previous tasks: replace raw literals with `[var(--duration-base)]` and `[var(--ease-pop)]`.
- 🔴 Logo avatar (line 178): `duration-200` — bare numeric; should use `[var(--duration-fast)]` (150ms) or `[var(--duration-base)]` (250ms). 200ms is not a DS duration token.

#### 5. Shadow
- 🟡 `shadow-sm` and `hover:shadow-md` (line 174) — Tailwind utility shadows, not DS `shadow-[var(--shadow-sm)]` / `hover:shadow-[var(--shadow-md)]`. Previous tasks consistently fixed this pattern.
- 🟡 `shadow-md` (line 114, Pipeline step icon) — bare Tailwind shadow.

---

### Section: Impact Numbers (lines 199–243)

#### 1. Type scale
- 🟢 `text-2xl font-bold` for stat numbers — acceptable for data display.
- 🟢 `text-sm` for labels — acceptable.

#### 2. Color
- 🟢 `color-mix(in srgb, var(--color-brand-orange), transparent 85%)` (lines 205, 226) — valid CSS token-based approach.
- 🟢 `var(--color-brand-orange)` for icon color — consistent.
- 🟢 `border-[var(--color-border)]` (line 200) — correct DS token.

#### 3. Motion
- 🟢 No transitions.

---

### Section: For Companies / CTA (lines 247–300)

#### 1. Type scale
- 🟡 `h2` at line 251 uses inline `text-xl md:text-2xl font-bold text-white` — on `variant="dark"` section, white text is expected (overrides DS foreground color); acceptable pattern for dark backgrounds.

#### 2. Color
- 🟢 `text-white`, `text-white/80` — correct on dark section.
- 🟢 `border-white/20 bg-white/10` — glassmorphism chips on dark, acceptable.
- 🟢 `var(--color-brand-green)` dot — correct DS token.
- 🟢 `Button variant="whatsapp"` and `variant="outline"` with `className="border-white/40 text-white hover:bg-white/10"` — correct pattern for dark section CTA.

#### 3. Motion
- 🟢 Button transitions handled by Button component.

---

## Fix Plan
(ONLY 🔴 RED items)

1. **[Color] `Tecnologia` segment color hex** (line 41): Replace `"#7C3AED"` with `"#570CE8"` (= `var(--color-pillar-tecnologia)` / `var(--color-brand-purple)`). Note: this is used as a Badge `color` prop (Badge-prop-special-case) and as inline `backgroundColor` style — update the map value.

2. **[Motion] Partner card transition literals** (line 174): Replace `duration-[250ms]` → `duration-[var(--duration-base)]` and `ease-[cubic-bezier(0.2,0.8,0.2,1)]` → `ease-[var(--ease-pop)]`.

3. **[Motion] Logo avatar `duration-200`** (line 178): Replace `duration-200` → `duration-[var(--duration-fast)]` (150ms is the DS fast token; 200ms has no DS token — nearest is fast).

4. **[Shadow] Partner card shadow utilities** (line 174): Replace `shadow-sm` → `shadow-[var(--shadow-sm)]` and `hover:shadow-md` → `hover:shadow-[var(--shadow-md)]`.

5. **[Shadow] Pipeline step icon `shadow-md`** (line 114): Replace `shadow-md` → `shadow-[var(--shadow-md)]`.

---

## Out of scope
- Copy / partner names / segment label text
- ~~Segment colors for Comércio, Saúde, Governo, Serviços (categorical data colors, not brand/pillar tokens)~~ — resolved in follow-up (see below)
- `h1`/`h2` DS class upgrade (YELLOW — undersized but not broken; type-scale refactor is structural)
- `.eyebrow` class adoption for "Passo N" label (YELLOW — conflicts with pilar accent color)
- `bg-white` → `bg-[var(--color-background)]` on partner card (YELLOW — light-mode only, dark mode covered)
- `text-[var(--color-brand-navy)] dark:text-white` → `dark:text-[var(--color-foreground)]` alignment (YELLOW)
- Structural rewrites (pipeline layout, partner grid data source)
- New features
- `globals.css`, SEO, metadata

---

## Follow-up

Spec review identified 4 additional REDs in the `segmentColors` map that were incorrectly scoped as "out of scope" in the original Task 11 audit. These are presentation-layer colors for Atitude's internal segment taxonomy badges/cards — not external partner brand colors — and per spec §10 success criterion #3 (zero raw hex outside JsonLd and SVG fills) they require DS-token values.

**Resolved in follow-up commit `77a8b56`:**

| Segment | Old hex | New hex | DS token |
|---------|---------|---------|----------|
| Comércio | `#16A34A` (Tailwind green-600) | `#6EDD17` | `--color-brand-green` / `--color-pillar-ensino` |
| Saúde | `#FF6600` (off-brand orange) | `#FF4E09` | `--color-brand-orange` / `--color-pillar-emprego` |
| Governo | `#1B1464` (non-DS dark navy) | `#252566` | `--color-navy-900` / `--color-brand-navy` |
| Serviços | `#6600FF` (no DS token) | `#9D78F2` | `--color-violet-300` (distinct from Tecnologia's `--color-violet-500`) |

Note: hex literals are required (not `var(...)`) because the Badge component appends `+20` opacity suffix to the `color` prop value as an inline style.

**Total fix commits for /parceiros: 5** (original 4 from Task 11 + this follow-up).
