import React from 'react'
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react'

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
    <div className="bg-white p-4 sm:p-5 md:p-6 border border-sand/70 hover:border-gold/60 transition-all duration-300 rounded-xs shadow-xs hover:shadow-md flex flex-col justify-between h-full group relative">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
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
            <span className="text-xs font-semibold text-charcoal/70 ml-1.5 font-sans">
              {rating}.0
            </span>
          </div>
          <Quote size={22} className="text-gold/30 group-hover:text-gold/60 transition-colors shrink-0" />
        </div>

        {testimonial.journeyTitle && (
          <div className="flex items-center gap-1.5 text-xs text-forest font-medium mb-3">
            <span className="line-clamp-1">{testimonial.journeyTitle}</span>
          </div>
        )}
        <blockquote className="font-serif text-sm sm:text-base text-charcoal/90 leading-relaxed italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>
      <div className="pt-5 border-t border-sand/50 flex items-end justify-between gap-4 mt-auto">
        <div>
          <p className="font-sans font-medium text-sm text-charcoal">
            {testimonial.travellerName}
          </p>
          {testimonial.travellerCountry && (
            <p className="text-xs text-stone flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-gold shrink-0" />
              <span>{testimonial.travellerCountry}</span>
            </p>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-forest bg-forest/5 px-2 py-0.5 rounded-full shrink-0">
          <CheckCircle2 size={11} className="text-gold" />
          Verified
        </span>
      </div>
    </div>
  )
}
