import { getArtworks } from "$lib/directus";

export async function load() {
  const artworks = await getArtworks(null, true); // availableOnly = true
  return { artworks };
}
