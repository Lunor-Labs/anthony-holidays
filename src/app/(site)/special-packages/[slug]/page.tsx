import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, Check, X, ShieldAlert, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react'
import { getSpecialPackageBySlug, getSpecialPackages } from '@/lib/payload-data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pkg = await getSpecialPackageBySlug(slug)

  if (!pkg) {
    return { title: 'Package Not Found - Anthony Holidays' }
  }

  return {
    title: `${pkg.title} - Special Package`,
    description: pkg.excerpt || `Discover ${pkg.title} in Sri Lanka with Anthony Holidays.`,
    openGraph: {
      title: `${pkg.title} - Anthony Holidays`,
      description: pkg.excerpt,
      images: [{ url: pkg.coverImage }],
    },
  }
}

export async function generateStaticParams() {
  const packages = await getSpecialPackages()
  return packages.map((p) => ({ slug: p.slug }))
}

export default async function SpecialPackageDetailPage({ params }: PageProps) {
  const { slug } = await params
  const pkg = await getSpecialPackageBySlug(slug)

  if (!pkg) {
    notFound()
  }

  return (
    <>
      {/* Hero Header */}
      <div className="relative bg-forest min-h-[50vh] flex items-end pt-[clamp(8rem,14vw,12rem)] pb-12 overflow-hidden">
        <Image
          src={pkg.coverImage}
          alt={pkg.alt || pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="overlay-gradient pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10 text-ivory">
          <nav aria-label="Breadcrumb" className="breadcrumb mb-6 text-ivory/60">
            <Link href="/" className="hover:text-ivory transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/special-packages" className="hover:text-ivory transition-colors">Special Packages</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{pkg.title}</span>
          </nav>

          <span className="bg-gold text-forest text-xs font-bold uppercase tracking-wider px-3 py-1 inline-block mb-4">
            {pkg.categoryLabel}
          </span>

          <h1 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-tight mb-4 max-w-4xl">
            {pkg.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-ivory/80">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gold" />
              <span>{pkg.duration.days} Days{pkg.duration.nights ? ` / ${pkg.duration.nights} Nights` : ''}</span>
            </div>
            {pkg.pricing?.showPrice && pkg.pricing.priceFrom ? (
              <div className="flex items-center gap-1.5 font-semibold text-gold text-base">
                <span>From ${pkg.pricing.priceFrom.toLocaleString()} {pkg.pricing.currency || 'USD'}</span>
                {pkg.pricing.pricingNote && (
                  <span className="text-xs text-ivory/60 font-normal">({pkg.pricing.pricingNote})</span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="section bg-offwhite py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content (2 cols) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div className="bg-white p-8 md:p-10 border border-cream">
                <span className="section-label text-gold block mb-2">Package Overview</span>
                <h2 className="font-serif text-3xl text-charcoal mb-6">About This Experience</h2>
                <p className="text-charcoal/80 leading-relaxed text-base font-light mb-6">
                  {pkg.excerpt}
                </p>
                {typeof (pkg as any).description === 'string' && (
                  <div className="prose prose-stone max-w-none text-charcoal/85 leading-relaxed">
                    <p>{(pkg as any).description}</p>
                  </div>
                )}
              </div>

              {/* Key Activities */}
              {pkg.activities && pkg.activities.length > 0 && (
                <div className="bg-white p-8 md:p-10 border border-cream">
                  <span className="section-label text-gold block mb-2">Highlights</span>
                  <h2 className="font-serif text-3xl text-charcoal mb-6">Key Activities & Itinerary Stages</h2>
                  <div className="space-y-6">
                    {pkg.activities.map((act: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-start pb-6 border-b border-cream last:border-b-0 last:pb-0">
                        <span className="w-8 h-8 rounded-full bg-forest text-gold flex items-center justify-center font-serif text-sm font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl text-charcoal mb-1.5">{act.title}</h3>
                          {act.description && (
                            <p className="text-sm text-stone leading-relaxed">{act.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditions & Requirements */}
              {pkg.conditions && (
                <div className="bg-ivory border border-gold/30 p-8">
                  <div className="flex items-center gap-3 mb-4 text-forest">
                    <ShieldAlert size={22} className="text-gold" />
                    <h3 className="font-serif text-2xl">Relevant Conditions & Requirements</h3>
                  </div>
                  <div className="text-sm text-charcoal/80 leading-relaxed space-y-2">
                    <p>{typeof pkg.conditions === 'string' ? pkg.conditions : 'Please check physical fitness requirements and local guidelines.'}</p>
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="bg-white p-8 md:p-10 border border-cream">
                <span className="section-label text-gold block mb-2">Package Services</span>
                <h2 className="font-serif text-3xl text-charcoal mb-6">What Is Included & Excluded</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Included */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-forest mb-4 pb-2 border-b border-forest/10 flex items-center gap-2">
                      <Check size={16} className="text-forest" />
                      Included in Package
                    </h3>
                    <ul className="space-y-2.5">
                      {pkg.inclusions.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-charcoal/85 leading-relaxed">
                          <Check size={13} className="text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone mb-4 pb-2 border-b border-cream flex items-center gap-2">
                      <X size={16} className="text-stone" />
                      Not Included (Optional / Direct)
                    </h3>
                    <ul className="space-y-2.5">
                      {pkg.exclusions.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-stone leading-relaxed">
                          <X size={13} className="text-stone/50 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-cream p-8 shadow-sm">
                <span className="section-label text-gold block mb-2">Enquire Now</span>
                <h3 className="font-serif text-2xl text-charcoal mb-2">Interested in this experience?</h3>
                <p className="text-xs text-stone leading-relaxed mb-6">
                  Speak directly with Anthony or our specialist team. We personalize dates, accommodation grades, and activities for you.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs py-2 border-b border-cream">
                    <span className="text-stone">Package Category</span>
                    <span className="font-medium text-forest">{pkg.categoryLabel}</span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-cream">
                    <span className="text-stone">Recommended Duration</span>
                    <span className="font-medium text-charcoal">{pkg.duration.days} Days</span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-cream">
                    <span className="text-stone">Travel Style</span>
                    <span className="font-medium text-charcoal">Private Guided</span>
                  </div>
                </div>

                <Link
                  href={`/start-planning?specialPackage=${pkg.slug}&title=${encodeURIComponent(pkg.title)}`}
                  className="btn btn-primary w-full justify-center text-center mb-4 py-3.5"
                >
                  Start Planning This Trip
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={`https://wa.me/94771234567?text=${encodeURIComponent(`Ayubowan Anthony Holidays, I am interested in the ${pkg.title} special package.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full justify-center text-center text-xs py-3"
                >
                  <MessageSquare size={14} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
