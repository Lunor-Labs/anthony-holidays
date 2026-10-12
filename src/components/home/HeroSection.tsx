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
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-forest">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_MEDIA.homeHero.url}
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="/videos/hero-ambuluwawa.mp4" type="video/mp4" />
          <source
            src="https://cdn.pixabay.com/video/2023/08/22/177127-856658451_medium.mp4"
            type="video/mp4"
          />
          <Image
            src={HERO_MEDIA.homeHero.url}
            alt={HERO_MEDIA.homeHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </video>
      </div>
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/20 to-black/85 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20 pb-28 md:pb-36 lg:pb-40 container w-full">
        <div className="max-w-4xl">
          <p className="section-label animate-fade-in text-secondary/90">
            Sri Lanka Journeys
          </p>

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
                className="block animate-fade-in-up opacity-0"
                style={{ animationDelay: "500ms" }}
              >
                Authentically
              </span>
            </span>
          </h1>

          <p className="text-base md:text-lg font-sans animate-fade-in-up animation-delay-800 text-ivory/85 max-w-lg mb-10 leading-relaxed tracking-wide drop-shadow-sm font-light">
            Expert-led private journeys across the ancient island - crafted by
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
      <div className="absolute bottom-0 inset-x-0 z-20 py-4 md:py-5 overflow-hidden bg-gradient-to-t from-black/90 via-black/40 to-transparent border-t border-white/10 backdrop-blur-[2px]">
        <MarqueeTicker items={marqueeWords} theme="light" />
      </div>
    </section>
  );
}
