import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const experiencesList = [
  {
    icon: '🏛️',
    title: 'Culture & Heritage',
    desc: 'Ancient kingdoms, sacred temples, and living traditions dating back over 2,500 years.',
  },
  {
    icon: '🐘',
    title: 'Wildlife & Nature',
    desc: 'Leopards in Yala, Asian elephant gatherings, and marine biodiversity off southern shores.',
  },
  {
    icon: '🌊',
    title: 'Beaches & Coast',
    desc: 'Turquoise waters, golden palm-fringed sands, sea turtles, and seasonal whale watching.',
  },
  {
    icon: '🍃',
    title: 'Hill Country & Tea',
    desc: 'Misty highland peaks, cascading waterfalls, and world-renowned Ceylon tea estates.',
  },
  {
    icon: '🧗',
    title: 'Adventure & Outdoors',
    desc: 'River rafting, scenic mountain trekking, and jungle excursions through virgin forests.',
  },
  {
    icon: '🍛',
    title: 'Food & Culinary Traditions',
    desc: 'Curated home cooking classes, organic spice gardens, and aromatic street market tours.',
  },
]

export function ExperiencesSection() {
  return (
    <section className="section bg-forest" aria-labelledby="experiences-heading">
      <div className="container">
        <SectionHeading
          label="Travel Experiences"
          title="Every Kind of"
          highlight="Sri Lanka"
          align="center"
          theme="forest"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10">
          {experiencesList.map((exp) => (
            <div
              key={exp.title}
              className="bg-forest p-10 hover:bg-forest/90 transition-colors duration-200"
            >
              <div className="text-3xl mb-4" aria-hidden="true">
                {exp.icon}
              </div>
              <h3 className="font-serif text-xl font-normal text-ivory mb-2.5">
                {exp.title}
              </h3>
              <p className="text-sm text-ivory/65 leading-relaxed">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/tours" className="btn btn-outline-ivory">
            Explore All Tour Packages
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
