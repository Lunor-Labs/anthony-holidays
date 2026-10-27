import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import { getSiteSettings } from '@/lib/payload-data'
import { PageHero } from '@/components/ui/PageHero'
import { ContactForm } from '@/components/layout/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const companyName = siteSettings?.companyName || 'Anthony Holidays'
  return {
    title: `Contact Us - ${companyName} Sri Lanka`,
    description: `Connect directly with ${companyName} via WhatsApp, telephone, or email to discuss private Sri Lankan journeys and custom tour logistics.`,
  }
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings()
  const companyName = siteSettings?.companyName || 'Anthony Holidays'
  const whatsappNumber = siteSettings?.contact?.whatsappNumber || '94703247929'
  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    `Hello ${companyName}, I would like to get in touch regarding a private Sri Lanka tour.`,
  )
  const email = siteSettings?.contact?.email || process.env.COMPANY_EMAIL || 'anthonyholidaysdmc@gmail.com'
  const phone = siteSettings?.contact?.phone || process.env.PUBLIC_PHONE_NUMBER || '+94 70 324 7929'
  const address = siteSettings?.contact?.address || '480/2, Subodha Mawatha, Kadawatha, Sri Lanka'
  const googleMapsEmbedUrl =
    (siteSettings?.contact as any)?.googleMapsEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.228519495393!2d79.9515598!3d6.9823432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25776269b0eb3%3A0x6b4ef8d4b310d5ec!2sSubodha%20Mawatha%2C%20Kadawatha!5e0!3m2!1sen!2slk!4v1700000000000'

  const socialLinks = [
    {
      label: 'Instagram',
      href: siteSettings?.socialLinks?.instagram || 'https://www.instagram.com/anthonyholidays?xtok=eHJpbjlpbXV6ajhr&utm_source=qr',
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
      href: siteSettings?.socialLinks?.facebook || 'https://www.facebook.com/profile.php?id=61595480729179&mibextid=wwXIfr',
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: siteSettings?.socialLinks?.tiktok || 'https://www.tiktok.com/@anthony.holidays?_r=1&_t=ZS-9AtbNBLoa3g',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: siteSettings?.socialLinks?.youtube || 'https://youtube.com/@anthonyholidays?si=tm5qd-em3zdhROQJ',
      svg: (
        <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9" />
        </svg>
      ),
    },
    ...(siteSettings?.socialLinks?.twitter
      ? [
          {
            label: 'Twitter',
            href: siteSettings.socialLinks.twitter,
            svg: (
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            ),
          },
        ]
      : []),
  ]

  return (
    <>
      {/* Header */}
      <PageHero
        breadcrumbCurrent="Contact Us"
        badge="Direct Inquiries"
        title="We Are Always Here to Assist"
        description={`Connect directly with ${companyName} and our licensed guide lecturers. We answer every inquiry with precision, warmth, and genuine local expertise.`}
        maxWidth="5xl"
      />

      <div className="section-padding-sm bg-offwhite">
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
                      <span className="text-xs font-bold text-stone uppercase tracking-wider block">
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
                      <span className="text-xs font-bold text-stone uppercase tracking-wider block">
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
                      <span className="text-xs font-bold text-stone uppercase tracking-wider block">
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
                      <span className="text-xs font-bold text-stone uppercase tracking-wider block">
                        Office Location
                      </span>
                      <span className="font-medium text-charcoal">
                        {address}
                      </span>
                    </div>
                  </li>

                  {/* Hours */}
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone uppercase tracking-wider block">
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
                  <span className="text-xs font-bold text-stone uppercase tracking-wider block mb-3">
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
              <ContactForm />
            </div>
          </div>

          {/* Google Maps Embed Section */}
          <div className="mt-16 bg-white border border-cream p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-2 border-b border-cream mb-4">
              <div className="flex items-center gap-2 text-forest">
                <MapPin size={16} className="text-gold" />
                <span className="font-serif text-lg">Destination Base Map</span>
              </div>
              <span className="text-xs text-stone">
                {address}
              </span>
            </div>

            <div className="relative w-full aspect-[21/9] min-h-[300px] overflow-hidden bg-offwhite">
              <iframe
                title={`${siteSettings?.companyName || 'Anthony Holidays'} Location & Sri Lanka Destination Map`}
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
