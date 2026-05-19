import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, BookOpen, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-[var(--color-cream-50)] pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative pill orbs — atmosphere only, far behind content */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--color-brand-green)] blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[var(--color-brand-purple)]/40 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-stretch">
          {/* Left — copy */}
          <div className="flex flex-col justify-center">
            <span className="eyebrow">
              Cursos profissionalizantes · Ibaiti-PR
            </span>

            <p className="script mt-4 text-[2rem] md:text-[2.5rem] leading-none">
              Aprender é uma atitude.
            </p>

            <h1 className="mt-3 mb-6 font-black text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[0.96] tracking-[-0.035em] text-[var(--color-brand-navy)]">
              Aqui, o certificado vem com{" "}
              <span className="relative inline-block">
                <span className="relative z-10">emprego incluso</span>
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -right-1 bottom-1 md:bottom-2 h-3 md:h-4 rounded-full bg-[var(--color-brand-green)] z-0"
                />
              </span>
            </h1>

            <p className="lead max-w-[540px] mb-8">
              Inglês aumenta seu salário em até 60%. TI com mais de 11 mil
              vagas abertas. Da matrícula ao primeiro contracheque, a gente
              caminha junto.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="whatsapp"
                size="lg"
                href={buildWhatsAppUrl({ type: "home" })}
              >
                <MessageCircle className="h-5 w-5" />
                Garantir minha vaga
              </Button>
              <Button variant="secondary" size="lg" href="/cursos">
                <BookOpen className="h-5 w-5" />
                Ver os cursos
              </Button>
              <span className="text-sm text-[var(--color-foreground-muted)] ml-1">
                <b className="text-[var(--color-brand-navy)]">+1.500</b> alunos
                formados desde 2011
              </span>
            </div>
          </div>

          {/* Right — bento stats */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[420px]">
            {/* Big navy tile — spans both rows */}
            <div className="row-span-2 rounded-3xl bg-[var(--color-brand-navy)] text-white p-6 flex flex-col justify-between shadow-sm">
              <p className="text-sm font-semibold leading-snug text-white/70">
                Aumento médio de
                <br />
                salário depois do inglês
              </p>
              <p className="font-black leading-[0.9] tracking-[-0.04em] text-[var(--color-brand-green)] text-[5rem] md:text-[5.5rem]">
                +60<span className="text-3xl align-top ml-1">%</span>
              </p>
            </div>

            {/* Lime tile — alumni count */}
            <div className="rounded-3xl bg-[var(--color-brand-green)] text-[var(--color-brand-navy)] p-5 flex flex-col justify-between shadow-sm">
              <p className="font-black leading-[0.9] tracking-[-0.04em] text-4xl md:text-5xl">
                +1,5k
              </p>
              <p className="text-xs font-semibold leading-snug opacity-90">
                alunos formados
                <br />
                desde 2011
              </p>
            </div>

            {/* Paper tile — next intake */}
            <div className="rounded-3xl bg-white p-5 flex flex-col justify-between shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground-muted)]">
                Próxima turma
              </p>
              <div>
                <p className="font-black leading-none tracking-[-0.02em] text-2xl md:text-3xl text-[var(--color-brand-navy)]">
                  Matrículas
                  <br />
                  abertas
                </p>
                <a
                  href={buildWhatsAppUrl({ type: "home" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-brand-orange)] hover:underline"
                >
                  fale com a gente
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
