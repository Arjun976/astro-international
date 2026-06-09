"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ShowcaseImage {
  image: { url: string; alt: string };
}

interface ShowcaseSectionProps {
  images: ShowcaseImage[];
}

export default function ShowcaseSection({ images }: ShowcaseSectionProps) {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client, after Swiper script is available
    if (typeof window !== "undefined" && (window as any).Swiper) {
      new (window as any).Swiper(".showcaseSwiper", {
        slidesPerView: 3,
        spaceBetween: 0,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
      });
    }
  }, []);

  return (
    <section className="w-full overflow-hidden mb-0">
      {/* Mobile Grid */}
      <div className="grid grid-cols-3 md:hidden">
        {images.map((item, i) => (
          <div key={i} className="relative h-[128px]">
            <Image
              src={item.image.url}
              alt={item.image.alt || `Showcase ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Tablet Swiper */}
      <div className="swiper showcaseSwiper hidden md:block xl:hidden" ref={swiperRef}>
        <div className="swiper-wrapper">
          {images.map((item, i) => (
            <div key={i} className="swiper-slide">
              <div className="relative h-[326px]">
                <Image
                  src={item.image.url}
                  alt={item.image.alt || `Showcase ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div
        className="hidden xl:grid"
        style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}
      >
        {images.map((item, i) => (
          <div key={i} className="relative h-[326px]">
            <Image
              src={item.image.url}
              alt={item.image.alt || `Showcase ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}