import Link from "next/link";
import { Quote, ArrowRight, Star, Users, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

const highlights = [
  { icon: Star, value: "2009", label: "Fundada em" },
  { icon: Users, value: "1.500+", label: "Alunos formados" },
  { icon: BookOpen, value: "40+", label: "Cursos ativos" },
];

export function AboutSection() {
  return (
    <section className="bg-[var(--color-brand-navy)] py-20 md:py-28 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — Story */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--color-brand-green)] mb-4">
              Nossa história
            </span>
            <h2 className="text-[2rem] md:text-[3rem] font-extrabold text-white leading-[1.1] mb-6">
              De aluno a fundador —{" "}
              <span className="text-[var(--color-brand-green)]">em Ibaiti</span>
            </h2>

            {/* Quote */}
            <div className="relative border-l-4 border-[var(--color-brand-green)] pl-6 mb-8">
              <Quote className="h-5 w-5 text-[var(--color-brand-green)] mb-2" aria-hidden="true" />
              <p className="text-white/80 text-base md:text-lg leading-relaxed italic">
                Comecei como aluno em 2010, com 16 anos. Um ano depois era estagiário, com 18 era gerente, e em 2014 me tornei proprietário. O propósito nunca mudou: que todo jovem de Ibaiti possa se qualificar sem precisar sair da cidade.
              </p>
              <p className="mt-4 text-[var(--color-brand-green)] font-semibold text-sm">
                — Igor Rover, CEO & Fundador
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="whatsapp" size="md" href={buildWhatsAppUrl({ type: "home" })}>
                <MessageCircle className="h-4 w-4" />
                Fale com a gente
              </Button>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm transition-colors group"
              >
                Conheça nossa história completa
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right — Visual card */}
          <div className="flex flex-col gap-6">
            {/* Founder card */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden">
              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[var(--color-brand-green)]/10" />

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-brand-green)] flex items-center justify-center shrink-0">
                  <span className="text-[var(--color-brand-navy)] font-bold text-xl">IR</span>
                </div>
                <div>
                  <p className="text-white font-bold">Igor Rover</p>
                  <p className="text-white/50 text-sm">CEO & Fundador · desde 2014</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4">
                {highlights.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="h-5 w-5 text-[var(--color-brand-green)] mx-auto mb-2" aria-hidden="true" />
                    <p className="text-white font-bold text-lg">{value}</p>
                    <p className="text-white/50 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission pill */}
            <div className="bg-[var(--color-brand-green)] rounded-2xl p-6">
              <p className="text-[var(--color-brand-navy)] font-bold text-base leading-snug">
                "Cada aluno que conquista um emprego é uma vitória nossa também."
              </p>
              <p className="text-[var(--color-brand-navy)]/70 text-sm mt-2 font-medium">
                — Missão da Atitude Ensino
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
