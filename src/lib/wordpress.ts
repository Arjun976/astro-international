const WP_BASE_URL =
  process.env.NEXT_PUBLIC_WP_BASE_URL || "http://localhost/astro_v2";

const GRAPHQL_ENDPOINT = `${WP_BASE_URL}/graphql`;

// ─── Queries ─────────────────────────────────────────────────────────────────

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

const GLOBAL_DATA_QUERY = `
  query GetGlobalData {
    astroSiteSettings
    astroNavMenus
  }
`;

// ─── Helper ──────────────────────────────────────────────────────────────────

async function gqlFetch<T>(query: string): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);

  return json;
}

function parseJson<T>(value: unknown, fallback: T): T {
  if (!value) return fallback;
  if (typeof value === "object") return value as T;
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// ─── About Page ──────────────────────────────────────────────────────────────

export async function getAboutPageData() {
  const json = await gqlFetch<{ data: { page: { id: string; title: string; slug: string; aboutCommonOptions: string } | null } }>(ABOUT_PAGE_QUERY);
  const page = json.data?.page;
  if (!page) throw new Error("About page not found");

  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    layout_data: parseJson(page.aboutCommonOptions, {} as Record<string, unknown>),
  };
}

// ─── Global Data (site settings + nav menus) ─────────────────────────────────

export async function getGlobalData() {
  try {
    const json = await gqlFetch<{ data: { astroSiteSettings: string; astroNavMenus: string } }>(GLOBAL_DATA_QUERY);

    const siteSettings = parseJson(json.data?.astroSiteSettings, null);
    const navMenus     = parseJson(json.data?.astroNavMenus, null);

    return { siteSettings, navMenus };
  } catch {
    return { siteSettings: null, navMenus: null };
  }
}

// ─── Everything together ─────────────────────────────────────────────────────

export async function getAboutPageWithGlobalData() {
  const [pageData, globalData] = await Promise.all([
    getAboutPageData(),
    getGlobalData(),
  ]);

  return {
    pageData,
    siteSettings: globalData.siteSettings,
    navMenus:     globalData.navMenus,
  };
}