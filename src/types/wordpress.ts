// ─── Shared Image Type ───────────────────────────────────────────────────────

export interface WPImage {
  url: string;
  id: string;
  width: string;
  height: string;
  thumbnail: string;
  alt: string;
  title: string;
  description: string;
}

// ─── Section-level Types ─────────────────────────────────────────────────────

export interface GridItem {
  grid_icon_svg: string;
  grid_title: string;
  grid_subtitle: string;
}

export interface PartnerLogo {
  logo_image: WPImage;
}

export interface WhyChooseParagraph {
  paragraph: string;
}

export interface WhyChooseCard {
  icon_tag: string;
  title: string;
  description: string;
}

export interface ShowcaseImage {
  image: WPImage;
}

// ─── Layout Data (parsed from aboutCommonOptions JSON string) ─────────────────

export interface AboutLayoutData {
  hero_section: {
    enable_about: string;
    banner_bg: WPImage;
    custom_title: string;
  };
  about_section: {
    enable_about: string;
    about_image: WPImage;
    about_label: string;
    about_title: string;
    about_description: string;
    about_points: { point_text: string }[];
  };
  main_grid_section: {
    enable_main_grid: string;
    grid_items: GridItem[];
  };
  partners_section: {
    enable_partners: string;
    partners_label: string;
    partners_title: string;
    partners_description: string;
    partner_logos: PartnerLogo[];
  };
  whychoose_section: {
    enable_whychoose: string;
    why_choose_top_text: string;
    why_choose_title: string;
    why_choose_paragraphs: WhyChooseParagraph[];
    why_choose_main_image: WPImage;
    why_choose_bg_image: WPImage;
  };
  why_choose_cards_section: {
    enable_cards: string;
    cards: WhyChooseCard[];
  };
  showcase_section: {
    enable_showcase: string;
    images: ShowcaseImage[];
  };
  cta_section: {
    enable_cta: string;
    cta_heading: string;
    cta_description: string;
    cta_button_text: string;
    cta_button_link: string;
  };
}

// ─── Raw GraphQL Response Shape ───────────────────────────────────────────────

export interface AboutPageGraphQLResponse {
  data: {
    page: {
      id: string;
      title: string;
      slug: string;
      aboutCommonOptions: string; // comes as a raw JSON string from WPGraphQL
    };
  };
  extensions?: {
    debug?: { type: string; message: string }[];
  };
}

// ─── Parsed / Final Shape (what your components receive) ─────────────────────

export interface AboutPageData {
  id: string;
  title: string;
  slug: string;
  layout_data: AboutLayoutData;
}