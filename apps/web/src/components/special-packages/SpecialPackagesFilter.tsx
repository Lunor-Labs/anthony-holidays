'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { SpecialPackageCard } from './SpecialPackageCard'
import Link from 'next/link'

export interface SpecialPackagesFilterProps {
  packages: any[]
}

const CATEGORIES = [
  { id: '', label: 'All Special Packages' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'hikkaduwa', label: 'Hikkaduwa-Based' },
  { id: 'customised', label: 'Customised' },
  { id: 'budget', label: 'Smart Budget' },
  { id: 'adventure', label: 'Adventure' },
]

export function SpecialPackagesFilter({ packages }: SpecialPackagesFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filtered = useMemo(() => {
    return packages.filter((pkg) => {
      // Category match
      if (selectedCategory && pkg.category !== selectedCategory) {
        return false
      }

      // Search match
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchTitle = pkg.title.toLowerCase().includes(query)
        const matchExcerpt = pkg.excerpt?.toLowerCase().includes(query)
        const matchCategory = pkg.categoryLabel?.toLowerCase().includes(query)
        if (!matchTitle && !matchExcerpt && !matchCategory) return false
      }

      return true
    })
  }, [packages, selectedCategory, searchQuery])

  const clearFilters = () => {
    setSelectedCategory('')
    setSearchQuery('')
  }

  const hasActiveFilters = Boolean(selectedCategory || searchQuery)

  return (
    <div>
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-stretch md:items-center">
        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center px-4 py-1.5 border text-xs font-medium tracking-wide cursor-pointer transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-forest text-ivory border-forest'
                  : 'bg-white text-charcoal border-cream hover:bg-forest hover:text-ivory hover:border-forest'
              }`}
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search special packages…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 border border-cream font-sans text-sm text-charcoal bg-white outline-none focus:border-forest transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6 text-sm text-stone">
        <p>
          Showing {filtered.length} of {packages.length} special packages
          {hasActiveFilters && ' (filtered)'}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-forest hover:text-gold underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Packages Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <SpecialPackageCard key={pkg.id} packageItem={pkg} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-8 bg-white border border-cream">
          <p className="font-serif text-2xl text-charcoal mb-3">
            No special packages found matching your criteria.
          </p>
          <p className="text-sm text-stone mb-6 max-w-md mx-auto">
            We regularly craft bespoke itineraries for volunteering, budget explorations, and specialized interests.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={clearFilters} className="btn btn-outline">
              Clear Filters
            </button>
            <Link href="/start-planning" className="btn btn-primary">
              Enquire About a Custom Trip
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
