const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL || "http://localhost/astro_v2";

export async function getPageData(slug: string) {
  const res = await fetch(
    `${WP_BASE_URL}/wp-json/astro-bridge/v1/page-data?slug=${slug}`,
    { next: { revalidate: 3600 } } // ISR: revalidate every hour
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch page data for slug: ${slug}`);
  }

  return res.json();
}