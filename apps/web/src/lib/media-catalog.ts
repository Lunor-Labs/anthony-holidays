/**
 * Anthony Holidays - Static UI Media Catalog
 * Contains UI banners, background covers, and fallback placeholders for layout components.
 * Dynamic content (tours, special packages, services, journal, team) is stored in the database.
 */

export interface MediaAsset {
  key: string;
  url: string;
  alt: string;
  title?: string;
  category?: string;
  localPath?: string;
}

/**
 * UI Heroes & Landing Page Banners
 */
export const HERO_MEDIA = {
  homeHero: {
    key: "hero_home",
    url: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1920&q=85",
    alt: "Sigiriya Rock Fortress rising majestically from the Sri Lankan jungle",
    title: "Home Hero Banner",
    category: "hero",
  },
  aboutHero: {
    key: "hero_about",
    url: "/images/about/sri-lanka-ceylon-heritage-about-hero.jpg",
    localPath: "/images/about/sri-lanka-ceylon-heritage-about-hero.jpg",
    alt: "Historic Nine Arch Bridge in Demodara at golden sunrise with blue passenger train in Sri Lanka",
    title: "About Hero Banner",
    category: "hero",
  },
  ctaBackground: {
    key: "hero_cta_bg",
    url: "/images/sri-lanka-warm-authentic-welcome.jpg",
    localPath: "/images/sri-lanka-warm-authentic-welcome.jpg",
    alt: "Warm authentic welcome by Sri Lankan host greeting travellers with floral garland",
    title: "Call To Action Background",
    category: "hero",
  },
};

/**
 * Editorial & Section Highlights
 */
export const SECTION_MEDIA = {
  introTemple: {
    key: "section_intro_temple",
    url: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=600&q=80",
    alt: "Buddhist temple stupa and heritage Sri Lanka",
    title: "Intro Section - Temple",
    category: "section",
  },
  introBeach: {
    key: "section_intro_beach",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    alt: "Tropical beach in Sri Lanka",
    title: "Intro Section - Beach",
    category: "section",
  },
  introTea: {
    key: "section_intro_tea",
    url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
    alt: "Tea plantation hills in Sri Lanka",
    title: "Intro Section - Tea",
    category: "section",
  },
  philosophyTemple: {
    key: "section_philosophy_temple",
    url: "/images/about/sri-lanka-licensed-guide-lecturer-philosophy.jpg",
    localPath: "/images/about/sri-lanka-licensed-guide-lecturer-philosophy.jpg",
    alt: "Licensed National Tourist Guide Lecturer sharing cultural heritage with travellers at ancient temple ruins",
    title: "Philosophy Section - Living Heritage",
    category: "section",
  },
  travelBeyondOrdinary: {
    key: "section_travel_beyond_ordinary",
    url: "/images/sri-lanka-travel-beyond-ordinary.jpg",
    localPath: "/images/sri-lanka-travel-beyond-ordinary.jpg",
    alt: "Traveller gazing at dramatic coastal rock formations with Anthony Holidays Sri Lanka",
    title: "Travel Beyond The Ordinary - Coastal Exploration",
    category: "section",
  },
};

/**
 * Fallback Default Media Asset
 */
export const DEFAULT_MEDIA: MediaAsset = {
  key: "default_ceylon_cover",
  url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80",
  localPath: "/media/tour_essence-of-ceylon.jpg",
  alt: "Anthony Holidays Ceylon Travel",
  title: "Anthony Holidays Default Media",
  category: "default",
};
