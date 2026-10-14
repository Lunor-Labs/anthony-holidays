import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function AboutHero() {
  return (
    <section
      className="relative h-[500px] md:h-[600px] lg:h-[680px] flex items-center justify-center overflow-hidden bg-charcoal"
      aria-label="About Hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/about/sri-lanka-ceylon-heritage-about-hero.jpg"
          alt="Historic Nine Arch Bridge in Demodara at golden sunrise with blue passenger train in Sri Lanka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 text-center">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm mb-6 text-ivory/60 justify-center"
        >
          <Link
            href="/"
            className="text-ivory/60 hover:text-ivory transition-colors"
          >
            Home
          </Link>
          <span aria-hidden="true" className="text-ivory/40">
            ·
          </span>
          <span className="text-gold">About Us</span>
        </nav>

        <p className="section-label text-gold mb-3 justify-center">
          Our Heritage &amp; Philosophy
        </p>
        <h1 className="text-heading-1 text-ivory mb-6 font-light">
          Stewards of Ceylon’s Living Heritage
        </h1>
        <p className="text-ivory/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Founded and directed by Sri Lanka Tourism Development Authority
          Licensed National Tourist Guide Lecturers, dedicated to genuine
          cultural immersion and peerless private journeys.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#team"
            className="btn btn-sm btn-gold font-semibold"
          >
            Meet Our Guiding Team
          </a>
        </div>
      </div>
    </section>
  )
}
