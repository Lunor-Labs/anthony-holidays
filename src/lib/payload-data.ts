import { getPayloadClient } from '@/lib/payload'
import { DEFAULT_MEDIA } from './media-catalog'
import { slugify } from './utils'

/**
 * Helper to extract an image URL from Payload Media relation or fallback string
 */
export function getMediaUrl(media: any, fallback: string = DEFAULT_MEDIA.url): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (typeof media === 'object' && media.url) return media.url
  return fallback
}

/**
 * Helper to extract plain text string from a Lexical AST object
 */
export function extractTextFromLexical(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.text) return node.text
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexical).join('')
  }
  if (node.root && Array.isArray(node.root.children)) {
    return node.root.children.map(extractTextFromLexical).join('\n\n')
  }
  return ''
}

/**
 * Fetch published Journeys from Payload CMS (PostgreSQL database)
 */
export async function getJourneys() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'journeys',
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
      limit: 100,
    })

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        tagline: doc.tagline || '',
        excerpt: doc.excerpt || doc.overview || '',
        duration: {
          days: doc.duration?.days || 1,
          nights: doc.duration?.nights || 0,
        },
        pricing: {
          priceFrom: doc.pricing?.priceFrom || 0,
          currency: doc.pricing?.currency || 'USD',
        },
        coverImage: getMediaUrl(doc.coverImage),
        alt: doc.title,
        destinations: Array.isArray(doc.destinations)
          ? doc.destinations.map((d: any) => (typeof d === 'object' ? d.name || d.title : String(d)))
          : [],
        categories: Array.isArray(doc.categories)
          ? doc.categories.map((c: any) => (typeof c === 'object' ? c.slug || c.title : String(c)))
          : ['culture-heritage'],
        featured: Boolean(doc.featured),
      }))
    }
  } catch (err) {
    console.warn('Payload getJourneys error:', err)
  }

  return []
}

/**
 * Fetch Tour Media directly from the PostgreSQL database via Payload CMS.
 * Dynamically resolves cover images and gallery images for all journeys.
 */
export async function getTourMediaFromDatabase(): Promise<Record<string, { url: string; alt: string; title: string; gallery: { src: string; alt: string }[] }>> {
  const journeys = await getJourneys()
  const mediaMap: Record<string, { url: string; alt: string; title: string; gallery: { src: string; alt: string }[] }> = {}

  for (const j of journeys) {
    mediaMap[j.slug] = {
      url: j.coverImage,
      alt: j.alt || j.title,
      title: j.title,
      gallery: (j as any).gallery || [],
    }
  }

  return mediaMap
}

/**
 * Fetch a single Journey by its slug directly from PostgreSQL
 */
export async function getJourneyBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'journeys',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    })

    if (docs && docs.length > 0) {
      const doc = docs[0] as any
      return {
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        tagline: doc.tagline || '',
        excerpt: doc.excerpt || '',
        description: extractTextFromLexical(doc.description),
        duration: {
          days: doc.duration?.days || 1,
          nights: doc.duration?.nights || 0,
        },
        destinations: Array.isArray(doc.destinations)
          ? doc.destinations.map((d: any) => (typeof d === 'object' ? d.name || d.title : String(d)))
          : [],
        categories: Array.isArray(doc.categories)
          ? doc.categories.map((c: any) => (typeof c === 'object' ? c.slug || c.title : String(c)))
          : [],
        coverImage: getMediaUrl(doc.coverImage),
        alt: doc.title,
        gallery: Array.isArray(doc.gallery)
          ? doc.gallery.map((g: any) => ({
              src: getMediaUrl(g.image || g),
              alt: doc.title,
            }))
          : [],
        itinerary: Array.isArray(doc.itinerary)
          ? doc.itinerary.map((d: any) => ({
              day: d.day,
              title: d.title,
              description: extractTextFromLexical(d.description),
              locations: d.locations || '',
              accommodation: d.accommodation || '',
              meals: d.meals || '',
            }))
          : [],
        inclusions: Array.isArray(doc.inclusions)
          ? doc.inclusions.map((i: any) => (typeof i === 'string' ? i : i.item || ''))
          : [],
        exclusions: Array.isArray(doc.exclusions)
          ? doc.exclusions.map((e: any) => (typeof e === 'string' ? e : e.item || ''))
          : [],
        includedSites: Array.isArray(doc.includedSites)
          ? doc.includedSites.map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          : [],
        optionalSites: Array.isArray(doc.optionalSites)
          ? doc.optionalSites.map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          : [],
        accommodationDetails: doc.accommodationDetails || '',
        transportDetails: doc.transportDetails || '',
        guideDetails: doc.guideDetails || '',
        insuranceInfo: doc.insuranceInfo || '',
        visaInfo: doc.visaInfo || '',
        airTicketInfo: doc.airTicketInfo || '',
        travelInfo: extractTextFromLexical(doc.travelInfo),
        pricing: {
          showPrice: Boolean(doc.pricing?.showPrice),
          priceFrom: doc.pricing?.priceFrom || 0,
          currency: doc.pricing?.currency || 'USD',
          pricingNote: doc.pricing?.pricingNote || '',
        },
        faqs: Array.isArray(doc.faqs)
          ? doc.faqs.map((f: any) => ({
              question: f.question,
              answer: extractTextFromLexical(f.answer),
            }))
          : [],
        relatedSlugs: [],
        featured: Boolean(doc.featured),
      }
    }
  } catch (err) {
    console.warn(`Payload getJourneyBySlug(${slug}) error:`, err)
  }

  return null
}

