import type { Metadata } from 'next'
import { getTeamMembers } from '@/lib/payload-data'
import { TeamHero, FounderProfileCard, TeamMemberCard } from '@/components/team'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'Founder & Team Profiles - Licensed National Tourist Guide Lecturers',
  description:
    'Meet founder Anthony and the faculty of Licensed National Tourist Guide Lecturers at Anthony Holidays. Certified islandwide guiding, scholarly insight, and authentic Sri Lanka experiences.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()
  const founder = teamMembers.find((m) => m.isFounder) || teamMembers[0]
  const otherMembers = teamMembers.filter((m) => m.id !== founder?.id)

  return (
    <>
      <TeamHero />

      <section className="section-padding bg-offwhite">
        <div className="container">
          {founder && <FounderProfileCard founder={founder} />}

          {otherMembers.length > 0 && (
            <div>
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <span className="section-label text-gold block mb-2">Faculty Guides & Naturalists</span>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                  Our Specialist Guiding Team
                </h2>
                <p className="text-sm text-stone mt-3">
                  Every guide holds formal government licensing and specialized expertise in wildlife tracking, ancient architecture, or highland trails.
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

      <CallToActionSection />
    </>
  )
}
