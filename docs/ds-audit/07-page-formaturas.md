# Audit: /formaturas (`src/app/formaturas/page.tsx` + `src/components/graduations/GraduationsPage.tsx`)

## Snapshot
- **Path(s):**
  - `src/app/formaturas/page.tsx` — 24 lines, last edit `65fe3e8 — 2026-05-19 (pre-fix baseline)`
  - `src/components/graduations/GraduationsPage.tsx` — 205 lines, last edit `65fe3e8 — 2026-05-19 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/cards.html`
- Vivo: `src/components/home/StatsSection.tsx`, `src/components/ui/Lightbox.tsx`
- Pilar mapping: lime (pilar ensino)

## Findings

### 1. Type scale + hierarquia
- 🔴 **h1 heading raw sizing** (`GraduationsPage.tsx:72`) — `text-2xl md:text-3xl font-bold text-[var(--color-brand-navy)]` bypasses `.h1` DS class (`clamp(36px, 4vw, 48px)`, weight 800, tracking −0.02em). — Fix: replace with `<h1 className="h1">`
- 🔴 **h2 event heading raw sizing** (`GraduationsPage.tsx:124`) — `text-lg md:text-xl font-bold text-[var(--color-foreground)]` bypasses `.h2` DS class (`clamp(28px, 3vw, 36px)`, weight 800). — Fix: replace with `<h2 className="h2">`
- 🟡 **h3 empty-state heading** (`GraduationsPage.tsx:177`) — `text-lg font-semibold` is an 18px heading; DS `.h3` is 28px which would be disproportionate in this empty-state context. — **Still deferred:** intentional 18px size for empty-state context; .h3 28px would be disproportionate

### 2. Spacing + rhythm
- 🟢 All spacing uses multiples of 4 (mb-2, mb-3, mb-4, mb-10, p-4, p-5, p-6, py-12, etc.) — consistent with DS 4px grid.
- 🟢 `page.tsx` uses `py-12 md:py-16` which is within DS spacing scale.

### 3. Color treatment
- 🔴 **Focus ring pilar mismatch** (`GraduationsPage.tsx:150`) — photo button uses `focus:ring-[var(--color-brand-purple)]` (violet, pilar tecnologia) instead of the ensino pilar color `var(--color-pillar-ensino)` or `var(--color-brand-green)`. — Fix: replace with `focus:ring-[var(--color-pillar-ensino)]`
- ✅ **`typeColors` category mapping** (`GraduationsPage.tsx:16-23`) — `saude`, `beleza`, `administracao` all map to `--color-brand-green` instead of dedicated `--color-category-saude` (#5BC112), `--color-category-beleza` (#B6EE82), `--color-category-administracao` (#6EDD17). Functional but semantically loose. — Resolved in `b1aa3ef`

### 4. Animações framer-motion
- 🟢 No framer-motion used in GraduationsPage (only Lightbox primitive, which is DS-validated).
- 🔴 **`duration-200` on filter pills** (`GraduationsPage.tsx:85,97`) — bare Tailwind `duration-200` (200ms) is not a DS token. DS has `--duration-fast: 150ms` → `duration-fast`. — Fix: replace with `duration-fast`
- 🔴 **`duration-200` on hover overlay** (`GraduationsPage.tsx:161,162`) — same issue as above on the camera icon overlay. — Fix: replace with `duration-fast`
- 🔴 **`duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]` on image scale** (`GraduationsPage.tsx:158`) — hardcoded duration/easing literals instead of DS tokens `--duration-slow: 400ms` and `--ease-pop: cubic-bezier(0.2, 0.8, 0.2, 1)`. — Fix: replace with `duration-[var(--duration-slow)] ease-[var(--ease-pop)]`

## Fix Plan
(ONLY 🔴 RED items)
1. Apply `.h1` DS class to page header heading (`GraduationsPage.tsx:72`)
2. Apply `.h2` DS class to event card heading (`GraduationsPage.tsx:124`)
3. Replace `duration-200` with `duration-fast` on filter pills (`GraduationsPage.tsx:85,97`)
4. Replace `duration-200` with `duration-fast` on hover overlay (`GraduationsPage.tsx:161,162`)
5. Replace `duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]` with DS token equivalents (`GraduationsPage.tsx:158`)
6. Fix focus ring pilar color from `--color-brand-purple` to `--color-pillar-ensino` (`GraduationsPage.tsx:150`)

## Out of scope
- Copy / content (graduation photos, names, dates)
- Structural rewrites
- New features
- `typeColors` category token alignment (YELLOW, deferred)
- Lightbox.tsx modifications (DS primitive, already validated)
