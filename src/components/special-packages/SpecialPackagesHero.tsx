import Link from 'next/link'

export function SpecialPackagesHero() {
  return (
    <div className="bg-forest pt-[clamp(7rem,12vw,10rem)] pb-[clamp(4rem,7vw,6rem)]">
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb mb-8 text-ivory/50">
          <Link href="/" className="text-ivory/50 hover:text-ivory transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">Special Packages</span>
        </nav>

        <span className="section-label text-gold block mb-3">
          Unique & Bespoke Themes
        </span>

        <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-ivory font-normal leading-[1.1] mb-6 max-w-3xl">
          Specialised Journeys & Meaningful Experiences
        </h1>

        <p className="font-sans text-[clamp(1rem,1.5vw,1.15rem)] text-ivory/75 max-w-2xl leading-relaxed font-light">
          From hands-on marine turtle volunteering and Hikkaduwa surf immersions to smart budget trails and rugged wilderness treks, discover focused journeys tailored to individual passions.
        </p>
      </div>
    </div>
  )
}
