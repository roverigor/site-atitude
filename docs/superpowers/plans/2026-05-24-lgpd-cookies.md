# LGPD Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Google Consent Mode v2 + bottom-sticky LGPD cookie banner with Accept/Reject choices, localStorage persistence, Footer revoke link, and a `/politica-privacidade` page — wire everything against the existing GTM single-script setup without breaking dev mode.

**Architecture:** Pure consent state lib (`src/lib/consent.ts`) + React hook (`src/lib/useConsent.ts`) drive a client `CookieBanner` component. `Analytics.tsx` is modified to push `consent default denied` via `beforeInteractive` script BEFORE the GTM script runs, then immediately reapply persisted consent from localStorage. Footer gets a revoke link. New static page at `/politica-privacidade`.

**Tech Stack:** Next.js 15.5 App Router, React 19 client components, Tailwind 4 (CSS-first @theme tokens already in `src/app/globals.css`), framer-motion 12, next/script `beforeInteractive` + `afterInteractive` strategies, lucide-react icons, existing UI primitives (`Button`, `Container`, `Section`).

**Spec:** `docs/superpowers/specs/2026-05-24-lgpd-cookies-design.md` (commit `5f99701`)

---

## Conventions Used Throughout This Plan

**Branch:** `feat/lgpd-cookies` from `main` (HEAD at `5f99701` or newer — `main` already has the spec).

**Commit message format:**
- `feat(lgpd): <one-line>` — new files / new features
- `fix(lgpd): <one-line>` — bug fixes in lgpd code
- `docs(lgpd): <one-line>` — docs (GTM setup guide)
- `chore(lgpd): <one-line>` — branch scaffold / progress notes

**Verification commands referenced throughout:**

- **V-LINT:** `npm run lint` — expected: exit 0, no NEW warnings (pre-existing ~35 stay)
- **V-BUILD:** `npm run build` — expected: exit 0
- **V-TS:** `npx tsc --noEmit` — expected: exit 0 (no new type errors)

**File scope guard:** Each Task lists exact files. Implementer must NOT touch files outside the list. If a fix requires editing a file not listed, STOP and report DONE_WITH_CONCERNS.

**Manual verification:** This feature has visual + browser-state requirements. After Task 9 (final wiring), Task 10 includes a Playwright smoke test. Owner separately needs to do the GTM container config (Task 8 documentation).

---

## File Structure

**Created during this plan:**

```
src/lib/
  consent.ts                          # Task 1 — pure lib (no React)
  useConsent.ts                       # Task 2 — React hook ("use client")
src/components/consent/
  CookieBanner.tsx                    # Task 4 — banner component
  ConsentLink.tsx                     # Task 5 — revoke link for Footer
src/app/politica-privacidade/
  page.tsx                            # Task 7 — static privacy policy
docs/
  lgpd-gtm-setup.md                   # Task 8 — owner's one-time GTM container config
```

**Modified during this plan:**

```
src/components/shared/Analytics.tsx   # Task 3 — push default-denied + persisted-update before GTM
src/app/layout.tsx                    # Task 6 — mount <CookieBanner /> in ThemeProvider
src/components/layout/Footer.tsx      # Task 9 — add <ConsentLink />
```

---

## Task 0: Branch + scaffold

**Files:** (none modified)

- [ ] **Step 1: Confirm starting state**

Run:
```bash
git checkout main
git pull --ff-only
git status -sb
git log --oneline -1
```
Expected: branch `main`, clean tree (the pre-existing `M public/sitemap-0.xml` is acceptable — leave untouched), HEAD at `5f99701` (LGPD spec commit) or newer.

- [ ] **Step 2: Create + switch to feature branch**

Run:
```bash
git checkout -b feat/lgpd-cookies
```
Expected: `Switched to a new branch 'feat/lgpd-cookies'`.

---

## Task 1: Create `src/lib/consent.ts` (pure consent state lib)

**Files:**
- Create: `src/lib/consent.ts`

- [ ] **Step 1: Write the lib**

Create `src/lib/consent.ts` with EXACT content:

```ts
/**
 * LGPD cookie consent state — pure lib, no React.
 *
 * Storage shape (localStorage key 'atitude-cookie-consent'):
 *   { version: 1, state: { analytics: 'granted'|'denied', ad: 'granted'|'denied', timestamp: ISO8601 } }
 *
 * Schema version bump (CONSENT_VERSION) forces re-prompt when categories change.
 *
 * Wired into Google Consent Mode v2:
 *   - pushDefaultConsent() runs BEFORE the GTM script tag (see Analytics.tsx)
 *   - setConsent() / clearConsent() push 'consent update' to dataLayer via window.gtag
 */

type ConsentChoice = "granted" | "denied";

export type ConsentState = {
  analytics: ConsentChoice;
  ad: ConsentChoice;
  timestamp: string; // ISO8601
};

export const CONSENT_KEY = "atitude-cookie-consent";
const CONSENT_VERSION = 1;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed.state as ConsentState;
  } catch {
    return null;
  }
}

export function setConsent(input: Omit<ConsentState, "timestamp">): void {
  if (typeof window === "undefined") return;
  const full: ConsentState = { ...input, timestamp: new Date().toISOString() };
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ version: CONSENT_VERSION, state: full })
    );
  } catch {
    /* localStorage blocked — in-memory only */
  }
  pushConsentUpdate(full);
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

function pushConsentUpdate(state: ConsentState): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: state.analytics,
    ad_storage: state.ad,
    ad_user_data: state.ad,
    ad_personalization: state.ad,
  });
}
```

