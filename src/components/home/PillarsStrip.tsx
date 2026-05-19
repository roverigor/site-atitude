import Link from "next/link";
import { GraduationCap, Briefcase, Languages, Cpu, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { getPillarsWithCount } from "@/lib/courses";
import type { PillarSlug } from "@/types/course";

const iconMap: Record<PillarSlug, LucideIcon> = {
  ensino: GraduationCap,
  emprego: Briefcase,
  idiomas: Languages,
  tecnologia: Cpu,
};

const hrefMap: Record<PillarSlug, string> = {
  ensino: "/cursos?pilar=ensino",
  emprego: "/sobre#emprego",
  idiomas: "/ingles",
  tecnologia: "/cursos?pilar=tecnologia",
};

export function PillarsStrip() {
  const pillars = getPillarsWithCount();

  return (
    <section
      className="py-12 md:py-16 bg-[var(--color-cream-50)]"
      aria-labelledby="pillars-heading"
    >
      <Container>
        <div className="max-w-2xl mb-8 md:mb-10">
          <span
            id="pillars-heading"
            className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-purple)]"
          >
            Os quatro pilares da Atitude
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[var(--color-brand-navy)] leading-tight">
            Da matrícula ao primeiro contracheque, a gente caminha junto.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.slug];
            const href = hrefMap[pillar.slug];

            return (
              <Link
                key={pillar.slug}
                href={href}
                className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-purple)] focus:ring-offset-2"
                style={{ borderTop: `8px solid ${pillar.corHex}` }}
                aria-label={`${pillar.nome}: ${pillar.tagline}`}
              >
                <div
                  className="inline-flex w-12 h-12 items-center justify-center rounded-full mb-4"
                  style={{ backgroundColor: `${pillar.corHex}1A`, color: pillar.corHex }}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-extrabold text-[var(--color-brand-navy)] mb-1">
                  {pillar.nome}
                </h3>
                <p className="text-sm text-[var(--color-foreground-muted)] leading-snug mb-3">
                  {pillar.tagline}
                </p>
                {!pillar.transversal && pillar.count > 0 && (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${pillar.corHex}1A`, color: pillar.corHex }}
                  >
                    {pillar.count} cursos
                  </span>
                )}
                {pillar.transversal && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-orange-100)] text-[var(--color-orange-600)]">
                    Serviço transversal
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
