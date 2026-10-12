import { getPayloadClient } from '@/lib/payload'

// Fallback sample data used when database has no published entries yet
export const FALLBACK_JOURNEYS = [
  {
    id: '1',
    slug: 'essence-of-ceylon',
    title: 'The Essence of Ceylon',
    tagline: 'Short on time, but hungry for adventure?',
    excerpt: 'Experience the iconic Lion Rock, the last kingdom of Kandy, and the spiritual heart of the island in just three unforgettable days.',
    duration: { days: 3, nights: 4 },
    pricing: { priceFrom: 790, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    alt: 'Sigiriya Lion Rock Citadel Sri Lanka',
    destinations: ['Sigiriya', 'Dambulla', 'Kandy', 'Peradeniya'],
    categories: ['cultural-heritage', 'leisure'],
    featured: true,
  },
  {
    id: '2',
    slug: 'tea-trails-ancient-temples',
    title: 'Tea Trails & Ancient Temples',
    tagline: 'From the golden plains of the north to the misty peaks of the hill country.',
    excerpt: 'Taste the world’s finest tea and walk in the footsteps of kings.',
    duration: { days: 5, nights: 4 },
    pricing: { priceFrom: 1250, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    alt: 'Tea plantations and mist clad peaks in Sri Lanka',
    destinations: ['Sigiriya', 'Polonnaruwa', 'Kandy', 'Nuwara Eliya', 'Ramboda'],
    categories: ['cultural-heritage', 'hill-country', 'luxury'],
    featured: true,
  },
  {
    id: '3',
    slug: 'classic-triangle-and-wildlife',
    title: 'The Classic Triangle & Wildlife',
    tagline: 'History meets the wild.',
    excerpt: 'Explore the Cultural Triangle, relax in the hills, and finish with a thrilling safari in Yala.',
    duration: { days: 6, nights: 5 },
    pricing: { priceFrom: 1580, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    alt: 'Leopard in Yala National Park Sri Lanka',
    destinations: ['Sigiriya', 'Hiriwadunna', 'Dambulla', 'Kandy', 'Ella', 'Yala'],
    categories: ['wildlife-adventure', 'cultural-heritage', 'hill-country'],
    featured: true,
  },
  {
    id: '4',
    slug: 'heritage-and-southern-coast',
    title: 'Heritage & Southern Coast',
    tagline: 'From the ancient kingdoms to the golden beaches of the south.',
    excerpt: 'Immerse yourself in culture, then unwind by the Indian Ocean.',
    duration: { days: 7, nights: 6 },
    pricing: { priceFrom: 1790, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    alt: 'Galle Fort ramparts and southern coastline',
    destinations: ['Anuradhapura', 'Aukana', 'Sigiriya', 'Kandy', 'Nuwara Eliya', 'Udawalawe', 'Galle', 'Hikkaduwa'],
    categories: ['cultural-heritage', 'beach', 'leisure'],
    featured: true,
  },
  {
    id: '5',
    slug: 'grand-sri-lankan-loop',
    title: 'The Grand Sri Lankan Loop',
    tagline: 'The complete package.',
    excerpt: 'Ancient ruins, hill country tea, wildlife safaris, and Dutch colonial history, all curated for the discerning traveler.',
    duration: { days: 8, nights: 7 },
    pricing: { priceFrom: 2150, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
    alt: 'Galle lighthouse and Sri Lanka coast',
    destinations: ['Sigiriya', 'Polonnaruwa', 'Minneriya', 'Dambulla', 'Kandy', 'Ella', 'Yala', 'Mirissa', 'Galle'],
    categories: ['cultural-heritage', 'wildlife-adventure', 'hill-country', 'beach', 'luxury'],
    featured: false,
  },
  {
    id: '6',
    slug: 'deep-dive-culture-and-nature',
    title: 'Deep Dive: Culture & Nature',
    tagline: 'Slow down and see it all.',
    excerpt: 'This leisurely-paced tour includes the cultural north, the misty central hills, and a deep south beach retreat.',
    duration: { days: 9, nights: 8 },
    pricing: { priceFrom: 2450, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=800&q=80',
    alt: 'Horton Plains World End view Sri Lanka',
    destinations: ['Negombo', 'Anuradhapura', 'Sigiriya', 'Polonnaruwa', 'Kandy', 'Nuwara Eliya', 'Horton Plains', 'Ella', 'Yala', 'Tangalle', 'Galle'],
    categories: ['cultural-heritage', 'wildlife-adventure', 'leisure', 'untouched'],
    featured: false,
  },
  {
    id: '7',
    slug: 'ramayana-trail-special',
    title: 'The Ramayana Trail Special',
    tagline: 'Walk the path of the Ramayana epic.',
    excerpt: 'Discover the spiritual sites connected to Rama, Sita, and Hanuman, blended with Sri Lanka’s natural beauty.',
    duration: { days: 10, nights: 9 },
    pricing: { priceFrom: 2680, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80',
    alt: 'Sacred temple sanctuary Sri Lanka',
    destinations: ['Chilaw', 'Anuradhapura', 'Mihintale', 'Sigiriya', 'Dambulla', 'Kandy', 'Ramboda', 'Nuwara Eliya', 'Ella', 'Kataragama', 'Ussangoda', 'Galle'],
    categories: ['pilgrimage', 'cultural-heritage', 'untouched'],
    featured: false,
  },
  {
    id: '8',
    slug: 'ultimate-pearl-experience',
    title: 'The Ultimate Pearl Experience',
    tagline: 'The perfect Sri Lankan journey.',
    excerpt: 'Luxury, adventure, wildlife, and history combined into a two-week epic that covers every corner of the island.',
    duration: { days: 14, nights: 13 },
    pricing: { priceFrom: 3850, currency: 'USD' },
    coverImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=800&q=80',
    alt: 'Panoramic Sri Lanka island views',
    destinations: ['Negombo', 'Wilpattu', 'Anuradhapura', 'Sigiriya', 'Minneriya', 'Polonnaruwa', 'Habarana', 'Kandy', 'Nuwara Eliya', 'Horton Plains', 'Ella', 'Yala', 'Mirissa', 'Galle', 'Colombo'],
    categories: ['luxury', 'cultural-heritage', 'wildlife-adventure', 'beach', 'hill-country'],
    featured: false,
  },
]


export const FALLBACK_POSTS = [
  {
    id: '1',
    slug: 'secrets-of-sigiriya-ancient-engineering',
    title: 'Secrets of Sigiriya: Ancient Engineering in the Sky',
    excerpt: 'How King Kashyapa built an imperial citadel with hydraulic gardens 200 metres above the forest floor.',
    publishedAt: '2025-01-15',
    date: 'October 2026',
    author: 'Licensed Guide Anthony',
    category: 'Heritage & Archaeology',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
  },
  {
    id: '2',
    slug: 'when-to-visit-sri-lanka-monsoon-guide',
    title: 'When to Visit Sri Lanka: A Dual-Monsoon Guide',
    excerpt: "Sri Lanka has two distinct monsoon seasons. Learn which coast is dry and sunny at any month of the year.",
    publishedAt: '2025-02-01',
    date: 'September 2026',
    author: 'Editorial Team',
    category: 'Travel Advice',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: '3',
    slug: 'leopards-and-elephants-wildlife-ethics',
    title: 'Leopards and Elephants: Ethical Wildlife Encounters in Sri Lanka',
    excerpt: 'How our guide lecturers approach wildlife safaris to ensure animal welfare and unforgettable encounters.',
    publishedAt: '2025-02-20',
    date: 'August 2026',
    author: 'Wildlife Specialist',
    category: 'Wildlife',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
  },
  {
    id: '4',
    slug: 'high-grown-ceylon-tea-culture-hatton',
    title: 'High-Grown Ceylon: Tea Culture and Bungalow Life in Hatton',
    excerpt: 'Waking up to mist over the Bogawantalawa Valley, plucking tea with estate workers, and colonial heritage.',
    publishedAt: '2025-03-05',
    date: 'July 2026',
    author: 'Licensed Guide Anthony',
    category: 'Hill Country',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
]

export const FALLBACK_TESTIMONIALS = [
  {
    id: '1',
    quote:
      'Travelling with Anthony was the highlight of our three weeks in Asia. His depth of historical knowledge transformed every temple from ancient stones into a living, breathing story.',
    travellerName: 'David & Sarah Mitchell',
    travellerCountry: 'United Kingdom',
    journeyTitle: 'Cultural Triangle Discovery',
    rating: 5,
  },
  {
    id: '2',
    quote:
      'The private safari in Yala was extraordinary. Our guide spotted a mother leopard and two cubs resting on a rocky outcrop - moments other jeeps rushed past completely.',
    travellerName: 'Elena Rostova',
    travellerCountry: 'Switzerland',
    journeyTitle: 'Southern Coast & Wildlife',
    rating: 5,
  },
  {
    id: '3',
    quote:
      'As seasoned travellers who rarely use guides, we were blown away by the professionalism, warmth, and seamless logistics. Anthony Holidays represents Ceylon hospitality at its very finest.',
    travellerName: 'Marc & Chantal Lefèvre',
    travellerCountry: 'France',
    journeyTitle: 'Grand Sri Lanka Circuit',
    rating: 5,
  },
]

export const FALLBACK_SPECIAL_PACKAGES = [
  {
    id: 'sp-1',
    slug: 'hikkaduwa-marine-conservation-surf',
    title: 'Hikkaduwa Marine Conservation & Coastal Discovery',
    category: 'hikkaduwa',
    categoryLabel: 'Hikkaduwa-Based Tourism',
    excerpt: 'Hands-on coral reef regeneration, marine biology education, and private coastal surfing along the vibrant Hikkaduwa Marine National Park shoreline.',
    duration: { days: 7, nights: 6 },
    pricing: { showPrice: true, priceFrom: 980, currency: 'USD', pricingNote: 'per person' },
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    alt: 'Coral reefs and coastal waters of Hikkaduwa Sri Lanka',
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
    coverImage: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=800&q=80',
    alt: 'Sea turtle swimming in clear tropical waters',
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
    coverImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=800&q=80',
    alt: 'Scenic hill country train winding through tea estates',
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
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    alt: 'Knuckles mountain range cloud forest mist and peaks',
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
    coverImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80',
    alt: 'Luxury private villa overlooking tea estates in Sri Lanka',
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

export const FALLBACK_SERVICES = [
  {
    id: 'srv-1',
    slug: 'licensed-guide-lecturing',
    title: 'Licensed National Tourist Guide Lecturing',
    iconName: 'Award',
    displayOrder: 1,
    shortDescription: 'Certified islandwide guiding by Licensed National Tourist Guide Lecturers registered with the Sri Lanka Tourism Development Authority (SLTDA).',
    highlights: [
      'Official SLTDA national guide licence credentials',
      'In-depth knowledge of archaeology, flora, fauna, and Theravada Buddhist history',
      'Fluent English communication with scholarly storytelling',
      'Authorised commentary rights at all UNESCO World Heritage sites',
    ],
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
  },
  {
    id: 'srv-2',
    slug: 'private-chauffeur-transport',
    title: 'Private Chauffeur & Luxury Transport',
    iconName: 'Car',
    displayOrder: 2,
    shortDescription: 'Dedicated private air-conditioned vehicles with professional, licensed English-speaking chauffeur guides.',
    highlights: [
      'Modern, immaculately maintained fleet (executive sedans, SUVs, and luxury vans)',
      'Comprehensive commercial passenger insurance',
      'Complimentary chilled bottled water and onboard Wi-Fi',
      'Flexible pauses for photography, fruit stalls, and scenery at your leisure',
    ],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
  {
    id: 'srv-3',
    slug: 'tailor-made-itinerary-design',
    title: 'Bespoke Tailor-Made Itinerary Design',
    iconName: 'Compass',
    displayOrder: 3,
    shortDescription: 'One-on-one journey planning shaped entirely around your travel rhythm, personal interests, dates, and budget.',
    highlights: [
      'Personal journey calibration directly with founder Anthony',
      'Realistic travel pacing that avoids exhausting island drives',
      'Curated boutique, heritage, and eco-luxury accommodation recommendations',
      'Dynamic flexibility to tweak daily schedules on the road',
    ],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  },
  {
    id: 'srv-4',
    slug: 'airport-transfers-chauffeur',
    title: 'Airport Transfers & Islandwide Chauffeur-Drive',
    iconName: 'Navigation',
    displayOrder: 4,
    shortDescription: 'Punctual 24/7 airport meet-and-assist transfers between Bandaranaike International Airport (CMB) and any destination in Sri Lanka.',
    highlights: [
      'Flight tracking for timely pickup despite delays',
      'Air-conditioned meet-and-greet in the arrivals hall',
      'Non-stop direct highway transit via expressway network',
      'Transparent flat rates with all expressway tolls included',
    ],
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
  },
  {
    id: 'srv-5',
    slug: 'specialist-wildlife-botanical-guiding',
    title: 'Specialist Wildlife & Botanical Guiding',
    iconName: 'Eye',
    displayOrder: 5,
    shortDescription: 'Expert naturalist-led expeditions into Sri Lanka’s UNESCO virgin rainforests, birding sanctuaries, and national parks.',
    highlights: [
      'Naturalist commentary on leopard tracking and elephant behavior',
      'Sinharaja UNESCO Rainforest endemic birding expeditions',
      'Responsible, ethical whale watching off Mirissa and Trincomalee',
      'Hill country endemic botanical and orchid trails',
    ],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
  },
]

export const FALLBACK_TEAM_MEMBERS = [
  {
    id: 'tm-1',
    name: 'Anthony',
    role: 'Founder & Licensed National Tourist Guide Lecturer',
    isFounder: true,
    displayOrder: 1,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    credentials: [
      'SLTDA Licensed National Tourist Guide Lecturer',
      'Over 15 Years Professional Islandwide Guiding',
      'Diploma in Sri Lankan Archaeology & Cultural Heritage',
    ],
    bio: `Born and raised in the vibrant coastal city of Hikkaduwa, I grew up immersed in the tourism industry while helping run our family-owned guesthouse, Anthony Guesthouse. As travelers completed their clockwise journeys around the island, they would inevitably arrive at our doorstep to relax before heading home.

Spending evenings engaging with guests from all over the world, I listened closely to their experiences. A common theme emerged: while they had visited iconic landmarks, many felt they had missed the true soul of the country. They shared stories of rushed itineraries and, most importantly, a lack of knowledgeable guidance to bring the history and culture to life.

These conversations sparked a realization: seeing a site is not the same as experiencing it. Determined to bridge this gap, I founded this agency to offer depth over just sightseeing.

Our defining specialty is our team. We are proud to be led by high-quality, Licensed National Tourist Guide Lecturers, myself included. We don’t just take you to a monument; we narrate its history, legends, and significance. With us, you won't just be a tourist looking at a view—you will be a guest who truly understands the wonder of the Pearl of the Indian Ocean.`,
    specialties: ['Cultural Triangle Citadels', 'Ramayana Trail Sites', 'Deep Southern Coast & Wildlife', 'Bespoke Island Routing'],
    languages: ['English', 'Sinhala', 'Tamil'],
  },
  {
    id: 'tm-2',
    name: 'Chaminda Silva',
    role: 'Senior Wildlife Naturalist & Chauffeur Guide',
    isFounder: false,
    displayOrder: 2,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    credentials: [
      'Certified Field Naturalist & Ornithologist',
      '12 Years Safari Navigation in Yala & Wilpattu',
      'Advanced Defensive Driving Certified',
    ],
    bio: 'A passionate naturalist with an uncanny instinct for wildlife tracking, Chaminda brings unmatched expertise in leopard habits, elephant migration corridors, and endemic birding across Sri Lanka\'s diverse forest ecosystems.',
    specialties: ['Yala & Wilpattu Leopard Tracking', 'Endemic Rainforest Birding', 'Wildlife Photography Assistance'],
    languages: ['English', 'Sinhala'],
  },
  {
    id: 'tm-3',
    name: 'Nirosh Perera',
    role: 'Cultural Heritage Specialist & Guide Lecturer',
    isFounder: false,
    displayOrder: 3,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
    credentials: [
      'SLTDA Registered Chauffeur Guide Lecturer',
      'BA in South Asian History',
      'Red Cross First Aid Certified',
    ],
    bio: 'Nirosh is an avid student of Sri Lanka\'s ancient hydraulic engineering and temple mural iconography. He breathes vivid life into ancient monasteries and colonial fortress ramparts for curious travellers of all ages.',
    specialties: ['Sacred Cities of Anuradhapura & Polonnaruwa', 'Kandyan Kingdom Art History', 'Southern Colonial Forts'],
    languages: ['English', 'Sinhala'],
  },
]

export const FALLBACK_REVIEWS = [
  {
    id: 'rev-1',
    guestName: 'David & Sarah Mitchell',
    country: 'United Kingdom',
    rating: 5,
    tourName: 'Cultural Triangle Discovery',
    travelDate: 'January 2026',
    reviewText: 'Travelling with Anthony was the highlight of our three weeks in Asia. His depth of historical knowledge transformed every temple from ancient stones into a living, breathing story. We felt completely safe, cared for, and inspired.',
    submittedAt: '2026-01-20',
  },
  {
    id: 'rev-2',
    guestName: 'Elena Rostova',
    country: 'Switzerland',
    rating: 5,
    tourName: 'Southern Coast & Wildlife',
    travelDate: 'February 2026',
    reviewText: 'The private safari in Yala was extraordinary. Our guide spotted a mother leopard and two cubs resting on a rocky outcrop - moments other jeeps rushed past completely. Exceptional attention to detail.',
    submittedAt: '2026-02-14',
  },
  {
    id: 'rev-3',
    guestName: 'Marc & Chantal Lefèvre',
    country: 'France',
    rating: 5,
    tourName: 'Grand Sri Lanka Circuit',
    travelDate: 'November 2025',
    reviewText: 'As seasoned travellers who rarely use guides, we were blown away by the professionalism, warmth, and seamless logistics. Anthony Holidays represents Ceylon hospitality at its very finest.',
    submittedAt: '2025-11-28',
  },
  {
    id: 'rev-4',
    guestName: 'Julian & Claire Vance',
    country: 'Australia',
    rating: 5,
    tourName: 'Hill Country & Tea Trails',
    travelDate: 'March 2026',
    reviewText: 'From the scenic mountain train to the colonial tea bungalows in Hatton, every single accommodation was stunning. Anthony adjusted the pace whenever our kids needed rest. Truly five stars!',
    submittedAt: '2026-03-10',
  },
]

// Helper to extract an image URL from Payload Media relation or fallback string
export function getMediaUrl(media: any, fallback: string): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (typeof media === 'object' && media.url) return media.url
  return fallback
}

/**
 * Fetch published Journeys from Payload CMS (falls back to sample data if empty)
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
        coverImage: getMediaUrl(doc.coverImage, FALLBACK_JOURNEYS[0].coverImage),
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
    console.warn('Payload getJourneys fallback to sample data:', err)
  }

  return FALLBACK_JOURNEYS
}

/**
 * Fetch a single Journey by slug
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
      return docs[0]
    }
  } catch (err) {
    console.warn(`Payload getJourneyBySlug(${slug}) error:`, err)
  }
  return null
}


/**
 * Fetch published Journal Posts from Payload CMS
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
        coverImage: getMediaUrl(doc.coverImage, FALLBACK_POSTS[0].coverImage),
        image: getMediaUrl(doc.coverImage, FALLBACK_POSTS[0].coverImage),
      }))
    }
  } catch (err) {
    console.warn('Payload getJournalPosts fallback to sample data:', err)
  }

  return FALLBACK_POSTS
}

/**
 * Fetch Testimonials from Payload CMS
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
        journeyTitle: doc.journeyName || 'Private Sri Lanka Journey',
        rating: doc.rating || 5,
      }))
    }
  } catch (err) {
    console.warn('Payload getTestimonials fallback to sample data:', err)
  }

  return FALLBACK_TESTIMONIALS
}

/**
 * Fetch Global Site Settings
 */
export async function getSiteSettings() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })
    if (settings) return settings
  } catch (err) {
    console.warn('Payload getSiteSettings fallback:', err)
  }

  return {
    companyName: 'Anthony Holidays',
    tagline: 'Authentic Sri Lanka, Expert-Led Journeys',
    contact: {
      email: 'info@anthonyholidays.com',
      phone: '+94 77 123 4567',
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94771234567',
      address: 'Kandy & Colombo, Sri Lanka',
      googleMapsEmbedUrl: '',
    },
    socialLinks: {
      instagram: 'https://instagram.com/anthonyholidays',
      facebook: 'https://facebook.com/anthonyholidays',
    },
  }
}

/**
 * Fetch published Special Packages from Payload CMS
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
        coverImage: getMediaUrl(doc.coverImage, FALLBACK_SPECIAL_PACKAGES[0].coverImage),
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
    console.warn('Payload getSpecialPackages fallback to sample data:', err)
  }

  return FALLBACK_SPECIAL_PACKAGES
}

/**
 * Fetch a single Special Package by slug
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
        coverImage: getMediaUrl(doc.coverImage, FALLBACK_SPECIAL_PACKAGES[0].coverImage),
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

  const fallback = FALLBACK_SPECIAL_PACKAGES.find((p) => p.slug === slug)
  return fallback || null
}

/**
 * Fetch published Services from Payload CMS
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
        image: getMediaUrl(doc.image, FALLBACK_SERVICES[0].image),
        iconName: doc.iconName || 'Compass',
        displayOrder: doc.displayOrder || 0,
        highlights: Array.isArray(doc.highlights) ? doc.highlights.map((h: any) => h.item || String(h)) : [],
      }))
    }
  } catch (err) {
    console.warn('Payload getServices fallback to sample data:', err)
  }

  return FALLBACK_SERVICES
}

/**
 * Fetch published Team Members from Payload CMS
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
      return docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        role: doc.role,
        isFounder: Boolean(doc.isFounder),
        photo: getMediaUrl(doc.photo, FALLBACK_TEAM_MEMBERS[0].photo),
        credentials: Array.isArray(doc.credentials) ? doc.credentials.map((c: any) => c.badge || String(c)) : [],
        bio: typeof doc.bio === 'string' ? doc.bio : '',
        specialties: Array.isArray(doc.specialties) ? doc.specialties.map((s: any) => s.area || String(s)) : [],
        languages: Array.isArray(doc.languages) ? doc.languages.map((l: any) => l.language || String(l)) : [],
        displayOrder: doc.displayOrder || 0,
      }))
    }
  } catch (err) {
    console.warn('Payload getTeamMembers fallback to sample data:', err)
  }

  return FALLBACK_TEAM_MEMBERS
}

/**
 * Fetch Approved & Published Reviews
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
    console.warn('Payload getReviews fallback to sample data:', err)
  }

  return FALLBACK_REVIEWS
}
