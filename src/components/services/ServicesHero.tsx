import Link from 'next/link'

export function ServicesHero() {
  return (
    <div className="bg-forest pt-[clamp(7rem,12vw,10rem)] pb-[clamp(4rem,7vw,6rem)]">
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb mb-8 text-ivory/50">
          <Link href="/" className="text-ivory/50 hover:text-ivory transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">Our Services</span>
        </nav>

        <span className="section-label text-gold block mb-3">
          Expert Destination Management
        </span>

        <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-ivory font-normal leading-[1.1] mb-6 max-w-3xl">
          Professional Guiding & Islandwide Travel Services
        </h1>

        <p className="font-sans text-[clamp(1rem,1.5vw,1.15rem)] text-ivory/75 max-w-2xl leading-relaxed font-light">
          Delivered exclusively by Licensed National Tourist Guide Lecturers and certified chauffeurs. Every service is personal, fully insured, and tailored to your high standards.
        </p>
      </div>
    </div>
  )
}
