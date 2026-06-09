"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

interface ShowcaseImage {
  image: { url: string; alt: string };
}

interface ShowcaseSectionProps {
  images: ShowcaseImage[];
}

export default function ShowcaseSection({ images }: ShowcaseSectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="w-full overflow-hidden mb-0">
      {/* Mobile Grid: Exactly as it was */}
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

      {/* Tablet Swiper: Functional implementation for iPad (md to xl) */}
      <div className="hidden md:block xl:hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="showcaseSwiper"
        >
          {images.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[326px]">
                <Image
                  src={item.image.url}
                  alt={item.image.alt || `Showcase ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid: Exactly as it was */}
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
