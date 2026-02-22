"use client";

import { cn } from "@/lib/utils";
import type { Category, CategorySlug } from "@/types/course";

interface CourseFilterProps {
  categories: (Category & { count: number })[];
  activeCategory: CategorySlug | "all";
  onSelect: (category: CategorySlug | "all") => void;
  totalCount: number;
  filteredCount: number;
}

export function CourseFilter({
  categories,
  activeCategory,
  onSelect,
  totalCount,
  filteredCount,
}: CourseFilterProps) {
  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {/* "Todos" pill */}
        <button
          onClick={() => onSelect("all")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-navy)]",
            activeCategory === "all"
              ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
              : "border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)]"
          )}
          aria-pressed={activeCategory === "all"}
        >
          Todos
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

        {/* Category pills */}
        {categories.map((category) => {
          const isActive = activeCategory === category.slug;
          return (
            <button
              key={category.slug}
              onClick={() => onSelect(category.slug)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                isActive
                  ? "text-white shadow-sm"
                  : "border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"
              )}
              style={
                isActive
                  ? { backgroundColor: category.corHex, outline: "none" }
                  : { borderColor: undefined }
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

      {/* Result counter */}
      <p className="mt-4 text-sm text-[var(--color-foreground-muted)]">
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
      </p>
    </div>
  );
}
