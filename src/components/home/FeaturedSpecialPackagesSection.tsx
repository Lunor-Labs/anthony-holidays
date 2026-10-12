"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecialPackageCard } from "@/components/special-packages/SpecialPackageCard";
import { FALLBACK_SPECIAL_PACKAGES } from "@/data/fallback-data";

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
  specialPackages,
}: FeaturedSpecialPackagesSectionProps) {
  const displayPackages =
    specialPackages && specialPackages.length > 0
      ? specialPackages
      : FALLBACK_SPECIAL_PACKAGES;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateScrollState();
    const handleScroll = () => {
      updateScrollState();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateScrollState]);

  const scrollPrev = () => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 390;
    el.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 390;
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  if (displayPackages.length === 0) {
    return null;
  }

  return (
    <section
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
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-200"
            style={{ width: `${Math.max(12, progress)}%` }}
          />
        </div>
        <div className="relative overflow-visible">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 pt-1"
            style={{
              marginRight:
                "calc(-1 * ((100vw - 100%) / 2 + clamp(1.5rem, 5vw, 5rem)))",
              paddingRight:
                "calc((100vw - 100%) / 2 + clamp(1.5rem, 5vw, 5rem))",
            }}
            tabIndex={0}
            aria-label="Special packages showcase"
          >
            {displayPackages.map((pkg, idx) => (
              <div
                key={pkg.id || pkg.slug || idx}
                className="snap-start shrink-0 w-[90%] sm:w-[340px] md:w-[380px] lg:w-[390px] flex flex-col"
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
