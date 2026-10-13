import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Award,
  CheckCircle,
  Languages,
  Compass,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Calendar,
} from 'lucide-react'
import { getTeamMembers, getTeamMemberBySlug } from '@/lib/payload-data'
import { getWhatsAppUrl } from '@/lib/utils'
import { CallToActionSection } from '@/components/home/CallToActionSection'

type Params = Promise<{ slug: string }>

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const member = await getTeamMemberBySlug(slug)

  if (!member) {
    return { title: 'Team Member Not Found - Anthony Holidays' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    title: `${member.name} - ${member.role} | Anthony Holidays Sri Lanka`,
    description: member.bio ? member.bio.slice(0, 160) : `Learn more about ${member.name}, Licensed National Tourist Guide Lecturer at Anthony Holidays.`,
    openGraph: {
      title: `${member.name} - ${member.role}`,
      description: member.bio ? member.bio.slice(0, 160) : `Licensed Guide Lecturer at Anthony Holidays Sri Lanka`,
      images: [{ url: member.photo, alt: member.name }],
      type: 'profile',
      url: `${siteUrl}/team/${slug}`,
    },
    alternates: {
      canonical: `${siteUrl}/team/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const members = await getTeamMembers()
  return members.map((m: any) => ({ slug: m.slug }))
}

export default async function SingleTeamMemberPage({
  params,
}: {
  params: Params
}) {
  const { slug } = await params
  const member = await getTeamMemberBySlug(slug)

  if (!member) {
    notFound()
  }

  const whatsappUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94703247929',
    `Hello Anthony Holidays, I would like to inquire about planning a private journey with ${member.name} (${member.role}).`
  )

  const bioParagraphs = member.bio
    ? member.bio.split('\n\n').map((p: string) => p.trim()).filter(Boolean)
    : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    image: member.photo,
    worksFor: {
      '@type': 'TravelAgency',
      name: 'Anthony Holidays',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    knowsAbout: member.specialties,
    knowsLanguage: member.languages,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="bg-forest pt-32 pb-16 md:pt-40 md:pb-20 text-ivory">
        <div className="container">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm mb-8 text-ivory/50"
          >
            <Link href="/" className="text-ivory/50 hover:text-ivory transition-colors">
              Home
            </Link>
            <span aria-hidden="true" className="text-ivory/40">/</span>
            <Link href="/about#team" className="text-ivory/50 hover:text-ivory transition-colors">
              About Us
            </Link>
            <span aria-hidden="true" className="text-ivory/40">/</span>
            <span className="text-gold">{member.name}</span>
          </nav>

          <span className="section-label text-gold block mb-3">
            {member.isFounder ? 'Founder & Senior Lecturer' : 'Faculty Guide Lecturer'}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-tight mb-4 max-w-4xl">
            {member.name}
          </h1>

          <p className="font-sans text-base lg:text-lg text-ivory/80 max-w-2xl leading-relaxed font-light">
            {member.role}
          </p>
        </div>
      </div>

      {/* Main Profile Section */}
      <section className="section-padding bg-offwhite">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Portrait, Credentials, Meta & Direct CTA */}
            <div className="lg:col-span-5 space-y-8">
              <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-xl border border-sand">
                <Image
                  src={member.photo}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />

                <div className="absolute top-4 left-4 bg-forest/95 backdrop-blur-xs text-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5 shadow border border-gold/30">
                  <ShieldCheck size={14} />
                  <span>SLTDA Certified</span>
                </div>
              </div>

              {/* Official Credentials Box */}
              {member.credentials && member.credentials.length > 0 && (
                <div className="bg-white p-6 border-l-4 border-gold shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-forest mb-3 flex items-center gap-1.5">
                    <Award size={16} className="text-gold" />
                    <span>Verified Official Credentials</span>
                  </p>
                  <ul className="space-y-2">
                    {member.credentials.map((cred: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal/85 leading-relaxed">
                        <CheckCircle size={14} className="text-gold shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specialist Meta Card */}
              <div className="bg-white p-6 border border-cream space-y-4 shadow-sm text-xs sm:text-sm">
                <div>
                  <p className="font-semibold uppercase tracking-wider text-stone mb-2 flex items-center gap-1.5 text-xs">
                    <Compass size={14} className="text-gold" />
                    <span>Specialist Areas</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((s: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-ivory text-forest text-xs px-2.5 py-1 border border-sand/60 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-cream">
                  <p className="font-semibold uppercase tracking-wider text-stone mb-2 flex items-center gap-1.5 text-xs">
                    <Languages size={14} className="text-gold" />
                    <span>Languages Spoken</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.languages.map((lang: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-ivory text-charcoal text-xs px-2.5 py-1 border border-sand/60"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Booking Card */}
              <div className="bg-forest text-ivory p-7 border border-gold/30 shadow-lg space-y-4">
                <h3 className="font-serif text-xl text-gold font-normal">
                  Request {member.name.split(' ')[0]} as Your Guide
                </h3>
                <p className="text-xs text-ivory/80 leading-relaxed font-light">
                  Directly consult with our team to check {member.name.split(' ')[0]}&apos;s seasonal availability for your travel dates.
                </p>
                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    href={`/start-planning?preferredGuide=${encodeURIComponent(member.name)}`}
                    className="btn btn-sm btn-gold w-full font-semibold"
                  >
                    <Calendar size={14} />
                    <span>Plan a Journey With {member.name.split(' ')[0]}</span>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-ivory w-full"
                  >
                    <MessageCircle size={14} />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Biography & Narrative */}
            <div className="lg:col-span-7 space-y-10">
              <div className="bg-white p-8 md:p-12 border border-cream shadow-sm">
                <span className="section-label text-gold block mb-2">
                  Biography &amp; Guiding Background
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6 font-normal">
                  Dedicated to Genuine Island Immersion
                </h2>

                <div className="space-y-5 text-stone leading-relaxed font-light text-base">
                  {bioParagraphs.map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Guiding Philosophy Blockquote */}
                <div className="border-l-2 border-gold pl-6 py-3 my-8 bg-secondary/10">
                  <blockquote className="font-serif italic text-lg text-forest leading-relaxed">
                    “Travelling through Sri Lanka with a Licensed National Guide Lecturer transforms ancient ruins from inert stone into living chronicles of civilization, engineering, and enduring human spirit.”
                  </blockquote>
                </div>

                <div className="pt-8 border-t border-cream flex flex-wrap gap-4 items-center">
                  <Link href="/about#team" className="text-xs text-stone hover:text-forest underline">
                    ← Back to All Guides in About Us
                  </Link>
                  <Link href="/tours" className="text-xs text-stone hover:text-forest underline">
                    Explore Curated Tour Packages
                  </Link>
                </div>
              </div>

              {/* Guiding Standards Callout */}
              <div className="bg-cream p-8 border border-forest/10 space-y-4">
                <h3 className="font-serif text-xl text-forest font-normal">
                  The National Tourist Guide Lecturer Distinction
                </h3>
                <p className="text-sm text-stone leading-relaxed font-light">
                  In Sri Lanka, the designation of Licensed National Tourist Guide Lecturer is the country&apos;s highest official tourist guide qualification, awarded by the Sri Lanka Tourism Development Authority (SLTDA) only after exhaustive academic examinations in islandwide archaeology, natural history, botany, Buddhist architecture, and multi-lingual oratory.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest hover:text-gold transition-colors"
                  >
                    <span>Read Our Heritage &amp; Philosophy</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  )
}
