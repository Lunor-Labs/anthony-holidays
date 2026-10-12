import React from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export interface TestimonialsSectionProps {
  testimonials: any[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const displayReviews = testimonials.slice(0, 3)

  return (
    <section className="section-padding bg-offwhite" aria-labelledby="testimonials-heading">
      <div className="container">
        <ScrollReveal direction="up">
          <SectionHeading
            label="Traveller Stories"
            title="Words From Our"
            highlight="Guests"
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {displayReviews.map((item, i) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={(i * 200) as any}
            >
              <TestimonialCard testimonial={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
