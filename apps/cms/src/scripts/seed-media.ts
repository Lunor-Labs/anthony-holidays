/**
 * Anthony Holidays - Seed Media Catalog
 * Used exclusively by the database seeder (npm run seed) to download initial photography
 */

export interface MediaAsset {
  key: string;
  url: string;
  alt: string;
  title?: string;
  category?: string;
  localPath?: string;
}

export interface TourMediaEntry extends MediaAsset {
  gallery: MediaAsset[];
}

export const TOUR_MEDIA: Record<string, TourMediaEntry> = {
  "essence-of-ceylon": {
    key: "tour_essence-of-ceylon",
    url: "/media/tour_essence-of-ceylon.jpg",
    localPath: "/media/tour_essence-of-ceylon.jpg",
    alt: "5th-century Sigiriya Rock Fortress rising above forest canopy",
    title: "The Essence of Ceylon",
    category: "tour",
    gallery: [
      {
        key: "gallery_essence_carvings",
        url: "/media/gallery_essence_carvings.jpg",
        localPath: "/media/gallery_essence_carvings.jpg",
        alt: "Ancient temple carvings Sri Lanka",
      },
      {
        key: "gallery_essence_kandy_temple",
        url: "/media/gallery_essence_kandy_temple.jpg",
        localPath: "/media/gallery_essence_kandy_temple.jpg",
        alt: "Temple of the Tooth Kandy",
      },
    ],
  },
  "tea-trails-ancient-temples": {
    key: "tour_tea-trails-ancient-temples",
    url: "/media/tour_tea-trails-ancient-temples.jpg",
    localPath: "/media/tour_tea-trails-ancient-temples.jpg",
    alt: "Misty tea plantations and highlands in Nuwara Eliya",
    title: "Tea Trails & Ancient Temples",
    category: "tour",
    gallery: [
      {
        key: "gallery_tea_sigiriya",
        url: "/media/gallery_tea_sigiriya.jpg",
        localPath: "/media/gallery_tea_sigiriya.jpg",
        alt: "Sigiriya Rock Fortress",
      },
      {
        key: "gallery_tea_highlands",
        url: "/media/gallery_tea_highlands.jpg",
        localPath: "/media/gallery_tea_highlands.jpg",
        alt: "Highland tea country",
      },
    ],
  },
  "classic-triangle-and-wildlife": {
    key: "tour_classic-triangle-and-wildlife",
    url: "/media/tour_classic-triangle-and-wildlife.jpg",
    localPath: "/media/tour_classic-triangle-and-wildlife.jpg",
    alt: "Wild Sri Lankan leopard resting in Yala National Park",
    title: "The Classic Triangle & Wildlife",
    category: "tour",
    gallery: [
      {
        key: "gallery_classic_rock",
        url: "/media/gallery_classic_rock.jpg",
        localPath: "/media/gallery_classic_rock.jpg",
        alt: "Sigiriya fortress",
      },
      {
        key: "gallery_classic_transport",
        url: "/media/gallery_classic_transport.jpg",
        localPath: "/media/gallery_classic_transport.jpg",
        alt: "Private chauffeur luxury vehicle and elephant safari",
      },
    ],
  },
  "heritage-and-southern-coast": {
    key: "tour_heritage-and-southern-coast",
    url: "/media/tour_heritage-and-southern-coast.jpg",
    localPath: "/media/tour_heritage-and-southern-coast.jpg",
    alt: "Historic Galle Dutch Fort ramparts overlooking the Indian Ocean",
    title: "Heritage & Southern Coast",
    category: "tour",
    gallery: [
      {
        key: "gallery_heritage_plains",
        url: "/media/gallery_heritage_plains.jpg",
        localPath: "/media/gallery_heritage_plains.jpg",
        alt: "Horton Plains mountain vistas",
      },
      {
        key: "gallery_heritage_beach",
        url: "/media/gallery_heritage_beach.jpg",
        localPath: "/media/gallery_heritage_beach.jpg",
        alt: "Golden sandy southern beaches",
      },
    ],
  },
  "grand-sri-lankan-loop": {
    key: "tour_grand-sri-lankan-loop",
    url: "/media/tour_grand-sri-lankan-loop.jpg",
    localPath: "/media/tour_grand-sri-lankan-loop.jpg",
    alt: "Coastal palm fringed waters and southern Ceylon shoreline",
    title: "The Grand Sri Lankan Loop",
    category: "tour",
    gallery: [
      {
        key: "gallery_grand_wildlife",
        url: "/media/gallery_grand_wildlife.jpg",
        localPath: "/media/gallery_grand_wildlife.jpg",
        alt: "Wild Asian leopard in Yala",
      },
      {
        key: "gallery_grand_transport",
        url: "/media/gallery_grand_transport.jpg",
        localPath: "/media/gallery_grand_transport.jpg",
        alt: "Private scenic highland rail journey",
      },
    ],
  },
  "deep-dive-culture-and-nature": {
    key: "tour_deep-dive-culture-and-nature",
    url: "/media/tour_deep-dive-culture-and-nature.jpg",
    localPath: "/media/tour_deep-dive-culture-and-nature.jpg",
    alt: "Horton Plains World End sheer mountain cliff and cloud forest",
    title: "Deep Dive: Culture & Nature",
    category: "tour",
    gallery: [
      {
        key: "gallery_deep_citadel",
        url: "/media/gallery_deep_citadel.jpg",
        localPath: "/media/gallery_deep_citadel.jpg",
        alt: "Sigiriya Citadel",
      },
      {
        key: "gallery_deep_leopard",
        url: "/media/gallery_deep_leopard.jpg",
        localPath: "/media/gallery_deep_leopard.jpg",
        alt: "Sri Lankan wildlife",
      },
    ],
  },
  "ramayana-trail-special": {
    key: "tour_ramayana-trail-special",
    url: "/media/tour_ramayana-trail-special.jpg",
    localPath: "/media/tour_ramayana-trail-special.jpg",
    alt: "Sacred Temple of the Tooth Relic in historic Kandy",
    title: "The Ramayana Trail Special",
    category: "tour",
    gallery: [
      {
        key: "gallery_ramayana_ruins",
        url: "/media/gallery_ramayana_ruins.jpg",
        localPath: "/media/gallery_ramayana_ruins.jpg",
        alt: "Ancient ruins",
      },
      {
        key: "gallery_ramayana_tea",
        url: "/media/gallery_ramayana_tea.jpg",
        localPath: "/media/gallery_ramayana_tea.jpg",
        alt: "Hill country tea gardens",
      },
    ],
  },
  "ultimate-pearl-experience": {
    key: "tour_ultimate-pearl-experience",
    url: "/media/tour_ultimate-pearl-experience.jpg",
    localPath: "/media/tour_ultimate-pearl-experience.jpg",
    alt: "Colonial Nine Arch Bridge Demodara with scenic mountain railway",
    title: "The Ultimate Pearl Experience",
    category: "tour",
    gallery: [
      {
        key: "gallery_pearl_yala",
        url: "/media/gallery_pearl_yala.jpg",
        localPath: "/media/gallery_pearl_yala.jpg",
        alt: "Yala National Park wildlife",
      },
      {
        key: "gallery_pearl_coast",
        url: "/media/gallery_pearl_coast.jpg",
        localPath: "/media/gallery_pearl_coast.jpg",
        alt: "Southern coastal paradise",
      },
    ],
  },
};

