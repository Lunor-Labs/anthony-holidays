import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { JourneyCard } from '@/components/ui/JourneyCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export interface FeaturedJourneysSectionProps {
  journeys: any[]
}

export function FeaturedJourneysSection({
  journeys,
}: FeaturedJourneysSectionProps) {
  const displayJourneys = journeys.slice(0, 3)

  return (
    <section
      className="section-padding bg-offwhite relative z-20 shadow-[0_-30px_70px_rgba(28,58,46,0.06)]"
      aria-labelledby="journeys-heading"
    >
      <div className="container">
        <ScrollReveal direction="up">
          <SectionHeading
            label="Curated Journeys"
            title="Journeys Worth"
            highlight="Remembering"
            action={
              <Link href="/tours" className="btn btn-outline shrink-0">
                All Tour Packages
                <ArrowRight size={14} />
              </Link>
            }
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {displayJourneys.map((journey, i) => (
            <ScrollReveal
              key={journey.id || journey.slug}
              direction="up"
              delay={(i * 200) as any}
            >
              <JourneyCard journey={journey} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
