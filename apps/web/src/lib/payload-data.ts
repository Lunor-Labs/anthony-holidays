import { slugify } from './utils'

export const DEFAULT_MEDIA = {
  key: 'default_ceylon_cover',
  url: '/images/gallery/dawn-over-the-citadel.jpg',
  alt: 'Anthony Holidays Ceylon Travel',
}

const DEFAULT_BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cms.anthonyholidays.com'
    : 'http://localhost:3001'

export const BACKEND_URL =
  process.env.BACKEND_URL || DEFAULT_BACKEND_URL
export const PAYLOAD_API_URL = BACKEND_URL

/**
 * Universal helper to execute cached REST requests against Payload CMS backend.
 * Falls back safely on network timeout or connection refused, with console logging.
 */
async function fetchFromPayload<T>(endpoint: string, revalidate: number = 60): Promise<T | null> {
  const isDev = process.env.NODE_ENV === 'development'
  const url = `${PAYLOAD_API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
  try {
    const res = await fetch(url, {
      cache: isDev ? 'no-store' : 'default',
      next: isDev ? undefined : { revalidate },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error(`[fetchFromPayload] ${res.status} ${res.statusText} for URL: ${url}`)
      return null
    }

    return (await res.json()) as T
  } catch (err) {
    console.error(`[fetchFromPayload] Network error fetching ${url}:`, err)
    return null
  }
}

export function getMediaUrl(media: any, fallback: string = DEFAULT_MEDIA.url): string {
  if (!media) return fallback

  let filename = ''

  if (typeof media === 'string') {
    // Raw string — could be a full URL or a relative path
    if (media.startsWith('http://') || media.startsWith('https://')) {
      try {
        const parsed = new URL(media)
        if (parsed.pathname.startsWith('/api/media/file/')) {
          const raw = parsed.pathname.slice('/api/media/file/'.length)
          return `/media/${decodeURIComponent(raw)}`
        }
        if (parsed.pathname.startsWith('/media/')) {
          const raw = parsed.pathname.slice('/media/'.length)
          return `/media/${decodeURIComponent(raw)}`
        }
        return parsed.pathname
      } catch {
        return fallback
      }
    }
    // Handle relative /api/media/file/ path
    if (media.startsWith('/api/media/file/')) {
      const raw = media.slice('/api/media/file/'.length)
      return `/media/${decodeURIComponent(raw)}`
    }
    // Already a relative path like /media/foo.jpg
    return media || fallback
  }

  if (typeof media !== 'object') return fallback

  // Prefer the filename field (direct file reference)
  if (media.filename) {
    filename = media.filename
  } else if (media.url) {
    try {
      const parsed = new URL(media.url)
      const clean = parsed.pathname.replace(/^\/api\/media\/file\//, '').replace(/^\/media\//, '')
      filename = decodeURIComponent(clean)
    } catch {
      const clean = media.url.replace(/^\/api\/media\/file\//, '').replace(/^\/media\//, '')
      filename = decodeURIComponent(clean)
    }
  }

  if (!filename) return fallback

  return `/media/${filename}`
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
 * Fetch published Journeys from Payload CMS (REST API)
 */
export async function getJourneys() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/journeys?where[status][equals]=published&sort=-createdAt&limit=100'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
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
        alt: (doc.coverImage && typeof doc.coverImage === 'object' && doc.coverImage.alt) || doc.title || '',
        destinations: Array.isArray(doc.destinations) && doc.destinations.length > 0
          ? doc.destinations.map((d: any) => (typeof d === 'object' ? d.name || d.title : String(d)))
          : [],
        categories: Array.isArray(doc.categories) && doc.categories.length > 0
          ? doc.categories.map((c: any) => (typeof c === 'object' ? c.slug || c.title : String(c)))
          : ['cultural-heritage'],
        featured: Boolean(doc.featured),
      }))
    }
  } catch (err) {
    console.warn('Payload getJourneys error:', err)
  }

  return []
}

/**
 * Fetch a single Journey by its slug from Payload CMS (REST API)
 */
export async function getJourneyBySlug(slug: string) {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      `/api/journeys?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1`
    )

    if (data?.docs && data.docs.length > 0) {
      const doc = data.docs[0] as any

      const coverImage = getMediaUrl(doc.coverImage)
      const alt = (doc.coverImage && typeof doc.coverImage === 'object' && doc.coverImage.alt) || doc.title || ''

      const gallery = Array.isArray(doc.gallery) && doc.gallery.length > 0
        ? doc.gallery.map((g: any) => ({
            src: getMediaUrl(g.image || g),
            alt: doc.title,
          }))
        : []

      return {
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        tagline: doc.tagline || '',
        excerpt: doc.excerpt || '',
        description: extractTextFromLexical(doc.description) || (typeof doc.description === 'string' ? doc.description : ''),
        duration: {
          days: doc.duration?.days || 1,
          nights: doc.duration?.nights || 0,
        },
        destinations: Array.isArray(doc.destinations) && doc.destinations.length > 0
          ? doc.destinations.map((d: any) => (typeof d === 'object' ? d.name || d.title : String(d)))
          : [],
        categories: Array.isArray(doc.categories) && doc.categories.length > 0
          ? doc.categories.map((c: any) => (typeof c === 'object' ? c.slug || c.title : String(c)))
          : [],
        coverImage,
        alt,
        gallery,
        itinerary: Array.isArray(doc.itinerary) && doc.itinerary.length > 0
          ? doc.itinerary.map((d: any) => ({
              day: d.day,
              title: d.title,
              description: extractTextFromLexical(d.description),
              locations: d.locations || '',
              accommodation: d.accommodation || '',
              meals: d.meals || '',
            }))
          : [],
        inclusions: Array.isArray(doc.inclusions) && doc.inclusions.length > 0
          ? doc.inclusions.map((i: any) => (typeof i === 'string' ? i : i.item || ''))
          : [],
        exclusions: Array.isArray(doc.exclusions) && doc.exclusions.length > 0
          ? doc.exclusions.map((e: any) => (typeof e === 'string' ? e : e.item || ''))
          : [],
        includedSites: Array.isArray(doc.includedSites) && doc.includedSites.length > 0
          ? doc.includedSites.map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          : [],
        optionalSites: Array.isArray(doc.optionalSites) && doc.optionalSites.length > 0
          ? doc.optionalSites.map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          : [],
        accommodationDetails: doc.accommodationDetails || '',
        transportDetails: doc.transportDetails || '',
        guideDetails: doc.guideDetails || '',
        insuranceInfo: doc.insuranceInfo || '',
        visaInfo: doc.visaInfo || '',
        airTicketInfo: doc.airTicketInfo || '',
        travelInfo: extractTextFromLexical(doc.travelInfo) || '',
        pricing: {
          showPrice: true,
          priceFrom: doc.pricing?.priceFrom || 0,
          currency: doc.pricing?.currency || 'USD',
          pricingNote: doc.pricing?.pricingNote || 'per person',
        },
        faqs: Array.isArray(doc.faqs) && doc.faqs.length > 0
          ? doc.faqs.map((f: any) => ({
              question: f.question,
              answer: extractTextFromLexical(f.answer),
            }))
          : [],
        relatedSlugs: [],
        featured: Boolean(doc.featured),
        status: doc.status || 'published',
      }
    }
  } catch (err) {
    console.warn(`Payload getJourneyBySlug(${slug}) error:`, err)
  }

  return null
}

/**
 * Fetch published Journal Posts from Payload CMS (REST API)
 */
export async function getJournalPosts() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/journal-posts?where[status][equals]=published&sort=-publishedAt&limit=50'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt || '',
        content: doc.content,
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
 * Fetch a single Journal Post by Slug from Payload CMS (REST API)
 */
export async function getJournalPostBySlug(slug: string) {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      `/api/journal-posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1`
    )

    if (data?.docs && data.docs.length > 0) {
      const doc = data.docs[0]
      return {
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt || '',
        content: doc.content,
        publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString().split('T')[0] : '2025-01-01',
        date: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'Recent',
        author: doc.author || 'Anthony Holidays',
        category: Array.isArray(doc.categories) && doc.categories[0]?.category ? doc.categories[0].category : 'Heritage & Culture',
        readTime: '6 min read',
        coverImage: getMediaUrl(doc.coverImage),
        image: getMediaUrl(doc.coverImage),
      }
    }
  } catch (err) {
    console.warn(`Payload getJournalPostBySlug(${slug}) error:`, err)
  }

  return null
}

/**
 * Fetch Testimonials from Payload CMS (REST API)
 */
export async function getTestimonials() {
  const reviews = await getReviews()
  return reviews.slice(0, 10).map((r) => ({
    id: r.id,
    quote: r.reviewText,
    travellerName: r.guestName,
    travellerCountry: r.country,
    journeyTitle: r.tourName,
    rating: r.rating,
  }))
}


/**
 * Fetch Global Site Settings from Payload CMS (REST API)
 */
export async function getSiteSettings() {
  try {
    const settings = await fetchFromPayload<any>('/api/globals/site-settings')
    if (settings && settings.companyName) return settings
  } catch (err) {
    console.warn('Payload getSiteSettings error:', err)
  }

  return {
    companyName: 'Anthony Holidays',
    tagline: 'Authentic Sri Lanka, Expert-Led Journeys',
    contact: {
      email: process.env.COMPANY_EMAIL || 'anthonyholidaysdmc@gmail.com',
      phone: process.env.PUBLIC_PHONE_NUMBER || '+94 70 324 7929',
      whatsappNumber: process.env.PUBLIC_WHATSAPP_NUMBER || '94703247929',
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
 * Fetch published Special Packages from Payload CMS (REST API)
 */
export async function getSpecialPackages() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/special-packages?where[status][equals]=published&sort=-createdAt&limit=100'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
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
        alt: (doc.coverImage && typeof doc.coverImage === 'object' && doc.coverImage.alt) || doc.title || '',
        activities: Array.isArray(doc.activities) && doc.activities.length > 0 ? doc.activities : [],
        featured: Boolean(doc.featured),
      }))
    }
  } catch (err) {
    console.warn('Payload getSpecialPackages error:', err)
  }

  return []
}

/**
 * Fetch a single Special Package by slug from Payload CMS (REST API)
 */
export async function getSpecialPackageBySlug(slug: string) {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      `/api/special-packages?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1`
    )

    if (data?.docs && data.docs.length > 0) {
      const doc = data.docs[0] as any
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
        description: doc.description || '',
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
        alt: (doc.coverImage && typeof doc.coverImage === 'object' && doc.coverImage.alt) || doc.title || '',
        activities: Array.isArray(doc.activities) && doc.activities.length > 0 ? doc.activities : [],
        itinerary: Array.isArray(doc.itinerary) ? doc.itinerary : [],
        conditions: doc.conditions || '',
        inclusions: Array.isArray(doc.inclusions) && doc.inclusions.length > 0
          ? doc.inclusions.map((i: any) => (typeof i === 'string' ? i : i.item || ''))
          : [],
        exclusions: Array.isArray(doc.exclusions) && doc.exclusions.length > 0
          ? doc.exclusions.map((e: any) => (typeof e === 'string' ? e : e.item || ''))
          : [],
        featured: Boolean(doc.featured),
      }
    }
  } catch (err) {
    console.warn(`Payload getSpecialPackageBySlug(${slug}) error:`, err)
  }

  return null
}

/**
 * Fetch published Services from Payload CMS (REST API)
 */
export async function getServices() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/services?where[status][equals]=published&sort=displayOrder&limit=50'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        shortDescription: doc.shortDescription || '',
        description: doc.description || '',
        image: getMediaUrl(doc.image),
        iconName: doc.iconName || 'Compass',
        displayOrder: doc.displayOrder ?? 0,
        highlights: Array.isArray(doc.highlights) && doc.highlights.length > 0
          ? doc.highlights.map((h: any) => h.item || String(h))
          : [],
      }))
    }
  } catch (err) {
    console.warn('Payload getServices error:', err)
  }

  return []
}

/**
 * Fetch published Team Members from Payload CMS (REST API)
 */
export async function getTeamMembers() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/team-members?where[status][equals]=published&sort=displayOrder&limit=50'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        slug: doc.slug || slugify(doc.name),
        role: doc.role,
        isFounder: Boolean(doc.isFounder),
        photo: getMediaUrl(doc.photo),
        credentials: Array.isArray(doc.credentials) && doc.credentials.length > 0
          ? doc.credentials.map((c: any) => c.badge || String(c))
          : [],
        bio: extractTextFromLexical(doc.bio) || (typeof doc.bio === 'string' ? doc.bio : '') || '',
        specialties: Array.isArray(doc.specialties) && doc.specialties.length > 0
          ? doc.specialties.map((s: any) => s.area || String(s))
          : [],
        languages: Array.isArray(doc.languages) && doc.languages.length > 0
          ? doc.languages.map((l: any) => l.language || String(l))
          : [],
        displayOrder: doc.displayOrder ?? 0,
      }))
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
  const found = members.find((m) => m.slug === slug || slugify(m.name) === slug)
  return found || null
}

/**
 * Fetch Approved & Published Reviews from Payload CMS (REST API)
 */
export async function getReviews() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/testimonials?where[status][equals]=published&sort=-createdAt&limit=50'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
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
