import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ConsentLink } from "@/components/consent/ConsentLink";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Atitude Ensino trata seus dados pessoais — conformidade LGPD.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-05-24";

export default function PoliticaPrivacidadePage() {
  return (
    <Section variant="default">
      <Container className="max-w-3xl py-12 md:py-20">
        <h1 className="h1 text-[var(--color-brand-navy)] dark:text-white mb-2">
          Política de Privacidade
        </h1>
        <p className="text-[var(--color-foreground-muted)] mb-8">
          Última atualização: {LAST_UPDATED}
        </p>

        <h2 className="h2 mt-12 mb-4">1. Quem somos</h2>
        <p className="body mb-4">
          A <strong>Atitude Ensino</strong> é uma instituição de ensino com sede
          em Ibaiti-PR, inscrita no CNPJ{" "}
          <span>28.128.870/0001-60</span>. Endereço:
          Av. Dra Fernandina do Amaral Gentile, 162 — Centro — Ibaiti/PR — CEP 84900-000. Contato:{" "}
          <a
            className="underline text-[var(--color-brand-purple)]"
            href="mailto:contato@atitudeensino.com.br"
          >
            contato@atitudeensino.com.br
          </a>
          .
        </p>

        <h2 className="h2 mt-12 mb-4">2. Quais dados coletamos</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Dados fornecidos por você:</strong> nome, WhatsApp, curso de
            interesse — coletados via formulários do site.
          </li>
          <li>
            <strong>Dados de navegação:</strong> páginas visitadas, dispositivo,
            origem do tráfego — coletados via Google Tag Manager (apenas com
            seu consentimento).
          </li>
          <li>
            <strong>Cookies essenciais:</strong> preferência de tema
            (claro/escuro), preferência de consentimento — não exigem
            consentimento (LGPD art. 7º, IX).
          </li>
        </ul>

        <h2 className="h2 mt-12 mb-4">3. Por que coletamos</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>Responder ao seu contato via WhatsApp e oferecer informações sobre cursos.</li>
          <li>Medir o desempenho do site (Google Analytics 4).</li>
          <li>Veicular anúncios relevantes (Meta Pixel, Google Ads) — apenas com consentimento.</li>
          <li>Lembrar suas preferências (tema, consentimento de cookies).</li>
        </ul>

        <h2 className="h2 mt-12 mb-4">4. Bases legais (LGPD art. 7º)</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Consentimento (I):</strong> cookies de analytics, ads e marketing.
          </li>
          <li>
            <strong>Execução de contrato (V):</strong> tratamento de dados de matrícula.
          </li>
          <li>
            <strong>Legítimo interesse (IX):</strong> cookies essenciais ao funcionamento do site.
          </li>
        </ul>

        <h2 className="h2 mt-12 mb-4">5. Cookies utilizados</h2>
        <p className="body mb-4">
          <strong>Essenciais</strong> (sempre ativos): preferência de tema,
          preferência de consentimento.
        </p>
        <p className="body mb-4">
          <strong>Analytics</strong> (com consentimento): Google Analytics 4 —
          mede páginas vistas, eventos, origem do tráfego.
        </p>
        <p className="body mb-4">
          <strong>Marketing</strong> (com consentimento): Meta Pixel
          (Facebook/Instagram), Google Ads — permitem remarketing e mensuração
          de conversões.
        </p>

        <h2 className="h2 mt-12 mb-4">6. Compartilhamento</h2>
        <p className="body mb-4">
          Dados anonimizados de navegação são compartilhados com Google
          (Analytics, Ads, Tag Manager) e Meta (Pixel) apenas quando você
          consente. Dados fornecidos em formulários (nome, WhatsApp) são
          enviados ao WhatsApp do nosso time comercial e não são vendidos a
          terceiros.
        </p>

        <h2 className="h2 mt-12 mb-4">7. Transferência internacional</h2>
        <p className="body mb-4">
          Google e Meta processam dados em servidores fora do Brasil (EUA, União
          Europeia). Essas transferências seguem mecanismos legais previstos na
          LGPD (art. 33) e nos Termos de Uso desses provedores.
        </p>

        <h2 className="h2 mt-12 mb-4">8. Seus direitos (LGPD art. 18)</h2>
        <p className="body mb-4">
          Você tem direito a: confirmar tratamento, acessar seus dados, corrigir
          dados incompletos, anonimizar/bloquear/eliminar dados desnecessários,
          portar dados, eliminar dados tratados com consentimento, ser
          informado sobre compartilhamentos, ser informado sobre
          não-consentimento, e revogar consentimento.
        </p>

        <h2 className="h2 mt-12 mb-4">9. Como exercer seus direitos</h2>
        <p className="body mb-4">
          Envie email para{" "}
          <a
            className="underline text-[var(--color-brand-purple)]"
            href="mailto:contato@atitudeensino.com.br"
          >
            contato@atitudeensino.com.br
          </a>{" "}
          ou use o link de{" "}
          <ConsentLink className="underline text-[var(--color-brand-purple)]" />{" "}
          abaixo pra revogar o consentimento de cookies.
        </p>

        <h2 className="h2 mt-12 mb-4">10. Retenção</h2>
        <ul className="body list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Leads (nome, WhatsApp):</strong> 24 meses, ou até pedido de exclusão.
          </li>
          <li>
            <strong>Cookies essenciais:</strong> 1 ano (preferências), 6 meses (consentimento).
          </li>
          <li>
            <strong>Cookies analytics/marketing:</strong> conforme política do
            Google/Meta (geralmente 14 a 26 meses).
          </li>
        </ul>

        <h2 className="h2 mt-12 mb-4">11. Encarregado pelo tratamento (DPO)</h2>
        <p className="body mb-4">
          Encarregado: <span>Igor Rover</span>. Email:{" "}
          <a
            className="underline text-[var(--color-brand-purple)]"
            href="mailto:contato@atitudeensino.com.br"
          >
            contato@atitudeensino.com.br
          </a>
          .
        </p>

        <h2 className="h2 mt-12 mb-4">12. Atualizações desta política</h2>
        <p className="body mb-4">
          Esta política pode ser atualizada. Mudanças relevantes serão
          informadas via banner ou comunicação direta.
        </p>
      </Container>
    </Section>
  );
}
