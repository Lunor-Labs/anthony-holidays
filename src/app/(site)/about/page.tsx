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

const FOUNDER_GATEWAY_BIO = `Born and raised in the vibrant coastal city of Hikkaduwa, I grew up witnessing the magic of Sri Lanka through the eyes of travelers. As tourists completed their clockwise journeys around the island and arrived at our beaches, I spent countless hours listening to their stories.

Time and again, I heard the same regret, while guests had visited iconic landmarks, they often felt they had missed the true soul of the country. They spoke of itineraries that felt rushed and guides who lacked the depth to bring our history and culture to life.

This feedback sparked my passion to bridge that gap. I realized that seeing a site isn't the same as experiencing it. That is why I founded this agency—not just to show you the island, but to help you truly understand it.

Our specialty lies in expertise. We are proud to be led by high-quality, Licensed National Tourist Guide Lecturers, myself included. We don’t just take you to a monument; we narrate its history, its legends, and its place in modern Sri Lanka. With us, you won't just be a tourist looking at a view; you will be a guest who truly understands the wonder of the Pearl of the Indian Ocean.`

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()
  const founder = teamMembers.find((m) => m.isFounder) || teamMembers[0]

  return (
    <>
      <AboutHero />
      <PhilosophySection />

      {founder && (
        <section className="section bg-white py-16 md:py-24">
          <div className="container">
            <FounderProfileCard
              founder={founder}
              sectionTitle="Meet the Founder"
              headline="Your Gateway to Authentic Sri Lanka"
              bioOverride={FOUNDER_GATEWAY_BIO}
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
