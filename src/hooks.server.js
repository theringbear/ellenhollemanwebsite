/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);

  // Allow the site to be embedded in Directus live preview (iframe)
  response.headers.delete("X-Frame-Options");
  response.headers.delete("Content-Security-Policy");
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://directus-production-fa1a.up.railway.app; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://directus-production-fa1a.up.railway.app data: blob:; font-src 'self' data:; connect-src 'self' https://directus-production-fa1a.up.railway.app https://ellen-holleman-visual-artist.email-provider.eu; media-src 'self' https://directus-production-fa1a.up.railway.app; object-src 'none'",
  );

  return response;
}
