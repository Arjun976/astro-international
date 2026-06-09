import Image from "next/image";
import { WPImage } from "@/types/wordpress";

interface AboutSectionProps {
  image: {
    url: string;
    alt: string;
  };
  label: string;
  title: string;
  description: string;
  points: { point_text: string }[];
}

export default function AboutSection({
  image,
  label,
  title,
  description,
  points,
}: AboutSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Column */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden rounded-lg">
          <Image
            src={image.url || "/image/placeholder.png"}
            alt={image.alt || title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Column */}
        <div className="flex flex-col gap-6">
          <span className="text-[#EC2226] font-bold tracking-widest uppercase text-sm">
            {label}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#026BAE] leading-tight">
            {title}
          </h2>
          <div
            className="text-gray-600 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {points.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-5 h-5 bg-[#EC2226] flex items-center justify-center rounded-full text-white">
                  <i className="fa-solid fa-check text-[10px]" />
                </span>
                <span className="text-gray-800 font-medium">
                  {item.point_text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
