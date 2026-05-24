"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Analytics — loads GTM only. All tracking tags (Meta Pixel, GA4,
 * Google Ads, etc.) live INSIDE the GTM container and must be configured
 * with "Require additional consent" (see docs/lgpd-gtm-setup.md).
 *
 * Pipeline:
 *   1. beforeInteractive: push gtag('consent', 'default', denied) + replay
 *      any persisted consent from localStorage. Runs BEFORE GTM loads.
 *   2. afterInteractive: GTM bootstrap snippet. Tags respect consent state.
 *   3. noscript iframe: fallback for JS-disabled clients.
 *
 * Dev/preview builds skip everything (IS_PRODUCTION guard).
 */
export function Analytics() {
  if (!IS_PRODUCTION || !GTM_ID) return null;

  return (
    <>
      {/* 1. Consent default + persisted update — runs BEFORE GTM */}
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

      {/* 2. GTM bootstrap */}
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

      {/* 3. noscript fallback */}
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
