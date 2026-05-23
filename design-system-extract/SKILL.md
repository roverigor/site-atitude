---
name: atitude-design
description: Use this skill to generate well-branded interfaces and assets for Atitude (Brazilian educational ecosystem brand), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Tokens**: `colors_and_type.css` — drop-in stylesheet with every CSS var (colors, type, spacing, radii, shadows, motion).
- **Logos**: `assets/logo-atitude-wordmark.png` (horizontal), `assets/logo-atitude-mark.png` (vertical stack mark).
- **Reference components**: lift from `ui_kits/marketing/` — pure presentational React, no business logic.
- **Voice rules**: Portuguese (BR), sentence case, first-person plural ("Somos…"), informal "você", no emoji in UI surfaces.
- **One motif**: the capsule / pill. Use `border-radius: 999px` everywhere a primary affordance wants to feel "Atitude".
- **One accent per surface**: pick lime / orange / magenta / violet — don't use all four at full saturation on the same page.

## Flags to surface to the user before producing final work
1. Icons are **Phosphor Regular** (substitution). Confirm or replace.
2. The public site `atitudeensino.com.br` was not reachable during system build — confirm anything site-specific against real screenshots before committing.
