"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <a
      href={buildWhatsAppUrl({ type: "home" })}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-[var(--color-whatsapp)] text-white shadow-[var(--shadow-wa)] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-whatsapp)] focus:ring-offset-2 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[var(--color-whatsapp)]/30 pointer-events-none" />
    </a>
  );
}
