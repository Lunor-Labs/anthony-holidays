"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
  threshold?: number;
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass =
    direction === "left"
      ? "reveal reveal-left"
      : direction === "right"
        ? "reveal reveal-right"
        : direction === "scale"
          ? "reveal reveal-scale"
          : "reveal";

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  const AnyTag = Tag as any;

  return (
    <AnyTag
      ref={ref}
      className={`${dirClass} ${delayClass} ${className}`.trim()}
    >
      {children}
    </AnyTag>
  );
}
