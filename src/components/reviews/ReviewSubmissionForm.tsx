'use client'

import { useState } from 'react'
import { Star, Send, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react'

export function ReviewSubmissionForm() {
  const [rating, setRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [guestName, setGuestName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [tourName, setTourName] = useState<string>('')
  const [reviewText, setReviewText] = useState<string>('')
  const [websiteTrap, setWebsiteTrap] = useState<string>('') // Honeypot
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!guestName.trim()) {
      setErrorMessage('Please enter your name or display alias.')
      return
    }

    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setErrorMessage('Please share a few words about your journey (min. 10 characters).')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          country,
          rating,
          tourName,
          reviewText,
          website_trap: websiteTrap,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit review.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your review.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-ivory border-2 border-gold/40 p-8 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-12 h-12 bg-forest text-gold rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="font-serif text-2xl text-charcoal mb-2">
          Thank You for Your Feedback!
        </h3>
        <p className="text-sm text-stone leading-relaxed mb-6 font-light">
          Your review has been submitted for moderation. In accordance with our verification standards, reviews appear publicly once confirmed by our administration team.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setGuestName('')
            setReviewText('')
            setCountry('')
            setTourName('')
          }}
          className="btn btn-outline text-xs"
        >
          Submit Another Review
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-cream p-8 md:p-10 max-w-2xl mx-auto shadow-sm">
      <div className="text-center mb-8">
        <span className="section-label text-gold block mb-2">Guest Feedback</span>
        <h2 className="font-serif text-3xl text-charcoal mb-2">Share Your Experience</h2>
        <p className="text-xs text-stone max-w-md mx-auto">
          We value your authentic reflections. Submitted reviews are reviewed by our team prior to public display.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field (hidden from genuine users) */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website_trap"
            value={websiteTrap}
            onChange={(e) => setWebsiteTrap(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Interactive Star Rating */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
            Your Rating *
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-gold cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`${star} star rating`}
                >
                  <Star
                    size={28}
                    className={
                      star <= (hoverRating || rating)
                        ? 'fill-gold text-gold'
                        : 'text-cream stroke-1'
                    }
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-medium text-stone ml-2">
              {rating} of 5 Stars
            </span>
          </div>
        </div>

        {/* Name and Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
              Full Name or Display Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. David & Sarah M."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-4 py-2.5 border border-cream font-sans text-sm text-charcoal outline-none focus:border-forest transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
              Country of Residence (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. United Kingdom, Australia"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 border border-cream font-sans text-sm text-charcoal outline-none focus:border-forest transition-colors"
            />
          </div>
        </div>

        {/* Tour / Package Taken */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Tour or Package Experienced (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Cultural Triangle Discovery, Southern Wildlife"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            className="w-full px-4 py-2.5 border border-cream font-sans text-sm text-charcoal outline-none focus:border-forest transition-colors"
          />
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Your Review / Comments *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us about the guiding quality, vehicle comfort, destinations visited, and highlights of your trip…"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-4 py-2.5 border border-cream font-sans text-sm text-charcoal outline-none focus:border-forest transition-colors resize-y"
          />
        </div>

        {/* Moderation Policy Notice */}
        <div className="flex items-start gap-2 text-[11px] text-stone bg-offwhite p-3 border-l-2 border-forest">
          <ShieldCheck size={14} className="text-forest shrink-0 mt-0.5" />
          <span>
            To maintain genuine transparency, reviews are verified by our team before publishing. We never alter guest feedback.
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full justify-center text-center py-3"
        >
          {isSubmitting ? (
            'Submitting for Moderation…'
          ) : (
            <>
              Submit Verified Review
              <Send size={14} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
