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

export function ServicesSection({ services = [] }: ServicesSectionProps) {
  const cards = [
    ...services.map((service, index) => {
      const Icon = (service.iconName && iconMap[service.iconName]) || Sparkles
      return {
        number: String(index + 1).padStart(2, '0'),
        title: service.title,
        desc: service.shortDescription,
        icon: Icon,
        href: `/services#${service.slug}`,
        actionText: 'Learn More',
      }
    }),
    {
      number: String(services.length + 1).padStart(2, '0'),
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

        {services.length > 0 ? (
          <>
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
          </>
        ) : (
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center py-16 px-8 bg-forest/90 border border-gold/30 max-w-2xl mx-auto shadow-xl mt-12 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                <Compass size={30} strokeWidth={1.5} />
              </div>
              <span className="section-label text-gold block mb-2 justify-center">
                Destination Management Services
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-ivory mb-3 font-normal">
                Travel Logistics Catalog Being Synchronized
              </h3>
              <p className="text-ivory/75 text-sm leading-relaxed mb-8 font-light max-w-lg mx-auto">
                Our complete range of private chauffeur transport, luxury vehicle charters, boutique accommodation reservations, and licensed guiding services is currently being updated in our system. Our direct concierge team is available 24/7 for custom requests.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/start-planning" className="btn btn-gold">
                  <span>Start Custom Planning</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn btn-outline-ivory">
                  Contact Our Concierge
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
