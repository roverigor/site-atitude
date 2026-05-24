import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { ConditionalWrapper } from "@/components/layout/ConditionalWrapper";
import { Analytics } from "@/components/shared/Analytics";
import { CookieBanner } from "@/components/consent/CookieBanner";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

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
        {/*
          Google Consent Mode v2 default-denied — MUST run before GTM loads.
          beforeInteractive Scripts only work when rendered directly from the
          root layout (not from a nested client component), so this lives here
          rather than in Analytics.tsx. GTM bootstrap stays in <Analytics />
          with afterInteractive strategy.
        */}
        {IS_PRODUCTION && GTM_ID && (
          <Script
            id="gtm-consent-default"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'functionality_storage': 'granted',
                  'security_storage': 'granted',
                  'wait_for_update': 500
                });
                try {
                  var raw = localStorage.getItem('atitude-cookie-consent');
                  if (raw) {
                    var parsed = JSON.parse(raw);
                    if (parsed && parsed.version === 1 && parsed.state) {
                      gtag('consent', 'update', {
                        'analytics_storage': parsed.state.analytics,
                        'ad_storage': parsed.state.ad,
                        'ad_user_data': parsed.state.ad,
                        'ad_personalization': parsed.state.ad
                      });
                    }
                  }
                } catch (e) { /* localStorage blocked — defaults stay denied */ }
              `,
            }}
          />
        )}
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
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
