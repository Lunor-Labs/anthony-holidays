"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Compass, MapPin } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";

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

const FALLBACK_JOURNEYS: DiscoverJourneyItem[] = [
  {
    id: "essence-of-ceylon",
    slug: "essence-of-ceylon",
    title: "The Essence of Ceylon",
    tagline: "Short on time, but hungry for adventure",
    excerpt:
      "Experience the iconic Lion Rock, the ancient cave sanctuaries of Dambulla, and the spiritual citadel of Kandy. A curated journey designed for travellers who refuse to compromise on intellectual depth or private comfort.",
    duration: { days: 3, nights: 4 },
    pricing: { priceFrom: 1250, currency: "USD" },
    coverImage:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1600&q=85",
    alt: "5th-century Sigiriya Rock Fortress rising above forest canopy",
    destinations: ["Sigiriya", "Dambulla", "Kandy", "Peradeniya"],
    categories: ["Culture & Heritage", "Citadels"],
  },
  {
    id: "tea-trails-ancient-temples",
    slug: "tea-trails-ancient-temples",
    title: "Tea Trails & Ancient Temples",
    tagline: "From misty highland peaks to sacred ruins",
    excerpt:
      "Journey from the Cultural Triangle's ancient citadels into the cool, emerald tea estates of Nuwara Eliya and Hatton. Colonial bungalow living, scenic high-altitude railways, and centuries of tea-making heritage.",
    duration: { days: 7, nights: 6 },
    pricing: { priceFrom: 2180, currency: "USD" },
    coverImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85",
    alt: "Misty tea plantations and highlands in Nuwara Eliya",
    destinations: ["Sigiriya", "Polonnaruwa", "Kandy", "Nuwara Eliya", "Hatton"],
    categories: ["Highlands", "Tea Heritage"],
  },
  {
    id: "classic-triangle-and-wildlife",
    slug: "classic-triangle-and-wildlife",
    title: "The Classic Triangle & Wildlife",
    tagline: "The quintessential Ceylon expedition",
    excerpt:
      "Track wild Asian leopards across Yala's scrub wilderness, witness massive elephant gatherings at dusk, and scale the granite heights of Sigiriya. A masterclass in wildlife and royal archaeological history.",
    duration: { days: 10, nights: 9 },
    pricing: { priceFrom: 2950, currency: "USD" },
    coverImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85",
    alt: "Wild Sri Lankan leopard resting in Yala National Park",
    destinations: ["Colombo", "Sigiriya", "Kandy", "Ella", "Yala Safari", "Galle Fort"],
    categories: ["Wildlife Safari", "Archaeology"],
  },
  {
    id: "heritage-and-southern-coast",
    slug: "heritage-and-southern-coast",
    title: "Heritage & Southern Coast",
    tagline: "Colonial ramparts, blue whales, and ocean breeze",
    excerpt:
      "Descend from the misty central highlands into the sun-drenched southern rim. Explore the UNESCO-listed 17th-century Galle Dutch Fort, cruise offshore for blue whales, and unwind along secluded golden arcs.",
    duration: { days: 8, nights: 7 },
    pricing: { priceFrom: 2450, currency: "USD" },
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=85",
    alt: "Historic Galle Dutch Fort ramparts overlooking the Indian Ocean",
    destinations: ["Kandy", "Ella", "Yala", "Mirissa Coast", "Galle Dutch Fort"],
    categories: ["Southern Coast", "Colonial History"],
  },
  {
    id: "grand-sri-lankan-loop",
    slug: "grand-sri-lankan-loop",
    title: "The Grand Sri Lankan Loop",
    tagline: "The complete, immersive island odyssey",
    excerpt:
      "The definitive Sri Lankan grand tour. Traverse the ancient northern capitals, cloud-capped tea trails, untamed safari territories, and colonial spice ports with expert private guide lecturing throughout.",
    duration: { days: 14, nights: 13 },
    pricing: { priceFrom: 4200, currency: "USD" },
    coverImage:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&q=85",
    alt: "Coastal palm fringed waters and southern Ceylon shoreline",
    destinations: ["Anuradhapura", "Sigiriya", "Kandy", "Hatton", "Yala", "Mirissa", "Colombo"],
    categories: ["Grand Tour", "Total Immersion"],
  },
];

