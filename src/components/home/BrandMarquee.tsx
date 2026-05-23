// Contiguous strip of the four brand colors looping horizontally.
// Everything inline so no Tailwind tree-shaking can drop the rule.
const segments = [
  "var(--color-brand-green)",
  "var(--color-brand-orange)",
  "var(--color-brand-pink)",
  "var(--color-brand-purple)",
];

// Two cycles of four colors: total width 200vw, translateX(-50%) loops.
const track = [...segments, ...segments];

export function BrandMarquee() {
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        backgroundColor: "var(--color-cream-50)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "200vw",
          height: "28px",
          animation: "marquee 60s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((bg, i) => (
          <div
            key={i}
            style={{
              width: "25vw",
              height: "100%",
              backgroundColor: bg,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
