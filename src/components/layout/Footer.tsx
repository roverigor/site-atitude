import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-navy)] text-white/80">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{siteConfig.name}</h3>
            <p className="text-sm leading-relaxed">
              {siteConfig.description}. Cursos de informatica, ingles, administracao, saude, beleza e tecnologia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navegacao</h4>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/depoimentos" className="text-sm hover:text-white transition-colors">
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link href="/parceiros" className="text-sm hover:text-white transition-colors">
                  Parceiros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{siteConfig.address.street}, {siteConfig.address.city} - {siteConfig.address.state}</span>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <p>{siteConfig.hours.weekdays}</p>
                  <p>{siteConfig.hours.saturday}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
