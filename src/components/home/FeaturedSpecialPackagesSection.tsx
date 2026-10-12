import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpecialPackageCard } from '@/components/special-packages/SpecialPackageCard'

export interface FeaturedSpecialPackagesSectionProps {
  specialPackages: any[]
}

export function FeaturedSpecialPackagesSection({
  specialPackages,
}: FeaturedSpecialPackagesSectionProps) {
  const displayPackages = specialPackages.slice(0, 3)

  return (
    <section className="section bg-ivory" aria-labelledby="special-packages-heading">
      <div className="container">
        <SectionHeading
          label="Purpose & Value Packages"
          title="Featured Special"
          highlight="Packages"
          action={
            <Link href="/special-packages" className="btn btn-outline shrink-0">
              All Special Packages
              <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPackages.map((pkg) => (
            <SpecialPackageCard key={pkg.id || pkg.slug} packageItem={pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}
