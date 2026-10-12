import React from 'react'

export interface SectionHeadingProps {
  label?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark' | 'forest'
  action?: React.ReactNode
  className?: string
}

export function SectionHeading({
  label,
  title,
  highlight,
  description,
  align = 'left',
  theme = 'light',
  action,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  const labelColor =
    theme === 'forest' || theme === 'dark' ? 'text-gold' : 'text-forest'
  const titleColor =
    theme === 'forest' || theme === 'dark' ? 'text-ivory' : 'text-charcoal'
  const highlightColor =
    theme === 'forest' || theme === 'dark' ? 'text-gold' : 'text-forest'
  const descColor =
    theme === 'forest' || theme === 'dark' ? 'text-ivory/70' : 'text-stone'

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-6 mb-12 ${
        isCenter ? 'text-center justify-center' : ''
      } ${className}`}
    >
      <div className={isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        {label && (
          <p
            className={`section-label mb-2 ${labelColor} ${
              isCenter ? 'justify-center' : ''
            }`}
          >
            {label}
          </p>
        )}
        <h2 className={`text-heading-1 font-serif ${titleColor}`}>
          {title}
          {highlight && (
            <>
              <br />
              <em className={`italic ${highlightColor}`}>{highlight}</em>
            </>
          )}
        </h2>
        {description && (
          <p className={`mt-4 text-base leading-relaxed ${descColor}`}>
            {description}
          </p>
        )}
      </div>

      {action && !isCenter && <div className="shrink-0">{action}</div>}
    </div>
  )
}
