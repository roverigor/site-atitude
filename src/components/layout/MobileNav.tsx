"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Menu de navegacao"
        className="fixed inset-y-0 left-0 w-[80vw] max-w-sm bg-[var(--color-background)] shadow-xl animate-in slide-in-from-left duration-300"
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

        <div className="px-8 pt-6 text-sm text-[var(--color-foreground-muted)]">
          <p>{siteConfig.address.street}</p>
          <p>{siteConfig.address.city} - {siteConfig.address.state}</p>
          <p className="mt-2">{siteConfig.hours.weekdays}</p>
          <p>{siteConfig.hours.saturday}</p>
        </div>
      </div>
    </div>
  );
}
