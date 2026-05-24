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
