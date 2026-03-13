<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { assetUrl } from '$lib/directus';

	let { data } = $props();

	let showInquiry = $state(false);
	let dialogEl = $state(null);

	let images = $derived((data.artwork.images || [])
		.map(img => assetUrl(img.directus_files_id, { width: '1200', quality: '90', format: 'webp' }))
		.filter(Boolean));

	let thumbnails = $derived((data.artwork.images || [])
		.map(img => assetUrl(img.directus_files_id, { width: '200', height: '160', fit: 'cover', quality: '70', format: 'webp' }))
		.filter(Boolean));

	const categoryColors = {
		'paintings': '#c4724a',
		'mixed-media': '#4a9c8c',
		'portraits': '#7b61a5',
		'murals': '#c44a6e',
	};

	let categoryLabel = $derived(data.artwork.category
		? data.artwork.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
		: '');

	let badgeColor = $derived(categoryColors[data.artwork.category] || '#666');

	let isMural = $derived(data.artwork.category === 'murals');
	let isAvailable = $derived(data.artwork.availability === 'available');
	let isSold = $derived(data.artwork.availability === 'sold');
	let isPrivateCollection = $derived(data.artwork.availability === 'private_collection');

	function openInquiry() {
		showInquiry = true;
		dialogEl?.showModal();
	}

	function closeInquiry() {
		showInquiry = false;
		dialogEl?.close();
	}
</script>

<svelte:head>
	<title>{data.artwork.title} — {data.categoryTitle} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.artwork.title} — {data.categoryTitle} — {data.siteName}"
	description="{data.artwork.title}{data.artwork.materials ? ` — ${data.artwork.materials}` : ''}{data.artwork.dimensions ? `, ${data.artwork.dimensions}` : ''} by Ellen Holleman."
	image={data.artwork.images?.[0]?.directus_files_id ? assetUrl(data.artwork.images[0].directus_files_id, { width: '1200', height: '630', fit: 'cover', quality: '85', format: 'webp' }) : ''}
	type="article"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'VisualArtwork',
		name: data.artwork.title,
		artist: { '@type': 'Person', name: 'Ellen Holleman' },
		artMedium: data.artwork.materials || undefined,
		artform: data.categoryTitle,
		dateCreated: data.artwork.year || undefined,
		image: data.artwork.images?.[0]?.directus_files_id ? assetUrl(data.artwork.images[0].directus_files_id, { width: '1200', quality: '85' }) : undefined,
		offers: data.artwork.availability === 'available' ? { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'EUR' } : undefined
	}}
/>

