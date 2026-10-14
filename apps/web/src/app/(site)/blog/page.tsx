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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article: any) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
