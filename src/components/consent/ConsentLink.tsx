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