export function DiscoverSriLankaSection({
  journeys,
}: DiscoverSriLankaSectionProps) {
  // Use passed journeys if non-empty, otherwise use rich theme fallbacks
  const displayJourneys: DiscoverJourneyItem[] =
    journeys && journeys.length > 0
      ? journeys.slice(0, 5).map((j, idx) => ({
          ...j,
          coverImage:
            j.coverImage && j.coverImage.trim() !== ""
              ? j.coverImage
              : FALLBACK_JOURNEYS[idx % FALLBACK_JOURNEYS.length].coverImage,
        }))
      : FALLBACK_JOURNEYS;

  const [activeIndex, setActiveIndex] = useState(0);
  const journeyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to sync active journey smoothly as user scrolls
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
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [displayJourneys.length]);

  // Silky continuous RAF LERP for the right sticky image parallax
  useEffect(() => {
    let rafId: number;
    let targetY = 0;
    let currentY = 0;
    const lerp = 0.08;

    const loop = () => {
      if (sectionRef.current && imageInnerRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        const diff = elementCenter - screenCenter;

        targetY = diff * -0.07;
        targetY = Math.max(-50, Math.min(50, targetY));

        currentY += (targetY - currentY) * lerp;
        imageInnerRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollToJourney = (index: number) => {
    setActiveIndex(index);
    const target = journeyRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activeJourney = displayJourneys[activeIndex] || displayJourneys[0];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-ivory text-forest relative z-10"
      aria-label="Curated Journeys - Discover Sri Lanka"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-16 items-start">
          {/* ── LEFT COLUMN: Text narrative and scrollable journeys ── */}
          <div className="flex flex-col">
            {/* Header Block matching Authenticities Sri Lanka aesthetic */}
            <div className="pb-10 lg:pb-14 border-b border-gold/30 mb-6">
              <span className="inline-flex items-center gap-2.5 font-sans text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-3.5">
                <Compass size={14} className="text-gold" />
                Curated Journeys · Discover Sri Lanka
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.14] tracking-[0.03em] uppercase text-forest mb-5">
                A Land of Living Heritage
              </h2>
              <span className="w-14 h-[1px] bg-gold mb-6 block" />
              <p className="font-sans text-base lg:text-lg font-light leading-[1.85] text-forest/80 max-w-[620px] mb-8">
                We are an island nation devoted to our heritage, deeply influenced by
                millennia of culture, yet true to our roots. Explore our handcrafted
                private itineraries led by licensed national tourist guide lecturers —
                designed with intellectual depth, private comfort, and authentic emotion.
              </p>
              <Link
                href="/tours"
                className="inline-flex items-center gap-4 text-charcoal font-sans text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase group w-fit transition-colors duration-300 hover:text-gold"
              >
                <span className="w-11 h-11 rounded-full border border-forest flex items-center justify-center text-forest transition-all duration-300 group-hover:bg-forest group-hover:text-ivory group-hover:translate-x-1 shrink-0">
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
                <span>EXPLORE ALL JOURNEYS</span>
              </Link>
            </div>

            {/* Journeys list that user scrolls through */}
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
                    {/* Meta row: Number + Line + Duration Badge + Category */}
                    <div className="flex items-center justify-between gap-4 mb-3.5 flex-wrap">
                      <div className="flex items-center gap-3.5 font-serif text-3xl lg:text-4xl text-gold font-normal leading-none">
                        <span>{formattedNum}</span>
                        <span
                          className={`h-[1px] bg-gold transition-all duration-500 ${
                            isActive ? "w-16 opacity-100" : "w-10 opacity-60"
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium tracking-wider uppercase text-forest bg-gold/15 px-2.5 py-1 border border-gold/30 rounded-xs">
                          <Clock size={12} className="text-gold" />
                          {formatDuration(
                            journey.duration?.days || 1,
                            journey.duration?.nights || 0
                          )}
                        </span>
                        <span className="inline-flex font-sans text-xs font-medium tracking-widest uppercase text-stone bg-black/5 px-2.5 py-1 rounded-xs">
                          {categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Journey Title */}
                    <h3 className="font-serif text-2xl lg:text-3xl font-normal uppercase tracking-wide text-forest leading-tight mb-3">
                      <Link
                        href={`/tours/${journey.slug}`}
                        className="hover:text-gold transition-colors inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {journey.title}
                      </Link>
                    </h3>

                    {/* Destinations Route Breadcrumb */}
                    {journey.destinations && journey.destinations.length > 0 && (
                      <div className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-wide text-stone mb-4">
                        <MapPin size={13} className="text-gold shrink-0" />
                        <span className="leading-snug">
                          {journey.destinations.join("  ·  ")}
                        </span>
                      </div>
                    )}

                    {/* Mobile-only inline image fallback */}
                    <div className="lg:hidden relative w-full aspect-[16/10] overflow-hidden my-6 border border-gold/30 shadow-md">
                      <Image
                        src={journey.coverImage}
                        alt={journey.alt || journey.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
                        <span className="bg-forest/90 px-2.5 py-1 backdrop-blur-sm tracking-wide text-xs font-medium border border-gold/30">
                          {journey.duration?.days}D / {journey.duration?.nights}N
                        </span>
                        {journey.pricing && journey.pricing.priceFrom > 0 && (
                          <span className="bg-gold text-forest font-semibold px-2.5 py-1 text-xs">
                            From{" "}
                            {formatPrice(
                              journey.pricing.priceFrom,
                              journey.pricing.currency
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Excerpt / Summary */}
                    <p className="font-sans text-sm font-light leading-[1.8] text-forest/80 max-w-[580px] mb-6">
                      {journey.excerpt || journey.tagline}
                    </p>

                    {/* Footer: Price & Explore CTA */}
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
                                journey.pricing.currency
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
                        className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-forest bg-gold/15 px-5 py-2.5 border border-gold/40 rounded-xs transition-all duration-300 hover:bg-forest hover:text-ivory hover:border-forest group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>VIEW ITINERARY</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: FIXED / STICKY IMAGE PANEL ── */}
          <div
            className="hidden lg:block relative sticky top-[110px] h-[calc(100vh-150px)] min-h-[580px] max-h-[760px]"
            aria-hidden="true"
          >
            <div className="relative w-full h-full overflow-hidden bg-forest border border-gold/35 shadow-[0_24px_60px_-15px_rgba(28,58,46,0.25)]">
              {/* Hardware-accelerated LERP translation wrapper */}
              <div
                ref={imageInnerRef}
                className="absolute inset-x-0 w-full"
                style={{
                  top: "-10%",
                  height: "120%",
                  willChange: "transform",
                }}
              >
                {/* Stacked crossfade image layers */}
                {displayJourneys.map((j, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <div
                      key={j.slug || idx}
                      className="absolute inset-0"
                      style={{
                        opacity: isSelected ? 1 : 0,
                        transform: isSelected ? "scale(1.02)" : "scale(1.08)",
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
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/30 to-transparent pointer-events-none z-10" />

              {/* Top Badge: Duration & Category */}
              <div className="absolute top-7 left-7 z-20 flex items-center gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-widest uppercase text-white bg-forest/90 backdrop-blur-md px-3 py-1.5 border border-gold/40">
                  <Clock size={11} className="text-gold" />
                  {activeJourney.duration?.days}D / {activeJourney.duration?.nights}N
                </span>
                {activeJourney.categories && activeJourney.categories[0] && (
                  <span className="inline-flex font-sans text-xs font-medium tracking-wider uppercase text-gold bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/15">
                    {activeJourney.categories[0].replace(/-/g, " ")}
                  </span>
                )}
              </div>

              {/* Bottom Info: Route, Title, and Action */}
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
                    className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-forest bg-gold px-4 py-2 rounded-xs transition-all duration-300 hover:bg-gold-light hover:translate-x-0.5 group"
                  >
                    <span>VIEW ITINERARY</span>
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  {activeJourney.pricing &&
                    activeJourney.pricing.priceFrom > 0 && (
                      <span className="font-sans text-xs font-medium tracking-wider text-gold">
                        From{" "}
                        {formatPrice(
                          activeJourney.pricing.priceFrom,
                          activeJourney.pricing.currency
                        )}
                      </span>
                    )}
                </div>
              </div>

              {/* Chapter counter at bottom right */}
              <div className="absolute bottom-8 right-8 z-20 flex items-baseline gap-1 font-serif text-gold pointer-events-none">
                <span className="font-serif text-3xl font-normal text-ivory leading-none">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-xs opacity-60">
                  / {String(displayJourneys.length).padStart(2, "0")}
                </span>
              </div>

              {/* Vertical navigation dots */}
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
