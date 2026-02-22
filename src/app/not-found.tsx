import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-6xl font-bold text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Pagina nao encontrada</h2>
      <p className="text-[var(--color-foreground-muted)] mb-8 max-w-md mx-auto">
        A pagina que voce procura nao existe ou foi removida. Que tal voltar para a home?
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
  );
}
