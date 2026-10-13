import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "404 - Trail Not Found",
  description: "The requested page could not be found on Anthony Holidays.",
};

export default function NotFound() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-cream">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[18vw] font-bold text-sand/40 tracking-widest uppercase leading-none">
          404
        </span>
      </div>

      <div className="container relative z-10 max-w-3xl text-center px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 border border-forest/15 text-forest text-xs uppercase font-sans tracking-widest font-semibold mb-6">
          <span>Lost in the Wilds · Error 404</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest font-normal leading-tight tracking-tight mb-6">
          Every Path Tells a Story, <br />
          <span className="italic text-gold font-light">
            Yet This Trail Has Faded
          </span>
        </h1>

        <p className="font-sans text-stone text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          The sanctuary or destination you seek may have shifted with the
          monsoons or drifted into the highland mist. Allow our guide lecturers
          to direct your expedition back toward Ceylon’s finest sights.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/"
            className="btn btn-primary inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Home size={16} />
            <span>Return to Sanctuary</span>
          </Link>
          <Link
            href="/tours"
            className="btn btn-outline inline-flex items-center gap-2 bg-white/60 hover:bg-forest hover:text-ivory transition-all"
          >
            <span>Explore Tour Packages</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="border-t border-sand/70 pt-10">
          <p className="font-serif text-xs uppercase tracking-widest text-stone mb-6 font-medium">
            Recommended Pathways
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <Link
              href="/tours"
              className="group p-5 bg-white/80 border border-sand rounded-xs hover:border-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-gold font-semibold block mb-1">
                  Private Journeys
                </span>
                <h2 className="font-serif text-base text-forest group-hover:text-gold transition-colors font-medium">
                  Tour Packages
                </h2>
                <p className="text-xs text-stone mt-1.5 leading-relaxed">
                  8 expert-led multi-day private expeditions.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-forest font-medium mt-4 group-hover:text-gold transition-colors">
                <span>View Tours</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>

            <Link
              href="/special-packages"
              className="group p-5 bg-white/80 border border-sand rounded-xs hover:border-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-gold font-semibold block mb-1">
                  Tailored Value
                </span>
                <h2 className="font-serif text-base text-forest group-hover:text-gold transition-colors font-medium">
                  Special Packages
                </h2>
                <p className="text-xs text-stone mt-1.5 leading-relaxed">
                  Volunteering, surfing, and smart budget trips.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-forest font-medium mt-4 group-hover:text-gold transition-colors">
                <span>View Packages</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>

            <Link
              href="/start-planning"
              className="group p-5 bg-white/80 border border-sand rounded-xs hover:border-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-gold font-semibold block mb-1">
                  Bespoke Itinerary
                </span>
                <h2 className="font-serif text-base text-forest group-hover:text-gold transition-colors font-medium">
                  Custom Expedition
                </h2>
                <p className="text-xs text-stone mt-1.5 leading-relaxed">
                  Design a tailor-made private Sri Lanka tour.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-forest font-medium mt-4 group-hover:text-gold transition-colors">
                <span>Start Planning</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
