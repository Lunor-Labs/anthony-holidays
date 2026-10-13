import Image from 'next/image'
import Link from 'next/link'
import { Award, Compass, Languages, ArrowRight } from 'lucide-react'
import { slugify } from '@/lib/utils'

export interface TeamMemberCardProps {
  member: {
    id: string
    name: string
    role: string
    photo: string
    credentials: string[]
    bio: string
    specialties: string[]
    languages: string[]
    slug?: string
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, role, photo, credentials, bio, specialties, languages } = member
  const memberSlug = member.slug || slugify(name)

  return (
    <article className="bg-white border border-cream p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-md group">
      <div>
        <Link href={`/team/${memberSlug}`} className="block relative aspect-[4/3] overflow-hidden bg-offwhite mb-6">
          <Image
            src={photo}
            alt={`${name} - ${role}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <span className="text-xs font-bold uppercase tracking-wider text-gold block mb-1">
          Faculty Guide
        </span>

        <h3 className="font-serif text-2xl font-normal text-charcoal mb-1">
          <Link href={`/team/${memberSlug}`} className="hover:text-forest transition-colors">
            {name}
          </Link>
        </h3>

        <p className="text-xs font-medium text-forest mb-4">
          {role}
        </p>

        <p className="text-xs text-stone leading-relaxed mb-6 font-light line-clamp-3">
          {bio}
        </p>

        {credentials && credentials.length > 0 && (
          <div className="mb-4 bg-offwhite p-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-forest mb-1.5 flex items-center gap-1">
              <Award size={12} className="text-gold" />
              Credentials:
            </p>
            <ul className="space-y-1">
              {credentials.slice(0, 2).map((c, i) => (
                <li key={i} className="text-xs text-charcoal/80 line-clamp-1">
                  • {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-cream flex items-center justify-between text-xs text-stone">
        <div>
          <span className="font-semibold block text-charcoal/70">Focus:</span>
          <span className="line-clamp-1">{specialties[0]}</span>
        </div>
        <Link
          href={`/team/${memberSlug}`}
          className="btn-link"
        >
          <span>View Profile</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}