- [ ] **Step 2: Type check**

Run:
```bash
npx tsc --noEmit
```
Expected: exit 0. No new errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/consent.ts
git commit -m "$(cat <<'EOF'
feat(lgpd): add consent state lib with localStorage + dataLayer push

Pure TS lib (no React). Reads/writes versioned localStorage payload.
On setConsent/clearConsent, pushes gtag('consent', 'update') to dataLayer
so GTM tags with Require Consent settings can react.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Create `src/lib/useConsent.ts` (React hook)

**Files:**
- Create: `src/lib/useConsent.ts`

- [ ] **Step 1: Write the hook**

Create `src/lib/useConsent.ts` with EXACT content:

```ts
"use client";

import { useEffect, useState } from "react";
import {
  getConsent,
  setConsent,
  clearConsent,
  type ConsentState,
} from "./consent";

/**
 * Reactive consent hook for CookieBanner + ConsentLink.
 *
 * Returns:
 *   - consent: current persisted state, null if user hasn't decided
 *   - mounted: true after first client-side effect (use to avoid SSR/hydration flash)
 *   - accept(): grant both analytics + ad
 *   - reject(): deny both
 *   - revoke(): clear localStorage and re-deny — banner re-appears
 */
export function useConsent() {
  const [state, setState] = useState<ConsentState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(getConsent());
    setMounted(true);
  }, []);

  return {
    consent: state,
    mounted,
    accept: () => {
      setConsent({ analytics: "granted", ad: "granted" });
      setState(getConsent());
    },
    reject: () => {
      setConsent({ analytics: "denied", ad: "denied" });
      setState(getConsent());
    },
    revoke: () => {
      clearConsent();
      setState(null);
    },
  };
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/lib/useConsent.ts
git commit -m "$(cat <<'EOF'
feat(lgpd): add useConsent React hook

Wraps consent lib for client components. Returns mounted flag to avoid
SSR/hydration flash, plus accept/reject/revoke actions that update both
localStorage and React state in sync.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Modify `src/components/shared/Analytics.tsx` (consent-mode default + persistence)

**Files:**
- Modify: `src/components/shared/Analytics.tsx`

- [ ] **Step 1: Read current state**

```bash
cat src/components/shared/Analytics.tsx
```
Confirm: it's a client component with two-tier rendering (production + GTM_ID present), pushing GTM via `afterInteractive` Script + noscript iframe.

- [ ] **Step 2: Rewrite with consent-mode wrapper**

Replace the ENTIRE file content with:

```tsx
"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Analytics — loads GTM only. All tracking tags (Meta Pixel, GA4,
 * Google Ads, etc.) live INSIDE the GTM container and must be configured
 * with "Require additional consent" (see docs/lgpd-gtm-setup.md).
 *
 * Pipeline:
 *   1. beforeInteractive: push gtag('consent', 'default', denied) + replay
 *      any persisted consent from localStorage. Runs BEFORE GTM loads.
 *   2. afterInteractive: GTM bootstrap snippet. Tags respect consent state.
 *   3. noscript iframe: fallback for JS-disabled clients.
 *
 * Dev/preview builds skip everything (IS_PRODUCTION guard).
 */
