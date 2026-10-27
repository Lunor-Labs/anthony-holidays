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
import { getSiteSettings, getMediaUrl } from '@/lib/payload-data'
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

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const siteUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

  const title =
    siteSettings?.seo?.defaultTitle ||
    'Anthony Holidays - Expert-Led Sri Lanka Journeys'
  const description =
    siteSettings?.seo?.defaultDescription ||
    'Discover Sri Lanka with Anthony Holidays - led by licensed national tourist guide lecturers. Tailor-made journeys, private tours, and authentic travel experiences across the island.'

  const ogImageUrl = siteSettings?.seo?.defaultOgImage
    ? getMediaUrl(siteSettings.seo.defaultOgImage)
    : '/images/gallery/dawn-over-the-citadel.jpg'

  return {
    title: {
      template: '%s - Anthony Holidays',
      default: title,
    },
    description,
    metadataBase: new URL(siteUrl),
    verification: siteSettings?.seo?.googleSiteVerification
      ? {
          google: siteSettings.seo.googleSiteVerification,
        }
      : undefined,
    openGraph: {
      title,
      description,
      siteName: siteSettings?.companyName || 'Anthony Holidays',
      type: 'website',
      locale: 'en_GB',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
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
    telephone: siteSettings?.contact?.phone || '+94 70 324 7929',
    email: siteSettings?.contact?.email || 'anthonyholidaysdmc@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressLocality: siteSettings?.contact?.address || '480/2, Subodha Mawatha, Kadawatha, Sri Lanka',
    },
    sameAs: [
      siteSettings?.socialLinks?.facebook,
      siteSettings?.socialLinks?.instagram,
      siteSettings?.socialLinks?.tiktok,
      siteSettings?.socialLinks?.youtube,
      siteSettings?.socialLinks?.twitter,
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

  const logoUrl = siteSettings?.logo ? getMediaUrl(siteSettings.logo, '') : undefined

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
          <Header
            companyName={siteSettings?.companyName}
            logoText={siteSettings?.logoText}
            logoUrl={logoUrl}
          />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer siteSettings={siteSettings} logoUrl={logoUrl} />
          <WhatsAppButton
            whatsappNumber={siteSettings?.contact?.whatsappNumber}
            companyName={siteSettings?.companyName}
          />
          <ScrollToTop />
          <ReviewsWidget />
        </SmoothScrollProvider>
        {siteSettings?.seo?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.seo.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteSettings.seo.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
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
