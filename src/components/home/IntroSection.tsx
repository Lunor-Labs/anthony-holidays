import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function IntroSection() {
  return (
    <section className="section bg-ivory" aria-label="About Anthony Holidays">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-label">Who We Are</p>
            <h2 className="text-heading-1 text-forest mb-6">
              Sri Lanka Through
              <br />
              <em className="italic text-forest">Expert Eyes</em>
            </h2>
            <div className="divider" />
            <p className="text-base text-stone mb-5 leading-relaxed">
              Anthony Holidays is a Sri Lankan destination management company
              founded and led by Licensed National Tourist Guide Lecturers - the
              island's most qualified travel professionals.
            </p>
            <p className="text-base text-stone mb-8 leading-relaxed">
              We don't offer package tours. We craft personal journeys - shaped
              by your curiosity, your rhythm, and our decades of deep, intimate
              knowledge of Sri Lanka's landscapes, heritage, wildlife, and
              people.
            </p>
            <Link href="/about" className="btn btn-outline">
              Our Story
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="col-span-1 row-span-2 overflow-hidden aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1546708973-b339540b5162?w=600&q=80"
                  alt="Buddhist temple stupa and heritage Sri Lanka"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"
                  alt="Tropical beach in Sri Lanka"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80"
                  alt="Tea plantation hills in Sri Lanka"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating accent badge */}
            <div className="absolute -bottom-6 -right-6 bg-forest text-ivory p-6 max-w-[220px] shadow-xl">
              <p className="font-serif text-3xl font-light text-gold leading-none">
                Licensed
              </p>
              <p className="text-xs tracking-widest uppercase mt-2 text-ivory/80 leading-relaxed">
                National Tourist
                <br />
                Guide Lecturers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
