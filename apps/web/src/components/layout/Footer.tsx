'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export interface FooterProps {
  siteSettings?: {
    companyName?: string
    tagline?: string
    contact?: {
      email?: string
      phone?: string
      whatsappNumber?: string
      address?: string
    }
    socialLinks?: {
      facebook?: string
      instagram?: string
      twitter?: string
      youtube?: string
      tripadvisor?: string
    }
  }
}

export function Footer({ siteSettings }: FooterProps = {}) {
  const currentYear = new Date().getFullYear()

  const email = siteSettings?.contact?.email || 'anthonyholidaysdmc@gmail.com'
  const phone = siteSettings?.contact?.phone || '+94 70 324 7929'
  const address = siteSettings?.contact?.address || '480/2, Subodha Mawatha, Kadawatha, Sri Lanka'

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
    <footer className="bg-charcoal text-ivory pt-20 pb-12" role="contentinfo">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-ivory/10">
          {/* Brand Column */}
          <div>
            <div className="mb-6">
              <p className="font-serif text-2xl font-semibold tracking-widest uppercase text-ivory mb-1">
                Anthony
              </p>
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-sand">
                Holidays
              </p>
            </div>

            <div className="w-8 h-px bg-gold mb-5" />

            <p className="text-sm leading-relaxed text-ivory/65 mb-6 max-w-[280px]">
              Expert-led Sri Lanka journeys crafted by Licensed National Tourist Guide Lecturers.
              Authentic, personalised, unforgettable.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Anthony Holidays on ${label}`}
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
          <div>
            <p className="section-label text-gold mb-5">
              Journeys & Packages
            </p>
            <ul className="list-none flex flex-col gap-2.5">
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
          <div>
            <p className="section-label text-gold mb-5">
              About & Trust
            </p>
            <ul className="list-none flex flex-col gap-2.5">
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
          <div>
            <p className="section-label text-gold mb-5">
              Get in Touch
            </p>
            <ul className="list-none flex flex-col gap-3.5">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-2.5 text-sm text-ivory/65 hover:text-ivory transition-colors"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-gold" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-2.5 text-sm text-ivory/65 hover:text-ivory transition-colors"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-gold" />
                  {phone}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-ivory/65">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                  {address}
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
        <div className="flex flex-wrap items-center justify-between gap-4 pt-7">
          <p className="text-xs text-ivory/70">
            © {currentYear} Anthony Holidays. All rights reserved.
          </p>

          <div className="flex gap-6">
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
