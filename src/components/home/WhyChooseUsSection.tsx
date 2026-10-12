import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const differentiators = [
  {
    number: "01",
    title: "Expert Guides",
    desc: "Led by Licensed National Tourist Guide Lecturers — Sri Lanka's highest state qualification.",
  },
  {
    number: "02",
    title: "Genuine Expertise",
    desc: "Deeply personal knowledge of Sri Lanka's history, biodiversity, hidden gems, and cultural heritage.",
  },
  {
    number: "03",
    title: "Tailor-Made",
    desc: "Every itinerary is curated around your pace, preferences, and personal travel style. Never off-the-shelf.",
  },
  {
    number: "04",
    title: "Local Connections",
    desc: "Privileged access to families, artisans, monastery abbotts, and sanctuaries that standard tours cannot reach.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-cream" aria-labelledby="why-heading">
      <div className="container">
        <ScrollReveal direction="up">
          <SectionHeading
            label="Why Travel With Us"
            title="The Difference"
            highlight="Expertise Makes"
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          {differentiators.map((item, i) => (
            <ScrollReveal
              key={item.number}
              direction="up"
              delay={(i * 100) as any}
            >
              <div className="group cursor-default">
                {/* Large decorative number — Authenticities style */}
                <p
                  className="font-serif text-7xl lg:text-8xl font-light text-gold leading-none mb-2 opacity-20 tracking-tighter"
                  aria-hidden="true"
                >
                  {item.number}
                </p>
                <span className="w-12 h-[1px] bg-gold my-6 block" />
                <h3 className="font-serif text-xl font-normal text-forest mb-3 tracking-wide uppercase">
                  {item.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
