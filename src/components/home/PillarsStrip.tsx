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

// DS rule: lime → navy text; orange/magenta/violet → paper text.
const onColor: Record<PillarSlug, { fg: string; chipBg: string; chipFg: string }> = {
  ensino: {
    fg: "var(--color-brand-navy)",
    chipBg: "var(--color-brand-navy)",
    chipFg: "var(--color-brand-green)",
  },
  emprego: {
    fg: "#FFFFFF",
    chipBg: "rgba(255, 255, 255, 0.18)",
    chipFg: "#FFFFFF",
  },
  idiomas: {
    fg: "#FFFFFF",
    chipBg: "rgba(255, 255, 255, 0.18)",
    chipFg: "#FFFFFF",
  },
  tecnologia: {
    fg: "#FFFFFF",
    chipBg: "rgba(255, 255, 255, 0.18)",
    chipFg: "#FFFFFF",
  },
};

export function PillarsStrip() {
  const pillars = getPillarsWithCount();

  return (
    <section
      className="py-12 md:py-16 bg-[var(--color-cream-100)]"
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
            Da matrícula ao primeiro contracheque,
          </h2>
          <p className="script mt-1 text-[1.75rem] md:text-[2.25rem] leading-tight">
            a gente caminha junto.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.slug];
            const href = hrefMap[pillar.slug];
            const colors = onColor[pillar.slug];

            return (
              <Link
                key={pillar.slug}
                href={href}
                className="group relative rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: pillar.corHex,
                  color: colors.fg,
                }}
                aria-label={`${pillar.nome}: ${pillar.tagline}`}
              >
                {/* Decorative pill — capsule motif behind content */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-15"
                  style={{
                    backgroundColor:
                      pillar.slug === "ensino" ? "var(--color-brand-navy)" : "#FFFFFF",
                  }}
                />

                {/* Icon — capsule container */}
                <div
                  className="relative inline-flex w-12 h-12 items-center justify-center rounded-full mb-4"
                  style={{
                    backgroundColor:
                      pillar.slug === "ensino"
                        ? "rgba(37, 37, 102, 0.12)"
                        : "rgba(255, 255, 255, 0.2)",
                    color: colors.fg,
                  }}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <h3
                  className="relative text-lg font-extrabold mb-1"
                  style={{ color: colors.fg }}
                >
                  {pillar.nome}
                </h3>
                <p
                  className="relative text-sm leading-snug mb-3"
                  style={{ color: colors.fg, opacity: 0.85 }}
                >
                  {pillar.tagline}
                </p>

                {!pillar.transversal && pillar.count > 0 && (
                  <span
                    className="relative inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: colors.chipBg,
                      color: colors.chipFg,
                    }}
                  >
                    {pillar.count} cursos
                  </span>
                )}
                {pillar.transversal && (
                  <span
                    className="relative inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: colors.chipBg,
                      color: colors.chipFg,
                    }}
                  >
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
