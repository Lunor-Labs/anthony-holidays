import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Anthony Holidays",
  description:
    "Privacy Policy and data protection terms for Anthony Holidays Sri Lanka.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface text-primary pt-32 section-padding-bottom">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-light mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted mb-8 uppercase tracking-wider">
          Last Updated: October 2026 • Anthony Holidays Sri Lanka
        </p>

        <div className="prose prose-emerald max-w-none text-deep space-y-6 text-sm leading-relaxed">
          <p>
            At Anthony Holidays (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;), we deeply respect your personal privacy. This
            Privacy Policy details how we handle, process, and safeguard
            information when you interact with our website or submit journey
            inquiries.
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            1. Information We Collect
          </h2>
          <p>
            When you complete our &ldquo;Start Planning&rdquo; form or reach out
            via WhatsApp, we collect details necessary to formulate your private
            bespoke journey:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Full Name and contact details (email address, telephone/WhatsApp
              number).
            </li>
            <li>Country of residence and citizenship.</li>
            <li>
              Travel dates, party composition, children ages, and accommodation
              preferences.
            </li>
            <li>
              Dietary notes, mobility details, or cultural interests shared in
              special requests.
            </li>
          </ul>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            2. How We Use Your Data
          </h2>
          <p>
            Your information is used strictly to curate your private travel
            itinerary, verify logistics with licensed boutique partners, and
            respond to your questions. We never sell, lease, or distribute guest
            data to third-party marketing brokers.
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            3. Data Security & Storage
          </h2>
          <p>
            Inquiries submitted via our website are stored securely in our
            enterprise PostgreSQL database located on secure servers with
            restricted administrative access.
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            4. Your Rights
          </h2>
          <p>
            You have the right to request access to the personal data we hold
            about you or request its permanent erasure from our active records.
            To do so, please write to us at{" "}
            <a
              href="mailto:privacy@anthonyholidays.com"
              className="text-primary underline font-medium"
            >
              privacy@anthonyholidays.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
