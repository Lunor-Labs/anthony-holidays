import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export interface JourneyCardProps {
  journey: {
    id: string
    slug: string
    title: string
    tagline?: string
    excerpt?: string
    duration: {
      days: number
      nights: number
    }
    pricing?: {
      priceFrom: number
      currency: string
    }
    coverImage: string
    alt?: string
    destinations: string[]
    categories?: string[]
    featured?: boolean
  }
}

export function JourneyCard({ journey }: JourneyCardProps) {
  return (
    <article className="group flex flex-col h-full bg-white border border-sand/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={journey.coverImage}
          alt={journey.alt || journey.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
          <Clock size={11} className="text-gold" />
          <span className="text-xs font-medium text-charcoal tracking-wide">
            {journey.duration.days}D / {journey.duration.nights}N
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Destinations pin */}
          {journey.destinations && journey.destinations.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin size={11} className="text-gold shrink-0" />
              <span className="text-xs text-stone tracking-wide line-clamp-1">
                {journey.destinations.slice(0, 3).join(' · ')}
                {journey.destinations.length > 3 &&
                  ` +${journey.destinations.length - 3}`}
              </span>
            </div>
          )}

          <h3 className="font-serif text-2xl font-normal text-charcoal mb-3 leading-snug group-hover:text-forest transition-colors">
            {journey.title}
          </h3>

          {journey.excerpt && (
            <p className="text-sm text-stone leading-relaxed mb-6 line-clamp-3">
              {journey.excerpt}
            </p>
          )}
        </div>

        {/* Card Footer: Pricing & Explore Link */}
        <div className="pt-4 border-t border-sand/40 flex items-center justify-between mt-auto">
          {journey.pricing && journey.pricing.priceFrom > 0 ? (
            <div>
              <span className="text-xs uppercase tracking-wider text-muted block">
                From
              </span>
              <span className="font-serif text-base font-medium text-charcoal">
                {formatPrice(journey.pricing.priceFrom, journey.pricing.currency)}
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted">Bespoke Itinerary</span>
          )}

          <Link
            href={`/tours/${journey.slug}`}
            className="btn-link"
            aria-label={`Explore ${journey.title} journey`}
          >
            Explore Tour
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
