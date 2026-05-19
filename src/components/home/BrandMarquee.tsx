// Single contiguous strip of the four brand colors looping horizontally.
// Each segment is 25vw, so only one of each color fits in the viewport
// at any given moment — green → orange → pink → purple, then loops.
const segments = [
  "var(--color-brand-green)",
  "var(--color-brand-orange)",
  "var(--color-brand-pink)",
  "var(--color-brand-purple)",
];

// Two copies (8 segments) so the translateX(-50%) loop tiles seamlessly
// without ever showing the same color twice on screen at once.
const track = [...segments, ...segments];

export function BrandMarquee() {
  return (
    <div
      aria-hidden="true"
      className="brand-marquee overflow-hidden bg-[var(--color-cream-50)]"
    >
      <div className="brand-marquee-track flex w-max h-6 md:h-8">
        {track.map((bg, i) => (
          <span
            key={i}
            className="w-[25vw] h-full shrink-0"
            style={{ backgroundColor: bg }}
          />
        ))}
      </div>
    </div>
  );
}
