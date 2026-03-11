import { createDirectus, rest, readItems, readSingleton } from "@directus/sdk";
import { PUBLIC_DIRECTUS_URL } from "$env/static/public";

/**
 * Directus client for fetching CMS content.
 *
 * Expected Directus Collections:
 *
 * 1. "artworks" (collection)
 *    - id, status, sort, title, slug, category (paintings|mixed-media|portraits|murals),
 *      materials, dimensions, year, collection_name, price, description (WYSIWYG),
 *      availability (available|sold|private_collection)
 *    - images: many-to-many relation via "artworks_files" junction
 *
 * 2. "archive_items" (collection)
 *    - id, status, sort, title, slug, category (cultural-productions|urban-activism|spatial-design|specials),
 *      description (WYSIWYG)
 *    - images: many-to-many relation via "archive_items_files" junction
 *
 * 3. "events" (collection)
 *    - id, status, title, date (date), end_date (date, optional), start_time (string), end_time (string), location, info (text),
 *      link (string), link_text, year (integer)
 *    - image: single file (many-to-one to directus_files)
 *    - video (string, optional embed URL)
 *
 * 4. "about" (singleton)
 *    - id, title, body (WYSIWYG), artist_statement (WYSIWYG),
 *      cv_file (file), image1, image2, image3, image4 (files)
 *
 * 5. "site_settings" (singleton)
 *    - id, site_title, description, email,
 *      social_facebook, social_instagram, social_linkedin
 *
 * 6. "pages" (collection) — for static pages like copyright, privacy, terms
 *    - id, status, title, slug, body (WYSIWYG)
 *
 * 7. "homepage_settings" (singleton)
 *    - id
 *    - carousel_artworks: many-to-many relation with directus_files (direct file links for carousel)
 *      → links to artworks collection, controls which artworks appear in the hero carousel
 *    - explore_portfolio_image: single file (many-to-one to directus_files)
 *    - explore_archive_image: single file (many-to-one to directus_files)
 *    - explore_about_image: single file (many-to-one to directus_files)
 */

const directus = createDirectus(PUBLIC_DIRECTUS_URL).with(rest());

export default directus;

// Helper to build asset URLs
export function assetUrl(fileId, params = {}) {
  if (!fileId) return "";
  const id = typeof fileId === "object" ? fileId.id || fileId : fileId;
  const searchParams = new URLSearchParams();
  if (params.width) searchParams.set("width", params.width);
  if (params.height) searchParams.set("height", params.height);
  if (params.fit) searchParams.set("fit", params.fit);
  if (params.quality) searchParams.set("quality", params.quality);
  if (params.format) searchParams.set("format", params.format);
  const qs = searchParams.toString();
  return `${PUBLIC_DIRECTUS_URL}/assets/${id}${qs ? "?" + qs : ""}`;
}

// Safe wrapper — returns fallback on any Directus error
async function safe(fn, fallback = []) {
  try {
    return await fn();
  } catch (err) {
    const msg = err?.errors?.[0]?.message || err?.message || String(err);
    console.warn("[Directus] Falling back to default:", msg);
    return fallback;
  }
}

// Fetch all artworks, optionally filtered by category
export async function getArtworks(category = null, availableOnly = false) {
  return safe(async () => {
    const filter = { status: { _eq: "published" } };
    if (category) filter.category = { _eq: category };
    if (availableOnly) filter.availability = { _eq: "available" };

    return directus.request(
      readItems("artworks", {
        filter,
        sort: ["sort", "title"],
        fields: [
          "*",
          {
            images: [{ directus_files_id: ["id", "title", "width", "height"] }],
          },
        ],
        limit: -1,
      }),
    );
  });
}

// Fetch a single artwork by slug
export async function getArtwork(slug) {
  return safe(async () => {
    const items = await directus.request(
      readItems("artworks", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        fields: [
          "*",
          {
            images: [{ directus_files_id: ["id", "title", "width", "height"] }],
          },
        ],
        limit: 1,
      }),
    );
    return items?.[0] || null;
  }, null);
}

// Fetch archive items
export async function getArchiveItems(category = null) {
  return safe(async () => {
    const filter = { status: { _eq: "published" } };
    if (category) filter.category = { _eq: category };

    return directus.request(
      readItems("archive_items", {
        filter,
        sort: ["sort", "title"],
        fields: [
          "*",
          {
            images: [{ directus_files_id: ["id", "title", "width", "height"] }],
          },
        ],
        limit: -1,
      }),
    );
  });
}

