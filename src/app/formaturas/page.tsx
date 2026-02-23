import { Metadata } from "next";
import { getAllGraduations } from "@/lib/graduations";
import { GraduationsPage } from "@/components/graduations/GraduationsPage";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Galeria de Formaturas",
  description:
    "Momentos especiais das formaturas da Atitude Ensino. Celebrando as conquistas dos nossos alunos.",
};

export default function Formaturas() {
  const graduations = getAllGraduations();

  return (
    <>
      <Breadcrumb items={[{ label: "Formaturas" }]} />
      <Container className="py-12 md:py-16">
        <GraduationsPage graduations={graduations} />
      </Container>
    </>
  );
}
