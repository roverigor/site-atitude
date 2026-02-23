import { Metadata } from "next";
import { MessageCircle, Quote, Users, Rocket, BookOpen, Globe, Handshake, PartyPopper } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatsSection } from "@/components/home/StatsSection";
import { getAllTeamMembers } from "@/lib/team";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre Nos",
  description:
    "Conheca a historia da Atitude Ensino. Ha 15 anos transformando vidas em Ibaiti-PR com cursos profissionalizantes de qualidade.",
};

const milestones = [
  {
    year: 2011,
    title: "Fundacao",
    description:
      "Igor Rover funda a Atitude Ensino aos 17 anos com a missao de democratizar a educacao profissionalizante",
    icon: Rocket,
  },
  {
    year: 2013,
    title: "Primeiros formandos",
    description:
      "Primeiras turmas de informatica se formam e ingressam no mercado de trabalho",
    icon: BookOpen,
  },
  {
    year: 2016,
    title: "Expansao de cursos",
    description:
      "Catalogo cresce para mais de 20 cursos incluindo administracao, saude e beleza",
    icon: Users,
  },
  {
    year: 2019,
    title: "Ingles online",
    description:
      "Lancamento da Atitude English School com aulas ao vivo por Google Meet",
    icon: Globe,
  },
  {
    year: 2022,
    title: "Programa de estagio",
    description:
      "Parceria com empresas de Ibaiti para encaminhamento de alunos para estagio",
    icon: Handshake,
  },
  {
    year: 2026,
    title: "15 anos",
    description:
      "Celebracao de 15 anos com mais de 1500 alunos formados e 40+ cursos",
    icon: PartyPopper,
  },
];

export default function SobrePage() {
  const teamMembers = getAllTeamMembers();

  return (
    <>
      {/* Hero */}
      <Section variant="dark">
        <Container>
          <Breadcrumb items={[{ label: "Sobre" }]} />
          <div className="text-center max-w-3xl mx-auto pt-8 pb-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Nossa Historia
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Ha 15 anos transformando vidas em Ibaiti-PR
            </p>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="default">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
              15 Anos de Trajetoria
            </h2>
            <p className="mt-3 text-[var(--color-foreground-muted)] max-w-lg mx-auto">
              Cada ano uma conquista, cada aluno uma historia
            </p>
          </div>

          {/* Desktop Timeline - alternating sides */}
          <div className="hidden md:block relative max-w-4xl mx-auto">
            {/* Vertical center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[var(--color-border)]" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                const isCurrentYear = m.year === 2026;
                const Icon = m.icon;

                return (
                  <div key={m.year} className="relative flex items-center">
                    {/* Left content */}
                    <div
                      className={`w-[calc(50%-2rem)] ${
                        isLeft ? "text-right pr-8" : ""
                      }`}
                    >
                      {isLeft && (
                        <div>
                          <span
                            className={`text-sm font-bold ${
                              isCurrentYear
                                ? "text-[var(--color-brand-green)]"
                                : "text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]"
                            }`}
                          >
                            {m.year}
                          </span>
                          <h3 className="text-lg font-semibold mt-1">
                            {m.title}
                          </h3>
                          <p className="text-sm text-[var(--color-foreground-muted)] mt-1 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                          isCurrentYear
                            ? "bg-[var(--color-brand-green)] border-[var(--color-brand-green)]/30"
                            : "bg-[var(--color-brand-navy)] border-[var(--color-background)] dark:border-[#0A0A0A]"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isCurrentYear
                              ? "text-[var(--color-brand-navy)]"
                              : "text-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Right content */}
                    <div
                      className={`w-[calc(50%-2rem)] ml-auto ${
                        !isLeft ? "pl-8" : ""
                      }`}
                    >
                      {!isLeft && (
                        <div>
                          <span
                            className={`text-sm font-bold ${
                              isCurrentYear
                                ? "text-[var(--color-brand-green)]"
                                : "text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]"
                            }`}
                          >
                            {m.year}
                          </span>
                          <h3 className="text-lg font-semibold mt-1">
                            {m.title}
                          </h3>
                          <p className="text-sm text-[var(--color-foreground-muted)] mt-1 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline - vertical */}
          <div className="md:hidden relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

            <div className="space-y-8">
              {milestones.map((m) => {
                const isCurrentYear = m.year === 2026;
                const Icon = m.icon;

                return (
                  <div key={m.year} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-8 top-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCurrentYear
                            ? "bg-[var(--color-brand-green)]"
                            : "bg-[var(--color-brand-navy)]"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isCurrentYear
                              ? "text-[var(--color-brand-navy)]"
                              : "text-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pl-4">
                      <span
                        className={`text-sm font-bold ${
                          isCurrentYear
                            ? "text-[var(--color-brand-green)]"
                            : "text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]"
                        }`}
                      >
                        {m.year}
                      </span>
                      <h3 className="text-base font-semibold mt-1">
                        {m.title}
                      </h3>
                      <p className="text-sm text-[var(--color-foreground-muted)] mt-1 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section variant="alt">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
              Nossa Missao
            </h2>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo placeholder */}
            <div className="shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-[var(--color-brand-navy)] flex items-center justify-center overflow-hidden">
                <span className="text-5xl md:text-6xl font-bold text-[var(--color-brand-green)]">
                  IR
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <Quote className="h-8 w-8 text-[var(--color-brand-green)] mb-4" />
              <blockquote className="text-base md:text-lg leading-relaxed text-[var(--color-foreground)] italic">
                A Atitude Ensino nasceu de um sonho: que todo jovem de Ibaiti
                tivesse a chance de se qualificar para o mercado de trabalho sem
                precisar sair da cidade. Muita gente gasta com celular, com
                roupa de marca, mas nao investe em educacao. A gente mostra que
                um curso profissionalizante pode ser a porta para uma vida
                melhor. Fazemos isso por amor — cada aluno que conquista um
                emprego e uma vitoria nossa tambem.
              </blockquote>
              <p className="mt-6 font-semibold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]">
                — Igor Rover, CEO &amp; Fundador
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section variant="default">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
              Nossa Equipe
            </h2>
            <p className="mt-3 text-[var(--color-foreground-muted)] max-w-lg mx-auto">
              Profissionais dedicados a transformar a educacao em Ibaiti
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.nome}
                className="p-6 rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] text-center hover:shadow-[var(--shadow-md)] transition-shadow"
              >
                {/* Photo placeholder */}
                <div className="w-20 h-20 rounded-full bg-[var(--color-brand-navy)]/10 dark:bg-[var(--color-brand-green)]/10 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {member.foto ? (
                    <img
                      src={member.foto}
                      alt={member.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]">
                      {member.nome
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-base">{member.nome}</h3>
                <Badge variant="info" size="sm" className="mt-2">
                  {member.funcao}
                </Badge>
                <p className="text-sm text-[var(--color-foreground-muted)] mt-3 leading-relaxed">
                  {member.descricao}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <StatsSection />

      {/* CTA */}
      <Section variant="gradient">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold mb-4">
              Venha conhecer a Atitude Ensino
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Estamos de portas abertas para voce. Agende uma visita ou fale com
              a gente pelo WhatsApp!
            </p>
            <Button
              variant="whatsapp"
              size="lg"
              href={buildWhatsAppUrl({ type: "home" })}
            >
              <MessageCircle className="h-5 w-5" />
              Fale pelo WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
