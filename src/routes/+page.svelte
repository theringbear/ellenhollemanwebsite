<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import NewsletterModal from '$lib/components/NewsletterModal.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { assetUrl } from '$lib/directus';
	import { onMount } from 'svelte';

	let { data } = $props();

	let showNewsletter = $state(false);

	// Prepare carousel images: prefer direct file IDs from CMS, fallback to artwork images
	let carouselImages = $derived(
		data.carouselFileIds?.length > 0
			? data.carouselFileIds.map(id => assetUrl(id, { width: '1600', height: '900', fit: 'cover', quality: '85', format: 'webp' }))
			: data.carouselArtworks
				.filter(a => a.images?.length > 0)
				.map(a => assetUrl(a.images[0].directus_files_id, { width: '1600', height: '900', fit: 'cover', quality: '85', format: 'webp' }))
	);

	// Explore card images from CMS
	let explorePortfolioImg = $derived(data.exploreImages.portfolio
		? assetUrl(data.exploreImages.portfolio, { width: '600', height: '600', fit: 'cover', quality: '80', format: 'webp' })
		: '');
	let exploreArchiveImg = $derived(data.exploreImages.archive
		? assetUrl(data.exploreImages.archive, { width: '600', height: '600', fit: 'cover', quality: '80', format: 'webp' })
		: '');
	let exploreAboutImg = $derived(data.exploreImages.about
		? assetUrl(data.exploreImages.about, { width: '600', height: '600', fit: 'cover', quality: '80', format: 'webp' })
		: '');

	onMount(() => {
		const timer = setTimeout(() => {
			showNewsletter = true;
		}, 8000);
		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>{data.siteName} — {data.pageTitles.home}</title>
</svelte:head>

<SEO
	title="{data.siteName} — {data.pageTitles.home}"
	description={data.siteSettings?.description || 'Ellen Holleman is a painter, mixed-media visual artist, and spatial designer based in Zaltbommel, Netherlands.'}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: data.siteName,
		url: 'https://www.ellenholleman.nl',
		description: data.siteSettings?.description || 'Ellen Holleman is a painter, mixed-media visual artist, and spatial designer based in Zaltbommel, Netherlands.',
		author: { '@type': 'Person', name: 'Ellen Holleman', jobTitle: 'Visual Artist' }
	}}
/>

<!-- Hero Carousel -->
<section class="hero">
	{#if carouselImages.length > 0}
		<div class="hero-carousel">
			<Carousel images={carouselImages} alt="Featured artwork by Ellen Holleman" interval={6000} />
		</div>
	{/if}
</section>

<!-- Welcome -->
<section class="welcome container">
	<h1 class="welcome-title">Welcome!</h1>
	<p class="welcome-subtitle">Explore a curated collection of visual art and creative works</p>
</section>

<!-- Explore Sections -->
<section class="explore container">
	<div class="explore-grid">
		<a href="/portfolio" class="explore-card">
			{#if explorePortfolioImg}
				<img src={explorePortfolioImg} alt="Portfolio" loading="lazy" draggable="false" />
			{/if}
			<div class="explore-overlay">
				<h2>Portfolio</h2>
			</div>
		</a>

		<a href="/archive" class="explore-card">
			{#if exploreArchiveImg}
				<img src={exploreArchiveImg} alt="Archive" loading="lazy" draggable="false" />
			{/if}
			<div class="explore-overlay">
				<h2>Archive</h2>
			</div>
		</a>

		<a href="/about" class="explore-card">
			{#if exploreAboutImg}
				<img src={exploreAboutImg} alt="About" loading="lazy" draggable="false" />
			{/if}
			<div class="explore-overlay">
				<h2>About</h2>
			</div>
		</a>
	</div>
</section>

<NewsletterModal bind:open={showNewsletter} />

<style>
	.hero {
		margin-bottom: var(--space-2xl);
	}

	.hero-carousel {
		width: 95%;
		max-width: var(--max-width);
		margin: 0 auto;
        margin-top: 40px;
		border-radius: 28px;
		overflow: hidden;
	}

	.hero-carousel :global(.carousel) {
		border-radius: 28px;
	}

	.hero-carousel :global(.carousel-viewport) {
		aspect-ratio: 16 / 9;
	}

	.welcome {
		text-align: center;
		padding: var(--space-3xl) 0;
	}

	.welcome-title {
		font-size: var(--step-5);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.welcome-subtitle {
		font-size: var(--step-0);
		color: var(--color-text-secondary);
		margin-top: var(--space-sm);
		letter-spacing: 0.01em;
	}

	/* Explore grid */
	.explore {
		padding-bottom: var(--space-4xl);
	}

	.explore-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xl);
	}

	.explore-card {
		position: relative;
		border-radius: var(--radius-xl);
		overflow: hidden;
		aspect-ratio: 1;
		display: block;
		transition: transform var(--transition-base);
	}

	.explore-card:hover {
		opacity: 1;
		transform: translateY(-6px);
	}

	.explore-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.explore-card:hover img {
		transform: scale(1.05);
	}

	.explore-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.45), transparent 50%);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: var(--space-xl);
		transition: background var(--transition-base);
	}

	.explore-card:hover .explore-overlay {
		background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 60%);
	}

	.explore-overlay h2 {
		color: white;
		font-size: var(--step-0);
		font-weight: 400;
		background: rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		padding: 0.4rem 1.2rem;
		border-radius: 100px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 900px) {
		.hero-carousel :global(.carousel-viewport) {
			aspect-ratio: 16 / 9;
		}
	}

	@media (max-width: 768px) {
		.explore-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
		}

		.explore-card {
			aspect-ratio: 3 / 1;
		}

		.explore-overlay {
			align-items: center;
		}

		.welcome-title {
			font-size: var(--step-4);
		}
	}
</style>
