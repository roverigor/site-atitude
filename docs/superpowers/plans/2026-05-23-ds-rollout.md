# Design System Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish layout + 9 remaining pages so every applicational `.tsx` adheres to Atitude DS (type scale, spacing, color tokens, framer motion), with zero raw hex / zero raw Tailwind palette colors.

**Architecture:** Audit-first workflow. Per piece: read sources, write audit doc to `docs/ds-audit/NN-name.md`, commit audit, then one commit per RED finding. Single feature branch `chore/ds-rollout` from `main`, single PR back to `main` at end.

**Tech Stack:** Next.js 15.5 (App Router), React 19, Tailwind 4 (`@theme` CSS-first config), framer-motion 12, MDX, Poppins self-hosted via `globals.css`. DS reference sources:
- `src/app/globals.css` (tokens)
- `design-system-extract/preview/*.html` (visual canonical)
- `src/components/home/*` + `src/app/cursos/**` + `src/components/ui/*` (live validated implementations)

**Spec:** `docs/superpowers/specs/2026-05-23-ds-rollout-design.md`

---

## Conventions Used Throughout This Plan

**Commit message format:**
- Audit doc: `chore(ds-audit): add audit for <piece>`
- Fix (color): `redesign(<scope>): replace <thing> with --color-<token>`
- Fix (spacing/type/motion): `redesign(<scope>): <one-line>`
- Bug from audit: `fix(<scope>): <one-line>`

**Scope names per piece (use in commit subjects):**
| Piece | Scope |
|---|---|
| Header | `layout-header` |
| Footer | `layout-footer` |
| MobileNav | `layout-mobilenav` |
| /obrigado | `page-obrigado` |
| /not-found | `page-notfound` |
| /blog (+sub) | `page-blog` |
| /depoimentos (TestimonialsPage) | `page-depoimentos` |
| /formaturas (GraduationsPage) | `page-formaturas` |
| /sobre | `page-sobre` |
| /ingles | `page-ingles` |
| /parceiros | `page-parceiros` |
| /contato (ContactPage) | `page-contato` |

**Verification commands (referenced by ID throughout):**

- **V-LINT:** `npm run lint` — expected: exit 0, no new warnings
- **V-BUILD:** `npm run build` — expected: exit 0, no TS errors
- **V-HEX:** Hex hardcoded scan per file:
  ```bash
  grep -nE '#[0-9a-fA-F]{3,6}' <file> | grep -vE '(fill="#|stroke="#)'
  ```
  Expected: empty (exit 1).
- **V-PALETTE:** Tailwind native palette scan per file:
  ```bash
  grep -nE '(bg|text|border|from|to|via|ring|shadow)-(red|pink|blue|green|yellow|purple|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-[0-9]' <file>
  ```
  Expected: empty (exit 1).

**Audit doc template (used by every audit task — copy verbatim, fill in):**

```markdown
# Audit: <piece> (`<path>`)

## Snapshot
- **Path(s):** `<absolute file path(s)>`
- **Linhas:** <line count>
- **Última edição:** `<last commit hash> — <date>`
- **Estado geral:** GREEN | YELLOW | RED

## Reference Sources
- DS extract: `design-system-extract/preview/<relevant>.html`
- Vivo: `src/components/home/<Component>.tsx`, `src/app/cursos/page.tsx`
- Pilar mapping (from spec sec 6): <color>

## Findings

### 1. Type scale + hierarquia
- 🟢 / 🟡 / 🔴 <observation> — <fix or "none">

### 2. Spacing + rhythm
- 🟢 / 🟡 / 🔴 <observation> — <fix or "none">

### 3. Color treatment
- 🟢 / 🟡 / 🔴 <observation> — <fix or "none">

### 4. Animações framer-motion
- 🟢 / 🟡 / 🔴 <observation> — <fix or "none">

## Fix Plan
1. <one-line per RED finding, in execution order>
2. ...

## Out of scope (for this audit)
- Copy / content
- Structural rewrites
- New features
```

**Severity legend:** 🟢 ok · 🟡 cosmetic divergence (no fix this PR) · 🔴 DS violation (fix required this PR)

---

## File Structure

