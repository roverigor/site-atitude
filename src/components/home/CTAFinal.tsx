import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site";

export function CTAFinal() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--color-brand-navy)] to-[var(--color-brand-purple)] text-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold mb-4">
            Pronto para transformar seu futuro?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            A Atitude Ensino esta esperando voce. Fale com a gente e de o primeiro passo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="whatsapp" size="lg" href={buildWhatsAppUrl({ type: "home" })}>
              <MessageCircle className="h-5 w-5" />
              Fale pelo WhatsApp
            </Button>
          </div>
          <p className="mt-6 text-white/60 flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            <a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="hover:text-white transition-colors">
              Ou ligue: {siteConfig.phone}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
