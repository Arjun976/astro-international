import { getAboutPageWithGlobalData } from "@/lib/wordpress";
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
import type { AboutLayoutData } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "About Us | Astro International",
  description: "About Astro International — reliable supply of building materials and safety equipment across UAE.",
};

export default async function AboutPage() {
  const { pageData, siteSettings, navMenus } = await getAboutPageWithGlobalData();
  const ld = pageData.layout_data as AboutLayoutData;

  return (
    <>
      <Header activePage="/about" siteSettings={siteSettings} navMenus={navMenus} />

      {ld.hero_section?.enable_about === "1" && (
        <HeroBanner
          title={ld.hero_section.custom_title || pageData.title}
          bannerBgUrl={ld.hero_section.banner_bg?.url || "/image/placeholder.png"}
          bannerBgAlt={ld.hero_section.banner_bg?.alt || ld.hero_section.custom_title}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: ld.hero_section.custom_title || "About Us", href: "/about" },
          ]}
        />
      )}

      <main className="max-w-[1400px] mx-auto px-5 md:px-10">
        {ld.about_section?.enable_about === "1" && (
          <AboutSection
            image={{ 
              url: ld.about_section.about_image?.url || "/image/placeholder.png", 
              alt: ld.about_section.about_image?.alt || ld.about_section.about_title 
            }}
            label={ld.about_section.about_label}
            title={ld.about_section.about_title}
            description={ld.about_section.about_description}
            points={ld.about_section.about_points || []}
            buttonText={ld.about_section.about_button_text}
            buttonLink={ld.about_section.about_button_link}
          />
        )}

        {ld.main_grid_section?.enable_main_grid === "1" && ld.main_grid_section.grid_items && (
          <HighlightsBar items={ld.main_grid_section.grid_items} />
        )}

        {ld.partners_section?.enable_partners === "1" && (
          <TrustedBrands
            label={ld.partners_section.partners_label}
            title={ld.partners_section.partners_title}
            description={ld.partners_section.partners_description}
            logos={ld.partners_section.partner_logos || []}
          />
        )}
      </main>

      {ld.whychoose_section?.enable_whychoose === "1" && (
        <WhyChoose
          topText={ld.whychoose_section.why_choose_top_text}
          title={ld.whychoose_section.why_choose_title}
          paragraphs={ld.whychoose_section.why_choose_paragraphs || []}
          mainImage={{ 
            url: ld.whychoose_section.why_choose_main_image?.url || "/image/placeholder.png", 
            alt: ld.whychoose_section.why_choose_main_image?.alt || "" 
          }}
          bgImage={{ 
            url: ld.whychoose_section.why_choose_bg_image?.url || "/image/placeholder.png", 
            alt: ld.whychoose_section.why_choose_bg_image?.alt || "" 
          }}
        />
      )}

      {ld.why_choose_cards_section?.enable_cards === "1" && (
        <WhyChooseCards cards={ld.why_choose_cards_section.cards} />
      )}

      {ld.showcase_section?.enable_showcase === "1" && (
        <ShowcaseSection images={ld.showcase_section.images} />
      )}

      {ld.cta_section?.enable_cta === "1" && (
        <CTABanner
          heading={ld.cta_section.cta_heading}
          description={ld.cta_section.cta_description}
          buttonText={ld.cta_section.cta_button_text}
          buttonLink={ld.cta_section.cta_button_link || "/contact"}
        />
      )}

      <Footer activePage="/about" siteSettings={siteSettings} navMenus={navMenus} />
    </>
  );
}