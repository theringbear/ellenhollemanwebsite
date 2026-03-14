import { i as getPage } from "../../../chunks/directus.js";
async function load() {
  const page = await getPage("privacy-policy");
  return { page };
}
export {
  load
};
