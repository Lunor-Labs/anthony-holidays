import React from 'react'

export interface SectionHeadingProps {
  id?: string
  label?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark' | 'forest'
  action?: React.ReactNode
  className?: string
  titleClassName?: string
  highlightClassName?: string
  breakHighlight?: boolean
}

export function SectionHeading({
  id,
  label,
  title,
  highlight,
  description,
  align = 'left',
  theme = 'light',
  action,
  className = '',
  titleClassName = '',
  highlightClassName = '',
  breakHighlight = true,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  const labelColor = 'text-gold'
  const titleColor =
    theme === 'forest' || theme === 'dark' ? 'text-ivory' : 'text-forest'
  const highlightColor = 'text-gold font-normal'
  const descColor =
    theme === 'forest' || theme === 'dark' ? 'text-ivory/70' : 'text-stone'

  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-6 mb-12 ${
        isCenter ? 'text-center justify-center' : ''
      } ${className}`}
    >
      <div className={isCenter ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
        {label && (
          <p
            className={`section-label mb-2 ${labelColor} ${
              isCenter ? 'justify-center' : ''
            }`}
          >
            {label}
          </p>
        )}
        <h2
          id={id}
          className={`text-heading-1 font-serif ${titleColor} ${titleClassName}`}
        >
          {title}
          {highlight && (
            <>
              {breakHighlight ? <br /> : ' '}
              <span className={`${highlightColor} ${highlightClassName}`}>
                {highlight}
              </span>
            </>
          )}
        </h2>
        {description && (
          <p className={`mt-4 text-base leading-relaxed ${descColor}`}>
            {description}
          </p>
        )}
      </div>

      {action && !isCenter && (
        <div className="w-full sm:w-auto sm:shrink-0 min-w-0 max-w-full">{action}</div>
      )}
    </div>
  )
}
