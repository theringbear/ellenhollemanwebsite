import { getArchiveItems } from "$lib/directus";

const categoryNames = {
  "cultural-productions": "Cultural Productions",
  "urban-activism": "Urban Activism",
  "spatial-design": "Spatial Design",
  specials: "Specials",
};

export async function load({ params }) {
  const { category } = params;
  const items = await getArchiveItems(category);

  return {
    category,
    categoryTitle: categoryNames[category] || category,
    items,
  };
}
