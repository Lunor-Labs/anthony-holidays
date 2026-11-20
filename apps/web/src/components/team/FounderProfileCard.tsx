import Image from 'next/image'
import Link from 'next/link'
import { Award, CheckCircle, Languages, Compass, ArrowRight, ShieldCheck, User } from 'lucide-react'
import { slugify } from '@/lib/utils'

export interface FounderProfileCardProps {
  founder: {
    name: string
    role: string
    photo: string
    credentials: string[]
    bio: string
    specialties: string[]
    languages: string[]
    slug?: string
  }
  sectionTitle?: string
  headline?: string
  bioOverride?: string
}

export function FounderProfileCard({
  founder,
  sectionTitle = 'Meet the Founder',
  headline,
  bioOverride,
}: FounderProfileCardProps) {
  const {
    name = 'Anthony',
    role = 'Founder & SLTDA National Tourist Guide Lecturer',
    photo = '',
    credentials = [],
    bio = '',
    specialties = [],
    languages = [],
  } = founder || {}
  const founderSlug = founder?.slug || slugify(name)
  const activeBio = bioOverride || bio
  const bioParagraphs = activeBio
    ? activeBio.split('\n\n').map((p) => p.trim()).filter(Boolean)
    : []

  return (
    <article className="bg-white border-2 border-gold/40 p-8 md:p-12 mb-16 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Founder Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-offwhite shadow-md">
            <Image
              src={photo}
              alt={`${name} - ${role}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="overlay-gradient pointer-events-none" aria-hidden="true" />

            <div className="absolute top-4 left-4 bg-forest text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5 shadow">
              <ShieldCheck size={14} />
              Founder Profile
            </div>
          </div>
        </div>

        {/* Founder Details */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="section-label text-gold block mb-1">
              {sectionTitle}
            </span>
            {headline && (
              <h3 className="font-serif text-xl md:text-2xl text-charcoal/90 font-normal mb-2 italic">
                {headline}
              </h3>
            )}
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-normal leading-tight mb-2">
              {name}
            </h2>
            <p className="font-sans text-forest font-medium text-sm md:text-base tracking-wide">
              {role}
            </p>
          </div>

          <div className="space-y-4 text-stone leading-relaxed font-light text-sm md:text-base">
            {bioParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Official Credentials */}
          {credentials.length > 0 && (
            <div className="bg-offwhite p-5 border-l-2 border-gold">
              <p className="text-xs font-bold uppercase tracking-wider text-forest mb-3 flex items-center gap-1.5">
                <Award size={15} className="text-gold" />
                Verified Official Credentials:
              </p>
              <ul className="space-y-1.5">
                {credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-charcoal/85">
                    <CheckCircle size={13} className="text-gold shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(specialties.length > 0 || languages.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {specialties.length > 0 && (
                <div>
                  <p className="font-semibold uppercase tracking-wider text-stone mb-1 flex items-center gap-1.5">
                    <Compass size={13} className="text-gold" />
                    Specialist Areas:
                  </p>
                  <p className="text-charcoal/80">{specialties.join(', ')}</p>
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <p className="font-semibold uppercase tracking-wider text-stone mb-1 flex items-center gap-1.5">
                    <Languages size={13} className="text-gold" />
                    Languages:
                  </p>
                  <p className="text-charcoal/80">{languages.join(', ')}</p>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-cream flex flex-wrap gap-4 items-center">
            <Link
              href={`/team/${founderSlug}`}
              className="btn btn-sm btn-outline"
            >
              <User size={14} />
              <span>View Founder Profile</span>
            </Link>
            <Link href="/start-planning" className="btn btn-sm btn-primary">
              <span>Plan a Journey with Anthony</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
