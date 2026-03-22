import type { BlogCategoryInfo, BlogCategory } from "@/types/blog";

export const blogCategories: BlogCategoryInfo[] = [
  {
    nome: "Informática",
    slug: "informatica",
    cor: "blog-informatica",
    corHex: "#2563EB",
    icone: "Monitor",
    descricao: "Artigos sobre informática, tecnologia e o mundo digital",
  },
  {
    nome: "Inglês",
    slug: "ingles",
    cor: "blog-ingles",
    corHex: "#7C3AED",
    icone: "Globe",
    descricao: "Dicas e conteúdos para aprender inglês de forma prática",
  },
  {
    nome: "Carreira",
    slug: "carreira",
    cor: "blog-carreira",
    corHex: "#059669",
    icone: "Briefcase",
    descricao: "Orientação profissional e dicas para sua carreira",
  },
  {
    nome: "Dicas",
    slug: "dicas",
    cor: "blog-dicas",
    corHex: "#D97706",
    icone: "Lightbulb",
    descricao: "Dicas práticas para o dia a dia e produtividade",
  },
  {
    nome: "Novidades",
    slug: "novidades",
    cor: "blog-novidades",
    corHex: "#E11D48",
    icone: "Newspaper",
    descricao: "Novidades e notícias da Atitude Ensino",
  },
];

export function getBlogCategoryBySlug(slug: BlogCategory): BlogCategoryInfo | undefined {
  return blogCategories.find((c) => c.slug === slug);
}
