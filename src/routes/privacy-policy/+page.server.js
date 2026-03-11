import { getPage } from "$lib/directus";

export async function load() {
  const page = await getPage("privacy-policy");
  return { page };
}
