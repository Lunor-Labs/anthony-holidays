import type { Metadata } from 'next'
import { getJournalPosts } from '@/lib/payload-data'
import { JournalCard } from '@/components/journal'
import { PageHero } from '@/components/ui/PageHero'
import { CallToActionSection } from '@/components/home/CallToActionSection'

export const metadata: Metadata = {
  title: 'Blog - Sri Lanka Travel Insights, Guides & Stories',
  description:
    'Essays, field guides, and seasonal travel advice from Licensed National Tourist Guide Lecturers at Anthony Holidays.',
}

import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export default async function BlogPage() {
  const articles = await getJournalPosts()

  return (
    <>
      <PageHero
        breadcrumbCurrent="Journal"
        badge="Anthony Holidays Journal"
        title="Ceylon Chronicles & Field Notes"
        description="Curated essays, archaeological insights, and seasonal guidance authored by Sri Lanka’s Licensed National Tourist Guide Lecturers and destination specialists."
      />

      <section className="section-padding bg-offwhite">
        <div className="container">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article: any) => (
                <JournalCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-8 bg-white border border-sand/60 max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream flex items-center justify-center text-gold">
                <BookOpen size={32} strokeWidth={1.5} />
              </div>
              <span className="section-label text-gold block mb-2 justify-center">
                Ceylon Chronicles
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 font-normal">
                Field Notes &amp; Essays in Preparation
              </h2>
              <p className="text-stone text-sm leading-relaxed mb-8 font-light max-w-lg mx-auto">
                Our guide lecturers and naturalists are currently authoring new firsthand essays covering ancient water engineering, wildlife ethics, and tea harvest secrets. Check back shortly for our upcoming publications.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tours" className="btn btn-primary">
                  <span>Browse Our Journeys</span>
                  <ArrowRight size={15} />
                </Link>
                <Link href="/start-planning" className="btn btn-outline">
                  Plan Your Private Trip
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
