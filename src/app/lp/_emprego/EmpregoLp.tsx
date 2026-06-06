"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Check,
  ChevronDown,
  ShieldCheck,
  Send,
  Monitor,
  ClipboardList,
  FileCheck,
  Award,
  BookOpen,
  AppWindow,
  FileText,
  Table,
  Presentation,
  BarChart3,
  Lock,
  Globe,
  Cloud,
  Wrench,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import { trackContact, trackLead, trackViewContent } from "@/lib/analytics";

const WA_NUM = "5543984020353";
const WA_MSG =
  "Oi! Vim pelo site e quero saber como funciona o curso pra conseguir meu primeiro emprego.";
const waBase = `https://wa.me/${WA_NUM}`;
const waUrl = `${waBase}?text=${encodeURIComponent(WA_MSG)}`;

const ORANGE = "#FF4E09";
const ORANGE_D = "#E64200";
const NAVY = "#252566";
const LIME = "#6EDD17";

const MODULOS: { Icon: typeof Monitor; name: string; hint: string }[] = [
  { Icon: Monitor, name: "Introdução à Informática", hint: "Os fundamentos para começar do zero" },
  { Icon: AppWindow, name: "Microsoft Windows", hint: "O sistema mais usado no mercado" },
  { Icon: FileText, name: "Word", hint: "Documentos e currículos profissionais" },
  { Icon: Table, name: "Excel — do básico ao avançado", hint: "O diferencial das vagas" },
  { Icon: Presentation, name: "PowerPoint", hint: "Apresentações que impressionam" },
  { Icon: BarChart3, name: "Power BI", hint: "Dados que viram decisão" },
  { Icon: Lock, name: "Segurança digital", hint: "Proteja seus dados" },
  { Icon: Globe, name: "Internet e mídias sociais", hint: "Conectado com autonomia" },
  { Icon: Cloud, name: "Acesso remoto e nuvem", hint: "Seus arquivos em qualquer lugar" },
  { Icon: Wrench, name: "Manutenção de computadores", hint: "Resolva problemas comuns" },
];