// Fetch a single archive item
export async function getArchiveItem(slug) {
  return safe(async () => {
    const items = await directus.request(
      readItems("archive_items", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        fields: [
          "*",
          {
            images: [{ directus_files_id: ["id", "title", "width", "height"] }],
          },
        ],
        limit: 1,
      }),
    );
    return items?.[0] || null;
  }, null);
}

// Fetch events, optionally by year
export async function getEvents(year = null) {
  return safe(async () => {
    const filter = { status: { _eq: "published" } };
    if (year) filter.year = { _eq: year };

    return directus.request(
      readItems("events", {
        filter,
        sort: ["-date"],
        fields: ["*", { image: ["id", "title", "width", "height"] }],
        limit: -1,
      }),
    );
  });
}

// Fetch about singleton
export async function getAbout() {
  return safe(async () => {
    return directus.request(
      readSingleton("about", {
        fields: [
          "*",
          { image1: ["id", "title"] },
          { image2: ["id", "title"] },
          { image3: ["id", "title"] },
          { image4: ["id", "title"] },
          { cv_file: ["id", "title", "filename_download"] },
        ],
      }),
    );
  }, null);
}

// Fetch site settings singleton
export async function getSiteSettings() {
  return safe(async () => {
    return directus.request(readSingleton("site_settings"));
  }, null);
}

// Fetch a static page by slug
export async function getPage(slug) {
  return safe(async () => {
    const items = await directus.request(
      readItems("pages", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        limit: 1,
      }),
    );
    return items?.[0] || null;
  }, null);
}

// Get unique years from events
export async function getEventYears() {
  return safe(async () => {
    const events = await getEvents();
    const years = [...new Set(events.map((e) => e.year))].sort((a, b) => b - a);
    return years;
  });
}

// Get portfolio categories with their first artwork image for links
export async function getPortfolioCategories() {
  const categories = [
    { slug: "paintings", title: "Paintings" },
    { slug: "mixed-media", title: "Mixed Media" },
    { slug: "portraits", title: "Portraits" },
    { slug: "murals", title: "Murals" },
  ];

  return safe(
    async () => {
      const result = [];
      for (const cat of categories) {
        const items = await directus.request(
          readItems("artworks", {
            filter: {
              category: { _eq: cat.slug },
              status: { _eq: "published" },
            },
            sort: ["sort"],
            fields: [{ images: [{ directus_files_id: ["id"] }] }],
            limit: 1,
          }),
        );
        const firstImage =
          items?.[0]?.images?.[0]?.directus_files_id?.id || null;
        result.push({ ...cat, image: firstImage });
      }
      return result;
    },
    categories.map((c) => ({ ...c, image: null })),
  );
}

// Get archive categories with first image
export async function getArchiveCategories() {
  const categories = [
    { slug: "cultural-productions", title: "Cultural Productions" },
    { slug: "urban-activism", title: "Urban Activism" },
    { slug: "spatial-design", title: "Spatial Design" },
    { slug: "specials", title: "Specials" },
  ];

  return safe(
    async () => {
      const result = [];
      for (const cat of categories) {
        const items = await directus.request(
          readItems("archive_items", {
            filter: {
              category: { _eq: cat.slug },
              status: { _eq: "published" },
            },
            sort: ["sort"],
            fields: [{ images: [{ directus_files_id: ["id"] }] }],
            limit: 1,
          }),
        );
        const firstImage =
          items?.[0]?.images?.[0]?.directus_files_id?.id || null;
        result.push({ ...cat, image: firstImage });
      }
      return result;
    },
    categories.map((c) => ({ ...c, image: null })),
  );
}

// Fetch homepage settings singleton (carousel artworks + explore images)
export async function getHomepageSettings() {
  return safe(async () => {
    return directus.request(
      readSingleton("homepage_settings", {
        fields: [
          "*",
          {
            carousel_artworks: [
              "id",
              { directus_files_id: ["id", "title", "width", "height"] },
            ],
          },
          { explore_portfolio_image: ["id", "title"] },
          { explore_archive_image: ["id", "title"] },
          { explore_about_image: ["id", "title"] },
        ],
      }),
    );
  }, null);
}
