<script>
	import { assetUrl } from '$lib/directus';

	/**
	 * @type {{ artwork: object, showPrice?: boolean }}
	 */
	let { artwork, showPrice = false } = $props();

	let firstImage = $derived(artwork.images?.[0]?.directus_files_id);
	let imageUrl = $derived(firstImage
		? assetUrl(firstImage, { width: '600', quality: '80', format: 'webp' })
		: '');

	const categoryColors = {
		'paintings': '#c4724a',
		'mixed-media': '#4a9c8c',
		'portraits': '#7b61a5',
		'murals': '#c44a6e',
	};

	let categoryLabel = $derived(artwork.category
		? artwork.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
		: '');

	let badgeColor = $derived(categoryColors[artwork.category] || '#666');

	let isAvailable = $derived(artwork.availability === 'available');

	let isSold = $derived(artwork.availability === 'sold');

	let isPrivateCollection = $derived(artwork.availability === 'private_collection');

	let metaLine = $derived(() => {
		const parts = [];
		if (artwork.year) parts.push(artwork.year);
		if (artwork.materials) parts.push(artwork.materials);
		return parts.join(' • ');
	});
</script>

<a href="/portfolio/{artwork.category}/{artwork.slug}" class="artwork-card">
	<div class="artwork-image-wrap">
		{#if imageUrl}
			<img
				src={imageUrl}
				alt={artwork.title}
				loading="lazy"
				draggable="false"
			/>
		{/if}
		{#if categoryLabel}
			<span class="category-badge" style="background-color: {badgeColor}">{categoryLabel}</span>
		{/if}

		<div class="artwork-overlay">
			<div class="overlay-content">
				<div class="overlay-info">
					<h3 class="overlay-title">{artwork.title}</h3>
					{#if metaLine()}
						<p class="overlay-meta">{metaLine()}</p>
					{/if}
					{#if artwork.dimensions}
						<p class="overlay-dimensions">{artwork.dimensions}</p>
					{/if}
				</div>
				<div class="overlay-bottom">
					{#if artwork.price}
						<span class="overlay-price">€{artwork.price.toLocaleString()}</span>
					{/if}
					{#if isAvailable}
						<span class="availability-badge available">Available</span>
					{:else if isSold}
						<span class="availability-badge sold">Sold</span>
					{:else if isPrivateCollection}
						<span class="availability-badge private">Private Collection</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</a>

<style>
	.artwork-card {
		display: block;
		text-decoration: none;
		color: inherit;
		transition: transform var(--transition-base);
	}

	.artwork-card:hover {
		opacity: 1;
		transform: translateY(-4px);
	}

	.artwork-image-wrap {
		position: relative;
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: var(--color-bg);
		border: 2px solid var(--color-border-light);
	}

	.artwork-image-wrap img {
		width: 100%;
		height: auto;
		display: block;
		transition: transform var(--transition-slow);
	}

	.artwork-card:hover .artwork-image-wrap img {
		transform: scale(1.05);
	}

	.category-badge {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		z-index: 2;
		color: white;
		padding: 0.3rem 0.85rem;
		border-radius: 100px;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		line-height: 1.4;
	}

	/* Hover overlay */
	.artwork-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.75) 0%,
			rgba(0, 0, 0, 0.4) 40%,
			transparent 70%
		);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	.artwork-card:hover .artwork-overlay {
		opacity: 1;
	}

	.overlay-content {
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.overlay-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.overlay-title {
		font-size: var(--step-1);
		font-weight: 500;
		color: white;
		line-height: 1.25;
	}

	.overlay-meta {
		font-size: var(--step--1);
		color: rgba(255, 255, 255, 0.8);
		font-weight: 400;
	}

	.overlay-dimensions {
		font-size: var(--step--1);
		color: rgba(255, 255, 255, 0.65);
		font-weight: 400;
	}

	.overlay-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.overlay-price {
		font-size: var(--step-0);
		font-weight: 500;
		color: white;
	}

	.availability-badge {
		padding: 0.3rem 0.85rem;
		border-radius: 100px;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		margin-left: auto;
	}

	.availability-badge.available {
		background: rgba(76, 175, 80, 0.85);
		color: white;
	}

	.availability-badge.sold {
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(8px);
		color: rgba(255, 255, 255, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.25);
	}

	.availability-badge.private {
		background: rgba(120, 100, 180, 0.75);
		color: white;
	}

	/* Touch devices — always show overlay */
	@media (hover: none) {
		.artwork-overlay {
			opacity: 1;
		}
	}
</style>
