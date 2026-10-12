import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const differentiators = [
  {
    number: "01",
    title: "Expert Guides",
    desc: "Led by Licensed National Tourist Guide Lecturers - Sri Lanka’s highest state qualification.",
  },
  {
    number: "02",
    title: "Genuine Expertise",
    desc: "Deeply personal knowledge of Sri Lanka’s history, biodiversity, hidden gems, and cultural heritage.",
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
    <section className="section bg-cream" aria-labelledby="why-heading">
      <div className="container">
        <SectionHeading
          label="Why Travel With Us"
          title="The Difference"
          highlight="Expertise Makes"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {differentiators.map((item) => (
            <div key={item.number}>
              <p
                className="font-serif text-6xl font-light text-gold/40 leading-none mb-4"
                aria-hidden="true"
              >
                {item.number}
              </p>
              <div className="divider" />
              <h3 className="font-serif text-xl font-normal text-forest mb-3">
                {item.title}
              </h3>
              <p className="text-[15px] text-stone leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
