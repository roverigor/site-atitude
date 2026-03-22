import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aula Experimental Gratuita de Inglês em Ibaiti | Atitude English School",
  description:
    "Aprenda inglês presencial em Ibaiti. Turmas de 8 alunos, 2h30 de aula, material incluso. Aula experimental gratuita.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Aula Experimental Gratuita de Inglês em Ibaiti | Atitude English School",
    description:
      "Aprenda inglês presencial em Ibaiti. Turmas de 8 alunos, 2h30 de aula, material incluso. Aula experimental gratuita.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
