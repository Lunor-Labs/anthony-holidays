import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { JourneyCard } from '@/components/ui/JourneyCard'

export interface FeaturedJourneysSectionProps {
  journeys: any[]
}

export function FeaturedJourneysSection({
  journeys,
}: FeaturedJourneysSectionProps) {
  const displayJourneys = journeys.slice(0, 3)

  return (
    <section className="section bg-offwhite" aria-labelledby="journeys-heading">
      <div className="container">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayJourneys.map((journey) => (
            <JourneyCard key={journey.id || journey.slug} journey={journey} />
          ))}
        </div>
      </div>
    </section>
  )
}
