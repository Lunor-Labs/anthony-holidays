import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { formatDate } from '@/lib/utils'
import { DEFAULT_MEDIA } from '@/lib/payload-data'

export interface JournalPreviewSectionProps {
  posts?: any[]
}

export function JournalPreviewSection({ posts = [] }: JournalPreviewSectionProps) {
  const displayPosts = (posts || []).slice(0, 3)

  return (
    <section className="section-padding bg-ivory" aria-labelledby="journal-heading">
      <div className="container">
        <ScrollReveal direction="up">
          <SectionHeading
            id="journal-heading"
            label="Travel Inspiration"
            title="From the"
            highlight="Travel Journal"
            action={
              displayPosts.length > 0 ? (
                <Link href="/blog" className="btn btn-outline shrink-0">
                  All Articles
                  <ArrowRight size={14} />
                </Link>
              ) : undefined
            }
          />
        </ScrollReveal>

        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {displayPosts.map((post, i) => (
            <ScrollReveal
              key={post.id || post.slug}
              direction="up"
              delay={(i * 200) as any}
            >
              <article className="bg-white border border-sand/60 shadow-sm flex flex-col group overflow-hidden h-full transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(28,58,46,0.15)]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[16/10] overflow-hidden block"
                  aria-label={`Read ${post.title}`}
                >
                  <Image
                    src={post.coverImage || DEFAULT_MEDIA.url}
                    alt={post.alt || post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-muted mb-3">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-gold" />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-gold" />
                          {post.readingTime} min read
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-normal text-charcoal mb-3 group-hover:text-forest transition-colors tracking-wide">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {post.excerpt && (
                      <p className="text-[15px] text-stone leading-relaxed mb-6 line-clamp-3 font-normal">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="btn-link mt-auto"
                  >
                    Read Article
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        ) : (
          <ScrollReveal direction="up" delay={200}>
            <div className="text-center py-16 px-8 bg-white border border-sand/70 max-w-2xl mx-auto shadow-sm mt-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center text-gold">
                <BookOpen size={28} strokeWidth={1.5} />
              </div>
              <span className="section-label text-gold block mb-2 justify-center">
                Ceylon Chronicles
              </span>
              <h3 className="font-serif text-2xl text-charcoal mb-3 font-normal">
                Field Notes &amp; Essays in Preparation
              </h3>
              <p className="text-stone text-sm leading-relaxed mb-8 font-normal max-w-lg mx-auto">
                Our licensed guide lecturers and naturalists are currently authoring new firsthand essays, archaeological guides, and seasonal insights across Sri Lanka. Check back shortly for our upcoming publications.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tours" className="btn btn-primary">
                  <span>Browse Tour Packages</span>
                  <ArrowRight size={14} />
                </Link>
                <Link href="/start-planning" className="btn btn-outline">
                  Plan a Custom Journey
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
