import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AboutHero, PhilosophySection, PillarsSection } from '@/components/about'
import { FounderProfileCard } from '@/components/team'
import { getTeamMembers } from '@/lib/payload-data'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'About Us - Guiding Philosophy & Heritage',
  description:
    'Led by Licensed National Tourist Guide Lecturers, Anthony Holidays curates authentic, private Sri Lankan journeys founded on deep local knowledge, personal trust, and sustainable travel.',
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()
  const founder = teamMembers.find((m) => m.isFounder) || teamMembers[0]

  return (
    <>
      <AboutHero />
      <PhilosophySection />

      {founder && (
        <section className="section-padding bg-white">
          <div className="container">
            <FounderProfileCard
              founder={founder}
              sectionTitle="Meet the Founder"
              headline="Your Gateway to Authentic Sri Lanka"
            />

            <div className="text-center mt-6">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors"
              >
                <span>View Full Guiding Faculty & Team Profiles</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <PillarsSection />
      <CallToActionSection />
    </>
  )
}
