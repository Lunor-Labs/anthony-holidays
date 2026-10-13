import { SPECIAL_PACKAGE_MEDIA } from './seed-media'

export interface SeedSpecialPackage {
  id: string
  slug: string
  title: string
  category: string
  categoryLabel: string
  excerpt: string
  duration: { days: number; nights: number }
  pricing: { showPrice: boolean; priceFrom: number; currency: string; pricingNote: string }
  coverImage: string
  alt: string
  activities: { title: string; description: string }[]
  inclusions: string[]
  exclusions: string[]
  conditions: string
  featured: boolean
}

export const SEED_SPECIAL_PACKAGES: SeedSpecialPackage[] = [
  {
    id: 'sp-1',
    slug: 'hikkaduwa-marine-conservation-surf',
    title: 'Hikkaduwa Marine Conservation & Coastal Discovery',
    category: 'hikkaduwa',
    categoryLabel: 'Hikkaduwa-Based Tourism',
    excerpt: 'Hands-on coral reef regeneration, marine biology education, and private coastal surfing along the vibrant Hikkaduwa Marine National Park shoreline.',
    duration: { days: 7, nights: 6 },
    pricing: { showPrice: true, priceFrom: 980, currency: 'USD', pricingNote: 'per person' },
    coverImage: SPECIAL_PACKAGE_MEDIA['hikkaduwa-marine-conservation-surf'].url,
    alt: SPECIAL_PACKAGE_MEDIA['hikkaduwa-marine-conservation-surf'].alt,
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
    duration: { days: 10, nights: 9 },
    pricing: { showPrice: true, priceFrom: 1150, currency: 'USD', pricingNote: 'per volunteer' },
    coverImage: SPECIAL_PACKAGE_MEDIA['southern-sea-turtle-sanctuary-volunteering'].url,
    alt: SPECIAL_PACKAGE_MEDIA['southern-sea-turtle-sanctuary-volunteering'].alt,
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
    duration: { days: 8, nights: 7 },
    pricing: { showPrice: true, priceFrom: 820, currency: 'USD', pricingNote: 'per person, twin sharing' },
    coverImage: SPECIAL_PACKAGE_MEDIA['essential-island-budget-explorer'].url,
    alt: SPECIAL_PACKAGE_MEDIA['essential-island-budget-explorer'].alt,
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
    duration: { days: 6, nights: 5 },
    pricing: { showPrice: true, priceFrom: 1290, currency: 'USD', pricingNote: 'per hiker' },
    coverImage: SPECIAL_PACKAGE_MEDIA['knuckles-wilderness-adventure-trek'].url,
    alt: SPECIAL_PACKAGE_MEDIA['knuckles-wilderness-adventure-trek'].alt,
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
    duration: { days: 12, nights: 11 },
    pricing: { showPrice: false, priceFrom: 2950, currency: 'USD', pricingNote: 'custom quote upon consultation' },
    coverImage: SPECIAL_PACKAGE_MEDIA['bespoke-private-island-immersion'].url,
    alt: SPECIAL_PACKAGE_MEDIA['bespoke-private-island-immersion'].alt,
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
