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
  title: "Atitude English School | Inglês Presencial e Online em Ibaiti",
  description:
    "Aprenda inglês presencialmente em Ibaiti ou online ao vivo por videochamada, com professores fluentes e turmas de até 6 alunos. Inglês aumenta seu salário em até 60%. Matricule-se!",
  openGraph: {
    title: "Atitude English School | Inglês Presencial e Online em Ibaiti",
    description:
      "Inglês presencial ou online ao vivo com professores fluentes. Turmas reduzidas, do básico ao avançado. Profissionais com inglês ganham até 60% a mais.",
  },
};

const differentials = [
  {
    icon: Video,
    title: "Presencial ou online — você escolhe",
    description:
      "Aulas na nossa escola em Ibaiti ou ao vivo por videochamada no Google Meet. Mesma qualidade, mesma atenção — na modalidade que cabe na sua rotina.",
  },
  {
    icon: Headphones,
    title: "Professores fluentes de verdade",
    description:
      "Nossos professores têm vivência real no idioma e conduzem as aulas em inglês desde o início, com tradução estratégica quando necessário.",
  },
  {
    icon: BookOpen,
    title: "Apostila impressa inclusa",
    description:
      "Material didático completo desenvolvido pela nossa equipe. O aluno leva pra casa e consulta sempre que precisar.",
  },
  {
    icon: Users,
    title: "Turmas de no máximo 6 alunos",
    description:
      "Atenção individual garantida. Sem se perder em turmas grandes — aqui você aprende de verdade.",
  },
  {
    icon: Globe,
    title: "Do básico ao avançado",
    description:
      "Níveis para todas as idades e fases: crianças, jovens e adultos, do primeiro contato à fluência.",
  },
  {
    icon: Award,
    title: "Certificado + diferencial salarial",
    description:
      "Certificado reconhecido ao concluir cada nível. Estudos da Catho mostram que inglês aumenta o salário em até 60% em qualquer profissão.",
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
              Inglês que{" "}
              <span className="text-[var(--color-brand-green)]">
                aumenta seu salário
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl">
              Presencial em Ibaiti ou online ao vivo por videochamada — você escolhe. Professores fluentes, turmas de no máximo 6 alunos e metodologia que realmente funciona. Profissionais com inglês ganham até 60% a mais. (Fonte: Catho)
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
                <Monitor className="h-4 w-4" />
                Presencial ou online
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
                <Headphones className="h-4 w-4" />
                Professores fluentes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-sm">
                <Users className="h-4 w-4" />
                Máx. 6 alunos por turma
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
              Quero aprender inglês
            </Button>
          </div>
        </Container>
      </section>

      {/* Level cards */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Escolha o seu nível
            </h2>
            <p className="text-[var(--color-foreground-muted)] text-lg max-w-2xl mx-auto">
              Cursos para crianças, jovens e adultos. Presencial em Ibaiti ou online por videochamada — você decide.
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
                  Novos cursos de inglês em breve!
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
              Presencial ou online. Professores fluentes. Turmas pequenas. Uma metodologia pensada para você aprender de verdade — e transformar isso em salário.
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
            Inglês que vale{" "}
            <span className="text-[var(--color-brand-green)]">aumento de salário</span>
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Turmas com vagas limitadas — presencial em Ibaiti ou online por videochamada. Garanta sua vaga agora e comece a diferença no seu currículo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="whatsapp"
              size="lg"
              href={whatsappUrl}
              className="shadow-[var(--shadow-wa)]"
            >
              <MessageCircle className="h-5 w-5" />
              Garantir minha vaga
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
