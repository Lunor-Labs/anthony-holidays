import { Star, MapPin, Compass, Calendar } from 'lucide-react'

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

/**
 * Format date nicely for reviews (e.g. "10 Jan 2026" or "Jan 2026")
 * Strips any time/timestamp parts completely.
 */
function formatReviewDate(dateString?: string): string {
  if (!dateString) return ''
  const clean = dateString.split('T')[0].trim()
  const match = clean.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/)
  if (match) {
    const year = parseInt(match[1], 10)
    const month = parseInt(match[2], 10) - 1
    const day = match[3] ? parseInt(match[3], 10) : 1
    const d = new Date(year, month, day)
    if (!match[3]) {
      return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    }
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }
  try {
    const d = new Date(dateString)
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  } catch {
    // fallback
  }
  return clean
}

export function ReviewItemCard({ review }: ReviewItemCardProps) {
  const { guestName, country, rating, tourName, reviewText, travelDate, submittedAt } = review
  const displayDate = formatReviewDate(travelDate || submittedAt)

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

        {displayDate && (
          <span className="text-stone flex items-center gap-1.5 text-xs font-light">
            <Calendar size={12} className="text-gold shrink-0" />
            <span>{displayDate}</span>
          </span>
        )}
      </div>
    </article>
  )
}
