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

import Link from 'next/link'
import { Compass, ArrowRight } from 'lucide-react'

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
        <div className="container">
          {services.length > 0 ? (
            <div className="space-y-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-8 bg-white border border-sand/60 max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream flex items-center justify-center text-gold">
                <Compass size={32} strokeWidth={1.5} />
              </div>
              <span className="section-label text-gold block mb-2 justify-center">
                Destination Management Services
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 font-normal">
                Bespoke Travel Services Being Refreshed
              </h2>
              <p className="text-stone text-sm leading-relaxed mb-8 font-light max-w-lg mx-auto">
                Our full catalog of licensed guiding, private chauffeur transport, boutique hotel reservations, and visa concierge services is currently being updated in our system. Our direct guiding team remains fully available to arrange any private travel requirement.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/start-planning" className="btn btn-primary">
                  <span>Start Custom Planning</span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Contact Our Concierge
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
