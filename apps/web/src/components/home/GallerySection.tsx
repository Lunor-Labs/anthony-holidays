"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: "Heritage" | "Highlands" | "Wildlife" | "Coast";
  image: string;
  alt: string;
  story: string;
}

const galleryItems: GalleryItem[] = [
  // Column 1 (Left - 4 images)
  {
    id: "gal-1",
    title: "Highland Morning Express",
    location: "Demodara & Ella Highlands",
    category: "Highlands",
    image: "/images/gallery/highland-morning-express.jpg",
    alt: "Nine Arch Bridge in Ella surrounded by lush green tea hills",
    story:
      "The blue highland train winding across the colonial stone viaduct through misty morning tea plantations.",
  },
  {
    id: "gal-2",
    title: "Dawn over the Citadel",
    location: "Sigiriya Citadel Sanctuary",
    category: "Heritage",
    image: "/images/gallery/dawn-over-the-citadel.jpg",
    alt: "Sigiriya Lion Rock Fortress rising dramatically above forest canopy",
    story:
      "Fifth-century palace in the sky glowing under first sunrise, viewed from an exclusive jungle clearing.",
  },
  {
    id: "gal-3",
    title: "Echoes of the Southern Shore",
    location: "Galle & Weligama Bay",
    category: "Coast",
    image: "/images/gallery/echoes-of-the-southern-shore.jpg",
    alt: "Traditional stilt fishermen silhouette against sunset waters",
    story:
      "Centuries-old fishing traditions meeting the golden glow of the Indian Ocean twilight.",
  },
  {
    id: "gal-4",
    title: "Gaze of the Apex Hunter",
    location: "Yala National Park · Block 1",
    category: "Wildlife",
    image: "/images/gallery/gaze-of-the-apex-hunter.jpg",
    alt: "Ceylon leopard resting on granite boulder in Yala wilderness",
    story:
      "A solitary Ceylon leopard peering through the thorn canopy at dawn on a private naturalist safari.",
  },

  // Column 2 (Center - 4 images)
  {
    id: "gal-5",
    title: "Chants in the Forest Hermitage",
    location: "Sacred Valley · Kandy",
    category: "Heritage",
    image: "/images/gallery/chants-in-the-forest-hermitage.jpg",
    alt: "Buddhist monk offering lotus blooms in ancient stone temple",
    story:
      "Private dawn blessing in a mountain hermitage away from commercial crowds, guided by our scholar lecturer.",
  },
  {
    id: "gal-6",
    title: "Two Leaves and a Bud",
    location: "Pedro & Nuwara Eliya Valleys",
    category: "Highlands",
    image: "/images/gallery/pedro-nuwara-eliya-valleys.jpg",
    alt: "Lush terraced tea estate worker plucking delicate tea leaves",
    story:
      "Artisan plucking of world-renowned Ceylon Pekoe tea on an exclusive heirloom estate.",
  },
  {
    id: "gal-7",
    title: "Sanctuary by the Ocean",
    location: "Tangalle & Mirissa Escapes",
    category: "Coast",
    image: "/images/gallery/sanctuary-by-the-ocean.jpg",
    alt: "Luxury private boutique pavilion pool overlooking the sea",
    story:
      "Unwinding in private oceanfront luxury after days traversing cultural citadels and high mountain trails.",
  },
  {
    id: "gal-8",
    title: "The Great Gathering",
    location: "Minneriya Water Reservoir",
    category: "Wildlife",
    image: "/images/gallery/the-great-gathering.jpg",
    alt: "Elephant herd gathered at water edge during golden hour",
    story:
      "Asia's greatest wildlife spectacle as hundreds of wild elephants congregate around ancient reservoir shores.",
  },

  // Column 3 (Right - 4 images)
  {
    id: "gal-9",
    title: "Whispers of the Palms",
    location: "Mirissa Secret Cove",
    category: "Coast",
    image: "/images/gallery/whispers-of-the-palms.jpg",
    alt: "Secluded tropical beach with gentle turquoise waves and palms",
    story:
      "Pristine white sand coves hidden beneath towering coconut groves along the southern coastline.",
  },
  {
    id: "gal-10",
    title: "Granite Serenity of Gal Vihara",
    location: "Polonnaruwa Ancient Kingdom",
    category: "Heritage",
    image: "/images/gallery/granite-serenity-of-gal-vihara.jpg",
    alt: "Monumental ancient stone carved Buddhist sanctuary",
    story:
      "Twelfth-century stone masters carving transcendent poise out of raw granite boulders.",
  },
  {
    id: "gal-11",
    title: "Fragrance of True Cinnamon",
    location: "Koggala Lake Island Haven",
    category: "Highlands",
    image: "/images/gallery/fragrance-of-true-cinnamon.jpg",
    alt: "Traditional spice estate artisan peeling heirloom cinnamon",
    story:
      "Handcrafted quills of genuine Ceylon cinnamon dried in tropical breezes on a private lagoon isle.",
  },
  {
    id: "gal-12",
    title: "Where Clouds Touch the Ridge",
    location: "Knuckles Conservation Range",
    category: "Wildlife",
    image: "/images/gallery/where-clouds-touch-the-ridge.jpg",
    alt: "Spectacular misty mountain ridge overlooking emerald rainforest valley",
    story:
      "UNESCO-protected cloud forests sheltering endemic lizards, orchids, and breathtaking precipices.",
  },
];

