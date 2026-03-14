import * as server from '../entries/pages/archive/_category_/_slug_/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/archive/_category_/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/archive/[category]/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/6.BSvJnCl4.js","_app/immutable/chunks/CPXQzNQR.js","_app/immutable/chunks/BNetmxHJ.js","_app/immutable/chunks/e8rXfZKK.js","_app/immutable/chunks/CCHTGLCl.js","_app/immutable/chunks/B3HySF22.js","_app/immutable/chunks/CAw-s-U9.js","_app/immutable/chunks/CVqSAaUm.js","_app/immutable/chunks/DU0QnG4q.js","_app/immutable/chunks/B66ULYjj.js","_app/immutable/chunks/BYPuOfIl.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/CgIkeJHZ.js","_app/immutable/chunks/q6L8Nphn.js","_app/immutable/chunks/oJEVkPdT.js","_app/immutable/chunks/DuLge--p.js","_app/immutable/chunks/XOVt2jyA.js"];
export const stylesheets = ["_app/immutable/assets/Carousel.CGKTlaEn.css","_app/immutable/assets/6.BFcVbNaE.css"];
export const fonts = [];
