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

import { Star, MessageSquarePlus } from 'lucide-react'

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

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((rev) => (
                  <ReviewItemCard key={rev.id} review={rev} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-8 bg-white border border-sand/60 max-w-2xl mx-auto shadow-sm">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-cream flex items-center justify-center text-gold">
                  <Star size={30} className="fill-gold/20 text-gold" strokeWidth={1.5} />
                </div>
                <span className="section-label text-gold block mb-2 justify-center">
                  Guest Reflections
                </span>
                <h3 className="font-serif text-2xl text-charcoal mb-3 font-normal">
                  Be the First to Share Your Journey
                </h3>
                <p className="text-stone text-sm leading-relaxed mb-6 font-light max-w-md mx-auto">
                  We are currently moderating verified guest memoirs from our recent travellers. If you have journeyed across Sri Lanka with Anthony Holidays, we warmly invite you to share your experience below.
                </p>
                <a
                  href="#review-form"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <span>Submit a Review</span>
                  <MessageSquarePlus size={15} />
                </a>
              </div>
            )}
          </div>

          {/* Submission Form Section */}
          <div id="review-form" className="pt-12 border-t border-cream scroll-mt-20">
            <ReviewSubmissionForm />
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
