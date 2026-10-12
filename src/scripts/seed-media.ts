/**
 * Anthony Holidays — Seed Media Catalog
 * Used exclusively by the database seeder (npm run seed) to download initial photography
 */

export interface MediaAsset {
  key: string
  url: string
  alt: string
  title?: string
  category?: string
  localPath?: string
}

export interface TourMediaEntry extends MediaAsset {
  gallery: MediaAsset[]
}

export const TOUR_MEDIA: Record<string, TourMediaEntry> = {
  'essence-of-ceylon': {
    key: 'tour_essence-of-ceylon',
    url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1600&q=85',
    localPath: '/media/tour_essence-of-ceylon.jpg',
    alt: '5th-century Sigiriya Rock Fortress rising above forest canopy',
    title: 'The Essence of Ceylon',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_essence_carvings',
        url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=1200&q=80',
        alt: 'Ancient temple carvings Sri Lanka',
      },
      {
        key: 'gallery_essence_kandy_temple',
        url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&q=80',
        alt: 'Temple of the Tooth Kandy',
      },
    ],
  },
  'tea-trails-ancient-temples': {
    key: 'tour_tea-trails-ancient-temples',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85',
    localPath: '/media/tour_tea-trails-ancient-temples.jpg',
    alt: 'Misty tea plantations and highlands in Nuwara Eliya',
    title: 'Tea Trails & Ancient Temples',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_tea_sigiriya',
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
        alt: 'Sigiriya Rock Fortress',
      },
      {
        key: 'gallery_tea_highlands',
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
        alt: 'Highland tea country',
      },
    ],
  },
  'classic-triangle-and-wildlife': {
    key: 'tour_classic-triangle-and-wildlife',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85',
    localPath: '/media/tour_classic-triangle-and-wildlife.jpg',
    alt: 'Wild Sri Lankan leopard resting in Yala National Park',
    title: 'The Classic Triangle & Wildlife',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_classic_rock',
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
        alt: 'Sigiriya fortress',
      },
      {
        key: 'gallery_classic_transport',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
        alt: 'Private chauffeur luxury vehicle',
      },
    ],
  },
  'heritage-and-southern-coast': {
    key: 'tour_heritage-and-southern-coast',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=85',
    localPath: '/media/tour_heritage-and-southern-coast.jpg',
    alt: 'Historic Galle Dutch Fort ramparts overlooking the Indian Ocean',
    title: 'Heritage & Southern Coast',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_heritage_plains',
        url: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&q=80',
        alt: 'Horton Plains mountain vistas',
      },
      {
        key: 'gallery_heritage_beach',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
        alt: 'Golden sandy southern beaches',
      },
    ],
  },
  'grand-sri-lankan-loop': {
    key: 'tour_grand-sri-lankan-loop',
    url: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&q=85',
    localPath: '/media/tour_grand-sri-lankan-loop.jpg',
    alt: 'Coastal palm fringed waters and southern Ceylon shoreline',
    title: 'The Grand Sri Lankan Loop',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_grand_wildlife',
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
        alt: 'Wild Asian leopard in Yala',
      },
      {
        key: 'gallery_grand_transport',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
        alt: 'Private vehicle transport',
      },
    ],
  },
  'deep-dive-culture-and-nature': {
    key: 'tour_deep-dive-culture-and-nature',
    url: 'https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1600&q=85',
    localPath: '/media/tour_deep-dive-culture-and-nature.jpg',
    alt: 'Horton Plains World End sheer mountain cliff and cloud forest',
    title: 'Deep Dive: Culture & Nature',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_deep_citadel',
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
        alt: 'Sigiriya Citadel',
      },
      {
        key: 'gallery_deep_leopard',
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
        alt: 'Sri Lankan wildlife',
      },
    ],
  },
  'ramayana-trail-special': {
    key: 'tour_ramayana-trail-special',
    url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1600&q=85',
    localPath: '/media/tour_ramayana-trail-special.jpg',
    alt: 'Sacred Temple of the Tooth Relic in historic Kandy',
    title: 'The Ramayana Trail Special',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_ramayana_ruins',
        url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80',
        alt: 'Ancient ruins',
      },
      {
        key: 'gallery_ramayana_tea',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
        alt: 'Hill country tea gardens',
      },
    ],
  },
  'ultimate-pearl-experience': {
    key: 'tour_ultimate-pearl-experience',
    url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600&q=85',
    localPath: '/media/tour_ultimate-pearl-experience.jpg',
    alt: 'Colonial Nine Arch Bridge Demodara with scenic mountain railway',
    title: 'The Ultimate Pearl Experience',
    category: 'tour',
    gallery: [
      {
        key: 'gallery_pearl_yala',
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
        alt: 'Yala National Park wildlife',
      },
      {
        key: 'gallery_pearl_coast',
        url: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&q=80',
        alt: 'Southern coastal paradise',
      },
    ],
  },
}

