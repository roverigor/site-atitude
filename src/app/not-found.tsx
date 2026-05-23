import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Section variant="default">
      <Container className="text-center py-12 md:py-20">
        <h1 className="h-display text-[var(--color-brand-navy)] dark:text-white mb-4">404</h1>
        <h2 className="h2 mb-4">Página não encontrada</h2>
        <p className="text-[var(--color-foreground-muted)] mb-8 max-w-md mx-auto">
          A página que você procura não existe ou foi removida. Que tal voltar para a home?
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" href="/">
            <Home className="h-4 w-4" />
            Voltar para Home
          </Button>
          <Button variant="outline" href="/cursos">
            <Search className="h-4 w-4" />
            Ver Cursos
          </Button>
        </div>
      </Container>
    </Section>
  );
}
