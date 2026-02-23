"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "bg-[var(--color-background)]/80 backdrop-blur-md shadow-sm"
            : "bg-[var(--color-background)]"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] dark:focus:ring-[var(--color-brand-green)]"
              aria-label="Abrir menu de navegacao"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              {mounted ? (
                <Image
                  src={resolvedTheme === "dark" ? "/logos/atitude-ensino-negativa.png" : "/logos/atitude-ensino-colorida.png"}
                  alt="Atitude Ensino"
                  width={160}
                  height={40}
                  priority
                  className="h-8 w-auto sm:h-10"
                />
              ) : (
                <span className="font-bold text-lg text-[var(--color-brand-navy)] dark:text-white">
                  Atitude Ensino
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegacao principal">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="whatsapp"
                size="sm"
                href={buildWhatsAppUrl({ type: "home" })}
                className="hidden sm:inline-flex"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
