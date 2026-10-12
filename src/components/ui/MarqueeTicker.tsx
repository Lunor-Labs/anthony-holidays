"use client";

interface MarqueeTickerProps {
  items: string[];
  theme?: "dark" | "light";
  className?: string;
}

export function MarqueeTicker({
  items,
  theme = "dark",
  className = "",
}: MarqueeTickerProps) {
  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap w-full [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] ${className}`}
      aria-hidden="true"
    >
      <div className="inline-flex gap-0 animate-[marquee_32s_linear_infinite] will-change-transform hover:[animation-play-state:paused]">
        {loopItems.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-6 px-6 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.12em] uppercase select-none leading-tight transition-colors duration-300 ${
              theme === "light"
                ? "text-ivory/35 hover:text-ivory/60"
                : "text-forest/[0.08] hover:text-forest/25"
            }`}
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 opacity-80" />
          </span>
        ))}
      </div>
    </div>
  );
}
