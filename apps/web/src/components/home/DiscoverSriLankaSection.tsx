"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Compass, MapPin } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export interface DiscoverJourneyItem {
  id?: string;
  slug: string;
  title: string;
  tagline?: string;
  excerpt: string;
  duration: {
    days: number;
    nights: number;
  };
  pricing?: {
    priceFrom: number;
    currency: string;
  };
  coverImage: string;
  alt?: string;
  destinations: string[];
  categories?: string[];
  featured?: boolean;
}

export interface DiscoverSriLankaSectionProps {
  journeys?: DiscoverJourneyItem[];
}

const CURATED_JOURNEY_SLUGS = [
  "essence-of-ceylon",
  "tea-trails-ancient-temples",
  "classic-triangle-and-wildlife",
  "heritage-and-southern-coast",
  "grand-sri-lankan-loop",
  "deep-dive-culture-and-nature",
  "ramayana-trail-special",
  "ultimate-pearl-experience",
];

export function DiscoverSriLankaSection({
  journeys = [],
}: DiscoverSriLankaSectionProps) {
  const displayJourneys: DiscoverJourneyItem[] = React.useMemo(() => {
    if (!journeys || journeys.length === 0) return [];
    return [...journeys].sort((a, b) => {
      const idxA = CURATED_JOURNEY_SLUGS.indexOf(a.slug);
      const idxB = CURATED_JOURNEY_SLUGS.indexOf(b.slug);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }, [journeys]);


  const [activeIndex, setActiveIndex] = useState(0);
  const journeyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    journeyRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          rootMargin: "-25% 0px -40% 0px",
          threshold: 0,
        },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [displayJourneys.length]);

  useEffect(() => {
    let rafId: number;
    let targetY = 0;
    let currentY = 0;
    const lerp = 0.08;

    const calculateTarget = () => {
      const activeEl = journeyRefs.current[activeIndex];
      const windowHeight = window.innerHeight;

      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const diff = elementCenter - screenCenter;

        targetY = diff * -0.38;
        targetY = Math.max(-170, Math.min(170, targetY));
      } else if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const diff = elementCenter - screenCenter;

        targetY = Math.max(-170, Math.min(170, diff * -0.25));
      }
    };

    const loop = () => {
      if (imageInnerRef.current) {
        calculateTarget();
        currentY += (targetY - currentY) * lerp;
        imageInnerRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0) scale(1.15)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex]);

  const scrollToJourney = (index: number) => {
    setActiveIndex(index);
    const target = journeyRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (displayJourneys.length === 0) {
    return null;
  }

  const activeJourney = displayJourneys[activeIndex] || displayJourneys[0];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-ivory text-forest relative z-10"
      aria-label="Curated Journeys - Discover Sri Lanka"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-16 items-start">
          <div className="flex flex-col">
            <div className="pb-10 lg:pb-14 border-b border-gold/30 mb-6">
              <SectionHeading
                label="Curated Journeys · Discover Sri Lanka"
                title="A Land of Living"
                highlight="Heritage"
                description="We are an island nation devoted to our heritage, deeply influenced by millennia of culture, yet true to our roots. Explore our handcrafted private itineraries led by licensed national tourist guide lecturers - designed with intellectual depth, private comfort, and authentic emotion."
                action={
                  <Link href="/tours" className="theme-btn-circle">
                    <span className="theme-btn-circle__icon">
                      <ArrowRight size={16} />
                    </span>
                    <span>EXPLORE ALL JOURNEYS</span>
                  </Link>
                }
                className="mb-0"
              />
            </div>

            <div className="flex flex-col">
              {displayJourneys.map((journey, i) => {
                const isActive = activeIndex === i;
                const formattedNum = String(i + 1).padStart(2, "0");
                const categoryLabel =
                  journey.categories && journey.categories[0]
                    ? journey.categories[0].replace(/-/g, " ")
                    : "Curated Tour";

                return (
                  <div
                    key={journey.slug || journey.id || i}
                    ref={(el) => {
                      journeyRefs.current[i] = el;
                    }}
                    className={`py-12 lg:py-16 border-b border-gold/25 last:border-b-0 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "opacity-100 translate-x-2"
                        : "opacity-40 hover:opacity-75"
                    }`}
                    onClick={() => scrollToJourney(i)}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3.5 flex-wrap">
                      <div className="flex items-center gap-3.5 font-serif text-3xl lg:text-4xl text-gold-dark font-normal leading-none">
                        <span>{formattedNum}</span>
                        <span
                          className={`h-[1px] bg-gold/50 transition-all duration-500 ${
                            isActive ? "w-16 opacity-100" : "w-10 opacity-60"
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium tracking-wider uppercase text-forest bg-gold/15 px-2.5 py-1 border border-gold/30 rounded-xs">
                          <Clock size={12} className="text-gold-dark" />
                          {formatDuration(
                            journey.duration?.days || 1,
                            journey.duration?.nights || 0,
                          )}
                        </span>
                        <span className="inline-flex font-sans text-xs font-medium tracking-widest uppercase text-stone bg-black/5 px-2.5 py-1 rounded-xs">
                          {categoryLabel}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl lg:text-3xl font-normal uppercase tracking-wide text-forest leading-tight mb-3">
                      <Link
                        href={`/tours/${journey.slug}`}
                        className="hover:text-gold transition-colors inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {journey.title}
                      </Link>
                    </h3>
                    {journey.destinations &&
                      journey.destinations.length > 0 && (
                        <div className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-wide text-stone mb-4">
                          <MapPin size={13} className="text-gold-dark shrink-0" />
                          <span className="leading-snug">
                            {journey.destinations.join("  ·  ")}
                          </span>
                        </div>
                      )}
                    <Link
                      href={`/tours/${journey.slug}`}
                      className="lg:hidden relative w-full overflow-hidden my-6 border border-gold/30 shadow-md block cursor-pointer group/img"
                      aria-label={`View ${journey.title} itinerary`}
                    >
                      <ParallaxImage
                        src={journey.coverImage}
                        alt={journey.alt || journey.title}
                        aspectRatio="16/10"
                        speed={0.42}
                        maxTranslate={150}
                        scale={1}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 90vw, 550px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent pointer-events-none z-10" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-20">
                        <span className="bg-forest/90 px-2.5 py-1 backdrop-blur-sm tracking-wide text-xs font-medium border border-gold/30">
                          {journey.duration?.days}D / {journey.duration?.nights}
                          N
                        </span>
                        {journey.pricing && journey.pricing.priceFrom > 0 && (
                          <span className="bg-gold text-forest font-semibold px-2.5 py-1 text-xs">
                            From{" "}
                            {formatPrice(
                              journey.pricing.priceFrom,
                              journey.pricing.currency,
                            )}
                          </span>
                        )}
                      </div>
                    </Link>

                    <p className="font-sans text-sm font-light leading-[1.8] text-forest/80 max-w-[580px] mb-6">
                      {journey.excerpt || journey.tagline}
                    </p>

                    <div className="flex items-center justify-between gap-6 pt-5 border-t border-gold/20 flex-wrap">
                      <div className="flex flex-col">
                        {journey.pricing && journey.pricing.priceFrom > 0 ? (
                          <>
                            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-stone leading-none mb-1">
                              ESTIMATED FROM
                            </span>
                            <span className="font-serif text-xl font-medium text-forest">
                              {formatPrice(
                                journey.pricing.priceFrom,
                                journey.pricing.currency,
                              )}
                              <span className="font-sans text-xs font-normal text-stone">
                                {" "}
                                / person
                              </span>
                            </span>
                          </>
                        ) : (
                          <span className="font-sans text-xs font-medium tracking-wider uppercase text-stone">
                            Bespoke Private Itinerary
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/tours/${journey.slug}`}
                        className="btn btn-sm btn-outline-gold"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View itinerary for ${journey.title}`}
                      >
                        <span>View Itinerary</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="hidden lg:block relative sticky top-[110px] h-[calc(100vh-150px)] min-h-[580px] max-h-[760px]"
            aria-hidden="true"
          >
            <div className="relative w-full h-full overflow-hidden bg-forest shadow-[0_24px_60px_-15px_rgba(28,58,46,0.25)]">
              <div
                ref={imageInnerRef}
                className="absolute inset-x-0 w-full"
                style={{
                  top: "-28%",
                  height: "156%",
                  willChange: "transform",
                }}
              >
                {displayJourneys.map((j, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <div
                      key={j.slug || idx}
                      className="absolute inset-0"
                      style={{
                        opacity: isSelected ? 1 : 0,
                        transform: isSelected ? "scale(1.01)" : "scale(1.04)",
                        pointerEvents: isSelected ? "auto" : "none",
                        transition:
                          "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <Image
                        src={j.coverImage}
                        alt={j.alt || j.title}
                        fill
                        priority={idx === 0 || idx === 1}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-contain"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/30 to-transparent pointer-events-none z-10" />

              <Link
                href={`/tours/${activeJourney.slug}`}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label={`View ${activeJourney.title} itinerary`}
              />

              <div className="absolute top-7 left-7 z-20 flex items-center gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-widest uppercase text-white bg-forest/90 backdrop-blur-md px-3 py-1.5 border border-gold/40">
                  <Clock size={11} className="text-gold" />
                  {activeJourney.duration?.days}D /{" "}
                  {activeJourney.duration?.nights}N
                </span>
                {activeJourney.categories && activeJourney.categories[0] && (
                  <span className="inline-flex font-sans text-xs font-medium tracking-wider uppercase text-gold bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/15">
                    {activeJourney.categories[0].replace(/-/g, " ")}
                  </span>
                )}
              </div>

              <div className="absolute bottom-8 left-8 right-24 z-20">
                {activeJourney.destinations &&
                  activeJourney.destinations.length > 0 && (
                    <div className="flex items-center gap-1.5 font-sans text-xs tracking-wider text-ivory/85 mb-2">
                      <MapPin size={11} className="text-gold shrink-0" />
                      <span>
                        {activeJourney.destinations.slice(0, 4).join(" · ")}
                      </span>
                    </div>
                  )}

                <h4 className="font-serif text-xl lg:text-2xl font-normal text-white uppercase tracking-wide leading-tight drop-shadow-md mb-4">
                  {activeJourney.title}
                </h4>

                <div className="flex items-center gap-4 pointer-events-auto">
                  <Link
                    href={`/tours/${activeJourney.slug}`}
                    className="btn btn-sm btn-gold"
                    aria-label={`View itinerary for ${activeJourney.title}`}
                  >
                    <span>View Itinerary</span>
                    <ArrowRight size={13} />
                  </Link>

                  {activeJourney.pricing &&
                    activeJourney.pricing.priceFrom > 0 && (
                      <span className="font-sans text-xs font-medium tracking-wider text-gold">
                        From{" "}
                        {formatPrice(
                          activeJourney.pricing.priceFrom,
                          activeJourney.pricing.currency,
                        )}
                      </span>
                    )}
                </div>
              </div>
              <div className="absolute bottom-8 right-8 z-20 flex items-baseline gap-1 font-serif text-gold pointer-events-none">
                <span className="font-serif text-3xl font-normal text-ivory leading-none">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-xs opacity-60">
                  / {String(displayJourneys.length).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 flex flex-col gap-2.5">
                {displayJourneys.map((j, i) => (
                  <button
                    key={j.slug || i}
                    className={`w-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === i
                        ? "bg-gold h-5.5 scale-125"
                        : "bg-ivory/35 hover:bg-gold/80 h-1.5"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToJourney(i);
                    }}
                    aria-label={`Jump to ${j.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
