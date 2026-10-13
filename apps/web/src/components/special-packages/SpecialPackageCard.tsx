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
    <article
      data-cursor="explore"
      className="group flex flex-col h-full bg-white border border-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
    >
      <Link
        href={`/special-packages/${slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-offwhite block"
        aria-label={`Explore ${title} package`}
      >
        <Image
          src={coverImage}
          alt={alt || title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

        <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1 flex items-center gap-1.5 shadow-sm pointer-events-none">
          <Clock size={12} className="text-gold" />
          <span className="text-xs font-medium text-charcoal tracking-wide">
            {duration.days} Days{duration.nights ? ` / ${duration.nights} Nights` : ''}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 pointer-events-none">
          <span className="bg-forest/90 text-gold text-xs font-semibold tracking-wider uppercase px-2.5 py-1">
            {categoryLabel}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-serif text-2xl font-normal text-charcoal mb-3 leading-snug group-hover:text-forest transition-colors">
          <Link href={`/special-packages/${slug}`}>
            {title}
          </Link>
        </h2>

        <p className="text-sm text-stone leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-cream flex items-center justify-between">
          <div>
            {pricing?.showPrice && pricing.priceFrom ? (
              <div>
                <span className="text-xs text-stone uppercase tracking-wider block">From</span>
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
            className="btn-link"
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
