"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, ArrowLeft, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function ObrigadoContent() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const phoneClean = siteConfig.phone.replace(/\D/g, "");

  return (
    <Section variant="default">
      <Container>
        <div className="max-w-lg mx-auto text-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <CheckCircle2 className="h-20 w-20 mx-auto text-[var(--color-brand-green)] mb-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--color-brand-navy)] dark:text-white mb-4">
              Obrigado pelo contato!
            </h1>

            <p className="text-[var(--color-foreground-muted)] text-base md:text-lg mb-2 leading-relaxed">
              Recebemos seus dados e em breve entraremos em contato pelo WhatsApp.
            </p>

            <p className="text-[var(--color-foreground-muted)] text-base mb-6">
              Se preferir, voce tambem pode nos ligar:
            </p>

            <a
              href={`tel:+55${phoneClean}`}
              className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)] hover:underline mb-8"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Button variant="primary" href="/">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Home
              </Button>
              <Button variant="outline" href="/cursos">
                <Search className="h-4 w-4" />
                Ver Cursos
              </Button>
            </div>

            <p className="text-sm text-[var(--color-foreground-muted)]">
              Redirecionando para a home em{" "}
              <span className="font-semibold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)]">
                {countdown}
              </span>{" "}
              {countdown === 1 ? "segundo" : "segundos"}...
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
