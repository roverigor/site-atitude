# Audit: /blog (all routes) (`src/app/blog/**`, `src/components/blog/*`)

## Snapshot
- **Path(s):**
  - `src/app/blog/page.tsx` — 31 lines, last edit `df657b1 — 2026-03-22 (pre-fix baseline)`
  - `src/app/blog/[slug]/page.tsx` — 209 lines, last edit `cb70f3e — 2026-05-18 (pre-fix baseline)`
  - `src/app/blog/tag/[slug]/page.tsx` — 58 lines, last edit `82919a4 — 2026-02-22 (pre-fix baseline)`
  - `src/app/blog/categoria/[slug]/page.tsx` — 68 lines, last edit `82919a4 — 2026-02-22 (pre-fix baseline)`
  - `src/components/blog/BlogPage.tsx` — 418 lines, last edit `6161e6f — 2026-05-18 (pre-fix baseline)`
  - `src/components/blog/ShareButtons.tsx` — 60 lines, last edit `82919a4 — 2026-02-22 (pre-fix baseline)`
  - `src/components/blog/mdx-components.tsx` — 110 lines, last edit `82919a4 — 2026-02-22 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/cards.html`, `pills.html`
- Vivo: `src/app/cursos/page.tsx`, `src/app/cursos/[slug]/page.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/SearchInput.tsx`
- Pilar mapping: navy + accent per category

## Findings

### `src/app/blog/page.tsx`

#### 1. Type scale
- 🟢 Delegates entirely to `BlogPage` component — no raw typography here.

#### 2. Spacing
- 🟢 Uses `Container` + `pb-16 pt-6` — DS spacing scale via Tailwind tokens.

#### 3. Color
- 🟢 No raw hex or V-PALETTE violations.

#### 4. Motion
- 🟢 No motion in this route file.

---

### `src/app/blog/tag/[slug]/page.tsx`

#### 1–4. All dimensions
- 🟢 Pure route shell, delegates to `BlogPage`. No color, spacing, or motion violations.

---

### `src/app/blog/categoria/[slug]/page.tsx`

#### 1–4. All dimensions
- 🟢 Pure route shell, delegates to `BlogPage`. No violations.

---

### `src/app/blog/[slug]/page.tsx`

#### 1. Type scale
- 🟡 Article title at line 111 uses `text-3xl md:text-4xl font-bold` instead of DS `.h1` class. Fix: apply `className="h1 mb-4"` and drop inline font/size utilities. Deferred — cursos/[slug]/page.tsx also uses custom inline heading styles, making this a pervasive cross-pattern issue not scoped to blog.

#### 2. Spacing
- 🟢 Container/Section usage consistent with DS reference pages.

