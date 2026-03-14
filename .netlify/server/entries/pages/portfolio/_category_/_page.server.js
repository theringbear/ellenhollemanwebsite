import { g as getArtworks } from "../../../../chunks/directus.js";
const categoryNames = {
  paintings: "Paintings",
  "mixed-media": "Mixed Media",
  portraits: "Portraits",
  murals: "Murals"
};
async function load({ params }) {
  const { category } = params;
  const artworks = await getArtworks(category);
  return {
    category,
    categoryTitle: categoryNames[category] || category,
    artworks
  };
}
export {
  load
};
