import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alt" | "dark" | "gradient";
  id?: string;
}

export function Section({ children, className, variant = "default", id }: SectionProps) {
  const variants = {
    default: "bg-[var(--color-background)]",
    alt: "bg-[var(--color-background-alt)]",
    dark: "bg-[var(--color-brand-navy)] text-white",
    gradient: "bg-gradient-to-br from-[var(--color-brand-navy)] to-[var(--color-brand-purple)] text-white",
  };

  return (
    <section id={id} className={cn("py-16 md:py-20", variants[variant], className)}>
      {children}
    </section>
  );
}
