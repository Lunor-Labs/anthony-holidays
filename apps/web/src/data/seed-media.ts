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
    url: "/images/journeys/sri-lanka-essence-of-ceylon-sigiriya.jpg",
    localPath: "/media/tour_essence-of-ceylon.jpg",
    alt: "Sigiriya Lion Rock citadel illuminated by morning golden light over lush jungle canopy",
    title: "The Essence of Ceylon",
    category: "tour",
    gallery: [
      {
        key: "gallery_essence_sigiriya_dawn",
        url: "/images/gallery/dawn-over-the-citadel.jpg",
        alt: "Sigiriya Lion Rock citadel rising above morning mist",
      },
      {
        key: "gallery_essence_kandy_temple",
        url: "/images/gallery/chants-in-the-forest-hermitage.jpg",
        alt: "Sacred temple serenity in Kandy",
      },
    ],
  },
  "tea-trails-ancient-temples": {
    key: "tour_tea-trails-ancient-temples",
    url: "/images/journeys/sri-lanka-tea-trails-ancient-temples-highlands.jpg",
    localPath: "/media/tour_tea-trails-ancient-temples.jpg",
    alt: "Lush emerald tea terraces and historic colonial bungalow in Nuwara Eliya and Hatton highlands",
    title: "Tea Trails & Ancient Temples",
    category: "tour",
    gallery: [
      {
        key: "gallery_tea_gal_vihara",
        url: "/images/gallery/granite-serenity-of-gal-vihara.jpg",
        alt: "Ancient Gal Vihara rock-carved Buddha in Polonnaruwa",
      },
      {
        key: "gallery_tea_pedro_valleys",
        url: "/images/gallery/pedro-nuwara-eliya-valleys.jpg",
        alt: "Misty highland tea plantations in Nuwara Eliya",
      },
    ],
  },
  "classic-triangle-and-wildlife": {
    key: "tour_classic-triangle-and-wildlife",
    url: "/images/journeys/sri-lanka-classic-triangle-wildlife-yala.jpg",
    localPath: "/media/tour_classic-triangle-and-wildlife.jpg",
    alt: "Solitary wild Ceylon leopard perched on a granite rock in Yala National Park at golden hour",
    title: "The Classic Triangle & Wildlife",
    category: "tour",
    gallery: [
      {
        key: "gallery_classic_train",
        url: "/images/gallery/highland-morning-express.jpg",
        alt: "Iconic blue mountain train journey from Kandy to Ella",
      },
      {
        key: "gallery_classic_leopard",
        url: "/images/gallery/gaze-of-the-apex-hunter.jpg",
        alt: "Wild Ceylon leopard resting on rocks in Yala National Park",
      },
    ],
  },
  "heritage-and-southern-coast": {
    key: "tour_heritage-and-southern-coast",
    url: "/images/journeys/sri-lanka-heritage-southern-coast-galle.jpg",
    localPath: "/media/tour_heritage-and-southern-coast.jpg",
    alt: "Historic white lighthouse and 17th-century ramparts of Galle Dutch Fort along the Indian Ocean",
    title: "Heritage & Southern Coast",
    category: "tour",
    gallery: [
      {
        key: "gallery_heritage_galle",
        url: "/images/gallery/echoes-of-the-southern-shore.jpg",
        alt: "Colonial ramparts and lighthouse of Galle Dutch Fort",
      },
      {
        key: "gallery_heritage_hikkaduwa",
        url: "/images/gallery/whispers-of-the-palms.jpg",
        alt: "Golden palm-fringed tropical beach along the southern coast",
      },
    ],
  },
  "grand-sri-lankan-loop": {
    key: "tour_grand-sri-lankan-loop",
    url: "/images/journeys/sri-lanka-grand-loop-anuradhapura-stupa.jpg",
    localPath: "/media/tour_grand-sri-lankan-loop.jpg",
    alt: "Ancient sacred Ruwanwelisaya stupa in Anuradhapura glowing under tranquil dawn skies",
    title: "The Grand Sri Lankan Loop",
    category: "tour",
    gallery: [
      {
        key: "gallery_grand_gathering",
        url: "/images/gallery/the-great-gathering.jpg",
        alt: "Wild elephant gathering around the Minneriya reservoir",
      },
      {
        key: "gallery_grand_polonnaruwa",
        url: "/images/gallery/granite-serenity-of-gal-vihara.jpg",
        alt: "Ancient UNESCO ruins of Polonnaruwa",
      },
    ],
  },
  "deep-dive-culture-and-nature": {
    key: "tour_deep-dive-culture-and-nature",
    url: "/images/journeys/sri-lanka-deep-dive-culture-nature-horton-plains.jpg",
    localPath: "/media/tour_deep-dive-culture-and-nature.jpg",
    alt: "Dramatic World's End sheer cliff precipice and misty cloud forest in Horton Plains",
    title: "Deep Dive: Culture & Nature",
    category: "tour",
    gallery: [
      {
        key: "gallery_deep_horton",
        url: "/images/gallery/where-clouds-touch-the-ridge.jpg",
        alt: "Dramatic cloud forests and cliff views at Horton Plains World's End",
      },
      {
        key: "gallery_deep_spice",
        url: "/images/gallery/fragrance-of-true-cinnamon.jpg",
        alt: "Authentic Ceylon cinnamon harvesting and spice gardens",
      },
    ],
  },
  "ramayana-trail-special": {
    key: "tour_ramayana-trail-special",
    url: "/images/journeys/sri-lanka-ramayana-trail-seetha-amman-kovil.jpg",
    localPath: "/media/tour_ramayana-trail-special.jpg",
    alt: "Sacred ornate Seetha Amman Kovil temple nestled in the misty green mountains of Nuwara Eliya",
    title: "The Ramayana Trail Special",
    category: "tour",
    gallery: [
      {
        key: "gallery_ramayana_chants",
        url: "/images/gallery/chants-in-the-forest-hermitage.jpg",
        alt: "Spiritual temple sanctuary and sacred prayer rituals",
      },
      {
        key: "gallery_ramayana_ridge",
        url: "/images/gallery/where-clouds-touch-the-ridge.jpg",
        alt: "Misty highlands and sacred ridges of the central hills",
      },
    ],
  },
  "ultimate-pearl-experience": {
    key: "tour_ultimate-pearl-experience",
    url: "/images/journeys/sri-lanka-ultimate-pearl-experience-wilpattu.jpg",
    localPath: "/media/tour_ultimate-pearl-experience.jpg",
    alt: "Untamed Wilpattu National Park natural sand-rimmed lake villu with wild Asian elephants and banyans",
    title: "The Ultimate Pearl Experience",
    category: "tour",
    gallery: [
      {
        key: "gallery_pearl_elephants",
        url: "/images/gallery/the-great-gathering.jpg",
        alt: "Wild Asian elephants in natural habitat",
      },
      {
        key: "gallery_pearl_marine",
        url: "/images/gallery/sanctuary-by-the-ocean.jpg",
        alt: "Marine turtle conservation sanctuary along the southern coast",
      },
    ],
  },
};

