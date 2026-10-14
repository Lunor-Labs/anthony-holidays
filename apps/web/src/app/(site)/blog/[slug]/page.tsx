import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getJournalPosts, getJournalPostBySlug } from "@/lib/payload-data";
import { JournalPostHeader } from "@/components/journal";
import { RichText } from "@/components/ui/RichText";

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
  const article = await getJournalPostBySlug(slug);
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
  const article = await getJournalPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getJournalPosts();
  const relatedArticles = (allArticles as any[])
    .filter((a: any) => a.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <JournalPostHeader
        title={article.title}
        category={article.category}
        author={article.author}
        date={article.date}
        readTime={article.readTime}
        image={(article as any).image || (article as any).coverImage}
      />

      <article className="pt-10 sm:pt-14 pb-20 bg-offwhite">
        <div className="container max-w-2xl text-charcoal text-lg leading-relaxed">
          {article.excerpt && (
            <p className="font-serif italic text-2xl leading-relaxed text-forest mb-8">
              {article.excerpt}
            </p>
          )}

          {article.content ? (
            <RichText content={article.content} />
          ) : (
            <p className="mb-7 text-stone leading-relaxed font-light">
              {article.excerpt}
            </p>
          )}

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
