import type { Metadata } from 'next'
import { getServices } from '@/lib/payload-data'
import { ServicesHero, ServiceCard } from '@/components/services'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'Our Services - Licensed Guiding & Chauffeur Travel Sri Lanka',
  description:
    'Professional travel services across Sri Lanka: Licensed National Tourist Guide Lecturers, luxury chauffeur transport, bespoke itinerary design, airport transfers, and wildlife guiding.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <ServicesHero />

      <section className="section bg-offwhite py-16 md:py-24">
        <div className="container space-y-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
