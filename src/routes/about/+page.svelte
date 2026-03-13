<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { assetUrl } from '$lib/directus';

	let { data } = $props();

	let aboutImages = $derived([data.about?.image1, data.about?.image2, data.about?.image3, data.about?.image4]
		.filter(Boolean)
		.map(img => assetUrl(img, { width: '1400', quality: '85', format: 'webp' })));

	let heroImage = $derived(data.about?.image1
		? assetUrl(data.about.image1, { width: '1400', quality: '85', format: 'webp' })
		: '');

	let cvUrl = $derived(data.about?.cv_file
		? assetUrl(data.about.cv_file)
		: '');
</script>

<svelte:head>
	<title>{data.pageTitles.about} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.pageTitles.about} — {data.siteName}"
	description="Learn about Ellen Holleman, a Dutch painter, mixed-media artist, and spatial designer based in Zaltbommel, Netherlands."
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Ellen Holleman',
		jobTitle: 'Visual Artist',
		url: 'https://www.ellenholleman.nl/about',
		sameAs: [
			data.siteSettings?.social_instagram || '',
			data.siteSettings?.social_facebook || '',
			data.siteSettings?.social_linkedin || ''
		].filter(Boolean)
	}}
/>

<div class="container">
	<section class="about-section">
		<h1 class="page-title"><em>{data.pageTitles.about}</em></h1>
		<p class="page-subtitle">{data.about?.title || 'Visual artist based in the Netherlands'}</p>

		<!-- Hero Image Carousel -->
		{#if aboutImages.length > 1}
			<div class="about-hero-image">
				<Carousel images={aboutImages} alt="Ellen Holleman" interval={6000} />
			</div>
		{:else if heroImage}
			<div class="about-hero-image">
				<img src={heroImage} alt="Ellen Holleman" loading="eager" draggable="false" />
			</div>
		{/if}

		<!-- Two-column content -->
		<div class="about-columns">
			<div class="about-col">
				<h2>Biography</h2>
				{#if data.about?.body}
					<div class="prose">
						{@html data.about.body}
					</div>
				{:else}
					<p class="placeholder-text">Ellen Holleman is a contemporary visual artist whose work explores the intersection of color, form, and emotion. Based in the Netherlands, she has been creating compelling visual narratives for over a decade.</p>
				{/if}
			</div>

			<div class="about-col">
				<h2>Artistic Philosophy</h2>
				{#if data.about?.artist_statement}
					<div class="prose">
						{@html data.about.artist_statement}
					</div>
				{:else}
					<p class="placeholder-text">"Art is a conversation between the conscious and unconscious mind. Each painting is an attempt to capture fleeting moments of clarity and translate them into visual language."</p>
				{/if}
			</div>
		</div>

		{#if cvUrl}
			<div class="cv-section">
				<a href={cvUrl} target="_blank" rel="noopener" class="cv-link">
					<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
					Download CV
				</a>
			</div>
		{/if}
	</section>
</div>

<style>
	.about-section {
		padding: var(--space-3xl) 0 var(--space-4xl);
	}

	.page-title {
		font-size: var(--step-5);
		font-weight: 600;
		margin-bottom: var(--space-xs);
		}

	.page-title em {
		font-style: normal;
		font-weight: 500;
	}

	.page-subtitle {
		font-size: var(--step-0);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2xl);
	}

	.about-hero-image {
		width: 100%;
		border-radius: var(--radius-xl);
		overflow: hidden;
		margin-bottom: var(--space-3xl);
	}

	.about-hero-image img {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 7;
		object-fit: cover;
	}

	.about-hero-image :global(.carousel-viewport) {
		aspect-ratio: 16 / 7;
	}

	.about-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3xl);
		margin-bottom: var(--space-3xl);
	}

	.about-col h2 {
		font-size: var(--step-3);
		font-weight: 500;
		/* font-style: italic; */
		margin-bottom: var(--space-lg);
	}

	.about-col :global(p) {
		font-size: var(--step--1);
		line-height: 1.8;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-md);
	}

	.placeholder-text {
		font-size: var(--step-0);
		line-height: 1.8;
		color: var(--color-text-secondary);
	}

	.cv-section {
		text-align: center;
		padding-top: var(--space-2xl);
		border-top: 1px solid var(--color-border);
	}

	.cv-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--step-0);
		font-weight: 500;
		color: var(--color-text);
		padding: 0.75rem 1.5rem;
		border: 1.5px solid var(--color-border);
		border-radius: 100px;
		transition: all var(--transition-fast);
	}

	.cv-link:hover {
		border-color: var(--color-accent);
		background: var(--color-border-light);
		opacity: 1;
	}

	@media (max-width: 768px) {
		.about-columns {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}
	}
</style>
