import { Suspense } from "react";
import { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { getAllCourses } from "@/lib/courses";
import { categories } from "@/data/categories";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Catalogo de Cursos",
  description:
    "Mais de 40 cursos profissionalizantes em informatica, ingles, administracao, saude, beleza e tecnologia. Encontre o curso ideal para sua carreira.",
};

export default function CursosPage() {
  const courses = getAllCourses();

  return (
    <>
      <Breadcrumb items={[{ label: "Cursos" }]} />

      <Container className="pb-16 pt-6">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-brand-navy)" }}
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-navy)] dark:text-white">
              Nossos Cursos
            </h1>
          </div>
          <p className="text-[var(--color-foreground-muted)] max-w-2xl leading-relaxed">
            Mais de 40 cursos profissionalizantes para transformar seu futuro.
            Escolha a area que combina com voce e de o proximo passo na sua
            carreira.
          </p>
        </div>

        {/* Catalog with client-side filtering */}
        <Suspense fallback={<CatalogSkeleton />}>
          <CourseCatalog courses={courses} categories={categories} />
        </Suspense>
      </Container>
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Search skeleton */}
      <div className="h-11 w-full max-w-md rounded-xl bg-[var(--color-background-alt)]" />

      {/* Filter pills skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-[var(--color-background-alt)]"
            style={{ width: `${80 + i * 15}px` }}
          />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 rounded-xl bg-[var(--color-background-alt)]"
          />
        ))}
      </div>
    </div>
  );
}
