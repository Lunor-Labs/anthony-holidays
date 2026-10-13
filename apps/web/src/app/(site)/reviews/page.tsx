import type { Metadata } from 'next'
import { getReviews } from '@/lib/payload-data'
import { ReviewItemCard, ReviewSubmissionForm } from '@/components/reviews'
import { PageHero } from '@/components/ui/PageHero'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'Guest Reviews & Testimonials - Anthony Holidays Sri Lanka',
  description:
    'Read verified reviews and firsthand testimonials from travellers who explored Sri Lanka with Anthony Holidays. Share your own travel experience.',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <>
      <PageHero
        breadcrumbCurrent="Reviews"
        badge="Verified Guest Reflections"
        title="Traveller Reviews & Firsthand Stories"
        description="Real feedback from discerning travellers who explored Sri Lanka with Anthony and our licensed guiding team. Every published review is independently verified and moderated for authenticity."
        maxWidth="3xl"
      />

      <section className="section-padding bg-offwhite">
        <div className="container space-y-16">
          {/* Reviews Grid */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-label text-gold block mb-2">Verified Feedback</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                What Our Guests Say
              </h2>
              <p className="text-sm text-stone mt-2 font-light">
                All published reviews undergo independent verification by our administrative team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((rev) => (
                <ReviewItemCard key={rev.id} review={rev} />
              ))}
            </div>
          </div>

          {/* Submission Form Section */}
          <div className="pt-12 border-t border-cream">
            <ReviewSubmissionForm />
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
