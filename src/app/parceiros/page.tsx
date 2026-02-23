import { Metadata } from "next";
import {
  GraduationCap,
  Handshake,
  Briefcase,
  Building2,
  Users,
  ArrowRight,
  Phone,
} from "lucide-react";
import { getAllPartners } from "@/lib/partners";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Empresas Parceiras",
  description:
    "Conheva as empresas parceiras da Atitude Ensino que empregam nossos alunos. Da sala de aula ao mercado de trabalho.",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const segmentColors: Record<string, string> = {
  Comercio: "#16A34A",
  Saude: "#FF6600",
  Governo: "#1B1464",
  Servicos: "#6600FF",
  Tecnologia: "#7C3AED",
};

export default function ParceirosPage() {
  const partners = getAllPartners();

  const whatsappUrl = buildWhatsAppUrl({
    type: "custom",
    message:
      "Oi! Sou representante de uma empresa e tenho interesse no programa de parceria da Atitude Ensino.",
  });

  const steps = [
    {
      icon: GraduationCap,
      title: "Voce Aprende",
      description: "Cursos completos com apostila e certificado",
    },
    {
      icon: Handshake,
      title: "A Gente Encaminha",
      description: "Programa de estagio com empresas parceiras",
    },
    {
      icon: Briefcase,
      title: "Voce Conquista",
      description: "Oportunidade real de emprego na sua cidade",
    },
  ];

  const benefits = [
    "Profissionais treinados",
    "Sem custo de recrutamento",
    "Estagiarios motivados",
  ];

  return (
    <>
      {/* Hero - compact */}
      <Breadcrumb items={[{ label: "Parceiros" }]} />
      <Container className="pb-10 pt-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-brand-orange)" }}
            >
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-navy)] dark:text-white">
              Empresas Parceiras
            </h1>
          </div>
          <p className="text-[var(--color-foreground-muted)] leading-relaxed">
            Conectando nossos alunos ao mercado de trabalho
          </p>
        </div>
      </Container>

      {/* Pipeline Section */}
      <Section variant="alt">
        <Container>
          <h2 className="text-xl md:text-2xl font-bold text-center text-[var(--color-brand-navy)] dark:text-white mb-12">
            Da Sala de Aula ao Mercado de Trabalho
          </h2>

          {/* Pipeline steps */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col md:flex-row items-center">
                {/* Step card */}
                <div className="flex flex-col items-center text-center w-56">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md"
                    style={{ backgroundColor: "var(--color-brand-orange)" }}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "var(--color-brand-orange)" }}
                  >
                    Passo {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop arrow (horizontal) */}
                    <div className="hidden md:flex items-center mx-4">
                      <div
                        className="w-12 h-0.5"
                        style={{ backgroundColor: "var(--color-brand-orange)" }}
                      />
                      <ArrowRight
                        className="h-5 w-5 -ml-1"
                        style={{ color: "var(--color-brand-orange)" }}
                      />
                    </div>
                    {/* Mobile arrow (vertical) */}
                    <div className="flex md:hidden items-center justify-center my-2">
                      <ArrowRight
                        className="h-5 w-5 rotate-90"
                        style={{ color: "var(--color-brand-orange)" }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partner Grid Section */}
      <Section variant="default">
        <Container>
          <h2 className="text-xl md:text-2xl font-bold text-center text-[var(--color-brand-navy)] dark:text-white mb-10">
            Onde Nossos Alunos Trabalham
          </h2>

          {/* Partner cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.nome}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg hover:border-[var(--color-brand-orange)]/30"
              >
                {/* Placeholder logo */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 text-white text-lg font-bold transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor:
                      segmentColors[partner.segmento] || "var(--color-brand-navy)",
                  }}
                >
                  {getInitials(partner.nome)}
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2 leading-tight">
                  {partner.nome}
                </h3>
                <Badge
                  variant="category"
                  color={segmentColors[partner.segmento] || "var(--color-foreground-muted)"}
                >
                  {partner.segmento}
                </Badge>
              </div>
            ))}
          </div>

          {/* Impact numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 pt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-brand-orange), transparent 85%)",
                }}
              >
                <Users
                  className="h-6 w-6"
                  style={{ color: "var(--color-brand-orange)" }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-foreground)]">
                  {siteConfig.stats.students}+
                </p>
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  alunos encaminhados
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-brand-orange), transparent 85%)",
                }}
              >
                <Building2
                  className="h-6 w-6"
                  style={{ color: "var(--color-brand-orange)" }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-foreground)]">
                  {siteConfig.stats.partners}+
                </p>
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  empresas parceiras
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* For Companies Section */}
      <Section variant="dark">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Para Empresas
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Quer contratar nossos alunos qualificados?
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "var(--color-brand-green)" }}
                  />
                  <span className="text-sm font-medium text-white">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="whatsapp" size="lg" href={whatsappUrl}>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Fale Conosco pelo WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                className="border-white/40 text-white hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
