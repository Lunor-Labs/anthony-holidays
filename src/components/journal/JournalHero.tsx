import React from 'react'
import Link from 'next/link'

export function JournalHero() {
  return (
    <div className="bg-forest pt-36 pb-20 text-ivory">
      <div className="container">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm mb-8 text-ivory/50">
          <Link
            href="/"
            className="text-ivory/50 hover:text-ivory transition-colors"
          >
            Home
          </Link>
          <span aria-hidden="true" className="text-ivory/40">
            ·
          </span>
          <span className="text-gold">Journal</span>
        </nav>

        <p className="section-label text-gold">Anthony Holidays Journal</p>
        <h1 className="text-heading-1 text-ivory mb-4">
          Ceylon Chronicles &amp; Field Notes
        </h1>
        <p className="text-ivory/75 text-base md:text-lg max-w-xl leading-relaxed">
          Curated essays, archaeological insights, and seasonal guidance
          authored by Sri Lanka’s Licensed National Tourist Guide Lecturers.
        </p>
      </div>
    </div>
  )
}
