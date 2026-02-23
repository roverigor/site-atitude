"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Globe,
  Landmark,
  Heart,
  Palette,
  Cpu,
  Briefcase,
  MonitorPlay,
  Pen,
  Table,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types/course";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Globe,
  Landmark,
  Heart,
  Palette,
  Cpu,
  Briefcase,
  MonitorPlay,
  Pen,
  Table,
  Users,
};

const categoryHrefs: Partial<Record<CategorySlug, string>> = {
  ingles: "/ingles",
};

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
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icone] || Monitor;
            const href = categoryHrefs[cat.slug] || `/cursos?categoria=${cat.slug}`;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={href}
                  className="group block p-6 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] hover:shadow-md hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] dark:focus:ring-[var(--color-brand-green)]"
                  style={{ borderLeftWidth: "3px", borderLeftColor: cat.corHex }}
                  aria-label={`Ver cursos de ${cat.nome}`}
                >
                  <Icon className="h-8 w-8 mb-3" style={{ color: cat.corHex }} aria-hidden="true" />
                  <h3 className="font-semibold text-sm md:text-base">{cat.nome}</h3>
                  <p className="text-xs text-[var(--color-foreground-muted)] mt-1 line-clamp-2">{cat.descricao}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
