import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anthonyholidays.com'

  const staticRoutes = [
    '',
    '/tours',
    '/special-packages',
    '/services',
    '/about',
    '/team',
    '/reviews',
    '/blog',
    '/start-planning',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/tours' || route === '/special-packages' ? 0.9 : 0.8,
  }))

  const journeys = [
    'essence-of-ceylon',
    'tea-trails-ancient-temples',
    'classic-triangle-and-wildlife',
    'heritage-and-southern-coast',
    'grand-sri-lankan-loop',
    'deep-dive-culture-and-nature',
    'ramayana-trail-special',
    'ultimate-pearl-experience',
  ].map((slug) => ({
    url: `${baseUrl}/tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const specialPackages = [
    'hikkaduwa-marine-conservation-surf',
    'southern-sea-turtle-sanctuary-volunteering',
    'essential-island-budget-explorer',
    'knuckles-wilderness-adventure-trek',
    'bespoke-private-island-immersion',
  ].map((slug) => ({
    url: `${baseUrl}/special-packages/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...staticRoutes, ...journeys, ...specialPackages]
}
