"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Analytics component — loads Google Tag Manager only.
 * All tracking tags (Meta Pixel, GA4, Google Ads, etc.)
 * are managed exclusively inside GTM. Do NOT add tracking
 * scripts directly to this file or anywhere in the codebase.
 *
 * GTM snippet: head script + body noscript iframe.
 * Only renders in production so dev/preview builds stay clean.
 */
export function Analytics() {
  if (!IS_PRODUCTION || !GTM_ID) return null;

  return (
    <>
      {/* GTM — head script */}
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

      {/* GTM — body noscript fallback */}
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
