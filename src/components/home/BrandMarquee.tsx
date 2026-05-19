// Decorative color pills inspired by the four logo accents.
// Varied widths give the band a visual rhythm without any text.
const pillSpec = [
  { bg: "var(--color-brand-green)",  w: "w-32" },
  { bg: "var(--color-brand-orange)", w: "w-20" },
  { bg: "var(--color-brand-pink)",   w: "w-28" },
  { bg: "var(--color-brand-purple)", w: "w-16" },
  { bg: "var(--color-brand-green)",  w: "w-20" },
  { bg: "var(--color-brand-pink)",   w: "w-24" },
  { bg: "var(--color-brand-purple)", w: "w-32" },
  { bg: "var(--color-brand-orange)", w: "w-28" },
];

// 3 copies of the spec so translateX(-50%) tiles seamlessly on ultrawide.
const track = [...pillSpec, ...pillSpec, ...pillSpec, ...pillSpec, ...pillSpec, ...pillSpec];

const maskStyle: React.CSSProperties = {
  maskImage:
    "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
};

export function BrandMarquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-[var(--color-cream-50)] py-5 md:py-6 group"
      style={maskStyle}
    >
      <div className="flex gap-3 w-max animate-marquee group-hover:[animation-play-state:paused]">
        {track.map((p, i) => (
          <span
            key={i}
            className={`${p.w} h-6 md:h-7 shrink-0 rounded-full`}
            style={{ backgroundColor: p.bg }}
          />
        ))}
      </div>
    </div>
  );
}
