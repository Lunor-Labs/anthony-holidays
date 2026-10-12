import React from "react";
import Image from "next/image";

export function PhilosophySection() {
  return (
    <section className="py-16 lg:py-28 bg-offwhite">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <p className="section-label text-gold mb-3">
              The Essence of Anthony Holidays
            </p>
            <h2 className="text-heading-2 text-forest font-serif text-3xl md:text-4xl leading-snug mb-6 font-normal">
              Travel shaped by national lecturers, not call centres.
            </h2>
            <p className="text-stone text-base leading-relaxed mb-5">
              At Anthony Holidays, we believe that an extraordinary journey
              cannot be mass-produced. Sri Lanka is an island of delicate
              nuances - ancient Buddhist chronicles carved into granite,
              mist-covered Ceylon tea estates, wildlife corridors sheltered by
              sacred traditions, and coastal villages thriving in rhythms
              unchanged for generations.
            </p>
            <p className="text-stone text-base leading-relaxed mb-8">
              Our founders and senior guides hold Sri Lanka’s most rigorous
              travel credential: the Licensed National Tourist Guide Lecturer
              license awarded by the Ministry of Tourism. This ensures our
              guests travel with scholars, storytellers, and licensed
              naturalists who unlock doors closed to standard tour operators.
            </p>
            <div className="border-l-2 border-gold pl-6 py-2 bg-secondary/10">
              <blockquote className="font-serif italic text-lg text-forest leading-relaxed">
                “We do not simply escort travellers across Sri Lanka; we
                introduce you to our ancestral home with profound care,
                precision, and heartfelt hospitality.”
              </blockquote>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&q=85"
                alt="Licensed Guide in Sri Lanka"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-forest text-ivory p-6 max-w-[280px] shadow-xl hidden md:block">
              <p className="font-serif text-2xl text-gold font-normal mb-1">
                SLTDA Certified
              </p>
              <p className="text-xs text-ivory/75 leading-relaxed">
                Highest national level of travel lecturing and private guiding
                credentials in Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
