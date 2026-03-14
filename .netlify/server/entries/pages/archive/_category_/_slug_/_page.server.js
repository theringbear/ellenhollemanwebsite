import { f as getArchiveItem } from "../../../../../chunks/directus.js";
import { error } from "@sveltejs/kit";
const categoryNames = {
  "cultural-productions": "Cultural Productions",
  "urban-activism": "Urban Activism",
  "spatial-design": "Spatial Design",
  specials: "Specials"
};
async function load({ params }) {
  const item = await getArchiveItem(params.slug);
  if (!item) throw error(404, "Item not found");
  return {
    item,
    category: params.category,
    categoryTitle: categoryNames[params.category] || params.category
  };
}
export {
  load
};
