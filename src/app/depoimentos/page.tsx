import { Metadata } from "next";
import { getAllTestimonials } from "@/lib/testimonials";
import { categories } from "@/data/categories";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Depoimentos",
  description:
    "Veja o que nossos alunos dizem sobre a Atitude Ensino. Historias reais de transformacao profissional em Ibaiti-PR.",
};

export default function Depoimentos() {
  const testimonials = getAllTestimonials();

  return (
    <>
      <Breadcrumb items={[{ label: "Depoimentos" }]} />
      <Container className="py-12 md:py-16">
        <TestimonialsPage testimonials={testimonials} categories={categories} />
      </Container>
    </>
  );
}
