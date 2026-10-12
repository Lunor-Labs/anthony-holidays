import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HERO_MEDIA } from '@/lib/media-catalog'

export function AboutHero() {
  return (
    <section
      className="relative h-[clamp(480px,65vh,680px)] flex items-center justify-center overflow-hidden bg-charcoal"
      aria-label="About Hero"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_MEDIA.aboutHero.url}
          alt={HERO_MEDIA.aboutHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container relative z-10 text-center">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="breadcrumb mb-6 text-ivory/60 justify-center"
        >
          <Link
            href="/"
            className="text-ivory/60 hover:text-ivory transition-colors"
          >
            Home
          </Link>
          <span className="breadcrumb-sep" aria-hidden="true">
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
      </div>
    </section>
  )
}
