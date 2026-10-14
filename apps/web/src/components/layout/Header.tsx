"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";

interface NavLinkItem {
  href: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  {
    href: "/tours",
    label: "Tour Packages",
  },
  {
    href: "/special-packages",
    label: "Special Packages",
  },
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/reviews",
    label: "Traveller Stories",
  },
  {
    href: "/blog",
    label: "Journal",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isTransparentPage =
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/tours/") ||
    pathname.startsWith("/special-packages/");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isTransparent = isTransparentPage && !isScrolled;

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        style={{ zIndex: isMobileOpen ? 70 : 50 }}
        className={`nav ${
          isMobileOpen
            ? "nav-solid bg-transparent shadow-none"
            : isTransparent
              ? "nav-transparent"
              : "nav-solid"
        }`}
        role="banner"
      >
        <div className="container relative z-10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Anthony Holidays - Home"
              className="relative z-10"
            >
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-serif text-xl lg:text-2xl font-semibold tracking-[0.08em] uppercase transition-colors duration-400 ${
                    isMobileOpen || isTransparent
                      ? "text-ivory"
                      : "text-forest"
                  }`}
                >
                  Anthony
                </span>
                <span
                  className={`font-sans text-xs font-medium tracking-[0.22em] uppercase transition-colors duration-400 ${
                    isMobileOpen || isTransparent ? "text-gold" : "text-stone"
                  }`}
                >
                  Holidays
                </span>
              </div>
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden xl:flex items-center gap-7 text-xs sm:text-sm"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link relative ${isActive ? "active" : ""} ${
                      isTransparent
                        ? isActive
                          ? ""
                          : "text-ivory/85 hover:text-ivory"
                        : isActive
                          ? "!text-gold"
                          : "text-charcoal hover:text-forest"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <Link
                href="/start-planning"
                className={`btn py-2 px-4 text-xs tracking-wider transition-colors ${
                  isTransparent
                    ? "bg-ivory/15 border border-ivory/40 text-ivory hover:bg-ivory hover:text-forest"
                    : "btn-primary"
                }`}
              >
                Start Planning
              </Link>
            </nav>

            <button
              type="button"
              aria-label={
                isMobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`xl:hidden relative z-10 w-11 h-11 flex flex-col items-center justify-center gap-1.5 p-2 rounded-full border transition-all duration-300 cursor-pointer pointer-events-auto ${
                isMobileOpen
                  ? "bg-white/15 border-gold text-gold shadow-md hover:bg-white/25"
                  : isTransparent
                    ? "bg-black/25 backdrop-blur-sm border-white/25 text-ivory hover:border-gold/60"
                    : "bg-forest/5 border-forest/15 text-forest hover:border-forest/40"
              }`}
            >
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 origin-center pointer-events-none ${
                  isMobileOpen
                    ? "rotate-45 translate-y-2 bg-gold"
                    : isTransparent
                      ? "bg-ivory"
                      : "bg-forest"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-200 pointer-events-none ${
                  isMobileOpen
                    ? "opacity-0 scale-x-0 bg-gold"
                    : isTransparent
                      ? "bg-ivory"
                      : "bg-forest"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 origin-center pointer-events-none ${
                  isMobileOpen
                    ? "-rotate-45 -translate-y-2 bg-gold"
                    : isTransparent
                      ? "bg-ivory"
                      : "bg-forest"
                }`}
              />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 pointer-events-none flex flex-col transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-forest/40 backdrop-blur-xs" />
        {[0, 1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`relative z-10 w-full flex-1 bg-forest -mb-px border-b border-white/[0.05] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transitionDelay: isMobileOpen
                ? `${step * 45}ms`
                : `${(4 - step) * 30}ms`,
            }}
          />
        ))}
      </div>
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        aria-hidden={!isMobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`fixed inset-0 z-50 flex flex-col pt-28 pb-8 px-4 sm:px-8 overflow-y-auto no-scrollbar transition-all duration-400 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-xl mx-auto w-full flex flex-col justify-between min-h-[calc(100vh-6rem)]">
          <div>
            <nav aria-label="Mobile primary navigation">
              <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
                {navLinks.map((link, idx) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <li
                      key={link.href}
                      className={`transform transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isMobileOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-20 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMobileOpen
                          ? `${100 + idx * 35}ms`
                          : `${(navLinks.length - idx) * 20}ms`,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`group relative flex items-center justify-between px-4 py-3 sm:py-3.5 transition-all duration-300 ${
                          isActive
                            ? "bg-forest-light/80 text-gold shadow-xs"
                            : "bg-white/[0.04] border-white/10 hover:border-gold/50 hover:bg-white/[0.08] text-ivory"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-1.5 h-4 rounded-full transition-all shrink-0 ${
                              isActive
                                ? "bg-gold scale-y-110"
                                : "bg-white/20 group-hover:bg-gold group-hover:scale-y-110"
                            }`}
                          />
                          <span
                            className={`font-serif text-base sm:text-lg tracking-wide transition-colors ${
                              isActive
                                ? "text-gold font-medium"
                                : "text-ivory group-hover:text-gold"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 pl-2 shrink-0">
                          {isActive && (
                            <span className="hidden sm:inline-block font-sans text-xs uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
                              Active
                            </span>
                          )}
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                              isActive
                                ? "bg-gold text-forest"
                                : "bg-white/5 text-ivory/70 group-hover:bg-gold group-hover:text-forest group-hover:translate-x-0.5"
                            }`}
                          >
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className={`mt-3 transform transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileOpen
                  ? `${100 + navLinks.length * 40}ms`
                  : "0ms",
              }}
            >
              <Link
                href="/start-planning"
                onClick={() => setIsMobileOpen(false)}
                className="btn btn-gold group w-full flex items-center justify-center gap-2.5 py-3 shadow-md"
              >
                <span>Start Planning Your Journey</span>
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
