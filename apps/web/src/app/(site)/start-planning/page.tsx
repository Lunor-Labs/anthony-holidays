import type { Metadata } from 'next'
import { StartPlanningForm } from '@/components/planning/StartPlanningForm'

export const metadata: Metadata = {
  title: 'Start Planning Your Journey - Bespoke Sri Lanka Itineraries',
  description:
    'Begin your tailor-made journey with Anthony Holidays. Tell our Licensed National Tourist Guide Lecturers your dreams, pace, and interests.',
}

export default async function StartPlanningPage({
  searchParams,
}: {
  searchParams: Promise<{
    tour?: string
    journey?: string
    specialPackage?: string
    title?: string
    service?: string
  }>
}) {
  const params = await searchParams
  const preselected =
    params.title ||
    params.specialPackage ||
    params.journey ||
    params.tour ||
    params.service ||
    ''

  return (
    <div className="bg-surface text-primary pt-32 section-padding-bottom">
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <span className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Private Ceylon Explorations
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-primary mt-3 font-light">
          Design Your Tailor-Made Itinerary
        </h1>
        <p className="text-stone max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
          Every journey we curate is an original work of art. Share your preliminary details, and our national guide lecturers will personally hand-craft your Sri Lankan route.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <StartPlanningForm preselectedTour={preselected} />
      </div>
    </div>
  )
}
