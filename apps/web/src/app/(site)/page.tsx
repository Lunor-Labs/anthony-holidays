import type { Metadata } from 'next'
import {
  getJourneys,
  getSpecialPackages,
  getTestimonials,
  getJournalPosts,
  getServices,
} from '@/lib/payload-data'
import {
  HeroSection,
  IntroSection,
  DiscoverSriLankaSection,
  FeaturedSpecialPackagesSection,
  WhyChooseUsSection,
  ServicesSection,
  TestimonialsSection,
  GallerySection,
  JournalPreviewSection,
  CallToActionSection,
} from '@/components/home'

export const metadata: Metadata = {
  title: 'Anthony Holidays - Expert-Led Sri Lanka Journeys',
  description:
    'Discover the authentic beauty of Sri Lanka with Anthony Holidays. Expert-led private tours crafted by licensed national tourist guide lecturers. Cultural heritage, wildlife, hill country, and coastal escapes.',
  openGraph: {
    title: 'Anthony Holidays - Expert-Led Sri Lanka Journeys',
    description:
      'Discover the authentic beauty of Sri Lanka with Anthony Holidays. Expert-led private tours and tailor-made journeys.',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka - Anthony Holidays',
      },
    ],
  },
}

export default async function HomePage() {
  const [allJourneys, allSpecialPackages, allTestimonials, posts, services] =
    await Promise.all([
      getJourneys(),
      getSpecialPackages(),
      getTestimonials(),
      getJournalPosts(),
      getServices(),
    ])

  const journeys = allJourneys.filter((j) => j.featured)
  const specialPackages = allSpecialPackages.filter((p) => p.featured)
  const testimonials = allTestimonials.filter((t) => t.featured ?? true)

  return (
    <>
      <HeroSection />
      <IntroSection />
      <DiscoverSriLankaSection journeys={journeys} />
      <FeaturedSpecialPackagesSection specialPackages={specialPackages} />
      <WhyChooseUsSection />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <GallerySection />
      <JournalPreviewSection posts={posts} />
      <CallToActionSection />
    </>
  )
}
