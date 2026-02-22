import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Atitude Ensino | Cursos Profissionalizantes em Ibaiti-PR",
    template: "%s | Atitude Ensino",
  },
  description:
    "Ha 15 anos transformando vidas em Ibaiti-PR. Cursos de informatica, ingles, administracao, saude, beleza e tecnologia. Matricule-se!",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://atitudeensino.com.br"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Atitude Ensino",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${poppins.variable} font-[family-name:var(--font-poppins)] antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a href="#main-content" className="skip-to-content">
            Pular para o conteudo
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
