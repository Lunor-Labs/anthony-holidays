import Image from 'next/image'
import { Award, Compass, Languages } from 'lucide-react'

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
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, role, photo, credentials, bio, specialties, languages } = member

  return (
    <article className="bg-white border border-cream p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-md">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-offwhite mb-6">
          <Image
            src={photo}
            alt={`${name} - ${role}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
          Faculty Guide
        </span>

        <h3 className="font-serif text-2xl font-normal text-charcoal mb-1">
          {name}
        </h3>

        <p className="text-xs font-medium text-forest mb-4">
          {role}
        </p>

        <p className="text-xs text-stone leading-relaxed mb-6 font-light">
          {bio}
        </p>

        {credentials && credentials.length > 0 && (
          <div className="mb-4 bg-offwhite p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-forest mb-1.5 flex items-center gap-1">
              <Award size={12} className="text-gold" />
              Credentials:
            </p>
            <ul className="space-y-1">
              {credentials.map((c, i) => (
                <li key={i} className="text-[11px] text-charcoal/80">
                  • {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-cream grid grid-cols-2 gap-2 text-[11px] text-stone">
        <div>
          <span className="font-semibold block text-charcoal/70">Focus:</span>
          <span className="line-clamp-1">{specialties[0]}</span>
        </div>
        <div>
          <span className="font-semibold block text-charcoal/70">Languages:</span>
          <span>{languages.join(', ')}</span>
        </div>
      </div>
    </article>
  )
}
