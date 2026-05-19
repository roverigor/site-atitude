import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverted" | "whatsapp" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
  type = "button",
  disabled,
  target,
  rel,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const variants = {
    primary: "bg-[var(--color-brand-green)] text-[var(--color-brand-navy)] hover:bg-[var(--color-lime-600)] focus:ring-[var(--color-brand-green)]",
    secondary: "border-2 border-[var(--color-brand-navy)] text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[var(--color-brand-navy)] focus:ring-[var(--color-brand-navy)]",
    "secondary-inverted": "border-2 border-white text-white hover:bg-white hover:text-[var(--color-brand-navy)] focus:ring-white",
    whatsapp: "bg-[var(--color-whatsapp)] text-white hover:brightness-110 focus:ring-[var(--color-whatsapp)]",
    outline: "border border-current text-current hover:bg-current/10 focus:ring-current",
    ghost: "text-current hover:bg-black/5 dark:hover:bg-white/10 focus:ring-current",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[36px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={classes} target={target || "_blank"} rel={rel || "noopener noreferrer"}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
