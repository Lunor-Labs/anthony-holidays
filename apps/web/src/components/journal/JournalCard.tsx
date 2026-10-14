import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { DEFAULT_MEDIA } from '@/lib/payload-data'

export interface Article {
  slug: string
  title: string
  excerpt: string
  author?: string
  date?: string
  publishedAt?: string
  readTime?: string
  readingTime?: number
  category?: string
  image?: string
  coverImage?: string
}

export interface JournalCardProps {
  article: Article
}

export function JournalCard({ article }: JournalCardProps) {
  const imageUrl =
    article.image ||
    article.coverImage ||
    DEFAULT_MEDIA.url

  const readTimeString =
    article.readTime ||
    (article.readingTime ? `${article.readingTime} min read` : '5 min read')

  const dateString = article.date || 'Curated Article'

  return (
    <article className="bg-white border border-sand/70 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xs">
      <Link
        href={`/blog/${article.slug}`}
        className="relative aspect-[16/10] block overflow-hidden group"
      >
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {article.category && (
          <span className="absolute top-4 left-4 bg-forest text-gold text-xs uppercase tracking-wider px-3 py-1 font-semibold">
            {article.category}
          </span>
        )}
      </Link>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-stone mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} className="text-gold" />
            {dateString}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} className="text-gold" />
            {readTimeString}
          </span>
        </div>

        <h2 className="font-serif text-2xl text-forest leading-snug mb-4 font-normal">
          <Link
            href={`/blog/${article.slug}`}
            className="hover:text-primary transition-colors"
          >
            {article.title}
          </Link>
        </h2>

        <p className="text-sm text-stone leading-relaxed flex-1 mb-7 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="pt-5 border-t border-sand/40 flex items-center justify-between">
          {article.author && (
            <span className="text-xs text-stone">By {article.author}</span>
          )}
          <Link
            href={`/blog/${article.slug}`}
            className="btn-link ml-auto"
          >
            Read Story
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
