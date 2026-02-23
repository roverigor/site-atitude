"use client";

import { useState, useEffect, useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { buildWhatsAppUrl, type WhatsAppContext } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Derive the WhatsApp context from the current pathname. */
function contextFromPathname(pathname: string): WhatsAppContext {
  if (pathname === "/") return { type: "home" };
  if (pathname === "/ingles") return { type: "english" };
  if (pathname === "/contato") return { type: "contact" };

  const courseMatch = pathname.match(/^\/cursos\/([^/]+)/);
  if (courseMatch) {
    const slug = courseMatch[1];
    const courseName = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { type: "course", courseName };
  }

  return { type: "home" };
}

/** Extract a short course slug (if any) for analytics. */
function courseSlugFromPathname(pathname: string): string | undefined {
  const m = pathname.match(/^\/cursos\/([^/]+)/);
  return m ? m[1] : undefined;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function WhatsAppButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Derive contextual URL
  const context = useMemo(() => contextFromPathname(pathname), [pathname]);
  const href = useMemo(() => buildWhatsAppUrl(context), [context]);

  // Scroll hide/show
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
      clearTimeout(timeout);
      timeout = setTimeout(() => setVisible(true), 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  const handleClick = () => {
    const course = courseSlugFromPathname(pathname);
    trackWhatsAppClick(pathname, course);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-[var(--color-whatsapp)] text-white shadow-[var(--shadow-wa)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-whatsapp)] focus:ring-offset-2 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="Fale conosco pelo WhatsApp"
    >
      {/* Icon */}
      <MessageCircle className="h-7 w-7" />

      {/* Ping animation */}
      <span className="absolute inset-0 rounded-full animate-ping bg-[var(--color-whatsapp)]/30 pointer-events-none" />

      {/* Tooltip — desktop only */}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--color-brand-navy)] px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden md:block shadow-[var(--shadow-md)]"
      >
        Fale conosco pelo WhatsApp
        {/* Arrow */}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[var(--color-brand-navy)]" />
      </span>
    </a>
  );
}
