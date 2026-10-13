import { Star, MapPin, Calendar, Compass } from 'lucide-react'

export interface ReviewItemCardProps {
  review: {
    id: string
    guestName: string
    country?: string
    rating: number
    tourName?: string
    reviewText: string
    travelDate?: string
    submittedAt?: string
  }
}

export function ReviewItemCard({ review }: ReviewItemCardProps) {
  const { guestName, country, rating, tourName, reviewText, travelDate } = review

  return (
    <article className="bg-white border border-cream p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md">
      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= rating
                  ? 'fill-gold text-gold'
                  : 'fill-cream text-cream'
              }
            />
          ))}
          <span className="text-xs font-semibold text-charcoal/70 ml-2">
            {rating}.0
          </span>
        </div>

        {/* Tour Name Badge */}
        {tourName && (
          <div className="flex items-center gap-1.5 text-xs text-forest font-medium mb-3">
            <Compass size={13} className="text-gold shrink-0" />
            <span className="line-clamp-1">{tourName}</span>
          </div>
        )}

        {/* Review Text */}
        <blockquote className="text-charcoal/85 text-sm leading-relaxed mb-6 font-light italic">
          "{reviewText}"
        </blockquote>
      </div>

      {/* Guest Footer */}
      <div className="pt-4 border-t border-cream flex items-center justify-between text-xs">
        <div>
          <cite className="not-italic font-semibold text-charcoal block">
            {guestName}
          </cite>
          {country && (
            <span className="text-stone flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-gold" />
              {country}
            </span>
          )}
        </div>

        {travelDate && (
          <span className="text-stone flex items-center gap-1 text-xs">
            <Calendar size={11} />
            {travelDate}
          </span>
        )}
      </div>
    </article>
  )
}
