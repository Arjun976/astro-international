# Headless WordPress & Next.js Learning Guide

This guide explains how data flows from your WordPress database into your Next.js frontend, using your specific project code as the example.

---

## Phase 1: The Request (Fetching Data)
**File:** `src/lib/wordpress.ts`

This file is the "bridge" between your website and WordPress.

```typescript
// 1. Get the WordPress URL from environment variables or use a local fallback
const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL || "http://localhost/astro_v2";

export async function getPageData(slug: string) {
  // 2. We use 'fetch' to knock on the door of your WordPress API.
  // The 'slug' variable tells WordPress WHICH page we want (e.g., 'about').
  const res = await fetch(
    `${WP_BASE_URL}/wp-json/astro-bridge/v1/page-data?slug=${slug}`,
    { next: { revalidate: 3600 } } // 3. Revalidate means: "Check for updates once an hour"
  );

  // 4. If the door doesn't open (server error), we throw an error.
  if (!res.ok) {
    throw new Error(`Failed to fetch page data for slug: ${slug}`);
  }

  // 5. If successful, convert the raw response into a JavaScript Object (JSON).
  return res.json();
}
```

---

## Phase 2: The Rules (TypeScript Types)
**File:** `src/types/wordpress.ts`

TypeScript ensures we don't make mistakes by defining exactly what the data looks like.

```typescript
export interface AboutPageData {
  id: number;
  slug: string;
  title: string;
  layout_data: { // This matches the structure inside your WordPress JSON
    hero_section: {
      enable_about: string; // "1" if checked in WP, "0" if not
      banner_bg: WPImage;
      custom_title: string;
    };
    // ... other sections defined here
  };
}
```

---

## Phase 3: The Orchestration (The Page)
**File:** `src/app/about/page.tsx`

This is where all the "magic" happens. It coordinates the data and the components.

### Line-by-Line Breakdown:

```typescript
export default async function AboutPage() {
  // 1. FETCH: Call our bridge function to get the 'about' page data.
  // We tell TypeScript this data follows the 'AboutPageData' interface.
  const data: AboutPageData = await getPageData("about");

  // 2. DESTRUCTURE: Instead of writing data.layout_data every time, 
  // we "extract" it into its own variable.
  const { layout_data } = data;

  // 3. DESTRUCTURE AGAIN: Extract individual sections from layout_data.
  const {
    hero_section,
    about_section,
    partners_section,
    // ... more sections
  } = layout_data;

  return (
    <>
      <Header activePage="/about" />

      {/* 4. CONDITIONAL RENDERING: We check if 'enable_about' is "1" (Checked in WP).
          If it is "0", this entire component simply doesn't appear on the page. */}
      {hero_section.enable_about === "1" && (
        <HeroBanner
          title={hero_section.custom_title}
          bannerBgUrl={hero_section.banner_bg.url} // 5. DATA PASSING: We pass WP data as "props" to the component.
          bannerBgAlt={hero_section.banner_bg.alt}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />
      )}

      <main className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* 6. COMPONENT DISTRIBUTION: Passing complex data (like arrays of points)
            into specialized components like AboutSection. */}
        {about_section.enable_about === "1" && (
          <AboutSection
            image={{
              url: about_section.about_image.url,
              alt: about_section.about_image.alt,
            }}
            label={about_section.about_label}
            title={about_section.about_title}
            description={about_section.about_description}
            points={about_section.about_points} // Passes the list of bullet points
          />
        )}
      </main>

      <Footer activePage="/about" />
    </>
  );
}
```

---

## Summary of the Data Journey
1.  **WordPress CMS:** You check a box or type a title in your WordPress dashboard.
2.  **API:** WordPress prepares a JSON file containing that information.
3.  **Next.js Server:** Your `page.tsx` asks the API for that JSON.
4.  **Destructuring:** The code "unpacks" the specific sections you need.
5.  **Components:** The unpacked data is passed into React components (props).
6.  **Browser:** The user sees a beautiful, fast website rendered with your content.

---

## Key Terms to Remember
*   **Props:** Short for "properties." It's how we pass data from a Page to a Component.
*   **Destructuring:** Using `{ name } = object` to extract a specific property.
*   **SSR (Server Side Rendering):** The page is built on the server first, making it very fast for the user.
*   **Slug:** The unique part of the URL (like `about` or `contact-us`) used to identify the page.
