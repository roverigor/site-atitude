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
    // "gradient" kept as a variant name for back-compat; DS forbids gradients
    // on UI surfaces, so it renders solid navy with a decorative violet orb.
    gradient: "relative overflow-hidden bg-[var(--color-brand-navy)] text-white",
  };

  return (
    <section id={id} className={cn("py-16 md:py-20", variants[variant], className)}>
      {variant === "gradient" && (
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--color-brand-purple)]/30 blur-3xl" />
      )}
      <div className={variant === "gradient" ? "relative z-10" : undefined}>
        {children}
      </div>
    </section>
  );
}
