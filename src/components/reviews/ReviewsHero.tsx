import Link from 'next/link'

export function ReviewsHero() {
  return (
    <div className="bg-forest pt-[clamp(7rem,12vw,10rem)] pb-[clamp(4rem,7vw,6rem)]">
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb mb-8 text-ivory/50">
          <Link href="/" className="text-ivory/50 hover:text-ivory transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">Reviews</span>
        </nav>

        <span className="section-label text-gold block mb-3">
          Verified Guest Reflections
        </span>

        <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-ivory font-normal leading-[1.1] mb-6 max-w-3xl">
          Traveller Reviews & Firsthand Stories
        </h1>

        <p className="font-sans text-[clamp(1rem,1.5vw,1.15rem)] text-ivory/75 max-w-2xl leading-relaxed font-light">
          Real feedback from discerning travellers who explored Sri Lanka with Anthony and our licensed guiding team. Every published review is independently verified and moderated for authenticity.
        </p>
      </div>
    </div>
  )
}
