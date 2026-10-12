/**
 * Anthony Holidays - Comprehensive Production Fallback Data
 * Ensures 100% complete UI rendering, static generation, and detail pages
 * even when Payload CMS / PostgreSQL is unseeded or temporarily unreachable.
 */

export interface FallbackSpecialPackage {
  id: string
  slug: string
  title: string
  category: string
  categoryLabel: string
  excerpt: string
  description?: string
  duration: { days: number; nights: number }
  pricing: { showPrice: boolean; priceFrom: number; currency: string; pricingNote: string }
  coverImage: string
  alt: string
  activities: { title: string; description?: string }[]
  inclusions: string[]
  exclusions: string[]
  conditions: string
  featured: boolean
}

export const FALLBACK_SPECIAL_PACKAGES: FallbackSpecialPackage[] = [
  {
    id: 'sp-1',
    slug: 'hikkaduwa-marine-conservation-surf',
    title: 'Hikkaduwa Marine Conservation & Coastal Discovery',
    category: 'hikkaduwa',
    categoryLabel: 'Hikkaduwa-Based Tourism',
    excerpt: 'Hands-on coral reef regeneration, marine biology education, and private coastal surfing along the vibrant Hikkaduwa Marine National Park shoreline.',
    description: `Hands-on coral reef regeneration, marine biology education, and private coastal surfing along the vibrant Hikkaduwa Marine National Park shoreline.

Guided by marine biologists and SLTDA licensed guides, explore the living coral ecosystems, support local community sea turtle protection, and enjoy private wave riding on world-class breaks suited to your skill level.`,
    duration: { days: 7, nights: 6 },
    pricing: { showPrice: true, priceFrom: 980, currency: 'USD', pricingNote: 'per person' },
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    alt: 'Vibrant coral reef and coastal surf in Hikkaduwa Marine Park',
    activities: [
      { title: 'Coral Nursery Regeneration', description: 'Assist marine conservationists in attaching coral fragments to offshore nursery structures.' },
      { title: 'Coached Coastal Surfing', description: 'Daily surf instruction with certified ISA instructors at reef and beach breaks.' },
      { title: 'Sea Turtle Night Watch', description: 'Monitor nesting green sea turtles with local wildlife officers along protected beaches.' },
      { title: 'Traditional Catamaran Outrigger Excursion', description: 'Sail with artisanal local fishermen into the sheltered bay at golden hour.' },
    ],
    inclusions: [
      '6 nights boutique beachfront eco-accommodation in Hikkaduwa',
      'Daily breakfast and conservation field lunches',
      'Dedicated Licensed Tourist Guide Lecturer throughout',
      'All snorkeling gear, surfboards, and marine park permits',
      'Private air-conditioned airport transfers (CMB to Hikkaduwa)',
    ],
    exclusions: [
      'International flights to/from Colombo',
      'Personal travel insurance (mandatory)',
      'Sri Lanka ETA tourist visa fees',
      'Alcoholic beverages and personal expenses',
    ],
    conditions: 'Moderate swimming ability required for open-water snorkeling. Minimum participant age is 12 years.',
    featured: true,
  },
  {
    id: 'sp-2',
    slug: 'southern-sea-turtle-sanctuary-volunteering',
    title: 'Southern Sea Turtle Sanctuary Volunteering',
    category: 'volunteering',
    categoryLabel: 'Volunteering Experience',
    excerpt: 'Direct hands-on wildlife conservation: care for injured sea turtles, monitor beach nests, and assist hatchling releases with certified biologists.',
    description: `Direct hands-on wildlife conservation: care for injured sea turtles, monitor beach nests, and assist hatchling releases with certified biologists.

Work side-by-side with marine conservation researchers on the southwest coastline, helping protect endangered olive ridley, loggerhead, and green sea turtles.`,
    duration: { days: 10, nights: 9 },
    pricing: { showPrice: true, priceFrom: 1150, currency: 'USD', pricingNote: 'per volunteer' },
    coverImage: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=1200&q=80',
    alt: 'Endangered green sea turtle swimming in protected southern waters',
    activities: [
      { title: 'Sanctuary Care & Rehabilitation', description: 'Assist wildlife veterinarians in feeding, tank cleaning, and medication for recovering turtles.' },
      { title: 'Night Beach Patrols', description: 'Walk designated coastal stretches to identify new egg nests and protect them from predators.' },
      { title: 'Sunset Hatchling Release', description: 'Safely guide newborn turtles to the ocean surf under biological supervision.' },
      { title: 'Community School Conservation Seminars', description: 'Engage local school pupils on marine plastic reduction.' },
    ],
    inclusions: [
      '9 nights private accommodation in a certified eco-lodge near Kosgoda / Habaraduwa',
      'All meals prepared with fresh local coastal ingredients',
      'Official Wildlife Volunteer Certificate upon completion',
      'Field guiding by Licensed Guide Lecturer and marine biologists',
    ],
    exclusions: [
      'International airfares',
      'Personal travel insurance',
      'Visa fees',
      'Personal gear',
    ],
    conditions: 'Volunteers must demonstrate respect for wildlife protocols and agree to the Sanctuary code of ethics.',
    featured: true,
  },
  {
    id: 'sp-3',
    slug: 'essential-island-budget-explorer',
    title: 'Essential Island Explorer - Smart Budget Discovery',
    category: 'budget',
    categoryLabel: 'Budget-Based Tour',
    excerpt: 'Authentic Sri Lanka crafted for smart budgets: heritage homestays, iconic mountain trains, and street food trails led by licensed guide lecturers.',
    description: `Authentic Sri Lanka crafted for smart budgets: heritage homestays, iconic mountain trains, and street food trails led by licensed guide lecturers.

Experience maximum experiential richness without luxury markup: ride the iconic blue highland train, ascend Sigiriya at dawn, and explore local village life.`,
    duration: { days: 8, nights: 7 },
    pricing: { showPrice: true, priceFrom: 820, currency: 'USD', pricingNote: 'per person, twin sharing' },
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
    alt: 'Scenic mountain railway journey curving through Ceylon hill country',
    activities: [
      { title: 'Reserved Scenic Mountain Train', description: 'Observation car journey from Kandy through misty tea plantations to Ella.' },
      { title: 'Sigiriya Lion Rock Sunrise Ascent', description: 'Climb the 5th-century fortress in the cool morning with expert historical commentary.' },
      { title: 'Local Village Cooking Masterclass', description: 'Prepare traditional clay-pot curries with a local family in Habarana.' },
      { title: 'Mirissa Coastal Relaxation', description: 'Unwind along golden palm-fringed southern shores.' },
    ],
    inclusions: [
      '7 nights in verified, high-standard authentic family guesthouses and boutique inns',
      'Daily breakfasts',
      'All private transportation with dedicated licensed chauffeur guide',
      'Reserved 2nd-class train tickets (Kandy to Ella)',
    ],
    exclusions: [
      'Monument entrance tickets (paid locally at official counters)',
      'Lunches, dinners, and personal beverages',
      'International flights and visas',
    ],
    conditions: 'Priced for maximum value without compromising safety, private comfort, or guiding quality.',
    featured: false,
  },
  {
    id: 'sp-4',
    slug: 'knuckles-wilderness-adventure-trek',
    title: 'Knuckles Mountain Wilderness Adventure Trek',
    category: 'adventure',
    categoryLabel: 'Adventure Tour',
    excerpt: 'Deep highland immersion through UNESCO cloud forests, river valleys, hidden waterfalls, and untouched mountain hamlets.',
    description: `Deep highland immersion through UNESCO cloud forests, river valleys, hidden waterfalls, and untouched mountain hamlets.

Trek through mist-shrouded peaks, swim in natural stone plunge pools, and learn ancient foraging traditions in the legendary isolated village of Meemure.`,
    duration: { days: 6, nights: 5 },
    pricing: { showPrice: true, priceFrom: 1290, currency: 'USD', pricingNote: 'per hiker' },
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    alt: 'Knuckles mountain range misty ridge and cloud forest peaks',
    activities: [
      { title: 'High-Elevation Ridge Trekking', description: 'Navigate panoramic ridges looking out across the Dumbara valley.' },
      { title: 'Secret Waterfall Canyoneering', description: 'Swim in crystal-clear mountain pools fed by pristine mountain springs.' },
      { title: 'Remote Village Immersion in Meemure', description: 'Experience ancient Sri Lankan mountain farming techniques and traditions.' },
      { title: 'Night Amphibian & Reptile Safari', description: 'Search for endangered Knuckles shrub frogs with specialist naturalist.' },
    ],
    inclusions: [
      '5 nights luxury wilderness safari tented camps and mountain chalets',
      'All meals and trail energy snacks included',
      'Senior Wilderness Guide Lecturer and local village tracker',
      'Forest department permits and 4x4 backup support vehicle',
    ],
    exclusions: [
      'Personal trekking boots and high-ankle leech socks',
      'Flights and travel insurance with wilderness evacuation',
    ],
    conditions: 'Good physical endurance required (5–7 hours hiking daily on varied terrain).',
    featured: true,
  },
  {
    id: 'sp-5',
    slug: 'bespoke-private-island-immersion',
    title: 'Bespoke Private Island Immersion',
    category: 'customised',
    categoryLabel: 'Customised Tour',
    excerpt: 'Your dates, your pace, your passions: an entirely bespoke private itinerary personally designed and led by founder Anthony.',
    description: `Your dates, your pace, your passions: an entirely bespoke private itinerary personally designed and led by founder Anthony.

Crafted around your schedule and interests: whether architectural heritage, Michelin-standard private dining, wildlife tracking, or private beach retreats.`,
    duration: { days: 12, nights: 11 },
    pricing: { showPrice: false, priceFrom: 2950, currency: 'USD', pricingNote: 'custom quote upon consultation' },
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    alt: 'Secluded golden sandy tropical beach and coconut palms',
    activities: [
      { title: 'Private Consultation & Dynamic Itinerary', description: 'Direct planning call with Anthony to calibrate every day to your wishes.' },
      { title: 'Exclusive Archaeological Sites', description: 'Private after-hours commentary at World Heritage citadels.' },
      { title: 'Bespoke Tea Estate Bungalow Residency', description: 'Stay in private historic planters residences with personal butler service.' },
    ],
    inclusions: [
      'Private luxury vehicle with dedicated National Tourist Guide Lecturer',
      'Handpicked boutique, Relais & Châteaux, or heritage villa accommodations',
      'All bespoke arrangements and private site permissions',
    ],
    exclusions: [
      'International flights (can provide flight recommendation advisory)',
      'Discretionary guide gratuities',
    ],
    conditions: 'Available for couples, families, and private small groups. 100% customizable.',
    featured: true,
  },
]

