import type { Metadata } from 'next'
import Script from 'next/script'
import { Cinzel, Montserrat } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { ReviewsWidget } from '@/components/layout/ReviewsWidget'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { getSiteSettings } from '@/lib/payload-data'
import '@/app/globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s - Anthony Holidays',
    default: 'Anthony Holidays - Expert-Led Sri Lanka Journeys',
  },
  description:
    'Discover Sri Lanka with Anthony Holidays - led by licensed national tourist guide lecturers. Tailor-made journeys, private tours, and authentic travel experiences across the island.',
  metadataBase: new URL(
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ),
  openGraph: {
    siteName: 'Anthony Holidays',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()
  const siteUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteSettings?.companyName || 'Anthony Holidays',
    description:
      siteSettings?.tagline ||
      'Sri Lankan destination management company led by Licensed National Tourist Guide Lecturers. Expert-led private tours and tailor-made journeys.',
    url: siteUrl,
    telephone: siteSettings?.contact?.phone || '+94 77 123 4567',
    email: siteSettings?.contact?.email || 'info@anthonyholidays.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: siteSettings?.contact?.address || 'Sri Lanka',
    },
    sameAs: [
      siteSettings?.socialLinks?.facebook,
      siteSettings?.socialLinks?.instagram,
      siteSettings?.socialLinks?.twitter,
      siteSettings?.socialLinks?.youtube,
      siteSettings?.socialLinks?.tripadvisor,
    ].filter(Boolean),
    founder: {
      '@type': 'Person',
      name: 'Anthony',
      jobTitle: 'Licensed National Tourist Guide Lecturer',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
    knowsAbout: [
      'Sri Lanka Travel',
      'Cultural Tourism',
      'Wildlife Tourism',
      'Eco Tourism',
    ],
  }

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <CustomCursor />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer siteSettings={siteSettings} />
          <WhatsAppButton
            whatsappNumber={siteSettings?.contact?.whatsappNumber}
          />
          <ScrollToTop />
          <ReviewsWidget />
        </SmoothScrollProvider>
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
