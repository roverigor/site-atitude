/**
 * Analytics utility module
 *
 * IMPORTANT: All tracking goes through Google Tag Manager (GTM).
 * Never call window.fbq, gtag, or any platform SDK directly.
 * Push events to window.dataLayer — GTM fires the appropriate tags.
 *
 * GTM is the single source of truth for all tracking configuration.
 * To add/modify tracking: update GTM workspace, not this file.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

function pushToDataLayer(event: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  pushToDataLayer(name, params);
}

// ---------------------------------------------------------------------------
// Landing Page events
// Fires events that GTM listens to and forwards to Meta Pixel, GA4, etc.
// ---------------------------------------------------------------------------

/** LP-A: usuário clicou no botão WhatsApp → GTM dispara Meta Pixel Contact */
export function trackContact(): void {
  pushToDataLayer("contact_click");
}

/** LP-B: formulário enviado com sucesso → GTM dispara Meta Pixel Lead */
export function trackLead(params?: { campaign?: string; source?: string }): void {
  pushToDataLayer("lead_submit", params);
}

/** LP-A e LP-B: usuário rolou 50% da página → GTM dispara Meta Pixel ViewContent */
export function trackViewContent(page: string): void {
  pushToDataLayer("view_content", { page });
}

// ---------------------------------------------------------------------------
// Site helpers (main site, not LPs)
// ---------------------------------------------------------------------------

export function trackWhatsAppClick(page: string, course?: string): void {
  pushToDataLayer("whatsapp_click", {
    page,
    ...(course ? { course } : {}),
  });
}

export function trackFormSubmit(courseInterest: string): void {
  pushToDataLayer("form_submit", { course_interest: courseInterest });
}

export function trackCourseView(courseSlug: string, category: string): void {
  pushToDataLayer("course_view", { course_slug: courseSlug, category });
}

export function trackPhoneClick(): void {
  pushToDataLayer("phone_click");
}

export function trackCtaClick(location: string, type: string): void {
  pushToDataLayer("cta_click", { location, type });
}