export function Analytics() {
  if (!IS_PRODUCTION || !GTM_ID) return null;

  return (
    <>
      {/* 1. Consent default + persisted update — runs BEFORE GTM */}
      <Script
        id="gtm-consent-default"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
            try {
              var raw = localStorage.getItem('atitude-cookie-consent');
              if (raw) {
                var parsed = JSON.parse(raw);
                if (parsed && parsed.version === 1 && parsed.state) {
                  gtag('consent', 'update', {
                    'analytics_storage': parsed.state.analytics,
                    'ad_storage': parsed.state.ad,
                    'ad_user_data': parsed.state.ad,
                    'ad_personalization': parsed.state.ad
                  });
                }
              }
            } catch (e) { /* localStorage blocked — defaults stay denied */ }
          `,
        }}
      />

      {/* 2. GTM bootstrap */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* 3. noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
```

- [ ] **Step 3: Type check + build**

```bash
npx tsc --noEmit
npm run build 2>&1 | tail -10
```
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/Analytics.tsx
git commit -m "$(cat <<'EOF'
feat(lgpd): wire Google Consent Mode v2 default-denied before GTM

Adds beforeInteractive script that pushes gtag('consent', 'default', denied)
for analytics_storage, ad_storage, ad_user_data, ad_personalization, then
replays persisted state from localStorage. GTM script keeps afterInteractive
strategy so tags load with consent state already set.

functionality_storage and security_storage stay granted (cover theme
preference + the consent cookie itself — LGPD art. 7º IX legítimo interesse).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Create `src/components/consent/CookieBanner.tsx`

**Files:**
- Create: `src/components/consent/CookieBanner.tsx`

- [ ] **Step 1: Confirm dependencies exist**

Run:
```bash
grep -nE "export.*Button\\b" src/components/ui/Button.tsx | head
grep -nE "export.*Container\\b" src/components/layout/Container.tsx | head
grep -nE "^\\s*--z-modal\\b" src/app/globals.css
grep -nE "^\\s*--color-(background-alt|brand-orange|brand-navy|brand-purple|border|foreground)\\b" src/app/globals.css
grep -nE "^\\s*--shadow-xl\\b" src/app/globals.css
```
All must return matches. Confirms Button/Container exist and the DS tokens we'll use are defined.

- [ ] **Step 2: Write the component**

Create `src/components/consent/CookieBanner.tsx` with EXACT content:

```tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { useConsent } from "@/lib/useConsent";

/**
 * Bottom-sticky LGPD cookie consent banner.
 *
 * - Renders only when consent === null (user hasn't decided)
 * - aria-modal="false" — banner is non-blocking; LGPD allows this
 * - Buttons have equal visual weight (Aceitar / Recusar) per ANPD guidance
 * - Honors prefers-reduced-motion (no slide animation)
 */
export function CookieBanner() {
  const { consent, mounted, accept, reject } = useConsent();
  const reducedMotion = useReducedMotion();

  // Avoid hydration flash + don't render after a decision
  if (!mounted) return null;
  if (consent !== null) return null;

  const variants = reducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: 100, opacity: 0 },
        animate: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const },
        },
        exit: {
          y: 100,
          opacity: 0,
          transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
        },
      };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
        aria-modal="false"
        className="fixed bottom-0 left-0 right-0 z-[var(--z-modal)] bg-[var(--color-background-alt)] border-t border-[var(--color-border)] shadow-[var(--shadow-xl)]"
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
      >
        <Container className="py-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie
              className="h-6 w-6 text-[var(--color-brand-orange)] flex-shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p id="cookie-banner-title" className="sr-only">
                Aviso de cookies
              </p>
              <p
                id="cookie-banner-desc"
                className="body text-[var(--color-foreground)]"
              >
                Usamos cookies para melhorar sua experiência, lembrar suas
                preferências e medir o desempenho do site. Você pode aceitar
                todos ou recusar os opcionais. Veja nossa{" "}
                <Link
                  href="/politica-privacidade"
                  className="underline text-[var(--color-brand-purple)] hover:text-[var(--color-brand-navy)]"
                >
                  Política de privacidade
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
            <Button
              variant="outline"
              onClick={reject}
              aria-label="Recusar cookies opcionais"
            >
              Recusar opcionais
            </Button>
            <Button
              variant="primary"
              onClick={accept}
              aria-label="Aceitar todos os cookies"
            >
              Aceitar tudo
            </Button>
          </div>
        </Container>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Verify `Button` API matches**

```bash
grep -nE "variant\?:|interface ButtonProps|type ButtonProps" src/components/ui/Button.tsx | head
```
Confirm `variant="primary"` and `variant="outline"` are valid options. If they aren't, STOP and report BLOCKED — the Button API differs from assumption and the plan needs adjustment.

If Button takes `href` for links and `onClick` for buttons separately, the above usage (no `href`, with `onClick`) should render a `<button>` element. If Button always renders an anchor and ignores `onClick`, STOP.

- [ ] **Step 4: Type check + build**

```bash
npx tsc --noEmit
npm run build 2>&1 | tail -10
```
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/consent/CookieBanner.tsx
git commit -m "$(cat <<'EOF'
feat(lgpd): add CookieBanner bottom-sticky banner with 2-button flow

framer-motion slide-up/-down with prefers-reduced-motion honored.
role=dialog aria-modal=false (non-blocking). DS tokens for bg, border,
shadow, z-index, colors. Equal visual weight for Recusar/Aceitar per ANPD.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Create `src/components/consent/ConsentLink.tsx`

**Files:**
- Create: `src/components/consent/ConsentLink.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/consent/ConsentLink.tsx` with EXACT content:

```tsx
"use client";

import { useConsent } from "@/lib/useConsent";

/**
 * Footer button that revokes consent and re-opens the banner.
 *
 * Inherits color/sizing from `className` so the parent layout (typically
 * a dark Footer) can style it to fit context. Defaults to white/80 underline
 * if no className is passed.
 */
export function ConsentLink({ className }: { className?: string }) {
  const { revoke } = useConsent();
  return (
    <button
      type="button"
      onClick={revoke}
      className={
        className ??
        "underline hover:text-[var(--color-brand-green)] text-sm text-white/80"
      }
    >
      Preferências de cookies
    </button>
  );
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```
Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/consent/ConsentLink.tsx
git commit -m "$(cat <<'EOF'
feat(lgpd): add ConsentLink revoke button for Footer

Clears persisted consent + pushes denied state to gtag, then the
banner's mounted state re-opens the dialog so user can pick again.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Mount `<CookieBanner />` in `src/app/layout.tsx`

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read current state**

```bash
cat src/app/layout.tsx
```
Confirm the `<ThemeProvider>` wraps `<ConditionalWrapper>` + `<Analytics />`. We'll add `<CookieBanner />` as the last sibling inside `<ThemeProvider>`.

- [ ] **Step 2: Apply edit**

Edit `src/app/layout.tsx`:

Add import near the existing `Analytics` import:

```tsx
import { CookieBanner } from "@/components/consent/CookieBanner";
```

Inside the `<ThemeProvider>` block, after `<Analytics />` and before the closing `</ThemeProvider>`, add:

```tsx
<CookieBanner />
```

The block should end up looking like:

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <a href="#main-content" className="skip-to-content">
    Pular para o conteúdo
  </a>
  <ConditionalWrapper>
    {children}
  </ConditionalWrapper>
  <Analytics />
  <CookieBanner />
</ThemeProvider>
```

- [ ] **Step 3: Type check + build**

```bash
npx tsc --noEmit
npm run build 2>&1 | tail -10
```
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "$(cat <<'EOF'
feat(lgpd): mount CookieBanner inside ThemeProvider in root layout

Banner is rendered on every route. Internal mounted+consent guards
keep it invisible after the user decides.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Create `src/app/politica-privacidade/page.tsx`

**Files:**
- Create: `src/app/politica-privacidade/page.tsx`

- [ ] **Step 1: Create directory and write the page**

Create the file `src/app/politica-privacidade/page.tsx` with EXACT content:

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ConsentLink } from "@/components/consent/ConsentLink";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Atitude Ensino trata seus dados pessoais — conformidade LGPD.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-05-24";

export default function PoliticaPrivacidadePage() {
  return (
    <Section variant="default">
      <Container className="max-w-3xl py-12 md:py-20">
        <h1 className="h1 text-[var(--color-brand-navy)] dark:text-white mb-2">
          Política de Privacidade
        </h1>
        <p className="text-[var(--color-foreground-muted)] mb-8">
          Última atualização: {LAST_UPDATED}
        </p>

        <h2 className="h2 mt-12 mb-4">1. Quem somos</h2>
        <p className="body mb-4">
          A <strong>Atitude Ensino</strong> é uma instituição de ensino com sede
          em Ibaiti-PR, inscrita no CNPJ{" "}
          <span aria-label="CNPJ pendente">[CNPJ — pendente]</span>. Endereço:
          Rua XV de Novembro, 123 — Ibaiti/PR — CEP 84900-000. Contato:{" "}
          <a
            className="underline text-[var(--color-brand-purple)]"
            href="mailto:contato@atitudeensino.com.br"
          >
            contato@atitudeensino.com.br
          </a>
          .
        </p>

        <h2 className="h2 mt-12 mb-4">2. Quais dados coletamos</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Dados fornecidos por você:</strong> nome, WhatsApp, curso de
            interesse — coletados via formulários do site.
          </li>
          <li>
            <strong>Dados de navegação:</strong> páginas visitadas, dispositivo,
            origem do tráfego — coletados via Google Tag Manager (apenas com
            seu consentimento).
          </li>
          <li>
            <strong>Cookies essenciais:</strong> preferência de tema
            (claro/escuro), preferência de consentimento — não exigem
            consentimento (LGPD art. 7º, IX).
          </li>
        </ul>

        <h2 className="h2 mt-12 mb-4">3. Por que coletamos</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>Responder ao seu contato via WhatsApp e oferecer informações sobre cursos.</li>
          <li>Medir o desempenho do site (Google Analytics 4).</li>
          <li>Veicular anúncios relevantes (Meta Pixel, Google Ads) — apenas com consentimento.</li>
          <li>Lembrar suas preferências (tema, consentimento de cookies).</li>
        </ul>

        <h2 className="h2 mt-12 mb-4">4. Bases legais (LGPD art. 7º)</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Consentimento (I):</strong> cookies de analytics, ads e marketing.
          </li>
          <li>
            <strong>Execução de contrato (V):</strong> tratamento de dados de matrícula.
          </li>
          <li>
            <strong>Legítimo interesse (IX):</strong> cookies essenciais ao funcionamento do site.
          </li>
        </ul>

        <h2 className="h2 mt-12 mb-4">5. Cookies utilizados</h2>
        <p className="body mb-4">
          <strong>Essenciais</strong> (sempre ativos): preferência de tema,
          preferência de consentimento.
        </p>
        <p className="body mb-4">
          <strong>Analytics</strong> (com consentimento): Google Analytics 4 —
          mede páginas vistas, eventos, origem do tráfego.
        </p>
        <p className="body mb-4">
          <strong>Marketing</strong> (com consentimento): Meta Pixel
          (Facebook/Instagram), Google Ads — permitem remarketing e mensuração
          de conversões.
        </p>

        <h2 className="h2 mt-12 mb-4">6. Compartilhamento</h2>
        <p className="body mb-4">
          Dados anonimizados de navegação são compartilhados com Google
          (Analytics, Ads, Tag Manager) e Meta (Pixel) apenas quando você
          consente. Dados fornecidos em formulários (nome, WhatsApp) são
          enviados ao WhatsApp do nosso time comercial e não são vendidos a
          terceiros.
        </p>

        <h2 className="h2 mt-12 mb-4">7. Transferência internacional</h2>
        <p className="body mb-4">
          Google e Meta processam dados em servidores fora do Brasil (EUA, União
          Europeia). Essas transferências seguem mecanismos legais previstos na
          LGPD (art. 33) e nos Termos de Uso desses provedores.
        </p>

        <h2 className="h2 mt-12 mb-4">8. Seus direitos (LGPD art. 18)</h2>
        <p className="body mb-4">
          Você tem direito a: confirmar tratamento, acessar seus dados, corrigir
          dados incompletos, anonimizar/bloquear/eliminar dados desnecessários,
          portar dados, eliminar dados tratados com consentimento, ser
          informado sobre compartilhamentos, ser informado sobre
          não-consentimento, e revogar consentimento.
        </p>

        <h2 className="h2 mt-12 mb-4">9. Como exercer seus direitos</h2>
        <p className="body mb-4">
          Envie email para{" "}
          <a
            className="underline text-[var(--color-brand-purple)]"
            href="mailto:contato@atitudeensino.com.br"
          >
            contato@atitudeensino.com.br
          </a>{" "}
          ou use o link de{" "}
          <ConsentLink className="underline text-[var(--color-brand-purple)]" />{" "}
          abaixo pra revogar o consentimento de cookies.
        </p>

        <h2 className="h2 mt-12 mb-4">10. Retenção</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Leads (nome, WhatsApp):</strong> 24 meses, ou até pedido de exclusão.
          </li>
          <li>
            <strong>Cookies essenciais:</strong> 1 ano (preferências), 6 meses (consentimento).
          </li>
          <li>
            <strong>Cookies analytics/marketing:</strong> conforme política do
            Google/Meta (geralmente 14 a 26 meses).
          </li>
        </ul>

        <h2 className="h2 mt-12 mb-4">11. Encarregado pelo tratamento (DPO)</h2>
        <p className="body mb-4">
          Encarregado: <span>[Nome do DPO — pendente]</span>. Email:{" "}
          <a
            className="underline text-[var(--color-brand-purple)]"
            href="mailto:contato@atitudeensino.com.br"
          >
            contato@atitudeensino.com.br
          </a>
          .
        </p>

        <h2 className="h2 mt-12 mb-4">12. Atualizações desta política</h2>
        <p className="body mb-4">
          Esta política pode ser atualizada. Mudanças relevantes serão
          informadas via banner ou comunicação direta.
        </p>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Type check + build**

```bash
npx tsc --noEmit
npm run build 2>&1 | tail -10
```
Expected: both pass. Build output should now show `/politica-privacidade` as a generated route.

- [ ] **Step 3: Commit**

```bash
git add src/app/politica-privacidade/page.tsx
git commit -m "$(cat <<'EOF'
feat(lgpd): add /politica-privacidade page with full LGPD copy

Static server component. 12 sections covering controller identity,
data collected, purposes, legal bases, cookies, sharing, international
transfer, data subject rights, revocation flow, retention, DPO, and
updates clause. Robots set to index/follow.

Placeholders [CNPJ — pendente] and [Nome do DPO — pendente] are
intentional — owner fills in before public launch.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Document GTM container setup in `docs/lgpd-gtm-setup.md`

**Files:**
- Create: `docs/lgpd-gtm-setup.md`

- [ ] **Step 1: Write the guide**

Create `docs/lgpd-gtm-setup.md` with EXACT content:

```markdown
# GTM Container Setup for LGPD Consent Mode v2

The site code pushes `gtag('consent', 'default', denied)` before the GTM script loads (see `src/components/shared/Analytics.tsx`). For this to actually block tracking tags, **each tag inside the GTM container must be marked as requiring consent**.

This is a one-time owner action that lives outside the code repo.

## Steps

1. Open Google Tag Manager (https://tagmanager.google.com) and select the container linked to `NEXT_PUBLIC_GTM_ID`.

2. For **each tag** that handles user data (GA4 Config, GA4 Events, Meta Pixel Base, Meta Pixel custom events, Google Ads conversion tracking, Google Ads remarketing, etc.), open the tag and click **Advanced Settings → Consent Settings**.

3. Select **"Require additional consent for tag to fire"** and mark the consent types according to the table below:

   | Tag type | Required consent types |
   |---|---|
   | GA4 Configuration | `analytics_storage` |
   | GA4 Events | `analytics_storage` |
   | Meta Pixel (Base + Events) | `ad_storage` |
   | Google Ads Conversion | `ad_storage`, `ad_user_data`, `ad_personalization` |
   | Google Ads Remarketing | `ad_storage`, `ad_user_data`, `ad_personalization` |
   | TikTok Pixel (if used) | `ad_storage` |
   | LinkedIn Insight (if used) | `ad_storage` |

4. **Save** each tag.

5. Click **Submit** in the top-right and **Publish** the container.

## Verification

Use GTM Preview Mode to confirm:

1. Open Preview, enter `https://atitudeensino.com.br/` in the URL field, click Connect.
2. In the Preview sidebar, look at **Consent** state for the first hit:
   - Before user decides: `analytics_storage = denied`, `ad_storage = denied`, etc.
   - Tags should show "Not fired — consent missing" or similar.
3. Accept cookies on the live banner. In Preview, observe the **Consent Update** event in the dataLayer and confirm tags now fire.

## What happens if I don't do this?

The site code still pushes `consent default denied`, but tags **without** Require Consent settings inside GTM will fire anyway — defeating the LGPD compliance. This step is non-optional.

## Modeled conversions

With Consent Mode v2 properly configured, Google fills measurement gaps for users who deny consent using statistical modeling. To enable:

- GA4 → Admin → Data collection and modification → Data collection → "Enable Google signals" + "Activate user-provided data collection"
- Google Ads → "Use modeled conversions" inside the conversion action

These are optional UX improvements; LGPD compliance is achieved purely by the consent gating in step 3.
```

- [ ] **Step 2: Commit**

```bash
git add docs/lgpd-gtm-setup.md
git commit -m "$(cat <<'EOF'
docs(lgpd): add GTM container setup guide for Consent Mode v2

Owner-action guide: which tags need 'Require additional consent' and
which consent types (analytics_storage, ad_storage, ad_user_data,
ad_personalization). Without this one-time config the code-side
consent default is bypassed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Wire `<ConsentLink />` into Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Read Footer structure**

```bash
cat src/components/layout/Footer.tsx
```

Identify a sensible spot near the bottom of the Footer — typically in the same row/column as copyright, terms, or other secondary links. The Footer uses a dark navy background, so the default `ConsentLink` className (`text-white/80`) will fit.

- [ ] **Step 2: Apply edit**

Add import at the top of `src/components/layout/Footer.tsx`:

```tsx
import { ConsentLink } from "@/components/consent/ConsentLink";
```

Find the bottom-row links area (look for terms like "Termos", copyright text, or other footer links). Insert:

```tsx
<ConsentLink className="underline hover:text-[var(--color-brand-green)] text-sm text-white/80" />
```

next to the existing links. If the Footer has a `<nav>` for legal links, add it there. If there's no obvious legal-links group, add it inline next to the copyright `<p>` with a separator (`·` or `|`).

Example placement (assuming a flex row at the bottom):

```tsx
<div className="flex flex-wrap gap-4 items-center text-sm text-white/80">
  <p>© {new Date().getFullYear()} Atitude Ensino</p>
  <span aria-hidden="true">·</span>
  <Link href="/politica-privacidade" className="underline hover:text-[var(--color-brand-green)]">
    Política de privacidade
  </Link>
  <span aria-hidden="true">·</span>
  <ConsentLink className="underline hover:text-[var(--color-brand-green)] text-sm text-white/80" />
</div>
```

If the Footer is already in compliance from the rollout (no raw hex/palette violations), do NOT change other elements. The ConsentLink import + 1 insertion is the only change.

- [ ] **Step 3: Type check + build**

```bash
npx tsc --noEmit
npm run build 2>&1 | tail -10
```
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "$(cat <<'EOF'
feat(lgpd): add Preferências de cookies revoke link to Footer

ConsentLink button calls clearConsent() which removes the localStorage
key and re-pushes denied to gtag. The mounted React state of the
banner detects null consent and re-opens the dialog.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: End-to-end smoke test (Playwright MCP) + verification doc

**Files:**
- Create: `docs/ds-audit/screenshots-lgpd/` (directory)
- Create: `docs/lgpd-smoke-test.md`

This task uses the Playwright MCP browser available to the controller. If unavailable (no Playwright MCP), skip the screenshot capture and document the manual checklist only.

- [ ] **Step 1: Start dev server**

```bash
npm run dev 2>&1
```
Run in background. Wait until output contains `Ready in`. Confirm `http://localhost:3000/` is up.

**Important caveat:** the banner only renders in production (`IS_PRODUCTION` guard in Analytics.tsx is for GTM, but the CookieBanner is mounted regardless — see Task 6). However, the gtag pipeline depends on the GTM script which dev mode skips. **For smoke testing the banner UI and persistence, dev mode is enough.** For end-to-end consent-mode behavior (gtag updates blocking real tags), do the final check on the Vercel preview deployment after the PR opens.

- [ ] **Step 2: Visit `/` in browser**

Use Playwright MCP:
```
browser_resize 1440x900
browser_navigate http://localhost:3000/
browser_take_screenshot docs/ds-audit/screenshots-lgpd/01-home-banner-light.png (fullPage: true)
```
Confirm banner is visible at bottom.

- [ ] **Step 3: Verify localStorage is empty before decision**

Use Playwright MCP:
```
browser_evaluate () => localStorage.getItem('atitude-cookie-consent')
```
Expected: `null`.

- [ ] **Step 4: Click "Aceitar tudo"**

Use Playwright MCP:
```
browser_click button with text "Aceitar tudo"
```
Wait ~500ms for animation.

```
browser_take_screenshot docs/ds-audit/screenshots-lgpd/02-home-after-accept.png
browser_evaluate () => localStorage.getItem('atitude-cookie-consent')
```
Expected: banner gone from screenshot. localStorage shows JSON with `analytics: 'granted', ad: 'granted'`.

- [ ] **Step 5: Reload, verify banner does not reappear**

```
browser_navigate http://localhost:3000/
browser_take_screenshot docs/ds-audit/screenshots-lgpd/03-home-reload-no-banner.png
```
Expected: no banner visible.

- [ ] **Step 6: Visit `/politica-privacidade`**

```
browser_navigate http://localhost:3000/politica-privacidade
browser_take_screenshot docs/ds-audit/screenshots-lgpd/04-politica-privacidade.png (fullPage: true)
```
Expected: 12 sections visible, headings styled per DS, ConsentLink button visible in section 9.

- [ ] **Step 7: Use Footer revoke link**

Scroll to Footer:
```
browser_evaluate () => document.querySelector('footer').scrollIntoView({behavior: 'instant', block: 'end'})
browser_take_screenshot docs/ds-audit/screenshots-lgpd/05-footer-with-consent-link.png
```
Confirm "Preferências de cookies" button is visible.

Click it:
```
browser_click button with text "Preferências de cookies"
browser_take_screenshot docs/ds-audit/screenshots-lgpd/06-banner-reopened.png
```
Expected: banner reappears.

- [ ] **Step 8: Click "Recusar opcionais"**

```
browser_click button with text "Recusar opcionais"
browser_evaluate () => localStorage.getItem('atitude-cookie-consent')
```
Expected: banner gone, localStorage now shows `analytics: 'denied', ad: 'denied'`.

- [ ] **Step 9: Test mobile viewport**

```
browser_resize 375x667
browser_evaluate () => localStorage.removeItem('atitude-cookie-consent')
browser_navigate http://localhost:3000/
browser_take_screenshot docs/ds-audit/screenshots-lgpd/07-mobile-banner.png (fullPage: true)
```
Expected: banner stacks vertically, buttons full-width.

- [ ] **Step 10: Test reduced motion**

```
browser_evaluate () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (q) => ({ matches: q.includes('reduce'), media: q, addEventListener(){}, removeEventListener(){} })
  });
  localStorage.removeItem('atitude-cookie-consent');
  location.reload();
}
```
Wait for reload, screenshot:
```
browser_take_screenshot docs/ds-audit/screenshots-lgpd/08-reduced-motion.png
```
Expected: banner present, no slide-in animation observed (instant fade-in via reducedMotion path).

- [ ] **Step 11: Write smoke test doc**

Create `docs/lgpd-smoke-test.md`:

```markdown
# LGPD Banner — Smoke Test

Run after merging `feat/lgpd-cookies` to validate the consent flow end-to-end.

Screenshots from the implementation pass live in `docs/ds-audit/screenshots-lgpd/`.

## Manual checklist (on Vercel preview)

- [ ] First visit: banner appears at bottom of `/`
- [ ] DevTools → Application → Local Storage → `atitude-cookie-consent` is absent
- [ ] DevTools → Network → no requests to `googletagmanager.com/gtm.js?id=*`, `connect.facebook.net`, `google-analytics.com` before click
- [ ] Click "Aceitar tudo" → banner animates out
- [ ] localStorage now has `{ version: 1, state: { analytics: 'granted', ad: 'granted', ... } }`
- [ ] Network: GTM + tags now firing
- [ ] Reload `/` → banner does NOT reappear, gtag state persisted
- [ ] Visit `/politica-privacidade` → 12 sections render, `<ConsentLink />` visible in section 9
- [ ] Footer → "Preferências de cookies" → banner reopens
- [ ] Click "Recusar opcionais" → banner closes, localStorage has `denied`, gtag updates accordingly
- [ ] Reload → tags NOT firing (Network confirms)
- [ ] Mobile (Chrome DevTools 375×667): banner stacks vertical, buttons full-width
- [ ] System Setting → Reduce Motion → banner appears without slide-in
- [ ] Lighthouse a11y on `/` with banner visible: contrast AA, dialog role announced

## What still needs owner action

1. **Publish GTM container with consent settings on each tag** — see `docs/lgpd-gtm-setup.md`.
2. **Fill in `[CNPJ — pendente]` and `[Nome do DPO — pendente]`** in `src/app/politica-privacidade/page.tsx`.
3. **(Optional)** Enable Google modeled conversions per `docs/lgpd-gtm-setup.md`.
```

- [ ] **Step 12: Kill dev server + commit screenshots and doc**

```bash
ps aux | grep -E "next dev" | grep -v grep | awk '{print $2}' | xargs -r kill 2>/dev/null
```

```bash
git add docs/ds-audit/screenshots-lgpd/ docs/lgpd-smoke-test.md
git commit -m "$(cat <<'EOF'
chore(lgpd): add Playwright smoke screenshots + manual checklist

End-to-end captures of the banner flow on dev server: home with banner,
accept flow + localStorage state, reload persistence, /politica-privacidade
render, Footer revoke link, mobile stack, reduced-motion.

Manual checklist documents what to verify on Vercel preview before merge,
including DevTools network checks for real consent-mode behavior with
the published GTM container.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Push + open PR

**Files:** (none modified)

- [ ] **Step 1: Push branch**

```bash
git push -u origin feat/lgpd-cookies
```
Expected: branch created on origin.

If push fails due to remote rejection, STOP and report BLOCKED. Do NOT force push.

- [ ] **Step 2: Open PR**

```bash
gh pr create --base main --head feat/lgpd-cookies \
  --title "feat: LGPD cookie consent banner + Google Consent Mode v2" \
  --body "$(cat <<'PRBODY'
## Summary

Implements LGPD-compliant cookie consent flow on top of the existing GTM single-script setup. Banner appears on first visit, persists user decision in localStorage, and wires `gtag('consent', 'default'|'update', ...)` so GTM tags marked "Require additional consent" respect the user's choice.

## What changed

### New
- `src/lib/consent.ts` — pure consent state lib (localStorage + dataLayer push)
- `src/lib/useConsent.ts` — React hook wrapping the lib
- `src/components/consent/CookieBanner.tsx` — bottom-sticky banner, framer-motion slide-up
- `src/components/consent/ConsentLink.tsx` — Footer revoke button
- `src/app/politica-privacidade/page.tsx` — full LGPD privacy policy (12 sections, 2 placeholders for CNPJ/DPO)
- `docs/lgpd-gtm-setup.md` — owner's one-time GTM container config guide
- `docs/lgpd-smoke-test.md` — post-merge manual checklist

### Modified
- `src/components/shared/Analytics.tsx` — `beforeInteractive` consent-default + persisted-replay script before GTM
- `src/app/layout.tsx` — `<CookieBanner />` mounted in `<ThemeProvider>`
- `src/components/layout/Footer.tsx` — `<ConsentLink />` next to existing legal links

## Owner actions before public launch

1. **Publish GTM container with Require Consent on each tag** — see `docs/lgpd-gtm-setup.md`. **Without this step the code-side consent default is bypassed.**
2. **Fill in `[CNPJ — pendente]` and `[Nome do DPO — pendente]`** in `src/app/politica-privacidade/page.tsx`.

## Verification

- `npm run lint`: ✅ no new warnings
- `npm run build`: ✅ clean
- `npx tsc --noEmit`: ✅ no new type errors
- Playwright smoke screenshots: see `docs/ds-audit/screenshots-lgpd/` (8 PNGs across desktop/mobile/reduced-motion)
- Manual checklist for Vercel preview: see `docs/lgpd-smoke-test.md`

## Out of scope (per spec)

- Server-side consent log
- A/B testing copy
- i18n
- Cookie scanner
- Geo-conditional banner
- DSAR workflow

## Spec & Plan

- Spec: `docs/superpowers/specs/2026-05-24-lgpd-cookies-design.md`
- Plan: `docs/superpowers/plans/2026-05-24-lgpd-cookies.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
PRBODY
)"
```

Expected: PR URL printed.

- [ ] **Step 3: Final report to controller**

Print:
- PR URL
- Branch commit count (`git log --oneline main..HEAD | wc -l`)
- Number of files changed (`git diff main..HEAD --stat | tail -1`)

---

## Self-Review

**Spec coverage check (each spec section → task that implements it):**

| Spec section | Implementing task |
|---|---|
| 4.1 File structure (new) | Tasks 1, 2, 4, 5, 7, 8 |
| 4.2 File structure (modified) | Tasks 3, 6, 9 |
| 4.3 Data flow | Tasks 1, 2, 3 (push pipeline) + Task 4 (banner mounted/consent guards) |
| 4.4 Storage schema (versioned) | Task 1 (CONSENT_VERSION + version check in getConsent) |
| 5.1 consent.ts | Task 1 |
| 5.2 useConsent.ts | Task 2 |
| 5.3 CookieBanner.tsx | Task 4 |
| 5.4 ConsentLink.tsx | Task 5 |
| 5.5 Analytics.tsx modified | Task 3 |
| 5.6 layout.tsx modified | Task 6 |
| 5.7 Footer.tsx modified | Task 9 |
| 5.8 /politica-privacidade page | Task 7 |
| 6. GTM container setup doc | Task 8 |
| 7. Animation + a11y | Task 4 (framer variants + useReducedMotion + aria attrs) |
| 8. Verification manual | Task 10 (Playwright smoke + checklist doc) |
| 9. Success criteria | Task 10 checklist covers all 12 items |
| 10. Estimativa | (descriptive — no task needed) |
| 11. Rollback | (procedural — `git revert <merge-sha>` documented in spec, no task) |

All sections covered.

**Placeholder scan:** None. Every step has complete code. Privacy policy text contains explicit `[CNPJ — pendente]` and `[Nome do DPO — pendente]` markers — those are intentional, owner fills them in (documented in spec section 5.8 and PR body). Not implementation placeholders.

**Type consistency:** Type `ConsentState` defined once in Task 1, imported and used in Tasks 2 (useConsent), 4 (CookieBanner via hook), 5 (ConsentLink via hook). Storage key string `'atitude-cookie-consent'` matches between Task 1 (CONSENT_KEY constant) and Task 3 (inline script localStorage.getItem). Schema `version === 1` matches between Task 1 (CONSENT_VERSION) and Task 3 (inline script `parsed.version === 1`).

**One residual ambiguity:** Task 4 Step 3 asks the implementer to confirm `Button` accepts `variant="primary"` / `variant="outline"` and renders a `<button>` when `onClick` is passed without `href`. If this assumption is wrong, the implementer should report BLOCKED — the plan does not auto-correct because the right behavior depends on what `Button` actually exposes. This is intentional: better to surface the mismatch than guess.

**Branch protection:** Task 11 (push + PR) relies on the user's standing authorization for opening polish-type PRs (precedent: PR #2 rollout, PR #3 polish). The controller should still confirm authorization before Task 11 if uncertainty exists.
