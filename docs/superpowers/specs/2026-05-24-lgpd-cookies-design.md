# LGPD Cookie Consent Banner — Spec

**Date:** 2026-05-24
**Author:** Igor Rover (via aiox-master/Orion)
**Status:** Draft — autonomous flow per user instruction
**Branch:** `feat/lgpd-cookies` (a ser criada from `main`)

---

## 1. Contexto

`atitudeensino.com.br` (Next.js 15.5 + React 19 + Tailwind 4 + framer-motion + GTM single-script) atualmente carrega Google Tag Manager **sem nenhum mecanismo de consentimento**. GTM dispara Meta Pixel, GA4 e Google Ads imediatamente no first paint — viola LGPD art. 7º (consentimento livre, informado, inequívoco antes de tratar dados pessoais não-essenciais).

## 2. Objetivo

Implementar Google Consent Mode v2 + banner LGPD bottom-sticky com 2 botões (Aceitar tudo / Recusar opcionais), persistência por localStorage, link de revogação no Footer, e página de Política de Privacidade dedicada. Compliance ANPD + GDPR-ready.

## 3. Não-objetivos (Out of scope)

- Server-side consent log
- A/B testing copy do banner
- i18n (só PT-BR)
- Cookies de terceiros próprios (gerenciados via GTM container)
- Cookie scanner automático
- Banner geo-condicional (assume LGPD pra todos)
- DSAR workflow automatizado
- Política de privacidade super-customizada (template padrão com placeholders)

## 4. Arquitetura

### 4.1 Estrutura de arquivos (novos)

```
src/lib/
  consent.ts                          # estado, storage, dataLayer push (pure lib)
  useConsent.ts                       # React hook ("use client")
src/components/consent/
  CookieBanner.tsx                    # banner sticky bottom (client component)
  ConsentLink.tsx                     # link "Preferências de cookies" pro Footer
src/app/politica-privacidade/
  page.tsx                            # nova rota
docs/
  lgpd-gtm-setup.md                   # guia de config one-time no GTM container
```

### 4.2 Arquivos modificados

```
src/components/shared/Analytics.tsx   # push default-denied ANTES do GTM script
src/app/layout.tsx                    # <CookieBanner /> dentro do ThemeProvider
src/components/layout/Footer.tsx      # <ConsentLink />
```

### 4.3 Data flow

```
1ª visita:
  layout.tsx mount
   ↓
  Analytics push: gtag('consent', 'default', { analytics: 'denied', ad: 'denied', ...})
   ↓
  GTM script carrega (afterInteractive). Tags com "Require consent" no container
  bloqueadas pelo consent state denied.
   ↓
  CookieBanner aparece (consent ausente em localStorage)
   ↓
  User clica "Aceitar tudo" / "Recusar"
   ↓
  consent.ts grava em localStorage + push 'consent update' no dataLayer
   ↓
  GTM detecta update → tags com Require Consent disparam (ou continuam bloqueadas)
   ↓
  Banner anima fora

Visitas seguintes:
  Analytics.tsx inline script lê localStorage + faz gtag('consent', 'update')
  IMEDIATAMENTE (antes do GTM script), restaurando decisão.
  Banner NÃO aparece.
  Footer link "Preferências de cookies" permite revogar.
```

### 4.4 Storage schema

```ts
// localStorage key: 'atitude-cookie-consent'
{
  version: 1,                       // bump quando categorias mudarem
  state: {
    analytics: 'granted' | 'denied',
    ad: 'granted' | 'denied',
    timestamp: '2026-05-24T18:30:00.000Z'
  }
}
```

Schema version bump força re-prompt (categorias adicionadas/removidas).

## 5. Componentes

### 5.1 `src/lib/consent.ts`

```ts
type ConsentChoice = 'granted' | 'denied'

export type ConsentState = {
  analytics: ConsentChoice
  ad: ConsentChoice
  timestamp: string
}

export const CONSENT_KEY = 'atitude-cookie-consent'
const CONSENT_VERSION = 1

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed.state
  } catch { return null }
}

export function setConsent(input: Omit<ConsentState, 'timestamp'>): void {
  const full: ConsentState = { ...input, timestamp: new Date().toISOString() }
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ version: CONSENT_VERSION, state: full })
  )
  pushConsentUpdate(full)
}

export function clearConsent(): void {
  localStorage.removeItem(CONSENT_KEY)
  // re-deny while user re-decides
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
}

function pushConsentUpdate(state: ConsentState): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('consent', 'update', {
    analytics_storage: state.analytics,
    ad_storage: state.ad,
    ad_user_data: state.ad,
    ad_personalization: state.ad,
  })
}
```