export const SPECIAL_PACKAGE_MEDIA: Record<string, MediaAsset> = {
  "hikkaduwa-marine-conservation-surf": {
    key: "sp_hikkaduwa-marine-conservation-surf",
    url: "/media/sp_hikkaduwa-marine-conservation-surf.jpg",
    localPath: "/media/sp_hikkaduwa-marine-conservation-surf.jpg",
    alt: "Vibrant coral reef restoration and coastal surfing in Hikkaduwa Marine National Park",
    title: "Hikkaduwa Marine Conservation & Coastal Discovery",
    category: "special-package",
  },
  "southern-sea-turtle-sanctuary-volunteering": {
    key: "sp_southern-sea-turtle-sanctuary-volunteering",
    url: "/media/sp_southern-sea-turtle-sanctuary-volunteering.jpg",
    localPath: "/media/sp_southern-sea-turtle-sanctuary-volunteering.jpg",
    alt: "Endangered baby sea turtle hatchling release at southern Sri Lanka marine sanctuary",
    title: "Southern Sea Turtle Sanctuary Volunteering",
    category: "special-package",
  },
  "essential-island-budget-explorer": {
    key: "sp_essential-island-budget-explorer",
    url: "/media/sp_essential-island-budget-explorer.jpg",
    localPath: "/media/sp_essential-island-budget-explorer.jpg",
    alt: "Iconic blue passenger train winding through lush Sri Lankan hill country and tea estates",
    title: "Essential Island Explorer - Smart Budget Discovery",
    category: "special-package",
  },
  "knuckles-wilderness-adventure-trek": {
    key: "sp_knuckles-wilderness-adventure-trek",
    url: "/media/sp_knuckles-wilderness-adventure-trek.jpg",
    localPath: "/media/sp_knuckles-wilderness-adventure-trek.jpg",
    alt: "Hikers trekking across mist-shrouded peaks and cloud forests in Knuckles Mountain Range",
    title: "Knuckles Mountain Wilderness Adventure Trek",
    category: "special-package",
  },
  "bespoke-private-island-immersion": {
    key: "sp_bespoke-private-island-immersion",
    url: "/media/sp_bespoke-private-island-immersion.jpg",
    localPath: "/media/sp_bespoke-private-island-immersion.jpg",
    alt: "Luxury private beach cabana and pristine turquoise ocean in southern Sri Lanka",
    title: "Bespoke Private Island Immersion",
    category: "special-package",
  },
};

