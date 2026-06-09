interface CTABannerProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

export default function CTABanner({
  heading,
  description,
  buttonText,
}: CTABannerProps) {
  return (
    <div className="bg-[#026BAE] py-10 lg:py-[42px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        <h2 className="text-white text-[20px] md:text-[24px] font-semibold text-center md:text-left leading-[1.5] uppercase tracking-wide max-w-[327px] md:max-w-none">
          {heading}
        </h2>

        <div className="w-full md:w-auto max-w-[360px] md:max-w-none border border-white/40 rounded-[2px] px-4 py-[18px] md:px-5 md:py-5 lg:px-[29px] lg:py-[13px] flex flex-row flex-nowrap items-center justify-between gap-4 md:gap-[19px] md:min-w-[406px] lg:min-w-[683px]">
          <p className="text-white text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[1.5] flex-1">
            {description}
          </p>
          <button className="flex-shrink-0 bg-white text-[#026BAE] font-medium text-[14px] md:text-[18px] px-5 py-2 md:px-6 rounded-[3px] whitespace-nowrap hover:bg-white/90 transition duration-300">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}