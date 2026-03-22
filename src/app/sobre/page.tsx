import { Metadata } from "next";
import { MessageCircle, Quote, Users, Rocket, BookOpen, Globe, Handshake, PartyPopper, GraduationCap, Building2, Star, Briefcase, TrendingUp, Key } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatsSection } from "@/components/home/StatsSection";
import { getAllTeamMembers } from "@/lib/team";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Nossa História | Atitude Ensino",
  description:
    "A história da Atitude Ensino começa em 2010, quando Igor Rover, com 16 anos, se torna aluno da escola que um dia seria sua. De aluno a estagiário, gerente e sócio-proprietário — conheça essa trajetória.",
};

const milestones = [
  {
    year: 2010,
    title: "O aluno que mudaria tudo",
    description:
      "Com 16 anos, Igor Rover se torna aluno da escola que, anos depois, passaria a ser a Atitude Ensino. Uma decisão que parecia simples — mas que definiria sua vida.",
    icon: Star,
  },
  {
    year: 2011,
    title: "De aluno a estagiário",
    description:
      "Aos 17 anos, Igor começa a estagiar na própria escola onde estudou. A paixão pelo ensino já era evidente — e a trajetória dentro da instituição tinha apenas começado.",
    icon: Briefcase,
  },
  {
    year: 2012,
    title: "Gerente aos 18 anos",
    description:
      "Um ano depois, Igor assume a gerência da escola. Jovem, determinado e com visão de futuro, começa a moldar a cultura e a identidade que marcariam a Atitude Ensino.",
    icon: TrendingUp,
  },
  {
    year: 2013,
    title: "Primeiros formandos",
    description:
      "As primeiras turmas de informática concluem o curso e ingressam no mercado de trabalho — confirmando que a missão era possível.",
    icon: BookOpen,
  },
  {
    year: 2014,
    title: "Sócio-proprietário",
    description:
      "Igor passa a ser sócio-proprietário da escola, tornando-a oficialmente sua. A missão agora é total: construir a melhor escola profissionalizante do interior do Paraná.",
    icon: Key,
  },
  {
    year: 2016,
    title: "Expansão do catálogo",
    description:
      "O portfólio cresce para mais de 20 cursos, expandindo para as áreas de administração, saúde e beleza — atendendo mais perfis e necessidades.",
    icon: Users,
  },
  {
    year: 2017,
    title: "Parceria com universidades",
    description:
      "Firmamos parceria com instituições de ensino superior para oferecer cursos de graduação e pós-graduação a distância (EAD), ampliando o acesso à educação de nível superior em Ibaiti.",
    icon: GraduationCap,
  },
  {
    year: 2018,
    title: "Experiência com franquia",
    description:
      "Vivenciamos a operação de uma franquia educacional — uma jornada que, mesmo encerrada, nos deixou know-how valioso em gestão, metodologia e escala de ensino.",
    icon: Building2,
  },
  {
    year: 2019,
    title: "Nasce a Atitude Idiomas",
    description:
      "Uma nova porta se abre: parceria com franquia de inglês que dá origem à Atitude Idiomas. O idioma passa a fazer parte do DNA da escola, com metodologia estruturada e professores fluentes.",
    icon: Globe,
  },
  {
    year: 2022,
    title: "Programa de estágio consolidado",
    description:
      "O encaminhamento de alunos ao mercado — que já existia de forma orgânica — se estrutura oficialmente com parcerias formais com empresas da região, garantindo oportunidades reais após a formatura.",
    icon: Handshake,
  },
  {
    year: 2026,
    title: "15 anos transformando vidas",
    description:
      "Mais de 1.500 alunos formados, 40+ cursos, inglês presencial e online, parcerias com universidades e empresas. Ibaiti nos viu crescer — e a história continua.",
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
              Nossa História
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Desde 2011 transformando vidas em Ibaiti-PR
            </p>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="default">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
              15 Anos de Trajetória
            </h2>
            <p className="mt-3 text-[var(--color-foreground-muted)] max-w-lg mx-auto">
              Cada decisão moldou quem somos. Cada aluno formado confirmou que valeu a pena.
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
              Nossa Missão
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
                Comecei como aluno dessa escola em 2010, com 16 anos. Um ano depois era estagiário, com 18 era gerente, e em 2014 me tornei sócio-proprietário. Não planejei tudo isso — simplesmente amei o que vi e me dediquei completamente. Em todos esses anos passamos por franquias, parcerias com universidades, idiomas e muitas reinvenções. Mas o propósito nunca mudou: que todo jovem de Ibaiti possa se qualificar para o mercado de trabalho sem precisar sair da cidade. Cada aluno que conquista um emprego é uma vitória nossa também.
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
              Pessoas que acreditam que educação transforma — e provam isso todos os dias
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
              Venha escrever sua história aqui
            </h2>
            <p className="text-lg text-white/80 mb-8">
              15 anos de trajetória nos ensinaram que o melhor investimento que alguém pode fazer é em si mesmo. Estamos de portas abertas — presencialmente ou online.
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
