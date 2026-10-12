import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Anthony Holidays",
  description:
    "Terms and conditions of inquiry and travel planning with Anthony Holidays Sri Lanka.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface text-primary pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-light mb-4">
          Terms & Conditions
        </h1>
        <p className="text-xs text-muted mb-8 uppercase tracking-wider">
          Phase 1 Inquiries & Travel Planning Terms • Anthony Holidays
        </p>

        <div className="prose prose-emerald max-w-none text-deep space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to Anthony Holidays. By accessing our website or submitting
            travel inquiries, you agree to the following terms and guidelines.
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            1. Nature of Website Services (Phase 1)
          </h2>
          <p>
            This website functions as an inspirational showcase and bespoke
            itinerary formulation portal. Submitting a &ldquo;Start
            Planning&rdquo; form constitutes an inquiry for custom travel
            services and does not represent a confirmed reservation or financial
            transaction.
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            2. Quotations and Itinerary Formulation
          </h2>
          <p>
            All custom itineraries, suggested routes, and estimated pricing
            presented during initial discussions are subject to availability,
            seasonal rate fluctuations, and formal confirmation by both parties.
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            3. Licensed National Tourist Guide Lecturers
          </h2>
          <p>
            Anthony Holidays guarantees that all guided tours marked as
            lecturer-led are accompanied by professionals holding valid,
            certified licenses issued by the Sri Lanka Tourism Development
            Authority (SLTDA).
          </p>

          <h2 className="font-serif text-xl text-primary pt-4 font-medium">
            4. Intellectual Property
          </h2>
          <p>
            All custom narrative descriptions, journey layouts, proprietary
            itineraries, and photography featured on this site are the
            intellectual property of Anthony Holidays or used under express
            licensing. Unauthorized commercial reproduction is prohibited.
          </p>

          <div className="p-4 bg-cream border border-sand text-xs text-subtle rounded-sm mt-8">
            Placeholder Notice: These terms govern initial inquiry and planning
            interactions for Phase 1. Complete formal contract conditions for
            tour execution, cancellation tiers, and travel insurance
            verification are provided alongside individual itinerary contracts.
          </div>
        </div>
      </div>
    </div>
  );
}
