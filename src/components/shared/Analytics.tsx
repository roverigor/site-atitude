"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Analytics — loads GTM only. All tracking tags (Meta Pixel, GA4,
 * Google Ads, etc.) live INSIDE the GTM container and must be configured
 * with "Require additional consent" (see docs/lgpd-gtm-setup.md).
 *
 * The Google Consent Mode v2 `beforeInteractive` script lives in
 * `src/app/layout.tsx` (Next App Router requires beforeInteractive in
 * the root layout). This component owns only the GTM bootstrap.
 *
 * Dev/preview builds skip everything (IS_PRODUCTION guard).
 */
export function Analytics() {
  if (!IS_PRODUCTION || !GTM_ID) return null;

  return (
    <>
      {/* GTM bootstrap — runs after the consent default from layout */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
