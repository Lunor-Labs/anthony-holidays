'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

export interface TestimonialItem {
  id: string
  quote: string
  travellerName: string
  travellerCountry?: string
  journeyTitle?: string
  rating?: number
  featured?: boolean
}

export interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[]
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const displayReviews: TestimonialItem[] = React.useMemo(() => {
    if (!testimonials || testimonials.length === 0) return []
    const featured = testimonials.filter((t) => t.featured)
    return featured.length > 0 ? featured : testimonials
  }, [testimonials])

  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const getStepWidth = useCallback(() => {
    const el = sliderRef.current
    if (!el) return 360
    const firstChild = el.firstElementChild as HTMLElement | null
    if (!firstChild) return 360
    const gap = parseFloat(window.getComputedStyle(el).gap) || 20
    return firstChild.offsetWidth + gap
  }, [])

  const updateScrollState = useCallback(() => {
    const el = sliderRef.current
    if (!el || displayReviews.length === 0) return

    const step = getStepWidth()
    const current = Math.round(el.scrollLeft / step)
    setActiveIdx(Math.max(0, Math.min(current, displayReviews.length - 1)))

    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollPrev(el.scrollLeft > 10)
    setCanScrollNext(el.scrollLeft < maxScroll - 15)
  }, [displayReviews.length, getStepWidth])

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return

    updateScrollState()
    const handleScroll = () => {
      updateScrollState()
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [updateScrollState])

  useEffect(() => {
    if (displayReviews.length <= 1 || isHovered) return

    const timer = setInterval(() => {
      const el = sliderRef.current
      if (!el) return

      const step = getStepWidth()
      const maxScroll = el.scrollWidth - el.clientWidth

      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' })
      }
    }, 4000)

    return () => clearInterval(timer)
  }, [displayReviews.length, isHovered, getStepWidth])

  const scrollPrev = () => {
    const el = sliderRef.current
    if (!el) return
    const step = getStepWidth()
    if (el.scrollLeft <= 10) {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }

  const scrollNext = () => {
    const el = sliderRef.current
    if (!el) return
    const step = getStepWidth()
    const maxScroll = el.scrollWidth - el.clientWidth
    if (el.scrollLeft >= maxScroll - 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      el.scrollBy({ left: step, behavior: 'smooth' })
    }
  }

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current
    if (!el) return
    const step = getStepWidth()
    el.scrollTo({ left: index * step, behavior: 'smooth' })
  }

  return (
    <section
      className="section-padding bg-cream/35 border-y border-sand/40 overflow-hidden"
      aria-labelledby="traveller-stories-heading"
      id="traveller-stories"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-10 xl:gap-12">
          <div className="w-full lg:w-[380px] xl:w-[450px] shrink-0 flex flex-col justify-between">
            <div>
              <SectionHeading
                id="traveller-stories-heading"
                label="Traveller Stories"
                title="Don’t Just Take"
                highlight="Our Word For It"
                description="Over 15 years of personal dedication, licensed guide lecturer expertise, and intimate island knowledge have earned Anthony Holidays glowing testimonials from discerning travellers worldwide. Each private journey is crafted with meticulous care and authentic Ceylon hospitality."
                className="mb-0"
              />
              <div className="mt-7 p-5 bg-white border border-sand/70 rounded-xs shadow-2xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="font-sans font-semibold text-xs text-charcoal tracking-wide ml-1">
                    5.0 / 5.0 Rating
                  </span>
                </div>
                <p className="text-xs text-stone leading-relaxed">
                  TripAdvisor &amp; Direct Guest Reviews &middot; 100% Verified
                  Travellers &middot; Private Expert-Led Journeys
                </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-10">
              <Link
                href="/reviews"
                className="btn btn-primary group w-full sm:w-auto inline-flex items-center gap-3"
                id="view-all-reviews-btn"
              >
                <span>View All Reviews</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {displayReviews.length > 0 ? (
            <div
              className="flex-1 min-w-0 w-full flex flex-col justify-between"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-sand/40">
                <span className="font-sans text-xs tracking-widest text-stone uppercase font-medium">
                  Story {String(activeIdx + 1).padStart(2, '0')} /{' '}
                  {String(displayReviews.length).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={displayReviews.length <= 1}
                    className="w-10 h-10 rounded-full border border-sand/80 hover:border-gold hover:text-gold flex items-center justify-center transition-all bg-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-charcoal"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    disabled={displayReviews.length <= 1}
                    className="w-10 h-10 rounded-full border border-sand/80 hover:border-gold hover:text-gold flex items-center justify-center transition-all bg-white shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-charcoal"
                    aria-label="Next review"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div
                ref={sliderRef}
                className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-0.625rem)] lg:auto-cols-[calc(50%-0.75rem)] gap-4 lg:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
                tabIndex={0}
                aria-label="Guest stories carousel"
              >
                {displayReviews.map((item) => (
                  <div
                    key={item.id}
                    className="snap-start flex flex-col h-full min-w-0"
                  >
                    <TestimonialCard testimonial={item} />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1 mt-6 pt-2">
                {displayReviews.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    className="h-8 min-w-8 p-1 flex items-center justify-center cursor-pointer"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <span
                      className={`h-1.5 transition-all duration-300 rounded-full block ${
                        activeIdx === idx
                          ? 'w-6 bg-gold'
                          : 'w-1.5 bg-sand/80 hover:bg-gold/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 min-w-0 w-full flex flex-col justify-center">
              <div className="text-center py-12 px-8 bg-white border border-sand/70 rounded-xs shadow-2xs max-w-lg mx-auto">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center text-gold">
                  <Star size={24} className="fill-gold/20 text-gold" strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-xl text-charcoal mb-2 font-normal">
                  Guest Memoirs in Moderation
                </h4>
                <p className="text-stone text-xs leading-relaxed mb-6 font-light">
                  Recent reviews from our verified travellers are currently being reviewed and published. Travelled with Anthony? We warmly invite you to share your journey.
                </p>
                <Link href="/reviews#review-form" className="btn btn-sm btn-primary">
                  Share Your Story
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
