import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCourses,
  getCourseBySlug,
  getCoursesByCategory,
} from "@/lib/courses";
import { categories } from "@/data/categories";
import { pillars as allPillars } from "@/data/pillars";
import { CourseSchema } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { CourseModules } from "@/components/courses/CourseModules";
import { CourseIncludes } from "@/components/courses/CourseIncludes";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CTAFinal } from "@/components/home/CTAFinal";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  Clock,
  MapPin,
  Wifi,
  Monitor,
  Users,
  BookOpen,
  Target,
  AlertCircle,
  MessageCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import type { PillarSlug } from "@/types/course";

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Curso não encontrado" };
  }

  return {
    title: course.nome,
    description: course.descricao_curta,
    openGraph: {
      title: `${course.nome} | Atitude Ensino`,
      description: course.descricao_curta,
      images: course.imagem_destaque ? [course.imagem_destaque] : undefined,
    },
  };
}

const modalidadeConfig = {
  presencial: { icon: MapPin, label: "Presencial" },
  online: { icon: Wifi, label: "Online ao vivo" },
  interativo: { icon: Monitor, label: "Interativo" },
} as const;

// DS on-color rule
const pillarOnColor: Record<PillarSlug, { fg: string }> = {
  ensino: { fg: "var(--color-brand-navy)" },
  emprego: { fg: "#FFFFFF" },
  idiomas: { fg: "#FFFFFF" },
  tecnologia: { fg: "#FFFFFF" },
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const category = categories.find((c) => c.slug === course.categoria);
  const pillar = category
    ? allPillars.find((p) => p.slug === category.pilar)
    : undefined;
  const relatedCourses = getCoursesByCategory(course.categoria);
  const modalidade = modalidadeConfig[course.modalidade];
  const ModalidadeIcon = modalidade.icon;

  const pillarFg = pillar ? pillarOnColor[pillar.slug].fg : "#FFFFFF";
  const whatsappHref = buildWhatsAppUrl({
    type: "course",
    courseName: course.nome,
  });

  return (
    <>
      <CourseSchema course={course} />

      <Breadcrumb
        items={[
          { label: "Cursos", href: "/cursos" },
          ...(category
            ? [
                {
                  label: category.nome,
                  href: `/cursos?categoria=${course.categoria}`,
                },
              ]
            : []),
          { label: course.nome },
        ]}
      />

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative bg-[var(--color-cream-50)] pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">
        {/* Decor orb tinted with the pillar color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: pillar?.corHex || "var(--color-brand-green)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-brand-purple)]/15 blur-3xl"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            {/* Pillar + category chips */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {pillar && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: pillar.corHex, color: pillarFg }}
                >
                  {pillar.nome}
                </span>
              )}
              {category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[var(--color-foreground-muted)] shadow-sm">
                  {category.nome}
                </span>
              )}
            </div>

            <span className="eyebrow">Curso profissionalizante</span>

            <h1 className="mt-2 mb-5 font-black text-[2.25rem] md:text-[3.5rem] leading-[0.98] tracking-[-0.03em] text-[var(--color-brand-navy)]">
              {course.nome}
            </h1>

            <p className="lead max-w-[640px] mb-8">
              {course.descricao_curta}
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--color-brand-navy)] px-4 py-2 text-sm font-semibold shadow-sm">
                <ModalidadeIcon className="h-4 w-4" />
                {modalidade.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--color-brand-navy)] px-4 py-2 text-sm font-semibold shadow-sm">
                <Clock className="h-4 w-4" />
                {course.duracao_total}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--color-brand-navy)] px-4 py-2 text-sm font-semibold shadow-sm">
                <Users className="h-4 w-4" />
                {course.vagas} vagas
              </span>
              {course.proxima_turma && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-green)] text-[var(--color-brand-navy)] px-4 py-2 text-sm font-bold shadow-sm">
                  <Calendar className="h-4 w-4" />
                  Próxima turma: {course.proxima_turma}
                </span>
              )}
            </div>

            {/* CTA + Caveat sign-off */}
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="whatsapp" size="lg" href={whatsappHref}>
                <MessageCircle className="h-5 w-5" />
                Quero me inscrever
              </Button>
              <p className="script !text-[var(--color-brand-purple)] text-2xl md:text-3xl leading-none">
                cabe na sua rotina.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          BRAND COLOR STRIP
          ============================================================ */}
      <BrandMarquee />

      {/* ============================================================
          MAIN CONTENT + SIDEBAR
          ============================================================ */}
      <section className="bg-[var(--color-cream-50)] py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-14">
              {/* About the course */}
              <SectionBlock icon={BookOpen} title="Sobre o curso">
                <div className="prose dark:prose-invert max-w-none">
                  {course.descricao_completa
                    .split("\n\n")
                    .map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-[var(--color-foreground-muted)] leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph.trim()}
                      </p>
                    ))}
                </div>
              </SectionBlock>

              {/* Modules */}
              <SectionBlock icon={Target} title="Módulos do curso">
                <CourseModules modulos={course.modulos} />
              </SectionBlock>

              {/* Público-alvo */}
              <SectionBlock icon={Users} title="Pra quem é">
                <p className="text-[var(--color-foreground-muted)] leading-relaxed text-lg">
                  {course.publico_alvo}
                </p>
              </SectionBlock>

              {/* Pré-requisitos */}
              {course.prerequisitos && (
                <SectionBlock icon={AlertCircle} title="Pré-requisitos">
                  <p className="text-[var(--color-foreground-muted)] leading-relaxed text-lg">
                    {course.prerequisitos}
                  </p>
                </SectionBlock>
              )}

              {/* O que está incluso */}
              <SectionBlock icon={Sparkles} title="O que está incluso">
                <CourseIncludes incluso={course.incluso} />
              </SectionBlock>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CourseSidebar course={course} />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          RELATED COURSES
          ============================================================ */}
      {relatedCourses.filter((c) => c.slug !== course.slug).length > 0 && (
        <section className="bg-[var(--color-cream-100)] py-16 md:py-20">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="eyebrow">Continue navegando</span>
              <h2 className="mt-2 text-[1.75rem] md:text-[2.5rem] font-black leading-[1.05] tracking-[-0.025em] text-[var(--color-brand-navy)]">
                Outros cursos de {category?.nome || "interesse"}
              </h2>
              <p className="script mt-1 text-2xl md:text-3xl">
                pra continuar a jornada.
              </p>
            </div>
            <RelatedCourses
              courses={relatedCourses}
              currentSlug={course.slug}
            />
          </Container>
        </section>
      )}

      {/* ============================================================
          CTA FINAL
          ============================================================ */}
      <CTAFinal />
    </>
  );
}

function SectionBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof BookOpen;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-black tracking-[-0.02em] text-[var(--color-brand-navy)] mb-6">
        <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-[var(--color-brand-green)]">
          <Icon className="h-5 w-5 text-[var(--color-brand-navy)]" strokeWidth={2.2} />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}
