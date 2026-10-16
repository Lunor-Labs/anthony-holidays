import React from 'react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeroProps {
  badge?: string
  title: string | React.ReactNode
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  breadcrumbCurrent?: string
  className?: string
  maxWidth?: '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  children?: React.ReactNode
}

export function PageHero({
  badge,
  title,
  description,
  breadcrumbs,
  breadcrumbCurrent,
  className = '',
  maxWidth = '5xl',
  children,
}: PageHeroProps) {
  const breadcrumbList: BreadcrumbItem[] = breadcrumbs || [
    { label: 'Home', href: '/' },
    ...(breadcrumbCurrent ? [{ label: breadcrumbCurrent }] : []),
  ]

  const maxWidthClass = {
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
  }[maxWidth]

  return (
    <header
      className={`bg-forest pt-28 pb-8 md:pt-30 md:pb-10 text-ivory ${className}`}
      aria-label="Page header"
    >
      <div className="container">
        {breadcrumbList.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm mb-4 text-ivory/50"
          >
            {breadcrumbList.map((crumb, index) => {
              const isLast = index === breadcrumbList.length - 1
              return (
                <React.Fragment key={crumb.label + index}>
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="text-ivory/50 hover:text-ivory transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gold">{crumb.label}</span>
                  )}
                  {!isLast && <span className="mx-2 text-ivory/40">/</span>}
                </React.Fragment>
              )
            })}
          </nav>
        )}

        {badge && (
          <span className="section-label text-gold block mb-2">
            {badge}
          </span>
        )}

        <h1
          className={`font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-[1.1] mb-4 ${maxWidthClass}`}
        >
          {title}
        </h1>

        {description && (
          <p
            className={`font-sans text-base lg:text-lg text-ivory/75 leading-relaxed font-light ${maxWidthClass}`}
          >
            {description}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  )
}