/* ─── botão WhatsApp ─── */
function WaBtn({ label, full = false, light = false }: { label: string; full?: boolean; light?: boolean }) {
  return (
    <button
      onClick={() => {
        trackContact();
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }}
      className={`group inline-flex items-center justify-center gap-2 font-bold rounded-full px-7 py-4 text-lg transition-all active:scale-[0.98] ${
        light
          ? "bg-[#6EDD17] text-[#252566] hover:brightness-105"
          : "text-white hover:brightness-110"
      } ${full ? "w-full" : ""}`}
      style={light ? {} : { background: ORANGE }}
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

/* ─── formulário nome + WhatsApp → trackLead + abre WhatsApp ─── */
function LeadForm({ source, idp }: { source: string; idp: string }) {
  const [nome, setNome] = useState("");
  const [wpp, setWpp] = useState("");
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok) return;
    // event_id compartilhado entre Pixel (GTM) e CAPI server-side → dedup
    const eventId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    trackLead({ campaign: "emprego", source, eventId });
    const getCookie = (n: string) =>
      typeof document !== "undefined"
        ? document.cookie.match("(^|;)\\s*" + n + "\\s*=\\s*([^;]+)")?.pop()
        : undefined;
    const msg = `Oi! Meu nome é ${nome}. Vim pelo site e quero saber como funciona o curso pra conseguir meu primeiro emprego.${wpp ? ` Meu WhatsApp: ${wpp}.` : ""}`;
    // captura o lead no /api/lead (encaminha pro Athy + dispara Meta CAPI) — fire-and-forget
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        whatsapp: wpp,
        mensagem: msg,
        origem: source,
        eventId,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        eventSourceUrl:
          typeof window !== "undefined" ? window.location.href : undefined,
      }),
    }).catch(() => {});
    window.open(`${waBase}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };
  return (
    <form onSubmit={submit} className="bg-white rounded-3xl p-6 shadow-xl shadow-black/10 text-left">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#FFE2D2", color: ORANGE }}>
          <Send className="w-4 h-4" />
        </span>
        <h3 className="font-extrabold text-[#252566] text-lg">Garanta sua vaga agora</h3>
      </div>
      <p className="text-sm text-[#6B6BB4] mb-4">Preencha e a gente fala com você pelo WhatsApp.</p>
      <label className="block text-sm font-semibold text-[#252566] mb-1" htmlFor={`n${idp}`}>Nome</label>
      <input id={`n${idp}`} value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Seu nome completo"
        className="w-full mb-3 px-4 py-3 rounded-xl border border-[#E6E6F2] focus:outline-none focus:border-[#FF4E09] focus:ring-4 focus:ring-[#FF4E09]/15" />
      <label className="block text-sm font-semibold text-[#252566] mb-1" htmlFor={`w${idp}`}>WhatsApp</label>
      <input id={`w${idp}`} value={wpp} onChange={(e) => setWpp(e.target.value)} required type="tel" inputMode="tel" placeholder="(43) 99999-0000"
        className="w-full mb-3 px-4 py-3 rounded-xl border border-[#E6E6F2] focus:outline-none focus:border-[#FF4E09] focus:ring-4 focus:ring-[#FF4E09]/15" />
      <label className="flex items-start gap-2 text-xs text-[#6B6BB4] mb-4 cursor-pointer">
        <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} required className="mt-0.5 w-4 h-4 accent-[#FF4E09]" />
        Autorizo a Atitude a entrar em contato comigo pelos dados informados (LGPD).
      </label>
      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 font-bold text-white rounded-full px-6 py-4 text-lg transition-all active:scale-[0.98] hover:brightness-110" style={{ background: ORANGE }}>
        Quero falar com a Atitude <ArrowRight className="w-4 h-4" />
      </button>
      <p className="flex items-center gap-1.5 text-xs text-[#6B6BB4] mt-3"><ShieldCheck className="w-4 h-4" /> Resposta rápida no WhatsApp · sem compromisso</p>
    </form>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E6E6F2] last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4 group" aria-expanded={open}>
        <span className="font-semibold text-[#252566] group-hover:text-[#FF4E09] transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: ORANGE }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pb-5 text-[#6B6BB4] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ETAPAS = [
  { Icon: Monitor, t: "Aprende fazendo", d: "Word, Excel, internet e e-mail profissional, com o professor corrigindo o seu — não só assistindo vídeo." },
  { Icon: ClipboardList, t: "Treina como no trabalho", d: "Simula as tarefas reais de um escritório. Você chega pronto, não cru." },
  { Icon: FileCheck, t: "Monta seu portfólio", d: "Sai com trabalhos prontos pra mostrar, currículo montado e treino de entrevista." },
  { Icon: Send, t: "É apresentado pra vaga", d: "A escola te encaminha pras empresas parceiras de Ibaiti. Você não corre atrás sozinho." },
];

const PARA_QUEM: { Icon: typeof Monitor; t: string }[] = [
  { Icon: Briefcase, t: "Conquistar o seu primeiro emprego" },
  { Icon: FileText, t: "Melhorar o currículo e se destacar nas vagas" },
  { Icon: GraduationCap, t: "Trocar de área e sair do trabalho braçal" },
  { Icon: BookOpen, t: "Prestar concursos com mais preparo" },
  { Icon: Users, t: "Usar o computador com autonomia e confiança" },
];

export default function EmpregoLp({ variant }: { variant: "m" | "f" }) {
  const imgBase = variant === "f" ? "/lp/emprego-f" : "/lp/emprego";
  const source = variant === "f" ? "lp-emprego-f" : "lp-emprego";
  const heroRef = useRef<HTMLDivElement>(null);
  const vc = useRef(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.5 && !vc.current) {
          vc.current = true;
          trackViewContent(source);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [source]);

  return (
    <div className="bg-[#FFF8EF] text-[#252566]">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="bg-[#FFF8EF]">
        <div className="max-w-5xl mx-auto px-5 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="relative w-full rounded-3xl overflow-hidden border-[3px] mb-6" style={{ borderColor: ORANGE }}>
              <Image src={`${imgBase}/hero-wide.webp`} alt="Jovem em entrevista de emprego — Atitude Ibaiti" width={1536} height={1024} priority className="hidden md:block w-full h-[300px] object-cover" />
              <Image src={`${imgBase}/hero.webp`} alt="Jovem em entrevista de emprego — Atitude Ibaiti" width={1024} height={1536} priority className="md:hidden w-full h-[280px] object-cover object-[center_26%]" />
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
              <span className="w-6 h-[3px] rounded-full" style={{ background: ORANGE }} /> Primeiro emprego · Ibaiti
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-4">
              Como ter experiência se ninguém te dá <span style={{ color: ORANGE }}>o primeiro emprego?</span>
            </h1>
            <p className="text-[#6B6BB4] text-base md:text-lg mb-6 max-w-md">
              Esse beco trava quase todo jovem. Na Atitude você aprende a usar o computador na prática, monta seu portfólio e a gente te apresenta pras empresas daqui de Ibaiti.
            </p>
            <div className="hidden md:block"><WaBtn label="Falar no WhatsApp" /></div>
            <div className="flex flex-wrap gap-6 mt-7">
              <div><div className="text-2xl font-extrabold" style={{ color: ORANGE }}>+2.000</div><div className="text-xs text-[#6B6BB4]">alunos já formados</div></div>
              <div><div className="text-2xl font-extrabold" style={{ color: ORANGE }}>4</div><div className="text-xs text-[#6B6BB4]">etapas até a vaga</div></div>
              <div className="flex items-center gap-2"><Award className="w-6 h-6" style={{ color: LIME }} /><div className="text-xs text-[#6B6BB4] max-w-[110px]">Encaminhamento + certificado</div></div>
            </div>
          </div>
          <div className="md:sticky md:top-6"><LeadForm source={source} idp="1" /></div>
        </div>
      </section>

      {/* ===== DOR ===== */}
      <section className="bg-white py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            <span className="w-6 h-[3px] rounded-full" style={{ background: ORANGE }} /> Você faz tudo certo. E nada.
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Você entrega currículo e ninguém te chama. Por quê?</h2>
          <p className="text-[#3B3B8C] text-lg leading-relaxed">
            A verdade que ninguém te conta: o problema quase nunca é você. Faltam duas coisas — <strong>saber usar o computador de verdade</strong> (quase toda vaga pede) e ter <strong>alguém que te apresente</strong> pra quem está contratando. É exatamente isso que a Atitude resolve.
          </p>
        </div>
      </section>

      {/* ===== MÉTODO ===== */}
      <section className="bg-[#FAEFE0] py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
              <span className="w-6 h-[3px] rounded-full" style={{ background: ORANGE }} /> Como funciona
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">O método &quot;Do Zero ao 1º Emprego&quot;</h2>
            <p className="text-[#6B6BB4] text-lg">Não é cursinho solto. É um caminho com 4 etapas pra te levar do &quot;não sei nada&quot; até estar na frente de quem contrata.</p>
          </div>
          <div className="grid gap-4">
            {ETAPAS.map(({ Icon, t, d }, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-[#E6E6F2]">
                <span className="flex-none w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-white" style={{ background: i === 3 ? LIME : ORANGE, color: i === 3 ? NAVY : "#fff" }}>{i + 1}</span>
                <div>
                  <h3 className="font-extrabold text-lg flex items-center gap-2"><Icon className="w-5 h-5" style={{ color: ORANGE }} /> {t}</h3>
                  <p className="text-[#3B3B8C] text-sm mt-1">{d}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(110,221,23,.12)", borderLeft: `4px solid ${LIME}` }}>
            <ShieldCheck className="w-5 h-5 flex-none" style={{ color: "#5BC112" }} />
            <span className="font-semibold text-sm">E você não caminha sozinho: a gente acompanha do primeiro clique até você concluir.</span>
          </div>
        </div>
      </section>

      {/* ===== PARA QUEM É ===== */}
      <section className="bg-[#FFF8EF] py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Este curso é ideal pra você que quer:</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PARA_QUEM.map(({ Icon, t }) => (
              <div key={t} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[#E6E6F2]">
                <span className="flex-none w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FFE2D2", color: ORANGE }}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="font-medium text-[#252566]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTEÚDO (módulos) ===== */}
      <section className="bg-[#FAEFE0] py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ORANGE }}>
            <span className="w-6 h-[3px] rounded-full" style={{ background: ORANGE }} /> Conteúdo completo
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">O que você vai aprender</h2>
          <p className="text-[#6B6BB4] mb-6">Do primeiro clique ao Excel avançado e Power BI — 10 módulos, na ordem certa.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {MODULOS.map(({ Icon, name, hint }, i) => (
              <div key={name} className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[#E6E6F2]">
                <span className="flex-none text-sm font-extrabold w-7 text-center" style={{ color: ORANGE }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-none w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#FFE2D2", color: ORANGE }}><Icon className="w-5 h-5" /></span>
                <span><span className="block font-bold text-[#252566] text-sm leading-tight">{name}</span><span className="block text-xs text-[#6B6BB4]">{hint}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROVA ===== */}
      <section className="py-16 px-5 text-white" style={{ background: NAVY }}>
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 text-white/85">
            <span className="w-6 h-[3px] rounded-full bg-white/60" /> Confiança de quem já passou por aqui
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8">Não é promessa. <span style={{ color: LIME }}>É histórico.</span></h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-3">
              <Image src={`${imgBase}/certificado.webp`} alt="Certificado de conclusão Atitude" width={900} height={620} className="w-full h-auto rounded-lg" />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5"><div className="text-4xl font-extrabold" style={{ color: ORANGE }}>+2.000</div><div className="text-white/70 text-sm">alunos formados pela Atitude</div></div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4"><Award className="w-7 h-7" style={{ color: LIME }} /><div><div className="font-bold">Certificado de conclusão</div><div className="text-white/60 text-xs">Para currículo e concursos</div></div></div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4"><BookOpen className="w-7 h-7" style={{ color: ORANGE }} /><div><div className="font-bold">Material impresso</div><div className="text-white/60 text-xs">Apostilas inclusas</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OFERTA / CTA FINAL ===== */}
      <section className="bg-[#FFF8EF] py-16 px-5">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 mb-5" style={{ background: "#FFE2D2", color: ORANGE_D }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ORANGE }} /> Turmas pequenas · vagas limitadas
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">A vaga existe. <span style={{ color: ORANGE }}>Você vai estar pronto?</span></h2>
            <p className="text-[#3B3B8C] text-lg mb-4">Cada semana, a vaga vai pra quem se preparou. Deixe seu contato ou chame no WhatsApp — a Atitude Ibaiti responde rápido e te mostra como começar.</p>
            <ul className="space-y-2 mb-6">
              {["Presencial em Ibaiti ou online ao vivo", "Certificado + apostilas inclusos", "Encaminhamento pras empresas parceiras"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[#252566]"><Check className="w-4 h-4 flex-none" style={{ color: ORANGE }} /> {t}</li>
              ))}
            </ul>
            <WaBtn label="Quero falar agora" />
          </div>
          <LeadForm source={source} idp="2" />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Perguntas rápidas</h2>
          <div className="rounded-2xl border border-[#E6E6F2] px-6">
            <Faq q="Não sei nada de computador. Vou conseguir?" a="Vai. A turma é de gente começando do zero igual você. A gente vai do 'como liga' no seu ritmo, com o professor do lado." />
            <Faq q="Vocês garantem emprego?" a="Não — e quem garante está mentindo. O que a gente faz de verdade é te preparar e te apresentar pras empresas parceiras daqui. A porta a gente abre; o caminho a gente faz junto." />
            <Faq q="É presencial ou online?" a="Você escolhe: presencial aqui em Ibaiti ou online ao vivo." />
            <Faq q="Quanto custa?" a="A gente tem condições que cabem no seu bolso — e te explica tudo certinho no WhatsApp, do jeito que encaixa pra você." />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#FAEFE0] border-t border-[#E6E6F2] py-8 px-5">
        <div className="max-w-2xl mx-auto text-center text-sm text-[#6B6BB4]">
          <p className="font-bold text-[#252566] mb-1">Atitude — Ensino e Tecnologia · Unidade Ibaiti</p>
          <p>(43) 9 8402-0353 · @atitudeibaiti</p>
          <div className="flex justify-center gap-5 mt-3 text-xs">
            <a href="/politica-privacidade" className="hover:text-[#252566]">Política de Privacidade</a>
            <button onClick={() => { trackContact(); window.open(waUrl, "_blank", "noopener,noreferrer"); }} className="hover:text-[#FF4E09]">WhatsApp</button>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed bottom-0 inset-x-0 p-3 bg-[#252566] shadow-2xl md:hidden z-50">
        <button onClick={() => { trackContact(); window.open(waUrl, "_blank", "noopener,noreferrer"); }}
          className="w-full flex items-center justify-center gap-2 font-extrabold py-4 rounded-full text-[#252566] active:scale-[0.98]" style={{ background: LIME }}>
          <MessageCircle className="w-5 h-5" /> Fala com a gente no WhatsApp
        </button>
      </div>
    </div>
  );
}
