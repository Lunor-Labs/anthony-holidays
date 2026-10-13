import React from 'react'
import Link from 'next/link'
import { Clock, MapPin, ArrowRight, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export interface JourneySidebarProps {
  journeyTitle: string
  journeySlug: string
  duration: {
    days: number
    nights: number
  }
  destinations: string[]
  whatsappUrl: string
  pricing?: {
    showPrice?: boolean
    priceFrom?: number
    currency?: string
    pricingNote?: string
  }
}

export function JourneySidebar({
  journeyTitle,
  journeySlug,
  duration,
  destinations,
  whatsappUrl,
  pricing,
}: JourneySidebarProps) {
  const hasPrice = pricing && pricing.showPrice !== false && (pricing.priceFrom ?? 0) > 0

  return (
    <aside className="lg:col-span-1 h-full">
      <div className="lg:sticky lg:top-22 bg-white border border-sand/70 p-5 md:p-6 shadow-sm">
        {hasPrice && (
          <div className="mb-3 pb-4 border-b border-sand/50">
            <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-stone block mb-1">
              ESTIMATED FROM
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-medium text-forest">
                {formatPrice(pricing.priceFrom!, pricing.currency || 'USD')}
              </span>
              <span className="font-sans text-xs text-stone font-light">
                / person
              </span>
            </div>
            {pricing.pricingNote && (
              <p className="text-[11px] text-stone/80 mt-1 italic font-light">
                {pricing.pricingNote}
              </p>
            )}
          </div>
        )}

        <span className="section-label block">
          Private Journey
        </span>
        <h2 className="font-serif text-2xl text-charcoal mb-2">
          Reserve or Customise
        </h2>
        <p className="text-xs text-stone mb-4 leading-relaxed font-light">
          Every journey with Anthony Holidays is 100% private and guided by Licensed
          National Tourist Guide Lecturers. We tailor dates, pacing, and hotels to your exact wishes.
        </p>

        {/* Quick parameters */}
        <div className="space-y-3.5 py-4 border-y border-sand/50 text-xs mb-6">
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5">
              <Clock size={13} className="text-gold" />
              Duration
            </span>
            <span className="font-medium text-charcoal">
              {duration.days} Days / {duration.nights} Nights
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1.5">
              <MapPin size={13} className="text-gold" />
              Destinations
            </span>
            <span
              className="font-medium text-charcoal text-right max-w-[170px] truncate"
              title={destinations.join(', ')}
            >
              {destinations.slice(0, 3).join(', ')}
              {destinations.length > 3 && ` +${destinations.length - 3}`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/start-planning?journey=${journeySlug}`}
            className="btn btn-gold w-full text-center flex items-center justify-center gap-2"
          >
            <span>Start Planning This Journey</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full text-center flex items-center justify-center gap-2"
          >
            <Phone size={13} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Trust badge */}
        <div className="mt-4 pt-4 border-t border-sand/40 text-center">
          <p className="text-xs uppercase tracking-widest text-muted">
            Direct &amp; Personal
          </p>
          <p className="text-xs text-stone mt-1">
            No intermediaries · 100% private tours
          </p>
        </div>
      </div>
    </aside>
  )
}
