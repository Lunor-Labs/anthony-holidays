import React from 'react'
import Link from 'next/link'
import {
  Landmark,
  Binoculars,
  Waves,
  Mountain,
  Compass,
  Utensils,
  ArrowRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const experiencesList = [
  {
    number: '01',
    icon: Landmark,
    title: 'Culture & Heritage',
    desc: 'Ancient kingdoms, sacred temples, and living traditions dating back over 2,500 years.',
  },
  {
    number: '02',
    icon: Binoculars,
    title: 'Wildlife & Nature',
    desc: 'Leopards in Yala, Asian elephant gatherings, and marine biodiversity off southern shores.',
  },
  {
    number: '03',
    icon: Waves,
    title: 'Beaches & Coast',
    desc: 'Turquoise waters, golden palm-fringed sands, sea turtles, and seasonal whale watching.',
  },
  {
    number: '04',
    icon: Mountain,
    title: 'Hill Country & Tea',
    desc: 'Misty highland peaks, cascading waterfalls, and world-renowned Ceylon tea estates.',
  },
  {
    number: '05',
    icon: Compass,
    title: 'Adventure & Outdoors',
    desc: 'River rafting, scenic mountain trekking, and jungle excursions through virgin forests.',
  },
  {
    number: '06',
    icon: Utensils,
    title: 'Food & Culinary Traditions',
    desc: 'Curated home cooking classes, organic spice gardens, and aromatic street market tours.',
  },
]

export function ExperiencesSection() {
  return (
    <section className="section-padding bg-forest" aria-labelledby="experiences-heading">
      <div className="container">
        <ScrollReveal direction="up">
          <SectionHeading
            id="experiences-heading"
            label="Travel Experiences"
            title="Every Kind of"
            highlight="Sri Lanka"
            align="center"
            theme="forest"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10 mt-16">
          {experiencesList.map((exp, i) => {
            const Icon = exp.icon
            return (
              <ScrollReveal
                key={exp.title}
                direction="up"
                delay={((i % 3) * 100) as any}
              >
                <div className="bg-forest p-10 hover:bg-forest/80 transition-colors duration-500 h-full group cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <p
                      className="font-serif text-5xl sm:text-6xl font-normal text-gold/20 leading-none tracking-tighter select-none"
                      aria-hidden="true"
                    >
                      {exp.number}
                    </p>
                    <div
                      className="w-12 h-12 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold/20 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <Icon size={20} className="text-gold stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-ivory mb-2.5 tracking-wide uppercase">
                    {exp.title}
                  </h3>
                  <span className="w-12 h-[1px] bg-gold my-3 block transition-all duration-300 group-hover:w-20" />
                  <p className="text-sm text-ivory/65 leading-relaxed font-light">
                    {exp.desc}
                  </p>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal direction="up" delay={400}>
          <div className="text-center mt-12">
            <Link href="/tours" className="btn btn-outline-ivory">
              Explore All Tour Packages
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
