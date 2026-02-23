"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { Testimonial } from "@/types/course";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <Section variant="alt">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
            O que nossos alunos dizem
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop: show 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const idx = (current + offset) % testimonials.length;
              const t = testimonials[idx];
              return (
                <div key={idx} className="p-6 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)]">
                  <Quote className="h-6 w-6 text-[var(--color-brand-green)] mb-3" aria-hidden="true" />
                  <p className="text-sm leading-relaxed mb-4">&ldquo;{t.texto}&rdquo;</p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{t.nome}</p>
                      <p className="text-xs text-[var(--color-foreground-muted)]">{t.curso} · {t.ano_conclusao}</p>
                    </div>
                    <Badge variant="success" size="sm" className="shrink-0 whitespace-nowrap">{t.resultado}</Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 */}
          <div className="md:hidden">
            <div className="p-6 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)]">
              <Quote className="h-6 w-6 text-[var(--color-brand-green)] mb-3" aria-hidden="true" />
              <p className="text-sm leading-relaxed mb-4">&ldquo;{testimonials[current].texto}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm">{testimonials[current].nome}</p>
                <p className="text-xs text-[var(--color-foreground-muted)]">{testimonials[current].curso} · {testimonials[current].ano_conclusao}</p>
              </div>
              <Badge variant="success" size="sm" className="mt-3">{testimonials[current].resultado}</Badge>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6" role="group" aria-label="Controles do carrossel de depoimentos">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] dark:focus:ring-[var(--color-brand-green)]" aria-label="Depoimento anterior">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-navy)] dark:focus:ring-[var(--color-brand-green)] ${i === current ? "bg-[var(--color-brand-navy)] dark:bg-[var(--color-brand-green)]" : "bg-[var(--color-border)]"}`} aria-label={`Depoimento ${i + 1} de ${testimonials.length}`} aria-current={i === current ? "true" : undefined} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] dark:focus:ring-[var(--color-brand-green)]" aria-label="Proximo depoimento">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
