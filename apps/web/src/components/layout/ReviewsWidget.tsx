"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  X,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageSquarePlus,
  Sparkles,
  Quote,
  ChevronRight,
} from "lucide-react";
import { FALLBACK_TESTIMONIALS } from "@/data/fallback-data";

export function ReviewsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "read">("write");
  const drawerRef = useRef<HTMLDivElement>(null);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [tourName, setTourName] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [websiteTrap, setWebsiteTrap] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!guestName.trim()) {
      setErrorMessage("Please enter your name or preferred display alias.");
      return;
    }

    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setErrorMessage(
        "Please share a few words about your journey (min. 10 characters).",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          country: country.trim() || undefined,
          rating,
          tourName: tourName.trim() || undefined,
          reviewText: reviewText.trim(),
          website_trap: websiteTrap,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit review.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message || "An error occurred while submitting your review.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setGuestName("");
    setCountry("");
    setTourName("");
    setReviewText("");
    setRating(5);
    setErrorMessage("");
  };

  const ratingLabels: { [key: number]: string } = {
    1: "1 Star - Disappointing",
    2: "2 Stars - Could be better",
    3: "3 Stars - Satisfactory",
    4: "4 Stars - Wonderful journey",
    5: "5 Stars - Truly exceptional",
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-5/6 -translate-y-1/2 z-40 group cursor-pointer flex items-center bg-forest text-ivory border-y border-r border-gold/40 hover:border-gold shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-r-xl transition-all duration-300 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-gold/50"
        aria-label="Open guest reviews and feedback side modal"
        title="Verified Client Reviews - Anthony Holidays"
      >
        <div className="py-4 px-1 flex flex-col items-center gap-2.5 select-none">
          <span className="font-sans text-xs tracking-[0.25em] font-semibold text-ivory/95 [writing-mode:vertical-lr] rotate-180 py-1 group-hover:text-gold transition-colors duration-200">
            Reviews
          </span>
        </div>
      </button>
      <div
        className={`fixed inset-0 bg-black/65 backdrop-blur-xs z-[99990] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        aria-modal="true"
        role="dialog"
        aria-label="Guest Reviews & Experience Submission"
        data-lenis-prevent
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-[99995] w-[calc(100vw-1rem)] sm:w-[480px] md:w-[480px] max-h-[85vh] bg-ivory rounded-r-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.55)] flex flex-col border border-gold/40 overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? "translate-x-0 opacity-100 scale-100 pointer-events-auto"
            : "-translate-x-8 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-forest-dark text-ivory px-5 py-3.5 border-b border-gold/20 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl font-light text-gold leading-none ">
                4.9
              </span>
              <div>
                <div className="flex items-center gap-1 text-gold mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[11px] text-black font-sans tracking-wide">
                  Exceptional • 120+ verified travelers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gold/90 font-sans uppercase tracking-wider bg-gold/10 px-2.5 py-1 border border-gold/30">
                <ShieldCheck size={12} className="text-gold" />
                <span>100% Authentic</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold/20 text-ivory/80 hover:text-gold border border-white/10 hover:border-gold/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
                aria-label="Close reviews panel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex border-b border-sand bg-white shrink-0">
          <button
            onClick={() => setActiveTab("write")}
            className={`flex-1 py-3 px-4 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
              activeTab === "write"
                ? "border-forest text-forest bg-forest/5"
                : "border-transparent text-stone hover:text-charcoal"
            }`}
          >
            <MessageSquarePlus size={14} className="text-gold" />
            <span>Add Your Review</span>
          </button>

          <button
            onClick={() => setActiveTab("read")}
            className={`flex-1 py-3 px-4 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
              activeTab === "read"
                ? "border-forest text-forest bg-forest/5"
                : "border-transparent text-stone hover:text-charcoal"
            }`}
          >
            <Quote size={13} className="text-gold" />
            <span>Read Stories ({FALLBACK_TESTIMONIALS.length}+)</span>
          </button>
        </div>

        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-6"
        >
          {activeTab === "write" && (
            <div>
              {submitted ? (
                <div className="py-8 px-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-forest text-gold border-2 border-gold flex items-center justify-center mx-auto mb-5 shadow-lg animate-fade-in">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    Ayubowan & Thank You!
                  </h3>
                  <p className="text-sm text-stone leading-relaxed mb-6 font-light max-w-sm mx-auto">
                    Your journey reflections have been received. To protect the
                    integrity of our guest community, our team verifies all
                    feedback before it is published on the site.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={resetForm}
                      className="btn btn-outline text-xs cursor-pointer"
                    >
                      Submit Another Reflection
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn btn-primary text-xs cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="font-serif text-xl text-charcoal mb-1">
                      Share Your Sri Lanka Experience
                    </h3>
                    <p className="text-xs text-stone leading-relaxed font-light">
                      Your authentic insights help future travelers choose
                      expert-led Sri Lanka journeys.
                    </p>
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_trap"
                      value={websiteTrap}
                      onChange={(e) => setWebsiteTrap(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="bg-white p-4 border border-sand rounded-xs">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                      Overall Rating *
                    </label>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                          aria-label={`${star} star rating`}
                        >
                          <Star
                            size={26}
                            className={
                              star <= (hoverRating || rating)
                                ? "fill-gold text-gold drop-shadow-xs"
                                : "text-sand stroke-1"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-xs font-medium text-gold font-sans">
                      {ratingLabels[hoverRating || rating]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. David & Sarah M."
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-sand text-sm text-charcoal outline-none focus:border-forest rounded-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. United Kingdom"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-sand text-sm text-charcoal outline-none focus:border-forest rounded-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Journey or Package Taken (Optional)
                    </label>
                    <select
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-sand text-sm text-charcoal outline-none focus:border-forest rounded-xs transition-colors cursor-pointer"
                    >
                      <option value="">
                        Select a journey or type below...
                      </option>
                      <option value="Cultural Triangle & Ancient Cities">
                        Cultural Triangle & Ancient Cities
                      </option>
                      <option value="Ceylon Tea Highlands & Ella">
                        Ceylon Tea Highlands & Ella
                      </option>
                      <option value="Southern Coast & Galle Fort Heritage">
                        Southern Coast & Galle Fort Heritage
                      </option>
                      <option value="Wildlife Safari & Rainforest Expedition">
                        Wildlife Safari & Rainforest Expedition
                      </option>
                      <option value="Complete Island Odyssey (14 Days)">
                        Complete Island Odyssey (14 Days)
                      </option>
                      <option value="Tailor-Made Private Journey">
                        Tailor-Made Private Journey
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Your Journey Reflection *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Share your thoughts about your guide's knowledge, hospitality, vehicle comfort, hotels, and favorite moments across Sri Lanka…"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-sand text-sm text-charcoal outline-none focus:border-forest rounded-xs transition-colors resize-y"
                    />
                    <div className="flex justify-between items-center mt-1 text-[11px] text-stone">
                      <span>Minimum 10 characters</span>
                      <span>{reviewText.length} characters</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-stone bg-sand/20 p-3 rounded-xs border-l-2 border-gold">
                    <ShieldCheck
                      size={16}
                      className="text-forest shrink-0 mt-0.5"
                    />
                    <p className="leading-relaxed">
                      All reviews are verified by our team. We respect every
                      traveler’s honest feedback and publish genuine
                      reflections.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-gold w-full justify-center py-3.5 cursor-pointer text-sm shadow-md"
                  >
                    {isSubmitting ? (
                      "Submitting Reflection…"
                    ) : (
                      <>
                        <span>Submit Your Review</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === "read" && (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="font-serif text-xl text-charcoal mb-1">
                  Authentic Traveler Stories
                </h3>
                <p className="text-xs text-stone leading-relaxed font-light">
                  Direct reflections from guests who explored Sri Lanka with
                  Anthony Holidays.
                </p>
              </div>

              {FALLBACK_TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-5 border border-sand rounded-xs shadow-xs hover:border-gold/60 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className="fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-forest bg-forest/5 px-2 py-0.5 rounded-full border border-forest/15 font-semibold">
                      Verified Guest
                    </span>
                  </div>

                  <p className="text-sm font-light text-charcoal/90 leading-relaxed italic mb-3">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2.5 border-t border-sand/50">
                    <span className="font-medium text-forest">
                      {t.travellerName}
                      {t.travellerCountry && (
                        <span className="text-stone font-normal">
                          {" "}
                          • {t.travellerCountry}
                        </span>
                      )}
                    </span>
                    {t.journeyTitle && (
                      <span className="text-[11px] text-gold font-serif">
                        {t.journeyTitle}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-2 text-center">
                <button
                  onClick={() => setActiveTab("write")}
                  className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-gold uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  <span>Traveled with us? Leave your review</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-sand/30 border-t border-sand flex items-center justify-between text-xs text-stone shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] tracking-wide">
              Official Sri Lanka Tourist Board Licensed Operator
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-stone hover:text-charcoal text-xs underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  );
}
