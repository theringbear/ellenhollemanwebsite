import { getSiteSettings } from "$lib/directus";

export async function load() {
  const siteSettings = await getSiteSettings();

  return {
    siteSettings: siteSettings || {},
    siteName: siteSettings?.site_title || "Ellen Holleman",
    pageTitles: {
      home: siteSettings?.page_title_home || "Visual Artist",
      portfolio: siteSettings?.page_title_portfolio || "Portfolio",
      archive: siteSettings?.page_title_archive || "Archive",
      calendar: siteSettings?.page_title_calendar || "Events & Exhibitions",
      about: siteSettings?.page_title_about || "About Ellen",
      contact: siteSettings?.page_title_contact || "Get in Touch",
      available: siteSettings?.page_title_available || "Available Works",
    },
  };
}
