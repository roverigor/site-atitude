import Link from "next/link";
import { Course } from "@/types/course";
import { ArrowRight } from "lucide-react";

interface RelatedCoursesProps {
  courses: Course[];
  currentSlug: string;
}

export function RelatedCourses({ courses, currentSlug }: RelatedCoursesProps) {
  const related = courses
    .filter((course) => course.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {related.map((course) => (
        <Link
          key={course.slug}
          href={`/cursos/${course.slug}`}
          className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-navy)] dark:hover:border-[var(--color-brand-green)]"
        >
          <h3 className="font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-brand-navy)] dark:group-hover:text-[var(--color-brand-green)] transition-colors mb-2">
            {course.nome}
          </h3>
          <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed mb-4 line-clamp-2">
            {course.descricao_curta}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]">
            Ver curso
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}
