import Link from "next/link";
import { Info, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

/* ——— Callout ——— */
interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    borderColor: "#2563EB",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/20",
    textColor: "text-blue-700 dark:text-blue-400",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "#D97706",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-950/20",
    textColor: "text-amber-700 dark:text-amber-400",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "#059669",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-950/20",
    textColor: "text-green-700 dark:text-green-400",
    iconColor: "text-green-600 dark:text-green-400",
  },
} as const;

export function Callout({ type = "info", children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 rounded-lg border-l-4 p-4 ${config.bgLight} ${config.bgDark}`}
      style={{ borderLeftColor: config.borderColor }}
    >
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div className={`text-sm leading-relaxed ${config.textColor}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ——— YouTubeEmbed ——— */
interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title = "Video" }: YouTubeEmbedProps) {
  return (
    <div className="my-6 relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "56.25%" }}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

/* ——— CourseCard ——— */
interface CourseCardProps {
  slug: string;
  nome: string;
}

export function CourseCard({ slug, nome }: CourseCardProps) {
  return (
    <Link
      href={`/cursos/${slug}`}
      className="my-6 flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 transition-all duration-200 hover:shadow-md hover:border-[var(--color-brand-navy)] dark:bg-[#1a1a1a] group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--color-brand-navy)" }}
      >
        <span className="text-white text-lg font-bold">A</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-brand-navy)] dark:group-hover:text-white transition-colors">
          {nome}
        </p>
        <p className="text-xs text-[var(--color-foreground-muted)]">Ver detalhes do curso</p>
      </div>
      <ArrowRight className="h-4 w-4 text-[var(--color-foreground-muted)] group-hover:text-[var(--color-brand-navy)] group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

/* ——— MDX Components Map ——— */
export const mdxComponents = {
  Callout,
  YouTubeEmbed,
  CourseCard,
};
