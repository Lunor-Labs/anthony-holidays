"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/tours", label: "Tour Packages" },
  { href: "/special-packages", label: "Special Packages" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
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

  const isTransparent = isTransparentPage && !isScrolled;

  return (
    <>
      <header
        className={`nav ${isTransparent ? "nav-transparent" : "nav-solid"}`}
        role="banner"
      >
        <div className="container">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Anthony Holidays - Home">
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-serif text-xl lg:text-2xl font-semibold tracking-[0.08em] uppercase transition-colors duration-400 ${
                    isTransparent ? "text-ivory" : "text-forest"
                  }`}
                >
                  Anthony
                </span>
                <span
                  className={`font-sans text-xs font-medium tracking-[0.22em] uppercase transition-colors duration-400 ${
                    isTransparent ? "text-ivory/70" : "text-stone"
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${
                    isTransparent
                      ? "text-ivory/85 hover:text-ivory"
                      : pathname === link.href
                        ? "text-forest font-semibold"
                        : "text-charcoal hover:text-forest"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}

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
              aria-label={
                isMobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`xl:hidden bg-transparent border-0 cursor-pointer p-2 ${
                isTransparent ? "text-ivory" : "text-charcoal"
              }`}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        aria-hidden={!isMobileOpen}
        className={`fixed inset-0 z-[99] bg-forest flex flex-col px-8 pt-20 pb-12 overflow-y-auto transition-transform duration-350 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="list-none flex flex-col gap-0 p-0 m-0">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-ivory/10">
                <Link
                  href={link.href}
                  className="block py-3.5 font-serif text-xl font-normal text-ivory hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <Link
            href="/start-planning"
            className="btn btn-gold inline-flex text-xs py-3 w-full justify-center"
          >
            Start Planning Your Journey
          </Link>
        </div>

        <div className="mt-auto pt-6 text-ivory/50 text-xs">
          <p>© {new Date().getFullYear()} Anthony Holidays</p>
        </div>
      </div>
    </>
  );
}
