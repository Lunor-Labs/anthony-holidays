"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const circleRef = useRef<SVGCircleElement>(null);

  const radius = 23;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let rafId: number;
    let lastScrollY = -1;

    const updateScrollProgress = () => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollY !== lastScrollY) {
        lastScrollY = currentScrollY;

        const shouldBeVisible = currentScrollY > 250;
        if (shouldBeVisible !== isVisibleRef.current) {
          isVisibleRef.current = shouldBeVisible;
          setIsVisible(shouldBeVisible);
        }

        if (circleRef.current) {
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight > 0) {
            const progress = Math.min(
              1,
              Math.max(0, currentScrollY / scrollHeight),
            );
            const offset = circumference - progress * circumference;
            circleRef.current.style.strokeDashoffset = `${offset}px`;
          }
        }
      }

      rafId = requestAnimationFrame(updateScrollProgress);
    };

    rafId = requestAnimationFrame(updateScrollProgress);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [circumference]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      title="Back to top"
      className={`fixed bottom-[6.25rem] right-8 z-30 group w-14 h-14 rounded-full flex items-center justify-center bg-forest/95 hover:bg-forest text-gold backdrop-blur-md border border-gold/40 hover:border-gold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
    >
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-20"
        />
        <circle
          ref={circleRef}
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className="text-gold"
        />
      </svg>
      <ChevronUp
        size={22}
        className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