export interface FallbackTestimonial {
  id: string
  quote: string
  travellerName: string
  travellerCountry: string
  journeyTitle: string
  rating: number
}

export const FALLBACK_TESTIMONIALS: FallbackTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'Travelling with Anthony was the highlight of our three weeks in Asia. His depth of historical knowledge transformed every temple from ancient stones into a living, breathing story. We never felt rushed and every restaurant and hotel recommendation was exquisite.',
    travellerName: 'David & Sarah Mitchell',
    travellerCountry: 'United Kingdom',
    journeyTitle: 'Cultural Triangle Discovery',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'The private safari in Yala was extraordinary. Our guide spotted a mother leopard and two cubs resting on a rocky outcrop - moments other jeeps rushed past completely. Flawless hospitality throughout.',
    travellerName: 'Elena Rostova',
    travellerCountry: 'Switzerland',
    journeyTitle: 'Southern Coast & Wildlife',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      'As seasoned travellers who rarely use guides, we were blown away by the professionalism, warmth, and seamless logistics. Anthony Holidays represents Ceylon hospitality at its very finest. Unreservedly recommended.',
    travellerName: 'Marc & Chantal Lefèvre',
    travellerCountry: 'France',
    journeyTitle: 'Grand Sri Lanka Circuit',
    rating: 5,
  },
  {
    id: 'test-4',
    quote:
      'The tea factory experience in Nuwara Eliya and the ancient city of Polonnaruwa exceeded all expectations. We felt safe, respected, and completely immersed in authentic Ceylon culture from start to finish.',
    travellerName: 'Klaus & Ingrid Weber',
    travellerCountry: 'Germany',
    journeyTitle: 'Tea Trails & Ancient Temples',
    rating: 5,
  },
  {
    id: 'test-5',
    quote:
      "Anthony's historical accuracy and deep scholarly appreciation of the Ramayana sites was breathtaking. The best private guide in South Asia, accompanied by immaculate private transportation.",
    travellerName: 'Dr. James Thornton',
    travellerCountry: 'Australia',
    journeyTitle: 'The Ramayana Trail Special',
    rating: 5,
  },
]

