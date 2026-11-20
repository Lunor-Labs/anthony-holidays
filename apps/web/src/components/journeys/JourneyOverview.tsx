import React from 'react'
import Image from 'next/image'

export interface JourneyOverviewProps {
  description: string
  gallery?: { src: string; alt: string }[]
}

export function JourneyOverview({
  description,
  gallery = [],
}: JourneyOverviewProps) {
  const paragraphs = description.split('\n\n').filter(Boolean)

  return (
    <section className="mb-14">
      <h2 className="font-serif text-2xl text-charcoal mb-6 font-normal">
        Overview
      </h2>
      <div className="space-y-4 text-base text-stone leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {gallery.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] overflow-hidden rounded-xs"
            >
              <Image
                src={img.src}
                alt={img.alt || 'Journey gallery'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
