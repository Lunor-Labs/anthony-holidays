"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialPackageCard } from "@/components/special-packages/SpecialPackageCard";

export interface SpecialPackageItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
  duration: { days: number; nights?: number };
  coverImage: string;
  alt?: string;
  pricing?: {
    showPrice?: boolean;
    priceFrom?: number;
    currency?: string;
    pricingNote?: string;
  };
  activities?: { title: string }[];
  featured?: boolean;
}

export interface FeaturedSpecialPackagesSectionProps {
  specialPackages?: SpecialPackageItem[];
}

export function FeaturedSpecialPackagesSection({
  specialPackages = [],
}: FeaturedSpecialPackagesSectionProps) {
  const displayPackages = specialPackages || [];

  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const isInView = useRef(false);
  const isHovered = useRef(false);
  const isInteracting = useRef(false);
  const interactionTimer = useRef<NodeJS.Timeout | null>(null);
  const scrollPos = useRef(0);
  const driftDirection = useRef<1 | -1>(1);
  const animFrameId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el || displayPackages.length === 0) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress(100);
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const pct = Math.min(100, Math.max(0, (el.scrollLeft / maxScroll) * 100));
    setProgress(pct);
    setCanScrollPrev(el.scrollLeft > 10);
    setCanScrollNext(el.scrollLeft < maxScroll - 15);
  }, [displayPackages.length]);

  const pauseAutoScroll = useCallback((durationMs = 3000) => {
    isInteracting.current = true;
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => {
      isInteracting.current = false;
      if (sliderRef.current) {
        scrollPos.current = sliderRef.current.scrollLeft;
      }
    }, durationMs);
  }, []);

  const scrollPrev = () => {
    pauseAutoScroll(3500);
    const el = sliderRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 390;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollNext = () => {
    pauseAutoScroll(3500);
    const el = sliderRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 390;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
        if (entry.isIntersecting && sliderRef.current) {
          scrollPos.current = sliderRef.current.scrollLeft;
        }
      },
      { threshold: 0.1, rootMargin: "80px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!sectionRef.current || !sliderRef.current || isHovered.current || isInteracting.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom < -50 || rect.top > vh + 50) return;

      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      if (maxScroll <= 0) return;

      if (Math.abs(deltaY) > 0.5) {
        const nudge = deltaY * 0.45;
        scrollPos.current = Math.min(maxScroll, Math.max(0, scrollPos.current + nudge));
        sliderRef.current.scrollLeft = scrollPos.current;
        updateScrollState();
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [updateScrollState]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const stepSpeed = 0.45;

    const tick = () => {
      if (
        sliderRef.current &&
        isInView.current &&
        !isHovered.current &&
        !isInteracting.current
      ) {
        const target = sliderRef.current;
        const maxScroll = target.scrollWidth - target.clientWidth;

        if (maxScroll > 10) {
          scrollPos.current += stepSpeed * driftDirection.current;

          if (scrollPos.current >= maxScroll) {
            scrollPos.current = maxScroll;
            driftDirection.current = -1;
          } else if (scrollPos.current <= 0) {
            scrollPos.current = 0;
            driftDirection.current = 1;
          }

          target.scrollLeft = scrollPos.current;
          updateScrollState();
        }
      }

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    const onContainerScroll = () => {
      updateScrollState();
    };

    el.addEventListener("scroll", onContainerScroll, { passive: true });

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
      el.removeEventListener("scroll", onContainerScroll);
    };
  }, [updateScrollState]);

  if (displayPackages.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-ivory text-forest relative z-20 overflow-hidden border-t border-b border-sand/40"
      aria-labelledby="special-packages-heading"
    >
      <div className="container">
        <SectionHeading
          id="special-packages-heading"
          label="Purpose & Value Packages"
          title="Featured Special"
          highlight="Packages"
          description="Our carefully curated itineraries offer unrivalled access to Sri Lanka's most sought-after destinations, wildlife habitats, and cultural sanctuaries. Combining high experiential value with authentic Ceylon hospitality."
          action={
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/special-packages"
                className="btn btn-outline shrink-0 inline-flex items-center gap-2"
              >
                <span>All Special Packages</span>
                <ArrowRight size={14} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="w-11 h-11 rounded-full border border-forest/20 hover:border-gold hover:text-gold flex items-center justify-center transition-all bg-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-forest"
                  aria-label="Previous packages"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="w-11 h-11 rounded-full border border-forest/20 hover:border-gold hover:text-gold flex items-center justify-center transition-all bg-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-forest"
                  aria-label="Next packages"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          }
        />

        <div className="w-full h-[2px] bg-sand/60 relative overflow-hidden -mt-6 mb-10">
          <div
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-150"
            style={{ width: `${Math.max(12, progress)}%` }}
          />
        </div>

        <div
          className="relative overflow-visible"
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          onMouseLeave={() => {
            isHovered.current = false;
            if (sliderRef.current) {
              scrollPos.current = sliderRef.current.scrollLeft;
            }
          }}
          onTouchStart={() => pauseAutoScroll(4000)}
          onTouchEnd={() => pauseAutoScroll(2000)}
        >
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 select-none"
            style={{
              marginRight:
                "calc(-1 * ((100vw - 100%) / 2 + clamp(1.5rem, 5vw, 5rem)))",
              paddingRight:
                "calc((100vw - 100%) / 2 + clamp(1.5rem, 5vw, 5rem))",
              scrollBehavior: "auto",
            }}
            tabIndex={0}
            aria-label="Special packages showcase - automatically scrolls slowly while browsing"
          >
            {displayPackages.map((pkg, idx) => (
              <div
                key={pkg.id || pkg.slug || idx}
                className="shrink-0 w-[90%] sm:w-[340px] md:w-[380px] lg:w-[390px] flex flex-col"
              >
                <SpecialPackageCard packageItem={pkg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
