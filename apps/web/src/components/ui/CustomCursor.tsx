'use client'

import React, { useEffect, useState, useRef } from 'react'

type CursorVariant = 'default' | 'link' | 'explore' | 'zoom' | 'drag' | 'hidden'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Position refs for lerping
  const targetPos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
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

      // Direct placement for instant dot
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

      // Check tour cards, package cards, and gallery items
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

    // Smooth Lerp loop for the trailing outer navigator ring
    const render = () => {
      // Lerp factor (0.16 = smooth silky fluid trail)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.16
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.16

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

  // Outer ring dynamic size & styling based on variant and click state
  let ringClasses =
    'w-[34px] h-[34px] border border-gold/50 bg-forest/5 shadow-[0_0_12px_rgba(201,168,76,0.15)]'
  let ringContent: React.ReactNode = null

  if (variant === 'link') {
    ringClasses =
      'w-[54px] h-[54px] border-gold bg-gold/15 backdrop-blur-[1px] shadow-[0_0_18px_rgba(201,168,76,0.35)]'
  } else if (variant === 'explore') {
    ringClasses =
      'w-[76px] h-[76px] border border-gold/80 bg-forest/90 text-gold backdrop-blur-md shadow-2xl scale-100'
    ringContent = (
      <span className="font-serif text-[9px] tracking-[0.25em] uppercase font-semibold text-gold drop-shadow-xs flex items-center gap-0.5 select-none animate-fade-in">
        <span>Explore</span>
      </span>
    )
  } else if (variant === 'zoom') {
    ringClasses =
      'w-[72px] h-[72px] border border-gold/80 bg-forest/90 text-gold backdrop-blur-md shadow-2xl'
    ringContent = (
      <span className="font-serif text-xs tracking-[0.25em] uppercase font-semibold text-gold drop-shadow-xs select-none animate-fade-in">
        View
      </span>
    )
  } else if (variant === 'drag') {
    ringClasses =
      'w-[74px] h-[74px] border border-gold/80 bg-forest/90 text-gold backdrop-blur-md shadow-2xl'
    ringContent = (
      <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold text-gold drop-shadow-xs select-none animate-fade-in">
        ‹ Drag ›
      </span>
    )
  }

  const isHidden = !isVisible || variant === 'hidden'

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* 1. Direct Center Dot (Moves instantly with pointer) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`rounded-full bg-gold transition-all duration-200 ${
            variant === 'explore' || variant === 'zoom' || variant === 'drag'
              ? 'opacity-0 scale-0'
              : variant === 'link'
              ? 'w-1.5 h-1.5 shadow-[0_0_6px_rgba(201,168,76,0.9)] opacity-90'
              : 'w-2 h-2 shadow-[0_0_8px_rgba(201,168,76,0.9)] opacity-100'
          }`}
        />
      </div>

      {/* 2. Trailing Navigator Ring (Astrolabe follower with smooth lerp) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`relative rounded-full flex items-center justify-center transition-all duration-300 ease-out ${ringClasses} ${
            isClicking ? 'scale-[0.82] !border-gold !bg-gold/25' : ''
          }`}
        >
          {/* Compass / Astrolabe Crosshair Ticks in default state */}
          {variant === 'default' && (
            <>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-[5px] bg-gold/70" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1.5px] h-[5px] bg-gold/70" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[1.5px] w-[5px] bg-gold/70" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[1.5px] w-[5px] bg-gold/70" />
            </>
          )}

          {/* Contextual Badge Content (e.g. "EXPLORE", "VIEW", "DRAG") */}
          {ringContent}
        </div>
      </div>
    </div>
  )
}
