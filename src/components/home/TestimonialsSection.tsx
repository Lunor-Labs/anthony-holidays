import React from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

export interface TestimonialsSectionProps {
  testimonials: any[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const displayReviews = testimonials.slice(0, 3)

  return (
    <section className="section bg-offwhite" aria-labelledby="testimonials-heading">
      <div className="container">
        <SectionHeading
          label="Traveller Stories"
          title="Words From Our"
          highlight="Guests"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReviews.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