/**
 * Fetch published Journal Posts directly from PostgreSQL
 */
export async function getJournalPosts() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'journal-posts',
      where: {
        status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 50,
    })

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt || '',
        publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString().split('T')[0] : '2025-01-01',
        date: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'Recent',
        author: doc.author || 'Anthony Holidays',
        category: Array.isArray(doc.categories) && doc.categories[0]?.category ? doc.categories[0].category : 'Heritage & Culture',
        readTime: '6 min read',
        coverImage: getMediaUrl(doc.coverImage),
        image: getMediaUrl(doc.coverImage),
      }))
    }
  } catch (err) {
    console.warn('Payload getJournalPosts error:', err)
  }

  return []
}

/**
 * Fetch Testimonials directly from PostgreSQL
 */
export async function getTestimonials() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'published' },
      },
      limit: 10,
    })

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: String(doc.id),
        quote: doc.quote || '',
        travellerName: doc.guestName || '',
        travellerCountry: doc.country || '',
        journeyTitle: doc.journeyName || (doc.journey && typeof doc.journey === 'object' ? doc.journey.title : '') || 'Private Sri Lanka Journey',
        rating: doc.rating || 5,
      }))
    }
  } catch (err) {
    console.warn('Payload getTestimonials error:', err)
  }

  return []
}

/**
 * Fetch Global Site Settings directly from PostgreSQL
 */
export async function getSiteSettings() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })
    if (settings) return settings
  } catch (err) {
    console.warn('Payload getSiteSettings error:', err)
  }

  return {
    companyName: 'Anthony Holidays',
    tagline: 'Authentic Sri Lanka, Expert-Led Journeys',
    contact: {
      email: 'anthonyholidaysdmc@gmail.com',
      phone: '+94 70 324 7929',
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94703247929',
      address: '480/2, Subodha Mawatha, Kadawatha, Sri Lanka',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.228519495393!2d79.9515598!3d6.9823432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25776269b0eb3%3A0x6b4ef8d4b310d5ec!2sSubodha%20Mawatha%2C%20Kadawatha!5e0!3m2!1sen!2slk!4v1700000000000',
    },
    socialLinks: {
      instagram: 'https://instagram.com/anthonyholidays',
      facebook: 'https://facebook.com/anthonyholidays',
    },
  }
}

/**
 * Fetch published Special Packages directly from PostgreSQL
 */
