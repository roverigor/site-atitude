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
          className="group rounded-3xl bg-white dark:bg-[var(--color-background-alt)] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
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
