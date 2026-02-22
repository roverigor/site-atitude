"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Monitor, Wifi, MonitorPlay, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getCategoryBySlug } from "@/data/categories";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  index?: number;
}

const modalidadeConfig = {
  presencial: { icon: Monitor, label: "Presencial" },
  online: { icon: Wifi, label: "Online" },
  interativo: { icon: MonitorPlay, label: "Interativo" },
} as const;

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const category = getCategoryBySlug(course.categoria);
  const categoryColor = category?.corHex || "#6B7280";
  const categoryName = category?.nome || course.categoria;
  const modalidade = modalidadeConfig[course.modalidade];
  const ModalidadeIcon = modalidade.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        href={`/cursos/${course.slug}`}
        className="group flex flex-col h-full rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] hover:shadow-lg transition-all duration-200 overflow-hidden"
        style={{ borderLeftWidth: "4px", borderLeftColor: categoryColor }}
      >
        <div className="flex flex-col flex-1 p-5">
          {/* Category badge */}
          <div className="mb-3">
            <Badge variant="category" color={categoryColor} size="sm">
              {categoryName}
            </Badge>
          </div>

          {/* Course name */}
          <h3 className="font-semibold text-base leading-snug text-[var(--color-foreground)] group-hover:text-[var(--color-brand-navy)] dark:group-hover:text-white transition-colors mb-2">
            {course.nome}
          </h3>

          {/* Short description */}
          <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed flex-1 mb-4">
            {course.descricao_curta}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-[var(--color-foreground-muted)] mb-3">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {course.duracao_total}
            </span>
            <span className="flex items-center gap-1.5">
              <ModalidadeIcon className="h-3.5 w-3.5" />
              {modalidade.label}
            </span>
          </div>

          {/* CTA */}
          <span
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: categoryColor }}
          >
            Saiba mais
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
