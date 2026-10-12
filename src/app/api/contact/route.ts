import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayloadClient } from '@/lib/payload'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'inquiries@anthonyholidays.com'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let name = ''
    let email = ''
    let subject = ''
    let message = ''

    if (contentType.includes('application/json')) {
      const data = await req.json()
      name = data.name
      email = data.email
      subject = data.subject
      message = data.message
    } else {
      const formData = await req.formData()
      name = (formData.get('name') as string) || ''
      email = (formData.get('email') as string) || ''
      subject = (formData.get('subject') as string) || ''
      message = (formData.get('message') as string) || ''
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 })
    }

    // Save into Payload CMS Inquiries collection
    try {
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'inquiries',
        data: {
          fullName: name,
          email,
          country: 'Not provided',
          preferredContact: 'email',
          specialRequests: subject ? `Subject: ${subject}\n\n${message}` : message,
          privacyConsent: true,
          status: 'new',
          internalNotes: 'Received via Contact Page form',
        },
      })
    } catch (dbErr) {
      console.error('Failed to save contact message to database:', dbErr)
    }

    if (resend) {
      try {
        await resend.emails.send({
          from: 'Anthony Holidays <notifications@anthonyholidays.com>',
          to: COMPANY_EMAIL,
          subject: `Contact Message: ${subject || 'New Note'} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })
      } catch (err) {
        console.warn('Resend contact dispatch error:', err)
      }
    }

    return NextResponse.redirect(new URL('/contact?submitted=true', req.url))
  } catch (error) {
    console.error('Contact submit error:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}