export const SPECIAL_PACKAGE_MEDIA: Record<string, MediaAsset> = {
  'hikkaduwa-marine-conservation-surf': {
    key: 'sp_hikkaduwa-marine-conservation-surf',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    localPath: '/media/sp_hikkaduwa-marine-conservation-surf.jpg',
    alt: 'Vibrant coral reef and coastal surf in Hikkaduwa Marine Park',
    title: 'Hikkaduwa Marine Conservation & Coastal Discovery',
    category: 'special-package',
  },
  'southern-sea-turtle-sanctuary-volunteering': {
    key: 'sp_southern-sea-turtle-sanctuary-volunteering',
    url: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=1200&q=80',
    localPath: '/media/sp_southern-sea-turtle-sanctuary-volunteering.jpg',
    alt: 'Endangered green sea turtle swimming in protected southern waters',
    title: 'Southern Sea Turtle Sanctuary Volunteering',
    category: 'special-package',
  },
  'essential-island-budget-explorer': {
    key: 'sp_essential-island-budget-explorer',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
    localPath: '/media/sp_essential-island-budget-explorer.jpg',
    alt: 'Scenic mountain railway journey curving through Ceylon hill country',
    title: 'Essential Island Explorer - Smart Budget Discovery',
    category: 'special-package',
  },
  'knuckles-wilderness-adventure-trek': {
    key: 'sp_knuckles-wilderness-adventure-trek',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    localPath: '/media/sp_knuckles-wilderness-adventure-trek.jpg',
    alt: 'Knuckles mountain range misty ridge and cloud forest peaks',
    title: 'Knuckles Mountain Wilderness Adventure Trek',
    category: 'special-package',
  },
  'bespoke-private-island-immersion': {
    key: 'sp_bespoke-private-island-immersion',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    localPath: '/media/sp_bespoke-private-island-immersion.jpg',
    alt: 'Secluded golden sandy tropical beach and coconut palms',
    title: 'Bespoke Private Island Immersion',
    category: 'special-package',
  },
}

export const SERVICE_MEDIA: Record<string, MediaAsset> = {
  'hotel-reservations': {
    key: 'service_hotel-reservations',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    localPath: '/media/service_hotel-reservations.jpg',
    alt: 'Handpicked luxury boutique villa and infinity pool',
    title: 'Hotel Reservations',
    category: 'service',
  },
  'visa-assistance': {
    key: 'service_visa-assistance',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    localPath: '/media/service_visa-assistance.jpg',
    alt: 'Passport, ETA tourist visa documents and international boarding passes',
    title: 'Visa Assistance',
    category: 'service',
  },
  'air-ticketing': {
    key: 'service_air-ticketing',
    url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1200&q=80',
    localPath: '/media/service_air-ticketing.jpg',
    alt: 'Passenger airliner cruising above sunset clouds',
    title: 'Air Ticketing',
    category: 'service',
  },
  'travel-insurance': {
    key: 'service_travel-insurance',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    localPath: '/media/service_travel-insurance.jpg',
    alt: 'Comprehensive travel insurance protection and medical advisory',
    title: 'Travel Insurance',
    category: 'service',
  },
  'value-added-services': {
    key: 'service_value-added-services',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
    localPath: '/media/service_value-added-services.jpg',
    alt: 'Luxury private air-conditioned vehicle and chauffeur service',
    title: 'Value Added Services',
    category: 'service',
  },
}

export const BLOG_MEDIA: Record<string, MediaAsset> = {
  'secrets-of-sigiriya-ancient-engineering': {
    key: 'blog_secrets-of-sigiriya-ancient-engineering',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
    localPath: '/media/blog_secrets-of-sigiriya-ancient-engineering.jpg',
    alt: 'Aerial perspective of Sigiriya Lion Rock palace summit',
    title: 'Secrets of Sigiriya: Ancient Engineering in the Sky',
    category: 'blog',
  },
  'when-to-visit-sri-lanka-monsoon-guide': {
    key: 'blog_when-to-visit-sri-lanka-monsoon-guide',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    localPath: '/media/blog_when-to-visit-sri-lanka-monsoon-guide.jpg',
    alt: 'Sunny tropical beach reflecting calm waters during dry season',
    title: 'When to Visit Sri Lanka: A Dual-Monsoon Guide',
    category: 'blog',
  },
  'leopards-and-elephants-wildlife-ethics': {
    key: 'blog_leopards-and-elephants-wildlife-ethics',
    url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1200&q=80',
    localPath: '/media/blog_leopards-and-elephants-wildlife-ethics.jpg',
    alt: 'Herd of wild Asian elephants in grassland safari sanctuary',
    title: 'Leopards and Elephants: Ethical Wildlife Encounters in Sri Lanka',
    category: 'blog',
  },
  'high-grown-ceylon-tea-culture-hatton': {
    key: 'blog_high-grown-ceylon-tea-culture-hatton',
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
    localPath: '/media/blog_high-grown-ceylon-tea-culture-hatton.jpg',
    alt: 'Emerald green tea terraces and colonial Ceylon tea plantation',
    title: 'High-Grown Ceylon: Tea Culture and Bungalow Life in Hatton',
    category: 'blog',
  },
}

export const TEAM_MEDIA: Record<string, MediaAsset> = {
  'anthony-founder': {
    key: 'anthony_founder_portrait',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    localPath: '/media/anthony_founder_portrait.jpg',
    alt: 'Anthony - Founder & Licensed National Tourist Guide Lecturer',
    title: 'Anthony (Founder)',
    category: 'team',
  },
}
