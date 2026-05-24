# Audit: /sobre (`src/app/sobre/page.tsx`)

## Snapshot
- **Path(s):** `src/app/sobre/page.tsx`
- **Linhas:** 387
- **Última edição:** `ad81790 — 2026-05-18 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/cards.html`, `pills.html`, `capsule-motif.html`
- Vivo: `src/components/home/Timeline.tsx`, `src/components/home/AboutSection.tsx`, `src/components/home/Hero.tsx`
- Pilar mapping: navy (institutional)

## Findings

### Section: Hero (lines 103–116)

#### 1. Type scale
- 🔴 L108 — `h1` uses bare `text-3xl md:text-5xl font-bold`; DS semantic class `.h1` (clamp 36–48px, fw-800, tracking-tight) should be applied instead. — Fix: replace with `.h1` class

#### 2. Spacing
- 🟢 `pt-8 pb-4` — reasonable, no DS violation

#### 3. Color
- 🟢 `text-white/80` for subtitle — acceptable in `Section variant="dark"` context

#### 4. Motion
- 🟡 No entrance animation on Hero heading/subtitle — Timeline.tsx uses framer-motion. Structural addition; out of scope this PR.

---

### Section: Timeline (lines 118–276)

#### 1. Type scale
- 🔴 L122 — Section `h2` uses raw `text-[1.75rem] md:text-[2.5rem] font-bold`; DS semantic class `.h2` (clamp 28–36px, fw-800, tracking-tight) should be applied. — Fix: replace with `.h2` class
- 🟡 L160/206 — Milestone `h3` uses bare `text-lg font-semibold`; ideally `.h3` but these are small repeated inline items — cosmetic divergence. Fix: none this PR.

#### 2. Spacing
- 🟢 `space-y-12` desktop / `space-y-8` mobile — standard 4px scale

#### 3. Color
- 🔴 L176 — `dark:border-[#0A0A0A]` is a raw hex literal on the timeline dot border. No DS token maps to this dark background value. — Fix: replace with `dark:border-[var(--color-brand-navy)]` which is the closest dark-surface approximation (`#252566`), or remove the dark override if the default `border-[var(--color-background)]` already reads well on dark.
- 🟢 Year labels use `var(--color-brand-navy)` and `var(--color-brand-green)` tokens correctly

#### 4. Motion
- 🟡 Milestone entries have no entrance animation (static), while `Timeline.tsx` uses `framer-motion` `whileInView`. Adding motion requires structural change (client component + framer dependency). Out of scope this PR.

---

### Section: Mission (lines 278–309)

#### 1. Type scale
- 🔴 L282 — `h2` uses raw `text-[1.75rem] md:text-[2.5rem] font-bold`; DS `.h2` should be used. — Fix: replace with `.h2` class
- 🟡 L300 — `blockquote` uses bare `text-base md:text-lg leading-relaxed italic` rather than DS `.body` class. AboutSection uses a border-left treatment and `.lead` — cosmetic divergence, no structural change needed. Fix: none this PR.

#### 2. Spacing
- 🟢 `mb-12`, `gap-8 md:gap-12` — standard DS scale

#### 3. Color
- 🟢 Tokens used correctly: `var(--color-brand-green)`, `var(--color-brand-navy)`, `var(--color-foreground)`

#### 4. Motion
- 🟢 No motion elements in this section — consistent with static institutional page.

---

### Section: Team (lines 311–358)

#### 1. Type scale
- 🔴 L315 — `h2` uses raw `text-[1.75rem] md:text-[2.5rem] font-bold`; DS `.h2` should be used. — Fix: replace with `.h2` class
- 🟢 `h3` uses `font-semibold text-base` — acceptable for card heading at this size

#### 2. Spacing
- 🟢 `p-6`, `gap-6`, `mb-4` — standard DS scale

#### 3. Color
- 🔴 L327 — `dark:bg-[#1a1a1a]` is a raw hex literal. No DS token maps to this value. — Fix: replace with `dark:bg-[var(--color-brand-navy)]` (closest dark card surface token)
- 🟢 Other token usage clean: `var(--color-background)`, `var(--color-border)`, `var(--color-brand-navy)`, `var(--color-brand-green)`

#### 4. Motion
- 🟡 Team cards have `transition-shadow` without DS duration token (`--duration-base: 250ms`). — Fix: `transition-[box-shadow] duration-[var(--duration-base)]`. Cosmetic; promote to RED only if motion tokens are strictly enforced this PR.

---

### Section: CTA (lines 364–384)

#### 1. Type scale
- 🔴 L368 — `h2` uses raw `text-[1.75rem] md:text-[2.5rem] font-bold`; DS `.h2` should be used. — Fix: replace with `.h2` class

#### 2. Spacing
- 🟢 `mb-4`, `mb-8` — standard DS scale

#### 3. Color
- 🟢 `text-white/80`, `Section variant="gradient"` — acceptable in gradient dark context
- 🟢 Button uses `variant="whatsapp"` — correct token

#### 4. Motion
- 🟢 CTA button delegates motion to Button component

---

## Fix Plan
(ONLY 🔴 RED items)

1. **Hero — Type scale** — Apply `.h1` class to the `<h1>` at L108 instead of `text-3xl md:text-5xl font-bold`
2. **Timeline — Type scale** — Apply `.h2` class to section `<h2>` at L122 instead of `text-[1.75rem] md:text-[2.5rem] font-bold`
3. **Timeline — Color** — Replace raw `dark:border-[#0A0A0A]` at L176 with DS token
4. **Mission — Type scale** — Apply `.h2` class to `<h2>` at L282
5. **Team — Type scale + Color** — Apply `.h2` class to `<h2>` at L315; replace `dark:bg-[#1a1a1a]` at L327 with DS token (bundle: same card element)
6. **CTA — Type scale** — Apply `.h2` class to `<h2>` at L368

Note: Items 2 and 4 and 6 are the same fix pattern (`.h2` replacement) in different sections — kept separate commits for traceability.

---

## Out of scope
- Copy / content (timeline events text, founder bio quote)
- Adding framer-motion entrance animations to milestone entries (structural change)
- Mission blockquote visual treatment (border-left, `.lead` class) — cosmetic YELLOW
- `.eyebrow` labels above section headings — cosmetic YELLOW
- Team card `transition-shadow` → DS duration token — cosmetic YELLOW
