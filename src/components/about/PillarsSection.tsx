import React from 'react'
import { Award, Compass, ShieldCheck, HeartHandshake } from 'lucide-react'

const pillars = [
  {
    icon: Award,
    title: 'Academic Depth',
    desc: 'Expert insights into Sri Lankan archaeology, colonial architecture, botanical biodiversity, and Buddhist philosophy.',
  },
  {
    icon: Compass,
    title: 'Bespoke Itineraries',
    desc: 'Every route is privately curated around your personal cadence, mobility, culinary preferences, and passions.',
  },
  {
    icon: ShieldCheck,
    title: 'Flawless Logistics',
    desc: 'Pristine, fully insured luxury vehicles, trusted chauffeurs, direct phone contact, and round-the-clock concierge support.',
  },
  {
    icon: HeartHandshake,
    title: 'Conscious Tourism',
    desc: 'Fair partnerships with local communities, artisans, organic spice farmers, and wildlife preservation foundations.',
  },
]

export function PillarsSection() {
  return (
    <section className="section-padding bg-cream border-y border-forest/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label text-gold mb-2 justify-center">
            Why Discerning Travellers Choose Us
          </p>
          <h2 className="text-heading-2 text-forest font-serif text-3xl md:text-4xl font-light">
            Four Pillars of Our Hospitality
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-8 border border-forest/10 flex flex-col shadow-sm"
            >
              <div className="mb-5 text-gold">
                <Icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-forest mb-3 font-medium">
                {title}
              </h3>
              <p className="text-sm text-stone leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
