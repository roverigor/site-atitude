/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/**
 * Analytics utility module
 * Provides type-safe tracking functions that push events to the GTM dataLayer.
 * All functions are safe to call even when dataLayer does not exist (no-op).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

function pushToDataLayer(event: string, params?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Generic event tracker.  Pushes to GTM dataLayer.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string>,
): void {
  pushToDataLayer(name, params);
}

// ---------------------------------------------------------------------------
// Domain-specific helpers
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
  pushToDataLayer("course_view", {
    course_slug: courseSlug,
    category,
  });
}

export function trackPhoneClick(): void {
  pushToDataLayer("phone_click");
}

export function trackCtaClick(location: string, type: string): void {
  pushToDataLayer("cta_click", { location, type });
}
