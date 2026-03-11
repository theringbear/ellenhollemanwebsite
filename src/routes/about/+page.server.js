import { getAbout } from "$lib/directus";

export async function load() {
  const about = await getAbout();
  return { about };
}
