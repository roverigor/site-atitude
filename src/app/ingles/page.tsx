import { Metadata } from "next";
import Link from "next/link";
import { getCoursesByCategory } from "@/lib/courses";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Globe,
  MessageCircle,
  Monitor,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Clock,
  Headphones,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Atitude English School | Cursos de Ingles Online",
  description:
    "Aprenda ingles com aulas ao vivo por Google Meet. Turmas para criancas, jovens e adultos. Professores fluentes, turmas reduzidas e certificado. Matricule-se!",
  openGraph: {
    title: "Atitude English School | Cursos de Ingles Online",
    description:
      "Aprenda ingles com aulas ao vivo por Google Meet. Do basico ao avancado, para todas as idades.",
  },
};

const differentials = [
  {
    icon: Video,
    title: "Aulas ao vivo por Meet",
    description:
      "Aulas interativas em tempo real com o Google Meet. Voce aprende de onde estiver.",
  },
  {
    icon: Headphones,
    title: "Professores fluentes",
    description:
      "Professores com vivencia no idioma, prontos para te guiar em cada etapa.",
  },
  {
    icon: BookOpen,
    title: "Apostila impressa",
    description:
      "Material didatico completo entregue na sua casa para acompanhar as aulas.",
  },
  {
    icon: Users,
    title: "Turmas reduzidas",
    description:
      "Maximo de 6 alunos por turma para garantir atencao individual.",
  },
  {
    icon: Globe,
    title: "Do basico ao avancado",
    description:
      "Niveis para todas as fases da sua jornada, do primeiro contato a fluencia.",
  },
  {
    icon: Award,
    title: "Certificado",
    description:
      "Certificado reconhecido ao concluir cada nivel do curso.",
  },
];

export default function InglesPage() {
  const englishCourses = getCoursesByCategory("ingles");
  const whatsappUrl = buildWhatsAppUrl({ type: "english" });

  return (
    <>
      {/* Hero - Pink gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brand-pink)] via-[#C2185B] to-[var(--color-brand-purple)] text-white py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="max-w-3xl">
            {/* English School badge */}
            <Badge
              variant="category"
              color="#FFFFFF"
              size="md"
              className="mb-6 !bg-white/15 !text-white border border-white/20"
            >
              <Globe className="h-3.5 w-3.5 mr-1" />
              Atitude English School
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Aprenda ingles{" "}
              <span className="text-[var(--color-brand-green)]">
                com quem sabe ensinar
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl">
              Aulas online ao vivo por Google Meet, com professores fluentes e
              turmas reduzidas. Do basico ao avancado, para todas as idades.
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
                <Monitor className="h-4 w-4" />
                Aulas online por Meet
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
                <Headphones className="h-4 w-4" />
                Professores fluentes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
                <Users className="h-4 w-4" />
                Max 6 alunos por turma
              </span>
            </div>

            {/* CTA */}
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              className="shadow-[var(--shadow-wa)]"
            >
              <MessageCircle className="h-5 w-5" />
              Quero aprender ingles
            </Button>
          </div>
        </Container>
      </section>

      {/* Level cards */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Escolha o seu nivel
            </h2>
            <p className="text-[var(--color-foreground-muted)] text-lg max-w-2xl mx-auto">
              Temos cursos para todas as idades e niveis. Encontre o ideal para
              voce ou seu filho.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {englishCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/cursos/${course.slug}`}
                className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-brand-pink)]/40 hover:-translate-y-1"
              >
                {/* Pink accent top border */}
                <div className="absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r from-[var(--color-brand-pink)] to-[var(--color-brand-purple)] opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="pt-2">
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-brand-pink)] transition-colors">
                    {course.nome}
                  </h3>

                  <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed mb-4 line-clamp-3">
                    {course.descricao_curta}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs rounded-full bg-pink-50 dark:bg-pink-950/20 text-[var(--color-brand-pink)] px-2.5 py-1">
                      <Clock className="h-3 w-3" />
                      {course.duracao_total}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs rounded-full bg-pink-50 dark:bg-pink-950/20 text-[var(--color-brand-pink)] px-2.5 py-1">
                      {course.modalidade === "online" ? (
                        <Monitor className="h-3 w-3" />
                      ) : (
                        <Globe className="h-3 w-3" />
                      )}
                      {course.modalidade === "online"
                        ? "Online"
                        : course.modalidade === "presencial"
                          ? "Presencial"
                          : "Interativo"}
                    </span>
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-pink)]">
                    Saiba mais
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}

            {/* Fallback when no courses exist yet */}
            {englishCourses.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Globe className="h-12 w-12 mx-auto text-[var(--color-foreground-muted)] mb-4" />
                <p className="text-[var(--color-foreground-muted)] text-lg mb-4">
                  Novos cursos de ingles em breve!
                </p>
                <Button variant="whatsapp" href={whatsappUrl}>
                  <MessageCircle className="h-4 w-4" />
                  Avise-me quando abrir turma
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Differentials */}
      <Section variant="alt">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Por que escolher a Atitude English School?
            </h2>
            <p className="text-[var(--color-foreground-muted)] text-lg max-w-2xl mx-auto">
              Uma metodologia pensada para voce aprender de verdade, com
              conforto e acompanhamento de perto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentials.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-all duration-200 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/20 mb-4">
                    <Icon className="h-6 w-6 text-[var(--color-brand-pink)]" />
                  </div>
                  <h3 className="font-bold text-[var(--color-foreground)] mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA final - Pink gradient */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[var(--color-brand-pink)] to-[var(--color-brand-purple)] text-white py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <Container className="relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece sua jornada no ingles{" "}
            <span className="text-[var(--color-brand-green)]">hoje</span>
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Fale com a gente pelo WhatsApp e garanta sua vaga. Turmas reduzidas
            com vagas limitadas!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              className="shadow-[var(--shadow-wa)]"
            >
              <MessageCircle className="h-5 w-5" />
              Falar pelo WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/cursos?categoria=ingles"
              className="border-white text-white hover:bg-white/10"
            >
              Ver todos os cursos
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
