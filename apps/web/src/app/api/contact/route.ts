import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { sendContactNotification, sendContactThankYou } from '@/lib/email'
import { BACKEND_URL, getSiteSettings } from '@/lib/payload-data'
import { verifyTurnstile } from '@/lib/turnstile'
import { verifyRecaptcha } from '@/lib/recaptcha'

const PAYLOAD_URL = BACKEND_URL

export async function POST(req: Request) {
  try {
    // 1. Rate limiting by IP
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-ip'

    const rateLimit = checkRateLimit(`contact-${clientIp}`, 5, 60 * 1000)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a minute before trying again.' },
        { status: 429 }
      )
    }

    const contentType = req.headers.get('content-type') || ''
    let name = ''
    let email = ''
    let subject = ''
    let message = ''
    let botTrap = ''
    let turnstileToken = ''
    let recaptchaToken = ''

    if (contentType.includes('application/json')) {
      const data = await req.json()
      name = data.name || ''
      email = data.email || ''
      subject = data.subject || ''
      message = data.message || ''
      botTrap = data.website_trap || data.honeypot || data.bot_field || ''
      turnstileToken = data.cf_turnstile_response || ''
      recaptchaToken = data.g_recaptcha_response || data.recaptcha_token || ''
    } else {
      const formData = await req.formData()
      name = (formData.get('name') as string) || ''
      email = (formData.get('email') as string) || ''
      subject = (formData.get('subject') as string) || ''
      message = (formData.get('message') as string) || ''
      botTrap =
        (formData.get('website_trap') as string) ||
        (formData.get('honeypot') as string) ||
        (formData.get('bot_field') as string) ||
        ''
      turnstileToken = (formData.get('cf-turnstile-response') as string) || (formData.get('cf_turnstile_response') as string) || ''
      recaptchaToken = (formData.get('g-recaptcha-response') as string) || (formData.get('recaptcha_token') as string) || ''
    }

    // 2. Honeypot check for bots
    if (botTrap) {
      return NextResponse.redirect(new URL('/contact?submitted=true', req.url))
    }

    // 3. Cloudflare Turnstile verification
    const turnstile = await verifyTurnstile(turnstileToken)
    if (!turnstile.success) {
      return NextResponse.json(
        { error: 'Security verification (Turnstile) failed. Please refresh and try again.' },
        { status: 403 }
      )
    }

    // 4. Google reCAPTCHA v3 verification
    const recaptcha = await verifyRecaptcha(recaptchaToken, 'contact_submission')
    if (!recaptcha.success) {
      return NextResponse.json(
        { error: 'Security verification (reCAPTCHA) failed. Please refresh and try again.' },
        { status: 403 }
      )
    }

    name = name.trim()
    email = email.trim().toLowerCase()
    subject = subject.trim()
    message = message.trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    // 3. Save into Payload CMS Inquiries collection via REST API
    try {
      await fetch(`${PAYLOAD_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          country: 'Not provided',
          preferredContact: 'email',
          specialRequests: subject ? `Subject: ${subject}\n\n${message}` : message,
          privacyConsent: true,
          status: 'new',
          internalNotes: 'Received via Contact Page form',
        }),
      })
    } catch (dbErr) {
      console.warn('Failed to forward contact message to Payload backend:', dbErr)
    }

    // 4. Send email notification & thank-you confirmation
    try {
      const siteSettings = await getSiteSettings()
      const notificationEmail = siteSettings?.enquiryNotificationEmail || undefined

      await Promise.allSettled([
        sendContactThankYou({ name, email, subject, message }),
        sendContactNotification({ name, email, subject, message }, notificationEmail),
      ]);
    } catch (err) {
      console.warn('Contact email dispatch error:', err);
    }

    return NextResponse.redirect(new URL('/contact?submitted=true', req.url))
  } catch (error) {
    console.error('Contact submit error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
