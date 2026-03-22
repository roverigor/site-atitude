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
  ArrowRight,
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

const courseCount: Partial<Record<CategorySlug, number>> = {
  ingles: 5,
  tecnologia: 4,
  saude: 3,
  "rh-marketing": 3,
  interativos: 3,
  informatica: 3,
  "carreiras-pro": 3,
  beleza: 3,
  administracao: 3,
  design: 2,
  excel: 1,
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
            Mais de 40 cursos para transformar seu futuro. Escolha sua área e comece hoje.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icone] || Monitor;
            const href = categoryHrefs[cat.slug as CategorySlug] || `/cursos?categoria=${cat.slug}`;
            const count = courseCount[cat.slug as CategorySlug] ?? 0;

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={href}
                  className="group relative flex flex-col justify-between h-full min-h-[160px] rounded-2xl overflow-hidden p-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  style={{ background: `linear-gradient(135deg, ${cat.corHex}ee 0%, ${cat.corHex}99 100%)` }}
                  aria-label={`Ver cursos de ${cat.nome}`}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />

                  {/* Decorative circle */}
                  <div
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
                    style={{ background: "white" }}
                  />

                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-200">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-base text-white leading-tight mb-1">
                      {cat.nome}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">
                        {count} {count === 1 ? "curso" : "cursos"}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-[var(--color-brand-navy)] dark:text-white font-semibold hover:underline underline-offset-4 transition-colors"
          >
            Ver todos os cursos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
