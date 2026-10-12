import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getJourneys } from "@/lib/payload-data";
import { JourneysFilter } from "@/components/journeys/JourneysFilter";

export const metadata: Metadata = {
  title: "Tour Packages - Curated Private Sri Lanka Itineraries",
  description:
    "Explore our expert-curated Sri Lanka tour packages - from cultural heritage trails and wildlife safaris to coastal escapes and tailor-made adventures.",
};

export default async function ToursPage() {
  const journeys = await getJourneys();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sri Lanka Tour Packages - Anthony Holidays",
    description: "Expert-curated Sri Lanka tour packages",
    numberOfItems: journeys.length,
    itemListElement: journeys.map((j, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: j.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/tours/${j.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Header */}
      <div className="bg-forest pt-[clamp(7rem,12vw,10rem)] pb-[clamp(4rem,7vw,6rem)]">
        <div className="container">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm mb-8 text-ivory/50"
          >
            <Link
              href="/"
              className="text-ivory/50 hover:text-ivory transition-colors"
            >
              Home
            </Link>
            <span aria-hidden="true" className="text-ivory/40">
              ·
            </span>
            <span className="text-gold">Tour Packages</span>
          </nav>

          <p className="section-label text-gold">Expert-Led Tours</p>
          <h1 className="text-heading-1 text-ivory mb-4">
            Sri Lanka Tour Packages
          </h1>
          <p className="text-ivory/75 text-base md:text-lg max-w-[600px] leading-relaxed">
            From ancient kingdoms to tropical coastlines - discover our curated
            tour packages or let us craft something entirely personal for you.
          </p>
        </div>
      </div>

      {/* Filter + Grid Section */}
      <section className="section-padding bg-offwhite" aria-label="Journey listings">
        <div className="container">
          <JourneysFilter journeys={journeys} />
        </div>
      </section>

      {/* Custom Journey CTA */}
      <section className="section-padding-sm bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-12 bg-forest">
            <div>
              <p className="section-label text-gold">Tailor-Made Journeys</p>
              <h2 className="text-heading-2 text-ivory mb-4">
                Don&apos;t See What You&apos;re Looking For?
              </h2>
              <p className="text-ivory/75 leading-relaxed text-base">
                Every Anthony Holidays journey can be fully customised - dates,
                pace, accommodation, and experiences tailored entirely to you.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/start-planning" className="btn btn-gold">
                Plan a Custom Journey
                <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn btn-outline-ivory">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
