import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "category" | "success" | "warning" | "error" | "info";
  color?: string;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "info", color, size = "sm", className }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-semibold rounded-full";

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variants = {
    category: "",
    success: "bg-[var(--color-success)]/15 text-[var(--color-success)] dark:bg-[var(--color-success)]/25",
    warning: "bg-[var(--color-warning)]/15 text-[var(--color-warning)] dark:bg-[var(--color-warning)]/25",
    error: "bg-[var(--color-error)]/15 text-[var(--color-error)] dark:bg-[var(--color-error)]/25",
    info: "bg-[var(--color-info)]/15 text-[var(--color-info)] dark:bg-[var(--color-info)]/25",
  };

  const style = variant === "category" && color ? { backgroundColor: `${color}20`, color } : undefined;

  return (
    <span className={cn(baseStyles, sizes[size], variants[variant], className)} style={style}>
      {children}
    </span>
  );
}
