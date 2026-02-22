"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import { CourseFilter } from "@/components/courses/CourseFilter";
import { CourseCard } from "@/components/courses/CourseCard";
import type { Course, Category, CategorySlug } from "@/types/course";

interface CourseCatalogProps {
  courses: Course[];
  categories: Category[];
}

export function CourseCatalog({ courses, categories }: CourseCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get("categoria") as CategorySlug) || "all";
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  // Compute categories with count
  const categoriesWithCount = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        count: courses.filter((c) => c.categoria === category.slug).length,
      }))
      .filter((category) => category.count > 0);
  }, [categories, courses]);

  // Filter courses
  const filteredCourses = useMemo(() => {
    let result = courses;

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((course) => course.categoria === activeCategory);
    }

    // Filter by search
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
  }, [courses, activeCategory, searchQuery]);

  function handleCategorySelect(category: CategorySlug | "all") {
    setActiveCategory(category);
    // Sync URL search params
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("categoria");
    } else {
      params.set("categoria", category);
    }
    const queryString = params.toString();
    router.replace(`/cursos${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }

  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <div className="space-y-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar por nome do curso, descricao ou modulo..."
        />
        <CourseFilter
          categories={categoriesWithCount}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          totalCount={courses.length}
          filteredCount={filteredCourses.length}
        />
      </div>

      {/* Course grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center mb-4">
            <BookOpen className="h-7 w-7 text-[var(--color-foreground-muted)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-sm text-[var(--color-foreground-muted)] max-w-sm">
            {searchQuery
              ? `Nao encontramos cursos para "${searchQuery}". Tente outra busca ou limpe os filtros.`
              : "Nao ha cursos disponiveis nesta categoria no momento."}
          </p>
          {(searchQuery || activeCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategorySelect("all");
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
