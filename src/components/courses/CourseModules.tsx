import { CourseModule } from "@/types/course";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface CourseModulesProps {
  modulos: CourseModule[];
}

export function CourseModules({ modulos }: CourseModulesProps) {
  return (
    <div className="space-y-0">
      {modulos.map((modulo, index) => (
        <div
          key={index}
          className={`flex gap-4 py-6 ${
            index < modulos.length - 1
              ? "border-b border-[var(--color-border)]"
              : ""
          }`}
        >
          {/* Module number circle */}
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-navy)] text-white font-bold text-sm">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Module content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-[var(--color-foreground)]">
                {modulo.nome}
              </h3>
              <Badge variant="info" size="sm">
                <Clock className="h-3 w-3 mr-1" />
                {modulo.carga_horaria}
              </Badge>
            </div>
            <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
              {modulo.descricao}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
