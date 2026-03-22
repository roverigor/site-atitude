import { Category, CategorySlug } from "@/types/course";

export const categories: Category[] = [
  {
    nome: "Informática",
    slug: "informatica",
    cor: "category-informatica",
    corHex: "#1B1464",
    icone: "Monitor",
    descricao: "Cursos de informática básica e avançada para o mercado de trabalho",
  },
  {
    nome: "Inglês",
    slug: "ingles",
    cor: "category-ingles",
    corHex: "#FF1493",
    icone: "Globe",
    descricao: "Cursos de inglês para todas as idades e níveis",
  },
  {
    nome: "Administração",
    slug: "administracao",
    cor: "category-administracao",
    corHex: "#16A34A",
    icone: "Landmark",
    descricao: "Cursos na área administrativa e gestão empresarial",
  },
  {
    nome: "Saúde",
    slug: "saude",
    cor: "category-saude",
    corHex: "#FF6600",
    icone: "Heart",
    descricao: "Cursos na área da saúde e bem-estar",
  },
  {
    nome: "Beleza",
    slug: "beleza",
    cor: "category-beleza",
    corHex: "#6600FF",
    icone: "Palette",
    descricao: "Cursos de beleza e estética profissional",
  },
  {
    nome: "Tecnologia",
    slug: "tecnologia",
    cor: "category-tecnologia",
    corHex: "#7C3AED",
    icone: "Cpu",
    descricao: "Cursos de tecnologia e programação",
  },
  {
    nome: "Carreiras Pro",
    slug: "carreiras-pro",
    cor: "category-carreiras-pro",
    corHex: "#1E40AF",
    icone: "Briefcase",
    descricao: "Cursos profissionalizantes para carreiras específicas",
  },
  {
    nome: "Interativos",
    slug: "interativos",
    cor: "category-interativos",
    corHex: "#059669",
    icone: "MonitorPlay",
    descricao: "Cursos interativos com aprendizado por computador",
  },
  {
    nome: "Design",
    slug: "design",
    cor: "category-design",
    corHex: "#EA580C",
    icone: "Pen",
    descricao: "Cursos de design gráfico e criação visual",
  },
  {
    nome: "Excel",
    slug: "excel",
    cor: "category-excel",
    corHex: "#15803D",
    icone: "Table",
    descricao: "Cursos especializados em Excel e planilhas",
  },
  {
    nome: "RH e Marketing",
    slug: "rh-marketing",
    cor: "category-rh-marketing",
    corHex: "#0891B2",
    icone: "Megaphone",
    descricao: "Cursos de recursos humanos, marketing e vendas",
  },
];

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
