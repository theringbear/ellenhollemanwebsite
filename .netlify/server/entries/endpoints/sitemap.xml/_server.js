import { g as getArtworks, a as getArchiveItems } from "../../../chunks/directus.js";
const SITE_URL = "https://ellenhollemanwebsite.netlify.app";
const prerender = true;
async function GET() {
  const siteUrl = SITE_URL;
  const [artworks, archiveItems] = await Promise.all([
    getArtworks(),
    getArchiveItems()
  ]);
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/portfolio", priority: "0.9", changefreq: "weekly" },
    { url: "/archive", priority: "0.8", changefreq: "monthly" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/calendar", priority: "0.7", changefreq: "weekly" },
    { url: "/contact", priority: "0.6", changefreq: "monthly" },
    { url: "/available", priority: "0.8", changefreq: "weekly" }
  ];
  const portfolioCategories = [
    "paintings",
    "mixed-media",
    "portraits",
    "murals"
  ];
  const archiveCategories = [
    "cultural-productions",
    "urban-activism",
    "spatial-design",
    "specials"
  ];
  const artworkPages = (artworks || []).map((artwork) => ({
    url: `/portfolio/${artwork.category}/${artwork.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: artwork.date_updated || artwork.date_created || null
  }));
  const archivePages = (archiveItems || []).map((item) => ({
    url: `/archive/${item.category}/${item.slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: item.date_updated || item.date_created || null
  }));
  const allPages = [
    ...staticPages,
    ...portfolioCategories.map((cat) => ({
      url: `/portfolio/${cat}`,
      priority: "0.8",
      changefreq: "weekly"
    })),
    ...archiveCategories.map((cat) => ({
      url: `/archive/${cat}`,
      priority: "0.7",
      changefreq: "monthly"
    })),
    ...artworkPages,
    ...archivePages
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `
    <lastmod>${new Date(page.lastmod).toISOString().split("T")[0]}</lastmod>` : ""}
  </url>`
  ).join("\n")}
</urlset>`;
  return new Response(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600"
    }
  });
}
export {
  GET,
  prerender
};
