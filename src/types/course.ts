export type CategorySlug =
  | "informatica"
  | "ingles"
  | "administracao"
  | "saude"
  | "beleza"
  | "tecnologia"
  | "carreiras-pro"
  | "interativos"
  | "design"
  | "rh-marketing"
  | "excel"
  | "outros";

export interface CourseModule {
  nome: string;
  carga_horaria: string;
  valor: number;
  descricao: string;
}

export interface CourseInvestment {
  matricula: number;
  parcelas: number;
  valor_parcela: number | null;
  bonus_pontualidade: number;
  desconto_maximo: string;
}

export interface Course {
  slug: string;
  nome: string;
  categoria: CategorySlug;
  descricao_curta: string;
  descricao_completa: string;
  modulos: CourseModule[];
  duracao_total: string;
  modalidade: "presencial" | "online" | "interativo";
  publico_alvo: string;
  prerequisitos: string;
  incluso: string[];
  proxima_turma: string;
  vagas: number;
  investimento: CourseInvestment;
  imagem_destaque: string;
  ativo: boolean;
  ordem: number;
}

export interface Category {
  nome: string;
  slug: CategorySlug;
  cor: string;
  corHex: string;
  icone: string;
  descricao: string;
}

export interface CourseCardProps {
  course: Course;
  variant?: "grid" | "list" | "featured";
}

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: CategorySlug | "all";
  onSelect: (category: CategorySlug | "all") => void;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  text: string;
  rating: number;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}
