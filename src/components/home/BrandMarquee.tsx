import { GraduationCap, Briefcase, Languages, Cpu, type LucideIcon } from "lucide-react";

type Pill = {
  label: string;
  icon: LucideIcon;
  bg: string;
  fg: string;
};

const pills: Pill[] = [
  {
    label: "Ensino",
    icon: GraduationCap,
    bg: "var(--color-brand-green)",
    fg: "var(--color-brand-navy)",
  },
  {
    label: "Emprego",
    icon: Briefcase,
    bg: "var(--color-brand-orange)",
    fg: "#FFFFFF",
  },
  {
    label: "Idiomas",
    icon: Languages,
    bg: "var(--color-brand-pink)",
    fg: "#FFFFFF",
  },
  {
    label: "Tecnologia",
    icon: Cpu,
    bg: "var(--color-brand-purple)",
    fg: "#FFFFFF",
  },
];

// 4 copies so translateX(-50%) wraps seamlessly even on ultrawide screens
const track = [...pills, ...pills, ...pills, ...pills];

const maskStyle: React.CSSProperties = {
  maskImage:
    "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
};

export function BrandMarquee() {
  return (
    <section
      aria-label="Pilares Atitude — Ensino, Emprego, Idiomas, Tecnologia"
      className="overflow-hidden bg-[var(--color-cream-50)] py-5 md:py-6 group"
      style={maskStyle}
    >
      <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
        {track.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className="shrink-0 inline-flex items-center gap-3 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-extrabold text-base md:text-xl tracking-tight"
              style={{ backgroundColor: p.bg, color: p.fg }}
              aria-hidden={i >= pills.length ? true : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{p.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
