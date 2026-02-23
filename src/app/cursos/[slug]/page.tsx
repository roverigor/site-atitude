import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCourses,
  getCourseBySlug,
  getCoursesByCategory,
} from "@/lib/courses";
import { categories } from "@/data/categories";
import { CourseSchema } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { CourseModules } from "@/components/courses/CourseModules";
import { CourseIncludes } from "@/components/courses/CourseIncludes";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import {
  Clock,
  MapPin,
  Wifi,
  Monitor,
  Users,
  BookOpen,
  Target,
  AlertCircle,
} from "lucide-react";

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
    return { title: "Curso nao encontrado" };
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
  presencial: {
    icon: MapPin,
    label: "Presencial",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  online: {
    icon: Wifi,
    label: "Online",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  interativo: {
    icon: Monitor,
    label: "Interativo",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
} as const;

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const category = categories.find((c) => c.slug === course.categoria);
  const relatedCourses = getCoursesByCategory(course.categoria);
  const modalidade = modalidadeConfig[course.modalidade];
  const ModalidadeIcon = modalidade.icon;

  return (
    <>
      <CourseSchema course={course} />

      {/* Breadcrumb */}
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

      {/* Hero */}
      <Section variant="dark" className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl">
            {/* Category badge */}
            {category && (
              <Badge
                variant="category"
                color={category.corHex}
                size="md"
                className="mb-4 !bg-white/15 !text-white"
              >
                {category.nome}
              </Badge>
            )}

            {/* Course title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {course.nome}
            </h1>

            {/* Short description */}
            <p className="text-lg text-white/80 mb-6 leading-relaxed">
              {course.descricao_curta}
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <ModalidadeIcon className="h-4 w-4" />
                {modalidade.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Clock className="h-4 w-4" />
                {course.duracao_total}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Users className="h-4 w-4" />
                {course.vagas} vagas
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main content + Sidebar */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About the course */}
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--color-foreground)] mb-4">
                  <BookOpen className="h-5 w-5 text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]" />
                  Sobre o curso
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  {course.descricao_completa.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[var(--color-foreground-muted)] leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--color-foreground)] mb-4">
                  <Target className="h-5 w-5 text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]" />
                  Modulos do curso
                </h2>
                <CourseModules modulos={course.modulos} />
              </div>

              {/* Publico alvo */}
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--color-foreground)] mb-4">
                  <Users className="h-5 w-5 text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]" />
                  Publico-alvo
                </h2>
                <p className="text-[var(--color-foreground-muted)] leading-relaxed">
                  {course.publico_alvo}
                </p>
              </div>

              {/* Pre-requisitos */}
              {course.prerequisitos && (
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--color-foreground)] mb-4">
                    <AlertCircle className="h-5 w-5 text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]" />
                    Pre-requisitos
                  </h2>
                  <p className="text-[var(--color-foreground-muted)] leading-relaxed">
                    {course.prerequisitos}
                  </p>
                </div>
              )}

              {/* O que esta incluso */}
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--color-foreground)] mb-6">
                  <BookOpen className="h-5 w-5 text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]" />
                  O que esta incluso
                </h2>
                <CourseIncludes incluso={course.incluso} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CourseSidebar course={course} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Related courses */}
      {relatedCourses.filter((c) => c.slug !== course.slug).length > 0 && (
        <Section variant="alt">
          <Container>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8 text-center">
              Outros cursos de {category?.nome || "interesse"}
            </h2>
            <RelatedCourses courses={relatedCourses} currentSlug={course.slug} />
          </Container>
        </Section>
      )}
    </>
  );
}
