"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function IntroSection() {
  return (
    <section
      className="section-padding bg-white relative overflow-hidden"
      aria-label="Travel Beyond the Ordinary - Authentic Ceylon"
    >
      <div className="container">
        {/* Top Centered Section Heading */}
        <div className="text-center max-w-[800px] mx-auto mb-14 lg:mb-20">
          <ScrollReveal direction="up">
            <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Travel Beyond the Ordinary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.03em] uppercase text-charcoal leading-[1.18]">
              Experience Sri Lanka
              <br />
              With Soul &amp; Authenticity
            </h2>
          </ScrollReveal>
        </div>

        {/* Two-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait image with smooth parallax scroll effect */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={150}>
              <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <ParallaxImage
                  src="/images/travel-beyond-ordinary.jpg"
                  alt="Traveller exploring dramatic coastal landscapes in Sri Lanka with Anthony Holidays"
                  aspectRatio="4/5"
                  speed={0.16}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="rounded-none"
                />

                {/* Subtle Luxury Floating Credential Badge */}
                <div className="absolute -bottom-6 -right-6 bg-forest text-ivory p-6 max-w-[260px] shadow-2xl border border-gold/30 hidden sm:block">
                  <p className="font-serif text-xl text-gold font-normal mb-1">
                    Authentic Ceylon
                  </p>
                  <p className="text-xs text-ivory/75 leading-relaxed font-light">
                    Private expeditions led by Licensed National Tourist Guide Lecturers.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative text + Trust points + Circular arrow button */}
          <div className="lg:col-span-6 lg:pl-4">
            <ScrollReveal direction="right" delay={250}>
              <p className="font-sans text-base font-light leading-[1.88] text-stone mb-6">
                At Anthony Holidays, we believe true exploration cannot be scripted
                in a distant office or rushed through standard tour trails. Sri Lanka
                is a living mosaic of intimate wonders: mist-shrouded tea mountains
                rising above cloud forests, untamed wildlife corridors guarded by
                ancient traditions, and dramatic ocean headlands where turquoise
                waters kiss golden sands.
              </p>

              <p className="font-sans text-base font-light leading-[1.88] text-stone mb-8">
                Led by Licensed National Tourist Guide Lecturers and trusted
                private chauffeurs, our journeys are handcrafted to immerse you in
                the genuine rhythm of our island. We unlock sacred heritage sites
                before the crowds arrive, introduce you to local artisans and
                village kitchens, and calibrate every day to your personal
                cadence - ensuring you experience Ceylon not merely as a visitor,
                but as an invited guest welcomed into our ancestral home.
              </p>

              {/* Guiding Principles / Trust Highlights */}
              <div className="grid grid-cols-2 gap-6 pt-6 pb-2 border-t border-sand/60 mb-6">
                <div>
                  <span className="block font-serif text-2xl text-forest font-normal mb-1">
                    100% Bespoke
                  </span>
                  <span className="text-xs text-stone tracking-wide leading-relaxed block">
                    Privately calibrated around your pace and passions
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-forest font-normal mb-1">
                    SLTDA Certified
                  </span>
                  <span className="text-xs text-stone tracking-wide leading-relaxed block">
                    Licensed National Tourist Guide Lecturers &amp; Naturalists
                  </span>
                </div>
              </div>

              <Link href="/about" className="theme-btn-circle group">
                <span className="theme-btn-circle__icon">
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
                <span>DISCOVER OUR STORY</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
