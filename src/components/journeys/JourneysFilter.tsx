'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Clock, MapPin, ChevronRight, X, SlidersHorizontal } from 'lucide-react'

interface Journey {
  id: string
  slug: string
  title: string
  excerpt: string
  duration: { days: number; nights: number }
  coverImage: string
  alt: string
  destinations: string[]
  categories: string[]
}

interface JourneysFilterProps {
  journeys: Journey[]
}

const categoryLabels: Record<string, string> = {
  'cultural-heritage': 'Cultural & Heritage Tours',
  'luxury': 'Luxury Tours',
  'wildlife-adventure': 'Wildlife & Adventure Tours',
  'honeymoon': 'Romantic & Honeymoon Tours',
  'leisure': 'Leisure Tours',
  'hill-country': 'Hill Country Tours',
  'beach': 'Beach Tours',
  'untouched': 'Untouched',
  'pilgrimage': 'Pilgrimage Tours',
  'culture-heritage': 'Cultural & Heritage Tours',
  'wildlife-nature': 'Wildlife & Adventure Tours',
  'hill-country-tea': 'Hill Country Tours',
  'beaches-coastal': 'Beach Tours',
}

const durationRanges = [
  { label: 'Up to 5 days', min: 0, max: 5 },
  { label: '6–9 days', min: 6, max: 9 },
  { label: '10–14 days', min: 10, max: 14 },
  { label: '15+ days', min: 15, max: 999 },
]

export function JourneysFilter({ journeys }: JourneysFilterProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories from journeys
  const categories = useMemo(() => {
    const cats = new Set<string>()
    journeys.forEach((j) => j.categories.forEach((c) => cats.add(c)))
    return Array.from(cats)
  }, [journeys])

  const filtered = useMemo(() => {
    return journeys.filter((j) => {
      // Search
      if (search && !j.title.toLowerCase().includes(search.toLowerCase()) &&
          !j.excerpt.toLowerCase().includes(search.toLowerCase())) {
        return false
      }

      // Category
      if (selectedCategory && !j.categories.includes(selectedCategory)) {
        return false
      }

      // Duration
      if (selectedDuration) {
        const range = durationRanges.find((r) => r.label === selectedDuration)
        if (range && (j.duration.days < range.min || j.duration.days > range.max)) {
          return false
        }
      }

      return true
    })
  }, [journeys, search, selectedCategory, selectedDuration])

  const hasFilters = search || selectedCategory || selectedDuration

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedDuration('')
  }

  return (
    <div>
      {/* Search + Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search journeys…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search journeys by name"
            className="w-full pl-11 pr-4 py-3 border border-cream font-sans text-sm text-charcoal bg-white outline-none focus:border-forest transition-colors"
          />
        </div>

        {/* Filter toggle (mobile & desktop) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          className={`flex items-center gap-2 px-5 py-3 border border-cream font-sans text-xs font-medium cursor-pointer transition-colors ${
            showFilters ? 'bg-forest text-ivory' : 'bg-white text-charcoal hover:border-forest'
          }`}
        >
          <SlidersHorizontal size={15} />
          Filters
          {hasFilters && (
            <span className="bg-gold text-charcoal rounded-full w-4.5 h-4.5 text-xs flex items-center justify-center font-bold">
              {[search, selectedCategory, selectedDuration].filter(Boolean).length}
            </span>
          )}
        </button>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 bg-transparent border-0 text-stone text-xs cursor-pointer font-sans p-2 hover:text-charcoal transition-colors"
          >
            <X size={13} />
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white border border-cream p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category filter */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-stone mb-3">
              Experience Type
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                  className={`inline-flex items-center px-4 py-1.5 border text-xs font-medium tracking-wide cursor-pointer transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-forest text-ivory border-forest'
                      : 'bg-white text-charcoal border-cream hover:bg-forest hover:text-ivory hover:border-forest'
                  }`}
                  aria-pressed={selectedCategory === cat}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Duration filter */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-stone mb-3">
              Duration
            </p>
            <div className="flex flex-wrap gap-2">
              {durationRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedDuration(range.label === selectedDuration ? '' : range.label)}
                  className={`inline-flex items-center px-4 py-1.5 border text-xs font-medium tracking-wide cursor-pointer transition-all duration-200 ${
                    selectedDuration === range.label
                      ? 'bg-forest text-ivory border-forest'
                      : 'bg-white text-charcoal border-cream hover:bg-forest hover:text-ivory hover:border-forest'
                  }`}
                  aria-pressed={selectedDuration === range.label}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-stone mb-8">
        {filtered.length === journeys.length
          ? `${journeys.length} journeys available`
          : `${filtered.length} of ${journeys.length} journeys`}
        {hasFilters && ' (filtered)'}
      </p>

      {/* Journey Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((journey) => (
            <article key={journey.id} className="group flex flex-col h-full bg-white border border-sand/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={journey.coverImage}
                  alt={journey.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

                {/* Duration badge */}
                <div className="absolute top-4 right-4 bg-ivory/95 px-3 py-1.5 flex items-center gap-1.5">
                  <Clock size={11} className="text-gold" />
                  <span className="text-xs font-medium text-charcoal tracking-wide">
                    {journey.duration.days}D / {journey.duration.nights}N
                  </span>
                </div>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={11} className="text-gold shrink-0" />
                  <span className="text-xs text-stone tracking-wide">
                    {journey.destinations.slice(0, 3).join(' · ')}
                    {journey.destinations.length > 3 && ` +${journey.destinations.length - 3}`}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-normal text-charcoal mb-3 leading-snug">
                  {journey.title}
                </h2>

                <p className="text-sm text-stone leading-relaxed mb-6">
                  {journey.excerpt}
                </p>

                <div className="flex gap-2 flex-wrap mb-5">
                  {journey.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs font-medium tracking-wider uppercase text-stone border border-cream px-2 py-0.5"
                    >
                      {categoryLabels[cat] || cat}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/tours/${journey.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-forest hover:gap-2.5 transition-all"
                  aria-label={`View ${journey.title} journey details`}
                >
                  Explore Journey
                  <ChevronRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-20 px-8 text-stone">
          <p className="font-serif text-2xl mb-3 text-charcoal">
            No journeys match your search.
          </p>
          <p className="text-sm mb-6">
            Try different filters, or enquire about a custom journey.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={clearFilters} className="btn btn-outline">
              Clear Filters
            </button>
            <Link href="/start-planning" className="btn btn-primary">
              Plan a Custom Journey
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
