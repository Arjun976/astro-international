const WP_BASE_URL =
  process.env.NEXT_PUBLIC_WP_BASE_URL || "http://localhost/astro_v2";

const GRAPHQL_ENDPOINT = `${WP_BASE_URL}/graphql`;

// The GraphQL query — matches exactly what you ran in the IDE
const ABOUT_PAGE_QUERY = `
  query GetAboutPageLayoutData {
    page(id: "about", idType: URI) {
      id
      title
      slug
      aboutCommonOptions
    }
  }
`;

export async function getAboutPageData() {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: ABOUT_PAGE_QUERY }),
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const page = json.data?.page;

  if (!page) {
    throw new Error("About page not found in GraphQL response");
  }

  // aboutCommonOptions comes back as a JSON string — parse it
  const layoutData =
    typeof page.aboutCommonOptions === "string"
      ? JSON.parse(page.aboutCommonOptions)
      : page.aboutCommonOptions;

  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    layout_data: layoutData,
  };
}

// Generic reusable fetcher for any page — for future pages
export async function getPageData(slug: string) {
  const query = `
    query GetPageLayoutData($id: ID!) {
      page(id: $id, idType: URI) {
        id
        title
        slug
        aboutCommonOptions
      }
    }
  `;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { id: slug } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);

  const json = await res.json();
  const page = json.data?.page;
  if (!page) throw new Error(`Page not found: ${slug}`);

  const layoutData =
    typeof page.aboutCommonOptions === "string"
      ? JSON.parse(page.aboutCommonOptions)
      : page.aboutCommonOptions;

  return { id: page.id, title: page.title, slug: page.slug, layout_data: layoutData };
}