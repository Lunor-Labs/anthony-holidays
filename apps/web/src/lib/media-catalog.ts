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
    url: "/images/gallery/dawn-over-the-citadel.jpg",
    localPath: "/images/gallery/dawn-over-the-citadel.jpg",
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
    url: "/images/gallery/granite-serenity-of-gal-vihara.jpg",
    localPath: "/images/gallery/granite-serenity-of-gal-vihara.jpg",
    alt: "Buddhist temple stupa and heritage Sri Lanka",
    title: "Intro Section - Temple",
    category: "section",
  },
  introBeach: {
    key: "section_intro_beach",
    url: "/images/gallery/sanctuary-by-the-ocean.jpg",
    localPath: "/images/gallery/sanctuary-by-the-ocean.jpg",
    alt: "Tropical beach in Sri Lanka",
    title: "Intro Section - Beach",
    category: "section",
  },
  introTea: {
    key: "section_intro_tea",
    url: "/images/gallery/pedro-nuwara-eliya-valleys.jpg",
    localPath: "/images/gallery/pedro-nuwara-eliya-valleys.jpg",
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
  url: "/images/gallery/dawn-over-the-citadel.jpg",
  localPath: "/images/gallery/dawn-over-the-citadel.jpg",
  alt: "Anthony Holidays Ceylon Travel",
  title: "Anthony Holidays Default Media",
  category: "default",
};