export const SPECIAL_PACKAGE_MEDIA: Record<string, MediaAsset> = {
  "hikkaduwa-marine-conservation-surf": {
    key: "sp_hikkaduwa-marine-conservation-surf",
    url: "/images/packages/sri-lanka-hikkaduwa-marine-conservation-coral.jpg",
    localPath: "/media/sp_hikkaduwa-marine-conservation-surf.jpg",
    alt: "Vibrant coral reef restoration and coastal surfing in Hikkaduwa Marine National Park",
    title: "Hikkaduwa Marine Conservation & Coastal Discovery",
    category: "special-package",
  },
  "southern-sea-turtle-sanctuary-volunteering": {
    key: "sp_southern-sea-turtle-sanctuary-volunteering",
    url: "/images/packages/sri-lanka-sea-turtle-sanctuary-hatchling-release.jpg",
    localPath: "/media/sp_southern-sea-turtle-sanctuary-volunteering.jpg",
    alt: "Endangered baby sea turtle hatchling release at southern Sri Lanka marine sanctuary",
    title: "Southern Sea Turtle Sanctuary Volunteering",
    category: "special-package",
  },
  "essential-island-budget-explorer": {
    key: "sp_essential-island-budget-explorer",
    url: "/images/packages/sri-lanka-essential-island-explorer-blue-train.jpg",
    localPath: "/media/sp_essential-island-budget-explorer.jpg",
    alt: "Iconic blue passenger train winding through lush Sri Lankan hill country and tea estates",
    title: "Essential Island Explorer - Smart Budget Discovery",
    category: "special-package",
  },
  "knuckles-wilderness-adventure-trek": {
    key: "sp_knuckles-wilderness-adventure-trek",
    url: "/images/packages/sri-lanka-knuckles-mountain-wilderness-trek.jpg",
    localPath: "/media/sp_knuckles-wilderness-adventure-trek.jpg",
    alt: "Hikers trekking across mist-shrouded peaks and cloud forests in Knuckles Mountain Range",
    title: "Knuckles Mountain Wilderness Adventure Trek",
    category: "special-package",
  },
  "bespoke-private-island-immersion": {
    key: "sp_bespoke-private-island-immersion",
    url: "/images/packages/sri-lanka-bespoke-private-island-luxury-beach.jpg",
    localPath: "/media/sp_bespoke-private-island-immersion.jpg",
    alt: "Luxury private beach cabana and pristine turquoise ocean in southern Sri Lanka",
    title: "Bespoke Private Island Immersion",
    category: "special-package",
  },
};

