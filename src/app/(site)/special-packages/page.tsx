import type { Metadata } from 'next'
import { getSpecialPackages } from '@/lib/payload-data'
import { SpecialPackagesHero, SpecialPackagesFilter } from '@/components/special-packages'
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
      <SpecialPackagesHero />

      <section className="section-padding bg-offwhite">
        <div className="container">
          <SpecialPackagesFilter packages={packages} />
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
