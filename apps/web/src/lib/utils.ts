import { type ClassValue, clsx } from 'clsx'

// Simple cn utility without clsx dependency
export function cn(...classes: (string | undefined | null | boolean | ClassValue)[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDuration(days: number, nights: number): string {
  if (days === 1) return `1 Day`
  return `${days} Days / ${nights} Nights`
}

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getWhatsAppUrl(
  numberOrMessage?: string,
  maybeMessage?: string,
): string {
  const defaultNumber =
    process.env.PUBLIC_WHATSAPP_NUMBER || '94703247929'
  let number = defaultNumber
  let message = 'Hello, I would like to enquire about a Sri Lanka journey.'

  if (maybeMessage !== undefined) {
    number = numberOrMessage || defaultNumber
    message = maybeMessage
  } else if (numberOrMessage) {
    const cleanNumber = numberOrMessage.replace(/[\s+-]/g, '')
    if (/^\d{7,15}$/.test(cleanNumber)) {
      number = cleanNumber
    } else {
      message = numberOrMessage
    }
  }

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encodedMessage}`
}

