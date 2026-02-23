"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, MessageCircle, Filter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Testimonial, Category, CategorySlug } from "@/types/course";

interface TestimonialsPageProps {
  testimonials: Testimonial[];
  categories: Category[];
}

function getResultBadgeVariant(
  resultado: string
): "success" | "info" | "warning" {
  const lower = resultado.toLowerCase();
  if (
    lower.includes("emprego") ||
    lower.includes("promov") ||
    lower.includes("contrat")
  ) {
    return "success";
  }
  if (
    lower.includes("aprendeu") ||
    lower.includes("habilidade") ||
    lower.includes("conhecimento")
  ) {
    return "info";
  }
  return "success";
}

function FeaturedCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 md:p-8 rounded-2xl border-2 border-[var(--color-brand-green)]/30 bg-gradient-to-br from-[var(--color-brand-navy)]/5 to-transparent dark:from-[var(--color-brand-green)]/5 dark:to-transparent"
    >
      <div className="flex items-start gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-[var(--color-brand-green)] text-[var(--color-brand-green)]"
          />
        ))}
      </div>

      <Quote className="h-8 w-8 text-[var(--color-brand-green)]/40 mb-3" />

      <p className="text-base md:text-lg leading-relaxed mb-6 italic">
        &ldquo;{testimonial.texto}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        {/* Photo placeholder */}
        <div className="w-12 h-12 rounded-full bg-[var(--color-brand-navy)] flex items-center justify-center shrink-0 overflow-hidden">
          {testimonial.foto ? (
            <img
              src={testimonial.foto}
              alt={testimonial.nome}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-[var(--color-brand-green)]">
              {testimonial.nome
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold">{testimonial.nome}</p>
          <p className="text-sm text-[var(--color-foreground-muted)]">
            {testimonial.curso} &middot; {testimonial.ano_conclusao}
          </p>
        </div>

        <Badge variant={getResultBadgeVariant(testimonial.resultado)} size="md">
          {testimonial.resultado}
        </Badge>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="break-inside-avoid mb-4 p-5 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-shadow"
    >
      <Quote className="h-5 w-5 text-[var(--color-brand-green)]/50 mb-3" />

      <p className="text-sm leading-relaxed mb-4">
        &ldquo;{testimonial.texto}&rdquo;
      </p>

      <div className="border-t border-[var(--color-border)] pt-4">
        <div className="flex items-center gap-3">
          {/* Photo placeholder */}
          <div className="w-9 h-9 rounded-full bg-[var(--color-brand-navy)]/10 dark:bg-[var(--color-brand-green)]/10 flex items-center justify-center shrink-0 overflow-hidden">
            {testimonial.foto ? (
              <img
                src={testimonial.foto}
                alt={testimonial.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]">
                {testimonial.nome
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">
              {testimonial.nome}
              {testimonial.idade > 0 && (
                <span className="font-normal text-[var(--color-foreground-muted)]">
                  , {testimonial.idade} anos
                </span>
              )}
            </p>
            <p className="text-xs text-[var(--color-foreground-muted)]">
              {testimonial.curso} &middot; {testimonial.ano_conclusao}
            </p>
          </div>
        </div>

        <Badge
          variant={getResultBadgeVariant(testimonial.resultado)}
          size="sm"
          className="mt-3"
        >
          {testimonial.resultado}
        </Badge>
      </div>
    </motion.div>
  );
}

export function TestimonialsPage({
  testimonials,
  categories,
}: TestimonialsPageProps) {
  const [activeCategory, setActiveCategory] = useState<
    CategorySlug | "all"
  >("all");

  const featured = useMemo(
    () => testimonials.filter((t) => t.destaque),
    [testimonials]
  );

  const filteredTestimonials = useMemo(() => {
    const nonFeatured = testimonials.filter((t) => !t.destaque);
    if (activeCategory === "all") return nonFeatured;
    return nonFeatured.filter((t) => t.categoria === activeCategory);
  }, [testimonials, activeCategory]);

  // Only show categories that have testimonials
  const availableCategories = useMemo(() => {
    const cats = new Set(testimonials.map((t) => t.categoria));
    return categories.filter((c) => cats.has(c.slug));
  }, [testimonials, categories]);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-navy)] dark:text-white mb-3">
          O que nossos alunos dizem
        </h1>
        <p className="text-[var(--color-foreground-muted)] max-w-2xl mx-auto leading-relaxed">
          Historias reais de pessoas que transformaram suas carreiras com a
          Atitude Ensino. Cada depoimento e uma prova de que investir em
          educacao vale a pena.
        </p>
      </div>

      {/* Featured testimonials */}
      {featured.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-[var(--color-brand-green)]" />
            <h2 className="text-lg font-semibold text-[var(--color-brand-navy)] dark:text-white">
              Destaques
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((t) => (
              <FeaturedCard key={t.nome} testimonial={t} />
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-[var(--color-foreground-muted)]" />
          <span className="text-sm font-medium text-[var(--color-foreground-muted)]">
            Filtrar por area:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-[var(--color-brand-navy)] text-white dark:bg-[var(--color-brand-green)] dark:text-[var(--color-brand-navy)]"
                : "bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)] hover:bg-[var(--color-border)]"
            }`}
          >
            Todos
          </button>

          {availableCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.slug
                  ? "text-white"
                  : "bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)] hover:bg-[var(--color-border)]"
              }`}
              style={
                activeCategory === cat.slug
                  ? { backgroundColor: cat.corHex }
                  : undefined
              }
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials masonry grid */}
      {filteredTestimonials.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((t) => (
              <TestimonialCard key={t.nome + t.curso} testimonial={t} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[var(--color-foreground-muted)]">
            Nenhum depoimento encontrado para esta categoria.
          </p>
          <button
            onClick={() => setActiveCategory("all")}
            className="mt-3 text-sm font-medium text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)] hover:underline"
          >
            Ver todos os depoimentos
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand-navy)] to-[var(--color-brand-purple)] text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-3">
          Voce tambem pode ter sua historia aqui
        </h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Comece agora sua jornada de transformacao profissional. O proximo
          depoimento de sucesso pode ser o seu!
        </p>
        <Button
          variant="whatsapp"
          size="lg"
          href={buildWhatsAppUrl({ type: "home" })}
        >
          <MessageCircle className="h-5 w-5" />
          Comece agora
        </Button>
      </div>
    </div>
  );
}
