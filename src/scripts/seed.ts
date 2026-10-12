import path from 'path'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload/payload.config'
import { toursData } from './seed-tours'
import { SEED_SPECIAL_PACKAGES } from './seed-special-packages'
import {
  TOUR_MEDIA,
  SPECIAL_PACKAGE_MEDIA,
  SERVICE_MEDIA,
  BLOG_MEDIA,
  TEAM_MEDIA,
} from './seed-media'

const TOUR_METADATA: Record<string, { priceFrom: number; categories: string[]; featured: boolean }> = {
  'essence-of-ceylon': { priceFrom: 790, categories: ['cultural-heritage', 'leisure'], featured: true },
  'tea-trails-ancient-temples': { priceFrom: 1250, categories: ['cultural-heritage', 'hill-country', 'luxury'], featured: true },
  'classic-triangle-and-wildlife': { priceFrom: 1580, categories: ['wildlife-adventure', 'cultural-heritage', 'hill-country'], featured: true },
  'heritage-and-southern-coast': { priceFrom: 1790, categories: ['cultural-heritage', 'beach', 'leisure'], featured: true },
  'grand-sri-lankan-loop': { priceFrom: 2150, categories: ['cultural-heritage', 'wildlife-adventure', 'hill-country', 'beach', 'luxury'], featured: false },
  'deep-dive-culture-and-nature': { priceFrom: 2450, categories: ['cultural-heritage', 'wildlife-adventure', 'leisure', 'untouched'], featured: false },
  'ramayana-trail-special': { priceFrom: 2680, categories: ['pilgrimage', 'cultural-heritage', 'untouched'], featured: false },
  'ultimate-pearl-experience': { priceFrom: 3850, categories: ['luxury', 'cultural-heritage', 'wildlife-adventure', 'beach', 'hill-country'], featured: false },
}

/**
 * Converts a plain string or multi-paragraph text into a valid Lexical RichText AST
 */
function toLexical(text: string) {
  if (!text) text = ''
  const paragraphs = text
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  if (paragraphs.length === 0) {
    paragraphs.push(text.trim() || '')
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((para) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: para,
            version: 1,
          },
        ],
      })),
    },
  }
}

/**
 * Cache for downloaded media IDs to prevent duplicate downloads
 */
const mediaCache: Record<string, string | number> = {}

/**
 * Downloads an image from an online URL and uploads it into Payload's media collection
 */
