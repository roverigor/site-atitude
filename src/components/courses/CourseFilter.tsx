"use client";

import { cn } from "@/lib/utils";
import type { Category, CategorySlug, Pillar, PillarSlug } from "@/types/course";

interface CourseFilterProps {
  pillars: (Pillar & { count: number })[];
  categories: (Category & { count: number })[];
  activePillar: PillarSlug | "all";
  activeCategory: CategorySlug | "all";
  onSelectPillar: (pillar: PillarSlug | "all") => void;
  onSelectCategory: (category: CategorySlug | "all") => void;
  totalCount: number;
  filteredCount: number;
}

export function CourseFilter({
  pillars,
  categories,
  activePillar,
  activeCategory,
  onSelectPillar,
  onSelectCategory,
  totalCount,
  filteredCount,
}: CourseFilterProps) {
  const visibleCategories =
    activePillar === "all"
      ? categories
      : categories.filter((c) => c.pilar === activePillar);

  return (
    <div className="space-y-5">
      {/* Pillar row */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-foreground-muted)] mb-3">
          Áreas
        </span>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por pilar"
        >
          <button
            onClick={() => onSelectPillar("all")}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2",
              activePillar === "all"
                ? "bg-[var(--color-brand-navy)] text-white shadow-sm focus:ring-[var(--color-brand-navy)]"
                : "border-2 border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)] focus:ring-[var(--color-brand-navy)]"
            )}
            aria-pressed={activePillar === "all"}
          >
            Todas
          </button>

          {pillars.map((pillar) => {
            const isActive = activePillar === pillar.slug;
            const isEmpty = !pillar.transversal && pillar.count === 0;
            return (
              <button
                key={pillar.slug}
                onClick={() => !isEmpty && onSelectPillar(pillar.slug)}
                disabled={isEmpty}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed",
                  !isEmpty && "hover:scale-[1.02] active:scale-[0.98]",
                  isActive
                    ? "text-white shadow-sm"
                    : "border-2 text-[var(--color-foreground-muted)]"
                )}
                style={
                  isActive
                    ? { backgroundColor: pillar.corHex }
                    : { borderColor: `${pillar.corHex}40`, color: pillar.corHex }
                }
                aria-pressed={isActive}
              >
                {pillar.nome}
                {!pillar.transversal && pillar.count > 0 && (
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full min-w-[24px] text-center",
                      isActive ? "bg-white/20" : "bg-[var(--color-paper)]"
                    )}
                  >
                    {pillar.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category row (filtered by pillar) */}
      {visibleCategories.length > 1 && (
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-[var(--color-foreground-muted)] mb-3">
            Categorias
          </span>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por categoria"
          >
            <button
              onClick={() => onSelectCategory("all")}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-navy)]",
                activeCategory === "all"
                  ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
                  : "border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)]"
              )}
              aria-pressed={activeCategory === "all"}
            >
              Todas
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full min-w-[22px] text-center",
                  activeCategory === "all"
                    ? "bg-white/20"
                    : "bg-[var(--color-background-alt)]"
                )}
              >
                {totalCount}
              </span>
            </button>

            {visibleCategories.map((category) => {
              const isActive = activeCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => onSelectCategory(category.slug)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    isActive
                      ? "text-white shadow-sm"
                      : "border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"
                  )}
                  style={
                    isActive
                      ? { backgroundColor: category.corHex, outline: "none" }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = category.corHex;
                      (e.currentTarget as HTMLElement).style.color = category.corHex;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                      (e.currentTarget as HTMLElement).style.color = "";
                    }
                  }}
                  aria-pressed={isActive}
                >
                  {category.nome}
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full min-w-[22px] text-center",
                      isActive
                        ? "bg-white/20"
                        : "bg-[var(--color-background-alt)]"
                    )}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Result counter */}
      <p className="text-sm text-[var(--color-foreground-muted)]">
        Mostrando{" "}
        <span className="font-semibold text-[var(--color-foreground)]">
          {filteredCount}
        </span>{" "}
        {filteredCount === 1 ? "curso" : "cursos"}
        {activeCategory !== "all" && (
          <>
            {" "}em{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {categories.find((c) => c.slug === activeCategory)?.nome}
            </span>
          </>
        )}
        {activeCategory === "all" && activePillar !== "all" && (
          <>
            {" "}no pilar{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {pillars.find((p) => p.slug === activePillar)?.nome}
            </span>
          </>
        )}
      </p>
    </div>
  );
}
