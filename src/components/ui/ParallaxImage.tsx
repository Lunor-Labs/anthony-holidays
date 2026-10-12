"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  maxTranslate?: number;
  scale?: number;
  aspectRatio?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.36,
  maxTranslate = 160,
  scale = 1.22,
  aspectRatio = "4/5",
  className = "",
  imgClassName = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let isVisible = false;
    let targetY = 0;
    let currentY = 0;
    const lerp = 0.08;

    const calculateTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Distance from element center to screen center
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;
      const diff = elementCenter - screenCenter;

      // Deep translation opposite to scroll direction
      targetY = diff * speed * -0.9;
      targetY = Math.max(-maxTranslate, Math.min(maxTranslate, targetY));
    };

    const loop = () => {
      if (isVisible && imageWrapperRef.current) {
        calculateTarget();
        currentY += (targetY - currentY) * lerp;
        imageWrapperRef.current.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0) scale(${scale})`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          calculateTarget();
          currentY = targetY; // snap initial position without jumping
        }
      },
      { root: null, rootMargin: "300px 0px 300px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [speed, maxTranslate, scale]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full ${className}`}
      style={{ aspectRatio }}
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-x-0 w-full"
        style={{
          top: "-30%",
          height: "160%",
          willChange: "transform",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
}
