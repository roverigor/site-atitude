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

export interface TeamMember {
  nome: string;
  funcao: string;
  descricao: string;
  foto: string;
  ordem: number;
}

export interface Testimonial {
  nome: string;
  idade: number;
  curso: string;
  categoria: CategorySlug;
  ano_conclusao: number;
  texto: string;
  resultado: string;
  foto: string;
  destaque: boolean;
}

export interface Partner {
  nome: string;
  logo: string;
  segmento: string;
  url?: string;
}

export interface GraduationEvent {
  titulo: string;
  data: string;
  tipo: string;
  descricao: string;
  fotos: string[];
}
