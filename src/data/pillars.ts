import { Pillar, PillarSlug } from "@/types/course";

export const pillars: Pillar[] = [
  {
    nome: "Ensino",
    slug: "ensino",
    cor: "pillar-ensino",
    corHex: "#6EDD17",
    icone: "GraduationCap",
    tagline: "Cursos profissionalizantes",
    descricao:
      "Formação prática em saúde, beleza, administração, RH, marketing e carreiras profissionais — pronta pro mercado.",
  },
  {
    nome: "Emprego",
    slug: "emprego",
    cor: "pillar-emprego",
    corHex: "#FF4E09",
    icone: "Briefcase",
    tagline: "Colocação no mercado",
    descricao:
      "Acompanhamento de carreira, parcerias com empregadores e suporte do primeiro currículo ao primeiro contracheque.",
    transversal: true,
  },
  {
    nome: "Idiomas",
    slug: "idiomas",
    cor: "pillar-idiomas",
    corHex: "#FF004A",
    icone: "Languages",
    tagline: "Inglês pra todas as idades",
    descricao:
      "Inglês do básico ao avançado, com método próprio e turmas para crianças, adolescentes e adultos.",
  },
  {
    nome: "Tecnologia",
    slug: "tecnologia",
    cor: "pillar-tecnologia",
    corHex: "#570CE8",
    icone: "Cpu",
    tagline: "Tech, design e informática",
    descricao:
      "Informática, programação, design, Excel e cursos interativos — as habilidades digitais que o mercado exige.",
  },
];

export function getPillarBySlug(slug: PillarSlug): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