<div class="container detail-page">
	<a href="/portfolio" class="back-btn">
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
		Back to Portfolio
	</a>

	<section class="artwork-detail">
		<div class="artwork-gallery">
			{#if images.length > 0}
				<Carousel {images} {thumbnails} alt={data.artwork.title} autoplay={false} showThumbnails={true} />
			{/if}
		</div>

		<div class="artwork-card">
			{#if categoryLabel}
				<span class="category-badge" style="background-color: {badgeColor}">{categoryLabel}</span>
			{/if}

			<h1 class="artwork-title">{data.artwork.title}</h1>

			{#if !isMural}
				<div class="artwork-meta">
					{#if data.artwork.year}
						<div class="meta-item">
							<span class="meta-label">Year</span>
							<span class="meta-value">{data.artwork.year}</span>
						</div>
					{/if}

					{#if data.artwork.materials}
						<div class="meta-item">
							<span class="meta-label">Medium</span>
							<span class="meta-value">{data.artwork.materials}</span>
						</div>
					{/if}

					{#if data.artwork.dimensions}
						<div class="meta-item">
							<span class="meta-label">Dimensions</span>
							<span class="meta-value">{data.artwork.dimensions}</span>
						</div>
					{/if}

					{#if data.artwork.collection_name}
						<div class="meta-item">
							<span class="meta-label">Collection</span>
							<span class="meta-value">{data.artwork.collection_name}</span>
						</div>
					{/if}
				</div>
			{/if}

			{#if data.artwork.description}
				<div class="about-section">
					<h2 class="about-heading">About This Work</h2>
					<div class="about-text">
						{@html data.artwork.description}
					</div>
				</div>
			{/if}

			{#if data.artwork.price}
				<div class="price">€{data.artwork.price.toLocaleString()}</div>
			{/if}

			{#if !isMural}
				<button class="inquire-btn" onclick={openInquiry}>
					Inquire About This Work
				</button>
			{/if}

			{#if isAvailable}
				<div class="availability">
					<span class="availability-dot"></span>
					Available for purchase
				</div>
			{:else if isSold}
				<div class="availability sold">
					<span class="availability-dot sold"></span>
					Sold
				</div>
			{:else if isPrivateCollection}
				<div class="availability private">
					<span class="availability-dot private"></span>
					Private Collection
				</div>
			{/if}
		</div>
	</section>
</div>

<!-- Inquiry Modal -->
<dialog bind:this={dialogEl} class="inquiry-dialog" onclose={closeInquiry}>
	<button class="close-btn" onclick={closeInquiry} aria-label="Close">
		<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
	</button>

	<div class="modal-content">
		<div class="icon-circle">
			<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
			</svg>
		</div>

		<h2>Inquire About This Work</h2>
		<!-- <p>Interested in "{data.artwork.title}"? Send a message and Ellen will get back to you.</p> -->
		<ContactForm artworkTitle={data.artwork.title} />
	</div>
</dialog>

<style>
	.detail-page {
		padding-bottom: var(--space-4xl);
		overflow-x: hidden;
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

	/* Two-column layout */
	.artwork-detail {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: var(--space-2xl);
		align-items: start;
		min-width: 0;
	}

	/* Gallery */
	.artwork-gallery {
		position: sticky;
		top: 100px;
		min-width: 0;
		overflow: hidden;
	}

	.artwork-gallery :global(.carousel-viewport) {
		aspect-ratio: 1 / 1;
	}

	.artwork-gallery :global(.single-image) {
		aspect-ratio: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-surface);
	}

	.artwork-gallery :global(.single-image img) {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: var(--color-surface);
	}

	.artwork-gallery :global(.slide img) {
		object-fit: contain;
		background: var(--color-surface);
	}

	/* Info card */
	.artwork-card {
		background: var(--glass-card-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-card-border);
		border-radius: var(--radius-xl);
		padding: var(--space-2xl);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		box-shadow: var(--glass-card-shadow);
		min-width: 0;
		word-break: break-word;
	}

	.category-badge {
		display: inline-block;
		width: fit-content;
		padding: 0.3rem 0.9rem;
		border-radius: 100px;
		font-size: 0.78rem;
		font-weight: 500;
		color: white;
		letter-spacing: 0.02em;
	}

	.artwork-title {
		font-size: var(--step-3);
		font-weight: 500;
		line-height: 1.2;
		color: var(--color-text);
		margin-top: var(--space-xs);
	}

	/* Metadata */
	.artwork-meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding-top: var(--space-sm);
		border-top: 1px solid var(--color-border);
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.meta-label {
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
	}
	.meta-value {
		font-size: var(--step-0);
		font-weight: 500;
		color: var(--color-text);
	}

	/* About section */
	.about-section {
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	.about-heading {
		font-size: var(--step-0);
		font-weight: 500;
		color: var(--color-text);
		margin-bottom: var(--space-sm);
	}

	.about-text {
		color: var(--color-text-secondary);
		font-size: var(--step--1);
		line-height: 1.7;
	}

	.about-text :global(p) {
		margin-bottom: var(--space-sm);
	}

	/* Price */
	.price {
		font-size: var(--step-2);
		font-weight: 500;
		color: var(--color-text);
		padding-top: var(--space-sm);
		border-top: 1px solid var(--color-border);
	}

	/* Inquire button */
	.inquire-btn {
		width: 100%;
		padding: 0.85rem 1.5rem;
		font-size: var(--step-0);
		font-weight: 500;
		color: var(--color-text);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--color-border);
		border-radius: 100px;
		cursor: pointer;
		transition: all var(--transition-fast);
		letter-spacing: 0.01em;
	}

	.inquire-btn:hover {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-bg);
	}

	/* Availability */
	.availability {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4em;
		font-size: var(--step--1);
		color: var(--color-text-muted);
	}

	.availability-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #4caf50;
		flex-shrink: 0;
	}

	.availability-dot.sold {
		background: #e53935;
	}

	.availability-dot.private {
		background: #7864b4;
	}

	/* Dialog */
	.inquiry-dialog {
		max-width: 600px;
		width: 90vw;
		padding: var(--space-2xl) var(--space-xl);
		border-radius: var(--radius-xl);
		border: 1px solid var(--glass-border);
		background: var(--color-bg);
	}

	.close-btn {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		color: var(--color-text-muted);
		transition: all var(--transition-fast);
		cursor: pointer;
	}

	.close-btn:hover {
		color: var(--color-text);
		background: var(--glass-card-bg);
	}

	.modal-content {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon-circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-lg);
		color: var(--color-text);
	}

	.modal-content h2 {
		font-size: var(--step-3);
		font-weight: 600;
		margin-bottom: var(--space-sm);
	}

	.modal-content > p {
		font-size: var(--step--1);
		color: var(--color-text-muted);
		margin-bottom: var(--space-xl);
		line-height: 1.6;
		max-width: 340px;
	}

	/* Responsive */

	/* Tablets and smaller laptops */
	@media (max-width: 1200px) {
		.artwork-detail {
			grid-template-columns: 1fr 1fr;
			gap: var(--space-xl);
		}

		.artwork-gallery {
			position: static;
		}

		.artwork-card {
			padding: var(--space-xl);
		}

		.artwork-title {
			font-size: var(--step-2);
		}
	}

	/* Tablets portrait — single column */
	@media (max-width: 900px) {
		.artwork-detail {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}

		.artwork-gallery {
			position: static;
			max-width: min(600px, 100%);
			margin: 0 auto;
		}

		.artwork-card {
			padding: var(--space-xl);
		}

		.artwork-title {
			font-size: var(--step-2);
		}
	}

	/* Small tablets / large phones */
	@media (max-width: 640px) {
		.detail-page {
			padding-bottom: var(--space-2xl);
		}

		.back-btn {
			margin: var(--space-md) 0;
			font-size: 0.82rem;
			padding: 0.4rem 0.9rem;
		}

		.artwork-detail {
			gap: var(--space-lg);
		}

		.artwork-card {
			padding: var(--space-lg);
			border-radius: var(--radius-lg);
		}

		.artwork-title {
			font-size: var(--step-1);
		}

		.artwork-gallery :global(.carousel-viewport) {
			aspect-ratio: 4 / 3;
		}

		.artwork-gallery :global(.single-image) {
			aspect-ratio: 4 / 3;
		}

		.artwork-gallery :global(.carousel-btn) {
			width: 38px;
			height: 38px;
		}

		.artwork-gallery :global(.carousel-btn.prev) {
			left: var(--space-sm);
		}

		.artwork-gallery :global(.carousel-btn.next) {
			right: var(--space-sm);
		}

		.price {
			font-size: var(--step-1);
		}

		.inquire-btn {
			padding: 0.75rem 1.2rem;
			font-size: var(--step--1);
		}

		.inquiry-dialog {
			width: 95vw;
			padding: var(--space-xl) var(--space-lg);
		}

		.modal-content h2 {
			font-size: var(--step-2);
		}

		.icon-circle {
			width: 50px;
			height: 50px;
		}
	}

	/* Small phones */
	@media (max-width: 400px) {
		.artwork-card {
			padding: var(--space-md);
		}

		.artwork-title {
			font-size: var(--step-0);
		}

		.category-badge {
			font-size: 0.7rem;
			padding: 0.25rem 0.7rem;
		}

		.meta-value {
			font-size: var(--step--1);
		}

		.about-text {
			font-size: 0.85rem;
		}

		.price {
			font-size: var(--step-0);
		}

		.inquire-btn {
			padding: 0.7rem 1rem;
			font-size: 0.85rem;
		}

		.inquiry-dialog {
			width: 98vw;
			padding: var(--space-lg) var(--space-md);
			border-radius: var(--radius-lg);
		}

		.modal-content h2 {
			font-size: var(--step-1);
		}

		.icon-circle {
			width: 44px;
			height: 44px;
			margin-bottom: var(--space-md);
		}

		.close-btn {
			width: 28px;
			height: 28px;
		}
	}
</style>
