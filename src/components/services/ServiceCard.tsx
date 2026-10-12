import Image from 'next/image'
import Link from 'next/link'
import { Award, Car, Compass, Navigation, Eye, CheckCircle2, ArrowRight } from 'lucide-react'

export interface ServiceCardProps {
  service: {
    id: string
    slug: string
    title: string
    shortDescription: string
    highlights?: string[]
    image?: string
    iconName?: string
    displayOrder?: number
  }
}

const iconMap: Record<string, any> = {
  Award: Award,
  Car: Car,
  Compass: Compass,
  Navigation: Navigation,
  Eye: Eye,
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { title, shortDescription, highlights, image, iconName } = service
  const IconComponent = (iconName && iconMap[iconName]) || Compass

  return (
    <article className="bg-white border border-cream transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row overflow-hidden">
      {image && (
        <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden bg-offwhite shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      <div className="p-8 md:p-10 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center">
              <IconComponent size={20} className="text-gold" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-stone">
              Certified Service
            </span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal mb-4 leading-snug">
            {title}
          </h2>

          <p className="text-sm text-stone leading-relaxed mb-6 font-light">
            {shortDescription}
          </p>

          {highlights && highlights.length > 0 && (
            <div className="mb-6 border-t border-cream pt-5">
              <p className="text-[11px] font-bold tracking-wider uppercase text-stone mb-3">
                Key Standards & Features:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-charcoal/85">
                    <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-cream flex items-center justify-between">
          <Link
            href={`/start-planning?service=${encodeURIComponent(title)}`}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-forest hover:text-gold hover:gap-3 transition-all"
          >
            Enquire for This Service
            <ArrowRight size={14} />
          </Link>

          <span className="text-[11px] text-stone tracking-wide">
            SLTDA Regulated
          </span>
        </div>
      </div>
    </article>
  )
}
