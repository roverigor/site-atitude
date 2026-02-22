"use client";

import { motion } from "framer-motion";
import { ClipboardList, BookOpen, HeartHandshake, GraduationCap, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/Container";

const steps = [
  { icon: ClipboardList, title: "Matricula", desc: "Escolha seu curso e se inscreva" },
  { icon: BookOpen, title: "Curso", desc: "Aprenda na pratica com apoio" },
  { icon: HeartHandshake, title: "Acompanhamento", desc: "Suporte individual ate o fim" },
  { icon: GraduationCap, title: "Formatura", desc: "Certificado na mao" },
  { icon: Briefcase, title: "Estagio", desc: "Encaminhamento para empresas" },
];

export function Timeline() {
  return (
    <section className="py-16 md:py-20 bg-[var(--color-background)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
            Da Matricula ao Emprego
          </h2>
          <p className="mt-3 text-[var(--color-foreground-muted)] max-w-lg mx-auto">
            Acompanhamos voce em toda a jornada
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-start justify-between relative">
          <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-[var(--color-border)]" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center w-1/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-green)] flex items-center justify-center mb-3 relative z-10">
                <step.icon className="h-6 w-6 text-[var(--color-brand-navy)]" />
              </div>
              <h3 className="font-semibold text-sm">{step.title}</h3>
              <p className="text-xs text-[var(--color-foreground-muted)] mt-1 max-w-[140px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-green)] flex items-center justify-center shrink-0">
                  <step.icon className="h-5 w-5 text-[var(--color-brand-navy)]" />
                </div>
                {i < steps.length - 1 && <div className="w-0.5 h-8 bg-[var(--color-border)]" />}
              </div>
              <div className="pb-6">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-[var(--color-foreground-muted)]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
