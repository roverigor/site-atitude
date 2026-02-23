"use client";

import { useState } from "react";
import { Link2, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleWhatsAppShare() {
    const url = `${window.location.origin}/blog/${slug}`;
    const text = encodeURIComponent(`${title} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  return (
    <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
      <p className="text-sm font-medium text-[var(--color-foreground)] mb-3">
        Compartilhar
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)] dark:hover:border-[var(--color-brand-green)] dark:hover:text-[var(--color-brand-green)] transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              Link copiado!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copiar link
            </>
          )}
        </button>
        <button
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-whatsapp)] px-4 py-2 text-sm text-white font-medium hover:brightness-110 transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </button>
      </div>
    </div>
  );
}
