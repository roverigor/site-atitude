"use client";

import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/faq";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-[var(--color-cream-100)]">
      <Container>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Left intro */}
          <div>
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 className="mt-2 text-[2.25rem] md:text-[3rem] font-black leading-[1.05] tracking-tight text-[var(--color-brand-navy)]">
              A gente <span className="script">te conta</span> tudo antes.
            </h2>
            <p className="mt-5 text-lg text-[var(--color-foreground-muted)] leading-relaxed max-w-md">
              Sem letras miúdas, sem surpresa no boleto.
            </p>
            <a
              href={buildWhatsAppUrl({ type: "home" })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[var(--color-brand-purple)] font-bold text-base hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)] focus:ring-offset-2 rounded"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
          </div>

          {/* Right list */}
          <div className="border-t border-[var(--color-navy-100)]">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className="border-b border-[var(--color-navy-100)]"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left font-bold text-lg text-[var(--color-brand-navy)] hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-purple)] focus-visible:ring-offset-2 rounded"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={cn(
                        "shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                        isOpen
                          ? "bg-[var(--color-brand-purple)] rotate-45"
                          : "bg-[var(--color-brand-navy)]"
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    className={cn(
                      "grid transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-5"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed max-w-[92%]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