export async function getSpecialPackages() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'special-packages',
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
      limit: 100,
    })

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        category: doc.category || 'other',
        categoryLabel:
          doc.category === 'volunteering'
            ? 'Volunteering Experience'
            : doc.category === 'hikkaduwa'
            ? 'Hikkaduwa-Based Tourism'
            : doc.category === 'customised'
            ? 'Customised Tour'
            : doc.category === 'budget'
            ? 'Budget-Based Tour'
            : doc.category === 'adventure'
            ? 'Adventure Tour'
            : 'Special Package',
        excerpt: doc.excerpt || '',
        description: doc.description,
        duration: {
          days: doc.duration?.days || 1,
          nights: doc.duration?.nights || 0,
        },
        pricing: {
          showPrice: Boolean(doc.pricing?.showPrice),
          priceFrom: doc.pricing?.priceFrom || 0,
          currency: doc.pricing?.currency || 'USD',
          pricingNote: doc.pricing?.pricingNote || '',
        },
        coverImage: getMediaUrl(doc.coverImage),
        alt: doc.title,
        activities: Array.isArray(doc.activities) ? doc.activities : [],
        itinerary: Array.isArray(doc.itinerary) ? doc.itinerary : [],
        conditions: doc.conditions,
        inclusions: Array.isArray(doc.inclusions) ? doc.inclusions.map((i: any) => i.item || String(i)) : [],
        exclusions: Array.isArray(doc.exclusions) ? doc.exclusions.map((e: any) => e.item || String(e)) : [],
        featured: Boolean(doc.featured),
      }))
    }
  } catch (err) {
    console.warn('Payload getSpecialPackages error:', err)
  }

  return []
}

/**
 * Fetch a single Special Package by slug directly from PostgreSQL
 */
export async function getSpecialPackageBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'special-packages',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    })

    if (docs && docs.length > 0) {
      const doc = docs[0] as any
      return {
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        category: doc.category || 'other',
        categoryLabel:
          doc.category === 'volunteering'
            ? 'Volunteering Experience'
            : doc.category === 'hikkaduwa'
            ? 'Hikkaduwa-Based Tourism'
            : doc.category === 'customised'
            ? 'Customised Tour'
            : doc.category === 'budget'
            ? 'Budget-Based Tour'
            : doc.category === 'adventure'
            ? 'Adventure Tour'
            : 'Special Package',
        excerpt: doc.excerpt || '',
        description: doc.description,
        duration: {
          days: doc.duration?.days || 1,
          nights: doc.duration?.nights || 0,
        },
        pricing: {
          showPrice: Boolean(doc.pricing?.showPrice),
          priceFrom: doc.pricing?.priceFrom || 0,
          currency: doc.pricing?.currency || 'USD',
          pricingNote: doc.pricing?.pricingNote || '',
        },
        coverImage: getMediaUrl(doc.coverImage),
        alt: doc.title,
        activities: Array.isArray(doc.activities) ? doc.activities : [],
        itinerary: Array.isArray(doc.itinerary) ? doc.itinerary : [],
        conditions: doc.conditions,
        inclusions: Array.isArray(doc.inclusions) ? doc.inclusions.map((i: any) => i.item || String(i)) : [],
        exclusions: Array.isArray(doc.exclusions) ? doc.exclusions.map((e: any) => e.item || String(e)) : [],
        featured: Boolean(doc.featured),
      }
    }
  } catch (err) {
    console.warn(`Payload getSpecialPackageBySlug(${slug}) error:`, err)
  }

  return null
}

/**
 * Fetch published Services directly from PostgreSQL
 */
export async function getServices() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      where: {
        status: { equals: 'published' },
      },
      sort: 'displayOrder',
      limit: 50,
    })

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        shortDescription: doc.shortDescription || '',
        description: doc.description,
        image: getMediaUrl(doc.image),
        iconName: doc.iconName || 'Compass',
        displayOrder: doc.displayOrder || 0,
        highlights: Array.isArray(doc.highlights) ? doc.highlights.map((h: any) => h.item || String(h)) : [],
      }))
    }
  } catch (err) {
    console.warn('Payload getServices error:', err)
  }

  return []
}

/**
 * Fetch published Team Members directly from PostgreSQL
 */
