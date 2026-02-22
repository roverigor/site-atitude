"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Quais cursos estao disponiveis?", a: "Temos mais de 40 cursos nas areas de informatica, ingles, administracao, saude, beleza, tecnologia e muito mais. Confira nosso catalogo completo na pagina de cursos." },
  { q: "Como funciona a matricula?", a: "A matricula e simples! Voce pode entrar em contato pelo WhatsApp ou visitar nossa escola. Trazendo RG, CPF e comprovante de endereco, a matricula e feita na hora." },
  { q: "Qual o valor dos cursos?", a: "Os valores variam conforme o curso. Oferecemos parcelamento em ate 12x e desconto para pagamento pontual. Entre em contato para saber o valor do curso que te interessa." },
  { q: "Tem apostila?", a: "Sim! Todos os nossos cursos incluem apostila impressa propria. O aluno leva pra casa e pode consultar sempre que precisar." },
  { q: "Como funciona o ingles online?", a: "As aulas de ingles acontecem ao vivo pelo Google Meet com professores fluentes. Voce pode assistir de qualquer lugar, basta ter um celular ou computador com internet." },
  { q: "Tem estagio?", a: "Sim! Temos parceria com empresas da regiao e encaminhamos nossos alunos para estagios e oportunidades de emprego apos a conclusao do curso." },
  { q: "Qual o horario de funcionamento?", a: "Funcionamos de segunda a sexta das 8h as 21h e aos sabados das 8h as 12h. Os horarios dos cursos variam - consulte a disponibilidade." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-20 bg-[var(--color-background)]">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-[var(--color-brand-navy)] dark:text-white">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[var(--color-border)]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left font-medium hover:text-[var(--color-brand-navy)] dark:hover:text-[var(--color-brand-green)] transition-colors"
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform duration-300", open === i && "rotate-180")} />
              </button>
              <div className={cn("overflow-hidden transition-all duration-300", open === i ? "max-h-96 pb-4" : "max-h-0")}>
                <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
