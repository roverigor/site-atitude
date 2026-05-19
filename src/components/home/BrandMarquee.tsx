// Single contiguous strip of the four brand colors looping horizontally.
const segments = [
  "var(--color-brand-green)",
  "var(--color-brand-orange)",
  "var(--color-brand-pink)",
  "var(--color-brand-purple)",
];

// Repeat the pattern enough times for the translateX(-50%) loop to tile
// seamlessly on ultrawide screens.
const track = Array.from({ length: 12 }, () => segments).flat();

export function BrandMarquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden bg-[var(--color-cream-50)] group"
    >
      <div className="flex w-max h-6 md:h-8 animate-marquee group-hover:[animation-play-state:paused]">
        {track.map((bg, i) => (
          <span
            key={i}
            className="w-32 md:w-48 h-full shrink-0"
            style={{ backgroundColor: bg }}
          />
        ))}
      </div>
    </div>
  );
}
