import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import { getJournalPosts } from "@/lib/payload-data";
import { JournalPostHeader } from "@/components/journal";

export async function generateStaticParams() {
  const articles = await getJournalPosts();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getJournalPosts();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} - Anthony Holidays Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: (article as any).image || (article as any).coverImage }],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getJournalPosts();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (articles as any[])
    .filter((a: any) => a.slug !== slug)
    .slice(0, 2);

  return (
    <>
      {/* Article Header */}
      <JournalPostHeader
        title={article.title}
        category={article.category}
        author={article.author}
        date={article.date}
        readTime={article.readTime}
      />

      {/* Featured Image */}
      <section className="bg-offwhite section-padding-top">
        <div className="container max-w-4xl">
          <div className="relative aspect-video overflow-hidden shadow-xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding-bottom bg-offwhite">
        <div className="container max-w-2xl text-charcoal text-lg leading-relaxed">
          <p className="font-serif italic text-2xl leading-relaxed text-forest mb-8">
            {article.excerpt}
          </p>

          <p className="mb-7 text-stone">
            When travellers step onto Sri Lankan soil, they encounter an island
            of astonishing geographical and historical density. Within a few
            hours’ drive from the coastline, ancient granite monoliths yield to
            cool highland ridges enveloped in emerald tea gardens.
          </p>

          <h2 className="font-serif text-3xl text-forest mt-12 mb-4 font-normal">
            The Living Philosophy of National Guides
          </h2>
          <p className="mb-7 text-stone">
            In Sri Lanka, the designation of Licensed National Tourist Guide
            Lecturer is not merely a permit; it is an academic honour conferred
            after rigorous examinations spanning archaeology, botany,
            architectural history, and multi-lingual oratory. Travelling with a
            national guide transforms every monument from a photo opportunity
            into a living tapestry of tales.
          </p>

          <blockquote className="border-l-2 border-gold pl-7 my-10 font-serif italic text-xl text-forest bg-secondary/10 py-4 pr-4">
            “The most memorable journeys are not measured by miles traversed,
            but by the quiet moments of communion with people, wildlife, and
            sacred landscapes.”
          </blockquote>

          <h2 className="font-serif text-3xl text-forest mt-12 mb-4 font-normal">
            Planning Your Route
          </h2>
          <p className="mb-10 text-stone">
            We advise visitors against rushing from site to site. Sri Lanka
            rewards slow travel - lingering in morning mist at a hill estate,
            spending hours awaiting leopards at Yala’s waterholes, or cycling
            through ancient monastic ruins as sunset turns the dagobas amber.
          </p>

          <div className="mt-16 p-10 bg-white border border-forest/10 text-center shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3 font-normal">
              Ready to explore Ceylon with our national guides?
            </h3>
            <p className="text-sm text-stone mb-6">
              Allow us to formulate an original custom itinerary tailored around
              your interests.
            </p>
            <Link href="/start-planning" className="btn btn-primary">
              Start Planning Your Journey
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="section-padding bg-cream border-t border-forest/10">
        <div className="container max-w-4xl">
          <h2 className="font-serif text-3xl text-forest text-center mb-10 font-light">
            More from the Journal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="flex gap-5 bg-white p-5 border border-forest/10 items-center transition-shadow hover:shadow-md"
              >
                <div className="relative w-[88px] h-[88px] shrink-0 overflow-hidden">
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gold font-semibold block mb-1">
                    {rel.category}
                  </span>
                  <h3 className="font-serif text-lg text-forest leading-snug font-medium">
                    {rel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