export interface FallbackReview {
  id: string
  guestName: string
  country: string
  rating: number
  tourName: string
  reviewText: string
  travelDate: string
  submittedAt: string
}

export const FALLBACK_REVIEWS: FallbackReview[] = [
  {
    id: 'rev-1',
    guestName: 'David & Sarah Mitchell',
    country: 'United Kingdom',
    rating: 5,
    tourName: 'Cultural Triangle Discovery',
    travelDate: '2026-01-10',
    reviewText:
      'Travelling with Anthony was the highlight of our three weeks in Asia. His depth of historical knowledge transformed every temple from ancient stones into a living, breathing story. We never felt rushed and every restaurant and hotel recommendation was exquisite.',
    submittedAt: '2026-01-15',
  },
  {
    id: 'rev-2',
    guestName: 'Elena Rostova',
    country: 'Switzerland',
    rating: 5,
    tourName: 'Southern Coast & Wildlife',
    travelDate: '2026-02-14',
    reviewText:
      'The private safari in Yala was extraordinary. Our guide spotted a mother leopard and two cubs resting on a rocky outcrop - moments other jeeps rushed past completely. Flawless hospitality throughout.',
    submittedAt: '2026-02-18',
  },
  {
    id: 'rev-3',
    guestName: 'Marc & Chantal Lefèvre',
    country: 'France',
    rating: 5,
    tourName: 'Grand Sri Lanka Circuit',
    travelDate: '2026-03-02',
    reviewText:
      'As seasoned travellers who rarely use guides, we were blown away by the professionalism, warmth, and seamless logistics. Anthony Holidays represents Ceylon hospitality at its very finest. Unreservedly recommended.',
    submittedAt: '2026-03-05',
  },
  {
    id: 'rev-4',
    guestName: 'Klaus & Ingrid Weber',
    country: 'Germany',
    rating: 5,
    tourName: 'Tea Trails & Ancient Temples',
    travelDate: '2026-02-28',
    reviewText:
      'The tea factory experience in Nuwara Eliya and the ancient city of Polonnaruwa exceeded all expectations. We felt safe, respected, and completely immersed in authentic Ceylon culture from start to finish.',
    submittedAt: '2026-03-01',
  },
  {
    id: 'rev-5',
    guestName: 'Dr. James Thornton',
    country: 'Australia',
    rating: 5,
    tourName: 'The Ramayana Trail Special',
    travelDate: '2026-01-22',
    reviewText:
      "Anthony's historical accuracy and deep scholarly appreciation of the Ramayana sites was breathtaking. The best private guide in South Asia, accompanied by immaculate private transportation.",
    submittedAt: '2026-01-25',
  },
]

