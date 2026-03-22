import { NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing for landing pages.
 *
 * lp.atitudeensino.com.br/aula-gratuita-a  → internally: /lp/aula-gratuita-a
 * lp.atitudeensino.com.br/aula-gratuita-b  → internally: /lp/aula-gratuita-b
 * lp.atitudeensino.com.br/obrigado         → internally: /obrigado
 * lp.atitudeensino.com.br/*               → redirect to /lp/aula-gratuita-a
 *
 * All other hostnames behave normally.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";

  // Detect LP subdomain in both prod and Vercel preview
  const isLpSubdomain =
    host.startsWith("lp.") ||
    host.startsWith("lp-");

  if (!isLpSubdomain) {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  // Pass through static assets and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/logos/") ||
    pathname.startsWith("/images/") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // /obrigado — allow as-is
  if (pathname.startsWith("/obrigado")) {
    return NextResponse.next();
  }

  // Already on /lp/* — allow (direct access, no loop)
  if (pathname.startsWith("/lp/")) {
    return NextResponse.next();
  }

  // Clean slug routing: /aula-gratuita-a → /lp/aula-gratuita-a
  const slug = pathname === "/" ? "" : pathname;
  const lpSlugs = ["/aula-gratuita-a", "/aula-gratuita-b"];

  if (lpSlugs.includes(slug)) {
    const url = req.nextUrl.clone();
    url.pathname = `/lp${slug}`;
    return NextResponse.rewrite(url);
  }

  // Root "/" on LP subdomain → rewrite to LP-A
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/lp/aula-gratuita-a";
    return NextResponse.rewrite(url);
  }

  // Any other path on LP subdomain → redirect to LP-A
  const url = req.nextUrl.clone();
  url.pathname = "/lp/aula-gratuita-a";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
