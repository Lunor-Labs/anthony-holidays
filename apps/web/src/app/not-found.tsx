import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import "@/app/globals.css";

export const metadata = {
  title: "404 - Page Not Found · Anthony Holidays",
  description: "The requested page could not be found on Anthony Holidays.",
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-cream font-sans text-charcoal min-h-screen flex flex-col justify-between">
        <main className="relative flex-1 flex items-center justify-center py-24 px-4 overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
            aria-hidden="true"
          >
            <span className="font-serif text-[18vw] font-bold text-sand/40 tracking-widest uppercase leading-none">
              404
            </span>
          </div>

          <div className="container relative z-10 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 border border-forest/15 text-forest text-xs uppercase font-sans tracking-widest font-semibold mb-6">
              <span>Lost in the Wilds · Error 404</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-forest font-normal leading-tight tracking-tight mb-5">
              Every Path Tells a Story, <br />
              <span className="italic text-gold font-light">
                Yet This Trail Has Faded
              </span>
            </h1>

            <p className="font-sans text-stone text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8">
              The sanctuary or destination you seek may have shifted with the
              monsoons or drifted into the highland mist. Allow our guide
              lecturers to direct your expedition back toward Ceylon’s finest
              sights.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
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
          </div>
        </main>
      </body>
    </html>
  );
}
