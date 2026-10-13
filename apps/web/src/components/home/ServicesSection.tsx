'use client'

import React from 'react'
import Link from 'next/link'
import {
  Building,
  FileCheck,
  Plane,
  ShieldCheck,
  Sparkles,
  Compass,
  ArrowRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FALLBACK_SERVICES } from '@/data/fallback-data'

export interface ServiceItem {
  id: string
  slug: string
  title: string
  shortDescription: string
  highlights?: string[]
  iconName?: string
  displayOrder?: number
}

export interface ServicesSectionProps {
  services?: ServiceItem[]
}

const iconMap: Record<string, any> = {
  Building,
  FileCheck,
  Plane,
  ShieldCheck,
  Sparkles,
  Compass,
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const cmsServices =
    services && services.length > 0 ? services : FALLBACK_SERVICES

  const cards = [
    {
      number: '01',
      title: cmsServices[0]?.title || 'Hotel Reservations',
      desc:
        cmsServices[0]?.shortDescription ||
        'Handpicked boutique hotels, colonial tea bungalows, and luxury beach resorts with exclusive partner rates across Sri Lanka.',
      icon: (cmsServices[0]?.iconName && iconMap[cmsServices[0].iconName]) || Building,
      href: '/services',
      actionText: 'Explore Hotel Partners',
    },
    {
      number: '02',
      title: cmsServices[1]?.title || 'Visa Assistance',
      desc:
        cmsServices[1]?.shortDescription ||
        'Hassle-free Sri Lanka ETA tourist visa guidance, entry requirement advisories, and official arrival verification.',
      icon: (cmsServices[1]?.iconName && iconMap[cmsServices[1].iconName]) || FileCheck,
      href: '/services',
      actionText: 'Visa Requirements',
    },
    {
      number: '03',
      title: cmsServices[2]?.title || 'Air Ticketing',
      desc:
        cmsServices[2]?.shortDescription ||
        'International airline coordination, scenic Cinnamon Air domestic seaplane flights, and private helicopter charters.',
      icon: (cmsServices[2]?.iconName && iconMap[cmsServices[2].iconName]) || Plane,
      href: '/services',
      actionText: 'Flight Coordination',
    },
    {
      number: '04',
      title: cmsServices[3]?.title || 'Travel Insurance',
      desc:
        cmsServices[3]?.shortDescription ||
        'Comprehensive travel insurance advisory and safety coverage ensuring total peace of mind on the road.',
      icon: (cmsServices[3]?.iconName && iconMap[cmsServices[3].iconName]) || ShieldCheck,
      href: '/services',
      actionText: 'Insurance Advisory',
    },
    {
      number: '05',
      title: cmsServices[4]?.title || 'Value Added Services',
      desc:
        cmsServices[4]?.shortDescription ||
        'Complimentary local 4G/5G tourist SIM on arrival, private air-conditioned vehicle fleet, and dedicated trip care.',
      icon: (cmsServices[4]?.iconName && iconMap[cmsServices[4].iconName]) || Sparkles,
      href: '/services',
      actionText: 'Exclusive Amenities',
    },
    {
      number: '06',
      title: 'Bespoke Itinerary Design',
      desc:
        '100% private, tailor-made journeys calibrated to your pace and passions, backed by 24/7 dedicated on-island concierge support.',
      icon: Compass,
      href: '/start-planning',
      actionText: 'Design Custom Trip',
    },
  ]

  return (
    <section
      className="section-padding bg-forest relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="container relative z-10">
        <ScrollReveal direction="up">
          <SectionHeading
            id="services-heading"
            label="Complete Travel Logistics"
            title="Beyond Guiding"
            highlight="End-to-End Care"
            align="center"
            theme="forest"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10 mt-16">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <ScrollReveal
                key={card.title}
                direction="up"
                delay={((i % 3) * 100) as any}
              >
                <Link
                  href={card.href}
                  className="bg-forest p-10 hover:bg-forest/75 transition-all duration-300 h-full group flex flex-col justify-between block relative border border-transparent hover:border-gold/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p
                        className="font-serif text-5xl sm:text-6xl font-normal text-gold/20 leading-none tracking-tighter select-none"
                        aria-hidden="true"
                      >
                        {card.number}
                      </p>
                      <div
                        className="w-12 h-12 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20 group-hover:scale-105"
                        aria-hidden="true"
                      >
                        <Icon size={20} className="text-gold stroke-[1.75]" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-normal text-ivory mb-2.5 tracking-wide uppercase group-hover:text-gold transition-colors">
                      {card.title}
                    </h3>
                    <span className="w-12 h-[1px] bg-gold my-3 block transition-all duration-300 group-hover:w-20" />
                    <p className="text-sm text-ivory/65 leading-relaxed font-light mb-6">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ivory/10 flex items-center justify-between text-xs text-gold font-medium tracking-wider uppercase">
                    <span>{card.actionText}</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="text-center mt-12 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/services" className="btn btn-outline-ivory">
              <span>View All Travel Services</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/start-planning" className="btn btn-gold">
              <span>Start Planning Your Journey</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
