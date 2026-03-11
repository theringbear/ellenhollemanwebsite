import { getEvents } from "$lib/directus";

export async function load() {
  const events = await getEvents();
  return { events };
}
