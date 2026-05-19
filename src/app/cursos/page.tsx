import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Briefcase, Languages, Cpu, ArrowRight, type LucideIcon } from "lucide-react";
import { getAllCourses, getPillarsWithCount } from "@/lib/courses";
import { categories } from "@/data/categories";
import { pillars } from "@/data/pillars";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CTAFinal } from "@/components/home/CTAFinal";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { PillarSlug } from "@/types/course";

export const metadata: Metadata = {
  title: "Catálogo de cursos",
  description:
    "Mais de 40 cursos profissionalizantes em ensino, emprego, idiomas e tecnologia. Encontre o seu ponto de partida.",
};

const pillarIcon: Record<PillarSlug, LucideIcon> = {
  ensino: GraduationCap,
  emprego: Briefcase,
  idiomas: Languages,
  tecnologia: Cpu,
};

// DS on-color rule: lime → navy; orange/magenta/violet → white
const pillarOn: Record<PillarSlug, { fg: string }> = {
  ensino: { fg: "var(--color-brand-navy)" },
  emprego: { fg: "#FFFFFF" },
  idiomas: { fg: "#FFFFFF" },
  tecnologia: { fg: "#FFFFFF" },
};

const pillarHref: Record<PillarSlug, string> = {
  ensino: "/cursos?pilar=ensino",
  emprego: "/sobre#emprego",
  idiomas: "/ingles",
  tecnologia: "/cursos?pilar=tecnologia",
};

export default function CursosPage() {
  const courses = getAllCourses();
  const pillarsWithCount = getPillarsWithCount();

  return (
    <>
      <Breadcrumb items={[{ label: "Cursos" }]} />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative bg-[var(--color-cream-50)] pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        {/* Decor orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-brand-green)]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-brand-purple)]/15 blur-3xl"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="eyebrow">Catálogo de cursos</span>

            <p className="script mt-4 text-[2rem] md:text-[2.5rem] leading-none">
              Mais de 40 caminhos pra começar.
            </p>

            <h1 className="mt-3 mb-6 font-black text-[2.5rem] md:text-[4rem] leading-[0.96] tracking-[-0.035em] text-[var(--color-brand-navy)]">
              Nossos{" "}
              <span className="relative inline-block">
                <span className="relative z-10">cursos</span>
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -right-1 bottom-1 md:bottom-2 h-3 md:h-4 rounded-full bg-[var(--color-brand-green)] z-0"
                />
              </span>
            </h1>

            <p className="lead max-w-[560px] mb-10">
              Profissionalizantes presenciais e EAD, em quatro pilares: ensino,
              emprego, idiomas e tecnologia. Escolha o seu ponto de partida —
              a gente caminha junto.
            </p>

            {/* Pillar quick filters */}
            <div className="flex flex-wrap gap-3">
              {pillarsWithCount.map((p) => {
                const Icon = pillarIcon[p.slug];
                const colors = pillarOn[p.slug];
                const href = pillarHref[p.slug];
                return (
                  <Link
                    key={p.slug}
                    href={href}
                    className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-extrabold text-sm md:text-base shadow-sm transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.03] hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-purple)]"
                    style={{ backgroundColor: p.corHex, color: colors.fg }}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{p.nome}</span>
                    {!p.transversal && p.count > 0 && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor:
                            p.slug === "ensino"
                              ? "rgba(37,37,102,0.18)"
                              : "rgba(255,255,255,0.22)",
                        }}
                      >
                        {p.count}
                      </span>
                    )}
                    <ArrowRight
                      className="w-3.5 h-3.5 -mr-1 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          BRAND COLOR STRIP
          ============================================================ */}
      <BrandMarquee />

      {/* ============================================================
          CATALOG
          ============================================================ */}
      <section className="bg-[var(--color-cream-50)] py-12 md:py-16">
        <Container>
          <Suspense fallback={<CatalogSkeleton />}>
            <CourseCatalog courses={courses} categories={categories} pillars={pillars} />
          </Suspense>
        </Container>
      </section>

      {/* ============================================================
          CTA FINAL
          ============================================================ */}
      <CTAFinal />
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-11 w-full max-w-md rounded-md bg-[var(--color-background-alt)]" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-[var(--color-background-alt)]"
            style={{ width: `${80 + i * 15}px` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 rounded-3xl bg-[var(--color-background-alt)]"
          />
        ))}
      </div>
    </div>
  );
}
