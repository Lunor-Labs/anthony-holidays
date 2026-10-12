import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function CallToActionSection() {
  return (
    <section
      className="section relative overflow-hidden bg-forest"
      aria-label="Start planning your journey"
    >
      {/* Ambient background photo */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&q=60"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="container relative z-10 text-center">
        <p className="section-label justify-center text-gold">
          Your Journey Begins Here
        </p>
        <h2 className="text-heading-1 text-ivory mb-5 max-w-2xl mx-auto">
          Ready to Discover
          <br />
          <em className="italic text-gold">the Real Sri Lanka?</em>
        </h2>
        <p className="text-ivory/75 text-[17px] max-w-lg mx-auto mb-12 leading-relaxed">
          Tell us your travel dreams. We'll craft a bespoke Sri Lanka journey
          that exceeds every expectation.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link href="/start-planning" className="btn btn-gold text-sm px-10">
            Start Planning Your Journey
            <ArrowRight size={15} />
          </Link>
          <Link href="/tours" className="btn btn-outline-ivory text-sm">
            Browse Tour Packages
          </Link>
        </div>
      </div>
    </section>
  )
}
