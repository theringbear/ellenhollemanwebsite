import { getArtworks, getHomepageSettings } from "$lib/directus";

export async function load() {
  const [homepageSettings, allArtworks] = await Promise.all([
    getHomepageSettings(),
    getArtworks(),
  ]);

  // Carousel images: use CMS selection (direct file links), fallback to first 8 artworks
  let carouselFileIds = [];
  if (homepageSettings?.carousel_artworks?.length > 0) {
    carouselFileIds = homepageSettings.carousel_artworks
      .map((item) =>
        typeof item.directus_files_id === "object"
          ? item.directus_files_id?.id
          : item.directus_files_id,
      )
      .filter(Boolean);
  }

  // Fallback: use first image from each of the first 8 artworks
  let carouselArtworks = [];
  if (carouselFileIds.length === 0) {
    carouselArtworks = allArtworks.slice(0, 8);
  }

  // Explore images: use CMS selection, fallback to null
  const exploreImages = {
    portfolio: homepageSettings?.explore_portfolio_image?.id || null,
    archive: homepageSettings?.explore_archive_image?.id || null,
    about: homepageSettings?.explore_about_image?.id || null,
  };

  return {
    carouselFileIds,
    carouselArtworks,
    exploreImages,
  };
}
