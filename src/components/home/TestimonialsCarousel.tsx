"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";

const testimonials = [
  {
    name: "Maria Silva",
    course: "Operador de Computador",
    text: "Gracas a Atitude Ensino consegui meu primeiro emprego. Os professores sao incriveis e a apostila e muito completa!",
    result: "Conseguiu emprego",
    year: "2024",
  },
  {
    name: "Pedro Santos",
    course: "WPrime (Ingles)",
    text: "O curso de ingles online por Meet e muito pratico. Consigo estudar sem sair de casa e o professor e muito atencioso.",
    result: "Aprendeu ingles",
    year: "2024",
  },
  {
    name: "Ana Costa",
    course: "Designer Grafico",
    text: "Sempre quis trabalhar com design e a Atitude me deu essa oportunidade. Hoje faco trabalhos freelancer!",
    result: "Trabalha como freelancer",
    year: "2023",
  },
  {
    name: "Carlos Oliveira",
    course: "Assistente Administrativo",
    text: "O conhecimento que adquiri me ajudou a ser promovido na empresa onde trabalho. Recomendo demais!",
    result: "Foi promovido",
    year: "2024",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

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
                  <Quote className="h-6 w-6 text-[var(--color-brand-green)] mb-3" />
                  <p className="text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-[var(--color-foreground-muted)]">{t.course} · {t.year}</p>
                    </div>
                    <Badge variant="success" size="sm">{t.result}</Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: show 1 */}
          <div className="md:hidden">
            <div className="p-6 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)]">
              <Quote className="h-6 w-6 text-[var(--color-brand-green)] mb-3" />
              <p className="text-sm leading-relaxed mb-4">&ldquo;{testimonials[current].text}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm">{testimonials[current].name}</p>
                <p className="text-xs text-[var(--color-foreground-muted)]">{testimonials[current].course} · {testimonials[current].year}</p>
              </div>
              <Badge variant="success" size="sm" className="mt-3">{testimonials[current].result}</Badge>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Anterior">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-[var(--color-brand-navy)] dark:bg-[var(--color-brand-green)]" : "bg-[var(--color-border)]"}`} aria-label={`Depoimento ${i + 1}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Proximo">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
