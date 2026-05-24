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
