'use client'

import React, { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react'

export function StartPlanningForm({ preselectedTour = '' }: { preselectedTour?: string }) {
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    // Step 1: Traveller
    fullName: '',
    email: '',
    phone: '',
    country: '',
    contactPreference: 'WhatsApp',

    // Step 2: Dates & Group
    arrivalDate: '',
    departureDate: '',
    travellerCount: 2,
    childrenCount: 0,
    interests: [] as string[],
    destinations: [] as string[],
    pace: 'Balanced & Leisurely',
    budgetTier: 'Luxury Boutique ($350 - $600/day)',

    // Step 3: Specifics
    selectedTour: preselectedTour,
    specialRequests: '',
    consent: false,
  })

  const interestOptions = [
    'Ancient Heritage & Archaeology',
    'Wildlife & Leopard Safaris',
    'Ceylon Tea Estates & Hiking',
    'Private Coastal Escapes & Surfing',
    'Authentic Culinary & Spice Trails',
    'Ayurveda & Holistic Wellness',
  ]

  const destinationOptions = [
    'Sigiriya & Cultural Triangle',
    'Kandy & Temple of the Tooth',
    'Hatton & Tea Country',
    'Ella & Highlands',
    'Yala & Wildlife Parks',
    'Galle Fort & Southern Coast',
    'Bentota & West Beaches',
    'Trincomalee & East Coast',
  ]

  const toggleInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }))
  }

  const toggleDestination = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(item)
        ? prev.destinations.filter((d) => d !== item)
        : [...prev.destinations, item],
    }))
  }

  const [websiteTrap, setWebsiteTrap] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) {
      alert('Please agree to the privacy terms to submit your inquiry.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          numberOfAdults: formData.travellerCount,
          travellerCount: formData.travellerCount,
          numberOfChildren: formData.childrenCount,
          arrivalDate: formData.arrivalDate,
          departureDate: formData.departureDate,
          message: formData.specialRequests,
          specialRequests: formData.specialRequests,
          selectedTour: formData.selectedTour,
          contactPreference: formData.contactPreference,
          interests: formData.interests,
          destinations: formData.destinations,
          pace: formData.pace,
          budgetTier: formData.budgetTier,
          privacyConsent: formData.consent,
          website_trap: websiteTrap,
        }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const errorData = await res.json().catch(() => ({}))
        setErrorMessage(errorData.error || 'Unable to submit enquiry. Please try again or reach out on WhatsApp.')
        setStatus('error')
      }
    } catch {
      setStatus('error')
      setErrorMessage('A network error occurred. Please try again or message us on WhatsApp.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-sand p-10 sm:p-14 rounded-sm text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-primary text-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 stroke-[2]" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-primary font-light mb-4">
          Ayubowan! We have received your journey enquiry.
        </h2>
        <p className="text-stone leading-relaxed mb-6 text-sm sm:text-base">
          Thank you, <strong>{formData.fullName}</strong>. A dedicated National Tourist Guide Lecturer from Anthony Holidays will review your preferences and craft a preliminary custom proposal within 24 hours.
        </p>
        <p className="text-xs text-muted mb-8">
          A confirmation summary has been dispatched to {formData.email}.
        </p>
        <a
          href="https://wa.me/94771234567"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs uppercase tracking-widest rounded-sm hover:bg-primary-hover transition-colors"
        >
          Message Us on WhatsApp for Immediate Inquiries
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white border border-sand rounded-sm p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      {/* Step Indicators */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-sand">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                step === s
                  ? 'bg-primary text-accent'
                  : step > s
                  ? 'bg-secondary text-white'
                  : 'bg-cream text-muted'
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </span>
            <span className="text-xs hidden md:inline text-subtle font-medium">
              {s === 1 && 'Traveller Details'}
              {s === 2 && 'Dates & Preferences'}
              {s === 3 && 'Custom Itinerary'}
              {s === 4 && 'Review & Submit'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Anti-bot honeypot */}
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

        {/* STEP 1: Traveller Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-primary font-light">
              1. Your Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Lord & Lady Hamilton"
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hamilton@example.com"
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Country of Residence *
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. United Kingdom / Switzerland"
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 7911 123456"
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                Preferred Mode of Communication
              </label>
              <div className="flex gap-4">
                {['WhatsApp', 'Email', 'Phone Call'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-deep cursor-pointer">
                    <input
                      type="radio"
                      name="contactPreference"
                      value={opt}
                      checked={formData.contactPreference === opt}
                      onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                      className="accent-primary"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!formData.fullName || !formData.email || !formData.country || !formData.phone) {
                    alert('Please complete all required fields.')
                    return
                  }
                  setStep(2)
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs uppercase tracking-widest rounded-sm hover:bg-primary-hover transition-colors"
              >
                Proceed to Trip Dates
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Dates, Group, Interests */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-primary font-light">
              2. When and Who is Travelling?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Approximate Arrival Date
                </label>
                <input
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Approximate Departure Date
                </label>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Adult Travellers
                </label>
                <select
                  value={formData.travellerCount}
                  onChange={(e) => setFormData({ ...formData, travellerCount: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                    <option key={num} value={typeof num === 'number' ? num : 9}>
                      {num} {num === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Children / Teens (Under 18)
                </label>
                <select
                  value={formData.childrenCount}
                  onChange={(e) => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                >
                  {[0, 1, 2, 3, 4, '5+'].map((num) => (
                    <option key={num} value={typeof num === 'number' ? num : 5}>
                      {num} Children
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-subtle mb-3 font-medium">
                Key Travel Interests (Select all that inspire you)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleInterest(opt)}
                    className={`text-left px-4 py-2.5 text-xs rounded-sm border transition-all ${
                      formData.interests.includes(opt)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface text-charcoal border-sand hover:border-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-subtle mb-3 font-medium">
                Preferred Destinations / Regions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destinationOptions.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => toggleDestination(dest)}
                    className={`text-left px-4 py-2.5 text-xs rounded-sm border transition-all ${
                      formData.destinations.includes(dest)
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface text-charcoal border-sand hover:border-primary'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-subtle hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs uppercase tracking-widest rounded-sm hover:bg-primary-hover transition-colors"
              >
                Custom Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Specifics & Pace */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-primary font-light">
              3. Itinerary Nuances & Pace
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                Selected or Reference Tour (Optional)
              </label>
              <input
                type="text"
                value={formData.selectedTour}
                onChange={(e) => setFormData({ ...formData, selectedTour: e.target.value })}
                placeholder="e.g. Ceylon Heritage & Wildlife Sanctuary (12 Days)"
                className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Preferred Travel Pace
                </label>
                <select
                  value={formData.pace}
                  onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Slow & Immersive (3-4 nights per destination)">Slow & Immersive (3-4 nights per location)</option>
                  <option value="Balanced & Leisurely (2-3 nights per destination)">Balanced & Leisurely (2-3 nights per location)</option>
                  <option value="Comprehensive & Active (1-2 nights per destination)">Comprehensive & Active (1-2 nights per location)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                  Accommodation & Budget Tier
                </label>
                <select
                  value={formData.budgetTier}
                  onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Ultra-Luxury & Private Villas ($700+ / day / person)">Ultra-Luxury & Private Villas ($700+ / day)</option>
                  <option value="Luxury Boutique ($350 - $600 / day / person)">Luxury Boutique ($350 - $600 / day)</option>
                  <option value="Refined 4-5 Star Comfort ($200 - $350 / day / person)">Refined 4-5 Star Comfort ($200 - $350 / day)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-subtle mb-2 font-medium">
                Special Requests or Notes for our National Guide Lecturers
              </label>
              <textarea
                rows={4}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Mention dietary preferences, anniversary celebrations, photography interests, mobility requirements, or specific sites you yearn to visit."
                className="w-full px-4 py-3 bg-surface border border-sand rounded-sm text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-subtle hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs uppercase tracking-widest rounded-sm hover:bg-primary-hover transition-colors"
              >
                Review Summary
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-primary font-light">
              4. Review Your Inquiry
            </h3>

            <div className="bg-surface p-6 rounded-sm border border-sand space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-sand">
                <div>
                  <span className="text-muted uppercase tracking-wider block">Lead Traveller</span>
                  <span className="font-medium text-primary text-sm">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-muted uppercase tracking-wider block">Contact</span>
                  <span className="font-medium text-primary text-sm">{formData.email} ({formData.phone})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-sand">
                <div>
                  <span className="text-muted uppercase tracking-wider block">Country</span>
                  <span className="font-medium text-primary">{formData.country}</span>
                </div>
                <div>
                  <span className="text-muted uppercase tracking-wider block">Party Size</span>
                  <span className="font-medium text-primary">{formData.travellerCount} Adults, {formData.childrenCount} Children</span>
                </div>
                <div>
                  <span className="text-muted uppercase tracking-wider block">Dates</span>
                  <span className="font-medium text-primary">{formData.arrivalDate || 'Flexible'} to {formData.departureDate || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-muted uppercase tracking-wider block">Pace</span>
                  <span className="font-medium text-primary">{formData.pace}</span>
                </div>
              </div>

              {formData.interests.length > 0 && (
                <div>
                  <span className="text-muted uppercase tracking-wider block mb-1">Interests</span>
                  <span className="text-primary">{formData.interests.join(', ')}</span>
                </div>
              )}

              {formData.destinations.length > 0 && (
                <div>
                  <span className="text-muted uppercase tracking-wider block mb-1">Preferred Destinations</span>
                  <span className="text-primary">{formData.destinations.join(', ')}</span>
                </div>
              )}

              {formData.specialRequests && (
                <div>
                  <span className="text-muted uppercase tracking-wider block mb-1">Special Requests</span>
                  <p className="text-primary italic">{formData.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 accent-primary"
                />
                <span className="text-xs text-subtle leading-relaxed">
                  I consent to Anthony Holidays processing my travel inquiry details to formulate a bespoke itinerary in accordance with their privacy policy.
                </span>
              </label>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                {errorMessage}
              </div>
            )}

            <div className="pt-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider text-subtle hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit Preferences
              </button>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs uppercase tracking-widest rounded-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  'Transmitting Proposal...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Custom Journey Enquiry
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
