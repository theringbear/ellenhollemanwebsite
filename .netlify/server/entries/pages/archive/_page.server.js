import { a as getArchiveItems } from "../../../chunks/directus.js";
async function load() {
  const items = await getArchiveItems();
  return { items };
}
export {
  load
};
