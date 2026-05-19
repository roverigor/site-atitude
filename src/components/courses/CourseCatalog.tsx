"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { CourseFilter } from "@/components/courses/CourseFilter";
import { CourseCard } from "@/components/courses/CourseCard";
import type {
  Course,
  Category,
  CategorySlug,
  Pillar,
  PillarSlug,
} from "@/types/course";

interface CourseCatalogProps {
  courses: Course[];
  categories: Category[];
  pillars: Pillar[];
}

export function CourseCatalog({ courses, categories, pillars }: CourseCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get("categoria") as CategorySlug) || "all";
  const initialPillar = (searchParams.get("pilar") as PillarSlug) || "all";
  const [activePillar, setActivePillar] = useState<PillarSlug | "all">(initialPillar);
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesWithCount = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        count: courses.filter((c) => c.categoria === category.slug).length,
      }))
      .filter((category) => category.count > 0);
  }, [categories, courses]);

  const pillarsWithCount = useMemo(() => {
    return pillars.map((pillar) => {
      if (pillar.transversal) return { ...pillar, count: 0 };
      const slugs = new Set(
        categories.filter((c) => c.pilar === pillar.slug).map((c) => c.slug)
      );
      return {
        ...pillar,
        count: courses.filter((c) => slugs.has(c.categoria)).length,
      };
    });
  }, [pillars, categories, courses]);

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (activePillar !== "all") {
      const pillarCategorySlugs = new Set(
        categories.filter((c) => c.pilar === activePillar).map((c) => c.slug)
      );
      result = result.filter((c) => pillarCategorySlugs.has(c.categoria));
    }

    if (activeCategory !== "all") {
      result = result.filter((course) => course.categoria === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (course) =>
          course.nome.toLowerCase().includes(query) ||
          course.descricao_curta.toLowerCase().includes(query) ||
          course.modulos.some((m) => m.nome.toLowerCase().includes(query))
      );
    }

    return result;
  }, [courses, categories, activePillar, activeCategory, searchQuery]);

  function syncUrl(pillar: PillarSlug | "all", category: CategorySlug | "all") {
    const params = new URLSearchParams(searchParams.toString());
    if (pillar === "all") params.delete("pilar");
    else params.set("pilar", pillar);
    if (category === "all") params.delete("categoria");
    else params.set("categoria", category);
    const queryString = params.toString();
    router.replace(`/cursos${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }

  function handlePillarSelect(pillar: PillarSlug | "all") {
    setActivePillar(pillar);
    // Drop category when pillar changes — it might not belong to the new pillar
    setActiveCategory("all");
    syncUrl(pillar, "all");
  }

  function handleCategorySelect(category: CategorySlug | "all") {
    setActiveCategory(category);
    syncUrl(activePillar, category);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar por nome do curso, descrição ou módulo..."
        />
        <CourseFilter
          pillars={pillarsWithCount}
          categories={categoriesWithCount}
          activePillar={activePillar}
          activeCategory={activeCategory}
          onSelectPillar={handlePillarSelect}
          onSelectCategory={handleCategorySelect}
          totalCount={courses.length}
          filteredCount={filteredCourses.length}
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center mb-4">
            <BookOpen className="h-7 w-7 text-[var(--color-foreground-muted)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-sm text-[var(--color-foreground-muted)] max-w-sm">
            {searchQuery
              ? `Não encontramos cursos para "${searchQuery}". Tente outra busca ou limpe os filtros.`
              : "Não há cursos disponíveis com esses filtros no momento."}
          </p>
          {(searchQuery || activeCategory !== "all" || activePillar !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActivePillar("all");
                setActiveCategory("all");
                syncUrl("all", "all");
              }}
              className="mt-4 text-sm font-medium text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)] hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
