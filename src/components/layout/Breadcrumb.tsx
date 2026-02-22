import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Container className="py-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-[var(--color-foreground-muted)]">
        <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
          Home
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--color-foreground)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--color-foreground)] font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </Container>
  );
}