**Created during this plan:**
```
docs/ds-audit/
  README.md                    # progress index (Task 0)
  00-layout-header.md          # Task 1
  01-layout-footer.md          # Task 2
  02-layout-mobilenav.md       # Task 3
  03-page-obrigado.md          # Task 4
  04-page-notfound.md          # Task 5
  05-page-blog.md              # Task 6
  06-page-depoimentos.md       # Task 7
  07-page-formaturas.md        # Task 8
  08-page-sobre.md             # Task 9
  09-page-ingles.md            # Task 10
  10-page-parceiros.md         # Task 11
  11-page-contato.md           # Task 12
```

**Modified during this plan (target source files):**
```
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/layout/MobileNav.tsx
src/app/obrigado/page.tsx + src/components/contact/ObrigadoContent.tsx
src/app/not-found.tsx
src/app/blog/page.tsx + [slug] + tag/[slug] + categoria/[slug] + src/components/blog/BlogPage.tsx + ShareButtons.tsx
src/app/depoimentos/page.tsx + src/components/testimonials/TestimonialsPage.tsx
src/app/formaturas/page.tsx + src/components/graduations/GraduationsPage.tsx
src/app/sobre/page.tsx
src/app/ingles/page.tsx
src/app/parceiros/page.tsx
src/app/contato/page.tsx + src/components/contact/ContactPage.tsx
```

Possibly: `src/lib/motion.ts` (new, created in Task 1 if repeated patterns emerge — see Task 1 step 6).

---

## Task 0: Branch + scaffolding

**Files:**
- Create: `docs/ds-audit/README.md`

- [ ] **Step 1: Confirm starting state**

Run:
```bash
git status -sb && git log --oneline -3
```
Expected: branch `main`, clean tree, HEAD = `e3a7151` (spec commit) or later.

- [ ] **Step 2: Create + switch to feature branch**

Run:
```bash
git checkout -b chore/ds-rollout
```
Expected: `Switched to a new branch 'chore/ds-rollout'`.

- [ ] **Step 3: Write audit index**

Create `docs/ds-audit/README.md` with content:

```markdown
# DS Rollout Audit Index

Spec: [2026-05-23-ds-rollout-design.md](../superpowers/specs/2026-05-23-ds-rollout-design.md)
Plan: [2026-05-23-ds-rollout.md](../superpowers/plans/2026-05-23-ds-rollout.md)

## Status

| # | Piece | Doc | State | Fix commits |
|---|---|---|---|---|
| 00 | Header | [00-layout-header.md](00-layout-header.md) | ⬜ pending | 0 |
| 01 | Footer | [01-layout-footer.md](01-layout-footer.md) | ⬜ pending | 0 |
| 02 | MobileNav | [02-layout-mobilenav.md](02-layout-mobilenav.md) | ⬜ pending | 0 |
| 03 | /obrigado | [03-page-obrigado.md](03-page-obrigado.md) | ⬜ pending | 0 |
| 04 | /not-found | [04-page-notfound.md](04-page-notfound.md) | ⬜ pending | 0 |
| 05 | /blog (all) | [05-page-blog.md](05-page-blog.md) | ⬜ pending | 0 |
| 06 | /depoimentos | [06-page-depoimentos.md](06-page-depoimentos.md) | ⬜ pending | 0 |
| 07 | /formaturas | [07-page-formaturas.md](07-page-formaturas.md) | ⬜ pending | 0 |
| 08 | /sobre | [08-page-sobre.md](08-page-sobre.md) | ⬜ pending | 0 |
| 09 | /ingles | [09-page-ingles.md](09-page-ingles.md) | ⬜ pending | 0 |
| 10 | /parceiros | [10-page-parceiros.md](10-page-parceiros.md) | ⬜ pending | 0 |
| 11 | /contato | [11-page-contato.md](11-page-contato.md) | ⬜ pending | 0 |

Legend: ⬜ pending · 🟦 audited · ✅ done

## Severity legend
- 🟢 ok
- 🟡 cosmetic divergence (no fix this PR)
- 🔴 DS violation (fix required this PR)
```

- [ ] **Step 4: Commit scaffolding**

Run:
```bash
git add docs/ds-audit/README.md
git commit -m "$(cat <<'EOF'
chore(ds-audit): scaffold audit index for DS rollout

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```
Expected: 1 file changed, ~30 insertions.

---

## Task 1: Audit + fix Header

**Files:**
- Read: `src/components/layout/Header.tsx`
- Create: `docs/ds-audit/00-layout-header.md`
- Modify: `src/components/layout/Header.tsx` (per audit findings)
- Modify: `docs/ds-audit/README.md` (state column)

