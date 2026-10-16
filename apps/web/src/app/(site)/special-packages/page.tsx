import type { Metadata } from 'next'
import { getSpecialPackages } from '@/lib/payload-data'
import { SpecialPackagesFilter } from '@/components/special-packages'
import { PageHero } from '@/components/ui/PageHero'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'Special Packages - Volunteering, Regional & Thematic Journeys',
  description:
    'Explore curated special travel packages in Sri Lanka: volunteering experiences, Hikkaduwa-based coastal explorations, smart budget tours, and wilderness adventures.',
}

export default async function SpecialPackagesPage() {
  const packages = await getSpecialPackages()

  return (
    <>
      <PageHero
        breadcrumbCurrent="Special Packages"
        badge="Unique & Bespoke Themes"
        title="Specialised Journeys & Meaningful Experiences"
        description="From hands-on marine turtle volunteering and Hikkaduwa surf immersions to smart budget trails and rugged wilderness treks, discover focused journeys tailored to individual passions."
      />

      <section className="section-padding-sm bg-offwhite">
        <div className="container">
          <SpecialPackagesFilter packages={packages} />
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
