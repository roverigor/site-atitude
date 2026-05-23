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
    accentVar: "var(--color-brand-purple)",
  },
  warning: {
    icon: AlertTriangle,
    accentVar: "var(--color-warning)",
  },
  tip: {
    icon: Lightbulb,
    accentVar: "var(--color-success)",
  },
} as const;

export function Callout({ type = "info", children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="my-6 rounded-lg border-l-4 p-4 bg-[var(--color-background-alt)]"
      style={{ borderLeftColor: config.accentVar }}
    >
      <div className="flex gap-3">
        <Icon
          className="h-5 w-5 mt-0.5 flex-shrink-0"
          style={{ color: config.accentVar }}
        />
        <div
          className="text-sm leading-relaxed text-[var(--color-foreground-muted)]"
        >
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
      className="my-6 flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 transition-all duration-200 hover:shadow-md hover:border-[var(--color-brand-navy)] dark:bg-[var(--color-background-alt)] group"
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
