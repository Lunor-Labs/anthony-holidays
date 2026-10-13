import type { Metadata } from 'next'
import { getServices } from '@/lib/payload-data'
import { ServiceCard } from '@/components/services'
import { PageHero } from '@/components/ui/PageHero'
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
      <PageHero
        breadcrumbCurrent="Our Services"
        badge="Expert Destination Management"
        title="Professional Guiding & Islandwide Travel Services"
        description="Delivered exclusively by Licensed National Tourist Guide Lecturers and certified chauffeurs. Every service is personal, fully insured, and tailored to your high standards."
      />

      <section className="section-padding bg-offwhite">
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
