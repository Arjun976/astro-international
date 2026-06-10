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

export const metadata: Metadata = {
  title: "About Us | Astro International",
  description: "About Astro International — reliable supply of building materials and safety equipment across UAE.",
};

export default async function AboutPage() {
  const { pageData, siteSettings, navMenus } = await getAboutPageWithGlobalData();
  const ld = pageData.layout_data;

  return (
    <>
      <Header activePage="/about" siteSettings={siteSettings} navMenus={navMenus} />

      {ld.hero_section?.enable_about === "1" && (
        <HeroBanner
          title={ld.hero_section.custom_title}
          bannerBgUrl={ld.hero_section.banner_bg.url}
          bannerBgAlt={ld.hero_section.banner_bg.alt}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: ld.hero_section.custom_title, href: "/about" },
          ]}
        />
      )}

      <main className="max-w-[1400px] mx-auto px-5 md:px-10">
        {ld.about_section?.enable_about === "1" && (
          <AboutSection
            image={{ url: ld.about_section.about_image.url, alt: ld.about_section.about_image.alt }}
            label={ld.about_section.about_label}
            title={ld.about_section.about_title}
            description={ld.about_section.about_description}
            points={ld.about_section.about_points}
            buttonText={ld.about_section.about_button_text || "About Us"}
            buttonLink={ld.about_section.about_button_link || "#"}
          />
        )}

        {ld.main_grid_section?.enable_main_grid === "1" && (
          <HighlightsBar items={ld.main_grid_section.grid_items} />
        )}

        {ld.partners_section?.enable_partners === "1" && (
          <TrustedBrands
            label={ld.partners_section.partners_label}
            title={ld.partners_section.partners_title}
            description={ld.partners_section.partners_description}
            logos={ld.partners_section.partner_logos}
          />
        )}
      </main>

      {ld.whychoose_section?.enable_whychoose === "1" && (
        <WhyChoose
          topText={ld.whychoose_section.why_choose_top_text}
          title={ld.whychoose_section.why_choose_title}
          paragraphs={ld.whychoose_section.why_choose_paragraphs}
          mainImage={{ url: ld.whychoose_section.why_choose_main_image.url, alt: ld.whychoose_section.why_choose_main_image.alt }}
          bgImage={{ url: ld.whychoose_section.why_choose_bg_image.url, alt: ld.whychoose_section.why_choose_bg_image.alt }}
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
          buttonLink="/contact"
        />
      )}

      <Footer activePage="/about" siteSettings={siteSettings} navMenus={navMenus} />
    </>
  );
}