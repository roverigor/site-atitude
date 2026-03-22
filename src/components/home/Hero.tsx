import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] flex items-center bg-[var(--color-brand-navy)] overflow-hidden">
      {/* Background gradient pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-navy)] via-[var(--color-brand-navy)]/95 to-[var(--color-brand-purple)]/50" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[var(--color-brand-green)] blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[var(--color-brand-purple)] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center md:mx-0 md:text-left">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[var(--color-brand-green)] text-sm font-semibold">✦ Desde 2009</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80 text-sm">Ibaiti · PR</span>
          </div>

          <h1 className="text-[2.25rem] md:text-[4rem] font-extrabold leading-[1.1] text-white mb-6">
            Transformando{" "}
            <span className="text-[var(--color-brand-green)]">vidas</span>{" "}
            através da educação
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg mx-auto md:mx-0">
            Cursos profissionalizantes que abrem portas para o seu futuro.
            Da informatica ao ingles, do basico ao emprego.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="whatsapp" size="lg" href={buildWhatsAppUrl({ type: "home" })}>
              <MessageCircle className="h-5 w-5" />
              Fale com a gente
            </Button>
            <Button variant="secondary-inverted" size="lg" href="/cursos">
              <BookOpen className="h-5 w-5" />
              Conheca nossos cursos
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-6 text-sm text-white/50 text-center md:text-left">
            Mais de <span className="text-white/80 font-semibold">5.000 alunos</span> formados em 15 anos
          </p>
        </div>
      </Container>
    </section>
  );
}
