import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatDate } from '@/lib/utils'
import { DEFAULT_MEDIA } from '@/lib/media-catalog'

export interface JournalPreviewSectionProps {
  posts: any[]
}

export function JournalPreviewSection({ posts }: JournalPreviewSectionProps) {
  const displayPosts = posts.slice(0, 3)

  return (
    <section className="section bg-ivory" aria-labelledby="journal-heading">
      <div className="container">
        <SectionHeading
          label="Travel Inspiration"
          title="From the"
          highlight="Travel Journal"
          action={
            <Link href="/blog" className="btn btn-outline shrink-0">
              All Articles
              <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <article
              key={post.id || post.slug}
              className="bg-white border border-sand/60 shadow-sm flex flex-col group overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={
                    post.coverImage ||
                    DEFAULT_MEDIA.url
                  }
                  alt={post.alt || post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

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

                  <h3 className="font-serif text-xl font-normal text-charcoal mb-3 group-hover:text-forest transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt && (
                    <p className="text-sm text-stone leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-forest transition-all hover:gap-2.5 mt-auto"
                >
                  Read Article
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
