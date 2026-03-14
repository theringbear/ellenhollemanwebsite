import { g as getArtworks } from "../../../chunks/directus.js";
async function load() {
  const artworks = await getArtworks();
  return { artworks };
}
export {
  load
};
