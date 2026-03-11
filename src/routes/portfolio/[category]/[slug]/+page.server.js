import { getArtwork } from "$lib/directus";
import { error } from "@sveltejs/kit";

const categoryNames = {
  paintings: "Paintings",
  "mixed-media": "Mixed Media",
  portraits: "Portraits",
  murals: "Murals",
};

export async function load({ params }) {
  const artwork = await getArtwork(params.slug);
  if (!artwork) throw error(404, "Artwork not found");

  return {
    artwork,
    categoryTitle: categoryNames[params.category] || params.category,
    category: params.category,
  };
}
