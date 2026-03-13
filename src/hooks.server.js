/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// Allow the site to be embedded in Directus live preview (iframe)
	response.headers.delete('X-Frame-Options');
	response.headers.set(
		'Content-Security-Policy',
		"frame-ancestors 'self' https://directus-production-fa1a.up.railway.app"
	);

	return response;
}