### 5.2 `src/lib/useConsent.ts`

```ts
"use client"
import { useEffect, useState } from 'react'
import { getConsent, setConsent, clearConsent, type ConsentState } from './consent'

export function useConsent() {
  const [state, setState] = useState<ConsentState | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setState(getConsent())
    setMounted(true)
  }, [])

  return {
    consent: state,
    mounted,
    accept: () => {
      setConsent({ analytics: 'granted', ad: 'granted' })
      setState(getConsent())
    },
    reject: () => {
      setConsent({ analytics: 'denied', ad: 'denied' })
      setState(getConsent())
    },
    revoke: () => {
      clearConsent()
      setState(null)
    },
  }
}
```

### 5.3 `src/components/consent/CookieBanner.tsx`

```tsx
"use client"
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { useConsent } from '@/lib/useConsent'

export function CookieBanner() {
  const { consent, mounted, accept, reject } = useConsent()
  const reducedMotion = useReducedMotion()

  // SSR + first hydrate: nothing
  if (!mounted) return null
  // Already decided: nothing
  if (consent !== null) return null

  const variants = reducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
        exit:    { y: 100, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
      }

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
        aria-modal="false"
        className="fixed bottom-0 left-0 right-0 z-[var(--z-modal)] bg-[var(--color-background-alt)] border-t border-[var(--color-border)] shadow-[var(--shadow-xl)]"
        {...variants}
      >
        <Container className="py-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-[var(--color-brand-orange)] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p id="cookie-banner-title" className="sr-only">Aviso de cookies</p>
              <p id="cookie-banner-desc" className="body text-[var(--color-foreground)]">
                Usamos cookies para melhorar sua experiência, lembrar suas preferências e medir o desempenho do site. Você pode aceitar todos ou recusar os opcionais. Veja nossa{' '}
                <Link href="/politica-privacidade" className="underline text-[var(--color-brand-purple)] hover:text-[var(--color-brand-navy)]">
                  Política de privacidade
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
            <Button variant="outline" onClick={reject} aria-label="Recusar cookies opcionais">
              Recusar opcionais
            </Button>
            <Button variant="primary" onClick={accept} aria-label="Aceitar todos os cookies">
              Aceitar tudo
            </Button>
          </div>
        </Container>
      </motion.div>
    </AnimatePresence>
  )
}
```

### 5.4 `src/components/consent/ConsentLink.tsx`

```tsx
"use client"
import { useConsent } from '@/lib/useConsent'

export function ConsentLink({ className }: { className?: string }) {
  const { revoke } = useConsent()
  return (
    <button
      type="button"
      onClick={revoke}
      className={className ?? "underline hover:text-[var(--color-brand-green)] text-sm"}
    >
      Preferências de cookies
    </button>
  )
}
```

### 5.5 `src/components/shared/Analytics.tsx` (modificado)

Antes do GTM script, injetar script `beforeInteractive` que:
1. Define `gtag` function
2. Push `consent default` denied
3. Lê localStorage e push `consent update` se já existir

```tsx
"use client"
import Script from "next/script"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ""
const IS_PRODUCTION = process.env.NODE_ENV === "production"

export function Analytics() {
  if (!IS_PRODUCTION || !GTM_ID) return null

  return (
    <>
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
              const raw = localStorage.getItem('atitude-cookie-consent');
              if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.version === 1 && parsed.state) {
                  gtag('consent', 'update', {
                    'analytics_storage': parsed.state.analytics,
                    'ad_storage': parsed.state.ad,
                    'ad_user_data': parsed.state.ad,
                    'ad_personalization': parsed.state.ad
                  });
                }
              }
            } catch (e) { /* localStorage blocked */ }
          `,
        }}
      />

      {/* GTM script — afterInteractive como hoje */}
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

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
```

### 5.6 `src/app/layout.tsx` (modificado)

Adicionar `<CookieBanner />` dentro do `<ThemeProvider>`, após `<ConditionalWrapper>`:

```tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <a href="#main-content" className="skip-to-content">Pular para o conteúdo</a>
  <ConditionalWrapper>{children}</ConditionalWrapper>
  <Analytics />
  <CookieBanner />
</ThemeProvider>
```

### 5.7 `src/components/layout/Footer.tsx` (modificado)

Adicionar `<ConsentLink />` na seção de links legais/secundários:

```tsx
import { ConsentLink } from '@/components/consent/ConsentLink'
// ... dentro do Footer JSX, próximo aos outros links:
<ConsentLink className="underline hover:text-[var(--color-brand-green)] text-sm text-white/80" />
```

(Estilo herda contexto do Footer dark navy; usar `text-white/80` pra contraste no bg navy.)

### 5.8 `src/app/politica-privacidade/page.tsx`

Server component static. Conteúdo:

```tsx
import type { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { ConsentLink } from '@/components/consent/ConsentLink'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Atitude Ensino trata seus dados pessoais — conformidade LGPD.',
  robots: { index: true, follow: true },
}

