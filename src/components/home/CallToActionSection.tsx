import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CallToActionSection() {
  return (
    <section
      className="section-padding relative overflow-hidden bg-forest/50 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/cta-background.jpg')`,
      }}
      aria-label="Start planning your journey"
    >
      <div className="absolute inset-0 bg-forest/80 backdrop-brightness-75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/60 to-forest/80 pointer-events-none" />

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
          <p className="text-ivory/85 text-lg max-w-lg mx-auto mb-12 leading-relaxed font-light tracking-wide">
            Tell us your travel dreams. We&apos;ll craft a bespoke Sri Lanka journey
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
  )
}
