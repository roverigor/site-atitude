"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/faq";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-[var(--color-background)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[var(--color-border)]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left font-medium hover:text-[var(--color-brand-navy)] dark:hover:text-[var(--color-brand-green)] transition-colors"
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform duration-300", open === i && "rotate-180")} />
              </button>
              <div className={cn("overflow-hidden transition-all duration-300", open === i ? "max-h-96 pb-4" : "max-h-0")}>
                <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
