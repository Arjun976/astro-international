import Image from "next/image";

interface WhyChooseProps {
  topText: string;
  title: string;
  paragraphs: { paragraph: string }[];
  mainImage: { url: string; alt: string };
  bgImage: { url: string; alt: string };
}

export default function WhyChoose({
  topText,
  title,
  paragraphs,
  mainImage,
  bgImage,
}: WhyChooseProps) {
  return (
    <section className="py-[60px] md:py-[72px] lg:py-[90px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">
          {/* Image (Left side) */}
          <div className="w-full lg:w-[49.5%] lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20 -mb-6 md:-mb-6 lg:mb-0">
            <div className="relative">
              <div className="relative w-full h-auto lg:h-[430px]">
                <Image
                  src={mainImage.url}
                  alt={mainImage.alt}
                  fill
                  className="object-cover rounded-t-[3px] md:rounded-[3px] shadow-2xl relative z-20"
                />
              </div>
              <div className="absolute inset-0 bg-black/10 rounded-t-[3px] md:rounded-[3px] z-30" />
            </div>
          </div>

          {/* Dark Content Box (Right side) */}
          <div
            className="w-full lg:w-[67%] lg:ml-auto text-white p-8 py-[60px] md:p-[35px] md:py-[72px] lg:pt-15 lg:pb-8 lg:pr-0 lg:pl-[24.5%] rounded-b-[3px] lg:rounded-[3px] z-10 relative lg:min-h-[536px] flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgImage.url}')` }}
          >
            <div>
              <p className="text-[#EC2226] text-[16px] font-medium uppercase tracking-[0.2em] mb-4">
                {topText}
              </p>
              <h2 className="font-semibold text-[24px] md:text-[36px] xl:text-[38px] leading-[1.3] uppercase mb-8">
                {title}
              </h2>
              <div className="space-y-6 text-gray-300 text-[16px] md:text-[18px] font-light leading-relaxed">
                {paragraphs && Array.isArray(paragraphs) && paragraphs.map((p, i) => (
                  <p key={i}>{p.paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}