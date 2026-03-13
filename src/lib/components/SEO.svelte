<script>
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { page } from '$app/state';

	/**
	 * @type {{
	 *   title?: string,
	 *   description?: string,
	 *   image?: string,
	 *   type?: string,
	 *   noindex?: boolean,
	 *   jsonLd?: object
	 * }}
	 */
	let {
		title = '',
		description = 'Ellen Holleman is a painter, mixed-media visual artist, and spatial designer based in Zaltbommel, Netherlands.',
		image = '',
		type = 'website',
		noindex = false,
		jsonLd = null
	} = $props();

	let canonicalUrl = $derived(`${PUBLIC_SITE_URL}${page.url.pathname}`);
	let ogImage = $derived(image || `${PUBLIC_SITE_URL}/favicon/android-chrome-384x384.png`);
</script>

<svelte:head>
	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	{#if title}
		<meta property="og:title" content={title} />
	{/if}
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content="Ellen Holleman — Visual Artist" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
	{#if title}
		<meta name="twitter:title" content={title} />
	{/if}
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Description (if not already set by page) -->
	<meta name="description" content={description} />

	<!-- Robots -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Structured Data (JSON-LD) -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{/if}
</svelte:head>
