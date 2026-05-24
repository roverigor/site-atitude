# Audit: layout MobileNav (`src/components/layout/MobileNav.tsx`)

## Snapshot
- **Path(s):** `src/components/layout/MobileNav.tsx`
- **Linhas:** 89
- **Última edição:** `df657b1 — 2026-03-22 (pre-fix baseline)`
- **Estado geral:** RED

## Reference Sources
- DS extract: `design-system-extract/preview/motion.html`
- Vivo: `src/components/home/Hero.tsx`, `src/components/layout/Header.tsx`, `src/components/ui/Button.tsx`
- Pilar mapping: navy (institutional)

## Findings

### 1. Type scale + hierarquia
- 🟢 "Menu" heading: `font-bold text-lg` (line 51) — maps to DS `--text-lg` / weight 700. OK.
- 🟢 Nav links: `text-lg font-medium` (line 67) — DS `--text-lg`, weight 500. Acceptable for interactive labels.
- 🟢 Address block: `text-sm` (line 80) — DS `--text-sm`. Correct for secondary info.

### 2. Spacing + rhythm
- 🟡 Address block uses `px-8` (line 80) while all other drawer sections use `px-4` (lines 50, 61, 74) — inconsistent horizontal rhythm. Minor cosmetic; no fix this PR (no DS spacing violation, just inconsistency).
- 🟢 Vertical spacing: `py-6 space-y-1` for nav, `pt-4` / `pt-6` for CTA/address — reasonable rhythm.

### 3. Color treatment
- 🟢 Drawer bg: `bg-[var(--color-background)]` (line 48) — DS semantic token. Correct.
- 🟢 Border separators: `border-[var(--color-border)]` (lines 50, 74) — DS semantic token. Correct.
- 🟢 "Menu" label: `text-[var(--color-brand-navy)]` (line 51) — DS navy institutional. Correct for pilar navy.
- 🟢 Address text: `text-[var(--color-foreground-muted)]` (line 80) — DS semantic. Correct.
- 🟢 Overlay: `bg-black/50` (line 41) — transparent overlay, same pattern as Header.tsx. Acceptable.
- 🟢 Hover states: `hover:bg-black/5 dark:hover:bg-white/10` (lines 54, 67) — consistent with Header.tsx pattern.

### 4. Animações
- 🔴 Drawer uses `animate-in slide-in-from-left duration-300` (line 48) — `tailwindcss-animate` is NOT installed in this project (no package in node_modules, no definition in globals.css). These classes are inert: the drawer snaps open with no animation. DS motion spec (`motion.html`) requires `--ease-pop` + `--duration-slow` (400ms) for page-level transitions. **Fix: replace with framer-motion `AnimatePresence` + `motion.div` using DS tokens (framer-motion v12 IS installed).**
- 🔴 `duration-300` (line 48) — raw Tailwind duration, not a DS motion token. DS defines `--duration-slow: 400ms`. **Fix: use `--duration-slow` via framer-motion `transition` prop.**

### 5. Acessibilidade
- 🔴 `aria-modal="true"` missing (line 44) — `role="dialog"` is present but `aria-modal="true"` is absent. Screen readers will not suppress background content from the accessibility tree while the drawer is open. **Fix: add `aria-modal="true"` to the dialog div.**
- 🔴 Focus trap not implemented (line 16–26) — The `useEffect` only moves focus to the first button on open; Tab and Shift+Tab freely exit the drawer into background content. WCAG 2.1 SC 2.1.2 (No Keyboard Trap) requires focus to remain in the dialog while it is open. **Fix: add keyboard Tab/Shift+Tab intercept within the drawer's focusable elements using `drawerRef`.**
- 🟢 ESC key closes drawer (lines 28–34) — `keydown` listener for `Escape` calls `onClose`. Correct.
- 🟢 Body scroll lock (lines 18–26) — `document.body.style.overflow = "hidden"` on open, cleared on close/unmount. Correct.
- 🟡 Focus restoration on close — no ref to the trigger button; focus is not returned to the hamburger after drawer closes. Cosmetic (browser may restore naturally in some flows). No fix this PR.

## Fix Plan
1. Add `aria-modal="true"` to the `role="dialog"` div (line 44).
2. Implement Tab/Shift+Tab focus trap within `drawerRef` using `drawerRef.current.querySelectorAll` of focusable elements.
3. Replace `animate-in slide-in-from-left duration-300` with `framer-motion` `AnimatePresence` + `motion.div` using DS `--ease-pop` + `--duration-slow`.

## Out of scope (for this audit)
- Copy / content
- Structural rewrites (don't redesign the drawer layout)
- New features (search, sub-menus, etc.)
- Focus restoration to trigger button (YELLOW — defer)
- Address block px-8 inconsistency (YELLOW — cosmetic)
