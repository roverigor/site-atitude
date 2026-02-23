import type { BlogCategoryInfo, BlogCategory } from "@/types/blog";

export const blogCategories: BlogCategoryInfo[] = [
  {
    nome: "Informatica",
    slug: "informatica",
    cor: "blog-informatica",
    corHex: "#2563EB",
    icone: "Monitor",
    descricao: "Artigos sobre informatica, tecnologia e o mundo digital",
  },
  {
    nome: "Ingles",
    slug: "ingles",
    cor: "blog-ingles",
    corHex: "#7C3AED",
    icone: "Globe",
    descricao: "Dicas e conteudos para aprender ingles de forma pratica",
  },
  {
    nome: "Carreira",
    slug: "carreira",
    cor: "blog-carreira",
    corHex: "#059669",
    icone: "Briefcase",
    descricao: "Orientacao profissional e dicas para sua carreira",
  },
  {
    nome: "Dicas",
    slug: "dicas",
    cor: "blog-dicas",
    corHex: "#D97706",
    icone: "Lightbulb",
    descricao: "Dicas praticas para o dia a dia e produtividade",
  },
  {
    nome: "Novidades",
    slug: "novidades",
    cor: "blog-novidades",
    corHex: "#E11D48",
    icone: "Newspaper",
    descricao: "Novidades e noticias da Atitude Ensino",
  },
];

export function getBlogCategoryBySlug(slug: BlogCategory): BlogCategoryInfo | undefined {
  return blogCategories.find((c) => c.slug === slug);
}
