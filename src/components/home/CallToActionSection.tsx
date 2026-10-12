import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { HERO_MEDIA } from '@/lib/media-catalog'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MarqueeTicker } from '@/components/ui/MarqueeTicker'

const ctaMarqueeWords = [
  'Bespoke Journeys',
  'Authentic Sri Lanka',
  'Tailor-Made',
  'Expert Guides',
  'Private Tours',
  'Unforgettable',
]

export function CallToActionSection() {
  return (
    <>
      {/* Marquee before the CTA */}
      <div className="py-8 bg-forest overflow-hidden border-t border-ivory/10">
        <MarqueeTicker items={ctaMarqueeWords} theme="light" />
      </div>

      <section
        className="section-padding relative overflow-hidden bg-forest"
        aria-label="Start planning your journey"
      >
        {/* Ambient background photo */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src={HERO_MEDIA.ctaBackground.url}
            alt={HERO_MEDIA.ctaBackground.alt}
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Decorative diagonal gold line */}
        <div
          className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '50%',
              width: '1px',
              height: '120%',
              background:
                'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)',
            }}
          />
        </div>

        <div className="container relative z-10 text-center">
          <ScrollReveal direction="up">
            <p className="section-label justify-center text-gold">
              Your Journey Begins Here
            </p>
            <h2 className="text-heading-1 text-ivory mb-5 max-w-2xl mx-auto leading-tight">
              Ready to Discover
              <br />
              <em className="italic text-gold">the Real Sri Lanka?</em>
            </h2>
            <span className="w-12 h-[1px] bg-gold my-6 mx-auto block" />
            <p className="text-ivory/75 text-lg max-w-lg mx-auto mb-12 leading-relaxed font-light tracking-wide">
              Tell us your travel dreams. We'll craft a bespoke Sri Lanka journey
              that exceeds every expectation.
            </p>

            <div className="flex justify-center flex-wrap gap-4">
              <Link href="/start-planning" className="btn btn-gold text-sm px-10">
                Start Planning Your Journey
                <ArrowRight size={15} />
              </Link>
              <Link href="/tours" className="btn btn-outline-ivory text-sm">
                Browse Tour Packages
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
