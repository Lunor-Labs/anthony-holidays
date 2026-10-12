import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpecialPackageCard } from '@/components/special-packages/SpecialPackageCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export interface FeaturedSpecialPackagesSectionProps {
  specialPackages: any[]
}

export function FeaturedSpecialPackagesSection({
  specialPackages,
}: FeaturedSpecialPackagesSectionProps) {
  const displayPackages = specialPackages.slice(0, 3)

  return (
    <section
      className="section-padding bg-ivory relative z-20 shadow-[0_-30px_70px_rgba(28,58,46,0.06)]"
      aria-labelledby="special-packages-heading"
    >
      <div className="container">
        <ScrollReveal direction="up">
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
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {displayPackages.map((pkg, i) => (
            <ScrollReveal
              key={pkg.id || pkg.slug}
              direction="up"
              delay={(i * 200) as any}
            >
              <SpecialPackageCard packageItem={pkg} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
