import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";
import { Analytics } from "@/components/shared/Analytics";
import "./globals.css";

// Poppins (18 weights) and Caveat are self-hosted via @font-face in
// globals.css — the TTFs ship from the official Atitude DS package under
// public/fonts. See `colors_and_type.css` in the DS for reference.

export const metadata: Metadata = {
  title: {
    default: "Atitude Ensino | Cursos profissionalizantes em Ibaiti-PR",
    template: "%s | Atitude Ensino",
  },
  description:
    "Há 15 anos formando profissionais em Ibaiti-PR. Ensino, emprego, idiomas e tecnologia — da primeira matrícula ao primeiro contracheque.",
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
        <meta name="theme-color" content="#252566" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"
        />
      </head>
      <body className="font-[family-name:var(--font-poppins)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a href="#main-content" className="skip-to-content">
            Pular para o conteúdo
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
