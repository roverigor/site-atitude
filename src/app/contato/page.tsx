import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getAllCourses } from "@/lib/courses";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Atitude Ensino. Estamos prontos para tirar suas duvidas sobre cursos profissionalizantes em Ibaiti-PR.",
};

export default function ContatoPage() {
  const courses = getAllCourses();
  const courseNames = courses.map((c) => c.nome);

  return (
    <>
      <Breadcrumb items={[{ label: "Contato" }]} />
      <ContactPage courseNames={courseNames} />
    </>
  );
}
