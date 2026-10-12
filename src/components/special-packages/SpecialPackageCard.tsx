import Link from 'next/link'
import Image from 'next/image'
import { Clock, ChevronRight, CheckCircle2 } from 'lucide-react'

export interface SpecialPackageCardProps {
  packageItem: {
    id: string
    slug: string
    title: string
    category: string
    categoryLabel: string
    excerpt: string
    duration: { days: number; nights?: number }
    coverImage: string
    alt?: string
    pricing?: {
      showPrice?: boolean
      priceFrom?: number
      currency?: string
      pricingNote?: string
    }
    activities?: { title: string }[]
  }
}

export function SpecialPackageCard({ packageItem }: SpecialPackageCardProps) {
  const { slug, title, categoryLabel, excerpt, duration, coverImage, alt, pricing, activities } =
    packageItem

  return (
    <article className="journey-card flex flex-col h-full bg-white border border-cream transition-all duration-300 hover:shadow-lg">
      <div className="journey-card-image relative aspect-[16/10] overflow-hidden bg-offwhite">
        <Image
          src={coverImage}
          alt={alt || title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="overlay-gradient pointer-events-none" aria-hidden="true" />

        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1 flex items-center gap-1.5 shadow-sm">
          <Clock size={12} className="text-gold" />
          <span className="text-xs font-medium text-charcoal tracking-wide">
            {duration.days} Days{duration.nights ? ` / ${duration.nights} Nights` : ''}
          </span>
        </div>

        {/* Category tag */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-forest/90 text-gold text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h2 className="font-serif text-2xl font-normal text-charcoal mb-3 leading-snug">
          {title}
        </h2>

        <p className="text-sm text-stone leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        {activities && activities.length > 0 && (
          <div className="mb-6 border-t border-cream pt-4">
            <p className="text-[11px] font-semibold tracking-wider uppercase text-stone mb-2">
              Key Experiences:
            </p>
            <ul className="space-y-1.5">
              {activities.slice(0, 3).map((act, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-charcoal/80">
                  <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{act.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-cream flex items-center justify-between">
          <div>
            {pricing?.showPrice && pricing.priceFrom ? (
              <div>
                <span className="text-[11px] text-stone uppercase tracking-wider block">From</span>
                <span className="font-serif text-lg font-semibold text-forest">
                  ${pricing.priceFrom.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-stone font-sans">{pricing.currency || 'USD'}</span>
                </span>
              </div>
            ) : (
              <span className="text-xs text-stone tracking-wide font-medium">Bespoke Pricing</span>
            )}
          </div>

          <Link
            href={`/special-packages/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-forest hover:text-gold hover:gap-2.5 transition-all"
            aria-label={`Explore ${title} package details`}
          >
            Explore
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
