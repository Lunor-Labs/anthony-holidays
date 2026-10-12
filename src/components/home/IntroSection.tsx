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
      aria-label="Experience Sri Lanka With Emotion"
    >
      <div className="container">
        {/* Top Centered Common Heading matching Authenticities Sri Lanka */}
        <div className="text-center max-w-[800px] mx-auto mb-14 lg:mb-20">
          <ScrollReveal direction="up">
            <span className="block font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Travel Beyond the Ordinary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.03em] uppercase text-charcoal leading-[1.18]">
              Experience Sri Lanka
              <br />
              With Emotion
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
                  src="https://authenticitiessrilanka.eme-devops.com/2026/04/ASL-site-images-update-Apr-2026.png?w=750&h=800&fit=crop&crop=center&auto=compress&auto=format&auto=enhance&q=75"
                  alt="Experience Sri Lanka luxury colonial retreat and heritage"
                  aspectRatio="4/5"
                  speed={0.16}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="rounded-none"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative text + Circular arrow button */}
          <div className="lg:col-span-6 lg:pl-4">
            <ScrollReveal direction="right" delay={250}>
              <p className="font-sans text-base font-light leading-[1.88] text-stone mb-8">
                Sri Lanka, an enigmatic land of magical vistas and diverse cultures,
                invites you on a journey. This pearl-shaped country blends fascinating
                cultures with a rich colonial past and multi-ethnic roots. Our island
                brims with treasures, adventures for adrenaline junkies, and sensorial
                delights that will take your breath away. The people, our greatest
                wealth, are passionately proud of their heritage. Our history, shaped
                by visitors, invasions, and colonisation, enriches the culture.
                Journey through Sri Lanka to experience a warm welcome and feel truly
                at home.
              </p>

              <Link href="/about" className="theme-btn-circle group">
                <span className="theme-btn-circle__icon">
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
                <span>EXPLORE ALL</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
