"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface DifferentiatorPanel {
  id: string;
  number: string;
  tabTitle: string;
  heading: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
}

const panels: DifferentiatorPanel[] = [
  {
    id: "licensed-guide-lecturers",
    number: "01",
    tabTitle: "Licensed Guides",
    heading: "Led by National Tourist Guide Lecturers",
    tagline: "SLTDA Certified · Academic Scholars",
    description:
      "Every journey is guided by licensed National Tourist Guide Lecturers - Sri Lanka's highest state qualification. Academic historians and certified naturalists who bring the island alive.",
    highlights: [
      "100% SLTDA Certified National Tourist Guide Lecturers",
      "Academic depth in archaeology, history & biodiversity",
      "Unscripted storytelling tailored to your curiosities",
    ],
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1600&q=85",
    imageAlt: "Cultural scholar guide sharing Sri Lankan heritage",
    ctaText: "Meet Our Guides",
    ctaHref: "/about#team",
  },
  {
    id: "bespoke-tailor-made",
    number: "02",
    tabTitle: "Tailor-Made Pacing",
    heading: "Calibrated to Your Personal Cadence",
    tagline: "100% Private · Unhurried Rhythm",
    description:
      "No rigid group schedules or commercial checklists. Your private vehicle, chauffeur, and guide adapt in real time to your waking hours, interests, and spontaneous discoveries.",
    highlights: [
      "Custom day-by-day itineraries with private luxury vehicles",
      "Flexible on-trip timing - explore at your own pace",
      "Crafted for couples, families, and solo travellers",
    ],
    image:
      "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600&q=85",
    imageAlt: "Nine Arch Bridge in Ceylon highland tea country",
    ctaText: "Plan Your Journey",
    ctaHref: "/start-planning",
  },
  {
    id: "privileged-access",
    number: "03",
    tabTitle: "Insider Access",
    heading: "Doorways Closed to Commercial Crowds",
    tagline: "Private Blessings · Heritage Sanctuaries",
    description:
      "Decades of personal island relationships grant you private dawn entries to UNESCO citadels, intimate forest hermitage monk blessings, and authentic village hearth dining.",
    highlights: [
      "Early-access entry to Sigiriya & Polonnaruwa before crowds",
      "Private Buddhist monastery blessings and chanting",
      "Exclusive access to heirloom spice gardens & artisan homes",
    ],
    image:
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1600&q=85",
    imageAlt: "Sigiriya Lion Rock Fortress rising above jungle canopy",
    ctaText: "Explore Private Tours",
    ctaHref: "/tours",
  },
  {
    id: "direct-honest-service",
    number: "04",
    tabTitle: "Direct Service",
    heading: "Direct Relationship From Start to Finish",
    tagline: "Zero Middlemen · 24/7 Island Support",
    description:
      "Deal directly with founder Anthony and senior guide lecturers from first inquiry to airport farewell. Transparent luxury pricing with zero hidden commissions and 24/7 support.",
    highlights: [
      "Direct personal consultation with founder Anthony",
      "Honest, transparent luxury pricing with no markups",
      "24/7 on-island concierge from arrival to departure",
    ],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
    imageAlt: "Luxury Sri Lankan boutique hotel pool pavilion",
    ctaText: "Speak With Anthony",
    ctaHref: "/contact",
  },
];

const TAB_WIDTH = 58;

