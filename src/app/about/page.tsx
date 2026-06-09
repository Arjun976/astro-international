import { getPageData } from "@/lib/wordpress";
import { AboutPageData } from "@/types/wordpress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import AboutSection from "@/components/AboutSection";
import HighlightsBar from "@/components/HighlightsBar";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChoose from "@/components/WhyChoose";
import WhyChooseCards from "@/components/WhyChooseCards";
import ShowcaseSection from "@/components/ShowcaseSection";
import CTABanner from "@/components/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Astro International",
  description:
    "About Astro International supporting construction and industrial projects with reliable supply, fast delivery and strong sourcing across UAE.",
};

export default async function AboutPage() {
  // Fetch data from WordPress headless API
  const data: AboutPageData = await getPageData("about");
  const { layout_data } = data;

  const {
    hero_section,
    about_section,
    main_grid_section,
    partners_section,
    whychoose_section,
    why_choose_cards_section,
    showcase_section,
    cta_section,
  } = layout_data;

  return (
    <>
      <Header activePage="/about" />

      {/* Hero Banner */}
      {hero_section.enable_about === "1" && (
        <HeroBanner
          title={hero_section.custom_title}
          bannerBgUrl={hero_section.banner_bg.url}
          bannerBgAlt={hero_section.banner_bg.alt}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />
      )}

      {/* Main Content Container */}
      <main className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* About Section */}
        {about_section.enable_about === "1" && (
          <AboutSection
            image={{
              url: about_section.about_image.url,
              alt: about_section.about_image.alt,
            }}
            label={about_section.about_label}
            title={about_section.about_title}
            description={about_section.about_description}
            points={about_section.about_points}
          />
        )}

        {/* Highlights / Main Grid */}
        {main_grid_section.enable_main_grid === "1" && (
          <HighlightsBar items={main_grid_section.grid_items} />
        )}

        {/* Trusted Brands / Partners */}
        {partners_section.enable_partners === "1" && (
          <TrustedBrands
            label={partners_section.partners_label}
            title={partners_section.partners_title}
            description={partners_section.partners_description}
            logos={partners_section.partner_logos}
          />
        )}
      </main>

      {/* Why Choose (full width) */}
      {whychoose_section.enable_whychoose === "1" && (
        <WhyChoose
          topText={whychoose_section.why_choose_top_text}
          title={whychoose_section.why_choose_title}
          paragraphs={whychoose_section.why_choose_paragraphs}
          mainImage={{
            url: whychoose_section.why_choose_main_image.url,
            alt: whychoose_section.why_choose_main_image.alt,
          }}
          bgImage={{
            url: whychoose_section.why_choose_bg_image.url,
            alt: whychoose_section.why_choose_bg_image.alt,
          }}
        />
      )}

      {/* Why Choose Cards */}
      {why_choose_cards_section.enable_cards === "1" && (
        <WhyChooseCards cards={why_choose_cards_section.cards} />
      )}

      {/* Showcase (full width) */}
      {showcase_section.enable_showcase === "1" && (
        <ShowcaseSection images={showcase_section.images} />
      )}

      {/* CTA Banner */}
      {cta_section.enable_cta === "1" && (
        <CTABanner
          heading={cta_section.cta_heading}
          description={cta_section.cta_description}
          buttonText={cta_section.cta_button_text}
          buttonLink={cta_section.cta_button_link}
        />
      )}

      <Footer activePage="/about" />
    </>
  );
}