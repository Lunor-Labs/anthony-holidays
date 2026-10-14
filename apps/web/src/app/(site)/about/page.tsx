import type { Metadata } from 'next'
import { AboutHero, PhilosophySection, PillarsSection } from '@/components/about'
import { FounderProfileCard, TeamMemberCard } from '@/components/team'
import { getTeamMembers } from '@/lib/payload-data'
import { CallToActionSection } from '@/components/home/CallToActionSection'

import Link from 'next/link'
import { Award, ArrowRight } from 'lucide-react'

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
          {teamMembers.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="text-center py-20 px-8 bg-offwhite border border-sand/60 max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center text-gold">
                <Award size={32} strokeWidth={1.5} />
              </div>
              <span className="section-label text-gold block mb-2 justify-center">
                National Guiding Faculty
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 font-normal">
                Licensed Guiding Team Profiles Updating
              </h2>
              <p className="text-stone text-sm leading-relaxed mb-8 font-light max-w-lg mx-auto">
                Anthony Holidays operates strictly with SLTDA-licensed National Tourist Guide Lecturers and certified naturalist trackers. Detailed faculty profiles are currently being synchronized. Every journey is personally curated with deep heritage stewardship.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary">
                  <span>Inquire with Founder Anthony</span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/tours" className="btn btn-outline">
                  Explore Curated Tours
                </Link>
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
