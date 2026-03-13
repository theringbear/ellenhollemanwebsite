<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { assetUrl } from '$lib/directus';

	let { data } = $props();

	const categoryColors = {
		'cultural-productions': '#7b61a5',
		'urban-activism': '#c4724a',
		'spatial-design': '#4a9c8c',
		'specials': '#c44a6e',
	};

	let badgeColor = $derived(categoryColors[data.category] || '#666');

	let images = $derived((data.item.images || [])
		.map(img => assetUrl(img.directus_files_id, { width: '1400', quality: '90', format: 'webp' }))
		.filter(Boolean));

	let thumbnails = $derived((data.item.images || [])
		.map(img => assetUrl(img.directus_files_id, { width: '200', height: '160', fit: 'cover', quality: '70', format: 'webp' }))
		.filter(Boolean));

	let formattedDate = $derived(() => {
		if (!data.item.date_published && !data.item.date_created) return '';
		const d = new Date(data.item.date_published || data.item.date_created);
		return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	});

	let readTime = $derived(() => {
		if (!data.item.description) return '3 min read';
		const text = data.item.description.replace(/<[^>]*>/g, '');
		const words = text.split(/\s+/).length;
		const minutes = Math.max(1, Math.ceil(words / 200));
		return `${minutes} min read`;
	});
</script>

<svelte:head>
	<title>{data.item.title} — {data.categoryTitle} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.item.title} — {data.categoryTitle} — {data.siteName}"
	description="{data.item.title} — {data.categoryTitle} project by Ellen Holleman."
	image={data.item.images?.[0]?.directus_files_id ? assetUrl(data.item.images[0].directus_files_id, { width: '1200', height: '630', fit: 'cover', quality: '85', format: 'webp' }) : ''}
	type="article"
/>

<article class="article-page">
	<div class="container">
		<a href="/archive" class="back-btn">
			<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
			Back to Archive
		</a>

		<div class="article-header">
			<span class="category-badge" style="background-color: {badgeColor}">{data.categoryTitle}</span>

			<h1 class="article-title">{data.item.title}</h1>

			<div class="article-meta">
				<!-- <span class="meta-item">
					<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
					Ellen Holleman
				</span> -->
				{#if formattedDate()}
					<span class="meta-item">
						<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
						{formattedDate()}
					</span>
				{/if}
				<span class="meta-item">
					<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
					{readTime()}
				</span>
			</div>
		</div>

		{#if images.length > 0}
			<div class="article-carousel">
				<Carousel {images} {thumbnails} alt={data.item.title} autoplay={false} showThumbnails={images.length > 1} />
			</div>
		{/if}

		{#if data.item.description}
			<div class="article-body">
				{@html data.item.description}
			</div>
		{/if}
	</div>
</article>

<style>
	.article-page {
		padding-bottom: var(--space-4xl);
	}

	/* Back button */
	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.5rem 1.1rem;
		font-size: var(--step--1);
		font-weight: 500;
		color: var(--color-text);
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		margin: var(--space-xl) 0;
		transition: all var(--transition-fast);
	}

	.back-btn:hover {
		border-color: var(--color-accent);
		opacity: 1;
	}

	/* Article header */
	/* .article-page > .container {
		max-width: var(--content-width);
	} */

	.article-header {
		margin-bottom: var(--space-2xl);
	}

	.category-badge {
		display: inline-block;
		padding: 0.3rem 0.9rem;
		border-radius: 100px;
		font-size: 0.78rem;
		font-weight: 500;
		color: white;
		letter-spacing: 0.02em;
		margin-bottom: var(--space-md);
	}

	.article-title {
		font-size: var(--step-4);
		font-weight: 500;
		line-height: 1.15;
		color: var(--color-text);
		margin-bottom: var(--space-lg);
	}

	/* Meta info */
	.article-meta {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		flex-wrap: wrap;
	}

	.meta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		font-size: var(--step--1);
		color: var(--color-text-muted);
	}

	.meta-item svg {
		flex-shrink: 0;
	}

	/* Carousel */
	.article-carousel {
		margin-bottom: var(--space-3xl);
	}

	.article-carousel :global(.carousel) {
		border-radius: var(--radius-xl);
	}

	.article-carousel :global(.carousel-viewport) {
		aspect-ratio: 16 / 8;
	}

	.article-carousel :global(.single-image) {
		aspect-ratio: 16 / 8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.article-carousel :global(.single-image img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Article body */
	.article-body {
		padding-bottom: var(--space-2xl);
	}

	.article-body :global(p) {
		font-size: var(--step--1);
		line-height: 1.8;
		color: var(--color-text);
		margin-bottom: var(--space-lg);
	}

	.article-body :global(h2) {
		font-size: var(--step-2);
		color: var(--color-text);
		margin-top: var(--space-2xl);
		margin-bottom: var(--space-md);
	}

	.article-body :global(h3) {
		font-size: var(--step-1);
		color: var(--color-text);
		margin-top: var(--space-xl);
		margin-bottom: var(--space-sm);
	}

	.article-body :global(img) {
		border-radius: var(--radius-lg);
		margin: var(--space-xl) 0;
	}

	.article-body :global(blockquote) {
		border-left: 3px solid var(--color-border);
		padding-left: var(--space-lg);
		font-style: italic;
		color: var(--color-text-muted);
		margin: var(--space-xl) 0;
	}

	.article-body :global(ul),
	.article-body :global(ol) {
		padding-left: var(--space-xl);
		margin-bottom: var(--space-lg);
		color: var(--color-text-secondary);
		line-height: 1.8;
	}

	.article-body :global(li) {
		margin-bottom: var(--space-sm);
		list-style: disc;
	}

	@media (max-width: 768px) {
		.article-title {
			font-size: var(--step-3);
		}

		.article-carousel :global(.carousel) {
			border-radius: var(--radius-lg);
		}

		.article-meta {
			gap: var(--space-md);
		}
	}
</style>
