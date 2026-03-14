import { h as getEvents } from "../../../chunks/directus.js";
async function load() {
  const events = await getEvents();
  return { events };
}
export {
  load
};