export const SERVICE_MEDIA: Record<string, MediaAsset> = {
  "hotel-reservations": {
    key: "service_hotel-reservations",
    url: "/media/service_hotel-reservations.jpg",
    localPath: "/media/service_hotel-reservations.jpg",
    alt: "Luxury Ceylon boutique tea bungalow with private infinity pool overlooking misty hills",
    title: "Hotel Reservations",
    category: "service",
  },
  "visa-assistance": {
    key: "service_visa-assistance",
    url: "/media/service_visa-assistance.jpg",
    localPath: "/media/service_visa-assistance.jpg",
    alt: "Passport, official Sri Lanka ETA tourist visa clearance and bespoke itinerary",
    title: "Visa Assistance",
    category: "service",
  },
  "air-ticketing": {
    key: "service_air-ticketing",
    url: "/media/service_air-ticketing.jpg",
    localPath: "/media/service_air-ticketing.jpg",
    alt: "Scenic amphibian seaplane landing on emerald mountain lake in Sri Lanka",
    title: "Air Ticketing",
    category: "service",
  },
  "travel-insurance": {
    key: "service_travel-insurance",
    url: "/media/service_travel-insurance.jpg",
    localPath: "/media/service_travel-insurance.jpg",
    alt: "Travellers guided safely by licensed safari tour guide in Yala National Park",
    title: "Travel Insurance",
    category: "service",
  },
  "value-added-services": {
    key: "service_value-added-services",
    url: "/media/service_value-added-services.jpg",
    localPath: "/media/service_value-added-services.jpg",
    alt: "Luxury private chauffeur-driven VIP touring van outside heritage hotel in Sri Lanka",
    title: "Value Added Services",
    category: "service",
  },
};

export const BLOG_MEDIA: Record<string, MediaAsset> = {
  "secrets-of-sigiriya-ancient-engineering": {
    key: "blog_secrets-of-sigiriya-ancient-engineering",
    url: "/media/blog_secrets-of-sigiriya-ancient-engineering.jpg",
    localPath: "/media/blog_secrets-of-sigiriya-ancient-engineering.jpg",
    alt: "Aerial perspective of Sigiriya Lion Rock palace summit",
    title: "Secrets of Sigiriya: Ancient Engineering in the Sky",
    category: "blog",
  },
  "when-to-visit-sri-lanka-monsoon-guide": {
    key: "blog_when-to-visit-sri-lanka-monsoon-guide",
    url: "/media/blog_when-to-visit-sri-lanka-monsoon-guide.jpg",
    localPath: "/media/blog_when-to-visit-sri-lanka-monsoon-guide.jpg",
    alt: "Sunny tropical beach reflecting calm waters during dry season",
    title: "When to Visit Sri Lanka: A Dual-Monsoon Guide",
    category: "blog",
  },
  "leopards-and-elephants-wildlife-ethics": {
    key: "blog_leopards-and-elephants-wildlife-ethics",
    url: "/media/blog_leopards-and-elephants-wildlife-ethics.jpg",
    localPath: "/media/blog_leopards-and-elephants-wildlife-ethics.jpg",
    alt: "Herd of wild Asian elephants in grassland safari sanctuary",
    title: "Leopards and Elephants: Ethical Wildlife Encounters in Sri Lanka",
    category: "blog",
  },
  "high-grown-ceylon-tea-culture-hatton": {
    key: "blog_high-grown-ceylon-tea-culture-hatton",
    url: "/media/blog_high-grown-ceylon-tea-culture-hatton.jpg",
    localPath: "/media/blog_high-grown-ceylon-tea-culture-hatton.jpg",
    alt: "Emerald green tea terraces and colonial Ceylon tea plantation",
    title: "High-Grown Ceylon: Tea Culture and Bungalow Life in Hatton",
    category: "blog",
  },
};

export const TEAM_MEDIA: Record<string, MediaAsset> = {
  "anthony-founder": {
    key: "anthony_founder_portrait",
    url: "/media/anthony_founder_portrait.jpg",
    localPath: "/media/anthony_founder_portrait.jpg",
    alt: "Anthony - Founder & Licensed National Tourist Guide Lecturer",
    title: "Anthony (Founder)",
    category: "team",
  },
  "chaminda-silva": {
    key: "chaminda_silva_wildlife_naturalist",
    url: "/media/chaminda-silva-wildlife-naturalist.jpg",
    localPath: "/media/chaminda-silva-wildlife-naturalist.jpg",
    alt: "Chaminda Silva - Senior Naturalist & Wildlife Tracking Specialist",
    title: "Chaminda Silva",
    category: "team",
  },
  "dinesh-perera": {
    key: "dinesh_perera_archaeological_lecturer",
    url: "/media/dinesh-perera-archaeological-lecturer.jpg",
    localPath: "/media/dinesh-perera-archaeological-lecturer.jpg",
    alt: "Dinesh Perera - Cultural Heritage & Archaeological Lecturer",
    title: "Dinesh Perera",
    category: "team",
  },
  "rohan-fernando": {
    key: "rohan_fernando_highland_specialist",
    url: "/media/rohan-fernando-highland-specialist.jpg",
    localPath: "/media/rohan-fernando-highland-specialist.jpg",
    alt: "Rohan Fernando - Highland Trails & Tea Heritage Specialist",
    title: "Rohan Fernando",
    category: "team",
  },
};
