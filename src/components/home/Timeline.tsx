"use client";

import { motion } from "framer-motion";
import { ClipboardList, BookOpen, HeartHandshake, GraduationCap, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/Container";

const steps = [
  { icon: ClipboardList, title: "Matrícula", desc: "Sem burocracia — RG, CPF e endereço. Feita na hora, no mesmo dia." },
  { icon: BookOpen, title: "Curso", desc: "Aulas práticas com apostila inclusa e professores que acompanham seu ritmo." },
  { icon: HeartHandshake, title: "Acompanhamento", desc: "Suporte individual do início ao fim — ninguém fica pra trás." },
  { icon: GraduationCap, title: "Formatura", desc: "Certificado reconhecido pelo mercado, que você leva com orgulho." },
  { icon: Briefcase, title: "Emprego", desc: "Encaminhamento real para vagas e estágios em empresas parceiras da região." },
];

// Total drawing duration (desktop horizontal trail)
const TRAIL_DURATION = 2.2;
// Per-icon stagger: lands when the trail head passes through each node
const ICON_STAGGER = TRAIL_DURATION / (steps.length - 1);

export function Timeline() {
  return (
    <section className="py-16 md:py-20 bg-[var(--color-cream-100)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
            Da matrícula ao emprego
          </h2>
          <p className="mt-3 text-[var(--color-foreground-muted)] max-w-lg mx-auto">
            Você não estuda sozinho — acompanhamos cada etapa até sua contratação
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Resting track */}
          <div className="absolute top-6 left-[10%] right-[10%] h-[3px] rounded-full bg-[var(--color-border)]" />

          {/* Animated trail that draws across left → right */}
          <motion.div
            className="absolute top-6 left-[10%] right-[10%] h-[3px] rounded-full bg-[var(--color-brand-green)] origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: TRAIL_DURATION, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center w-1/5"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.4,
                delay: i * ICON_STAGGER,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-green)] flex items-center justify-center mb-3 relative z-10 ring-4 ring-[var(--color-cream-100)]">
                <step.icon className="h-6 w-6 text-[var(--color-brand-navy)]" />
              </div>
              <h3 className="font-semibold text-sm">{step.title}</h3>
              <p className="text-xs text-[var(--color-foreground-muted)] mt-1 max-w-[140px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 rounded-full bg-[var(--color-brand-green)] flex items-center justify-center shrink-0 ring-4 ring-[var(--color-cream-100)]"
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.5,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <step.icon className="h-5 w-5 text-[var(--color-brand-navy)]" />
                </motion.div>

                {i < steps.length - 1 && (
                  <div className="relative w-[3px] h-12 my-1">
                    {/* Resting track */}
                    <div className="absolute inset-0 rounded-full bg-[var(--color-border)]" />
                    {/* Animated trail filling top → bottom */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[var(--color-brand-green)] origin-top"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.5 + 0.3,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <motion.div
                className="pb-6"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.5,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-[var(--color-foreground-muted)]">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
