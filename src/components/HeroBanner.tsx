import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  title: string;
  bannerBgUrl: string;
  bannerBgAlt: string;
  breadcrumb?: { label: string; href: string }[];
}

export default function HeroBanner({
  title,
  bannerBgUrl,
  bannerBgAlt,
  breadcrumb = [],
}: HeroBannerProps) {
  return (
    <section className="relative h-[300px] md:h-[425px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={bannerBgUrl}
        alt={bannerBgAlt}
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex items-center h-full">
          <h1 className="text-white text-[32px] md:text-[40px] 2xl:text-[46px] font-semibold uppercase">
            {title}
          </h1>
        </div>

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div className="absolute bottom-6 left-0 px-5 md:px-10">
            <p className="text-white text-sm md:text-base">
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.href}>
                  {i > 0 && " > "}
                  {i < breadcrumb.length - 1 ? (
                    <Link href={crumb.href} className="hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}