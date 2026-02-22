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

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  longDescription: string;
  duration: string;
  schedule: string;
  modality: "presencial" | "online" | "hibrido";
  level: "iniciante" | "intermediario" | "avancado";
  price?: number;
  originalPrice?: number;
  installments?: {
    count: number;
    value: number;
  };
  image: string;
  badge?: string;
  featured: boolean;
  modules: CourseModule[];
  prerequisites?: string[];
  targetAudience: string[];
  skills: string[];
  certificate: boolean;
  faq: CourseFAQ[];
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
