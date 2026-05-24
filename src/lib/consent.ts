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