export const SERVICE_MEDIA: Record<string, MediaAsset> = {
  "hotel-reservations": {
    key: "service_hotel-reservations",
    url: "/images/services/sri-lanka-service-hotel-reservations.jpg",
    localPath: "/media/service_hotel-reservations.jpg",
    alt: "Luxury Ceylon boutique tea bungalow with private infinity pool overlooking misty hills",
    title: "Hotel Reservations",
    category: "service",
  },
  "visa-assistance": {
    key: "service_visa-assistance",
    url: "/images/services/sri-lanka-service-visa-assistance.jpg",
    localPath: "/media/service_visa-assistance.jpg",
    alt: "Passport, official Sri Lanka ETA tourist visa clearance and bespoke itinerary",
    title: "Visa Assistance",
    category: "service",
  },
  "air-ticketing": {
    key: "service_air-ticketing",
    url: "/images/services/sri-lanka-service-air-ticketing.jpg",
    localPath: "/media/service_air-ticketing.jpg",
    alt: "Scenic amphibian seaplane landing on emerald mountain lake in Sri Lanka",
    title: "Air Ticketing",
    category: "service",
  },
  "travel-insurance": {
    key: "service_travel-insurance",
    url: "/images/services/sri-lanka-service-travel-insurance.jpg",
    localPath: "/media/service_travel-insurance.jpg",
    alt: "Travellers guided safely by licensed safari tour guide in Yala National Park",
    title: "Travel Insurance",
    category: "service",
  },
  "value-added-services": {
    key: "service_value-added-services",
    url: "/images/services/sri-lanka-service-value-added-services.jpg",
    localPath: "/media/service_value-added-services.jpg",
    alt: "Luxury private chauffeur-driven VIP touring van outside heritage hotel in Sri Lanka",
    title: "Value Added Services",
    category: "service",
  },
};

export const BLOG_MEDIA: Record<string, MediaAsset> = {
  "secrets-of-sigiriya-ancient-engineering": {
    key: "blog_secrets-of-sigiriya-ancient-engineering",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    localPath: "/media/blog_secrets-of-sigiriya-ancient-engineering.jpg",
    alt: "Aerial perspective of Sigiriya Lion Rock palace summit",
    title: "Secrets of Sigiriya: Ancient Engineering in the Sky",
    category: "blog",
  },
  "when-to-visit-sri-lanka-monsoon-guide": {
    key: "blog_when-to-visit-sri-lanka-monsoon-guide",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    localPath: "/media/blog_when-to-visit-sri-lanka-monsoon-guide.jpg",
    alt: "Sunny tropical beach reflecting calm waters during dry season",
    title: "When to Visit Sri Lanka: A Dual-Monsoon Guide",
    category: "blog",
  },
  "leopards-and-elephants-wildlife-ethics": {
    key: "blog_leopards-and-elephants-wildlife-ethics",
    url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1200&q=80",
    localPath: "/media/blog_leopards-and-elephants-wildlife-ethics.jpg",
    alt: "Herd of wild Asian elephants in grassland safari sanctuary",
    title: "Leopards and Elephants: Ethical Wildlife Encounters in Sri Lanka",
    category: "blog",
  },
  "high-grown-ceylon-tea-culture-hatton": {
    key: "blog_high-grown-ceylon-tea-culture-hatton",
    url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
    localPath: "/media/blog_high-grown-ceylon-tea-culture-hatton.jpg",
    alt: "Emerald green tea terraces and colonial Ceylon tea plantation",
    title: "High-Grown Ceylon: Tea Culture and Bungalow Life in Hatton",
    category: "blog",
  },
};

export const TEAM_MEDIA: Record<string, MediaAsset> = {
  "anthony-founder": {
    key: "anthony_founder_portrait",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    localPath: "/media/anthony_founder_portrait.jpg",
    alt: "Anthony - Founder & Licensed National Tourist Guide Lecturer",
    title: "Anthony (Founder)",
    category: "team",
  },
};
