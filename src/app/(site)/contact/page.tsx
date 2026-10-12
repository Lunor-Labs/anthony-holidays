import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import { getSiteSettings } from '@/lib/payload-data'

export const metadata: Metadata = {
  title: 'Contact Us - Anthony Holidays Sri Lanka',
  description:
    'Connect directly with Anthony Holidays via WhatsApp, telephone, or email to discuss private Sri Lankan journeys and custom tour logistics.',
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings()
  const whatsappNumber = siteSettings?.contact?.whatsappNumber || '94771234567'
  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    'Hello Anthony Holidays, I would like to get in touch regarding a private Sri Lanka tour.',
  )
  const email = siteSettings?.contact?.email || 'inquiries@anthonyholidays.com'
  const phone = siteSettings?.contact?.phone || '+94 77 123 4567'
  const address = siteSettings?.contact?.address || 'Colombo & Kandy, Sri Lanka (Client Address Placeholder)'
  const googleMapsEmbedUrl =
    (siteSettings?.contact as any)?.googleMapsEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2024222.9515905096!2d79.8083!3d7.8731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000'

  const socialLinks = [
    {
      label: 'Instagram',
      href: siteSettings?.socialLinks?.instagram || '#',
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: siteSettings?.socialLinks?.facebook || '#',
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: siteSettings?.socialLinks?.twitter || '#',
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: siteSettings?.socialLinks?.youtube || '#',
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Header */}
      <div className="bg-forest pt-[clamp(7rem,12vw,10rem)] pb-[clamp(4rem,7vw,6rem)] text-ivory">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb mb-8 text-ivory/50">
            <Link href="/" className="text-ivory/50 hover:text-ivory transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Contact Us</span>
          </nav>

          <span className="section-label text-gold block mb-3">Direct Inquiries</span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-ivory font-normal leading-[1.1] mb-6 max-w-3xl">
            We Are Always Here to Assist
          </h1>
          <p className="font-sans text-[clamp(1rem,1.5vw,1.15rem)] text-ivory/75 max-w-2xl leading-relaxed font-light">
            Connect directly with Anthony and our licensed guide lecturers. We answer every inquiry with precision, warmth, and genuine local expertise.
          </p>
        </div>
      </div>

      <div className="section bg-offwhite py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 md:p-10 border border-cream shadow-sm">
                <span className="section-label text-gold block mb-2">Connect Directly</span>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6">
                  Direct Channels
                </h2>

                <ul className="space-y-6 text-sm">
                  {/* WhatsApp */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone uppercase tracking-wider block">
                        WhatsApp Concierge
                      </span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-forest hover:text-gold transition-colors text-base"
                      >
                        +{whatsappNumber.replace(/^\+/, '')}
                      </a>
                      <span className="block text-xs text-stone/80 mt-0.5">
                        Fastest response for international travellers
                      </span>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone uppercase tracking-wider block">
                        Inquiries & Proposals
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="font-medium text-forest hover:text-gold transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </li>

                  {/* Phone */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone uppercase tracking-wider block">
                        Direct Telephone
                      </span>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-medium text-forest hover:text-gold transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </li>

                  {/* Address */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone uppercase tracking-wider block">
                        Office Location
                      </span>
                      <span className="font-medium text-charcoal">
                        {address}
                      </span>
                      <span className="block text-xs text-stone/70 mt-0.5">
                        Client configuration setting in Payload CMS Admin
                      </span>
                    </div>
                  </li>

                  {/* Hours */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone uppercase tracking-wider block">
                        Operating Hours
                      </span>
                      <span className="font-medium text-charcoal">
                        08:00 – 20:00 (Sri Lanka Standard Time / UTC+5:30)
                      </span>
                      <span className="block text-xs text-stone/80 mt-0.5">
                        24/7 guest hotline active during booked journeys
                      </span>
                    </div>
                  </li>
                </ul>

                {/* Social Media Links */}
                <div className="mt-8 pt-6 border-t border-cream">
                  <span className="text-[11px] font-bold text-stone uppercase tracking-wider block mb-3">
                    Follow Our Explorations
                  </span>
                  <div className="flex gap-3">
                    {socialLinks.map(({ label, href, svg }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Anthony Holidays on ${label}`}
                        className="w-9 h-9 border border-cream flex items-center justify-center text-forest hover:border-gold hover:text-gold transition-colors"
                      >
                        {svg}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 border border-cream shadow-sm">
                <span className="section-label text-gold block mb-2">Send a Message</span>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6">
                  Online Enquiry
                </h2>

                <form action="/api/contact" method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. David Miller"
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
                        placeholder="e.g. david@example.com"
                        className="w-full px-4 py-3 bg-offwhite border border-cream text-sm text-charcoal outline-none focus:border-forest transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                      Subject or Travel Interest
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

                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto px-8 py-3.5"
                  >
                    <span>Send Message</span>
                    <Send size={14} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Google Maps Embed Section */}
          <div className="mt-16 bg-white border border-cream p-4 shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-cream mb-4">
              <div className="flex items-center gap-2 text-forest">
                <MapPin size={16} className="text-gold" />
                <span className="font-serif text-lg">Destination Base Map</span>
              </div>
              <span className="text-[11px] text-stone">
                Configured via Payload CMS Site Settings
              </span>
            </div>

            <div className="relative w-full aspect-[21/9] min-h-[300px] overflow-hidden bg-offwhite">
              <iframe
                title="Anthony Holidays Location & Sri Lanka Destination Map"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
