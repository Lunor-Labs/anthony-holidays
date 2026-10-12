export interface TourDetailData {
  title: string;
  slug: string;
  tagline?: string;
  excerpt: string;
  description: string;
  duration: { days: number; nights: number };
  destinations: string[];
  coverImage: string;
  alt: string;
  gallery: { src: string; alt: string }[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    locations?: string;
    accommodation?: string;
    meals?: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  travelInfo: string;
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const toursData: Record<string, TourDetailData> = {
  "essence-of-ceylon": {
    title: "The Essence of Ceylon",
    slug: "essence-of-ceylon",
    tagline: "Short on time, but hungry for adventure?",
    excerpt:
      "Experience the iconic Lion Rock, the last kingdom of Kandy, and the spiritual heart of the island in just three unforgettable days.",
    description: `Short on time, but hungry for adventure? Experience the iconic Lion Rock, the last kingdom of Kandy, and the spiritual heart of the island in just three unforgettable days.

Guided by our Licensed National Tourist Guide Lecturers, you won't merely view monuments through a bus window; you will understand the hydraulic genius of 5th-century Sigiriya and witness the living religious traditions of the Temple of the Sacred Tooth Relic. Designed for travellers with limited time who refuse to compromise on intellectual depth or private comfort.`,
    duration: { days: 3, nights: 4 },
    destinations: ["Sigiriya", "Dambulla", "Kandy", "Peradeniya"],
    coverImage:
      "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1600&q=85",
    alt: "Sigiriya Lion Rock Fortress rising above Sri Lanka's jungle",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1200&q=80",
        alt: "Ancient temple carvings Sri Lanka",
      },
      {
        src: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&q=80",
        alt: "Temple of the Tooth Kandy",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & The Lion's Citadel",
        description:
          'Upon arrival at Bandaranaike International Airport (BIA), you will be met by your expert guide. Drive directly to the Cultural Triangle. Afternoon ascent to the 5th-century Sigiriya Rock Fortress. Your guide will bring the ancient frescoes and the "Cloud Maidens" to life, explaining the engineering marvel of King Kashyapa’s palace in the sky. Sunset at the top.',
        locations: "BIA Airport, Sigiriya",
        accommodation: "Heritage Hotel, Sigiriya / Dambulla",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "The Dambulla Caves & Kandy",
        description:
          "Morning visit to the Dambulla Royal Cave Temple, a UNESCO site with stunning Buddha statues and ceiling paintings. Proceed to Kandy, the last capital of the Sinhalese kings. In the evening, witness the Temple of the Tooth Relic (Sri Dalada Maligawa) during the puja ceremony, understanding the deep spiritual significance of this sacred site.",
        locations: "Dambulla, Kandy",
        accommodation: "Boutique Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Culture & Departure",
        description:
          "Morning tour of the Royal Botanical Gardens in Peradeniya and a visit to a batik factory. Enjoy panoramic views of the city before your transfer back to the airport for your departure.",
        locations: "Peradeniya, Kandy, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Dedicated Licensed National Tourist Guide Lecturer throughout",
      "Private air-conditioned luxury vehicle with fuel and highway tolls",
      "All site entry permits and UNESCO monument passes",
      "Handpicked boutique & heritage accommodations",
      "Daily breakfast and scheduled dinners",
      "24/7 personal trip concierge support",
    ],
    exclusions: [
      "International flights to/from Colombo",
      "Sri Lanka ETA Tourist Visa",
      "Personal travel insurance (recommended)",
      "Alcoholic beverages and personal expenses",
    ],
    travelInfo:
      "Ideal year-round. Comfortable walking shoes and respectful temple attire (covering shoulders and knees) required for Dambulla and the Temple of the Tooth.",
    faqs: [
      {
        question: "Is the climb up Sigiriya Rock physically demanding?",
        answer:
          "There are approximately 1,200 steps to the summit. Your guide paces the climb gently with stops at the Mirror Wall and Lion Paws.",
      },
      {
        question: "Can this itinerary be extended by an extra day?",
        answer:
          "Yes, all our itineraries are private and fully customizable. We can easily add hill country or beach relaxation days.",
      },
    ],
    relatedSlugs: [
      "tea-trails-ancient-temples",
      "classic-triangle-and-wildlife",
    ],
  },

  "tea-trails-ancient-temples": {
    title: "Tea Trails & Ancient Temples",
    slug: "tea-trails-ancient-temples",
    tagline:
      "From the golden plains of the north to the misty peaks of the hill country.",
    excerpt: "Taste the world’s finest tea and walk in the footsteps of kings.",
    description: `From the golden plains of the north to the misty peaks of the hill country. Taste the world’s finest tea and walk in the footsteps of kings.

This five-day private journey bridges the architectural grandiosity of Sri Lanka’s medieval kingdom of Polonnaruwa with the cool, misty elegance of Nuwara Eliya’s colonial tea plantations. Accompanied by a dedicated National Guide Lecturer, you will explore ancient hydraulic engineering, spice pharmacology, and the authentic art of Ceylon tea-making.`,
    duration: { days: 5, nights: 4 },
    destinations: [
      "Sigiriya",
      "Polonnaruwa",
      "Kandy",
      "Nuwara Eliya",
      "Ramboda",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85",
    alt: "Tea plantations in the misty highlands of Sri Lanka",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
        alt: "Sigiriya Rock Fortress",
      },
      {
        src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
        alt: "Highland tea country",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya",
        description:
          'Upon arrival at Bandaranaike International Airport (BIA), you will be met by your expert guide. Drive directly to the Cultural Triangle. Afternoon ascent to the 5th-century Sigiriya Rock Fortress. Your guide will bring the ancient frescoes and the "Cloud Maidens" to life, explaining the engineering marvel of King Kashyapa’s palace in the sky. Sunset at the top.',
        locations: "BIA Airport, Sigiriya",
        accommodation: "Resort in Sigiriya",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Ancient Polonnaruwa",
        description:
          "A guided tour of the Medieval Capital of Polonnaruwa. With your guide, explore the massive Gal Vihara rock-carved Buddha statues and the ruins of the ancient council chambers, learning about the sophisticated hydraulic civilization that thrived here.",
        locations: "Polonnaruwa, Habarana",
        accommodation: "Resort in Sigiriya / Habarana",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Kandy – The Hill Capital",
        description:
          "Drive to Kandy via a spice garden in Matale. Learn about Sri Lanka’s famous spices and their Ayurvedic uses. Evening visit to the Temple of the Tooth.",
        locations: "Matale, Kandy",
        accommodation: "Heritage Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "The Little England",
        description:
          "Ascend to Nuwara Eliya. Visit a tea plantation and factory to see how Ceylon Tea is made. Sip a fresh cup right where it’s grown. Your guide will explain the colonial history of this British-era hill station.",
        locations: "Nuwara Eliya",
        accommodation: "Colonial Boutique Hotel, Nuwara Eliya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Scenic Descent & Departure",
        description:
          "Drive through the stunning Ramboda Pass to the airport for your flight.",
        locations: "Ramboda, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Licensed National Tourist Guide Lecturer throughout",
      "Private air-conditioned luxury vehicle and dedicated chauffeur service",
      "All entrance fees to Sigiriya, Polonnaruwa, and Temple of the Tooth",
      "Factory tour, tea tasting session, and spice garden botanical lecture",
      "4 nights accommodation in handpicked heritage properties",
      "Daily breakfast and dinners",
    ],
    exclusions: [
      "International flights",
      "Visa fees & travel insurance",
      "Camera/video fees at designated temples",
      "Gratuities and personal extras",
    ],
    travelInfo:
      "Nuwara Eliya sits at 1,868m elevation; temperatures are cool in the evenings (12-16°C), so a light fleece or sweater is recommended.",
    faqs: [
      {
        question:
          "Can we sample different grades of Ceylon tea during the factory tour?",
        answer:
          "Yes, the factory visit includes an expert tasting session of Orange Pekoe, Broken Orange Pekoe, and artisanal Silver Tips.",
      },
    ],
    relatedSlugs: ["essence-of-ceylon", "classic-triangle-and-wildlife"],
  },

  "classic-triangle-and-wildlife": {
    title: "The Classic Triangle & Wildlife",
    slug: "classic-triangle-and-wildlife",
    tagline: "History meets the wild.",
    excerpt:
      "Explore the Cultural Triangle, relax in the hills, and finish with a thrilling safari in Yala.",
    description: `History meets the wild. Explore the Cultural Triangle, relax in the hills, and finish with a thrilling safari in Yala.

A seamless six-day synthesis of Sri Lanka’s greatest highlights: the ancient rock fortress of Sigiriya, an authentic rural catamaran trek in Hiriwadunna, the spiritual capital of Kandy, the world-famous highland train ride to Ella, and an exhilarating leopard and elephant safari in Yala National Park.`,
    duration: { days: 6, nights: 5 },
    destinations: [
      "Sigiriya",
      "Hiriwadunna",
      "Dambulla",
      "Kandy",
      "Ella",
      "Yala",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85",
    alt: "Wild Sri Lankan leopard in Yala National Park",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
        alt: "Sigiriya Rock",
      },
      {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
        alt: "Scenic mountain railway",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya",
        description:
          "Upon arrival at Bandaranaike International Airport (BIA), you will be met by your expert guide. Drive directly to the Cultural Triangle.",
        locations: "BIA Airport, Sigiriya",
        accommodation: "Resort, Sigiriya",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Sigiriya & Hiriwadunna",
        description:
          "Morning climb of Sigiriya Rock. Afternoon, experience a Hiriwadunna Village Trek, a catamaran ride and bullock cart experience through an authentic Sri Lankan village, organized to show you the real rural lifestyle.",
        locations: "Sigiriya, Hiriwadunna",
        accommodation: "Resort, Sigiriya",
        meals: "Breakfast & Traditional Lunch",
      },
      {
        day: 3,
        title: "Dambulla & Kandy",
        description:
          "Visit Dambulla Cave Temple. Proceed to Kandy for a cultural dance show in the evening.",
        locations: "Dambulla, Kandy",
        accommodation: "Boutique Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "Train to Ella",
        description:
          "Take the scenic train from Kandy to Ella (one of the most beautiful train rides in the world). Your guide will point out the waterfalls and tea estates along the way.",
        locations: "Kandy, Nanu Oya, Ella",
        accommodation: "Eco-lodge / Mountain View Inn, Ella",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Yala National Park",
        description:
          "Morning drive to Yala. Afternoon Jeep Safari. With your guide's expert eye, spot leopards, elephants, and sloth bears in their natural habitat.",
        locations: "Ella, Yala",
        accommodation: "Safari Lodge / Camp, Yala",
        meals: "Breakfast & Dinner",
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to the airport.",
        locations: "Yala, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Licensed National Tourist Guide Lecturer throughout",
      "Private 4x4 Safari Jeep with dedicated park tracker in Yala",
      "Reserved scenic mountain train tickets",
      "Hiriwadunna authentic village catamaran & culinary experience",
      "All monument and National Park entry fees",
      "5 nights quality accommodation with daily breakfast and dinners",
    ],
    exclusions: [
      "International flights & visa fees",
      "Travel insurance",
      "Beverages and personal spending",
    ],
    travelInfo:
      "Yala safari operates in open-top 4x4 vehicles. Sunscreen, hats, and binoculars are highly recommended.",
    faqs: [
      {
        question: "What are the chances of seeing a leopard in Yala?",
        answer:
          "Yala National Park has one of the highest leopard densities in the world. While sightings are in the wild and never 100% guaranteed, afternoon game drives have very strong sighting records.",
      },
    ],
    relatedSlugs: ["grand-sri-lankan-loop", "heritage-and-southern-coast"],
  },

  "heritage-and-southern-coast": {
    title: "Heritage & Southern Coast",
    slug: "heritage-and-southern-coast",
    tagline: "From the ancient kingdoms to the golden beaches of the south.",
    excerpt: "Immerse yourself in culture, then unwind by the Indian Ocean.",
    description: `From the ancient kingdoms to the golden beaches of the south. Immerse yourself in culture, then unwind by the Indian Ocean.

An expansive 7-day itinerary traversing 2,500 years of civilization: from the holy Bodhi tree in Anuradhapura and the colossal 12m Aukana Buddha, through misty highland tea estates and Udawalawe’s elephant herds, culminating in colonial Galle Dutch Fort and the relaxing beaches of our hometown, Hikkaduwa.`,
    duration: { days: 7, nights: 6 },
    destinations: [
      "Anuradhapura",
      "Aukana",
      "Sigiriya",
      "Kandy",
      "Nuwara Eliya",
      "Udawalawe",
      "Galle",
      "Hikkaduwa",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=85",
    alt: "Galle Fort ramparts and ocean waves Sri Lanka",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&q=80",
        alt: "Ancient stupa Anuradhapura",
      },
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        alt: "Hikkaduwa golden beach",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Anuradhapura",
        description:
          "Transfer directly to Anuradhapura, the first capital of Sri Lanka. Your guide will explain the sacred Jaya Sri Maha Bodhi tree, the oldest living human-planted tree in the world.",
        locations: "BIA Airport, Anuradhapura",
        accommodation: "Heritage Hotel, Anuradhapura",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Aukana & Sigiriya",
        description:
          "Visit the magnificent 12m standing Buddha statue of Aukana. Proceed to Sigiriya for the climb.",
        locations: "Aukana, Sigiriya",
        accommodation: "Resort, Sigiriya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Kandy City Tour",
        description:
          "Drive to Kandy. Visit the market and the Temple of the Tooth.",
        locations: "Kandy",
        accommodation: "Boutique Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "Nuwara Eliya",
        description:
          "Drive through the hills. Visit Seetha Amman Temple (linked to the Ramayana epic) and a tea factory.",
        locations: "Nuwara Eliya",
        accommodation: "Heritage Hotel, Nuwara Eliya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Udawalawe Safari",
        description:
          "Drive down to Udawalawe. Famous for its large elephant population, this park offers excellent viewing.",
        locations: "Udawalawe",
        accommodation: "Eco Resort, Udawalawe",
        meals: "Breakfast & Dinner",
      },
      {
        day: 6,
        title: "Galle Fort",
        description:
          "Morning departure to Galle Dutch Fort. Walk the ramparts with your guide to uncover the colonial history of the Portuguese, Dutch, and British. End the day in Hikkaduwa.",
        locations: "Galle, Hikkaduwa",
        accommodation: "Beachfront Hotel, Hikkaduwa",
        meals: "Breakfast",
      },
      {
        day: 7,
        title: "Departure",
        description: "Relax on the coast before your transfer to the airport.",
        locations: "Hikkaduwa, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Licensed National Tourist Guide Lecturer throughout",
      "Private air-conditioned vehicle with dedicated chauffeur guide",
      "Udawalawe National Park private jeep safari",
      "All entrance fees to Anuradhapura, Aukana, Sigiriya, Kandy, and Udawalawe",
      "6 nights premium boutique and beach accommodations",
      "Daily breakfast and scheduled dinners",
    ],
    exclusions: [
      "International flights",
      "Visas",
      "Travel insurance",
      "Lunches & personal drinks",
    ],
    travelInfo:
      "End your journey where Anthony Holidays began - on the relaxing coastal shores of Hikkaduwa.",
    faqs: [
      {
        question: "How does Udawalawe compare to Yala for elephant viewing?",
        answer:
          "Udawalawe has a resident population of over 500 elephants and is centered around a large reservoir, making elephant sightings virtually guaranteed year-round.",
      },
    ],
    relatedSlugs: ["grand-sri-lankan-loop", "deep-dive-culture-and-nature"],
  },

  "grand-sri-lankan-loop": {
    title: "The Grand Sri Lankan Loop",
    slug: "grand-sri-lankan-loop",
    tagline: "The complete package.",
    excerpt:
      "Ancient ruins, hill country tea, wildlife safaris, and Dutch colonial history, all curated for the discerning traveler.",
    description: `The complete package. Ancient ruins, hill country tea, wildlife safaris, and Dutch colonial history, all curated for the discerning traveler.

An eight-day definitive island loop taking in ancient kingdoms, wild elephant gatherings in Minneriya, the Ella Gap and Nine Arch Bridge, Rawana waterfalls, Yala leopards, sea turtle conservation, and the cobblestoned ramparts of Galle Fort.`,
    duration: { days: 8, nights: 7 },
    destinations: [
      "Sigiriya",
      "Polonnaruwa",
      "Minneriya",
      "Dambulla",
      "Kandy",
      "Ella",
      "Yala",
      "Mirissa",
      "Galle",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1600&q=85",
    alt: "Galle lighthouse and coastal ramparts at sunset",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
        alt: "Wildlife safari Yala",
      },
      {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
        alt: "Nine Arch Bridge Ella",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya",
        description:
          "Upon arrival at Bandaranaike International Airport (BIA), you will be met by your expert guide. Drive directly to the Cultural Triangle.",
        locations: "BIA, Sigiriya",
        accommodation: "Resort in Sigiriya",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Polonnaruwa & Minneriya",
        description:
          "Visit the ancient city of Polonnaruwa. Afternoon jeep safari in Minneriya National Park (famous for the Gathering of wild elephants during the dry season).",
        locations: "Polonnaruwa, Minneriya",
        accommodation: "Resort in Sigiriya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Dambulla & Kandy",
        description:
          "Royal cave temple and Kandy city tour.",
        locations: "Dambulla, Kandy",
        accommodation: "Heritage Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "Ella & Nine Arch Bridge",
        description:
          "Train to Ella. Visit the iconic Nine Arch Bridge and Little Adam's Peak.",
        locations: "Ella",
        accommodation: "Boutique Mountain Hotel, Ella",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Rawana Falls & Yala",
        description:
          "Visit Rawana Falls linked to the Ramayana legend. Proceed to Yala for an evening safari.",
        locations: "Ella, Yala",
        accommodation: "Safari Lodge, Yala",
        meals: "Breakfast & Dinner",
      },
      {
        day: 6,
        title: "Mirissa Beach",
        description:
          "Transfer to the beach town of Mirissa. Relax and sunset watching.",
        locations: "Mirissa",
        accommodation: "Beach Resort, Mirissa",
        meals: "Breakfast",
      },
      {
        day: 7,
        title: "Galle Fort & Turtle Hatchery",
        description:
          "Visit a turtle conservation project and the Galle Dutch Fort.",
        locations: "Kosgoda, Galle",
        accommodation: "Heritage Hotel, Galle / Hikkaduwa",
        meals: "Breakfast",
      },
      {
        day: 8,
        title: "Departure",
        description:
          "Transfer to the airport.",
        locations: "Galle, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Licensed National Tourist Guide Lecturer throughout",
      "Private air-conditioned luxury vehicle throughout",
      "Minneriya elephant safari & Yala leopard safari with private 4x4 jeeps",
      "Scenic mountain train tickets",
      "Turtle hatchery conservation entrance",
      "7 nights accommodation in curated boutique hotels",
      "Meals as detailed in itinerary",
    ],
    exclusions: [
      "International flights",
      "Visa",
      "Travel insurance",
      "Personal expenses",
    ],
    travelInfo:
      "This clockwise circuit gives travellers a balanced blend of history, highlands, safari, and beaches without backtracking.",
    faqs: [
      {
        question: "When is the Minneriya Elephant Gathering at its peak?",
        answer:
          "The gathering typically peaks from July to October, when hundreds of elephants congregate around the receding reservoir waters.",
      },
    ],
    relatedSlugs: [
      "classic-triangle-and-wildlife",
      "deep-dive-culture-and-nature",
    ],
  },

  "deep-dive-culture-and-nature": {
    title: "Deep Dive: Culture & Nature",
    slug: "deep-dive-culture-and-nature",
    tagline: "Slow down and see it all.",
    excerpt:
      "This leisurely-paced tour includes the cultural north, the misty central hills, and a deep south beach retreat.",
    description: `Slow down and see it all. This leisurely-paced tour includes the cultural north, the misty central hills, and a deep south beach retreat.

A 9-day journey crafted for travellers who value authentic encounters and unhurried immersion. Explore ancient monastic ruins, trek to the 1,000-metre drop of World's End in Horton Plains, and unwind on the secluded southern beaches of Tangalle.`,
    duration: { days: 9, nights: 8 },
    destinations: [
      "Negombo",
      "Anuradhapura",
      "Sigiriya",
      "Polonnaruwa",
      "Kandy",
      "Nuwara Eliya",
      "Horton Plains",
      "Ella",
      "Yala",
      "Tangalle",
      "Galle",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1600&q=85",
    alt: "Highland cloud forest and dramatic landscapes Sri Lanka",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
        alt: "Sigiriya Rock",
      },
      {
        src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
        alt: "Yala wildlife",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Negombo",
        description: "Relax by the beach and see the fishing villages.",
        locations: "Negombo",
        accommodation: "Seaside Hotel, Negombo",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Anuradhapura",
        description: "Explore the ancient city.",
        locations: "Anuradhapura",
        accommodation: "Heritage Hotel, Anuradhapura",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Sigiriya & Polonnaruwa",
        description: "Full day cultural immersion in the triangle.",
        locations: "Sigiriya, Polonnaruwa",
        accommodation: "Eco Resort, Sigiriya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "Kandy",
        description: "Peradeniya Gardens and Temple of the Tooth.",
        locations: "Kandy",
        accommodation: "Boutique Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Nuwara Eliya",
        description: "Tea factory and waterfalls.",
        locations: "Nuwara Eliya",
        accommodation: "Highland Resort, Nuwara Eliya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 6,
        title: "Horton Plains (World’s End)",
        description:
          "Early morning trek to World’s End, a sheer cliff with a dramatic drop. Your guide will explain the unique biodiversity of the cloud forest.",
        locations: "Horton Plains, Ella",
        accommodation: "Mountain Retreat, Ella",
        meals: "Breakfast & Picnic Lunch",
      },
      {
        day: 7,
        title: "Ella to Yala",
        description:
          "Drive down the hills to the south. Evening safari in Yala.",
        locations: "Ella, Yala",
        accommodation: "Safari Lodge, Yala",
        meals: "Breakfast & Dinner",
      },
      {
        day: 8,
        title: "Tangalle / Beach Stay",
        description: "Relax in a quieter part of the southern coast.",
        locations: "Tangalle",
        accommodation: "Beachfront Boutique Hotel, Tangalle",
        meals: "Breakfast",
      },
      {
        day: 9,
        title: "Galle & Departure",
        description: "Galle Dutch fort tour and airport transfer.",
        locations: "Galle, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Licensed National Tourist Guide Lecturer throughout",
      "Private air-conditioned vehicle throughout",
      "Horton Plains National Park permit and guided trek",
      "Yala National Park private 4x4 game drive",
      "All cultural site entrance tickets",
      "8 nights premium accommodation",
    ],
    exclusions: [
      "International flights",
      "Visa",
      "Travel insurance",
      "Personal tips",
    ],
    travelInfo:
      "Horton Plains trek is approximately 9km on circular trail. Early morning start (6:00 AM) ensures optimal visibility before cloud cover arrives.",
    faqs: [
      {
        question: "Is Horton Plains suitable for children or seniors?",
        answer:
          "The trail is undulating with some rocky sections. A moderate level of fitness is recommended, and good walking shoes are essential.",
      },
    ],
    relatedSlugs: ["grand-sri-lankan-loop", "ultimate-pearl-experience"],
  },

  "ramayana-trail-special": {
    title: "The Ramayana Trail Special",
    slug: "ramayana-trail-special",
    tagline: "Walk the path of the Ramayana epic.",
    excerpt:
      "Discover the spiritual sites connected to Rama, Sita, and Hanuman, blended with Sri Lanka’s natural beauty.",
    description: `Walk the path of the Ramayana epic. Discover the spiritual sites connected to Rama, Sita, and Hanuman, blended with Sri Lanka’s natural beauty.

A sacred ten-day pilgrimage guided by scholars of epic history and mythology. Visit the Munneswaram Kovil, the Cobra Hood Cave in Sigiriya, the Bhakta Hanuman Temple in Ramboda, the Seetha Amman temple in Nuwara Eliya, Rawana caves in Ella, the multi-faith shrine of Kataragama, and the red soils of Ussangoda where King Ravana landed his legendary Peacock Chariot.`,
    duration: { days: 10, nights: 9 },
    destinations: [
      "Chilaw",
      "Anuradhapura",
      "Mihintale",
      "Sigiriya",
      "Dambulla",
      "Kandy",
      "Ramboda",
      "Nuwara Eliya",
      "Ella",
      "Kataragama",
      "Ussangoda",
      "Galle",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1600&q=85",
    alt: "Sacred temple sanctuary and Hindu kovil Sri Lanka",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
        alt: "Sigiriya Cobra Hood Cave",
      },
      {
        src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
        alt: "Ramboda tea hills",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Chilaw (Munneswaram)",
        description:
          "Visit the Munneswaram Kovil, a temple dedicated to Lord Shiva and Rama.",
        locations: "Chilaw, Cultural Triangle",
        accommodation: "Heritage Hotel, Cultural Triangle",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Anuradhapura (Mihintale)",
        description: "Visit the cradle of Buddhism.",
        locations: "Mihintale, Anuradhapura",
        accommodation: "Heritage Hotel, Cultural Triangle",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Sigiriya (Cobra Hood Cave)",
        description:
          "Climb Sigiriya and visit the Cobra Hood Cave, believed to have been used by Sita. Evening visit to the Golden Temple of Dambulla.",
        locations: "Sigiriya, Dambulla",
        accommodation: "Resort in Sigiriya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "Kandy (Shri Bhakta Hanuman)",
        description:
          "Visit the Bhakta Hanuman Temple in Ramboda. Proceed to Kandy.",
        locations: "Ramboda, Kandy",
        accommodation: "Heritage Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Nuwara Eliya (Seetha Amman)",
        description:
          "Visit Seetha Amman Kovil, believed to be the place where Sita was held captive.",
        locations: "Nuwara Eliya, Ashoka Vatika",
        accommodation: "Colonial Hotel, Nuwara Eliya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 6,
        title: "Ella",
        description:
          "Visit Rawana Ella Cave, another site linked to the Ramayana legend.",
        locations: "Ella, Rawana Falls",
        accommodation: "Mountain View Hotel, Ella",
        meals: "Breakfast & Dinner",
      },
      {
        day: 7,
        title: "Kataragama",
        description:
          "Visit the holy city of Kataragama, a sacred place for Hindus, Buddhists, and Muslims.",
        locations: "Kataragama",
        accommodation: "Pilgrim Resort, Kataragama",
        meals: "Breakfast & Dinner",
      },
      {
        day: 8,
        title: "Ussangoda (Meeting Point)",
        description:
          "Visit Ussangoda, a place believed to be where King Ravana landed his Peacock Chariot, It has a distinct red soil.",
        locations: "Ussangoda, Tangalle",
        accommodation: "Beach Resort, Tangalle",
        meals: "Breakfast & Dinner",
      },
      {
        day: 9,
        title: "Galle Fort",
        description: "Historical tour.",
        locations: "Galle, Hikkaduwa",
        accommodation: "Heritage Hotel, Galle",
        meals: "Breakfast & Dinner",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to the airport.",
        locations: "Galle, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Dedicated Licensed National Tourist Guide Lecturer with Ramayana epic expertise",
      "Private air-conditioned vehicle throughout",
      "Special puja participation arrangements at designated kovils",
      "All temple and site entry passes",
      "9 nights comfortable accommodations with pure vegetarian meal options available",
      "Daily breakfast and dinners",
    ],
    exclusions: [
      "International flights",
      "Visa",
      "Travel insurance",
      "Personal pooja donations",
    ],
    travelInfo:
      "Vegetarian and Jain dietary options are readily accommodated throughout this trail. Temples require modest dress removing shoes and hats before entering.",
    faqs: [
      {
        question: "Are vegetarian meals available throughout the trail?",
        answer:
          "Yes, we collaborate with certified restaurants and hotels that cater strictly to pure vegetarian and sattvic requirements upon request.",
      },
    ],
    relatedSlugs: [
      "heritage-and-southern-coast",
      "deep-dive-culture-and-nature",
    ],
  },

  "ultimate-pearl-experience": {
    title: "The Ultimate Pearl Experience",
    slug: "ultimate-pearl-experience",
    tagline: "The perfect Sri Lankan journey.",
    excerpt:
      "Luxury, adventure, wildlife, and history combined into a two-week epic that covers every corner of the island.",
    description: `The perfect Sri Lankan journey. Luxury, adventure, wildlife, and history combined into a two-week epic that covers every corner of the island.

A grand fourteen-day masterwork covering Wilpattu’s leopard-filled jungle lakes, the ancient royal ruins of Anuradhapura and Polonnaruwa, the Minneriya elephant gathering, the sacred hill capital of Kandy, high tea on colonial tea estates, Horton Plains World’s End, Ella, Yala safaris, Mirissa whale watching, the Galle Fort ramparts, and vibrant Colombo.`,
    duration: { days: 14, nights: 13 },
    destinations: [
      "Negombo",
      "Wilpattu",
      "Anuradhapura",
      "Sigiriya",
      "Minneriya",
      "Polonnaruwa",
      "Habarana",
      "Kandy",
      "Nuwara Eliya",
      "Horton Plains",
      "Ella",
      "Yala",
      "Mirissa",
      "Galle",
      "Colombo",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600&q=85",
    alt: "Epic Sri Lanka vistas spanning heritage and ocean",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
        alt: "Wilpattu leopards",
      },
      {
        src: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&q=80",
        alt: "Galle Fort lighthouse",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Negombo",
        description: "Rest and recover.",
        locations: "Negombo",
        accommodation: "Luxury Coastal Resort, Negombo",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Wilpattu National Park",
        description:
          'Depart for Wilpattu, famous for its dense leopard population and "Willus" (natural lakes). Afternoon safari.',
        locations: "Wilpattu",
        accommodation: "Safari Camp / Eco Lodge, Wilpattu",
        meals: "Breakfast & Dinner",
      },
      {
        day: 3,
        title: "Anuradhapura",
        description: "Deep dive into the ancient kingdom.",
        locations: "Anuradhapura",
        accommodation: "Heritage Resort, Cultural Triangle",
        meals: "Breakfast & Dinner",
      },
      {
        day: 4,
        title: "Sigiriya & Minneriya",
        description: "Morning rock climb. Afternoon elephant gathering safari.",
        locations: "Sigiriya, Minneriya",
        accommodation: "Resort in Sigiriya",
        meals: "Breakfast & Dinner",
      },
      {
        day: 5,
        title: "Polonnaruwa & Pasikuda",
        description:
          "Morning ruins tour. Drive to the east coast beach of Pasikuda (depending on season) or Habarana. Let's stick to Habarana/Giritale for general availability.",
        locations: "Polonnaruwa, Habarana",
        accommodation: "Resort in Habarana",
        meals: "Breakfast & Dinner",
      },
      {
        day: 6,
        title: "Kandy",
        description: "Drive to Kandy. Visit the Temple of the Tooth.",
        locations: "Matale, Kandy",
        accommodation: "Heritage Hotel, Kandy",
        meals: "Breakfast & Dinner",
      },
      {
        day: 7,
        title: "Tea Country Experience",
        description:
          "Train to Nuwara Eliya. Tea plucking experience and high tea at a colonial hotel.",
        locations: "Nuwara Eliya",
        accommodation: "Colonial Luxury Hotel, Nuwara Eliya",
        meals: "Breakfast, High Tea & Dinner",
      },
      {
        day: 8,
        title: "Horton Plains & Ella",
        description: "World's End trek. Drive to Ella.",
        locations: "Horton Plains, Ella",
        accommodation: "Mountain View Resort, Ella",
        meals: "Breakfast & Dinner",
      },
      {
        day: 9,
        title: "Ella Exploration",
        description: "Nine Arch Bridge and Rawana Falls.",
        locations: "Ella",
        accommodation: "Mountain View Resort, Ella",
        meals: "Breakfast & Dinner",
      },
      {
        day: 10,
        title: "Yala National Park",
        description: "Drive to Yala. Evening and Morning Safaris.",
        locations: "Yala",
        accommodation: "Luxury Safari Lodge, Yala",
        meals: "Breakfast & Dinner",
      },
      {
        day: 11,
        title: "Yala to Mirissa",
        description: "Morning Safari. Transfer to the beach.",
        locations: "Yala, Mirissa",
        accommodation: "Beachfront Boutique Hotel, Mirissa",
        meals: "Breakfast",
      },
      {
        day: 12,
        title: "Whale Watching & Relax",
        description:
          "Early morning Whale Watching tour in Mirissa (seasonal). Afternoon beach relaxation.",
        locations: "Mirissa",
        accommodation: "Beachfront Boutique Hotel, Mirissa",
        meals: "Breakfast",
      },
      {
        day: 13,
        title: "Galle Fort & Colombo",
        description:
          "Morning tour of Galle Dutch Fort. Afternoon drive to Colombo for a city tour and shopping.",
        locations: "Galle, Colombo",
        accommodation: "Luxury City Hotel, Colombo",
        meals: "Breakfast & Dinner",
      },
      {
        day: 14,
        title: "Departure",
        description: "Transfer to airport with memories for a lifetime.",
        locations: "Colombo, BIA Airport",
        meals: "Breakfast",
      },
    ],
    inclusions: [
      "Dedicated Licensed National Tourist Guide Lecturer throughout",
      "Private luxury air-conditioned executive vehicle throughout",
      "Private 4x4 safaris in Wilpattu, Minneriya, and Yala",
      "Scenic observation mountain train tickets",
      "Seasonal private whale watching excursion in Mirissa",
      "All UNESCO monument tickets, tea factory high tea, and national park passes",
      "13 nights luxury & boutique accommodations",
      "Daily breakfast and scheduled dinners",
    ],
    exclusions: [
      "International flights",
      "Visas",
      "Travel insurance",
      "Personal expenses",
    ],
    travelInfo:
      "The definitive Sri Lanka itinerary covering cultural citadels, tea estates, cloud forests, three national parks, blue whale waters, and colonial heritage.",
    faqs: [
      {
        question: "Can this itinerary be tailored for family travel?",
        answer:
          "Yes! We adjust daily driving pacing, select family villas with connecting rooms, and include interactive animal encounters and village workshops suitable for all ages.",
      },
    ],
    relatedSlugs: ["grand-sri-lankan-loop", "deep-dive-culture-and-nature"],
  },
};
