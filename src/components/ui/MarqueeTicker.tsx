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
  // Duplicate items to create seamless loop
  const loopItems = [...items, ...items];

  return (
    <div
      className={`overflow-hidden whitespace-nowrap w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] ${className}`}
      aria-hidden="true"
    >
      <div className="inline-flex gap-0 animate-[marquee_28s_linear_infinite] will-change-transform hover:[animation-play-state:paused]">
        {loopItems.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-6 px-6 font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-[0.08em] uppercase select-none leading-tight ${
              theme === "light"
                ? "text-ivory/10"
                : "text-forest/[0.08]"
            }`}
          >
            {item}
            <span className="w-2 h-2 rounded-full bg-gold shrink-0 opacity-100" />
          </span>
        ))}
      </div>
    </div>
  );
}