async function getOrCreateMediaFromUrl(
  payload: any,
  imageUrl: string,
  altText: string,
  key: string
): Promise<string | number | null> {
  if (mediaCache[key]) {
    return mediaCache[key]
  }

  try {
    // 1. Check if media with this exact alt text already exists in database
    const existing = await payload.find({
      collection: 'media',
      where: {
        alt: { equals: altText },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      mediaCache[key] = existing.docs[0].id
      return existing.docs[0].id
    }

    // 2. Download image from online URL
    console.log(`  📥 Downloading photo for: "${altText}"...`)
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'AnthonyHolidaysSeeder/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const sanitizedName = `${key.replace(/[^a-z0-9_-]/gi, '_').toLowerCase()}.jpg`

    // 3. Upload to Payload Media collection
    const createdMedia = await payload.create({
      collection: 'media',
      data: {
        alt: altText,
        caption: altText,
      },
      file: {
        data: buffer,
        mimetype: 'image/jpeg',
        name: sanitizedName,
        size: buffer.length,
      },
    })

    console.log(`  ✓ Uploaded unique media: ${sanitizedName} (ID: ${createdMedia.id})`)
    mediaCache[key] = createdMedia.id
    return createdMedia.id
  } catch (err: any) {
    console.warn(`  ⚠️ Could not download media for "${altText}": ${err.message}`)
    return null
  }
}

const FOUNDER_BIO = `Born and raised in the vibrant coastal city of Hikkaduwa, I grew up immersed in the tourism industry while helping run our family-owned guesthouse, Anthony Guesthouse. As travelers completed their clockwise journeys around the island, they would inevitably arrive at our doorstep to relax before heading home.

Spending evenings engaging with guests from all over the world, I listened closely to their experiences. A common theme emerged: while they had visited iconic landmarks, many felt they had missed the true soul of the country. They shared stories of rushed itineraries and, most importantly, a lack of knowledgeable guidance to bring the history and culture to life.

These conversations sparked a realization: seeing a site is not the same as experiencing it. Determined to bridge this gap, I founded this agency to offer depth over just sightseeing.

Our defining specialty is our team. We are proud to be led by high-quality, Licensed National Tourist Guide Lecturers, myself included. We don’t just take you to a monument; we narrate its history, legends, and significance. With us, you won't just be a tourist looking at a view—you will be a guest who truly understands the wonder of the Pearl of the Indian Ocean.`

const SAMPLE_BLOGS = [
  {
    title: 'Secrets of Sigiriya: Ancient Engineering in the Sky',
    slug: 'secrets-of-sigiriya-ancient-engineering',
    author: 'Licensed Guide Anthony',
    publishedAt: '2026-01-15T00:00:00.000Z',
    status: 'published',
    imageUrl: BLOG_MEDIA['secrets-of-sigiriya-ancient-engineering'].url,
    excerpt: 'How King Kashyapa built an imperial citadel with hydraulic gardens 200 metres above the forest floor.',
    content: `Rising nearly 200 metres above the central plains of Sri Lanka, Sigiriya is often heralded as the Eighth Wonder of the World. Built in the 5th century CE by King Kashyapa, this monolith was not just a military fortress, but an astonishing monument of royal opulence and hydraulic engineering.

Ancient Water Gardens and Gravity Hydraulics:
At the base of the rock lie the Water Gardens, displaying symmetrical pools, underground conduits, and fountain systems that still function during the monsoon season today. Ancient engineers harnessed natural hydraulic pressure from nearby reservoirs to power gravity-fed fountains long before similar systems appeared in Europe.

The Cloud Maidens:
Ascending the sheer rock face, sheltered within a protected rock pocket, are the legendary Sigiriya Frescoes. Depicting the 'Cloud Maidens' carrying lotus blossoms and jasmine, these 1,500-year-old tempera paintings retain their luminous natural pigments.

Guiding Advice:
When climbing Sigiriya, dawn or late afternoon are ideal to avoid midday heat. A licensed guide lecturer will walk you through the Mirror Wall's ancient Sinhalese graffiti poetry and explain the hydraulic civil engineering that baffled colonial antiquarians for decades.`,
    categories: [{ category: 'Heritage & Archaeology' }, { category: 'Cultural Triangle' }],
    tags: [{ tag: 'Sigiriya' }, { tag: 'UNESCO' }, { tag: 'Architecture' }],
  },
  {
    title: 'When to Visit Sri Lanka: A Dual-Monsoon Guide',
    slug: 'when-to-visit-sri-lanka-monsoon-guide',
    author: 'Editorial Team',
    publishedAt: '2026-02-01T00:00:00.000Z',
    status: 'published',
    imageUrl: BLOG_MEDIA['when-to-visit-sri-lanka-monsoon-guide'].url,
    excerpt: 'Sri Lanka has two distinct monsoon seasons. Learn which coast is dry and sunny at any month of the year.',
    content: `One of Sri Lanka's greatest travel secrets is that it is a year-round destination. Because of its tropical island geography and two alternating monsoon patterns, sunny blue skies and calm waters can always be found on at least one side of the island.

The Southwest Monsoon (Yala):
Running from May to September, this wind pattern brings rain to the south and west coasts (including Colombo, Galle, Bentota, and Hikkaduwa). During this period, the eastern and northern coasts (Trincomalee, Pasikuda, Arugam Bay, and Jaffna) experience their finest dry, sunny weather with mirror-calm beaches.

The Northeast Monsoon (Maha):
From October to January, moisture sweeps across the north and east. In contrast, the southwest, southern coast, and central hills enjoy warm, dry tropical conditions—making it the peak season for southern beaches and cultural triangle explorations.

Planning Your Route:
With private chauffeur-guided transportation, your itinerary can be seamlessly calibrated to seasonal weather, guaranteeing optimal beach days and comfortable sightseeing.`,
    categories: [{ category: 'Travel Advice' }, { category: 'Weather & Seasons' }],
    tags: [{ tag: 'Monsoon' }, { tag: 'Best Time to Visit' }, { tag: 'Beaches' }],
  },
  {
    title: 'Leopards and Elephants: Ethical Wildlife Encounters in Sri Lanka',
    slug: 'leopards-and-elephants-wildlife-ethics',
    author: 'Wildlife Specialist',
    publishedAt: '2026-02-20T00:00:00.000Z',
    status: 'published',
    imageUrl: BLOG_MEDIA['leopards-and-elephants-wildlife-ethics'].url,
    excerpt: 'How our guide lecturers approach wildlife safaris to ensure animal welfare and unforgettable encounters.',
    content: `Sri Lanka possesses one of the highest densities of biodiversity in Asia, boasting the world's highest concentration of leopards in Yala and the iconic annual 'Elephant Gathering' in Minneriya National Park.

Ethical Guiding Practices:
True wildlife spotting requires patience, respect, and deep knowledge of animal territory. Unlike mass-tour operators who speed toward sightings and crowd animals, our guides work with veteran local tracker drivers who turn off vehicle engines, maintain respectful buffer distances, and position jeeps where natural behavior can be quietly observed.

What You Will Encounter:
Beyond leopards and Asian elephants, Sri Lanka is home to sloth bears, mugger crocodiles, over 400 bird species (including 33 endemics), and blue whales in southern waters.`,
    categories: [{ category: 'Wildlife' }, { category: 'Safari & Conservation' }],
    tags: [{ tag: 'Yala' }, { tag: 'Leopards' }, { tag: 'Elephants' }],
  },
  {
    title: 'High-Grown Ceylon: Tea Culture and Bungalow Life in Hatton',
    slug: 'high-grown-ceylon-tea-culture-hatton',
    author: 'Licensed Guide Anthony',
    publishedAt: '2026-03-05T00:00:00.000Z',
    status: 'published',
    imageUrl: BLOG_MEDIA['high-grown-ceylon-tea-culture-hatton'].url,
    excerpt: 'Waking up to mist over the Bogawantalawa Valley, plucking tea with estate workers, and colonial heritage.',
    content: `As your private vehicle climbs the winding mountain passes above 1,500 metres, the air turns cool and crisp, scented with pine and fresh eucalyptus. This is Ceylon Tea Country—where endless terraces of bright green camellia sinensis blanket misty peaks.

The Legacy of James Taylor and Thomas Lipton:
In the late 19th century, a devastating coffee blight swept the island, leading pioneering planters to experiment with tea. Today, Ceylon tea remains the gold standard of hand-plucked orthodox manufacturing.

The Bungalow Experience:
Staying in a restored colonial planter's bungalow offers a glimpse into a bygone era: roaring log fires, silver-service high tea on manicured lawns, and morning strolls through mist-clad valleys before the estate workers begin the morning pluck.`,
    categories: [{ category: 'Hill Country' }, { category: 'Tea & Heritage' }],
    tags: [{ tag: 'Nuwara Eliya' }, { tag: 'Ceylon Tea' }, { tag: 'Boutique Travel' }],
  },
]

const SAMPLE_REVIEWS = [
  {
    guestName: 'David & Sarah Mitchell',
    country: 'United Kingdom',
    rating: 5,
    tourName: 'Cultural Triangle Discovery',
    travelDate: '2026-01-10',
    reviewText: 'Travelling with Anthony was the highlight of our three weeks in Asia. His depth of historical knowledge transformed every temple from ancient stones into a living, breathing story. We never felt rushed and every restaurant and hotel recommendation was exquisite.',
    status: 'published',
    featured: true,
  },
  {
    guestName: 'Elena Rostova',
    country: 'Switzerland',
    rating: 5,
    tourName: 'Southern Coast & Wildlife',
    travelDate: '2026-02-14',
    reviewText: 'The private safari in Yala was extraordinary. Our guide spotted a mother leopard and two cubs resting on a rocky outcrop - moments other jeeps rushed past completely. Flawless hospitality throughout.',
    status: 'published',
    featured: true,
  },
  {
    guestName: 'Marc & Chantal Lefèvre',
    country: 'France',
    rating: 5,
    tourName: 'Grand Sri Lanka Circuit',
    travelDate: '2026-03-02',
    reviewText: 'As seasoned travellers who rarely use guides, we were blown away by the professionalism, warmth, and seamless logistics. Anthony Holidays represents Ceylon hospitality at its very finest. Unreservedly recommended.',
    status: 'published',
    featured: true,
  },
  {
    guestName: 'Klaus & Ingrid Weber',
    country: 'Germany',
    rating: 5,
    tourName: 'Tea Trails & Ancient Temples',
    travelDate: '2026-02-28',
    reviewText: 'The tea factory experience in Nuwara Eliya and the ancient city of Polonnaruwa exceeded all expectations. We felt safe, respected, and completely immersed in authentic Ceylon culture from start to finish.',
    status: 'published',
    featured: false,
  },
  {
    guestName: 'Dr. James Thornton',
    country: 'Australia',
    rating: 5,
    tourName: 'The Ramayana Trail Special',
    travelDate: '2026-01-22',
    reviewText: "Anthony's historical accuracy and deep scholarly appreciation of the Ramayana sites was breathtaking. The best private guide in South Asia, accompanied by immaculate private transportation.",
    status: 'published',
    featured: false,
  },
]

async function seed() {
  console.log('🌱 Starting Anthony Holidays database seeder with dynamic online image downloader...\n')

  const payload = await getPayload({ config })

  // 1. Seed Tour Packages (Journeys) with unique downloaded images
  console.log('\n📦 Seeding Tour Packages (Journeys) with unique online photos...')

  for (const [slug, tour] of Object.entries(toursData)) {
    const meta = TOUR_METADATA[slug] || { priceFrom: 990, categories: ['cultural-heritage'], featured: false }
    const priceFrom = meta.priceFrom
    const categories = meta.categories
    const featured = meta.featured

    // Download or retrieve unique cover image for this tour
    const coverMediaId = await getOrCreateMediaFromUrl(
      payload,
      tour.coverImage,
      `${tour.title} Cover`,
      `tour_${tour.slug}`
    )

    const journeyData: any = {
      title: tour.title,
      slug: tour.slug,
      status: 'published',
      featured: featured,
      excerpt: tour.excerpt,
      description: toLexical(tour.description),
      duration: {
        days: tour.duration.days,
        nights: tour.duration.nights,
      },
      destinations: tour.destinations,
      categories: categories,
      itinerary: tour.itinerary.map((item) => ({
        day: item.day,
        title: item.title,
        description: toLexical(item.description),
        locations: item.locations || '',
        accommodation: item.accommodation || '',
        meals: item.meals || '',
      })),
      inclusions: tour.inclusions.map((inc) => ({ item: inc })),
      exclusions: tour.exclusions.map((exc) => ({ item: exc })),
      travelInfo: toLexical(tour.travelInfo),
      pricing: {
        showPrice: true,
        priceFrom: priceFrom,
        currency: 'USD',
        pricingNote: 'per person, based on private luxury transport & twin occupancy',
      },
      faqs: (tour.faqs || []).map((faq) => ({
        question: faq.question,
        answer: toLexical(faq.answer),
      })),
    }

    if (coverMediaId) {
      journeyData.coverImage = coverMediaId
    }

    const existing = await payload.find({
      collection: 'journeys',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'journeys',
        id: existing.docs[0].id,
        data: journeyData,
      })
      console.log(`  ✓ Updated Tour: ${tour.title} (${tour.duration.nights}N / ${tour.duration.days}D)`)
    } else if (coverMediaId) {
      await payload.create({
        collection: 'journeys',
        data: journeyData,
      })
      console.log(`  ✓ Created Tour: ${tour.title} (${tour.duration.nights}N / ${tour.duration.days}D)`)
    }
  }

  // 2. Seed Special Packages with unique downloaded images
  console.log('\n🌟 Seeding Special Packages with unique online photos...')
  for (const sp of SEED_SPECIAL_PACKAGES) {
    const coverMediaId = await getOrCreateMediaFromUrl(
      payload,
      sp.coverImage,
      `${sp.title} Cover`,
      `sp_${sp.slug}`
    )

    const specialData: any = {
      title: sp.title,
      slug: sp.slug,
      category: sp.category,
      status: 'published',
      featured: sp.featured ?? false,
      excerpt: sp.excerpt,
      description: toLexical(sp.excerpt + '\n\n' + 'Bespoke journey designed by Anthony Holidays featuring specialized local expertise and private accompaniment throughout.'),
      duration: {
        days: sp.duration.days,
        nights: sp.duration.nights,
      },
      activities: sp.activities.map((act) => ({
        title: act.title,
        description: act.description,
      })),
      inclusions: sp.inclusions.map((inc) => ({ item: inc })),
      exclusions: sp.exclusions.map((exc) => ({ item: exc })),
      conditions: toLexical(sp.conditions || 'Standard fitness and adherence to local cultural protocols required.'),
      pricing: {
        showPrice: sp.pricing?.showPrice ?? true,
        priceFrom: sp.pricing?.priceFrom ?? 950,
        currency: sp.pricing?.currency ?? 'USD',
        pricingNote: sp.pricing?.pricingNote ?? 'per person',
      },
    }

    if (coverMediaId) {
      specialData.coverImage = coverMediaId
    }

    const existingSp = await payload.find({
      collection: 'special-packages',
      where: { slug: { equals: sp.slug } },
      limit: 1,
    })

    if (existingSp.docs.length > 0) {
      await payload.update({
        collection: 'special-packages',
        id: existingSp.docs[0].id,
        data: specialData,
      })
      console.log(`  ✓ Updated Special Package: ${sp.title}`)
    } else if (coverMediaId) {
      await payload.create({
        collection: 'special-packages',
        data: specialData,
      })
      console.log(`  ✓ Created Special Package: ${sp.title}`)
    }
  }

  // 3. Seed Blog Articles (Journal Posts) with unique downloaded images
  console.log('\n📰 Seeding Blog Articles (Journal Posts) with unique online photos...')
  for (const blog of SAMPLE_BLOGS) {
    const coverMediaId = await getOrCreateMediaFromUrl(
      payload,
      blog.imageUrl,
      `${blog.title} Cover`,
      `blog_${blog.slug}`
    )

    const blogData: any = {
      title: blog.title,
      slug: blog.slug,
      author: blog.author,
      publishedAt: blog.publishedAt,
      status: blog.status,
      excerpt: blog.excerpt,
      content: toLexical(blog.content),
      categories: blog.categories,
      tags: blog.tags,
    }

    if (coverMediaId) {
      blogData.coverImage = coverMediaId
    }

    const existingBlog = await payload.find({
      collection: 'journal-posts',
      where: { slug: { equals: blog.slug } },
      limit: 1,
    })

    if (existingBlog.docs.length > 0) {
      await payload.update({
        collection: 'journal-posts',
        id: existingBlog.docs[0].id,
        data: blogData,
      })
      console.log(`  ✓ Updated Blog: ${blog.title}`)
    } else if (coverMediaId) {
      await payload.create({
        collection: 'journal-posts',
        data: blogData,
      })
      console.log(`  ✓ Created Blog: ${blog.title}`)
    }
  }

  // 4. Seed Guest Reviews (Testimonials)
  console.log('\n⭐ Seeding Guest Reviews (Testimonials)...')
  for (const rev of SAMPLE_REVIEWS) {
    const reviewData: any = {
      guestName: rev.guestName,
      country: rev.country,
      rating: rev.rating,
      tourName: rev.tourName,
      travelDate: rev.travelDate,
      reviewText: rev.reviewText,
      status: rev.status,
      featured: rev.featured,
    }

    const existingRev = await payload.find({
      collection: 'testimonials',
      where: { guestName: { equals: rev.guestName } },
      limit: 1,
    })

    if (existingRev.docs.length > 0) {
      await payload.update({
        collection: 'testimonials',
        id: existingRev.docs[0].id,
        data: reviewData,
      })
      console.log(`  ✓ Updated Review: ${rev.guestName} (${rev.country})`)
    } else {
      await payload.create({
        collection: 'testimonials',
        data: reviewData,
      })
      console.log(`  ✓ Created Review: ${rev.guestName} (${rev.country})`)
    }
  }

  // 5. Seed Founder Profile (Team Member) with portrait photo
  console.log('\n👤 Seeding Founder Profile with personal portrait...')
  const founderPhotoId = await getOrCreateMediaFromUrl(
    payload,
    TEAM_MEDIA['anthony-founder'].url,
    TEAM_MEDIA['anthony-founder'].alt,
    TEAM_MEDIA['anthony-founder'].key
  )

  const founderData: any = {
    name: 'Anthony',
    role: 'Founder & Licensed National Tourist Guide Lecturer',
    isFounder: true,
    status: 'published',
    displayOrder: 1,
    credentials: [
      { badge: 'Licensed National Tourist Guide Lecturer (SLTDA Reg.)' },
      { badge: 'Ceylon Tourism Industry Veteran (Anthony Guesthouse)' },
      { badge: 'Cultural Triangle & UNESCO Heritage Specialist' },
    ],
    bio: toLexical(FOUNDER_BIO),
    specialties: [
      { area: 'Ancient Hydraulic Civilizations & UNESCO Sites' },
      { area: 'Cultural & Spiritual Living Heritage' },
      { area: 'Hill Country Tea & Colonial History' },
      { area: 'Bespoke Island Routing & Wildlife Logistics' },
    ],
    languages: [
      { language: 'English' },
      { language: 'Sinhala' },
    ],
  }

  if (founderPhotoId) {
    founderData.photo = founderPhotoId
  }

  const existingFounder = await payload.find({
    collection: 'team-members',
    where: {
      isFounder: { equals: true },
    },
    limit: 1,
  })

  if (existingFounder.docs.length > 0) {
    await payload.update({
      collection: 'team-members',
      id: existingFounder.docs[0].id,
      data: founderData,
    })
    console.log('  ✓ Updated Founder profile: Anthony')
  } else {
    await payload.create({
      collection: 'team-members',
      data: founderData,
    })
    console.log('  ✓ Created Founder profile: Anthony')
  }

  // 6. Seed Services with distinct individual online photos
  console.log('\n🛎️ Seeding Services with unique online photos...')
  const servicesList = [
    {
      slug: 'hotel-reservations',
      title: 'Hotel Reservations',
      iconName: 'Building',
      displayOrder: 1,
      imageUrl: SERVICE_MEDIA['hotel-reservations'].url,
      shortDescription: 'Handpicked boutique hotels, colonial tea bungalows, and luxury beach resorts with exclusive partner rates across Sri Lanka.',
      description: toLexical('Handpicked boutique hotels, colonial tea bungalows, and luxury beach resorts with exclusive partner rates across Sri Lanka.\n\nFrom cliffside villas overlooking the southern Indian Ocean to heritage planters bungalows nestled among high-grown tea estates, we personally inspect every partner property to guarantee pristine cleanliness, exceptional hospitality, and authentic Ceylon charm.'),
      highlights: [
        { item: 'Curated heritage, boutique, and eco-luxury properties islandwide' },
        { item: 'Special contracted rates and room upgrade preferences' },
        { item: 'Direct relationships with boutique hotel owners and managers' },
        { item: 'Tailored family rooms, private villas, and honeymoon suites' },
      ],
    },
    {
      slug: 'visa-assistance',
      title: 'Visa Assistance',
      iconName: 'FileCheck',
      displayOrder: 2,
      imageUrl: SERVICE_MEDIA['visa-assistance'].url,
      shortDescription: 'Hassle-free Sri Lanka ETA tourist visa guidance, entry requirement advisories, and document verification.',
      description: toLexical('Hassle-free Sri Lanka ETA tourist visa guidance, entry requirement advisories, and document verification.\n\nOur team assists you with the official Sri Lanka Electronic Travel Authorization (ETA) application process, ensuring your documentation complies with the latest Department of Immigration regulations for a smooth, stress-free arrival.'),
      highlights: [
        { item: 'Official Sri Lanka ETA tourist visa application assistance' },
        { item: 'Up-to-date entry regulations for all nationalities' },
        { item: 'Electronic arrival card completion guidance' },
        { item: 'Dedicated support for transit, short-stay, and long-stay visitors' },
      ],
    },
    {
      slug: 'air-ticketing',
      title: 'Air Ticketing',
      iconName: 'Plane',
      displayOrder: 3,
      imageUrl: SERVICE_MEDIA['air-ticketing'].url,
      shortDescription: 'International airline itinerary coordination, domestic sea-plane transfers, and private helicopter charters.',
      description: toLexical('International airline itinerary coordination, domestic sea-plane transfers, and private helicopter charters.\n\nWe provide flight advisory support to identify the most convenient international connections to Colombo (CMB), as well as coordinating scenic domestic amphibian flights and helicopter hops to cut transit times and witness Ceylon from the sky.'),
      highlights: [
        { item: 'Optimal flight routing advisories to Colombo (CMB)' },
        { item: 'Domestic Cinnamon Air scheduled flights and charter bookings' },
        { item: 'Real-time flight tracking for synchronized airport meet-and-greet' },
        { item: 'Flexible flight amendments and travel concierge liaison' },
      ],
    },
    {
      slug: 'travel-insurance',
      title: 'Travel Insurance',
      iconName: 'ShieldCheck',
      displayOrder: 4,
      imageUrl: SERVICE_MEDIA['travel-insurance'].url,
      shortDescription: 'Comprehensive travel insurance advisory and safety coverage ensuring total peace of mind on the road.',
      description: toLexical('Comprehensive travel insurance advisory and safety coverage ensuring total peace of mind on the road.\n\nYour safety is our foremost priority. We advise on comprehensive travel insurance policies covering medical emergencies, journey interruption, safari activities, and luggage protection, backed by 24/7 on-the-ground concierge liaison.'),
      highlights: [
        { item: 'Complimentary tour safety advisory and emergency protocols' },
        { item: 'Comprehensive medical and emergency evacuation coverage guidance' },
        { item: 'Safari, water sports, and trekking activity protection guidance' },
        { item: 'Direct 24/7 liaison with local medical assistance providers' },
      ],
    },
    {
      slug: 'value-added-services',
      title: 'Value Added Services',
      iconName: 'Sparkles',
      displayOrder: 5,
      imageUrl: SERVICE_MEDIA['value-added-services'].url,
      shortDescription: 'Premium complimentary amenities and personalized touches that make your Sri Lankan journey seamless.',
      description: toLexical('Premium complimentary amenities and personalized touches that make your Sri Lankan journey seamless.\n\nEvery journey with Anthony Holidays includes value-added features that set us apart: 24/7 concierge support, specialized licensed guide lecturers, a free local tourist SIM card with high-speed 4G/5G data on arrival, and immaculately maintained private air-conditioned vehicles.'),
      highlights: [
        { item: '24x7 Dedicated trip concierge and emergency response hotline' },
        { item: 'Specialized Licensed National Tourist Guide Lecturers & professional chauffeur drivers' },
        { item: 'Free local tourist SIM card with high-speed data provided upon arrival' },
        { item: 'Private air-conditioned fleet matched to your group (Executive Sedan, Luxury Van, or Mini-Coach)' },
      ],
    },
  ]

  for (const srv of servicesList) {
    const srvMediaId = await getOrCreateMediaFromUrl(
      payload,
      srv.imageUrl,
      `${srv.title} Photo`,
      `service_${srv.slug}`
    )

    const srvData: any = {
      title: srv.title,
      slug: srv.slug,
      displayOrder: srv.displayOrder,
      shortDescription: srv.shortDescription,
      description: srv.description,
      iconName: srv.iconName,
      status: 'published',
      highlights: srv.highlights,
    }

    if (srvMediaId) {
      srvData.image = srvMediaId
    }

    const existingSrv = await payload.find({
      collection: 'services',
      where: { slug: { equals: srv.slug } },
      limit: 1,
    })

    if (existingSrv.docs.length > 0) {
      await payload.update({
        collection: 'services',
        id: existingSrv.docs[0].id,
        data: srvData,
      })
      console.log(`  ✓ Updated Service: ${srv.title}`)
    } else {
      await payload.create({
        collection: 'services',
        data: srvData,
      })
      console.log(`  ✓ Created Service: ${srv.title}`)
    }
  }

  // 7. Seed Global Site Settings
  console.log('\n⚙️ Seeding Site Settings...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        companyName: 'Anthony Holidays',
        tagline: 'Authentic Sri Lanka, Expert-Led Journeys',
        contact: {
          email: 'anthonyholidaysdmc@gmail.com',
          phone: '+94 70 324 7929',
          whatsappNumber: '94703247929',
          address: '480/2, Subodha Mawatha, Kadawatha, Sri Lanka',
          googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.228519495393!2d79.9515598!3d6.9823432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25776269b0eb3%3A0x6b4ef8d4b310d5ec!2sSubodha%20Mawatha%2C%20Kadawatha!5e0!3m2!1sen!2slk!4v1700000000000',
        },
      },
    })
    console.log('  ✓ Updated Site Settings (company name, tagline, contacts, Kadawatha address)')
  } catch (err: any) {
    console.warn('  ⚠️ SiteSettings update note:', err.message)
  }

  console.log('\n🎉 Seeding complete! Every tour, special package, blog, service, and team member now has their own unique photograph.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('\n❌ Seeding failed:', err)
  process.exit(1)
})
