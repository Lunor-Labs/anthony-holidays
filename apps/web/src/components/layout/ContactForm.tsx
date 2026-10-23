'use client'

import React, { useState, useRef } from 'react'
import { Send } from 'lucide-react'
import { TurnstileWidget, TurnstileWidgetRef } from '@/components/ui/TurnstileWidget'
import { getRecaptchaToken } from '@/lib/recaptcha-client'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileWidgetRef = useRef<TurnstileWidgetRef>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!turnstileToken) {
      alert('Please complete the security check before submitting.')
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    setStatus('submitting')
    setErrorMessage('')

    try {
      // Execute Google reCAPTCHA v3
      const recaptchaToken = await getRecaptchaToken('contact_submission')

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          subject: formData.get('subject') as string,
          message: formData.get('message') as string,
          cf_turnstile_response: turnstileToken,
          g_recaptcha_response: recaptchaToken,
        }),
      })

      if (res.ok || res.redirected) {
        setStatus('success')
        form.reset()
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data.error || 'Failed to send message. Please try again.')
        setStatus('error')
        turnstileWidgetRef.current?.reset()
        setTurnstileToken('')
      }
    } catch {
      setStatus('error')
      setErrorMessage('A network error occurred. Please try again.')
      turnstileWidgetRef.current?.reset()
      setTurnstileToken('')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-8 md:p-10 border border-cream shadow-sm text-center">
        <div className="w-12 h-12 bg-forest text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={18} />
        </div>
        <h3 className="font-serif text-xl text-charcoal mb-2">Message Received</h3>
        <p className="text-stone text-sm">
          Thank you for reaching out. A member of our team will respond within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 md:p-10 border border-cream shadow-sm">
      <h2 className="font-serif text-2xl text-charcoal mb-2">Send an Enquiry</h2>
      <p className="text-stone text-sm mb-6 font-light">
        Fill out the form below and Anthony or one of our licensed guide lecturers will respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot field for bot detection */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website_trap"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Eleanor Vance"
              className="w-full px-4 py-3 bg-offwhite border border-cream text-sm text-charcoal outline-none focus:border-forest transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="eleanor@example.com"
              className="w-full px-4 py-3 bg-offwhite border border-cream text-sm text-charcoal outline-none focus:border-forest transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            placeholder="e.g. Tailor-Made Journey / Guide Consultation / General Question"
            className="w-full px-4 py-3 bg-offwhite border border-cream text-sm text-charcoal outline-none focus:border-forest transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
            Message *
          </label>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="How can we assist your Sri Lankan travel aspirations?"
            className="w-full px-4 py-3 bg-offwhite border border-cream text-sm text-charcoal outline-none focus:border-forest transition-colors resize-y"
          />
        </div>

        {/* Cloudflare Turnstile */}
        <TurnstileWidget
          ref={turnstileWidgetRef}
          className="justify-start"
          onVerify={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken('')}
        />

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || !turnstileToken}
          className="btn btn-primary w-full sm:w-auto px-8 py-3.5 disabled:opacity-50"
        >
          <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}
