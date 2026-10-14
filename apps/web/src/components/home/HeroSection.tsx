"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";

const marqueeWords = [
  "Culture",
  "Wildlife",
  "Heritage",
  "Tea",
  "Beaches",
  "Temples",
  "Spice",
  "Rainforest",
];

interface HeroVideo {
  id: string;
  name: string;
  localSrc: string;
}

const HERO_VIDEOS: HeroVideo[] = [
  {
    id: "ambuluwawa",
    name: "Ambuluwawa Biodiversity Complex",
    localSrc: "/videos/hero-ambuluwawa.mp4",
  },
  {
    id: "sigiriya",
    name: "Sigiriya Lion Rock Citadel",
    localSrc: "/videos/sigiriya.mp4",
  },
  {
    id: "elephant",
    name: "Wild Elephants Gathering",
    localSrc: "/videos/elephant.mp4",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const advanceToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  }, []);

  useEffect(() => {
    const currentVid = videoRefs.current[currentIndex];
    if (currentVid) {
      try {
        currentVid.currentTime = 0;
        const playPromise = currentVid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch {
      }
    }

    const nextIndex = (currentIndex + 1) % HERO_VIDEOS.length;
    const nextVid = videoRefs.current[nextIndex];
    if (nextVid && nextVid.preload !== "auto") {
      nextVid.preload = "auto";
    }

    const pauseTimer = setTimeout(() => {
      videoRefs.current.forEach((vid, idx) => {
        if (idx !== currentIndex && vid) {
          try {
            vid.pause();
          } catch {}
        }
      });
    }, 1200);

    const sceneTimer = setTimeout(() => {
      advanceToNext();
    }, 12000);

    return () => {
      clearTimeout(pauseTimer);
      clearTimeout(sceneTimer);
    };
  }, [currentIndex, advanceToNext]);

  return (
    <section
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-forest">
        <Image
          src="/images/hero-poster.webp"
          alt="Anthony Holidays - Authentic Sri Lanka Journeys"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 pointer-events-none"
        />
        {HERO_VIDEOS.map((video, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % HERO_VIDEOS.length;
          const shouldLoad = isActive || isNext;

          return (
            <video
              key={video.id}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              muted
              playsInline
              preload={index === 0 ? "auto" : isNext ? "metadata" : "none"}
              poster="/images/hero-poster.webp"
              aria-label={video.name}
              onEnded={() => {
                if (index === currentIndex) {
                  advanceToNext();
                }
              }}
              onError={() => {
                if (index === currentIndex) {
                  advanceToNext();
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {shouldLoad && <source src={video.localSrc} type="video/mp4" />}
              <track kind="captions" src="" label="English" default />
            </video>
          );
        })}
      </div>
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-black/20 to-black/85 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20 pb-28 md:pb-36 lg:pb-40 container w-full">
        <div className="max-w-4xl">
          <p className="section-label animate-fade-in text-secondary/90">
            Sri Lanka Journeys
          </p>

          <h1 className="text-display text-ivory mb-6 font-light leading-[0.95]">
            <span className="block overflow-hidden">
              <span
                className="block animate-fade-in-up opacity-0"
                style={{ animationDelay: "200ms" }}
              >
                Sri Lanka,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block animate-fade-in-up opacity-0"
                style={{ animationDelay: "500ms" }}
              >
                Authentically
              </span>
            </span>
          </h1>

          <p className="text-base md:text-lg font-sans animate-fade-in-up animation-delay-800 text-ivory/85 max-w-lg mb-10 leading-relaxed tracking-wide drop-shadow-sm font-light">
            Expert-led private journeys across the ancient island - crafted by
            licensed national tourist guide lecturers who know every stone,
            every story, every sunrise.
          </p>

          <div className="animate-fade-in-up animation-delay-1000 flex flex-wrap gap-4">
            <Link href="/start-planning" className="btn btn-gold">
              Start Planning Your Journey
              <ArrowRight size={15} />
            </Link>
            <Link href="/tours" className="btn btn-outline-ivory">
              Explore Tour Packages
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 z-20 py-4 md:py-5 overflow-hidden bg-gradient-to-t from-black/90 via-black/40 to-transparent backdrop-blur-[2px]">
        <MarqueeTicker items={marqueeWords} theme="light" />
      </div>
    </section>
  );
}
