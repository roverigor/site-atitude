import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";
import { Analytics } from "@/components/shared/Analytics";
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
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Atitude Ensino",
  },
  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#00E676" />
      </head>
      <body className={`${poppins.variable} font-[family-name:var(--font-poppins)] antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a href="#main-content" className="skip-to-content">
            Pular para o conteudo
          </a>
          <ConditionalWrapper>
            {children}
          </ConditionalWrapper>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
