export type BlogCategory = "informatica" | "ingles" | "carreira" | "dicas" | "novidades";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  thumbnail: string;
  published: boolean;
  content: string;
  readingTime: number;
}

export interface BlogCategoryInfo {
  nome: string;
  slug: BlogCategory;
  cor: string;
  corHex: string;
  icone: string;
  descricao: string;
}
