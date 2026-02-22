import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "category" | "success" | "warning" | "error" | "info";
  color?: string;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "info", color, size = "sm", className }: BadgeProps) {
  const baseStyles = "inline-flex items-center font-semibold rounded";

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variants = {
    category: "",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const style = variant === "category" && color ? { backgroundColor: `${color}20`, color } : undefined;

  return (
    <span className={cn(baseStyles, sizes[size], variants[variant], className)} style={style}>
      {children}
    </span>
  );
}
