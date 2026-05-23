# Atitude Design System

> *"Somos mais que uma escola de educação, somos um ecossistema educacional."*
> — Atitude

A design system for **Atitude**, a Brazilian educational ecosystem brand. The visual language is built around a single motif — the **capsule / pill** — rendered in deep navy with four saturated accent colors that read as energetic, youthful, and unmistakably Brazilian.

---

## ⚠️ Source Caveats (read me first)

This system was built from the two brand files the user uploaded:

- `uploads/logo_atitude - colorida.png` → primary horizontal wordmark
- `uploads/logo_tag_atitude - colorida.png` → vertical "tag" stack mark

**The official website [atitudeensino.com.br](https://atitudeensino.com.br/) was not reachable during build** (DNS / access denied). All visual decisions below are inferred from the two logos plus the tagline the user shared. Numbers like spacing, exact body type, and component conventions are **proposals**, not confirmed brand standards.

**To make this system perfect, please share:**
- Screenshots or a PDF of the public site / parent-facing brochure
- Any existing brand book (PDF) or Figma file
- Photography samples (do you use real student photos? illustrations?)
- Confirmed body / display font files (we are substituting until told otherwise)

---

## Brand at a Glance

| | |
|---|---|
| **Name** | Atitude |
| **Sector** | K-12 / educational ecosystem (Brazil) |
| **Voice** | Warm, energetic, child-centric but adult-credible — Portuguese (Brazilian) |
| **Tagline (known)** | *Somos mais que uma escola de educação, somos um ecossistema educacional.* |
| **Logo motif** | Pill / capsule strokes folded into the "A" |
| **Palette** | Deep navy `#252566` + four jellybean accents (lime, orange, magenta, violet) |
| **Personality** | Playful, optimistic, modern, confident — not corporate, not cutesy |

---

## Index

| File | What's inside |
|---|---|
| `README.md` | This file. Context, tone, visual foundations, iconography. |
| `SKILL.md` | Agent-skill manifest. Read first if you are an agent. |
| `colors_and_type.css` | All design tokens — colors, type, spacing, radii, shadows, motion. Drop-in. |
| `assets/` | Logos (wordmark + mark), brand swatch reference, sample illustrations. |
| `fonts/` | Web font files (currently substitutions from Google Fonts — see Type section). |
| `preview/` | The cards that populate the Design System tab. Standalone HTML; safe to delete. |
| `ui_kits/marketing/` | Hi-fi recreation of an Atitude-style marketing site (homepage, course page, contact). |

---

## Content Fundamentals

> *Heads-up: this section is best-guess until the user shares real copy samples. Where you see "★" the rule is inferred from the tagline alone.*

### Voice
Atitude speaks like **a warm, switched-on educator addressing a family**. Not a textbook. Not a brand consultant. Confident enough to drop a manifesto sentence, gentle enough to invite a tour. The tagline format — *"Somos mais que X, somos Y"* ("We are more than X, we are Y") — is a **rhetorical signature**: declarative, parallel, slightly aspirational. Reuse this pattern sparingly in heroes and section openers.

### Person & casing
- **First person plural** ("Somos…", "Acreditamos…", "Construímos…") — the school speaks as a collective, never as an "I". ★
- **Second person informal** ("você", not "o senhor / a senhora") when addressing parents and students. Brazilian education brands almost universally pick informal — keep it. ★
- **Sentence case** for everything: headlines, buttons, nav. **NO TITLE CASE.** Portuguese reads worse in title case anyway.
- Proper nouns capitalize as expected (Atitude, Ensino Fundamental, Brasil).

### Tone dials
| Dial | Setting |
|---|---|
| Formal ↔ Casual | **70% casual** — warm, conversational, but never slangy |
| Serious ↔ Playful | **60% playful** — color and bounce, but never childish in copy |
| Concrete ↔ Aspirational | Lead concrete, close aspirational. *"3 anos de inglês integral. Para um mundo sem fronteiras."* |
| Brand-led ↔ User-led | Talk about the student, not the school. "Seu filho descobre…" not "Oferecemos…" |

### Sample phrasing (proposals — review before shipping)
- Hero headline: *"Aprender é uma atitude."*
- Sub-headline: *"Da Educação Infantil ao Ensino Médio, formamos pessoas que pensam, sentem e agem."*
- Section opener: *"Mais do que uma sala de aula."*
- CTA primary: *"Agende uma visita"* / *"Conheça a escola"*
- CTA secondary: *"Saiba mais"* / *"Falar com a escola"*
- Empty-state / form: *"Conta pra gente quem é você."* (warm, second-person)
- Confirmation: *"Recebemos sua mensagem. Em breve a gente se fala."*

### Don't
- ❌ Title Case In Headlines
- ❌ Corporate filler: "soluções inovadoras", "excelência educacional", "metodologia diferenciada"
- ❌ Exclamation-mark abuse. Max **one** per paragraph; zero in body copy.
- ❌ Emoji in product UI. (May appear in social posts; not in the website / app surface.)
- ❌ Latin abbreviations (i.e., etc., e.g.) — write it out in Portuguese.

### Numbers, dates, times
- Decimal comma: `R$ 1.250,00` not `R$ 1,250.00`
- Dates: `14 de março` or `14/03/2026`. Avoid US-style.
- Time: 24-hour. `08h00 às 17h30` is the school-day convention.

---

## Visual Foundations

### The capsule motif
The logo's "A" is built from **rounded-end pill strokes** that overlap and fold. This is the **single most important visual idea in the brand** — every UI affordance that wants to feel "Atitude" should echo it:

- **Pill-shaped buttons** (fully rounded ends, `border-radius: 999px`) for primary CTAs
- **Pill tags / chips** for categories, age groups, course tracks
- **Rounded-rectangle cards** with generous corner radii (`24px` on cards, `12px` on inputs)
- **Decorative pills** in the four accent colors as a stand-in for icons, bullets, dividers, page markers

### Color
Five colors carry the whole system. **Navy** is the workhorse — body type, headlines, UI chrome. The four accents are **rotational**: pick one per page/section as the protagonist, leave the others as small punctuation. Never use all four at full saturation in the same component cluster.

| Token | Hex | Use |
|---|---|---|
| `--navy-900` | `#252566` | Primary text, primary buttons, logo color |
| `--lime-500` | `#6EDD17` | Accent A — energetic, "go", elementary years |
| `--orange-500` | `#FF4E09` | Accent B — warm, alert, middle years |
| `--magenta-500` | `#FF004A` | Accent C — passion, highlight, secondary CTA |
| `--violet-500` | `#570CE8` | Accent D — knowledge, depth, high-school years |
| `--cream-50` | `#FFF8EF` | Page background — warmer than pure white |
| `--paper` | `#FFFFFF` | Cards on cream |

Pairings: Each accent has a defined **on-color** (text that lives on top). Lime → navy. Orange → paper. Magenta → paper. Violet → paper.

### Typography
| Role | Family | Weights | Style |
|---|---|---|---|
| **Display** | **Poppins** ✓ | 800, 900 | Tight tracking, geometric sans — confirmed by brand. Use 900 for hero, 800 for h1–h2. |
| **Body** | **Poppins** ✓ | 400, 500, 600, 700 | Same family for cohesion — body at 16/24, generous line-height. |
| **Accent / quote** | **Caveat** | 700 | Handwritten flourish for pull-quotes and "from our students" callouts. |

Poppins ships in `fonts/` with the full weight range (Thin → Black, normal + italic). `@font-face` declarations live at the top of `colors_and_type.css` — drop the folder into any project and the type just works.

### Backgrounds
- **Cream `#FFF8EF`** is the page baseline. Pure white is reserved for cards stacked on cream, not for full sections.
- **Full-bleed accent panels** (e.g. an entire hero section in `--violet-500`) are encouraged for section breaks. Whoever is on the accent gets paper-color type.
- **No gradients on UI surfaces.** Solid blocks only. Accent pills may layer for decorative purposes.
- **Photography**, when present, is **warm, natural-light, real students** — never stock-y. Color treatment is unfiltered, slight warmth. Black-and-white is reserved for archival / yearbook contexts.
- **Repeating patterns**: a single decorative repeating pattern made of small accent pills (`assets/pattern-pills.svg`) can fill a divider strip, but never an entire section.

### Borders, radii, shadows
- **Radii**: `6px` (inputs), `12px` (chips, small cards), `24px` (cards, modals), `999px` (pills/buttons).
- **Borders** are 1.5px, used sparingly — prefer solid color blocks. Border color: `--navy-100`.
- **Shadows**: two-step elevation only.
  - `--shadow-1`: `0 1px 2px rgba(37,37,102,.06), 0 2px 8px rgba(37,37,102,.06)` — resting cards.
  - `--shadow-2`: `0 8px 24px rgba(37,37,102,.12)` — modals, hovered cards.
  - **No inner shadows. No glow. No neumorphism.**

### Motion
- **Easing**: `cubic-bezier(.2,.8,.2,1)` (gentle ease-out-back-ish without the overshoot). Token: `--ease-pop`.
- **Durations**: `150ms` (hover state on small UI), `250ms` (card hover, tab switch), `400ms` (page-level transitions).
- **Hover state**: pill-shaped buttons **scale to 1.02** AND shift to a darker tonal step. No glow, no shadow change.
- **Press state**: scale to **0.98**. Color stays.
- **Page entrance**: 8px translateY + fade, never slide-in from the side.
- **Bounce / overshoot**: reserved for the **logo mark** when it appears (e.g. on splash) — not for general UI. Bouncy buttons feel toy-like.

### Layout rules
- **12-column grid**, 80px gutters on desktop, 24px on mobile.
- **Max content width**: 1240px. Hero sections may go full-bleed but copy lockup stays 1240.
- **Section padding**: 96px top/bottom desktop, 56px mobile.
- **Generous left-rail** alignment — left-aligned, ragged-right body text everywhere. Centered text only for taglines.
- **Sticky nav**: 72px tall on desktop, cream background with `backdrop-filter: blur(10px)` when scrolled.

### Use of transparency & blur
Reserved for two cases: (1) sticky nav over content, (2) modal overlays (`rgba(37,37,102,.45)` over content + 8px blur). Not a decorative effect.

### Cards
- Paper background, `24px` radius, `--shadow-1` resting, `--shadow-2` on hover.
- **No left-color-border accent** (an AI-design cliche we explicitly avoid).
- Card → uses one accent color as a single full-color top stripe `8px` tall, OR a pill chip in the corner. Pick one, not both.

---

## Iconography

> ⚠️ **No native icon set was provided.** The Atitude brand mark itself is bespoke. For UI iconography we propose **Phosphor Icons (regular weight, rounded family)** — its soft, optimistic line weight echoes the capsule motif and is free / CDN-available.

- **Style**: outlined, 1.5px stroke, rounded line-caps. **Never filled, never duotone.**
- **Size scale**: 16 / 20 / 24 / 32 px. Default 20px.
- **Color**: defaults to current text color (`--ink-900`). Accent colors only for status icons.
- **Emoji**: NOT used in UI surfaces. Acceptable in social / WhatsApp comms only.
- **Unicode symbols**: arrow chars (←, →) only for navigation in single-line copy.
- **Logo usage**: see `preview/Logo-usage.html` for clearspace and minimum size.

CDN load:
```html
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
<i class="ph ph-graduation-cap" style="font-size: 24px;"></i>
```

> 🚩 **Substitution flag**: Replace Phosphor with the real Atitude icon set once provided.

---

## UI Kits

| Kit | Path | Status |
|---|---|---|
| Marketing site | `ui_kits/marketing/` | Hi-fi homepage + course detail + contact + footer |

(More kits — e.g. parent portal, student app — can be added as the user provides reference material.)

---

## How to use this system

1. Drop `colors_and_type.css` into your project, `@import` it at the top of your stylesheet.
2. Copy the contents of `assets/` into your project's static folder.
3. For React work, lift JSX components straight out of `ui_kits/marketing/` — they're pure presentational, no business logic.
4. When in doubt, **lead with the capsule motif** and **keep one accent color per surface**.

