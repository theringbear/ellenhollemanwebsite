import { getPage } from "$lib/directus";

export async function load() {
  const page = await getPage("copyright");
  return { page };
}
