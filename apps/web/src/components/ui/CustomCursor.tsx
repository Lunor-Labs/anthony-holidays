'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Pointer } from 'lucide-react'

type CursorVariant = 'default' | 'link' | 'explore' | 'zoom' | 'drag' | 'hidden'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Position and velocity refs for fluid lerping
  const targetPos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const velocity = useRef(0)
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers (desktop mouse / trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Direct placement for instant center inverted dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Detect hover target
      const target = e.target as HTMLElement | null
      if (!target) {
        setVariant('default')
        return
      }

      // Check if user is typing or interacting with form inputs
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        setVariant('hidden')
        return
      }

      // Check explicit data-cursor attributes
      const cursorAttrEl = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorAttrEl) {
        const val = cursorAttrEl.getAttribute('data-cursor')
        if (val === 'explore') return setVariant('explore')
        if (val === 'zoom') return setVariant('zoom')
        if (val === 'drag') return setVariant('drag')
      }

      // Check tour cards, package cards, and journey items
      const tourCard = target.closest(
        'a[href^="/tours/"], a[href^="/special-packages/"], .journey-card, article.group'
      )
      if (tourCard) {
        setVariant('explore')
        return
      }

      // Check gallery / lightbox images
      const galleryItem = target.closest(
        '[data-gallery-item], .gallery-thumbnail, [data-lightbox]'
      )
      if (galleryItem) {
        setVariant('zoom')
        return
      }

      // Check buttons, links, clickable tags, and toggles
      const clickable = target.closest(
        'a, button, .btn, [role="button"], summary, label, .cursor-pointer'
      )
      if (clickable) {
        setVariant('link')
        return
      }

      setVariant('default')
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => {
      setIsVisible(false)
      setVariant('hidden')
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
      setVariant('default')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth Lerp loop for the trailing fluid golden halo with velocity-responsiveness
    const render = () => {
      const dx = targetPos.current.x - currentPos.current.x
      const dy = targetPos.current.y - currentPos.current.y

      // Calculate instantaneous movement speed
      const speed = Math.hypot(dx, dy)
      velocity.current += (speed - velocity.current) * 0.2

      // Lerp factor (0.15 = silky fluid trailing lag)
      currentPos.current.x += dx * 0.15
      currentPos.current.y += dy * 0.15

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`
      }

      animationFrameId.current = requestAnimationFrame(render)
    }

    animationFrameId.current = requestAnimationFrame(render)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [isVisible])

  if (!enabled) return null

  const isHidden = !isVisible || variant === 'hidden'

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* 1. EDITORIAL INVERTED LENS CENTER DOT (Instant Tracking with mix-blend-difference) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          pointerEvents: 'none',
          mixBlendMode: 'difference',
        }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ease-out ${
            variant === 'explore' || variant === 'zoom' || variant === 'drag'
              ? 'opacity-0 scale-0'
              : variant === 'link'
              ? 'w-1.5 h-1.5 opacity-80 scale-75'
              : isClicking
              ? 'w-2 h-2 scale-75'
              : 'w-2 h-2 opacity-100 scale-100'
          }`}
        />
      </div>

      {/* 2. FLUID GOLDEN TRAILING HALO & MORPHING CAPSULE (Smooth Lerp Follower) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ pointerEvents: 'none' }}
      >
        {/* Click ripple pulse */}
        {isClicking && (
          <span className="absolute inset-0 -m-2 rounded-full border border-gold/70 animate-ping opacity-60 pointer-events-none" />
        )}

        {/* DEFAULT STATE: Floating Minimalist Gold Halo */}
        {variant === 'default' && (
          <div
            className={`relative rounded-full flex items-center justify-center transition-all duration-300 ease-out w-9 h-9 border border-gold/55 bg-gold/[0.03] shadow-[0_0_16px_rgba(201,168,76,0.18)] ${
              isClicking ? 'scale-75 !border-gold !bg-gold/20' : 'scale-100'
            }`}
          >
            {/* Subtle inner concentric micro-ring */}
            <div className="w-4 h-4 rounded-full border border-gold/25" />
          </div>
        )}

        {/* LINK / BUTTON HOVER STATE: Glowing Magnetic Aura with ↗ Indicator */}
        {variant === 'link' && (
          <div
            className={`relative rounded-full flex items-center justify-center transition-all duration-300 ease-out w-14 h-14 border border-gold bg-gold/15 backdrop-blur-[2px] shadow-[0_0_26px_rgba(201,168,76,0.35)] ${
              isClicking ? 'scale-85 !bg-gold/30' : 'scale-100'
            }`}
          >
            {/* Elegant micro arrow */}
            <svg
              className="w-4 h-4 text-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H9M17 7V15"
              />
            </svg>
          </div>
        )}

        {/* EXPLORE / CARD HOVER STATE: Elegant Hand Pointer Icon Badge */}
        {variant === 'explore' && (
          <div
            className={`p-2 rounded-full bg-forest/95 border border-gold/85 text-gold shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-md flex items-center justify-center transition-all duration-300 ease-out ${
              isClicking ? 'scale-90 !bg-forest' : 'scale-100'
            }`}
          >
            <Pointer className="w-5 h-5 text-gold" />
          </div>
        )}

        {/* ZOOM HOVER STATE: View Lightbox Capsule */}
        {variant === 'zoom' && (
          <div
            className={`p-2 rounded-full bg-forest/95 border border-gold/85 text-gold shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap transition-all duration-300 ease-out ${
              isClicking ? 'scale-90' : 'scale-100'
            }`}
          >
            <svg
              className="w-5 h-5 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
              />
            </svg>
          </div>
        )}

        {/* DRAG HOVER STATE: Carousel Drag Capsule */}
        {variant === 'drag' && (
          <div
            className={`h-8 px-3.5 rounded-full bg-forest/95 border border-gold/85 text-gold shadow-[0_10px_28px_rgba(0,0,0,0.5)] backdrop-blur-md flex items-center gap-1 select-none transition-all duration-300 ease-out ${
              isClicking ? 'scale-90' : 'scale-100'
            }`}
          >
            <span className="font-sans text-[8px] tracking-[0.22em] uppercase font-bold text-gold">
              ‹ Drag ›
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
