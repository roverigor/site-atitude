# LGPD Banner — Smoke Test

Run after merging `feat/lgpd-cookies` to validate the consent flow end-to-end on the Vercel preview (or production after merge).

Playwright screenshots from this PR are deferred — the rollout PRs (#2/#3) already established the visual baseline. The banner is purely an additive overlay and easier to verify by hand than to automate.

## Manual checklist (on Vercel preview)

### Default state
- [ ] First visit to `/`: banner appears at bottom in ≤1s after hydrate
- [ ] DevTools → Application → Local Storage → `atitude-cookie-consent` is absent
- [ ] DevTools → Network → no requests to `googletagmanager.com/gtm.js?id=*`, `connect.facebook.net`, `google-analytics.com/g/collect`, or `googleadservices.com` **before** clicking a banner button

### Accept flow
- [ ] Click "Aceitar tudo" → banner animates out (slide-down) in ~250ms
- [ ] DevTools → Application → Local Storage → key now shows `{ "version": 1, "state": { "analytics": "granted", "ad": "granted", "timestamp": "<ISO8601>" } }`
- [ ] DevTools → Network → GTM bootstrap fires + Pixel/GA4/Ads tags now firing
- [ ] Reload `/` → banner does NOT reappear, consent persists, tags continue to fire

### Reject flow
- [ ] (After clearing localStorage manually) Reload → banner reappears
- [ ] Click "Recusar opcionais" → banner closes
- [ ] localStorage shows `analytics: "denied", ad: "denied"`
- [ ] DevTools → Network → no Pixel/GA4/Ads requests (GTM bootstrap itself still loads — that's expected, tags inside it are what get gated)

### Privacy policy page
- [ ] Visit `/politica-privacidade` → 12 sections render, headings use DS classes (`.h1`, `.h2`), body text legible
- [ ] In section 9, the inline "Preferências de cookies" button is visible and clickable → reopens banner
- [ ] Robots: view page source, confirm `<meta name="robots" content="index, follow">`
- [ ] Section 1 still has `[CNPJ — pendente]` and section 11 has `[Nome do DPO — pendente]` — these are intentional placeholders, owner replaces before public launch

### Footer revoke
- [ ] Scroll to Footer → "Preferências de cookies" button visible alongside "Política de privacidade" link, separated by `·`
- [ ] Click "Preferências de cookies" → banner reopens
- [ ] User can pick again; new decision overwrites old localStorage value

### Mobile
- [ ] Chrome DevTools 375×667 → banner stacks vertically (text on top, buttons below)
- [ ] Buttons full-width stack at this breakpoint (no horizontal overflow)
- [ ] Container padding respects safe-area on iOS notch (visual check)

### Accessibility
- [ ] Keyboard: Tab cycles into banner buttons (Recusar → Aceitar)
- [ ] Enter / Space activates focused button
- [ ] Screen reader (macOS VoiceOver / Windows NVDA): announces "Aviso de cookies, dialog" when banner appears
- [ ] System Setting → Reduce Motion ON → banner appears without slide-in animation (instant fade-in)
- [ ] Lighthouse a11y on `/` with banner visible: contrast AA, dialog role announced

## What still needs owner action

1. **Publish GTM container with consent settings on each tag** — see `docs/lgpd-gtm-setup.md`. **Non-optional** — without this step the code-side consent default is bypassed because tags without "Require Consent" inside GTM fire regardless of the dataLayer state.

2. **Fill in `[CNPJ — pendente]` and `[Nome do DPO — pendente]`** in `src/app/politica-privacidade/page.tsx` lines around the policy headings 1 and 11.

3. **(Optional)** Enable Google modeled conversions per `docs/lgpd-gtm-setup.md` — fills measurement gaps for users who deny consent.

## Rollback

If something breaks post-merge:
```bash
git revert <merge-sha-into-main>
git push
```
Vercel auto-redeploys the pre-LGPD state. Banner + consent are feature-flag-free, so a single revert removes them cleanly.
