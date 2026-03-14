import * as server from '../entries/pages/calendar/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calendar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/calendar/+page.server.js";
export const imports = ["_app/immutable/nodes/8.DKb0Q3KI.js","_app/immutable/chunks/CPXQzNQR.js","_app/immutable/chunks/BNetmxHJ.js","_app/immutable/chunks/e8rXfZKK.js","_app/immutable/chunks/q6L8Nphn.js","_app/immutable/chunks/oJEVkPdT.js","_app/immutable/chunks/B3HySF22.js","_app/immutable/chunks/DuLge--p.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/CCHTGLCl.js","_app/immutable/chunks/CAw-s-U9.js","_app/immutable/chunks/CVqSAaUm.js","_app/immutable/chunks/DU0QnG4q.js","_app/immutable/chunks/B66ULYjj.js"];
export const stylesheets = ["_app/immutable/assets/8.CDASCorh.css"];
export const fonts = [];
