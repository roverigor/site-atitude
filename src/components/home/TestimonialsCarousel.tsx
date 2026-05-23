"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
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
    <section className="relative bg-[var(--color-brand-navy)] text-white py-16 md:py-24 overflow-hidden">
      {/* Decorative orb — atmosphere only */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-brand-purple)]/30 blur-3xl" />

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <span className="eyebrow !text-[var(--color-brand-green)]">
            Histórias reais
          </span>
          <h2 className="mt-2 text-[1.75rem] md:text-[2.5rem] font-black text-white leading-[1.05] tracking-tight">
            O que nossos alunos dizem
          </h2>
          <p className="script mt-1 !text-[var(--color-brand-green)] text-2xl md:text-3xl">
            histórias de quem passou por aqui
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Desktop: show 3 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const idx = (current + offset) % testimonials.length;
              const t = testimonials[idx];
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                >
                  <Quote className="h-6 w-6 text-[var(--color-brand-green)] mb-3" aria-hidden="true" />
                  <p className="text-sm leading-relaxed mb-4 text-white/85">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-semibold text-sm text-white">{t.nome}</p>
                      <p className="text-xs text-white/55">
                        {t.curso} · {t.ano_conclusao}
                      </p>
                    </div>
                    <Badge variant="success" size="sm" className="self-start">
                      {t.resultado}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 */}
          <div className="md:hidden">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              <Quote className="h-6 w-6 text-[var(--color-brand-green)] mb-3" aria-hidden="true" />
              <p className="text-sm leading-relaxed mb-4 text-white/85">
                &ldquo;{testimonials[current].texto}&rdquo;
              </p>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="font-semibold text-sm text-white">
                    {testimonials[current].nome}
                  </p>
                  <p className="text-xs text-white/55">
                    {testimonials[current].curso} · {testimonials[current].ano_conclusao}
                  </p>
                </div>
                <Badge variant="success" size="sm" className="self-start">
                  {testimonials[current].resultado}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-center gap-4 mt-6"
            role="group"
            aria-label="Controles do carrossel de depoimentos"
          >
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-green)]"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-brand-navy)] focus:ring-[var(--color-brand-green)] ${
                    i === current ? "bg-[var(--color-brand-green)]" : "bg-white/25"
                  }`}
                  aria-label={`Depoimento ${i + 1} de ${testimonials.length}`}
                  aria-current={i === current ? "true" : undefined}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-green)]"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