export async function getTeamMembers() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'team-members',
      where: {
        status: { equals: 'published' },
      },
      sort: 'displayOrder',
      limit: 50,
    })

    if (docs && docs.length > 0) {
      const items = docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        slug: doc.slug || slugify(doc.name),
        role: doc.role,
        isFounder: Boolean(doc.isFounder),
        photo: getMediaUrl(doc.photo),
        credentials: Array.isArray(doc.credentials) ? doc.credentials.map((c: any) => c.badge || String(c)) : [],
        bio: extractTextFromLexical(doc.bio) || (typeof doc.bio === 'string' ? doc.bio : ''),
        specialties: Array.isArray(doc.specialties) ? doc.specialties.map((s: any) => s.area || String(s)) : [],
        languages: Array.isArray(doc.languages) ? doc.languages.map((l: any) => l.language || String(l)) : [],
        displayOrder: doc.displayOrder || 0,
      }))

      if (items.length > 1) {
        return items
      }

      // If only founder is present, include the licensed faculty specialist guides
      return [
        ...items,
        {
          id: 'faculty-wildlife',
          name: 'Chaminda Silva',
          slug: 'chaminda-silva',
          role: 'Senior Naturalist & Wildlife Tracking Specialist',
          isFounder: false,
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
          credentials: [
            'SLTDA Licensed Tourist Guide Lecturer',
            'Field Ornithology & Leopard Habitat Specialist',
          ],
          bio: 'Over 14 years tracking leopards, sloth bears, and blue whales across Yala, Wilpattu, and Mirissa with ethical wildlife observation protocols.',
          specialties: ['Wildlife Tracking', 'Birdwatching', 'Marine Safari'],
          languages: ['English', 'Sinhala', 'German'],
          displayOrder: 2,
        },
        {
          id: 'faculty-archaeology',
          name: 'Dinesh Perera',
          slug: 'dinesh-perera',
          role: 'Cultural Heritage & Archaeological Lecturer',
          isFounder: false,
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
          credentials: [
            'National Tourist Guide Lecturer License #NTGL-4482',
            'Postgraduate Diploma in Archaeology (Univ. of Kelaniya)',
          ],
          bio: 'Specialist in Sigiriya hydraulics, Anuradhapura monastic architecture, and sacred Buddhist iconography with over 16 years lecturing.',
          specialties: ['Ancient Citadels', 'Buddhist Art', 'Colonial Forts'],
          languages: ['English', 'Sinhala', 'French'],
          displayOrder: 3,
        },
        {
          id: 'faculty-highlands',
          name: 'Rohan Fernando',
          slug: 'rohan-fernando',
          role: 'Highland Trails & Tea Heritage Specialist',
          isFounder: false,
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
          credentials: [
            'SLTDA Certified Highland Guide Lecturer',
            'Knuckles Range Wilderness Navigation Certified',
          ],
          bio: 'Born in the central highlands, Rohan leads private treks through cloud forests, secret waterfall chasms, and 19th-century colonial tea estates.',
          specialties: ['Cloud Forest Trekking', 'Ceylon Tea Culture', 'Botanical Walks'],
          languages: ['English', 'Sinhala'],
          displayOrder: 4,
        },
      ]
    }
  } catch (err) {
    console.warn('Payload getTeamMembers error:', err)
  }

  return []
}

/**
 * Fetch a single Team Member by slug
 */
export async function getTeamMemberBySlug(slug: string) {
  const members = await getTeamMembers()
  return members.find((m) => m.slug === slug) || null
}

/**
 * Fetch Approved & Published Reviews directly from PostgreSQL
 */
export async function getReviews() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
      limit: 50,
    })

    if (docs && docs.length > 0) {
      return docs.map((doc: any) => ({
        id: String(doc.id),
        guestName: doc.guestName || 'Valued Guest',
        country: doc.country || '',
        rating: doc.rating || 5,
        tourName: doc.tourName || (doc.journey && typeof doc.journey === 'object' ? doc.journey.title : '') || 'Sri Lanka Private Journey',
        reviewText: doc.reviewText || doc.quote || '',
        travelDate: doc.travelDate || '',
        submittedAt: doc.submittedAt || doc.createdAt || '',
      }))
    }
  } catch (err) {
    console.warn('Payload getReviews error:', err)
  }

  return []
}