- [ ] **Step 1: Read source + collect metadata**

Run:
```bash
wc -l src/components/layout/Header.tsx
git log -1 --pretty='%h — %ad' --date=short src/components/layout/Header.tsx
```
Record line count and last-edit hash/date for the audit Snapshot section.

- [ ] **Step 2: Grep raw color usage in this file**

Run:
```bash
echo "--- V-HEX ---"
grep -nE '#[0-9a-fA-F]{3,6}' src/components/layout/Header.tsx | grep -vE '(fill="#|stroke="#)' || echo "(none)"
echo "--- V-PALETTE ---"
grep -nE '(bg|text|border|from|to|via|ring|shadow)-(red|pink|blue|green|yellow|purple|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-[0-9]' src/components/layout/Header.tsx || echo "(none)"
```
Record findings into Section 3 (color treatment) of the audit doc.

- [ ] **Step 3: Read DS reference sources**

Read these files in full and note conventions used:
- `src/app/globals.css` (lines 1-300 — focus on @theme tokens)
- `src/components/home/Hero.tsx` (header-adjacent component, vivo)
- `design-system-extract/preview/buttons.html`, `inputs.html`, `capsule-motif.html` (DS treatments adjacent)

Identify, for Header:
- Type scale used in nav links and brand wordmark (compare to `home/Hero.tsx`)
- Spacing: gap between nav items, container padding, scrolled vs non-scrolled
- Color: nav link hover, focus ring, theme toggle interactions
- Motion: any framer entry/scroll behavior

- [ ] **Step 4: Write the audit doc**

Create `docs/ds-audit/00-layout-header.md` using the audit template at the top of this plan, filling in:
- Snapshot from Step 1
- Reference Sources from Step 3 (pilar mapping: navy — layout institutional)
- Findings: all 4 dimensions populated with 🟢/🟡/🔴 entries derived from Step 2+3 observations
- Fix Plan: one numbered line per 🔴 finding

If Step 2 grep returned nothing AND no other RED finding emerges from Step 3, set "Estado geral: GREEN" and Fix Plan to `(none)`. Skip Steps 6-N (no fix commits needed).

- [ ] **Step 5: Commit the audit doc**

