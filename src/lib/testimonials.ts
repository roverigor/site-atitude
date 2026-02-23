import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Testimonial, CategorySlug } from "@/types/course";

const FILE = path.join(process.cwd(), "src/data/testimonials.yaml");

export function getAllTestimonials(): Testimonial[] {
  const content = fs.readFileSync(FILE, "utf-8");
  return yaml.load(content) as Testimonial[];
}

export function getTestimonialsByCategory(
  category: CategorySlug
): Testimonial[] {
  return getAllTestimonials().filter((t) => t.categoria === category);
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getAllTestimonials().filter((t) => t.destaque);
}
