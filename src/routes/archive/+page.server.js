import { getArchiveItems } from "$lib/directus";

export async function load() {
  const items = await getArchiveItems();
  return { items };
}
