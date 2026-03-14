import { createDirectus, rest, readItems, readSingleton } from "@directus/sdk";
const PUBLIC_DIRECTUS_URL = "https://directus-production-fa1a.up.railway.app";
const directus = createDirectus(PUBLIC_DIRECTUS_URL).with(rest());
function assetUrl(fileId, params = {}) {
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
async function safe(fn, fallback = []) {
  try {
    return await fn();
  } catch (err) {
    const msg = err?.errors?.[0]?.message || err?.message || String(err);
    console.warn("[Directus] Falling back to default:", msg);
    return fallback;
  }
}
async function getArtworks(category = null, availableOnly = false) {
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
            images: [{ directus_files_id: ["id", "title", "width", "height"] }]
          }
        ],
        limit: -1
      })
    );
  });
}
async function getArtwork(slug) {
  return safe(async () => {
    const items = await directus.request(
      readItems("artworks", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        fields: [
          "*",
          {
            images: [{ directus_files_id: ["id", "title", "width", "height"] }]
          }
        ],
        limit: 1
      })
    );
    return items?.[0] || null;
  }, null);
}
async function getArchiveItems(category = null) {
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
            images: [{ directus_files_id: ["id", "title", "width", "height"] }]
          }
        ],
        limit: -1
      })
    );
  });
}
async function getArchiveItem(slug) {
  return safe(async () => {
    const items = await directus.request(
      readItems("archive_items", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        fields: [
          "*",
          {
            images: [{ directus_files_id: ["id", "title", "width", "height"] }]
          }
        ],
        limit: 1
      })
    );
    return items?.[0] || null;
  }, null);
}
async function getEvents(year = null) {
  return safe(async () => {
    const filter = { status: { _eq: "published" } };
    if (year) filter.year = { _eq: year };
    return directus.request(
      readItems("events", {
        filter,
        sort: ["-date"],
        fields: ["*", { image: ["id", "title", "width", "height"] }],
        limit: -1
      })
    );
  });
}
async function getAbout() {
  return safe(async () => {
    return directus.request(
      readSingleton("about", {
        fields: [
          "*",
          { image1: ["id", "title"] },
          { image2: ["id", "title"] },
          { image3: ["id", "title"] },
          { image4: ["id", "title"] },
          { cv_file: ["id", "title", "filename_download"] }
        ]
      })
    );
  }, null);
}
async function getSiteSettings() {
  return safe(async () => {
    return directus.request(readSingleton("site_settings"));
  }, null);
}
async function getPage(slug) {
  return safe(async () => {
    const items = await directus.request(
      readItems("pages", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        limit: 1
      })
    );
    return items?.[0] || null;
  }, null);
}
async function getHomepageSettings() {
  return safe(async () => {
    return directus.request(
      readSingleton("homepage_settings", {
        fields: [
          "*",
          {
            carousel_artworks: [
              "id",
              { directus_files_id: ["id", "title", "width", "height"] }
            ]
          },
          { explore_portfolio_image: ["id", "title"] },
          { explore_archive_image: ["id", "title"] },
          { explore_about_image: ["id", "title"] }
        ]
      })
    );
  }, null);
}
export {
  getArchiveItems as a,
  getSiteSettings as b,
  assetUrl as c,
  getHomepageSettings as d,
  getAbout as e,
  getArchiveItem as f,
  getArtworks as g,
  getEvents as h,
  getPage as i,
  getArtwork as j
};
