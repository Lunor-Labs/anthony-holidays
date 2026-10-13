import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { getSiteSettings } from '@/lib/payload-data'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Anthony Holidays',
    default: 'Anthony Holidays - Expert-Led Sri Lanka Journeys',
  },
  description:
    'Discover Sri Lanka with Anthony Holidays - led by licensed national tourist guide lecturers. Tailor-made journeys, private tours, and authentic travel experiences across the island.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap"
        />
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
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
