import { Metadata } from "next";
import { ObrigadoContent } from "@/components/contact/ObrigadoContent";

export const metadata: Metadata = {
  title: "Obrigado",
  description:
    "Obrigado pelo contato! Em breve entraremos em contato pelo WhatsApp.",
};

export default function ObrigadoPage() {
  return <ObrigadoContent />;
}
