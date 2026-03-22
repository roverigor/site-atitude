"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Check, MapPin, Clock, Users, BookOpen } from "lucide-react";

/* ─────────────────────────────────────────────
   CONFIGURAÇÃO — preencher antes de subir
───────────────────────────────────────────── */
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_LP_URL || "https://wa.me/PREENCHER";

/* ─────────────────────────────────────────────
   Pixel helper
───────────────────────────────────────────── */
type FbqFn = (command: string, event: string) => void;

function trackFbq(event: string) {
  if (typeof window !== "undefined" && typeof (window as Window & { fbq?: FbqFn }).fbq === "function") {
    (window as Window & { fbq?: FbqFn }).fbq!("track", event);
  }
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function Seal({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-white/90">
      <Check className="w-4 h-4 text-[#E91E8C] flex-shrink-0" />
      {text}
    </span>
  );
}

function DiferencialCard({
  icon,
  title,
  text,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col gap-3"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="font-bold text-[#2D2B7B] text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#2D2B7B] group-hover:text-[#E91E8C] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#E91E8C] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppBtn({
  label = "💬 Quero garantir minha aula gratuita",
  size = "lg",
}: {
  label?: string;
  size?: "lg" | "sm";
}) {
  const handleClick = () => {
    trackFbq("Contact");
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 bg-[#E91E8C] hover:bg-[#c91577] text-white ${
        size === "lg"
          ? "px-8 py-4 text-lg w-full sm:w-auto"
          : "px-6 py-3 text-base"
      }`}
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function LpAulaGratuitaA() {
  const heroRef = useRef<HTMLDivElement>(null);
  const viewContentFired = useRef(false);

  // ViewContent at 50% scroll of hero
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5 && !viewContentFired.current) {
          viewContentFired.current = true;
          trackFbq("ViewContent");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-[family-name:var(--font-poppins)] bg-white">

      {/* ───── HERO ───── */}
      <section
        ref={heroRef}
        className="bg-[#2D2B7B] text-white py-14 px-4 md:py-20"
      >
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          {/* Logo */}
          <Image
            src="/logos/logo_atitude_english_school - colorida.png"
            alt="Atitude English School"
            width={220}
            height={60}
            className="object-contain"
            priority
          />

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            Aprenda inglês de verdade em Ibaiti — do zero, em turmas de no máximo{" "}
            <span className="text-[#E91E8C]">8 alunos.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-base md:text-lg"
          >
            2h30 de aula por encontro. Material incluso. Matrícula zero. Presencial.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full flex flex-col items-center gap-2"
          >
            <p className="text-white/60 text-sm">👇 Clique e fale com a gente agora</p>
            <WhatsAppBtn label="💬 Quero minha aula experimental gratuita" />
          </motion.div>

          {/* Seals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2"
          >
            <Seal text="15 anos em Ibaiti" />
            <Seal text="+1.500 alunos" />
            <Seal text="Turmas de 8" />
            <Seal text="Material incluso" />
          </motion.div>
        </div>
      </section>

      {/* ───── DIFERENCIAIS ───── */}
      <section className="bg-[#F5F5F5] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-[#2D2B7B] text-center mb-10"
          >
            Por que a Atitude funciona quando o resto não funcionou
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DiferencialCard
              delay={0}
              icon={<Users className="w-8 h-8 text-[#E91E8C]" />}
              title="Máximo 8 alunos por turma"
              text="O professor sabe seu nome, seu ritmo e onde você trava. Ninguém fica invisível. Ninguém fica para trás."
            />
            <DiferencialCard
              delay={0.1}
              icon={<Clock className="w-8 h-8 text-[#E91E8C]" />}
              title="2h30 de aula por encontro"
              text="Não 1 hora e tchau. Imersão real em cada encontro. O suficiente para sair de cada aula sentindo que avançou."
            />
            <DiferencialCard
              delay={0.2}
              icon={<BookOpen className="w-8 h-8 text-[#E91E8C]" />}
              title="Material incluso. Matrícula zero."
              text="Sem livro separado. Sem taxa escondida. O que você vê é o que você paga."
            />
            <DiferencialCard
              delay={0.3}
              icon={<MapPin className="w-8 h-8 text-[#E91E8C]" />}
              title="Presencial em Ibaiti"
              text="15 anos na cidade. Professores reais, sala real, resultado real — sem depender de disciplina sozinho."
            />
          </div>
        </div>
      </section>

      {/* ───── PROVA SOCIAL ───── */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-5xl font-bold text-[#E91E8C] mb-2">+1.500</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2B7B] mb-10">
              alunos que começaram do zero
            </h2>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#F5F5F5] rounded-2xl p-8 text-left border-l-4 border-[#E91E8C]"
          >
            <p className="text-gray-700 text-lg italic leading-relaxed mb-4">
              &ldquo;Eu tinha 42 anos e não acreditava que ia aprender.
              Minha esposa me convenceu a fazer uma aula.
              Em 8 meses estava numa entrevista em inglês.&rdquo;
            </p>
            <footer className="text-sm text-gray-500 font-semibold">
              — Aluno da Atitude, Ibaiti
            </footer>
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm text-gray-500"
          >
            Atitude English School · Ibaiti-PR · Desde 2011 · +1.500 alunos formados
          </motion.p>
        </div>
      </section>

      {/* ───── OBJEÇÕES ───── */}
      <section className="bg-[#F5F5F5] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-[#2D2B7B] text-center mb-8"
          >
            Já ouvi isso antes — e eu te respondo
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl px-6 shadow-sm"
          >
            <FaqItem
              question="Não tenho base nenhuma."
              answer='Ótimo. A gente começa do zero mesmo. A maioria dos nossos alunos chegou exatamente assim — sem saber dizer nem "hello" direito.'
            />
            <FaqItem
              question="Já tentei antes e desisti."
              answer="Não foi culpa sua. Foi o formato. Turma de 40, app sozinho, aula de 1 hora — nenhum desses funciona. Turma de 8, professor presente, 2h30 de imersão: é diferente. Venha ver."
            />
            <FaqItem
              question="Não tenho tempo."
              answer="2h30, duas vezes por semana. Se você tem tempo para uma série, tem tempo para mudar sua vida profissional. E temos horários noturnos."
            />
          </motion.div>
        </div>
      </section>

      {/* ───── OFERTA FINAL ───── */}
      <section className="bg-[#2D2B7B] py-16 px-4 text-white">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold"
          >
            Comece com uma aula gratuita. Sem compromisso.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 leading-relaxed max-w-lg"
          >
            Não pedimos que você confie na nossa palavra. Venha fazer uma aula de verdade
            — com os outros alunos, sem demo. Você sente na prática se funciona. E decide
            por conta própria.
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-3 w-full max-w-sm"
          >
            {[
              "🎓 Aula experimental gratuita",
              "📋 Matrícula zero",
              "📦 Material incluso",
              "👥 Turma de no máximo 8",
            ].map((badge) => (
              <div
                key={badge}
                className="bg-white/10 rounded-xl p-3 text-sm font-medium text-center border border-white/20"
              >
                {badge}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <WhatsAppBtn label="💬 Quero garantir minha aula gratuita" />
          </motion.div>
        </div>
      </section>

      {/* ───── RODAPÉ LP ───── */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 text-center">
          <Image
            src="/logos/logo_atitude_english_school - colorida.png"
            alt="Atitude English School"
            width={160}
            height={44}
            className="object-contain"
          />
          <p className="text-xs text-gray-400">
            Atitude English School · Ibaiti-PR · contato@atitudeschool.com.br
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <a href="/politica-de-privacidade" className="hover:text-[#2D2B7B]">
              Política de Privacidade
            </a>
            <button
              onClick={() => {
                trackFbq("Contact");
                window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
              }}
              className="hover:text-[#E91E8C] transition-colors"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
