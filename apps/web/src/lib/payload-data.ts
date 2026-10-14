import { DEFAULT_MEDIA } from './media-catalog'
import { slugify } from './utils'
import {
  FALLBACK_SPECIAL_PACKAGES,
  FALLBACK_TESTIMONIALS,
  FALLBACK_REVIEWS,
  FALLBACK_JOURNEYS,
  FALLBACK_BLOG_POSTS,
  FALLBACK_SERVICES,
  FALLBACK_TEAM_MEMBERS,
  getFallbackJourneyDetail,
} from '@/data/fallback-data'

export const PAYLOAD_API_URL =
  process.env.PAYLOAD_API_URL ||
  process.env.NEXT_PUBLIC_PAYLOAD_URL ||
  'http://localhost:3001'

/**
 * Universal helper to execute cached REST requests against Payload CMS backend.
 * Falls back silently on network timeout or connection refused.
 */
async function fetchFromPayload<T>(endpoint: string, revalidate: number = 60): Promise<T | null> {
  try {
    const url = `${PAYLOAD_API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
    const res = await fetch(url, {
      next: { revalidate },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      return null
    }

    return (await res.json()) as T
  } catch {
    return null
  }
}

/**
 * Helper to extract an image URL from Payload Media relation or fallback string
 */
export function getMediaUrl(media: any, fallback: string = DEFAULT_MEDIA.url): string {
  if (!media) return fallback
  let rawUrl = ''
  if (typeof media === 'string') rawUrl = media
  else if (typeof media === 'object' && media.url) rawUrl = media.url
  else return fallback

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }
  if (rawUrl.startsWith('/')) {
    return `${PAYLOAD_API_URL}${rawUrl}`
  }
  return rawUrl
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
      return data.docs.map((doc: any) => {
        const localJourney = FALLBACK_JOURNEYS.find((f) => f.slug === doc.slug)
        return {
          id: String(doc.id),
          slug: doc.slug,
          title: doc.title,
          tagline: doc.tagline || localJourney?.tagline || '',
          excerpt: doc.excerpt || doc.overview || localJourney?.excerpt || '',
          duration: {
            days: doc.duration?.days || localJourney?.duration.days || 1,
            nights: doc.duration?.nights || localJourney?.duration.nights || 0,
          },
          pricing: {
            priceFrom: doc.pricing?.priceFrom || localJourney?.pricing.priceFrom || 0,
            currency: doc.pricing?.currency || localJourney?.pricing.currency || 'USD',
          },
          coverImage: localJourney?.coverImage || getMediaUrl(doc.coverImage),
          alt: localJourney?.alt || doc.title,
          destinations: Array.isArray(doc.destinations) && doc.destinations.length > 0
            ? doc.destinations.map((d: any) => (typeof d === 'object' ? d.name || d.title : String(d)))
            : localJourney?.destinations || [],
          categories: Array.isArray(doc.categories) && doc.categories.length > 0
            ? doc.categories.map((c: any) => (typeof c === 'object' ? c.slug || c.title : String(c)))
            : localJourney?.categories || ['cultural-heritage'],
          featured: Boolean(doc.featured),
        }
      })
    }
  } catch (err) {
    console.warn('Payload getJourneys error:', err)
  }

  return FALLBACK_JOURNEYS
}

/**
 * Fetch Tour Media map dynamically from Payload CMS Journeys
 */
export async function getTourMediaFromDatabase(): Promise<
  Record<string, { url: string; alt: string; title: string; gallery: { src: string; alt: string }[] }>
> {
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
 * Fetch a single Journey by its slug from Payload CMS (REST API)
 */
export async function getJourneyBySlug(slug: string) {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      `/api/journeys?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1`
    )

    if (data?.docs && data.docs.length > 0) {
      const doc = data.docs[0] as any
      const fallbackDetail = getFallbackJourneyDetail(slug)
      const localJourney = FALLBACK_JOURNEYS.find((f) => f.slug === doc.slug)

      // Curated cover image (local SEO asset takes precedence over outdated DB seed)
      const coverImage = localJourney?.coverImage || fallbackDetail?.coverImage || getMediaUrl(doc.coverImage)
      const alt = localJourney?.alt || fallbackDetail?.alt || doc.title

      // Curated gallery (local authentic gallery takes precedence if available)
      const gallery = fallbackDetail?.gallery && fallbackDetail.gallery.length > 0
        ? fallbackDetail.gallery
        : Array.isArray(doc.gallery) && doc.gallery.length > 0
        ? doc.gallery.map((g: any) => ({
            src: getMediaUrl(g.image || g),
            alt: doc.title,
          }))
        : []

      return {
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        tagline: doc.tagline || fallbackDetail?.tagline || '',
        excerpt: doc.excerpt || fallbackDetail?.excerpt || '',
        description: extractTextFromLexical(doc.description) || fallbackDetail?.description || '',
        duration: {
          days: doc.duration?.days || fallbackDetail?.duration.days || 1,
          nights: doc.duration?.nights || fallbackDetail?.duration.nights || 0,
        },
        destinations: Array.isArray(doc.destinations) && doc.destinations.length > 0
          ? doc.destinations.map((d: any) => (typeof d === 'object' ? d.name || d.title : String(d)))
          : fallbackDetail?.destinations || [],
        categories: Array.isArray(doc.categories) && doc.categories.length > 0
          ? doc.categories.map((c: any) => (typeof c === 'object' ? c.slug || c.title : String(c)))
          : fallbackDetail?.categories || [],
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
          : fallbackDetail?.itinerary || [],
        inclusions: Array.isArray(doc.inclusions) && doc.inclusions.length > 0
          ? doc.inclusions.map((i: any) => (typeof i === 'string' ? i : i.item || ''))
          : fallbackDetail?.inclusions || [],
        exclusions: Array.isArray(doc.exclusions) && doc.exclusions.length > 0
          ? doc.exclusions.map((e: any) => (typeof e === 'string' ? e : e.item || ''))
          : fallbackDetail?.exclusions || [],
        includedSites: Array.isArray(doc.includedSites) && doc.includedSites.length > 0
          ? doc.includedSites.map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          : fallbackDetail?.includedSites || [],
        optionalSites: Array.isArray(doc.optionalSites) && doc.optionalSites.length > 0
          ? doc.optionalSites.map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          : fallbackDetail?.optionalSites || [],
        accommodationDetails: doc.accommodationDetails || fallbackDetail?.accommodationDetails || '',
        transportDetails: doc.transportDetails || fallbackDetail?.transportDetails || '',
        guideDetails: doc.guideDetails || fallbackDetail?.guideDetails || '',
        insuranceInfo: doc.insuranceInfo || fallbackDetail?.insuranceInfo || '',
        visaInfo: doc.visaInfo || fallbackDetail?.visaInfo || '',
        airTicketInfo: doc.airTicketInfo || fallbackDetail?.airTicketInfo || '',
        travelInfo: extractTextFromLexical(doc.travelInfo) || fallbackDetail?.travelInfo || '',
        pricing: {
          showPrice: true,
          priceFrom: doc.pricing?.priceFrom || fallbackDetail?.pricing.priceFrom || localJourney?.pricing.priceFrom || 790,
          currency: doc.pricing?.currency || localJourney?.pricing.currency || 'USD',
          pricingNote: doc.pricing?.pricingNote || 'per person',
        },
        faqs: Array.isArray(doc.faqs) && doc.faqs.length > 0
          ? doc.faqs.map((f: any) => ({
              question: f.question,
              answer: extractTextFromLexical(f.answer),
            }))
          : fallbackDetail?.faqs || [],
        relatedSlugs: fallbackDetail?.relatedSlugs || [],
        featured: Boolean(doc.featured ?? fallbackDetail?.featured),
        status: doc.status || 'published',
      }
    }
  } catch (err) {
    console.warn(`Payload getJourneyBySlug(${slug}) error:`, err)
  }

  return getFallbackJourneyDetail(slug)
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

  return FALLBACK_BLOG_POSTS
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

  const fallback = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug)
  return fallback || null
}

/**
 * Fetch Testimonials from Payload CMS (REST API)
 */
export async function getTestimonials() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/testimonials?where[status][equals]=published&limit=10'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
        id: String(doc.id),
        quote: doc.quote || doc.reviewText || '',
        travellerName: doc.guestName || '',
        travellerCountry: doc.country || '',
        journeyTitle: doc.journeyName || doc.tourName || (doc.journey && typeof doc.journey === 'object' ? doc.journey.title : '') || 'Private Sri Lanka Journey',
        rating: doc.rating || 5,
      }))
    }
  } catch (err) {
    console.warn('Payload getTestimonials error:', err)
  }

  return FALLBACK_TESTIMONIALS
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
 * Fetch published Special Packages from Payload CMS (REST API)
 */
export async function getSpecialPackages() {
  try {
    const data = await fetchFromPayload<{ docs: any[] }>(
      '/api/special-packages?where[status][equals]=published&sort=-createdAt&limit=100'
    )

    if (data?.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => {
        const localPackage = FALLBACK_SPECIAL_PACKAGES.find((f) => f.slug === doc.slug)
        return {
          id: String(doc.id),
          slug: doc.slug,
          title: doc.title,
          category: doc.category || localPackage?.category || 'other',
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
              : localPackage?.categoryLabel || 'Special Package',
          excerpt: doc.excerpt || localPackage?.excerpt || '',
          duration: {
            days: doc.duration?.days || localPackage?.duration.days || 1,
            nights: doc.duration?.nights || localPackage?.duration.nights || 0,
          },
          pricing: {
            showPrice: Boolean(doc.pricing?.showPrice),
            priceFrom: doc.pricing?.priceFrom || localPackage?.pricing.priceFrom || 0,
            currency: doc.pricing?.currency || localPackage?.pricing.currency || 'USD',
            pricingNote: doc.pricing?.pricingNote || localPackage?.pricing.pricingNote || '',
          },
          coverImage: localPackage?.coverImage || getMediaUrl(doc.coverImage),
          alt: localPackage?.alt || doc.title,
          activities: Array.isArray(doc.activities) && doc.activities.length > 0 ? doc.activities : localPackage?.activities || [],
          featured: Boolean(doc.featured),
        }
      })
    }
  } catch (err) {
    console.warn('Payload getSpecialPackages error:', err)
  }

  return FALLBACK_SPECIAL_PACKAGES
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
      const localPackage = FALLBACK_SPECIAL_PACKAGES.find((f) => f.slug === doc.slug)
      return {
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        category: doc.category || localPackage?.category || 'other',
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
            : localPackage?.categoryLabel || 'Special Package',
        excerpt: doc.excerpt || localPackage?.excerpt || '',
        description: doc.description || localPackage?.description,
        duration: {
          days: doc.duration?.days || localPackage?.duration.days || 1,
          nights: doc.duration?.nights || localPackage?.duration.nights || 0,
        },
        pricing: {
          showPrice: Boolean(doc.pricing?.showPrice),
          priceFrom: doc.pricing?.priceFrom || localPackage?.pricing.priceFrom || 0,
          currency: doc.pricing?.currency || localPackage?.pricing.currency || 'USD',
          pricingNote: doc.pricing?.pricingNote || localPackage?.pricing.pricingNote || '',
        },
        coverImage: localPackage?.coverImage || getMediaUrl(doc.coverImage),
        alt: localPackage?.alt || doc.title,
        activities: Array.isArray(doc.activities) && doc.activities.length > 0 ? doc.activities : localPackage?.activities || [],
        itinerary: Array.isArray(doc.itinerary) ? doc.itinerary : [],
        conditions: doc.conditions || localPackage?.conditions,
        inclusions: Array.isArray(doc.inclusions) && doc.inclusions.length > 0
          ? doc.inclusions.map((i: any) => (typeof i === 'string' ? i : i.item || ''))
          : localPackage?.inclusions || [],
        exclusions: Array.isArray(doc.exclusions) && doc.exclusions.length > 0
          ? doc.exclusions.map((e: any) => (typeof e === 'string' ? e : e.item || ''))
          : localPackage?.exclusions || [],
        featured: Boolean(doc.featured),
      }
    }
  } catch (err) {
    console.warn(`Payload getSpecialPackageBySlug(${slug}) error:`, err)
  }

  const fallback = FALLBACK_SPECIAL_PACKAGES.find((p) => p.slug === slug)
  if (fallback) {
    return {
      ...fallback,
      itinerary: [],
      pricing: {
        showPrice: fallback.pricing.showPrice,
        priceFrom: fallback.pricing.priceFrom,
        currency: fallback.pricing.currency,
        pricingNote: fallback.pricing.pricingNote,
      },
    }
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
      return data.docs.map((doc: any) => {
        const localService = FALLBACK_SERVICES.find((f) => f.slug === doc.slug)
        return {
          id: String(doc.id),
          slug: doc.slug,
          title: doc.title,
          shortDescription: doc.shortDescription || localService?.shortDescription || '',
          description: doc.description || localService?.description,
          image: localService?.image || getMediaUrl(doc.image),
          iconName: doc.iconName || localService?.iconName || 'Compass',
          displayOrder: doc.displayOrder ?? localService?.displayOrder ?? 0,
          highlights: Array.isArray(doc.highlights) && doc.highlights.length > 0
            ? doc.highlights.map((h: any) => h.item || String(h))
            : localService?.highlights || [],
        }
      })
    }
  } catch (err) {
    console.warn('Payload getServices error:', err)
  }

  return FALLBACK_SERVICES
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
      const items = data.docs.map((doc: any) => {
        const localMember = FALLBACK_TEAM_MEMBERS.find((f) => f.slug === (doc.slug || slugify(doc.name)))
        return {
          id: String(doc.id),
          name: doc.name,
          slug: doc.slug || slugify(doc.name),
          role: doc.role,
          isFounder: Boolean(doc.isFounder),
          photo: localMember?.photo || getMediaUrl(doc.photo),
          credentials: Array.isArray(doc.credentials) && doc.credentials.length > 0
            ? doc.credentials.map((c: any) => c.badge || String(c))
            : localMember?.credentials || [],
          bio: extractTextFromLexical(doc.bio) || (typeof doc.bio === 'string' ? doc.bio : '') || localMember?.bio || '',
          specialties: Array.isArray(doc.specialties) && doc.specialties.length > 0
            ? doc.specialties.map((s: any) => s.area || String(s))
            : localMember?.specialties || [],
          languages: Array.isArray(doc.languages) && doc.languages.length > 0
            ? doc.languages.map((l: any) => l.language || String(l))
            : localMember?.languages || [],
          displayOrder: doc.displayOrder ?? localMember?.displayOrder ?? 0,
        }
      })

      if (items.length > 1) {
        return items
      }

      // If only founder is present in CMS, merge the rest of the specialist faculty guides from fallback data
      const otherFallbackMembers = FALLBACK_TEAM_MEMBERS.filter(
        (m) => !items.some((i) => i.slug === m.slug)
      )
      return [...items, ...otherFallbackMembers]
    }
  } catch (err) {
    console.warn('Payload getTeamMembers error:', err)
  }

  return FALLBACK_TEAM_MEMBERS
}

/**
 * Fetch a single Team Member by slug
 */
export async function getTeamMemberBySlug(slug: string) {
  const members = await getTeamMembers()
  const found = members.find((m) => m.slug === slug || slugify(m.name) === slug)
  if (found) return found
  return FALLBACK_TEAM_MEMBERS.find((m) => m.slug === slug || slugify(m.name) === slug) || null
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

  return FALLBACK_REVIEWS
}
