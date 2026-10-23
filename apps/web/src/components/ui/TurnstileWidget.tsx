'use client'

import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'

export interface TurnstileWidgetRef {
  reset: () => void
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
  theme?: 'light' | 'dark' | 'auto'
  className?: string
}

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  function TurnstileWidget(
    { onVerify, onExpire, onError, theme = 'light', className = '' },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<string | null>(null)
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

    const reset = useCallback(() => {
      if (
        widgetIdRef.current !== null &&
        typeof window !== 'undefined' &&
        (window as any).turnstile
      ) {
        try {
          ;(window as any).turnstile.reset(widgetIdRef.current)
        } catch {
          // ignore
        }
      }
    }, [])

    useImperativeHandle(ref, () => ({
      reset,
    }))

    const renderWidget = useCallback(() => {
      if (!siteKey) return
      if (!containerRef.current) return
      if (typeof window === 'undefined' || !(window as any).turnstile) return
      if (widgetIdRef.current !== null) return

      try {
        widgetIdRef.current = (window as any).turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          callback: (token: string) => {
            onVerify(token)
          },
          'expired-callback': () => {
            onExpire?.()
          },
          'error-callback': () => {
            onError?.()
          },
        })
      } catch (err) {
        console.warn('[Turnstile] render error:', err)
      }
    }, [siteKey, theme, onVerify, onExpire, onError])

    useEffect(() => {
      if (!siteKey) return

      const existingScript = document.getElementById('cf-turnstile-script')
      if (existingScript) {
        if ((window as any).turnstile) {
          renderWidget()
        } else {
          existingScript.addEventListener('load', renderWidget)
          return () => {
            existingScript.removeEventListener('load', renderWidget)
          }
        }
        return
      }

      const script = document.createElement('script')
      script.id = 'cf-turnstile-script'
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)

      return () => {
        if (
          widgetIdRef.current !== null &&
          typeof window !== 'undefined' &&
          (window as any).turnstile
        ) {
          try {
            ;(window as any).turnstile.remove(widgetIdRef.current)
          } catch {
            // ignore
          }
          widgetIdRef.current = null
        }
      }
    }, [renderWidget, siteKey])

    if (!siteKey) {
      return null
    }

    return (
      <div className={`flex justify-center my-3 ${className}`}>
        <div ref={containerRef} />
      </div>
    )
  }
)
