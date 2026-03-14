import * as server from '../entries/pages/archive/_category_/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/archive/_category_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/archive/[category]/+page.server.js";
export const imports = ["_app/immutable/nodes/5.B5BXlBYo.js","_app/immutable/chunks/CPXQzNQR.js","_app/immutable/chunks/BNetmxHJ.js","_app/immutable/chunks/e8rXfZKK.js","_app/immutable/chunks/q6L8Nphn.js","_app/immutable/chunks/oJEVkPdT.js","_app/immutable/chunks/B3HySF22.js","_app/immutable/chunks/5f0ss4IW.js","_app/immutable/chunks/CCHTGLCl.js","_app/immutable/chunks/CAw-s-U9.js","_app/immutable/chunks/CVqSAaUm.js","_app/immutable/chunks/DU0QnG4q.js","_app/immutable/chunks/B66ULYjj.js","_app/immutable/chunks/BYPuOfIl.js","_app/immutable/chunks/CkLfrO85.js"];
export const stylesheets = ["_app/immutable/assets/ArchiveCard.D7oaf4uF.css","_app/immutable/assets/5.BuxQqIPG.css"];
export const fonts = [];
