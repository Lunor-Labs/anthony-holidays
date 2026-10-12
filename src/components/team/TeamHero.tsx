import Link from 'next/link'

export function TeamHero() {
  return (
    <div className="bg-forest pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm mb-8 text-ivory/50">
          <Link href="/" className="text-ivory/50 hover:text-ivory transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="text-ivory/50 hover:text-ivory transition-colors">
            About Us
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">Founder & Team</span>
        </nav>

        <span className="section-label text-gold block mb-3">
          Our Guiding Faculty
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-[1.1] mb-6 max-w-3xl">
          Meet Anthony & Our Professional Guides
        </h1>

        <p className="font-sans text-base lg:text-lg text-ivory/75 max-w-2xl leading-relaxed font-light">
          Anthony Holidays is led by Licensed National Tourist Guide Lecturers registered with the Sri Lanka Tourism Development Authority (SLTDA). Meet the scholars and naturalists who will accompany your journey.
        </p>
      </div>
    </div>
  )
}
