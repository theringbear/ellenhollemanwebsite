import { i as getPage } from "../../../chunks/directus.js";
async function load() {
  const page = await getPage("terms-and-conditions");
  return { page };
}
export {
  load
};
