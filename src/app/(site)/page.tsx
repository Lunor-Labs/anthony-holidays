import type { Metadata } from 'next'
import {
  getJourneys,
  getSpecialPackages,
  getTestimonials,
  getJournalPosts,
} from '@/lib/payload-data'
import {
  HeroSection,
  IntroSection,
  DiscoverSriLankaSection,
  FeaturedSpecialPackagesSection,
  ExperiencesSection,
  WhyChooseUsSection,
  TestimonialsSection,
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
  const [journeys, specialPackages, testimonials, posts] = await Promise.all([
    getJourneys(),
    getSpecialPackages(),
    getTestimonials(),
    getJournalPosts(),
  ])

  return (
    <>
      <HeroSection />
      <IntroSection />
      <DiscoverSriLankaSection journeys={journeys} />
      <FeaturedSpecialPackagesSection specialPackages={specialPackages} />
      <ExperiencesSection />
      <WhyChooseUsSection />
      <TestimonialsSection testimonials={testimonials} />
      <JournalPreviewSection posts={posts} />
      <CallToActionSection />
    </>
  )
}
