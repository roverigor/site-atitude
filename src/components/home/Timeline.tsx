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

type Step = {
  icon: typeof ClipboardList;
  title: string;
  desc: string;
  x: number;
  y: number;
};

// Coordinates inside a 1000 × 420 viewBox — a deliberately wavy "treasure
// map" path. y values alternate high/low to break the boring straight line.
const steps: Step[] = [
  {
    icon: ClipboardList,
    title: "Matrícula",
    desc: "Sem burocracia — RG, CPF e endereço. Feita na hora.",
    x: 100,
    y: 320,
  },
  {
    icon: BookOpen,
    title: "Curso",
    desc: "Aulas práticas com apostila inclusa, no seu ritmo.",
    x: 300,
    y: 110,
  },
  {
    icon: HeartHandshake,
    title: "Acompanhamento",
    desc: "Suporte individual do início ao fim — ninguém fica pra trás.",
    x: 500,
    y: 260,
  },
  {
    icon: GraduationCap,
    title: "Formatura",
    desc: "Certificado reconhecido pelo mercado, no peito com orgulho.",
    x: 720,
    y: 100,
  },
  {
    icon: Briefcase,
    title: "Emprego",
    desc: "Encaminhamento real pra vagas em empresas parceiras.",
    x: 920,
    y: 290,
  },
];

// Smooth cubic-bezier path that threads through every stop. Control
// points roughly midway between consecutive stops, biased toward the
// next y so curves feel natural.
const pathD = [
  `M ${steps[0].x} ${steps[0].y}`,
  `C 180 260, 220 80, ${steps[1].x} ${steps[1].y}`,
  `C 380 140, 420 200, ${steps[2].x} ${steps[2].y}`,
  `C 580 320, 660 100, ${steps[3].x} ${steps[3].y}`,
  `C 800 100, 860 240, ${steps[4].x} ${steps[4].y}`,
].join(" ");

const TRAIL_DURATION = 2.8;
const ICON_STAGGER = TRAIL_DURATION / (steps.length - 1);

// re-trigger every time the section scrolls back into view
const viewport = { once: false, margin: "-120px" } as const;

export function Timeline() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--color-cream-100)] overflow-hidden">
      {/* Soft decorative orbs */}
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
            Cinco paradas, um destino. Siga a trilha — a gente está em cada uma delas com você.
          </p>
        </div>

        {/* Desktop: treasure map */}
        <div className="hidden md:block relative" style={{ aspectRatio: "1000 / 420" }}>
          <svg
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {/* Resting dashed track — always visible so the path reads */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--color-navy-100)"
              strokeWidth={6}
              strokeDasharray="12 10"
              strokeLinecap="round"
            />
            {/* Animated lime trail drawing along the same path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--color-brand-green)"
              strokeWidth={6}
              strokeDasharray="12 10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={{ duration: TRAIL_DURATION, ease: "easeInOut" }}
            />
          </svg>

          {steps.map((step, i) => {
            const isTreasure = i === steps.length - 1;
            return (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center text-center w-44 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(step.x / 1000) * 100}%`,
                  top: `${(step.y / 420) * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{
                  duration: 0.5,
                  delay: i * ICON_STAGGER,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5",
                    isTreasure
                      ? "text-[var(--color-brand-orange)]"
                      : "text-[var(--color-foreground-muted)]"
                  )}
                >
                  {isTreasure ? "× chegada" : `etapa ${i + 1}`}
                </span>

                <div
                  className={cn(
                    "relative w-16 h-16 rounded-full flex items-center justify-center ring-8 ring-[var(--color-cream-100)] shadow-md",
                    isTreasure
                      ? "bg-[var(--color-brand-orange)]"
                      : "bg-[var(--color-brand-green)]"
                  )}
                >
                  <step.icon
                    className={cn(
                      "h-7 w-7",
                      isTreasure
                        ? "text-white"
                        : "text-[var(--color-brand-navy)]"
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

                <h3 className="mt-3 font-extrabold text-base text-[var(--color-brand-navy)] leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mt-1 leading-snug max-w-[170px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical zig-zag with the same dashed-trail aesthetic */}
        <div className="md:hidden">
          {steps.map((step, i) => {
            const isTreasure = i === steps.length - 1;
            const alignRight = i % 2 === 1;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-5",
                  alignRight && "flex-row-reverse text-right"
                )}
              >
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
                        isTreasure
                          ? "text-white"
                          : "text-[var(--color-brand-navy)]"
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
                  className="pt-5 pb-2 max-w-[220px]"
                  initial={{ opacity: 0, x: alignRight ? 12 : -12 }}
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
