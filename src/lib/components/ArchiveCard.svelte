<script>
	import { assetUrl } from '$lib/directus';

	/**
	 * @type {{ item: object, basePath?: string }}
	 */
	let { item, basePath = '/archive' } = $props();

	let firstImage = $derived(item.images?.[0]?.directus_files_id);
	let imageUrl = $derived(firstImage
		? assetUrl(firstImage, { width: '800', height: '500', fit: 'cover', quality: '80', format: 'webp' })
		: '');

	let categoryLabel = $derived(item.category
		? item.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
		: '');

	const categoryColors = {
		'cultural-productions': '#7b61a5',
		'urban-activism': '#c4724a',
		'spatial-design': '#4a9c8c',
		'specials': '#c44a6e',
	};

	let badgeColor = $derived(categoryColors[item.category] || 'rgba(30, 30, 30, 0.85)');

	// Estimate read time from description length
	let readTime = $derived(() => {
		if (!item.description) return '';
		const words = item.description.replace(/<[^>]*>/g, '').split(/\s+/).length;
		const minutes = Math.max(1, Math.ceil(words / 200));
		return `${minutes} min read`;
	});

	let formattedDate = $derived(item.date_created
		? new Date(item.date_created).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
		: '');
</script>

<a href="{basePath}/{item.category}/{item.slug}" class="archive-card">
	<div class="card-image">
		{#if imageUrl}
			<img src={imageUrl} alt={item.title} loading="lazy" draggable="false" />
		{/if}
		{#if categoryLabel}
			<span class="category-badge" style="background-color: {badgeColor}">{categoryLabel}</span>
		{/if}
	</div>

	<div class="card-body">
		{#if formattedDate || readTime()}
			<div class="card-meta">
				{#if formattedDate}<span>{formattedDate}</span>{/if}
				{#if formattedDate && readTime()}<span class="meta-dot">·</span>{/if}
				{#if readTime()}<span>{readTime()}</span>{/if}
			</div>
		{/if}

		<h3 class="card-title">{item.title}</h3>

		{#if item.description}
			<p class="card-excerpt">
				{@html item.description.replace(/<[^>]*>/g, '').substring(0, 150)}{item.description.length > 150 ? '...' : ''}
			</p>
		{/if}

		<span class="card-link">
			Read article
			<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
		</span>
	</div>
</a>

<style>
	.archive-card {
		display: block;
		text-decoration: none;
		color: inherit;
		transition: transform var(--transition-base);
	}

	.archive-card:hover {
		opacity: 1;
		transform: translateY(-4px);
	}

	.card-image {
		position: relative;
		aspect-ratio: 16 / 10;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-border-light);
		margin-bottom: var(--space-md);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.archive-card:hover .card-image img {
		transform: scale(1.03);
	}

	.category-badge {
		position: absolute;
		top: var(--space-md);
		left: var(--space-md);
		backdrop-filter: blur(8px);
		color: white;
		padding: 0.3rem 0.8rem;
		border-radius: 100px;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.card-body {
		padding: 0 var(--space-xs);
	}

	.card-meta {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		margin-bottom: var(--space-sm);
	}

	.meta-dot {
		font-size: 0.6rem;
	}

	.card-title {
		font-size: var(--step-1);
		font-weight: 500;
		margin-bottom: var(--space-sm);
		line-height: 1.3;
	}

	.card-excerpt {
		font-size: var(--step--1);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-md);
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: var(--step--1);
		font-weight: 500;
		color: var(--color-text);
		transition: gap var(--transition-fast);
	}

	.archive-card:hover .card-link {
		gap: 0.6rem;
	}
</style>
