import { getArtworks } from "$lib/directus";

const categoryNames = {
  paintings: "Paintings",
  "mixed-media": "Mixed Media",
  portraits: "Portraits",
  murals: "Murals",
};

export async function load({ params }) {
  const { category } = params;
  const artworks = await getArtworks(category);

  return {
    category,
    categoryTitle: categoryNames[category] || category,
    artworks,
  };
}
