import React from 'react'
import Link from 'next/link'
import { Clock, MapPin, ArrowRight, Phone } from 'lucide-react'

export interface JourneySidebarProps {
  journeyTitle: string
  journeySlug: string
  duration: {
    days: number
    nights: number
  }
  destinations: string[]
  whatsappUrl: string
}

export function JourneySidebar({
  journeyTitle,
  journeySlug,
  duration,
  destinations,
  whatsappUrl,
}: JourneySidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-28 bg-white border border-sand/70 p-8 shadow-sm">
        <span className="section-label text-gold mb-2 block">
          Custom Journey
        </span>
        <h2 className="font-serif text-2xl text-charcoal mb-4">
          Reserve or Customise
        </h2>
        <p className="text-sm text-stone mb-6 leading-relaxed">
          Every journey with Anthony Holidays is private and led by Licensed
          National Tourist Guide Lecturers. We tailor dates, pace, and route to
          your wishes.
        </p>

        {/* Quick parameters */}
        <div className="space-y-3.5 py-5 border-y border-sand/50 text-xs mb-6">
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
            <span className="font-medium text-charcoal text-right max-w-[160px] truncate">
              {destinations.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/start-planning?journey=${journeySlug}`}
            className="btn btn-gold w-full text-center text-xs py-3.5"
          >
            Start Planning This Journey
            <ArrowRight size={14} />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full text-center text-xs py-3.5 flex items-center justify-center gap-2"
          >
            <Phone size={13} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust badge */}
        <div className="mt-8 pt-6 border-t border-sand/40 text-center">
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
