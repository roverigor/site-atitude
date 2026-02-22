"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Monitor, Globe, Briefcase, Heart, Palette, Cpu, Trophy, MonitorPlay } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const categories = [
  { name: "Informatica", icon: Monitor, color: "#1B1464", slug: "informatica", desc: "Windows, Office, Internet" },
  { name: "Ingles", icon: Globe, color: "#FF1493", slug: "ingles", desc: "Do basico ao avancado", href: "/ingles" },
  { name: "Administracao", icon: Briefcase, color: "#16A34A", slug: "administracao", desc: "Gestao e financeiro" },
  { name: "Saude", icon: Heart, color: "#FF6600", slug: "saude", desc: "Farmacia, veterinario" },
  { name: "Beleza", icon: Palette, color: "#6600FF", slug: "beleza", desc: "Maquiagem, cabelo" },
  { name: "Tecnologia", icon: Cpu, color: "#7C3AED", slug: "tecnologia", desc: "IA, robotica, programacao" },
  { name: "Carreiras PRO", icon: Trophy, color: "#1E40AF", slug: "carreiras-pro", desc: "Dev, games, design" },
  { name: "Interativos", icon: MonitorPlay, color: "#059669", slug: "interativos", desc: "Cursos por computador" },
];

export function CoursesGrid() {
  return (
    <Section variant="alt">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
            Nossos Cursos
          </h2>
          <p className="mt-3 text-[var(--color-foreground-muted)] max-w-lg mx-auto">
            Mais de 40 cursos para transformar seu futuro. Escolha sua area e comece hoje.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={cat.href || `/cursos?categoria=${cat.slug}`}
                className="group block p-6 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] hover:shadow-md hover:scale-[1.02] transition-all duration-200"
                style={{ borderLeftWidth: "3px", borderLeftColor: cat.color }}
              >
                <cat.icon className="h-8 w-8 mb-3" style={{ color: cat.color }} />
                <h3 className="font-semibold text-sm md:text-base">{cat.name}</h3>
                <p className="text-xs text-[var(--color-foreground-muted)] mt-1">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
