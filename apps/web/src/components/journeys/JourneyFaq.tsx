import React from 'react'

export interface JourneyFaqProps {
  faqs: { question: string; answer: string }[]
}

export function JourneyFaq({ faqs }: JourneyFaqProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="mb-14">
      <h2 className="font-serif text-2xl text-charcoal mb-6 font-normal">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white border border-sand/60 p-6 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="font-serif text-lg text-charcoal group-open:text-forest transition-colors font-normal">
                {faq.question}
              </h3>
              <span className="text-xl font-light text-stone transition-transform duration-200 group-open:rotate-45 ml-4 shrink-0">
                +
              </span>
            </summary>
            <p className="text-sm text-stone leading-relaxed mt-4 pt-4 border-t border-sand/40">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