export function WhyChooseUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const containerWidthRef = useRef(1200);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastAppliedPRef = useRef(-1);
  const isManualClickRef = useRef(false);
  const manualClickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeIndexRef = useRef(0);

  // Directly sets GPU-accelerated translation for 60/120fps buttery-smooth wipe
  const applyPositions = useCallback((p: number) => {
    const W = containerWidthRef.current || 1200;
    const T = TAB_WIDTH;

    // phase 1: from p = 0 to 1/3 (Pillar 02 smoothly wipes from W - 3T to T)
    const t1 = Math.max(0, Math.min(1, p / (1 / 3)));
    const x1Start = W - 3 * T;
    const x1End = T;
    const x1 = x1Start + (x1End - x1Start) * t1;

    // phase 2: from p = 1/3 to 2/3 (Pillar 03 smoothly wipes from W - 2T to 2T)
    const t2 = Math.max(0, Math.min(1, (p - 1 / 3) / (1 / 3)));
    const x2Start = W - 2 * T;
    const x2End = 2 * T;
    const x2 = x2Start + (x2End - x2Start) * t2;

    // phase 3: from p = 2/3 to 1.0 (Pillar 04 smoothly wipes from W - T to 3T)
    const t3 = Math.max(0, Math.min(1, (p - 2 / 3) / (1 / 3)));
    const x3Start = W - T;
    const x3End = 3 * T;
    const x3 = x3Start + (x3End - x3Start) * t3;

    if (panelRefs.current[1]) {
      panelRefs.current[1].style.transform = `translate3d(${x1.toFixed(2)}px, 0, 0)`;
    }
    if (panelRefs.current[2]) {
      panelRefs.current[2].style.transform = `translate3d(${x2.toFixed(2)}px, 0, 0)`;
    }
    if (panelRefs.current[3]) {
      panelRefs.current[3].style.transform = `translate3d(${x3.toFixed(2)}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const w = container.offsetWidth;
      if (w > 0) {
        setContainerWidth(w);
        containerWidthRef.current = w;
        applyPositions(currentProgressRef.current);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, [applyPositions]);

  // Scroll listener + RAF Damping Loop (gives exact thetailor.com slow, continuous opening)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (isManualClickRef.current) return;

      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const stickyOffset = 64;
      const totalScrollDistance = el.offsetHeight - windowHeight;

      if (totalScrollDistance <= 0) return;

      const scrolled = -rect.top + stickyOffset;
      const rawProgress = Math.max(
        0,
        Math.min(1, scrolled / totalScrollDistance),
      );
      targetProgressRef.current = rawProgress;
    };

    const renderLoop = () => {
      if (window.innerWidth < 1024) {
        rafId = requestAnimationFrame(renderLoop);
        return;
      }

      // Smooth lerp: currentProgress gently chases targetProgress with liquid damping
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.14;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;

      // Only update DOM styles when position actually shifts
      if (Math.abs(p - lastAppliedPRef.current) > 0.0002) {
        lastAppliedPRef.current = p;
        applyPositions(p);
      }

      // Sync activeIndex for top pills & progress bar
      let newActive = 0;
      if (p < 0.18) newActive = 0;
      else if (p < 0.5) newActive = 1;
      else if (p < 0.83) newActive = 2;
      else newActive = 3;

      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive;
        setActiveIndex(newActive);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
      if (manualClickTimerRef.current)
        clearTimeout(manualClickTimerRef.current);
    };
  }, [applyPositions]);

  // Smooth click navigation to any panel
  const scrollToPanel = useCallback((idx: number) => {
    setActiveIndex(idx);
    activeIndexRef.current = idx;

    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const el = sectionRef.current;
    if (!el) return;

    isManualClickRef.current = true;
    if (manualClickTimerRef.current) {
      clearTimeout(manualClickTimerRef.current);
    }

    const targets = [0, 1 / 3, 2 / 3, 1];
    const targetP = targets[idx] ?? 0;
    targetProgressRef.current = targetP;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const stickyOffset = 64;
    const totalScrollDistance = el.offsetHeight - window.innerHeight;

    const targetScroll =
      rect.top + scrollTop - stickyOffset + targetP * totalScrollDistance;

    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: "smooth",
    });

    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 850);
  }, []);

  const contentWidth = Math.max(680, containerWidth - 4 * TAB_WIDTH);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream section-padding lg:py-0 lg:h-[350vh]"
      aria-label="Why Choose Anthony Holidays - The Difference Expertise Makes"
    >
      <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex flex-col lg:justify-center py-2 lg:py-3">
        <div className="container flex flex-col lg:justify-between lg:h-full lg:max-h-[720px]">
          <SectionHeading
            label="Why Choose Us"
            title="The Difference"
            highlight="Expertise Makes"
            className="mb-2 lg:mb-3"
            action={
              <div className="hidden lg:flex flex-col items-end gap-2">
                <div className="flex items-center gap-1.5 xl:gap-2">
                  {panels.map((panel, idx) => (
                    <button
                      key={panel.id}
                      type="button"
                      onClick={() => scrollToPanel(idx)}
                      className={`px-3 py-1.5 xl:px-3.5 xl:py-2 text-xs font-sans uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                        activeIndex === idx
                          ? "bg-forest text-gold border-forest shadow-xs font-semibold"
                          : "bg-white/80 text-stone hover:text-forest border-sand/60 hover:border-forest/40"
                      }`}
                    >
                      {panel.number} · {panel.tabTitle}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 w-full max-w-[320px]">
                  <div className="flex-1 h-[2px] bg-sand/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold transition-all duration-300 ease-out"
                      style={{
                        width: `${Math.round(
                          ((activeIndex + 1) / panels.length) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="font-sans text-xs font-medium tracking-wider uppercase text-stone/80 whitespace-nowrap">
                    Pillar 0{activeIndex + 1} / 04
                  </span>
                </div>
              </div>
            }
          />

          <div
            ref={cardContainerRef}
            className="hidden lg:block relative w-full h-[52vh] min-h-[390px] max-h-[500px] rounded-xs overflow-hidden border border-sand/60 bg-forest shadow-2xl"
          >
            {panels.map((panel, idx) => {
              const isFirst = idx === 0;
              const zIndex = 10 * (idx + 1);

              const initialTransform = isFirst
                ? "none"
                : `translate3d(${containerWidth - (4 - idx) * TAB_WIDTH}px, 0, 0)`;

              return (
                <div
                  key={panel.id}
                  ref={(el) => {
                    panelRefs.current[idx] = el;
                  }}
                  className={`absolute inset-y-0 left-0 flex overflow-hidden bg-forest will-change-transform ${
                    isFirst
                      ? "z-10"
                      : "border-l border-white/20 shadow-[-16px_0_32px_rgba(0,0,0,0.55)]"
                  }`}
                  style={{
                    zIndex,
                    transform: initialTransform,
                  }}
                >
                  <div
                    className={`w-[58px] h-full flex flex-col justify-between items-center py-5 shrink-0 select-none border-r border-white/10 transition-colors duration-300 ${
                      activeIndex === idx
                        ? "bg-forest text-gold cursor-default"
                        : "bg-forest/95 text-ivory/70 hover:bg-forest-light/40 hover:text-gold cursor-pointer"
                    }`}
                    onClick={() => scrollToPanel(idx)}
                    title={`Jump to Pillar ${panel.number}: ${panel.tabTitle}`}
                  >
                    <span
                      className={`font-serif text-base transition-colors ${
                        activeIndex === idx
                          ? "text-gold font-medium"
                          : "text-gold/70"
                      }`}
                    >
                      {panel.number}
                    </span>

                    <span
                      className={`font-serif text-xs tracking-[0.2em] uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180 transition-colors ${
                        activeIndex === idx
                          ? "text-gold font-medium"
                          : "text-ivory/80"
                      }`}
                    >
                      {panel.tabTitle}
                    </span>

                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        activeIndex === idx
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-gold/30 text-gold/60 hover:border-gold hover:text-gold"
                      }`}
                    >
                      <span className="text-xs font-semibold">
                        {activeIndex === idx ? "•" : "+"}
                      </span>
                    </div>
                  </div>

                  <div
                    className="h-full flex shrink-0"
                    style={{ width: `${contentWidth}px` }}
                  >
                    <div className="w-[54%] h-full p-5 sm:p-6 lg:p-5 xl:p-8 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-serif text-xl sm:text-2xl font-light text-gold">
                            {panel.number}
                          </span>
                          <span className="w-3 h-[2px] bg-gold/50" />
                          <span className="font-sans text-xs font-medium tracking-widest uppercase text-ivory/70">
                            {panel.tagline}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl xl:text-2xl font-light text-ivory leading-snug uppercase mb-2">
                          {panel.heading}
                        </h3>

                        <p className="font-sans text-xs lg:text-sm font-light text-ivory/80 leading-relaxed mb-3 line-clamp-3 xl:line-clamp-none">
                          {panel.description}
                        </p>

                        <div className="space-y-1.5 mb-2.5">
                          {panel.highlights.map((h, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-ivory/90 font-light"
                            >
                              <CheckCircle2
                                size={13}
                                className="text-gold shrink-0 mt-0.5"
                              />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2.5 xl:pt-3 border-t border-white/10 flex items-center gap-3 shrink-0">
                        <Link
                          href={panel.ctaHref}
                          className="btn btn-sm btn-gold"
                        >
                          <span>{panel.ctaText}</span>
                          <ArrowRight size={13} />
                        </Link>
                        <Link
                          href="/start-planning"
                          className="btn btn-sm btn-outline-ivory"
                        >
                          Custom Proposal
                        </Link>
                      </div>
                    </div>

                    <div className="w-[46%] h-full relative overflow-hidden border-l border-white/10">
                      <Image
                        src={panel.image}
                        alt={panel.imageAlt}
                        fill
                        sizes="50vw"
                        className="object-cover"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-2 bg-forest/90 backdrop-blur-sm border border-gold/40 px-3 py-1 font-serif text-xs text-gold uppercase tracking-wider">
                          <Award size={12} className="text-gold" />
                          Anthony Holidays Certified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center justify-between text-xs text-stone pt-2">
            <span className="font-sans text-xs tracking-wider uppercase text-stone/70">
              Scroll down to reveal each pillar · or click tabs to jump
            </span>
            <button
              type="button"
              onClick={() =>
                scrollToPanel(Math.min(panels.length - 1, activeIndex + 1))
              }
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors font-medium cursor-pointer"
            >
              <span>Next Pillar</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="lg:hidden space-y-6 mt-6">
            {panels.map((panel) => (
              <div
                key={panel.id}
                className="rounded-xs overflow-hidden border border-sand/40 text-ivory shadow-md bg-forest"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={panel.image}
                    alt={panel.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-forest/90 backdrop-blur-sm border border-gold/40 px-3 py-1 font-serif text-xs text-gold">
                    {panel.number} · {panel.tabTitle}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-sans text-xs font-medium tracking-widest uppercase text-gold">
                      {panel.tagline}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-light text-ivory leading-tight uppercase mb-3">
                    {panel.heading}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm font-light text-ivory/80 leading-relaxed mb-4">
                    {panel.description}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {panel.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-ivory/90 font-light"
                      >
                        <CheckCircle2
                          size={13}
                          className="text-gold shrink-0 mt-0.5"
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-3 border-t border-white/10">
                    <Link href={panel.ctaHref} className="btn btn-sm btn-gold">
                      <span>{panel.ctaText}</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href="/start-planning"
                      className="btn btn-sm btn-outline-ivory"
                    >
                      Custom Proposal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
