import { a as getArchiveItems } from "../../../../chunks/directus.js";
const categoryNames = {
  "cultural-productions": "Cultural Productions",
  "urban-activism": "Urban Activism",
  "spatial-design": "Spatial Design",
  specials: "Specials"
};
async function load({ params }) {
  const { category } = params;
  const items = await getArchiveItems(category);
  return {
    category,
    categoryTitle: categoryNames[category] || category,
    items
  };
}
export {
  load
};
