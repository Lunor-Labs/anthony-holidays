import React from 'react'
import { MapPin, Utensils, Hotel } from 'lucide-react'

export interface ItineraryDay {
  day: number
  title: string
  description: string
  locations?: string
  accommodation?: string
  meals?: string
}

export interface JourneyItineraryProps {
  itinerary: ItineraryDay[]
}

export function JourneyItinerary({ itinerary }: JourneyItineraryProps) {
  return (
    <section className="mb-14">
      <h2 className="font-serif text-2xl text-charcoal mb-8 font-normal">
        Daily Itinerary
      </h2>

      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-sand/60">
        {itinerary.map((day) => (
          <div key={day.day} className="relative pl-14">
            {/* Day marker badge */}
            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-forest text-gold font-serif text-sm flex items-center justify-center font-medium shadow-sm">
              {day.day}
            </div>

            <div className="bg-white p-6 md:p-8 border border-sand/60 shadow-xs">
              <span className="text-xs font-sans font-semibold tracking-widest text-gold uppercase block mb-1">
                Day {day.day}
              </span>
              <h3 className="font-serif text-xl font-normal text-charcoal mb-3">
                {day.title}
              </h3>
              <p className="text-sm text-stone leading-relaxed mb-5">
                {day.description}
              </p>

              {/* Day metadata tags */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-sand/40 text-xs text-muted">
                {day.locations && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-forest shrink-0" />
                    {day.locations}
                  </span>
                )}
                {day.accommodation && (
                  <span className="flex items-center gap-1.5">
                    <Hotel size={12} className="text-forest shrink-0" />
                    {day.accommodation}
                  </span>
                )}
                {day.meals && (
                  <span className="flex items-center gap-1.5">
                    <Utensils size={12} className="text-forest shrink-0" />
                    {day.meals}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
