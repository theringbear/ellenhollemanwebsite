import * as server from '../entries/pages/portfolio/_category_/_slug_/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/portfolio/_category_/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/portfolio/[category]/[slug]/+page.server.js";
export const imports = ["_app/immutable/nodes/13.CIDdIesb.js","_app/immutable/chunks/CPXQzNQR.js","_app/immutable/chunks/BNetmxHJ.js","_app/immutable/chunks/e8rXfZKK.js","_app/immutable/chunks/CCHTGLCl.js","_app/immutable/chunks/B3HySF22.js","_app/immutable/chunks/CAw-s-U9.js","_app/immutable/chunks/CVqSAaUm.js","_app/immutable/chunks/DU0QnG4q.js","_app/immutable/chunks/B66ULYjj.js","_app/immutable/chunks/BYPuOfIl.js","_app/immutable/chunks/CkLfrO85.js","_app/immutable/chunks/XOVt2jyA.js","_app/immutable/chunks/CgIkeJHZ.js","_app/immutable/chunks/q6L8Nphn.js","_app/immutable/chunks/oJEVkPdT.js","_app/immutable/chunks/DuLge--p.js","_app/immutable/chunks/B0122PDL.js"];
export const stylesheets = ["_app/immutable/assets/Carousel.CGKTlaEn.css","_app/immutable/assets/ContactForm.Dj_uHNwg.css","_app/immutable/assets/13.CUCbnMdH.css"];
export const fonts = [];