Run:
```bash
git add docs/ds-audit/00-layout-header.md
git commit -m "$(cat <<'EOF'
chore(ds-audit): add audit for layout Header

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 6: Fix loop — execute Fix Plan one RED at a time**

For each numbered item in the audit's `## Fix Plan`, in order:

  - **6a:** Make the smallest possible edit that resolves only that finding. Do not bundle multiple findings into one commit. Edit `src/components/layout/Header.tsx` accordingly.
  - **6b:** Run **V-LINT** and **V-BUILD** (commands at top of plan). Both must pass. If either fails, fix the issue introduced before proceeding (do not commit a broken state).
  - **6c:** Re-run the file-scoped **V-HEX** and **V-PALETTE** greps from Step 2 to confirm the targeted violation is now gone (don't expect all violations gone yet — only the one this commit targets).
  - **6d:** Commit:
    ```bash
    git add src/components/layout/Header.tsx
    git commit -m "$(cat <<'EOF'
    redesign(layout-header): <one-line summary copied from audit Fix Plan item>

    Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
    EOF
    )"
    ```

If during this loop a framer-motion pattern is needed in 3+ pieces across the rollout (Header, Footer, page hero entries…), stop the loop, create `src/lib/motion.ts` exporting reusable variants (e.g. `fadeInUp`, `staggerContainer`), refactor Header's usage to consume it, commit as `refactor(motion): extract reusable framer variants to src/lib/motion.ts`, then resume the fix loop. This is the only time this plan creates a new file outside `docs/ds-audit/`.

- [ ] **Step 7: Final file-scoped verification**

Run:
```bash
echo "--- V-LINT ---"
npm run lint 2>&1 | tail -10
echo "--- V-BUILD ---"
npm run build 2>&1 | tail -10
echo "--- V-HEX ---"
grep -nE '#[0-9a-fA-F]{3,6}' src/components/layout/Header.tsx | grep -vE '(fill="#|stroke="#)' || echo "(none)"
echo "--- V-PALETTE ---"
grep -nE '(bg|text|border|from|to|via|ring|shadow)-(red|pink|blue|green|yellow|purple|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-[0-9]' src/components/layout/Header.tsx || echo "(none)"
```
Expected: lint exit 0, build exit 0, hex `(none)`, palette `(none)`.

- [ ] **Step 8: Update audit index**

Edit `docs/ds-audit/README.md` row for Header:
- `⬜ pending` → `✅ done`
- Fix commits count = number of `redesign(layout-header):` commits made in Step 6

Commit:
```bash
git add docs/ds-audit/README.md
git commit -m "$(cat <<'EOF'
chore(ds-audit): mark Header as done in index

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Audit + fix Footer

**Files:**
- Read: `src/components/layout/Footer.tsx`
- Create: `docs/ds-audit/01-layout-footer.md`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `docs/ds-audit/README.md`

Follow the **same 8-step pattern as Task 1**, with these substitutions:
- Target file: `src/components/layout/Footer.tsx`
- Audit doc: `docs/ds-audit/01-layout-footer.md`
- Audit index row: `Footer`
- DS reference: also read `src/components/home/CTAFinal.tsx` (footer-adjacent CTA pattern, vivo)
- Scope name in commits: `layout-footer`
- Pilar mapping: navy (institutional)

---

## Task 3: Audit + fix MobileNav

**Files:**
- Read: `src/components/layout/MobileNav.tsx`
- Create: `docs/ds-audit/02-layout-mobilenav.md`
- Modify: `src/components/layout/MobileNav.tsx`
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target file: `src/components/layout/MobileNav.tsx`
- Audit doc: `docs/ds-audit/02-layout-mobilenav.md`
- Audit index row: `MobileNav`
- DS reference: `design-system-extract/preview/motion.html` for drawer animation conventions
- Scope name in commits: `layout-mobilenav`
- Pilar mapping: navy (institutional)
- A11y emphasis: focus trap, escape key, `aria-modal`, body scroll lock — flag missing as RED

---

## Task 4: Audit + fix /obrigado

**Files:**
- Read: `src/app/obrigado/page.tsx`, `src/components/contact/ObrigadoContent.tsx`
- Create: `docs/ds-audit/03-page-obrigado.md`
- Modify: above two files as needed
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target files: `src/app/obrigado/page.tsx` + `src/components/contact/ObrigadoContent.tsx`
- Audit doc: `docs/ds-audit/03-page-obrigado.md`
- Audit index row: `/obrigado`
- DS reference: `src/components/home/CTAFinal.tsx` (success/confirm patterns)
- Scope name in commits: `page-obrigado`
- Pilar mapping: navy neutro (spec sec 6)
- In Step 2 and Step 7, run V-HEX and V-PALETTE against BOTH target files (one grep per file).

---

## Task 5: Audit + fix /not-found

**Files:**
- Read: `src/app/not-found.tsx`
- Create: `docs/ds-audit/04-page-notfound.md`
- Modify: `src/app/not-found.tsx`
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target file: `src/app/not-found.tsx`
- Audit doc: `docs/ds-audit/04-page-notfound.md`
- Audit index row: `/not-found`
- DS reference: `src/components/home/Hero.tsx` for hero-level type scale (since 404 acts like a mini-hero)
- Scope name in commits: `page-notfound`
- Pilar mapping: navy neutro

---

## Task 6: Audit + fix /blog (all sub-routes)

**Files:**
- Read: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/blog/tag/[slug]/page.tsx`, `src/app/blog/categoria/[slug]/page.tsx`, `src/components/blog/BlogPage.tsx`, `src/components/blog/ShareButtons.tsx`, `src/components/blog/mdx-components.tsx`
- Create: `docs/ds-audit/05-page-blog.md`
- Modify: above files as needed
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target files: the 7 blog-related files listed above
- Audit doc: `docs/ds-audit/05-page-blog.md`
- Audit index row: `/blog (all)`
- DS reference: `src/app/cursos/page.tsx` (catalog grid), `src/app/cursos/[slug]/page.tsx` (article detail), `design-system-extract/preview/cards.html`, `pills.html`
- Scope name in commits: `page-blog`
- Pilar mapping: navy + accent per category (spec sec 6)
- In Step 2 and Step 7, loop V-HEX/V-PALETTE over each of the 7 files:
  ```bash
  for f in src/app/blog/page.tsx src/app/blog/[slug]/page.tsx src/app/blog/tag/[slug]/page.tsx src/app/blog/categoria/[slug]/page.tsx src/components/blog/BlogPage.tsx src/components/blog/ShareButtons.tsx src/components/blog/mdx-components.tsx; do
    echo "=== $f ==="
    grep -nE '#[0-9a-fA-F]{3,6}' "$f" | grep -vE '(fill="#|stroke="#)' || echo "  (no hex)"
    grep -nE '(bg|text|border|from|to|via|ring|shadow)-(red|pink|blue|green|yellow|purple|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-[0-9]' "$f" || echo "  (no palette)"
  done
  ```
- MDX components note: `mdx-components.tsx` maps markdown nodes to React. If its color choices for headings/links/code blocks diverge from DS, flag RED — this affects every blog post body.

---

## Task 7: Audit + fix /depoimentos (TestimonialsPage)

**Files:**
- Read: `src/app/depoimentos/page.tsx`, `src/components/testimonials/TestimonialsPage.tsx`
- Create: `docs/ds-audit/06-page-depoimentos.md`
- Modify: above files
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target files: the 2 testimonials files
- Audit doc: `docs/ds-audit/06-page-depoimentos.md`
- Audit index row: `/depoimentos`
- DS reference: `src/components/home/TestimonialsCarousel.tsx` (already-redesigned testimonial pattern, vivo), `design-system-extract/preview/cards.html`
- Scope name in commits: `page-depoimentos`
- Pilar mapping: lime (pilar ensino, spec sec 6)
- In Step 2 and Step 7, loop V-HEX/V-PALETTE over both files (same pattern as Task 6).

---

## Task 8: Audit + fix /formaturas (GraduationsPage)

**Files:**
- Read: `src/app/formaturas/page.tsx`, `src/components/graduations/GraduationsPage.tsx`
- Create: `docs/ds-audit/07-page-formaturas.md`
- Modify: above files
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target files: the 2 graduations files
- Audit doc: `docs/ds-audit/07-page-formaturas.md`
- Audit index row: `/formaturas`
- DS reference: `src/components/home/StatsSection.tsx` (lime accents), `src/components/ui/Lightbox.tsx` (gallery overlay)
- Scope name in commits: `page-formaturas`
- Pilar mapping: lime (pilar ensino)
- Loop V-HEX/V-PALETTE over both files.

---

## Task 9: Audit + fix /sobre

**Files:**
- Read: `src/app/sobre/page.tsx`
- Create: `docs/ds-audit/08-page-sobre.md`
- Modify: `src/app/sobre/page.tsx`
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target file: `src/app/sobre/page.tsx` (387 lines — large)
- Audit doc: `docs/ds-audit/08-page-sobre.md`
- Audit index row: `/sobre`
- DS reference: `src/components/home/Timeline.tsx` (already-redesigned timeline pattern, vivo), `src/components/home/AboutSection.tsx`
- Scope name in commits: `page-sobre`
- Pilar mapping: navy (institutional)
- For a file this large, sub-section the audit Findings by section of the page (Hero / Timeline / Values / Founders / CTA) so RED items map to specific sections, not the whole file.

---

## Task 10: Audit + fix /ingles

**Files:**
- Read: `src/app/ingles/page.tsx`
- Create: `docs/ds-audit/09-page-ingles.md`
- Modify: `src/app/ingles/page.tsx`
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target file: `src/app/ingles/page.tsx` (290 lines — known violations)
- Audit doc: `docs/ds-audit/09-page-ingles.md`
- Audit index row: `/ingles`
- DS reference: `src/app/cursos/[slug]/page.tsx` (already-redesigned subject-deep-dive pattern, vivo)
- Scope name in commits: `page-ingles`
- Pilar mapping: magenta (pilar idiomas)
- **Known violations to confirm in audit (these MUST appear as RED):**
  - `#C2185B` in hero gradient → must be replaced with `var(--color-magenta-700)` (or closest DS magenta scale token)
  - `bg-pink-50` → `bg-[var(--color-magenta-100)]` (or appropriate semantic)
  - `bg-pink-950` → `bg-[var(--color-magenta-600)]` or `bg-[var(--color-navy-900)]` depending on intent; resolve by reading surrounding context
- Sub-section the audit Findings by page section (Hero / Differentials / Levels / CTA).

---

## Task 11: Audit + fix /parceiros

**Files:**
- Read: `src/app/parceiros/page.tsx`
- Create: `docs/ds-audit/10-page-parceiros.md`
- Modify: `src/app/parceiros/page.tsx`
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target file: `src/app/parceiros/page.tsx` (303 lines)
- Audit doc: `docs/ds-audit/10-page-parceiros.md`
- Audit index row: `/parceiros`
- DS reference: `src/components/home/PillarsStrip.tsx` (pillar treatment vivo), `src/components/home/BrandMarquee.tsx` (logo marquee pattern)
- Scope name in commits: `page-parceiros`
- Pilar mapping: violet (pilar tecnologia/empregabilidade)
- Sub-section the audit Findings by page section.

---

## Task 12: Audit + fix /contato (ContactPage form)

**Files:**
- Read: `src/app/contato/page.tsx`, `src/components/contact/ContactPage.tsx`
- Create: `docs/ds-audit/11-page-contato.md`
- Modify: above two files
- Modify: `docs/ds-audit/README.md`

Follow Task 1's 8-step pattern. Substitutions:
- Target files: the 2 contact files
- Audit doc: `docs/ds-audit/11-page-contato.md`
- Audit index row: `/contato`
- DS reference: `design-system-extract/preview/inputs.html`, `buttons.html`, `src/app/lp/aula-gratuita-a/page.tsx` (LP has form patterns vivo)
- Scope name in commits: `page-contato`
- Pilar mapping: orange (ação/calor, spec sec 6)
- **Known violations to confirm in audit (must appear as RED):**
  - `text-red-500` (form error text) → `text-[var(--color-error)]` (semantic, maps to `--color-magenta-600`)
  - `border-red-500` (form error border) → `border-[var(--color-error)]`
- Form-specific audit points (add to Section 3 and 4 of audit doc):
  - Focus ring color matches DS focus convention
  - Error state contrast meets WCAG AA on cream background
  - Form submission button uses `Button` UI primitive variants
  - Loading state on submit honors `prefers-reduced-motion`
- Loop V-HEX/V-PALETTE over both files.

---

## Task 13: Global verification sweep

**Files:** (read-only)
- All `src/**/*.tsx`

- [ ] **Step 1: Global V-HEX sweep**

Run:
```bash
grep -rnE '#[0-9a-fA-F]{3,6}' src/ --include='*.tsx' | grep -vE '(fill="#|stroke="#|JsonLd)'
```
Expected: empty.

If non-empty: each line is a remaining violation. Determine which task's piece it belongs to. Re-open that task (mentally) — add a fix commit on the same `chore/ds-rollout` branch using that piece's scope name, then re-run V-HEX globally.

- [ ] **Step 2: Global V-PALETTE sweep**

Run:
```bash
grep -rnE '(bg|text|border|from|to|via|ring|shadow)-(red|pink|blue|green|yellow|purple|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-[0-9]' src/ --include='*.tsx'
```
Expected: empty.

Same recovery procedure as Step 1 if non-empty.

- [ ] **Step 3: Global lint + build**

Run:
```bash
npm run lint
npm run build
```
Both must exit 0. Fix any new warning/error introduced by this rollout before proceeding.

- [ ] **Step 4: Visual smoke test on dev server**

Run (in one terminal):
```bash
npm run dev
```

Visit each route in a browser and confirm no visual regression (logos render, fonts load, layouts hold, dark mode toggles cleanly):
- `/` (control: should look the same as before rollout)
- `/sobre`
- `/contato`
- `/blog`, `/blog/<any-existing-slug>`
- `/depoimentos`
- `/formaturas`
- `/ingles`
- `/parceiros`
- `/obrigado`
- `/this-route-does-not-exist` (triggers 404)

Take a screenshot of each (PNG, viewport 1440x900, light theme then dark theme). Save to `docs/ds-audit/screenshots/<route>-light.png` and `<route>-dark.png`. These are committed for PR review.

- [ ] **Step 5: CodeRabbit pass on the cumulative diff**

Run (from project root, in WSL):
```bash
~/.local/bin/coderabbit --prompt-only --base main
```

Address findings of severity `medium` or higher. Self-heal up to 2 iterations per the global rule (`~/.claude/rules/coderabbit-integration.md`). Findings of `low` severity may be ignored unless they touch a11y.

- [ ] **Step 6: Commit screenshots + verification log**

Run:
```bash
git add docs/ds-audit/screenshots/
git commit -m "$(cat <<'EOF'
chore(ds-audit): add visual smoke screenshots for PR review

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Open PR

**Files:** (none modified; remote interaction only)

- [ ] **Step 1: Push branch to origin**

Run:
```bash
git push -u origin chore/ds-rollout
```
Expected: branch created on origin.

- [ ] **Step 2: Build PR body**

Use this exact template, filling in counts and links:

```markdown
## Summary

Audited and polished Layout (Header/Footer/MobileNav) + 9 remaining pages against Atitude DS. Zero raw hex / zero raw Tailwind palette colors remain in `src/**/*.tsx` (excluding SVG fills and JsonLd structured data).

## What changed

- 12 audit docs in `docs/ds-audit/NN-name.md` (state column tracked in `docs/ds-audit/README.md`)
- <N> `redesign(...)` commits resolving every RED finding
- <M> `chore(ds-audit): ...` commits scaffolding the audit trail
- Possibly 1 `refactor(motion): extract reusable framer variants` commit if patterns recurred

## Verification

- `npm run lint`: ✅
- `npm run build`: ✅
- Global V-HEX: empty
- Global V-PALETTE: empty
- CodeRabbit medium+ findings: addressed (see commit messages)

## Screenshots

(linked from `docs/ds-audit/screenshots/`)

| Route | Light | Dark |
|---|---|---|
| / | … | … |
| /sobre | … | … |
| (rest) | … | … |

## Out of scope (explicit, per spec)

- Copy/content
- Renames or file moves
- `globals.css` @theme tokens
- API routes, SEO metadata, perf, i18n, deploy

## Spec & Plan

- Spec: `docs/superpowers/specs/2026-05-23-ds-rollout-design.md`
- Plan: `docs/superpowers/plans/2026-05-23-ds-rollout.md`
```

- [ ] **Step 3: Open PR via gh**

Run (note: per AIOX agent-authority rule, `git push` and `gh pr create` are `@devops` exclusive. This step is the formal handoff. If executing under a non-devops agent, halt here and ask the user to invoke `@devops *push` or to confirm authorization.):

```bash
gh pr create --base main --head chore/ds-rollout \
  --title "redesign: DS rollout — Layout + 9 pages aligned with Atitude DS" \
  --body "$(cat <<'EOF'
<paste the body from Step 2 here>
EOF
)"
```
Expected: PR URL printed.

- [ ] **Step 4: Final report**

Print to user:
- PR URL
- Total commits on branch (`git log --oneline main..HEAD | wc -l`)
- Audit doc summary (count of RED findings resolved across all 12 docs — grep `Estado geral: RED` then count Fix Plan items in those docs)

---

## Self-Review

**Spec coverage check (each spec section → task that implements it):**

| Spec section | Implementing task(s) |
|---|---|
| 1. Contexto | (background — no task needed) |
| 2. Objetivo | Tasks 1-12 (audit + fix per piece) + Task 13 (global sweep) |
| 3. Não-objetivos | Enforced by "Out of scope" line in each audit doc template |
| 4.1 Estrutura de saída | Task 0 (README) + Tasks 1-12 (one doc per task) |
| 4.2 Ordem de execução | Task ordering 1→12 matches spec ordering exactly |
| 4.3 Branch + commit strategy | Task 0 step 2 (branch) + commit conventions block at top |
| 4.4 Audit doc template | Audit doc template at top of plan, referenced by Step 4 of every task |
| 5. Reference Hierarchy | Step 3 of every task ("Read DS reference sources") |
| 6. Pilar → contexto mapping | Embedded as substitution in every page task |
| 7. Dark mode | Task 13 step 4 (smoke test light + dark per route) |
| 8. A11y baseline | Task 3 (MobileNav focus trap), Task 12 (form error contrast), Task 13 (smoke test) |
| 9. Pre-commit checks | V-LINT, V-BUILD, V-HEX, V-PALETTE referenced throughout |
| 10. Success criteria | Task 13 (global verification) + Task 14 (PR with checklist) |
| 11. Métricas de alinhado | Implicit in audit Findings sections (each metric → Finding) |
| 12. Estimativa | (descriptive — no task) |
| 13. Rollback | (procedural — agent uses `git revert <sha>` if needed) |
| 14. Próximos passos | This plan IS step 2; Task 14 → step 3 |

**Placeholder scan:** None. Audit doc contents are intentionally per-task discoveries — the template + grep commands give the engineer concrete inputs.

**Type/method consistency:** No code-level types introduced by this plan (modifications are CSS classes and JSX prop tweaks). Commit scope names are tabled at top and referenced consistently.
