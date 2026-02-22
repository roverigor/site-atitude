import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Course, CategorySlug, Category } from "@/types/course";
import { categories } from "@/data/categories";

const COURSES_DIR = path.join(process.cwd(), "src/data/courses");

export function getAllCourses(): Course[] {
  const files = fs.readdirSync(COURSES_DIR).filter((f) => f.endsWith(".yaml"));
  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(COURSES_DIR, file), "utf-8");
      return yaml.load(content) as Course;
    })
    .filter((course) => course.ativo)
    .sort((a, b) => a.ordem - b.ordem);
}

export function getCourseBySlug(slug: string): Course | undefined {
  const filePath = path.join(COURSES_DIR, `${slug}.yaml`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const course = yaml.load(content) as Course;
  return course.ativo ? course : undefined;
}

export function getCoursesByCategory(categoria: CategorySlug): Course[] {
  return getAllCourses().filter((course) => course.categoria === categoria);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoriesWithCount(): (Category & { count: number })[] {
  const allCourses = getAllCourses();
  return categories
    .map((category) => ({
      ...category,
      count: allCourses.filter((c) => c.categoria === category.slug).length,
    }))
    .filter((category) => category.count > 0);
}

export function getFeaturedCourses(limit: number = 6): Course[] {
  return getAllCourses().slice(0, limit);
}

export function searchCourses(query: string): Course[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return getAllCourses();

  return getAllCourses().filter(
    (course) =>
      course.nome.toLowerCase().includes(normalizedQuery) ||
      course.descricao_curta.toLowerCase().includes(normalizedQuery) ||
      course.descricao_completa.toLowerCase().includes(normalizedQuery) ||
      course.modulos.some((m) =>
        m.nome.toLowerCase().includes(normalizedQuery)
      )
  );
}
