import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'

export interface JournalPostHeaderProps {
  title: string
  category?: string
  author?: string
  date?: string
  readTime?: string
}

export function JournalPostHeader({
  title,
  category,
  author,
  date,
  readTime,
}: JournalPostHeaderProps) {
  return (
    <div className="bg-forest pt-36 pb-16 text-ivory">
      <div className="container max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm mb-6 text-ivory/50">
          <Link
            href="/"
            className="text-ivory/50 hover:text-ivory transition-colors"
          >
            Home
          </Link>
          <span aria-hidden="true" className="text-ivory/40">
            ·
          </span>
          <Link
            href="/blog"
            className="text-ivory/50 hover:text-ivory transition-colors"
          >
            Blog
          </Link>
          {category && (
            <>
              <span aria-hidden="true" className="text-ivory/40">
                ·
              </span>
              <span className="text-gold">{category}</span>
            </>
          )}
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-gold mb-6 hover:text-secondary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        {category && (
          <p className="section-label text-gold mb-2">{category}</p>
        )}

        <h1 className="text-heading-1 text-ivory text-3xl md:text-5xl leading-tight mb-7 font-light">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-ivory/65 pt-4 border-t border-ivory/10">
          {author && (
            <span className="inline-flex items-center gap-1.5">
              <User size={14} />
              {author}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {date}
            </span>
          )}
          {readTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {readTime}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
