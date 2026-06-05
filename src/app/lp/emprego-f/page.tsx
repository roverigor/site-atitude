import type { Metadata } from "next";
import EmpregoLp from "../_emprego/EmpregoLp";

export const metadata: Metadata = {
  title: "Do Zero ao 1º Emprego · Operador de Computador — Atitude Ibaiti",
  description:
    "Aprenda a usar o computador na prática, monte seu portfólio e seja encaminhado pras empresas de Ibaiti. +2000 alunos formados. Certificado e apostilas inclusos.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EmpregoLp variant="f" />;
}
