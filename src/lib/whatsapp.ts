import { siteConfig } from "@/data/site";

export type WhatsAppContext =
  | { type: "home" }
  | { type: "course"; courseName: string }
  | { type: "english" }
  | { type: "contact" }
  | { type: "partner" }
  | { type: "custom"; message: string };

const messages: Record<string, (ctx: WhatsAppContext) => string> = {
  home: () =>
    "Oi! Vi o site da Atitude Ensino e quero saber mais sobre os cursos.",
  course: (ctx) =>
    `Oi! Tenho interesse no curso de ${(ctx as { type: "course"; courseName: string }).courseName}. Pode me dar mais informacoes?`,
  english: () =>
    "Oi! Quero saber sobre os cursos de ingles da Atitude English School.",
  contact: () => "Oi! Quero falar com a Atitude Ensino.",
  partner: () =>
    "Oi! Tenho interesse em ser parceiro da Atitude Ensino.",
  custom: (ctx) => (ctx as { type: "custom"; message: string }).message,
};

export function buildWhatsAppUrl(context: WhatsAppContext): string {
  const message = messages[context.type](context);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