#### 3. Color
- 🔴 Line 175: `const relColor = relCat?.corHex || "#6B7280"` — fallback `#6B7280` is a raw Tailwind gray hex, not a DS token. DS muted color is `--color-foreground-muted` (#6B6BB4). Fix: replace with `"var(--color-foreground-muted)"`.

#### 4. Motion
- 🟡 Related-post cards use inline `transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]` — same pattern as CourseCard, acceptable but slightly verbose. Deferred — cross-component pattern.

---

### `src/components/blog/BlogPage.tsx`

#### 1. Type scale
- 🟡 Page `<h1>` at line 106 uses `text-2xl md:text-3xl font-bold` instead of `.h2` or `.h1` DS classes. Fix: swap to `.h2`. Deferred — functional, not a token violation.

#### 2. Spacing
- 🟢 Grid gap, container padding, and section spacing use DS-consistent Tailwind scale values.

#### 3. Color
- 🔴 Line 277: sidebar category count badge uses `dark:bg-[#252525]` — hardcoded dark mode hex not in DS. Fix: replace with `dark:bg-[var(--color-background)]` (dark override at 0A0A0A is too dark; `--color-background-alt` = `#111111` is the correct alt surface in dark mode). Replace with `dark:bg-[var(--color-background-alt)]`.
- 🔴 Line 348 in `BlogCard`: `const categoryColor = category?.corHex || "#6B7280"` — same wrong fallback as `[slug]/page.tsx`. Fix: replace with `"var(--color-foreground-muted)"`.

#### 4. Motion
- 🟡 `BlogCard` motion uses raw `transition={{ duration: 0.35, delay: index * 0.05 }}` instead of DS `--duration-slow` (400ms) or `--duration-base` (250ms). Same raw values used in `CourseCard` — consistent cross-component pattern. Deferred.

---

### `src/components/blog/ShareButtons.tsx`

#### 1. Type scale
- 🟢 Uses DS token-based text sizing (`text-sm`, etc.).

#### 2. Spacing
- 🟢 No violations.

#### 3. Color
- 🔴 Line 40: `text-green-600` on the copy-confirmed `<Check>` icon — raw Tailwind scale color, not a DS token. DS has `--color-success: #5BC112` (lime). Fix: replace `text-green-600` with `text-[var(--color-success)]`.

#### 4. Motion
- 🟢 No motion violations.

---

### `src/components/blog/mdx-components.tsx`

This file maps markdown nodes to React components used in **every blog post body**. Violations here affect all published articles.

#### 1. Type scale
- 🟢 No type scale issues. Headings, paragraphs, code blocks inherit `.prose` styles from `globals.css` which are DS-aligned.

#### 2. Spacing
- 🟢 No spacing violations.

#### 3. Color — `Callout` component
- 🔴 Lines 13, 21, 29: `borderColor` in `calloutConfig` uses hardcoded hex values:
  - `info.borderColor: "#2563EB"` — raw blue hex, no DS equivalent. DS uses `--color-brand-purple` (#570CE8) for info/primary.
  - `warning.borderColor: "#D97706"` — raw amber hex. DS has `--color-warning: #FF4E09` (orange).
  - `tip.borderColor: "#059669"` — raw emerald hex. DS has `--color-success: #5BC112` (lime).
  Fix: replace all three with DS CSS vars as inline style values.
- 🔴 Lines 14–17 (`info`): `bgLight: "bg-blue-50"`, `bgDark: "dark:bg-blue-950/20"`, `textColor: "text-blue-700 dark:text-blue-400"`, `iconColor: "text-blue-600 dark:text-blue-400"` — all raw Tailwind blue scale, not DS tokens.
- 🔴 Lines 22–25 (`warning`): `bgLight: "bg-amber-50"`, `bgDark: "dark:bg-amber-950/20"`, `textColor: "text-amber-700 dark:text-amber-400"`, `iconColor: "text-amber-600 dark:text-amber-400"` — raw Tailwind amber scale.
- 🔴 Lines 30–33 (`tip`): `bgLight: "bg-green-50"`, `bgDark: "dark:bg-green-950/20"`, `textColor: "text-green-700 dark:text-green-400"`, `iconColor: "text-green-600 dark:text-green-400"` — raw Tailwind green scale.
  Fix: Replace all bg/text/icon Tailwind scale classes with DS token-based inline styles using CSS vars. Use `bg-[var(--color-background-alt)]` for background tints, and derive border/text/icon color from the mapped DS token per callout type.

#### 4. Color — `CourseCard` component
- 🔴 Line 86: `dark:bg-[#1a1a1a]` — hardcoded dark surface hex not in DS. Fix: replace with `dark:bg-[var(--color-background-alt)]`.

#### 5. Motion
- 🟢 No framer-motion in `mdx-components.tsx`.

## Fix Plan
(ONLY 🔴 RED items)

1. `src/app/blog/[slug]/page.tsx` line 175 — replace `"#6B7280"` fallback with `"var(--color-foreground-muted)"`
2. `src/components/blog/BlogPage.tsx` line 348 — replace `"#6B7280"` fallback with `"var(--color-foreground-muted)"`
3. `src/components/blog/BlogPage.tsx` line 277 — replace `dark:bg-[#252525]` with `dark:bg-[var(--color-background-alt)]`
4. `src/components/blog/ShareButtons.tsx` line 40 — replace `text-green-600` with `text-[var(--color-success)]`
5. `src/components/blog/mdx-components.tsx` — replace all hardcoded hex `borderColor` values and raw Tailwind color scale classes in `calloutConfig` with DS token-based styles
6. `src/components/blog/mdx-components.tsx` line 86 — replace `dark:bg-[#1a1a1a]` with `dark:bg-[var(--color-background-alt)]`

## Out of scope (for this audit)
- Copy / blog content
- Structural rewrites
- New features
- MDX rendering library changes
