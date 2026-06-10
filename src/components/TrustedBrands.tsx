import Image from "next/image";

interface PartnerLogo {
  logo_image: {
    url: string;
    alt: string;
    width: string;
    height: string;
  };
}

interface TrustedBrandsProps {
  label: string;
  title: string;
  description: string;
  logos: PartnerLogo[];
}

export default function TrustedBrands({
  label,
  title,
  description,
  logos,
}: TrustedBrandsProps) {
  if (!logos || !Array.isArray(logos)) return null;

  return (
    <section className="py-[60px] md:py-[72px] lg:py-[80px] bg-[#F7F7F7] -mx-5 md:-mx-10 px-5 md:px-10">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10">
        <div>
          <p className="text-[#EC2226] text-[14px] md:text-[16px] font-medium uppercase tracking-wide">
            {label}
          </p>
          <h2 className="font-semibold text-[24px] md:text-[36px] xl:text-[38px] leading-[1.3] uppercase text-[#026BAE] mt-1">
            {title}
          </h2>
        </div>
        <p className="text-[16px] md:text-[18px] text-[#272727] opacity-80 max-w-none xl:max-w-[60%] 2xl:max-w-[70%]">
          {description}
        </p>
      </div>

      {/* Logos Grid */}
      <div className="border border-[#026BAE66] p-4 bg-white">
        <div className="overflow-x-auto md:overflow-visible">
          <div className="min-w-[700px] md:min-w-0">
            <div className="grid grid-cols-5 gap-x-10 gap-y-4 md:gap-y-6 items-center justify-items-center">
              {logos.map((logo, i) => (
                <div key={i} className="relative h-[60px] md:h-20 w-full flex items-center justify-center">
                  <Image
                    src={logo.logo_image.url}
                    alt={logo.logo_image.alt || `Partner ${i + 1}`}
                    width={Number(logo.logo_image.width) || 150}
                    height={Number(logo.logo_image.height) || 100}
                    className="max-h-[60px] md:max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}   