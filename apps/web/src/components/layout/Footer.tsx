'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export interface FooterProps {
  siteSettings?: {
    companyName?: string
    tagline?: string
    logoText?: string
    logo?: any
    footerText?: string
    registrationInfo?: string
    contact?: {
      email?: string
      phone?: string
      whatsappNumber?: string
      address?: string
    }
    socialLinks?: {
      facebook?: string
      instagram?: string
      tiktok?: string
      twitter?: string
      youtube?: string
      tripadvisor?: string
    }
  }
  logoUrl?: string
}

export function Footer({ siteSettings, logoUrl }: FooterProps = {}) {
  const currentYear = new Date().getFullYear()

  const companyName = siteSettings?.companyName || 'Anthony Holidays'
  const fullLogoText = siteSettings?.logoText || companyName
  const logoParts = fullLogoText.trim().split(/\s+/)
  const firstWord = logoParts[0]
  const restWords = logoParts.slice(1).join(' ')

  const email = siteSettings?.contact?.email || process.env.COMPANY_EMAIL || 'anthonyholidaysdmc@gmail.com'
  const phone = siteSettings?.contact?.phone || process.env.PUBLIC_PHONE_NUMBER || '+94 70 324 7929'
  const address = siteSettings?.contact?.address || '480/2, Subodha Mawatha, Kadawatha, Sri Lanka'

  const footerAboutText =
    siteSettings?.footerText ||
    `${companyName} is a Sri Lankan destination management company led by licensed national tourist guide lecturers. We create authentic, personalised journeys across the island.`

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
  ]

  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-12" role="contentinfo">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-ivory/10">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={fullLogoText}
                  className="h-10 sm:h-12 w-auto object-contain brightness-0 invert mb-1"
                />
              ) : (
                <>
                  <p className="font-serif text-2xl font-semibold tracking-widest uppercase text-ivory mb-1">
                    {firstWord}
                  </p>
                  {restWords && (
                    <p className="font-sans text-xs tracking-[0.25em] uppercase text-sand">
                      {restWords}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="w-8 h-px bg-gold mb-5" />

            <p className="text-sm leading-relaxed text-ivory/65 mb-6 max-w-[280px]">
              {footerAboutText}
            </p>
            {siteSettings?.registrationInfo && (
              <p className="text-xs text-gold/80 mb-6 font-mono tracking-wider">
                SLTDA: {siteSettings.registrationInfo}
              </p>
            )}

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${companyName} on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-ivory/20 flex items-center justify-center text-ivory/60 hover:border-gold hover:text-gold transition-colors"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Journeys Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="section-label text-gold mb-5 justify-center md:justify-start">
              Journeys & Packages
            </p>
            <ul className="list-none flex flex-col items-center md:items-start gap-2.5">
              {[
                { href: '/tours', label: 'Tour Packages' },
                { href: '/special-packages', label: 'Special Packages' },
                { href: '/services', label: 'Our Services' },
                { href: '/reviews', label: 'Client Reviews' },
                { href: '/start-planning', label: 'Tailor-Made Journeys' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/65 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="section-label text-gold mb-5 justify-center md:justify-start">
              About & Trust
            </p>
            <ul className="list-none flex flex-col items-center md:items-start gap-2.5">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/about#team', label: 'Founder & Guiding Team' },
                { href: '/reviews', label: 'Guest Reviews' },
                { href: '/blog', label: 'Blog & Articles' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/65 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="section-label text-gold mb-5 justify-center md:justify-start">
              Get in Touch
            </p>
            <ul className="list-none flex flex-col items-center md:items-start gap-3.5">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center md:items-start justify-center md:justify-start gap-2.5 text-sm text-ivory/65 hover:text-ivory transition-colors"
                >
                  <Mail size={14} className="shrink-0 text-gold md:mt-0.5" />
                  <span>{email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center md:items-start justify-center md:justify-start gap-2.5 text-sm text-ivory/65 hover:text-ivory transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-gold md:mt-0.5" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start justify-center md:justify-start gap-1.5 sm:gap-2.5 text-sm text-ivory/65">
                  <MapPin size={14} className="shrink-0 text-gold md:mt-0.5" />
                  <span>{address}</span>
                </span>
              </li>
            </ul>

            <Link
              href="/start-planning"
              className="btn btn-gold mt-7 text-xs py-2.5"
            >
              Start Planning
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7 text-center md:text-left">
          <p className="text-xs text-ivory/70">
            © {currentYear} {companyName}. All rights reserved.
          </p>

          <p className="text-xs text-ivory/60">
            Powered by{' '}
            <a
              href="https://www.lunorlabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 hover:text-gold transition-colors font-medium underline-offset-4 hover:underline"
            >
              Lunor Labs Pvt Ltd
            </a>
          </p>

          <div className="flex gap-6 justify-center">
            {[
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms-and-conditions', label: 'Terms & Conditions' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-ivory/70 hover:text-ivory transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
