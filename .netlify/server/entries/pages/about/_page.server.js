import { e as getAbout } from "../../../chunks/directus.js";
async function load() {
  const about = await getAbout();
  return { about };
}
export {
  load
};