export default function PoliticaPrivacidadePage() {
  const lastUpdated = '2026-05-24'
  return (
    <Section variant="default">
      <Container className="max-w-3xl py-12 md:py-20">
        <h1 className="h1 text-[var(--color-brand-navy)] dark:text-white mb-2">Política de Privacidade</h1>
        <p className="text-[var(--color-foreground-muted)] mb-8">Última atualização: {lastUpdated}</p>

        <h2 className="h2 mt-12 mb-4">1. Quem somos</h2>
        <p className="body mb-4">
          A <strong>Atitude Ensino</strong> é uma instituição de ensino com sede em Ibaiti-PR,
          inscrita no CNPJ <span aria-label="CNPJ pendente">[CNPJ — pendente]</span>.
          Endereço: Rua XV de Novembro, 123 — Ibaiti/PR — CEP 84900-000.
          Contato: contato@atitudeensino.com.br.
        </p>

        <h2 className="h2 mt-12 mb-4">2. Quais dados coletamos</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li><strong>Dados fornecidos por você:</strong> nome, WhatsApp, curso de interesse — coletados via formulários do site.</li>
          <li><strong>Dados de navegação:</strong> páginas visitadas, dispositivo, origem do tráfego — coletados via Google Tag Manager (apenas com seu consentimento).</li>
          <li><strong>Cookies essenciais:</strong> preferência de tema (claro/escuro), preferência de consentimento — não exigem consentimento (LGPD art. 7º, IX).</li>
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
          <li><strong>Consentimento (I):</strong> cookies de analytics, ads e marketing.</li>
          <li><strong>Execução de contrato (V):</strong> tratamento de dados de matrícula.</li>
          <li><strong>Legítimo interesse (IX):</strong> cookies essenciais ao funcionamento do site.</li>
        </ul>

        <h2 className="h2 mt-12 mb-4">5. Cookies utilizados</h2>
        <p className="body mb-4">
          <strong>Essenciais</strong> (sempre ativos): preferência de tema, preferência de consentimento.
        </p>
        <p className="body mb-4">
          <strong>Analytics</strong> (com consentimento): Google Analytics 4 — mede páginas vistas, eventos, origem do tráfego.
        </p>
        <p className="body mb-4">
          <strong>Marketing</strong> (com consentimento): Meta Pixel (Facebook/Instagram), Google Ads — permitem remarketing e mensuração de conversões.
        </p>

        <h2 className="h2 mt-12 mb-4">6. Compartilhamento</h2>
        <p className="body mb-4">
          Dados anonimizados de navegação são compartilhados com Google (Analytics, Ads, Tag Manager) e Meta (Pixel) apenas quando você consente. Dados fornecidos em formulários (nome, WhatsApp) são enviados ao WhatsApp do nosso time comercial e não são vendidos a terceiros.
        </p>

        <h2 className="h2 mt-12 mb-4">7. Transferência internacional</h2>
        <p className="body mb-4">
          Google e Meta processam dados em servidores fora do Brasil (EUA, União Europeia). Essas transferências seguem mecanismos legais previstos na LGPD (art. 33) e nos Termos de Uso desses provedores.
        </p>

        <h2 className="h2 mt-12 mb-4">8. Seus direitos (LGPD art. 18)</h2>
        <p className="body mb-4">
          Você tem direito a: confirmar tratamento, acessar seus dados, corrigir dados incompletos, anonimizar/bloquear/eliminar dados desnecessários, portar dados, eliminar dados tratados com consentimento, ser informado sobre compartilhamentos, ser informado sobre não-consentimento, e revogar consentimento.
        </p>

        <h2 className="h2 mt-12 mb-4">9. Como exercer seus direitos</h2>
        <p className="body mb-4">
          Envie email para <a className="underline text-[var(--color-brand-purple)]" href="mailto:contato@atitudeensino.com.br">contato@atitudeensino.com.br</a> ou use o link de <ConsentLink className="underline text-[var(--color-brand-purple)]" /> abaixo pra revogar o consentimento de cookies.
        </p>

        <h2 className="h2 mt-12 mb-4">10. Retenção</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li><strong>Leads (nome, WhatsApp):</strong> 24 meses, ou até pedido de exclusão.</li>
          <li><strong>Cookies essenciais:</strong> 1 ano (preferências), 6 meses (consentimento).</li>
          <li><strong>Cookies analytics/marketing:</strong> conforme política do Google/Meta (geralmente 14 a 26 meses).</li>
        </ul>

        <h2 className="h2 mt-12 mb-4">11. Encarregado pelo tratamento (DPO)</h2>
        <p className="body mb-4">
          Encarregado: <span>[Nome do DPO — pendente]</span>. Email: <a className="underline text-[var(--color-brand-purple)]" href="mailto:contato@atitudeensino.com.br">contato@atitudeensino.com.br</a>.
        </p>

        <h2 className="h2 mt-12 mb-4">12. Atualizações desta política</h2>
        <p className="body mb-4">
          Esta política pode ser atualizada. Mudanças relevantes serão informadas via banner ou comunicação direta.
        </p>
      </Container>
    </Section>
  )
}
```

Placeholders explícitos: `[CNPJ — pendente]`, `[Nome do DPO — pendente]`. Owner preenche depois (sem bloquear MVP).

## 6. GTM Container Setup (one-time, fora do código)

Documentar em `docs/lgpd-gtm-setup.md`:

1. Abrir GTM web UI no container do projeto
2. Pra cada tag (GA4 Config, GA4 Events, Meta Pixel Base, Meta Pixel Events, Google Ads Conversion, Google Ads Remarketing): **Advanced Settings → Consent Settings → "Require additional consent for tag to fire"**
3. Marcar:
   - **GA4 Config/Events:** `analytics_storage`
   - **Meta Pixel:** `ad_storage`
   - **Google Ads:** `ad_storage` + `ad_user_data` + `ad_personalization`
4. Salvar + **publicar container**
5. Verificar via GTM Preview Mode: tags com Require Consent só disparam após consent update

## 7. Animação + A11y

**Animação:** `framer-motion` `AnimatePresence` + `motion.div` slide-up (entrada) / slide-down (saída). `--duration-base` (250ms entrada), `--duration-fast` (150ms saída). `--ease-pop` (cubic-bezier(0.2, 0.8, 0.2, 1)) — ou via `useReducedMotion()` que retorna identidades sem motion.

**A11y:**
- `role="dialog"`, `aria-labelledby`, `aria-describedby`, `aria-modal="false"`
- Botões com `aria-label` explícito
- Tab navigation natural (não força focus trap — banner não-modal)
- Contrast WCAG AA: `--color-background-alt` (cream #FAEFE0) + `--color-foreground` (navy #252566) = ratio 13.7:1 ✓
- `prefers-reduced-motion` honored

## 8. Verificação manual (post-merge)

1. **Visitante novo (DevTools):**
   - Local Storage vazio
   - Network: requests Google só aparecem APÓS aceitar (não disparam antes)
   - Banner aparece em ≤1s após hydrate
2. **Click "Aceitar tudo":**
   - Banner anima fora
   - Pixel + GA4 + Ads disparam (Network)
   - localStorage gravado
3. **Click "Recusar opcionais":**
   - Banner anima fora
   - Pixel + GA4 + Ads NÃO disparam
   - localStorage gravado com `denied`
4. **Reload:**
   - Banner NÃO reaparece
   - Consent persiste (verificar gtag state)
5. **Footer link "Preferências de cookies":**
   - Banner reaparece
   - User pode mudar decisão
6. **/politica-privacidade:**
   - Renderiza, indexável (robots:index)
   - Links de volta funcionam
7. **Mobile 375px:**
   - Banner stack vertical, botões full-width
8. **A11y:**
   - Tab cycling chega nos botões
   - Screen reader anuncia "Aviso de cookies"
9. **`prefers-reduced-motion: reduce`:**
   - Banner aparece sem slide-in

## 9. Success Criteria (PR mergeável quando)

1. Todos os 9 verifications manuais passam
2. `npm run lint` sem novos warnings
3. `npm run build` clean
4. CodeRabbit medium+ findings endereçados
5. Vercel preview testado end-to-end
6. `docs/lgpd-gtm-setup.md` escrito e commitado
7. Política de privacidade reachable em `/politica-privacidade` com `robots:index`
8. Footer tem link funcional pra revogar consent
9. Banner ausente em dev (`NODE_ENV !== 'production'`) — mesma regra do Analytics atual

## 10. Estimativa

- 6 arquivos novos
- 3 arquivos modificados
- ~10-15 commits
- 1 PR final

## 11. Rollback

Se algo quebrar pós-merge: `git revert <merge-sha>` no main. Vercel auto-redeploya estado anterior. Banner + consent são feature flag-free, fácil de remover.
