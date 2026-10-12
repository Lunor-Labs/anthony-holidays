import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_MEDIA } from "@/lib/media-catalog";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";

const marqueeWords = [
  "Culture",
  "Wildlife",
  "Heritage",
  "Tea",
  "Beaches",
  "Temples",
  "Spice",
  "Rainforest",
];

export function HeroSection() {
  return (
    <>
      <section
        className="relative h-[100dvh] min-h-[600px] flex items-end overflow-hidden"
        aria-label="Hero"
      >
        {/* Cinematic background with zoom animation */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_MEDIA.homeHero.url}
            alt={HERO_MEDIA.homeHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] animate-[imageZoom_12s_ease-out_forwards] will-change-transform"
          />
        </div>

        {/* Deep gradient overlay — cinematic dark contrast */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/85 pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-20 pb-16 md:pb-24 lg:pb-32 container w-full">
          <div className="max-w-4xl">
            {/* Label with animated line */}
            <p className="section-label animate-fade-in text-secondary/90">
              Sri Lanka Journeys
            </p>

            {/* Line-by-line reveal */}
            <h1 className="text-display text-ivory mb-6 font-light leading-[0.95]">
              <span className="block overflow-hidden">
                <span
                  className="block animate-fade-in-up opacity-0"
                  style={{ animationDelay: "200ms" }}
                >
                  Sri Lanka,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block animate-fade-in-up italic opacity-0"
                  style={{ animationDelay: "500ms" }}
                >
                  Authentically
                </span>
              </span>
            </h1>

            <p className="text-base md:text-lg font-sans animate-fade-in-up animation-delay-800 text-ivory/85 max-w-lg mb-10 leading-relaxed tracking-wide drop-shadow-sm font-light">
              Expert-led private journeys across the ancient island — crafted by
              licensed national tourist guide lecturers who know every stone,
              every story, every sunrise.
            </p>

            <div className="animate-fade-in-up animation-delay-1000 flex flex-wrap gap-4">
              <Link href="/start-planning" className="btn btn-gold">
                Start Planning Your Journey
                <ArrowRight size={15} />
              </Link>
              <Link href="/tours" className="btn btn-outline-ivory">
                Explore Tour Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 text-ivory/50 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <span className="[writing-mode:vertical-rl] text-xs tracking-[0.18em] uppercase font-sans">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-ivory/50 to-transparent" />
        </div>
      </section>

      {/* Marquee ticker below hero */}
      <div className="py-8 bg-ivory overflow-hidden border-b border-sand/40">
        <MarqueeTicker items={marqueeWords} theme="dark" />
      </div>
    </>
  );
}
