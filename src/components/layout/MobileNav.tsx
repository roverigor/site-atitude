"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

// DS motion tokens: --ease-pop cubic-bezier(0.2,0.8,0.2,1), --duration-slow 400ms, --duration-base 250ms
const EASE_POP = [0.2, 0.8, 0.2, 1] as [number, number, number, number];

const DRAWER_VARIANTS = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: EASE_POP },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.25, ease: EASE_POP },
  },
};

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.querySelector("button")?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest("[aria-hidden]"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
            variants={OVERLAY_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-y-0 left-0 w-[80vw] max-w-sm bg-[var(--color-background)] shadow-[var(--shadow-xl)]"
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--color-border)]">
              <span className="font-bold text-lg text-[var(--color-brand-navy)] dark:text-white">Menu</span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-4 py-6 space-y-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-lg font-medium rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="px-4 pt-4 border-t border-[var(--color-border)]">
              <Button variant="whatsapp" size="lg" href={buildWhatsAppUrl({ type: "home" })} className="w-full">
                Fale pelo WhatsApp
              </Button>
            </div>

            <div className="px-4 pt-6 text-sm text-[var(--color-foreground-muted)]">
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.city} - {siteConfig.address.state}</p>
              <p className="mt-2">{siteConfig.hours.weekdays}</p>
              <p>{siteConfig.hours.saturday}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
