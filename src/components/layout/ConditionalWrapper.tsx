"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLP = pathname?.startsWith("/lp/");

  return (
    <>
      {!isLP && <Header />}
      <main id="main-content">{children}</main>
      {!isLP && <Footer />}
      {!isLP && <WhatsAppButton />}
    </>
  );
}
