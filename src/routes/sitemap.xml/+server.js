import { getArtworks, getArchiveItems } from "$lib/directus";
import { PUBLIC_SITE_URL } from "$env/static/public";

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const siteUrl = PUBLIC_SITE_URL || "https://www.ellenholleman.nl";

  const [artworks, archiveItems] = await Promise.all([
    getArtworks(),
    getArchiveItems(),
  ]);

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/portfolio", priority: "0.9", changefreq: "weekly" },
    { url: "/archive", priority: "0.8", changefreq: "monthly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/calendar", priority: "0.7", changefreq: "weekly" },
    { url: "/contact", priority: "0.6", changefreq: "monthly" },
    { url: "/available", priority: "0.8", changefreq: "weekly" },
  ];

  // Portfolio category pages
  const portfolioCategories = [
    "paintings",
    "mixed-media",
    "portraits",
    "murals",
  ];
  const archiveCategories = [
    "cultural-productions",
    "urban-activism",
    "spatial-design",
    "specials",
  ];

  // Dynamic artwork pages
  const artworkPages = (artworks || []).map((artwork) => ({
    url: `/portfolio/${artwork.category}/${artwork.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: artwork.date_updated || artwork.date_created || null,
  }));

  // Dynamic archive pages
  const archivePages = (archiveItems || []).map((item) => ({
    url: `/archive/${item.category}/${item.slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: item.date_updated || item.date_created || null,
  }));

  const allPages = [
    ...staticPages,
    ...portfolioCategories.map((cat) => ({
      url: `/portfolio/${cat}`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...archiveCategories.map((cat) => ({
      url: `/archive/${cat}`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...artworkPages,
    ...archivePages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `\n    <lastmod>${new Date(page.lastmod).toISOString().split("T")[0]}</lastmod>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  });
}
