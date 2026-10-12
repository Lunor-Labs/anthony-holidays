import React from 'react'
import { Star } from 'lucide-react'

export interface TestimonialCardProps {
  testimonial: {
    id: string
    quote: string
    travellerName: string
    travellerCountry?: string
    journeyTitle?: string
    rating?: number
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = testimonial.rating || 5

  return (
    <div className="bg-white p-8 md:p-10 border border-sand/70 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Star rating */}
        <div className="flex gap-1 mb-5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < rating
                  ? 'fill-gold text-gold'
                  : 'fill-sand/40 text-sand/40'
              }
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-serif text-lg md:text-xl text-charcoal/90 leading-relaxed italic mb-8">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      {/* Author Details */}
      <div className="pt-6 border-t border-sand/50">
        <p className="font-sans font-medium text-sm text-charcoal">
          {testimonial.travellerName}
        </p>
        {(testimonial.travellerCountry || testimonial.journeyTitle) && (
          <p className="text-xs text-stone mt-0.5">
            {[testimonial.travellerCountry, testimonial.journeyTitle]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
}
