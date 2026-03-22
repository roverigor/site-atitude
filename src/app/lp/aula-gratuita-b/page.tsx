"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  Check,
  Star,
  Users,
  Clock,
  BookOpen,
  MapPin,
  Send,
} from "lucide-react";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_LP_URL || "https://wa.me/PREENCHER";

type FbqFn = (command: string, event: string) => void;
function trackFbq(event: string) {
  if (
    typeof window !== "undefined" &&
    typeof (window as Window & { fbq?: FbqFn }).fbq === "function"
  ) {
    (window as Window & { fbq?: FbqFn }).fbq!("track", event);
  }
}

/* ─── FAQ Item ───────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-semibold text-white group-hover:text-[#E91E8C] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#E91E8C] flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/70 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Lead Form ──────────────────────────────── */
function LeadForm({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", whatsapp: "", mensagem: "" });
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string }>({});
  const [loading, setLoading] = useState(false);

  function mask(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "WhatsApp inválido";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, origem: "lp-b" }),
      });
    } catch { /* continue */ }
    trackFbq("Lead");
    router.push("/obrigado");
  }

  const inputBase =
    "w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#E91E8C]/20 bg-white";

  return (
    <div ref={formRef} className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl shadow-[#2D2B7B]/15">
      <div className="text-center mb-6">
        <h3 className="text-[#2D2B7B] font-bold text-xl mb-1">
          Reserve sua vaga agora
        </h3>
        <p className="text-gray-400 text-sm">Gratuito. Sem compromisso.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Nome completo <span className="text-[#E91E8C]">*</span>
          </label>
          <input
            id="nome"
            type="text"
            value={form.nome}
            onChange={(e) => {
              setForm((f) => ({ ...f, nome: e.target.value }));
              setErrors((err) => ({ ...err, nome: undefined }));
            }}
            placeholder="Seu nome completo"
            className={`${inputBase} ${
              errors.nome
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-[#E91E8C]"
            }`}
          />
          {errors.nome && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span>⚠</span> {errors.nome}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            WhatsApp <span className="text-[#E91E8C]">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            inputMode="numeric"
            value={form.whatsapp}
            onChange={(e) => {
              setForm((f) => ({ ...f, whatsapp: mask(e.target.value) }));
              setErrors((err) => ({ ...err, whatsapp: undefined }));
            }}
            placeholder="(00) 00000-0000"
            className={`${inputBase} ${
              errors.whatsapp
                ? "border-red-400 focus:border-red-400"
                : "border-gray-200 focus:border-[#E91E8C]"
            }`}
          />
          {errors.whatsapp && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span>⚠</span> {errors.whatsapp}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Mensagem{" "}
            <span className="text-gray-300 font-normal normal-case">(opcional)</span>
          </label>
          <textarea
            id="mensagem"
            value={form.mensagem}
            onChange={(e) => setForm((f) => ({ ...f, mensagem: e.target.value }))}
            placeholder="Conte um pouco sobre você..."
            rows={3}
            className={`${inputBase} border-gray-200 focus:border-[#E91E8C] resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#E91E8C] hover:bg-[#d01070] disabled:opacity-60 text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#E91E8C]/30 active:scale-[0.98] transition-all duration-200 text-base mt-1"
        >
          {loading ? (
            <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Quero minha aula gratuita
            </>
          )}
        </button>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-300">ou</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <button
          type="button"
          onClick={() => {
            trackFbq("Contact");
            window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
          }}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] font-bold py-3.5 rounded-2xl hover:bg-[#25D366]/5 active:scale-[0.98] transition-all duration-200 text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Prefere falar pelo WhatsApp?
        </button>
      </form>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────── */
export default function LpAulaGratuitaB() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const vcFired = useRef(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.5 && !vcFired.current) {
          vcFired.current = true;
          trackFbq("ViewContent");
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="font-[family-name:var(--font-poppins)] bg-white">

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #2d2b7b 0%, #1a1850 60%, #0f0e35 100%)",
        }}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E91E8C]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-[#2D2B7B]/60 blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-5 py-16 md:py-24 flex flex-col items-center text-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Image
              src="/logos/logo_atitude_english_school - colorida.png"
              alt="Atitude English School"
              width={200}
              height={55}
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#E91E8C] animate-pulse" />
            Vagas abertas para a próxima turma
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            Aprenda inglês em Ibaiti —{" "}
            <span className="text-[#E91E8C]">do zero</span>, em turmas de{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #E91E8C, #ff6ec4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              no máximo 8 alunos.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-base md:text-lg max-w-lg"
          >
            2h30 de aula por encontro · Material incluso · Matrícula zero · Presencial
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center gap-2 font-bold rounded-2xl bg-[#E91E8C] text-white shadow-[0_4px_24px_rgba(233,30,140,0.45)] hover:shadow-[0_6px_32px_rgba(233,30,140,0.6)] hover:bg-[#d01070] active:scale-[0.98] transition-all duration-200 overflow-hidden px-8 py-4 text-lg"
            >
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">👇 Quero minha aula experimental gratuita</span>
            </button>
            <p className="text-white/40 text-xs">
              Grátis. Sem compromisso. Sem cartão de crédito.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E91E8C] text-[#E91E8C]" />
              ))}
            </div>
            <span className="text-white/60 text-sm">
              4.9 · +1.500 alunos em Ibaiti
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-5 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { n: "15", label: "anos em Ibaiti" },
            { n: "+1.500", label: "alunos formados" },
            { n: "8", label: "alunos por turma" },
            { n: "2h30", label: "de aula por encontro" },
          ].map(({ n, label }) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-[#2D2B7B]">{n}</span>
              <span className="text-xs text-gray-500 mt-0.5">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ DIFERENCIAIS ══════════ */}
      <section className="bg-[#F7F8FF] py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E91E8C] mb-3">
              Por que somos diferentes
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2B7B]">
              Por que a Atitude funciona quando o resto não funcionou
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { Icon: Users, color: "#E91E8C", bg: "bg-pink-50", title: "Máximo 8 alunos por turma", text: "O professor sabe seu nome, seu ritmo e onde você trava. Ninguém fica invisível. Ninguém fica para trás." },
              { Icon: Clock, color: "#2D2B7B", bg: "bg-indigo-50", title: "2h30 de aula por encontro", text: "Não 1 hora e tchau. Imersão real em cada encontro. O suficiente para sair de cada aula sentindo que avançou." },
              { Icon: BookOpen, color: "#E91E8C", bg: "bg-pink-50", title: "Material incluso. Matrícula zero.", text: "Sem livro separado. Sem taxa escondida. O que você vê é o que você paga." },
              { Icon: MapPin, color: "#2D2B7B", bg: "bg-indigo-50", title: "Presencial em Ibaiti", text: "15 anos na cidade. Professores reais, sala real, resultado real — sem depender de disciplina sozinho." },
            ].map(({ Icon, color, bg, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${bg} mb-4`}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="font-bold text-[#2D2B7B] text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROVA SOCIAL ══════════ */}
      <section className="bg-white py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E91E8C] mb-3">
              Histórias reais
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2B7B]">
              +1.500 alunos que começaram do zero
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#2D2B7B] to-[#1a1850] rounded-3xl p-8 md:p-10 text-white"
          >
            <span className="absolute top-4 left-6 text-8xl font-serif leading-none text-[#E91E8C]/20 select-none" aria-hidden>
              &ldquo;
            </span>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E91E8C] text-[#E91E8C]" />
              ))}
            </div>
            <p className="text-lg md:text-xl italic leading-relaxed mb-6 relative z-10">
              Eu tinha 42 anos e não acreditava que ia aprender.
              Minha esposa me convenceu a fazer uma aula.
              Em 8 meses estava numa entrevista em inglês.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E91E8C]/30 flex items-center justify-center text-[#E91E8C] font-bold text-sm">A</div>
              <div>
                <p className="font-semibold text-sm">Aluno da Atitude</p>
                <p className="text-white/50 text-xs">Ibaiti-PR</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ OBJEÇÕES ══════════ */}
      <section
        className="py-20 px-5"
        style={{ background: "radial-gradient(ellipse at 80% 20%, #2d2b7b 0%, #1a1850 70%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E91E8C] mb-3">
              Respostas diretas
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Já ouvi isso antes — e eu te respondo
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 divide-y divide-white/10"
          >
            <FaqItem q="Não tenho base nenhuma." a='Ótimo. A gente começa do zero mesmo. A maioria dos nossos alunos chegou exatamente assim — sem saber dizer nem "hello" direito.' />
            <FaqItem q="Já tentei antes e desisti." a="Não foi culpa sua. Foi o formato. Turma de 40, app sozinho, aula de 1 hora — nenhum desses funciona. Turma de 8, professor presente, 2h30 de imersão: é diferente. Venha ver." />
            <FaqItem q="Não tenho tempo." a="2h30, duas vezes por semana. Se você tem tempo para uma série, tem tempo para mudar sua vida profissional. E temos horários noturnos." />
          </motion.div>
        </div>
      </section>

      {/* ══════════ OFERTA FINAL + FORMULÁRIO ══════════ */}
      <section className="bg-[#F7F8FF] py-20 px-5">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="inline-flex items-center gap-1.5 bg-[#E91E8C]/10 text-[#E91E8C] text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E91E8C] animate-pulse" />
              Vagas limitadas por turma
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2B7B] mb-3">
              Comece com uma aula gratuita.{" "}
              <span className="text-[#E91E8C]">Sem compromisso.</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Preencha o formulário e vamos entrar em contato pelo WhatsApp.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <LeadForm formRef={formRef} />
          </motion.div>

          {/* Trust row */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2"
          >
            {[
              "🎓 Aula gratuita",
              "📋 Matrícula zero",
              "📦 Material incluso",
              "👥 Turma de 8",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Check className="w-3.5 h-3.5 text-[#E91E8C]" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ══════════ FOOTER LP ══════════ */}
      <footer className="bg-white border-t border-gray-100 py-8 px-5">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-3 text-center">
          <Image
            src="/logos/logo_atitude_english_school - colorida.png"
            alt="Atitude English School"
            width={140}
            height={38}
            className="object-contain opacity-80"
          />
          <p className="text-xs text-gray-400">
            Atitude English School · Ibaiti-PR · contato@atitudeschool.com.br
          </p>
          <div className="flex gap-5 text-xs text-gray-400">
            <a href="/politica-de-privacidade" className="hover:text-[#2D2B7B] transition-colors">
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

      {/* ══════════ STICKY MOBILE CTA ══════════ */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-2xl shadow-black/20 sm:hidden z-50">
        <button
          onClick={scrollToForm}
          className="w-full flex items-center justify-center gap-2 bg-[#E91E8C] hover:bg-[#d01070] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#E91E8C]/30 active:scale-[0.98] transition-all"
        >
          <Send className="w-4 h-4" />
          Garantir minha aula gratuita
        </button>
      </div>
    </div>
  );
}