const col1Items = galleryItems.slice(0, 4);
const col2Items = galleryItems.slice(4, 8);
const col3Items = galleryItems.slice(8, 12);

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkFilterScroll = useCallback(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkFilterScroll();
    const timer = setTimeout(checkFilterScroll, 60);
    const handleResize = () => checkFilterScroll();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkFilterScroll]);

  const handleFilterClick = (
    cat: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setFilter(cat);
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastAppliedPRef = useRef(-1);

  // Apply opposing vertical parallax to columns
  const applyParallax = useCallback((p: number) => {
    const travelDistance = 620;

    // Col 1 (Left): moves DOWNWARDS from -travelDistance to 0
    const yCol1 = -travelDistance * (1 - p);

    // Col 2 (Center): moves UPWARDS from 0 to -travelDistance (Opposing motion)
    const yCol2 = -travelDistance * p;

    // Col 3 (Right): moves DOWNWARDS from -travelDistance to 0
    const yCol3 = -travelDistance * (1 - p);

    if (col1Ref.current) {
      col1Ref.current.style.transform = `translate3d(0, ${yCol1.toFixed(1)}px, 0)`;
    }
    if (col2Ref.current) {
      col2Ref.current.style.transform = `translate3d(0, ${yCol2.toFixed(1)}px, 0)`;
    }
    if (col3Ref.current) {
      col3Ref.current.style.transform = `translate3d(0, ${yCol3.toFixed(1)}px, 0)`;
    }
  }, []);

  // Scroll listener + RAF damping loop for fluid living waterfall motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollDistance = el.offsetHeight - windowHeight;

      if (totalScrollDistance <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = Math.max(
        0,
        Math.min(1, scrolled / totalScrollDistance),
      );
      targetProgressRef.current = rawProgress;
    };

    const renderLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.12;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const p = currentProgressRef.current;
      if (Math.abs(p - lastAppliedPRef.current) > 0.0002) {
        lastAppliedPRef.current = p;
        applyParallax(p);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [applyParallax]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const navigateLightbox = (direction: number) => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(
      (it) => it.id === selectedItem.id,
    );
    if (currentIndex === -1) return;
    const nextIndex =
      (currentIndex + direction + galleryItems.length) % galleryItems.length;
    setSelectedItem(galleryItems[nextIndex]);
  };

  const filteredItems =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream section-padding-sm lg:h-[400vh]"
      aria-label="Ceylon Moments Gallery - Visual Odyssey"
    >
      <div className="lg:sticky lg:top-10 lg:h-screen w-full overflow-hidden flex flex-col justify-between">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
          <span className="font-serif text-7xl sm:text-8xl lg:text-9xl tracking-widest uppercase text-sand/50 whitespace-nowrap will-change-transform">
            GALLERY
          </span>
        </div>

        <div className="container relative z-20 shrink-0 pb-2">
          <SectionHeading
            label="Visual Odyssey"
            title="Ceylon Moments"
            highlight="In Motion"
            theme="light"
            className="mb-2 lg:mb-4"
            action={
              <div className="relative w-full max-w-full min-w-0">
                <div
                  aria-hidden="true"
                  className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-cream via-cream/80 to-transparent transition-opacity duration-300 sm:hidden ${
                    canScrollLeft ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  ref={filterScrollRef}
                  onScroll={checkFilterScroll}
                  className="w-full max-w-full min-w-0 overflow-x-auto no-scrollbar py-1 -my-1 overscroll-x-contain touch-pan-x"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-xs bg-white/90 border border-sand shadow-xs min-w-max">
                    {["All", "Heritage", "Highlands", "Wildlife", "Coast"].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={(e) => handleFilterClick(cat, e)}
                          className={`px-3.5 py-1.5 sm:py-1 text-xs font-sans uppercase tracking-wider transition-all duration-300 rounded-xs cursor-pointer whitespace-nowrap shrink-0 ${
                            filter === cat
                              ? "bg-forest text-gold font-medium shadow-xs"
                              : "text-stone hover:text-forest hover:bg-sand/30"
                          }`}
                        >
                          {cat}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className={`absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none bg-gradient-to-l from-cream via-cream/90 to-transparent transition-opacity duration-300 sm:hidden ${
                    canScrollRight ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            }
          />
        </div>

        <div className="hidden lg:block relative z-10 w-full flex-1 min-h-0 overflow-hidden">
          <div className="container h-full">
            <div className="flex justify-between items-start h-full gap-6 xl:gap-8">
              <div
                ref={col1Ref}
                className="w-[31%] flex flex-col gap-6 xl:gap-8 will-change-transform"
                style={{ transform: "translate3d(0, -620px, 0)" }}
              >
                {col1Items.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    isDimmed={filter !== "All" && item.category !== filter}
                    onOpen={() => setSelectedItem(item)}
                  />
                ))}
              </div>

              <div
                ref={col2Ref}
                className="w-[31%] flex flex-col gap-6 xl:gap-8 will-change-transform"
                style={{ transform: "translate3d(0, 0px, 0)" }}
              >
                {col2Items.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    isDimmed={filter !== "All" && item.category !== filter}
                    onOpen={() => setSelectedItem(item)}
                  />
                ))}
              </div>

              <div
                ref={col3Ref}
                className="w-[31%] flex flex-col gap-6 xl:gap-8 will-change-transform"
                style={{ transform: "translate3d(0, -620px, 0)" }}
              >
                {col3Items.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    isDimmed={filter !== "All" && item.category !== filter}
                    onOpen={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex container relative z-20 items-center justify-between pt-3 text-xs text-stone font-sans uppercase tracking-wider shrink-0 border-t border-sand/60">
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-gold" />
            Scroll to experience opposing waterfall parallax
          </span>
          <span className="text-forest font-medium">
            12 Handpicked Frames · Click any photo for details
          </span>
        </div>
        <div className="lg:hidden container relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="relative aspect-[4/5] rounded-xs overflow-hidden border border-sand bg-white group shadow-sm cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-block px-2 py-0.5 mb-1 bg-white/90 border border-sand text-forest text-xs uppercase font-sans tracking-wider rounded-xs font-medium">
                  {item.category}
                </span>
                <h3 className="font-serif text-sm font-normal text-ivory uppercase">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-sand flex items-center gap-1 mt-0.5">
                  <MapPin size={11} className="text-gold" />
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-forest/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface border border-sand rounded-xs overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full md:w-[60%] aspect-[4/3] md:aspect-[5/4] bg-stone/10">
              <Image
                src={selectedItem.image}
                alt={selectedItem.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-between bg-surface text-forest">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-sand/60 border border-sand text-forest font-sans text-xs tracking-wider uppercase rounded-xs font-medium">
                    {selectedItem.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-stone hover:text-forest hover:border-forest transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gold uppercase tracking-wider mb-1.5 font-medium">
                  <MapPin size={13} />
                  <span>{selectedItem.location}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-forest uppercase mb-3">
                  {selectedItem.title}
                </h3>

                <p className="font-sans text-sm font-light text-stone leading-relaxed">
                  {selectedItem.story}
                </p>
              </div>

              <div className="pt-6 border-t border-sand flex items-center justify-between gap-3 flex-wrap">
                <Link
                  href={
                    selectedItem.category === 'Heritage'
                      ? '/tours?category=cultural-heritage'
                      : selectedItem.category === 'Wildlife'
                      ? '/tours?category=wildlife-adventure'
                      : selectedItem.category === 'Highlands'
                      ? '/tours?category=hill-country'
                      : '/tours?category=beach'
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-forest hover:text-gold uppercase tracking-wider transition-colors group"
                >
                  <span>Explore Matching Tours</span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigateLightbox(-1)}
                    className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-stone hover:text-forest hover:border-forest transition-colors cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(1)}
                    className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-stone hover:text-forest hover:border-forest transition-colors cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  isDimmed: boolean;
  onOpen: () => void;
}

function GalleryCard({ item, isDimmed, onOpen }: GalleryCardProps) {
  return (
    <div
      data-cursor="zoom"
      onClick={onOpen}
      className={`relative w-full aspect-[3/4] rounded-xs overflow-hidden border border-sand bg-white shadow-md cursor-pointer group transition-all duration-500 hover:border-gold hover:shadow-xl ${
        isDimmed ? "opacity-25 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 1280px) 30vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-sand text-xs font-sans uppercase tracking-wider text-forest font-medium rounded-xs">
          {item.category}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-sand flex items-center justify-center text-stone group-hover:text-gold group-hover:border-gold transition-all">
        <Maximize2 size={13} />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-1.5 text-xs text-sand font-sans mb-1">
          <MapPin size={11} className="text-gold shrink-0" />
          <span className="truncate">{item.location}</span>
        </div>
        <h3 className="font-serif text-base sm:text-lg font-normal text-ivory uppercase leading-snug group-hover:text-gold transition-colors">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
