import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'

export interface JourneyHeroProps {
  title: string
  coverImage: string
  alt?: string
  duration: {
    days: number
    nights: number
  }
  destinations: string[]
}

export function JourneyHero({
  title,
  coverImage,
  alt,
  duration,
  destinations,
}: JourneyHeroProps) {
  return (
    <div className="page-hero min-h-[70vh] relative">
      <Image
        src={coverImage}
        alt={alt || title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="page-hero-overlay" />

      <div className="page-hero-content container">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="breadcrumb mb-6 text-ivory/60"
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
          <Link
            href="/tours"
            className="text-ivory/60 hover:text-ivory transition-colors"
          >
            Tours
          </Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            ·
          </span>
          <span className="text-gold">{title}</span>
        </nav>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-gold/90 text-charcoal font-medium text-xs px-3 py-1 uppercase tracking-wider">
            <Clock size={12} />
            {duration.days} Days / {duration.nights} Nights
          </span>
          {destinations.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs text-ivory/80">
              <MapPin size={12} className="text-gold" />
              {destinations.join(' · ')}
            </span>
          )}
        </div>

        <h1 className="text-display text-ivory max-w-3xl leading-tight">
          {title}
        </h1>
      </div>
    </div>
  )
}
