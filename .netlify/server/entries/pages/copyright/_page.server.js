import { i as getPage } from "../../../chunks/directus.js";
async function load() {
  const page = await getPage("copyright");
  return { page };
}
export {
  load
};
