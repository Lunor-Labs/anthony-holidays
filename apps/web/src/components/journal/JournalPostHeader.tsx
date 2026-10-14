import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";

export interface JournalPostHeaderProps {
  title: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  image?: string;
}

export function JournalPostHeader({
  title,
  category,
  author,
  date,
  readTime,
  image,
}: JournalPostHeaderProps) {
  return (
    <>
      <header className="bg-forest text-ivory pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-28">
        <div className="container max-w-4xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold hover:text-ivory font-medium transition-colors group self-start"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>Back to Journal</span>
            </Link>

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 sm:gap-2 text-ivory/50 text-[11px] sm:text-xs"
            >
              <Link href="/" className="hover:text-ivory transition-colors">
                Home
              </Link>
              <span aria-hidden="true" className="text-ivory/30">
                /
              </span>
              <Link href="/blog" className="hover:text-ivory transition-colors">
                Journal
              </Link>
              {category && (
                <>
                  <span aria-hidden="true" className="text-ivory/30">
                    /
                  </span>
                  <span className="text-gold/90 truncate max-w-[170px] sm:max-w-none">
                    {category}
                  </span>
                </>
              )}
            </nav>
          </div>

          {category && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {category}
              </span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-normal leading-tight tracking-tight mb-6 normal-case">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-ivory/70 pt-5 border-t border-ivory/15">
            {author && (
              <div className="inline-flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <User size={13} />
                </div>
                <span className="font-medium text-ivory">{author}</span>
              </div>
            )}
            {date && (
              <div className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-gold/80" />
                <span>{date}</span>
              </div>
            )}
            {readTime && (
              <div className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-gold/80" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {image && (
        <div className="bg-offwhite">
          <div className="container max-w-4xl -mt-12 sm:-mt-16 md:-mt-20 relative z-20">
            <div className="relative aspect-video sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-charcoal">
              <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1000px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
