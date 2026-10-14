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

export const CURATED_JOURNEY_IMAGES = [
  "/images/journeys/sri-lanka-essence-of-ceylon-sigiriya.jpg",
  "/images/journeys/sri-lanka-tea-trails-ancient-temples-highlands.jpg",
  "/images/journeys/sri-lanka-classic-triangle-wildlife-yala.jpg",
  "/images/journeys/sri-lanka-heritage-southern-coast-galle.jpg",
  "/images/journeys/sri-lanka-grand-loop-anuradhapura-stupa.jpg",
  "/images/journeys/sri-lanka-deep-dive-culture-nature-horton-plains.jpg",
  "/images/journeys/sri-lanka-ramayana-trail-seetha-amman-kovil.jpg",
  "/images/journeys/sri-lanka-ultimate-pearl-experience-wilpattu.jpg",
];

const FALLBACK_JOURNEYS: DiscoverJourneyItem[] = [
  {
    id: "essence-of-ceylon",
    slug: "essence-of-ceylon",
    title: "The Essence of Ceylon",
    tagline: "Short on time, but hungry for adventure",
    excerpt:
      "Experience the iconic Lion Rock, the ancient cave sanctuaries of Dambulla, and the spiritual citadel of Kandy. A curated journey designed for travellers who refuse to compromise on intellectual depth or private comfort.",
    duration: { days: 3, nights: 4 },
    pricing: { priceFrom: 790, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-essence-of-ceylon-sigiriya.jpg",
    alt: "Sigiriya Lion Rock citadel illuminated by morning golden light over lush jungle canopy",
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
    duration: { days: 5, nights: 4 },
    pricing: { priceFrom: 1250, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-tea-trails-ancient-temples-highlands.jpg",
    alt: "Lush emerald tea terraces and historic colonial bungalow in Nuwara Eliya and Hatton highlands",
    destinations: [
      "Sigiriya",
      "Polonnaruwa",
      "Kandy",
      "Nuwara Eliya",
      "Ramboda",
    ],
    categories: ["Highlands", "Tea Heritage"],
  },
  {
    id: "classic-triangle-and-wildlife",
    slug: "classic-triangle-and-wildlife",
    title: "The Classic Triangle & Wildlife",
    tagline: "The quintessential Ceylon expedition",
    excerpt:
      "Track wild Asian leopards across Yala's scrub wilderness, witness massive elephant gatherings at dusk, and scale the granite heights of Sigiriya. A masterclass in wildlife and royal archaeological history.",
    duration: { days: 6, nights: 5 },
    pricing: { priceFrom: 1580, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-classic-triangle-wildlife-yala.jpg",
    alt: "Solitary wild Ceylon leopard perched on a granite rock in Yala National Park at golden hour",
    destinations: [
      "Sigiriya",
      "Hiriwadunna",
      "Dambulla",
      "Kandy",
      "Ella",
      "Yala",
    ],
    categories: ["Wildlife Safari", "Archaeology"],
  },
  {
    id: "heritage-and-southern-coast",
    slug: "heritage-and-southern-coast",
    title: "Heritage & Southern Coast",
    tagline: "Colonial ramparts, blue whales, and ocean breeze",
    excerpt:
      "Descend from the misty central highlands into the sun-drenched southern rim. Explore the UNESCO-listed 17th-century Galle Dutch Fort, cruise offshore for blue whales, and unwind along secluded golden arcs.",
    duration: { days: 7, nights: 6 },
    pricing: { priceFrom: 1790, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-heritage-southern-coast-galle.jpg",
    alt: "Historic white lighthouse and 17th-century ramparts of Galle Dutch Fort along the Indian Ocean",
    destinations: [
      "Anuradhapura",
      "Aukana",
      "Sigiriya",
      "Kandy",
      "Nuwara Eliya",
      "Udawalawe",
      "Galle",
      "Hikkaduwa",
    ],
    categories: ["Southern Coast", "Colonial History"],
  },
  {
    id: "grand-sri-lankan-loop",
    slug: "grand-sri-lankan-loop",
    title: "The Grand Sri Lankan Loop",
    tagline: "The complete, immersive island odyssey",
    excerpt:
      "The definitive Sri Lankan grand tour. Traverse the ancient northern capitals, cloud-capped tea trails, untamed safari territories, and colonial spice ports with expert private guide lecturing throughout.",
    duration: { days: 8, nights: 7 },
    pricing: { priceFrom: 2150, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-grand-loop-anuradhapura-stupa.jpg",
    alt: "Ancient sacred Ruwanwelisaya stupa in Anuradhapura glowing under tranquil dawn skies",
    destinations: [
      "Sigiriya",
      "Polonnaruwa",
      "Minneriya",
      "Dambulla",
      "Kandy",
      "Ella",
      "Yala",
      "Mirissa",
      "Galle",
    ],
    categories: ["Grand Tour", "Total Immersion"],
  },
  {
    id: "deep-dive-culture-and-nature",
    slug: "deep-dive-culture-and-nature",
    title: "Deep Dive: Culture & Nature",
    tagline: "Slow down and see it all",
    excerpt:
      "A leisurely-paced journey exploring the cultural north, the misty central cloud forests of Horton Plains World's End, and secluded southern beach sanctuaries.",
    duration: { days: 9, nights: 8 },
    pricing: { priceFrom: 2450, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-deep-dive-culture-nature-horton-plains.jpg",
    alt: "Dramatic World's End sheer cliff precipice and misty cloud forest in Horton Plains",
    destinations: [
      "Negombo",
      "Anuradhapura",
      "Sigiriya",
      "Polonnaruwa",
      "Kandy",
      "Horton Plains",
      "Ella",
      "Yala",
      "Tangalle",
      "Galle",
    ],
    categories: ["Culture & Nature", "Cloud Forest"],
  },
  {
    id: "ramayana-trail-special",
    slug: "ramayana-trail-special",
    title: "The Ramayana Trail Special",
    tagline: "Walk the path of the Ramayana epic",
    excerpt:
      "A sacred mythological pilgrimage tracing Rama, Sita, and Hanuman across Sri Lanka. Discover sacred mountain shrines, Ravana caves, and ancient legend-steeped kovils.",
    duration: { days: 10, nights: 9 },
    pricing: { priceFrom: 2680, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-ramayana-trail-seetha-amman-kovil.jpg",
    alt: "Sacred ornate Seetha Amman Kovil temple nestled in the misty green mountains of Nuwara Eliya",
    destinations: [
      "Chilaw",
      "Anuradhapura",
      "Mihintale",
      "Sigiriya",
      "Dambulla",
      "Kandy",
      "Ramboda",
      "Nuwara Eliya",
      "Ella",
      "Kataragama",
      "Ussangoda",
      "Galle",
    ],
    categories: ["Spiritual Pilgrimage", "Mythology"],
  },
  {
    id: "ultimate-pearl-experience",
    slug: "ultimate-pearl-experience",
    title: "The Ultimate Pearl Experience",
    tagline: "The definitive two-week island epic",
    excerpt:
      "The masterwork Ceylon expedition. From Wilpattu's leopard-filled jungle lakes to the ancient royal citadels, high-altitude tea trails, and colonial oceanfront ramparts.",
    duration: { days: 14, nights: 13 },
    pricing: { priceFrom: 3850, currency: "USD" },
    coverImage:
      "/images/journeys/sri-lanka-ultimate-pearl-experience-wilpattu.jpg",
    alt: "Untamed Wilpattu National Park natural sand-rimmed lake villu with wild Asian elephants and banyans",
    destinations: [
      "Negombo",
      "Wilpattu",
      "Anuradhapura",
      "Sigiriya",
      "Minneriya",
      "Polonnaruwa",
      "Kandy",
      "Nuwara Eliya",
      "Horton Plains",
      "Ella",
      "Yala",
      "Mirissa",
      "Galle",
      "Colombo",
    ],
    categories: ["Grand Expedition", "Luxury Wildlife"],
  },
];

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

const CURATED_JOURNEY_CONFIG: Record<
  string,
  { image: string; alt: string; fallbackIndex: number }
> = {
  "essence-of-ceylon": {
    image: "/images/journeys/sri-lanka-essence-of-ceylon-sigiriya.jpg",
    alt: "Sigiriya Lion Rock citadel illuminated by morning golden light over lush jungle canopy",
    fallbackIndex: 0,
  },
  "tea-trails-ancient-temples": {
    image:
      "/images/journeys/sri-lanka-tea-trails-ancient-temples-highlands.jpg",
    alt: "Lush emerald tea terraces and historic colonial bungalow in Nuwara Eliya and Hatton highlands",
    fallbackIndex: 1,
  },
  "classic-triangle-and-wildlife": {
    image: "/images/journeys/sri-lanka-classic-triangle-wildlife-yala.jpg",
    alt: "Solitary wild Ceylon leopard perched on a granite rock in Yala National Park at golden hour",
    fallbackIndex: 2,
  },
  "heritage-and-southern-coast": {
    image: "/images/journeys/sri-lanka-heritage-southern-coast-galle.jpg",
    alt: "Historic white lighthouse and 17th-century ramparts of Galle Dutch Fort along the Indian Ocean",
    fallbackIndex: 3,
  },
  "grand-sri-lankan-loop": {
    image: "/images/journeys/sri-lanka-grand-loop-anuradhapura-stupa.jpg",
    alt: "Ancient sacred Ruwanwelisaya stupa in Anuradhapura glowing under tranquil dawn skies",
    fallbackIndex: 4,
  },
  "deep-dive-culture-and-nature": {
    image:
      "/images/journeys/sri-lanka-deep-dive-culture-nature-horton-plains.jpg",
    alt: "Dramatic World's End sheer cliff precipice and misty cloud forest in Horton Plains",
    fallbackIndex: 5,
  },
  "ramayana-trail-special": {
    image:
      "/images/journeys/sri-lanka-ramayana-trail-seetha-amman-kovil.jpg",
    alt: "Sacred ornate Seetha Amman Kovil temple nestled in the misty green mountains of Nuwara Eliya",
    fallbackIndex: 6,
  },
  "ultimate-pearl-experience": {
    image:
      "/images/journeys/sri-lanka-ultimate-pearl-experience-wilpattu.jpg",
    alt: "Untamed Wilpattu National Park natural sand-rimmed lake villu with wild Asian elephants and banyans",
    fallbackIndex: 7,
  },
};

export function DiscoverSriLankaSection({
  journeys,
}: DiscoverSriLankaSectionProps) {
  const displayJourneys: DiscoverJourneyItem[] = CURATED_JOURNEY_SLUGS.map(
    (slug, idx) => {
      const config = CURATED_JOURNEY_CONFIG[slug];
      const match = journeys?.find((j) => j.slug === slug);
      const fallback =
        FALLBACK_JOURNEYS[config.fallbackIndex] || FALLBACK_JOURNEYS[idx];
      return {
        ...fallback,
        ...(match || {}),
        coverImage: config.image,
        alt: config.alt,
      };
    },
  );


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
