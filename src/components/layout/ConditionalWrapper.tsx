"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide site chrome on LP routes (path-based) or LP subdomain (host-based)
  const isLpPath = pathname?.startsWith("/lp/");
  const isLpHost =
    typeof window !== "undefined" &&
    (window.location.hostname.startsWith("lp.") ||
      window.location.hostname.startsWith("lp-"));
  const isLP = isLpPath || isLpHost;

  return (
    <>
      {!isLP && <Header />}
      <main id="main-content">{children}</main>
      {!isLP && <Footer />}
      {!isLP && <WhatsAppButton />}
    </>
  );
}
