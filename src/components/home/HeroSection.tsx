import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      {/* Background image */}
      <div className="hero-bg">
        <Image
          src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1920&q=85"
          alt="Sigiriya Rock Fortress rising majestically from the Sri Lankan jungle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </div>

      {/* Gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Hero Content */}
      <div className="hero-content container w-full">
        <div className="max-w-4xl">
          <p className="section-label animate-fade-in-up text-secondary/90">
            Sri Lanka Journeys
          </p>

          <h1 className="text-display animate-fade-in-up animation-delay-200 text-ivory mb-6 font-light">
            Sri Lanka,
            <br />
            <em className="italic">Authentically</em>
          </h1>

          <p className="text-lg md:text-xl font-sans animate-fade-in-up animation-delay-400 text-ivory opacity-90 max-w-lg mb-10 leading-relaxed drop-shadow-sm">
            Expert-led private journeys across the ancient island - crafted by
            licensed national tourist guide lecturers who know every stone,
            every story, every sunrise.
          </p>

          <div className="animate-fade-in-up animation-delay-600 flex flex-wrap gap-4">
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
      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-indicator-text">Scroll</span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
}
