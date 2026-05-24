import { CheckCircle } from "lucide-react";

interface CourseIncludesProps {
  incluso: string[];
}

export function CourseIncludes({ incluso }: CourseIncludesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {incluso.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg bg-[var(--color-success)]/10 dark:bg-[var(--color-success)]/20 p-3"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-[var(--color-success)] mt-0.5" />
          <span className="text-sm text-[var(--color-foreground)] leading-snug">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
