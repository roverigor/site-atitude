"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ContactPageProps {
  courseNames: string[];
}

interface FormData {
  nome: string;
  whatsapp: string;
  curso: string;
}

interface FormErrors {
  nome?: string;
  whatsapp?: string;
}

function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export function ContactPage({ courseNames }: ContactPageProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    curso: "Nao sei ainda",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "whatsapp") {
      setFormData((prev) => ({ ...prev, whatsapp: formatPhoneMask(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (touched[name]) {
      validateField(name, name === "whatsapp" ? formatPhoneMask(value) : value);
    }
  }

  function handleBlur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof FormData]);
  }

  function validateField(name: string, value: string) {
    const newErrors = { ...errors };

    if (name === "nome") {
      if (!value.trim()) {
        newErrors.nome = "Informe seu nome";
      } else if (value.trim().length < 3) {
        newErrors.nome = "Nome deve ter pelo menos 3 caracteres";
      } else {
        delete newErrors.nome;
      }
    }

    if (name === "whatsapp") {
      const digits = value.replace(/\D/g, "");
      if (!digits) {
        newErrors.whatsapp = "Informe seu WhatsApp";
      } else if (!isValidPhone(value)) {
        newErrors.whatsapp = "WhatsApp invalido";
      } else {
        delete newErrors.whatsapp;
      }
    }

    setErrors(newErrors);
    return newErrors;
  }

  function validate(): boolean {
    const nomeErrors = validateField("nome", formData.nome);
    const allErrors = validateField("whatsapp", formData.whatsapp);
    const finalErrors = { ...nomeErrors, ...allErrors };
    setErrors(finalErrors);
    setTouched({ nome: true, whatsapp: true });
    return Object.keys(finalErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    const message = `Novo lead pelo site!\nNome: ${formData.nome}\nWhatsApp: ${formData.whatsapp}\nInteresse: ${formData.curso}`;
    const whatsappUrl = buildWhatsAppUrl({ type: "custom", message });

    window.open(whatsappUrl, "_blank");
    router.push("/obrigado");
  }

  const phoneClean = siteConfig.phone.replace(/\D/g, "");
  const whatsappClean = siteConfig.whatsappNumber;

  return (
    <Section variant="default" className="py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-7 w-7 text-[var(--color-brand-green)]" />
              <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-navy)] dark:text-white">
                Fale Conosco
              </h1>
            </div>
            <p className="text-[var(--color-foreground-muted)] mb-8">
              Preencha o formulario e entraremos em contato pelo WhatsApp.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Nome */}
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium mb-1.5 text-[var(--color-foreground)]"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  onBlur={() => handleBlur("nome")}
                  placeholder="Seu nome completo"
                  className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-background)] text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)]/50 transition-all duration-200 outline-none ${
                    errors.nome && touched.nome
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-brand-green)]/30 focus:border-[var(--color-brand-green)]"
                  }`}
                />
                {errors.nome && touched.nome && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.nome}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-medium mb-1.5 text-[var(--color-foreground)]"
                >
                  WhatsApp
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  onBlur={() => handleBlur("whatsapp")}
                  placeholder="(43) 99999-9999"
                  className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-background)] text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)]/50 transition-all duration-200 outline-none ${
                    errors.whatsapp && touched.whatsapp
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-brand-green)]/30 focus:border-[var(--color-brand-green)]"
                  }`}
                />
                {errors.whatsapp && touched.whatsapp && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.whatsapp}
                  </p>
                )}
              </div>

              {/* Curso de Interesse */}
              <div>
                <label
                  htmlFor="curso"
                  className="block text-sm font-medium mb-1.5 text-[var(--color-foreground)]"
                >
                  Curso de Interesse
                </label>
                <select
                  id="curso"
                  name="curso"
                  value={formData.curso}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--color-brand-green)]/30 focus:border-[var(--color-brand-green)] appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='%23888' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="Nao sei ainda">Nao sei ainda</option>
                  {courseNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Send className="h-5 w-5" />
                Quero mais informacoes
              </Button>
            </form>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="space-y-6"
          >
            {/* Contact Card */}
            <div className="p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] dark:bg-[#1a1a1a]">
              <h2 className="text-lg font-semibold text-[var(--color-brand-navy)] dark:text-white mb-6">
                Informacoes de Contato
              </h2>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[var(--color-brand-green)] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-foreground)]">
                      {siteConfig.address.street}
                    </p>
                    <p className="text-sm text-[var(--color-foreground-muted)]">
                      {siteConfig.address.city} - {siteConfig.address.state},{" "}
                      {siteConfig.address.zip}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[var(--color-brand-green)] shrink-0" />
                  <a
                    href={`tel:+55${phoneClean}`}
                    className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-brand-green)] transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[var(--color-whatsapp)] shrink-0" />
                  <a
                    href={buildWhatsAppUrl({ type: "contact" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-whatsapp)] transition-colors"
                  >
                    WhatsApp: ({whatsappClean.slice(2, 4)}){" "}
                    {whatsappClean.slice(4, 9)}-{whatsappClean.slice(9)}
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[var(--color-brand-green)] shrink-0" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-brand-green)] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[var(--color-brand-green)] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-foreground)]">
                      {siteConfig.hours.weekdays}
                    </p>
                    <p className="text-sm text-[var(--color-foreground-muted)]">
                      {siteConfig.hours.saturday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-foreground-muted)] mb-3">
                  Siga-nos nas redes sociais
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:bg-[var(--color-brand-green)] hover:text-[var(--color-brand-navy)] transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:bg-[var(--color-brand-green)] hover:text-[var(--color-brand-navy)] transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center text-[var(--color-foreground-muted)] hover:bg-[var(--color-brand-green)] hover:text-[var(--color-brand-navy)] transition-all duration-200"
                    aria-label="TikTok"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.76 1.5V6.8a4.83 4.83 0 0 1-1-.11z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="rounded-2xl overflow-hidden border border-[var(--color-border)]"
            >
              <iframe
                title="Localizacao Atitude Ensino"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14500!2d-50.0775!3d-23.8447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
