import * as server from '../entries/pages/privacy-policy/_page.server.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/privacy-policy/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/privacy-policy/+page.server.js";
export const imports = ["_app/immutable/nodes/14.CZcUTRo2.js","_app/immutable/chunks/CPXQzNQR.js","_app/immutable/chunks/BNetmxHJ.js","_app/immutable/chunks/e8rXfZKK.js","_app/immutable/chunks/CCHTGLCl.js","_app/immutable/chunks/B3HySF22.js","_app/immutable/chunks/CAw-s-U9.js","_app/immutable/chunks/CVqSAaUm.js","_app/immutable/chunks/DU0QnG4q.js","_app/immutable/chunks/B66ULYjj.js"];
export const stylesheets = ["_app/immutable/assets/14.CrWtEsgF.css"];
export const fonts = [];
