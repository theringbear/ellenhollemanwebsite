import { getArtworks } from "$lib/directus";

export async function load() {
  const artworks = await getArtworks();
  return { artworks };
}
