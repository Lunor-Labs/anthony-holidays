import React from 'react'
import { Check, X, Building, Car, UserCheck, ShieldAlert, Plane, FileText, Landmark } from 'lucide-react'

export interface JourneyInclusionsProps {
  inclusions: string[]
  exclusions: string[]
  includedSites?: string[]
  optionalSites?: string[]
  accommodationDetails?: string
  transportDetails?: string
  guideDetails?: string
  insuranceInfo?: string
  visaInfo?: string
  airTicketInfo?: string
}

export function JourneyInclusions({
  inclusions,
  exclusions,
  includedSites,
  optionalSites,
  accommodationDetails,
  transportDetails,
  guideDetails,
  insuranceInfo,
  visaInfo,
  airTicketInfo,
}: JourneyInclusionsProps) {
  const hasTravelLogistics =
    accommodationDetails ||
    transportDetails ||
    guideDetails ||
    (includedSites && includedSites.length > 0) ||
    (optionalSites && optionalSites.length > 0)

  const hasTravelAdvisory = insuranceInfo || visaInfo || airTicketInfo

  return (
    <section className="mb-14 space-y-10">
      {/* 1. Core Inclusions & Exclusions */}
      <div>
        <h2 className="font-serif text-2xl text-charcoal mb-6 font-normal">
          What&apos;s Included &amp; Excluded
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inclusions */}
          <div className="bg-white p-7 border border-sand/60">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-forest mb-5 flex items-center gap-2">
              <Check size={16} className="text-forest" />
              Included in this Package
            </h3>
            <ul className="space-y-3">
              {inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-stone">
                  <Check
                    size={15}
                    className="text-forest mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-white p-7 border border-sand/60">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone mb-5 flex items-center gap-2">
              <X size={16} className="text-stone" />
              Not Included (Optional Extras)
            </h3>
            <ul className="space-y-3">
              {exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-stone/80">
                  <X
                    size={15}
                    className="text-stone/40 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Accommodation, Sites & Transport Arrangements (Only rendered if fields are present) */}
      {hasTravelLogistics && (
        <div className="bg-white p-8 border border-sand/60">
          <h3 className="font-serif text-2xl text-charcoal mb-6 font-normal">
            Accommodation &amp; Travel Arrangements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodationDetails && (
              <div className="flex items-start gap-3.5">
                <Building size={18} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-1">
                    Accommodation Standards
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    {accommodationDetails}
                  </p>
                </div>
              </div>
            )}

            {transportDetails && (
              <div className="flex items-start gap-3.5">
                <Car size={18} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-1">
                    Transport Arrangements
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    {transportDetails}
                  </p>
                </div>
              </div>
            )}

            {guideDetails && (
              <div className="flex items-start gap-3.5">
                <UserCheck size={18} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-1">
                    Guide &amp; Chauffeur Details
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    {guideDetails}
                  </p>
                </div>
              </div>
            )}

            {includedSites && includedSites.length > 0 && (
              <div className="flex items-start gap-3.5">
                <Landmark size={18} className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-forest mb-1">
                    Included Sites &amp; Monuments
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    {includedSites.join(', ')}
                  </p>
                </div>
              </div>
            )}

            {optionalSites && optionalSites.length > 0 && (
              <div className="flex items-start gap-3.5">
                <Landmark size={18} className="text-stone shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone mb-1">
                    Optional Sites &amp; Excursions
                  </h4>
                  <p className="text-xs text-stone leading-relaxed">
                    {optionalSites.join(', ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Essential Travel Advisory (Insurance, Visas, Flights) */}
      {hasTravelAdvisory && (
        <div className="bg-ivory p-6 border-l-4 border-gold">
          <h3 className="font-serif text-xl text-forest mb-4 font-normal flex items-center gap-2">
            <ShieldAlert size={18} className="text-gold" />
            Important Travel Advisory
          </h3>

          <div className="space-y-3 text-xs text-charcoal/85 leading-relaxed">
            {insuranceInfo && (
              <div className="flex items-start gap-2">
                <ShieldAlert size={14} className="text-gold shrink-0 mt-0.5" />
                <p>
                  <strong className="text-charcoal">Travel Insurance:</strong> {insuranceInfo}
                </p>
              </div>
            )}
            {visaInfo && (
              <div className="flex items-start gap-2">
                <FileText size={14} className="text-gold shrink-0 mt-0.5" />
                <p>
                  <strong className="text-charcoal">Visa Information:</strong> {visaInfo}
                </p>
              </div>
            )}
            {airTicketInfo && (
              <div className="flex items-start gap-2">
                <Plane size={14} className="text-gold shrink-0 mt-0.5" />
                <p>
                  <strong className="text-charcoal">Flight Arrangements:</strong> {airTicketInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