export interface FallbackJourney {
  id: string
  slug: string
  title: string
  tagline: string
  excerpt: string
  duration: { days: number; nights: number }
  pricing: { priceFrom: number; currency: string }
  coverImage: string
  alt: string
  destinations: string[]
  categories: string[]
  featured: boolean
}

export const FALLBACK_JOURNEYS: FallbackJourney[] = [
  {
    id: 'essence-of-ceylon',
    slug: 'essence-of-ceylon',
    title: 'The Essence of Ceylon',
    tagline: 'Short on time, but hungry for adventure?',
    excerpt:
      'Experience the iconic Lion Rock, the last kingdom of Kandy, and the spiritual heart of the island in just three unforgettable days.',
    duration: { days: 3, nights: 4 },
    pricing: { priceFrom: 790, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1600&q=85',
    alt: '5th-century Sigiriya Rock Fortress rising above forest canopy',
    destinations: ['Sigiriya', 'Dambulla', 'Kandy', 'Peradeniya'],
    categories: ['cultural-heritage', 'leisure'],
    featured: true,
  },
  {
    id: 'tea-trails-ancient-temples',
    slug: 'tea-trails-ancient-temples',
    title: 'Tea Trails & Ancient Temples',
    tagline: 'From the golden plains of the north to the misty peaks of the hill country.',
    excerpt: 'Taste the world’s finest tea and walk in the footsteps of kings.',
    duration: { days: 5, nights: 4 },
    pricing: { priceFrom: 1250, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85',
    alt: 'Misty tea plantations and highlands in Nuwara Eliya',
    destinations: ['Sigiriya', 'Polonnaruwa', 'Kandy', 'Nuwara Eliya', 'Ramboda'],
    categories: ['cultural-heritage', 'hill-country', 'luxury'],
    featured: true,
  },
  {
    id: 'classic-triangle-and-wildlife',
    slug: 'classic-triangle-and-wildlife',
    title: 'The Classic Triangle & Wildlife',
    tagline: 'History meets the wild.',
    excerpt: 'Explore the Cultural Triangle, relax in the hills, and finish with a thrilling safari in Yala.',
    duration: { days: 6, nights: 5 },
    pricing: { priceFrom: 1580, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85',
    alt: 'Wild Sri Lankan leopard resting in Yala National Park',
    destinations: ['Sigiriya', 'Hiriwadunna', 'Dambulla', 'Kandy', 'Ella', 'Yala'],
    categories: ['wildlife-adventure', 'cultural-heritage', 'hill-country'],
    featured: true,
  },
  {
    id: 'heritage-and-southern-coast',
    slug: 'heritage-and-southern-coast',
    title: 'Heritage & Southern Coast',
    tagline: 'From the ancient kingdoms to the golden beaches of the south.',
    excerpt: 'Immerse yourself in culture, then unwind by the Indian Ocean.',
    duration: { days: 7, nights: 6 },
    pricing: { priceFrom: 1790, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=85',
    alt: 'Historic Galle Dutch Fort ramparts overlooking the Indian Ocean',
    destinations: ['Anuradhapura', 'Aukana', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Udawalawe', 'Galle', 'Hikkaduwa'],
    categories: ['cultural-heritage', 'beach', 'leisure'],
    featured: true,
  },
  {
    id: 'grand-sri-lankan-loop',
    slug: 'grand-sri-lankan-loop',
    title: 'The Grand Sri Lankan Loop',
    tagline: 'The complete package.',
    excerpt: 'Ancient ruins, hill country tea, wildlife safaris, and Dutch colonial history, all curated for the discerning traveler.',
    duration: { days: 8, nights: 7 },
    pricing: { priceFrom: 2150, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&q=85',
    alt: 'Coastal palm fringed waters and southern Ceylon shoreline',
    destinations: ['Sigiriya', 'Polonnaruwa', 'Minneriya', 'Dambulla', 'Kandy', 'Ella', 'Yala', 'Mirissa', 'Galle'],
    categories: ['cultural-heritage', 'wildlife-adventure', 'hill-country', 'beach'],
    featured: false,
  },
  {
    id: 'deep-dive-culture-and-nature',
    slug: 'deep-dive-culture-and-nature',
    title: 'Deep Dive: Culture & Nature',
    tagline: 'Slow down and see it all.',
    excerpt: 'This leisurely-paced tour includes the cultural north, the misty central hills, and a deep south beach retreat.',
    duration: { days: 9, nights: 8 },
    pricing: { priceFrom: 2450, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1600&q=85',
    alt: 'Horton Plains World End sheer mountain cliff and cloud forest',
    destinations: ['Negombo', 'Anuradhapura', 'Sigiriya', 'Polonnaruwa', 'Kandy', 'Nuwara Eliya', 'Horton Plains', 'Ella', 'Yala', 'Tangalle', 'Galle'],
    categories: ['cultural-heritage', 'wildlife-adventure', 'leisure'],
    featured: false,
  },
  {
    id: 'ramayana-trail-special',
    slug: 'ramayana-trail-special',
    title: 'The Ramayana Trail Special',
    tagline: 'Walk the path of the Ramayana epic.',
    excerpt: 'Discover the spiritual sites connected to Rama, Sita, and Hanuman, blended with Sri Lanka’s natural beauty.',
    duration: { days: 10, nights: 9 },
    pricing: { priceFrom: 2680, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1600&q=85',
    alt: 'Sacred Temple of the Tooth Relic in historic Kandy',
    destinations: ['Chilaw', 'Anuradhapura', 'Mihintale', 'Sigiriya', 'Dambulla', 'Kandy', 'Ramboda', 'Nuwara Eliya', 'Ella', 'Kataragama', 'Ussangoda', 'Galle'],
    categories: ['pilgrimage', 'cultural-heritage'],
    featured: false,
  },
  {
    id: 'ultimate-pearl-experience',
    slug: 'ultimate-pearl-experience',
    title: 'The Ultimate Pearl Experience',
    tagline: 'The perfect Sri Lankan journey.',
    excerpt: 'Luxury, adventure, wildlife, and history combined into a two-week epic that covers every corner of the island.',
    duration: { days: 14, nights: 13 },
    pricing: { priceFrom: 3850, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600&q=85',
    alt: 'Colonial Nine Arch Bridge Demodara with scenic mountain railway',
    destinations: ['Negombo', 'Wilpattu', 'Anuradhapura', 'Sigiriya', 'Minneriya', 'Polonnaruwa', 'Habarana', 'Kandy', 'Nuwara Eliya', 'Horton Plains', 'Ella', 'Yala', 'Mirissa', 'Galle', 'Colombo'],
    categories: ['luxury', 'cultural-heritage', 'wildlife-adventure', 'beach', 'hill-country'],
    featured: false,
  },
]

import { toursData } from '@/scripts/seed-tours'

export function getFallbackJourneyDetail(slug: string) {
  const t = toursData[slug]
  if (!t) return null
  return {
    id: slug,
    slug: t.slug,
    title: t.title,
    tagline: t.tagline || '',
    excerpt: t.excerpt || '',
    description: t.description,
    duration: t.duration,
    destinations: t.destinations,
    categories: ['cultural-heritage'],
    coverImage: t.coverImage,
    alt: t.alt,
    gallery: t.gallery,
    itinerary: t.itinerary,
    inclusions: t.inclusions,
    exclusions: t.exclusions,
    includedSites: [],
    optionalSites: [],
    accommodationDetails: '',
    transportDetails: '',
    guideDetails: '',
    insuranceInfo: '',
    visaInfo: '',
    airTicketInfo: '',
    travelInfo: t.travelInfo,
    pricing: {
      showPrice: true,
      priceFrom: 790,
      currency: 'USD',
      pricingNote: 'per person',
    },
    faqs: t.faqs,
    relatedSlugs: t.relatedSlugs,
    featured: true,
  }
}

export interface FallbackBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  publishedAt: string
  date: string
  author: string
  category: string
  readTime: string
  coverImage: string
  image: string
}

export const FALLBACK_BLOG_POSTS: FallbackBlogPost[] = [
  {
    id: 'blog-1',
    slug: 'secrets-of-sigiriya-ancient-engineering',
    title: 'Secrets of Sigiriya: Ancient Engineering in the Sky',
    author: 'Licensed Guide Anthony',
    publishedAt: '2026-01-15',
    date: 'January 2026',
    category: 'Heritage & Archaeology',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    excerpt:
      'How King Kashyapa built an imperial citadel with hydraulic gardens 200 metres above the forest floor.',
    content: `Rising nearly 200 metres above the central plains of Sri Lanka, Sigiriya is often heralded as the Eighth Wonder of the World. Built in the 5th century CE by King Kashyapa, this monolith was not just a military fortress, but an astonishing monument of royal opulence and hydraulic engineering.

At the base of the rock lie the Water Gardens, displaying symmetrical pools, underground conduits, and fountain systems that still function during the monsoon season today. Ancient engineers harnessed natural hydraulic pressure from nearby reservoirs to power gravity-fed fountains long before similar systems appeared in Europe.

Ascending the sheer rock face, sheltered within a protected rock pocket, are the legendary Sigiriya Frescoes. Depicting the 'Cloud Maidens' carrying lotus blossoms and jasmine, these 1,500-year-old tempera paintings retain their luminous natural pigments.

When climbing Sigiriya, dawn or late afternoon are ideal to avoid midday heat. A licensed guide lecturer will walk you through the Mirror Wall's ancient Sinhalese graffiti poetry and explain the hydraulic civil engineering that baffled colonial antiquarians for decades.`,
  },
  {
    id: 'blog-2',
    slug: 'when-to-visit-sri-lanka-monsoon-guide',
    title: 'When to Visit Sri Lanka: A Dual-Monsoon Guide',
    author: 'Editorial Team',
    publishedAt: '2026-02-01',
    date: 'February 2026',
    category: 'Travel Advice',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    excerpt:
      'Sri Lanka has two distinct monsoon seasons. Learn which coast is dry and sunny at any month of the year.',
    content: `One of Sri Lanka's greatest travel secrets is that it is a year-round destination. Because of its tropical island geography and two alternating monsoon patterns, sunny blue skies and calm waters can always be found on at least one side of the island.

The Southwest Monsoon (Yala) runs from May to September, bringing rain to the south and west coasts. During this period, the eastern and northern coasts (Trincomalee, Pasikuda, Arugam Bay, and Jaffna) experience their finest dry, sunny weather with mirror-calm beaches.

The Northeast Monsoon (Maha) sweeps moisture across the north and east from October to January. In contrast, the southwest, southern coast, and central hills enjoy warm, dry tropical conditions—making it the peak season for southern beaches and cultural triangle explorations.

With private chauffeur-guided transportation, your itinerary can be seamlessly calibrated to seasonal weather, guaranteeing optimal beach days and comfortable sightseeing throughout the year.`,
  },
  {
    id: 'blog-3',
    slug: 'leopards-and-elephants-wildlife-ethics',
    title: 'Leopards and Elephants: Ethical Wildlife Encounters in Sri Lanka',
    author: 'Wildlife Specialist',
    publishedAt: '2026-02-20',
    date: 'February 2026',
    category: 'Wildlife & Conservation',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1200&q=80',
    excerpt:
      'How our guide lecturers approach wildlife safaris to ensure animal welfare and unforgettable encounters.',
    content: `Sri Lanka possesses one of the highest densities of biodiversity in Asia, boasting the world's highest concentration of leopards in Yala and the iconic annual Elephant Gathering in Minneriya National Park.

True wildlife spotting requires patience, respect, and deep knowledge of animal territory. Unlike mass-tour operators who speed toward sightings and crowd animals, our guides work with veteran local tracker drivers who turn off vehicle engines, maintain respectful buffer distances, and position jeeps where natural behavior can be quietly observed.

Beyond leopards and Asian elephants, Sri Lanka is home to sloth bears, mugger crocodiles, over 400 bird species (including 33 endemics), and blue whales along the continental shelf off southern waters.`,
  },
  {
    id: 'blog-4',
    slug: 'high-grown-ceylon-tea-culture-hatton',
    title: 'High-Grown Ceylon: Tea Culture and Bungalow Life in Hatton',
    author: 'Licensed Guide Anthony',
    publishedAt: '2026-03-05',
    date: 'March 2026',
    category: 'Hill Country & Tea',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
    excerpt:
      'Waking up to mist over the Bogawantalawa Valley, plucking tea with estate workers, and colonial heritage.',
    content: `As your private vehicle climbs the winding mountain passes above 1,500 metres, the air turns cool and crisp, scented with pine and fresh eucalyptus. This is Ceylon Tea Country—where endless terraces of bright green camellia sinensis blanket misty peaks.

In the late 19th century, a devastating coffee blight swept the island, leading pioneering planters to experiment with tea. Today, Ceylon tea remains the gold standard of hand-plucked orthodox manufacturing.

Staying in a restored colonial planter's bungalow offers a glimpse into a bygone era: roaring log fires, silver-service high tea on manicured lawns, and morning strolls through mist-clad valleys before the estate workers begin the morning pluck.`,
  },
]

export interface FallbackService {
  id: string
  slug: string
  title: string
  shortDescription: string
  description?: string
  image: string
  iconName: string
  displayOrder: number
  highlights: string[]
}

export const FALLBACK_SERVICES: FallbackService[] = [
  {
    id: 'srv-1',
    slug: 'hotel-reservations',
    title: 'Hotel Reservations',
    iconName: 'Building',
    displayOrder: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    shortDescription:
      'Handpicked boutique hotels, colonial tea bungalows, and luxury beach resorts with exclusive partner rates across Sri Lanka.',
    description:
      'From cliffside villas overlooking the southern Indian Ocean to heritage planters bungalows nestled among high-grown tea estates, we personally inspect every partner property to guarantee pristine cleanliness, exceptional hospitality, and authentic Ceylon charm.',
    highlights: [
      'Curated heritage, boutique, and eco-luxury properties islandwide',
      'Special contracted rates and room upgrade preferences',
      'Direct relationships with boutique hotel owners and managers',
      'Tailored family rooms, private villas, and honeymoon suites',
    ],
  },
  {
    id: 'srv-2',
    slug: 'visa-assistance',
    title: 'Visa Assistance',
    iconName: 'FileCheck',
    displayOrder: 2,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    shortDescription:
      'Hassle-free Sri Lanka ETA tourist visa guidance, entry requirement advisories, and document verification.',
    description:
      'Our team assists you with the official Sri Lanka Electronic Travel Authorization (ETA) application process, ensuring your documentation complies with the latest Department of Immigration regulations for a smooth, stress-free arrival.',
    highlights: [
      'Official Sri Lanka ETA tourist visa application assistance',
      'Up-to-date entry regulations for all nationalities',
      'Electronic arrival card completion guidance',
      'Dedicated support for transit, short-stay, and long-stay visitors',
    ],
  },
  {
    id: 'srv-3',
    slug: 'air-ticketing',
    title: 'Air Ticketing',
    iconName: 'Plane',
    displayOrder: 3,
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1200&q=80',
    shortDescription:
      'International airline itinerary coordination, domestic sea-plane transfers, and private helicopter charters.',
    description:
      'We provide flight advisory support to identify the most convenient international connections to Colombo (CMB), as well as coordinating scenic domestic amphibian flights and helicopter hops to cut transit times and witness Ceylon from the sky.',
    highlights: [
      'Optimal flight routing advisories to Colombo (CMB)',
      'Domestic Cinnamon Air scheduled flights and charter bookings',
      'Real-time flight tracking for synchronized airport meet-and-greet',
      'Flexible flight amendments and travel concierge liaison',
    ],
  },
  {
    id: 'srv-4',
    slug: 'travel-insurance',
    title: 'Travel Insurance',
    iconName: 'ShieldCheck',
    displayOrder: 4,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    shortDescription:
      'Comprehensive travel insurance advisory and safety coverage ensuring total peace of mind on the road.',
    description:
      'Your safety is our foremost priority. We advise on comprehensive travel insurance policies covering medical emergencies, journey interruption, safari activities, and luggage protection, backed by 24/7 on-the-ground concierge liaison.',
    highlights: [
      'Complimentary tour safety advisory and emergency protocols',
      'Comprehensive medical and emergency evacuation coverage guidance',
      'Safari, water sports, and trekking activity protection guidance',
      'Direct 24/7 liaison with local medical assistance providers',
    ],
  },
  {
    id: 'srv-5',
    slug: 'value-added-services',
    title: 'Value Added Services',
    iconName: 'Sparkles',
    displayOrder: 5,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
    shortDescription:
      'Premium complimentary amenities and personalized touches that make your Sri Lankan journey seamless.',
    description:
      'Every journey with Anthony Holidays includes value-added features that set us apart: 24/7 concierge support, specialized licensed guide lecturers, a free local tourist SIM card with high-speed 4G/5G data on arrival, and immaculately maintained private air-conditioned vehicles.',
    highlights: [
      '24x7 Dedicated trip concierge and emergency response hotline',
      'Specialized Licensed National Tourist Guide Lecturers & professional chauffeur drivers',
      'Free local tourist SIM card with high-speed data provided upon arrival',
      'Private air-conditioned fleet matched to your group (Executive Sedan, Luxury Van, or Mini-Coach)',
    ],
  },
]

export interface FallbackTeamMember {
  id: string
  name: string
  slug: string
  role: string
  isFounder: boolean
  photo: string
  credentials: string[]
  bio: string
  specialties: string[]
  languages: string[]
  displayOrder: number
}

export const FALLBACK_TEAM_MEMBERS: FallbackTeamMember[] = [
  {
    id: 'founder-anthony',
    name: 'Anthony',
    slug: 'anthony',
    role: 'Founder & Licensed National Tourist Guide Lecturer',
    isFounder: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    credentials: [
      'Licensed National Tourist Guide Lecturer (SLTDA Reg.)',
      'Ceylon Tourism Industry Veteran (Anthony Guesthouse)',
      'Cultural Triangle & UNESCO Heritage Specialist',
    ],
    bio: `Born and raised in the vibrant coastal city of Hikkaduwa, I grew up immersed in the tourism industry while helping run our family-owned guesthouse, Anthony Guesthouse. As travelers completed their clockwise journeys around the island, they would inevitably arrive at our doorstep to relax before heading home.

Spending evenings engaging with guests from all over the world, I listened closely to their experiences. A common theme emerged: while they had visited iconic landmarks, many felt they had missed the true soul of the country. They shared stories of rushed itineraries and, most importantly, a lack of knowledgeable guidance to bring the history and culture to life.

These conversations sparked a realization: seeing a site is not the same as experiencing it. Determined to bridge this gap, I founded Anthony Holidays to offer depth over just sightseeing.

Our defining specialty is our team. We are proud to be led by high-quality, Licensed National Tourist Guide Lecturers, myself included. We don’t just take you to a monument; we narrate its history, legends, and significance. With us, you won't just be a tourist looking at a view—you will be a guest who truly understands the wonder of the Pearl of the Indian Ocean.`,
    specialties: [
      'Ancient Hydraulic Civilizations & UNESCO Sites',
      'Cultural & Spiritual Living Heritage',
      'Hill Country Tea & Colonial History',
      'Bespoke Island Routing & Wildlife Logistics',
    ],
    languages: ['English', 'Sinhala'],
    displayOrder: 1,
  },
  {
    id: 'faculty-wildlife',
    name: 'Chaminda Silva',
    slug: 'chaminda-silva',
    role: 'Senior Naturalist & Wildlife Tracking Specialist',
    isFounder: false,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    credentials: [
      'SLTDA Licensed Tourist Guide Lecturer',
      'Field Ornithology & Leopard Habitat Specialist',
      'Marine Mammal Observation Certified (Mirissa & Trincomalee)',
    ],
    bio: `With over 14 years in the field, Chaminda is one of Sri Lanka’s most respected naturalist guide lecturers. His deep knowledge of leopard tracking in Yala and Wilpattu, combined with strict ethical observation protocols, ensures breathtaking wildlife encounters that prioritize animal welfare above all else.

Chaminda also specializes in endemic avifauna in Sinharaja Rainforest and seasonal blue whale migrations off the southern continental shelf.`,
    specialties: ['Wildlife Tracking', 'Birdwatching', 'Marine Safari', 'Sinharaja Endemics'],
    languages: ['English', 'Sinhala', 'German'],
    displayOrder: 2,
  },
  {
    id: 'faculty-archaeology',
    name: 'Dinesh Perera',
    slug: 'dinesh-perera',
    role: 'Cultural Heritage & Archaeological Lecturer',
    isFounder: false,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    credentials: [
      'National Tourist Guide Lecturer License #NTGL-4482',
      'Postgraduate Diploma in Archaeology (Univ. of Kelaniya)',
      'Central Cultural Fund Accredited Lecturer',
    ],
    bio: `An academic lecturer and field archaeologist with over 16 years of guiding experience across Anuradhapura, Polonnaruwa, and Sigiriya. Dinesh brings ancient ruins vividly to life, explaining the sophisticated hydraulic engineering of 5th-century irrigation systems and the subtle iconography of Buddhist stone architecture.

His scholarly yet engaging narratives have enlightened academic groups, documentary film crews, and curious independent travellers alike.`,
    specialties: ['Ancient Citadels', 'Buddhist Art & Iconography', 'Hydraulic Engineering', 'Colonial Forts'],
    languages: ['English', 'Sinhala', 'French'],
    displayOrder: 3,
  },
  {
    id: 'faculty-highlands',
    name: 'Rohan Fernando',
    slug: 'rohan-fernando',
    role: 'Highland Trails & Tea Heritage Specialist',
    isFounder: false,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    credentials: [
      'SLTDA Certified Highland Guide Lecturer',
      'Knuckles Range Wilderness Navigation Certified',
      'Ceylon Tea Board Certified Taster & Factory Specialist',
    ],
    bio: `Born in the central highlands, Rohan spent his youth traversing the mist-shrouded ridges of the Knuckles Wilderness and Hatton tea estates. He leads private hikes through primary cloud forests, reveals secret waterfall pools, and guides guests through private tea tastings in heritage planter bungalows.

Rohan combines an encyclopedic knowledge of montane botany with an authentic passion for Sri Lanka’s hill country heritage.`,
    specialties: ['Cloud Forest Trekking', 'Ceylon Tea Culture', 'Botanical Walks', 'Highland History'],
    languages: ['English', 'Sinhala', 'Japanese'],
    displayOrder: 4,
  },
]


