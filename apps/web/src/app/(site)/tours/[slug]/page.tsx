import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  JourneyHero,
  JourneyOverview,
  JourneyItinerary,
  JourneyInclusions,
  JourneySidebar,
  JourneyFaq,
} from "@/components/journeys";
import { getJourneys, getJourneyBySlug } from "@/lib/payload-data";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);

  if (!journey) {
    return { title: "Journey Not Found" };
  }

  const siteUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  return {
    title: `${journey.title} - Anthony Holidays`,
    description: journey.excerpt,
    openGraph: {
      title: `${journey.title} - Anthony Holidays`,
      description: journey.excerpt,
      images: [{ url: journey.coverImage, alt: journey.alt }],
      type: "website",
      url: `${siteUrl}/tours/${slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/tours/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const journeys = await getJourneys();
  return journeys.map((j) => ({ slug: j.slug }));
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);

  if (!journey) {
    notFound();
  }

  const whatsappUrl = getWhatsAppUrl(
    process.env.PUBLIC_WHATSAPP_NUMBER || "94703247929",
    `Hello, I'm interested in the "${journey.title}" journey. Could you provide more information?`
  );

  const siteUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.excerpt,
    touristType: "Culture",
    itinerary: journey.itinerary.map((day: any) => ({
      "@type": "Event",
      name: `Day ${day.day}: ${day.title}`,
      description: day.description,
      location: {
        "@type": "Place",
        name: day.locations || "Sri Lanka",
      },
    })),
    provider: {
      "@type": "TravelAgency",
      name: "Anthony Holidays",
      url: siteUrl,
    },
    url: `${siteUrl}/tours/${slug}`,
    image: journey.coverImage,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "TouristTrip",
        name: journey.title,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Journey Hero */}
      <JourneyHero
        title={journey.title}
        coverImage={journey.coverImage}
        alt={journey.alt}
        duration={journey.duration}
        destinations={journey.destinations}
      />

      {/* Main Content & Sticky Booking Sidebar */}
      <div className="section-padding bg-offwhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content (2 Columns) */}
            <div className="lg:col-span-2">
              <JourneyOverview
                description={journey.description}
                gallery={journey.gallery}
              />

              <JourneyItinerary itinerary={journey.itinerary} />

              <JourneyInclusions
                inclusions={journey.inclusions}
                exclusions={journey.exclusions}
                includedSites={(journey as any).includedSites}
                optionalSites={(journey as any).optionalSites}
                accommodationDetails={(journey as any).accommodationDetails}
                transportDetails={(journey as any).transportDetails}
                guideDetails={(journey as any).guideDetails}
                insuranceInfo={(journey as any).insuranceInfo}
                visaInfo={(journey as any).visaInfo}
                airTicketInfo={(journey as any).airTicketInfo}
              />

              {journey.travelInfo && (
                <div className="bg-cream p-8 mb-14 border border-sand/50">
                  <h2 className="font-serif text-2xl text-charcoal mb-4 font-normal">
                    Important Travel Information
                  </h2>
                  <p className="text-sm text-stone leading-relaxed">
                    {journey.travelInfo}
                  </p>
                </div>
              )}

              <JourneyFaq faqs={journey.faqs} />
            </div>

            {/* Sidebar (1 Column) */}
            <JourneySidebar
              journeyTitle={journey.title}
              journeySlug={journey.slug}
              duration={journey.duration}
              destinations={journey.destinations}
              whatsappUrl={whatsappUrl}
              pricing={journey.pricing}
            />
          </div>
        </div>
      </div>
    </>
  );
}
