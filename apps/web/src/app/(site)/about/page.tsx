import type { Metadata } from 'next'
import { AboutHero, PhilosophySection, PillarsSection } from '@/components/about'
import { FounderProfileCard, TeamMemberCard } from '@/components/team'
import { getTeamMembers } from '@/lib/payload-data'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'About Us - Guiding Philosophy, Heritage & Faculty Team',
  description:
    'Led by Licensed National Tourist Guide Lecturers, Anthony Holidays curates authentic, private Sri Lankan journeys founded on deep local knowledge, personal trust, and sustainable travel.',
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers()
  const founder = teamMembers.find((m) => m.isFounder) || teamMembers[0]
  const otherMembers = teamMembers.filter((m) => m.id !== founder?.id)

  return (
    <>
      <AboutHero />
      <PhilosophySection />

      {/* Founder & Specialist Guiding Team Section */}
      <section id="team" className="section-padding bg-white scroll-mt-20">
        <div className="container">
          {founder && (
            <FounderProfileCard
              founder={founder}
              sectionTitle="Meet the Founder"
              headline="Your Gateway to Authentic Sri Lanka"
            />
          )}

          {otherMembers.length > 0 && (
            <div className="pt-16 border-t border-cream">
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <span className="section-label text-gold block mb-2">
                  Faculty Guides &amp; Naturalists
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  Our Specialist Guiding Team
                </h2>
                <p className="text-sm text-stone mt-3 font-light leading-relaxed">
                  Every guide holds formal government licensing (SLTDA) and specialized
                  academic expertise in wildlife tracking, ancient architecture, highland
                  trails, or cultural anthropology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <PillarsSection />
      <CallToActionSection />
    </>
  )
}
