"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  BookOpen,
  HeartHandshake,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: ClipboardList,
    title: "Matrícula",
    desc: "Sem burocracia — RG, CPF e endereço. Feita na hora.",
  },
  {
    icon: BookOpen,
    title: "Curso",
    desc: "Aulas práticas com apostila inclusa, no seu ritmo.",
  },
  {
    icon: HeartHandshake,
    title: "Acompanhamento",
    desc: "Suporte do início ao fim — ninguém fica pra trás.",
  },
  {
    icon: GraduationCap,
    title: "Formatura",
    desc: "Certificado reconhecido pelo mercado, com orgulho.",
  },
  {
    icon: Briefcase,
    title: "Emprego",
    desc: "Encaminhamento real pra vagas em empresas parceiras.",
  },
];

const TRAIL_DURATION = 2.4;
const ICON_STAGGER = TRAIL_DURATION / (steps.length - 1);

// re-trigger every time the section scrolls back into view
const viewport = { once: false, margin: "-120px" } as const;

export function Timeline() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--color-cream-100)] overflow-hidden">
      {/* Soft decorative orbs — atmosphere only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-brand-green)]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-brand-orange)]/10 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="eyebrow">O caminho do aluno Atitude</span>
          <h2 className="mt-2 text-[2.25rem] md:text-[3.25rem] font-black leading-[1.05] tracking-[-0.025em] text-[var(--color-brand-navy)]">
            Da matrícula ao emprego
          </h2>
          <p className="script mt-1 text-[1.75rem] md:text-[2.25rem] leading-tight">
            a gente caminha junto.
          </p>
          <p className="lead mt-5 max-w-lg mx-auto">
            Cinco etapas, um destino. A gente está em cada uma delas com você.
          </p>
        </div>

        {/* Desktop: horizontal linear */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Resting dashed track */}
          <div
            className="absolute top-9 left-[10%] right-[10%] h-1.5 rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--color-navy-100) 0 10px, transparent 10px 18px)",
            }}
          />

          {/* Animated lime trail growing left → right */}
          <motion.div
            className="absolute top-9 left-[10%] right-[10%] h-1.5 rounded-full origin-left"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--color-brand-green) 0 10px, transparent 10px 18px)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: TRAIL_DURATION, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const isTreasure = i === steps.length - 1;
            return (
              <motion.div
                key={i}
                className="relative flex flex-col items-center text-center w-1/5 px-2"
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{
                  duration: 0.45,
                  delay: i * ICON_STAGGER,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold tracking-[0.15em] uppercase mb-2",
                    isTreasure
                      ? "text-[var(--color-brand-orange)]"
                      : "text-[var(--color-foreground-muted)]"
                  )}
                >
                  {isTreasure ? "× chegada" : `etapa ${i + 1}`}
                </span>

                <div
                  className={cn(
                    "relative w-[72px] h-[72px] rounded-full flex items-center justify-center ring-8 ring-[var(--color-cream-100)] shadow-md",
                    isTreasure
                      ? "bg-[var(--color-brand-orange)]"
                      : "bg-[var(--color-brand-green)]"
                  )}
                >
                  <step.icon
                    className={cn(
                      "h-8 w-8",
                      isTreasure ? "text-white" : "text-[var(--color-brand-navy)]"
                    )}
                    strokeWidth={2.2}
                  />
                  {isTreasure && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border-2 border-[var(--color-brand-orange)]"
                      animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}
                </div>

                <h3 className="mt-4 font-extrabold text-lg text-[var(--color-brand-navy)] leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-foreground-muted)] mt-1.5 leading-snug max-w-[180px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden">
          {steps.map((step, i) => {
            const isTreasure = i === steps.length - 1;
            return (
              <div key={i} className="flex items-start gap-5">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5",
                      isTreasure
                        ? "text-[var(--color-brand-orange)]"
                        : "text-[var(--color-foreground-muted)]"
                    )}
                  >
                    {isTreasure ? "×" : i + 1}
                  </span>

                  <motion.div
                    className={cn(
                      "relative w-14 h-14 rounded-full flex items-center justify-center shrink-0 ring-4 ring-[var(--color-cream-100)] shadow-md",
                      isTreasure
                        ? "bg-[var(--color-brand-orange)]"
                        : "bg-[var(--color-brand-green)]"
                    )}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.45,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                  >
                    <step.icon
                      className={cn(
                        "h-6 w-6",
                        isTreasure ? "text-white" : "text-[var(--color-brand-navy)]"
                      )}
                      strokeWidth={2.2}
                    />
                    {isTreasure && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border-2 border-[var(--color-brand-orange)]"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {i < steps.length - 1 && (
                    <div className="relative w-1.5 h-14 my-2">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, var(--color-navy-100) 0 6px, transparent 6px 12px)",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full origin-top"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, var(--color-brand-green) 0 6px, transparent 6px 12px)",
                        }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={viewport}
                        transition={{
                          duration: 0.55,
                          delay: i * 0.45 + 0.3,
                          ease: "easeInOut",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <motion.div
                  className="pt-5 pb-2"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.45,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <h3 className="font-extrabold text-lg text-[var(--color-brand-navy)] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-foreground-muted)] leading-snug mt-1">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
