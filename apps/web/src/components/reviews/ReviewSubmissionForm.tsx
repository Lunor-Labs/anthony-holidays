'use client'

import { useState, useRef } from 'react'
import { Star, Send, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react'
import { TurnstileWidget, TurnstileWidgetRef } from '@/components/ui/TurnstileWidget'
import { getRecaptchaToken } from '@/lib/recaptcha-client'

export function ReviewSubmissionForm() {
  const [rating, setRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [guestName, setGuestName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [tourName, setTourName] = useState<string>('')
  const [reviewText, setReviewText] = useState<string>('')
  const [websiteTrap, setWebsiteTrap] = useState<string>('') // Honeypot
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const turnstileWidgetRef = useRef<TurnstileWidgetRef>(null)

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

    if (!turnstileToken) {
      setErrorMessage('Please complete the security check before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      // Execute Google reCAPTCHA v3
      const recaptchaToken = await getRecaptchaToken('review_submission')

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
          cf_turnstile_response: turnstileToken,
          g_recaptcha_response: recaptchaToken,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit review.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your review.')
      turnstileWidgetRef.current?.reset()
      setTurnstileToken('')
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
            setTurnstileToken('')
            turnstileWidgetRef.current?.reset()
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
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot anti-bot trap */}
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

        {/* Star Rating */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 cursor-pointer transition-transform hover:scale-115"
                aria-label={`${star} star`}
              >
                <Star
                  size={24}
                  className={
                    star <= (hoverRating || rating)
                      ? 'fill-gold text-gold'
                      : 'text-sand stroke-1'
                  }
                />
              </button>
            ))}
            <span className="text-xs text-stone ml-2 font-serif italic">
              {rating === 5 && 'Truly Exceptional'}
              {rating === 4 && 'Very Good'}
              {rating === 3 && 'Average'}
              {rating === 2 && 'Below Expectation'}
              {rating === 1 && 'Unsatisfactory'}
            </span>
          </div>
        </div>

        {/* Guest Name & Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
              Your Name / Alias *
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
              placeholder="e.g. United Kingdom"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 border border-cream font-sans text-sm text-charcoal outline-none focus:border-forest transition-colors"
            />
          </div>
        </div>

        {/* Tour Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
            Tour / Journey Taken (Optional)
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
        <div className="flex items-start gap-2 text-xs text-stone bg-offwhite p-3 border-l-2 border-forest">
          <ShieldCheck size={14} className="text-forest shrink-0 mt-0.5" />
          <span>
            To maintain genuine transparency, reviews are verified by our team before publishing. We never alter guest feedback.
          </span>
        </div>

        {/* Cloudflare Turnstile */}
        <TurnstileWidget
          ref={turnstileWidgetRef}
          onVerify={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken('')}
        />

        <button
          type="submit"
          disabled={isSubmitting || !turnstileToken}
          className="btn btn-primary w-full justify-center text-center py-3 disabled:opacity-50"
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
