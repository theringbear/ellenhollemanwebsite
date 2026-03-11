import { getPage } from "$lib/directus";

export async function load() {
  const page = await getPage("terms-and-conditions");
  return { page };
}
