'use client'

/**
 * Executes Google reCAPTCHA v3 on the client and returns a token.
 * Safe fallback to empty string if blocked or unavailable.
 */
export async function getRecaptchaToken(action: string = 'submit'): Promise<string> {
  if (typeof window === 'undefined') return ''

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey) return ''

  return new Promise<string>((resolve) => {
    const grecaptcha = (window as any).grecaptcha

    if (!grecaptcha) {
      // reCAPTCHA not loaded (e.g. adblocker or network issue)
      resolve('')
      return
    }

    try {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(siteKey, { action })
          .then((token: string) => resolve(token || ''))
          .catch((err: any) => {
            console.warn('[reCAPTCHA v3] Execution error:', err)
            resolve('')
          })
      })
    } catch (err) {
      console.warn('[reCAPTCHA v3] Ready error:', err)
      resolve('')
    }
  })
}
