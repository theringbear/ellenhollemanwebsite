<script>
	import ArtworkCard from '$lib/components/ArtworkCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	let activeCategory = $state('all');
	let activeAvailability = $state('all');

	const categories = [
		{ slug: 'all', title: 'All' },
		{ slug: 'paintings', title: 'Paintings' },
		{ slug: 'mixed-media', title: 'Mixed Media' },
		{ slug: 'murals', title: 'Murals' },
		{ slug: 'portraits', title: 'Portraits' },
	];

	const availabilities = [
		{ slug: 'all', title: 'All Works' },
		{ slug: 'available', title: 'Available' },
		{ slug: 'sold', title: 'Sold' },
		{ slug: 'private', title: 'Private Collection' },
	];

	function getCategoryCount(slug) {
		if (slug === 'all') return data.artworks.length;
		return data.artworks.filter(a => a.category === slug).length;
	}

	function getAvailabilityCount(slug) {
		if (slug === 'all') return data.artworks.length;
		if (slug === 'available') return data.artworks.filter(a => a.availability === 'available').length;
		if (slug === 'sold') return data.artworks.filter(a => a.availability === 'sold').length;
		if (slug === 'private') return data.artworks.filter(a => a.availability === 'private_collection').length;
		return 0;
	}

	let filteredArtworks = $derived.by(() => {
		let result = data.artworks;
		if (activeCategory !== 'all') {
			result = result.filter(a => a.category === activeCategory);
		}
		if (activeAvailability === 'available') {
			result = result.filter(a => a.availability === 'available');
		} else if (activeAvailability === 'sold') {
			result = result.filter(a => a.availability === 'sold');
		} else if (activeAvailability === 'private') {
			result = result.filter(a => a.availability === 'private_collection');
		}
		return result;
	});
</script>

<svelte:head>
	<title>{data.pageTitles.portfolio} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.pageTitles.portfolio} — {data.siteName}"
	description="Explore the portfolio of Ellen Holleman — paintings, mixed media, portraits, and murals by a Dutch visual artist."
/>

<div class="container">
	<section class="portfolio-section">
		<em class="page-title">{data.pageTitles.portfolio}</em>
		<p class="page-subtitle">A curated collection of visual artworks</p>

		<!-- Category Filter -->
		<div class="filter-group">
			<span class="filter-label">Category</span>
			<div class="filter-pills">
				{#each categories as cat}
					<button
						class="filter-pill"
						class:active={activeCategory === cat.slug}
						onclick={() => activeCategory = cat.slug}
					>
						{cat.title} ({getCategoryCount(cat.slug)})
					</button>
				{/each}
			</div>
		</div>

		<!-- Availability Filter -->
		<div class="filter-group">
			<span class="filter-label">Availability</span>
			<div class="filter-pills">
				{#each availabilities as avail}
					<button
						class="filter-pill"
						class:active={activeAvailability === avail.slug}
						onclick={() => activeAvailability = avail.slug}
					>
						{avail.title}{#if getAvailabilityCount(avail.slug) > 0} ({getAvailabilityCount(avail.slug)}){/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- Artwork Grid -->
		{#if filteredArtworks.length > 0}
			<div class="artwork-grid">
				{#each filteredArtworks as artwork (artwork.id || artwork.slug)}
					<ArtworkCard {artwork} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">No artworks match the selected filters.</p>
		{/if}
	</section>
</div>

<style>
	.portfolio-section {
		padding: var(--space-3xl) 0 var(--space-4xl);
	}

	.page-title {
		font-size: var(--step-5);
		margin-bottom: var(--space-xs);
		font-style: normal;
    	font-weight: 500;
	}

	.page-subtitle {
		font-size: var(--step-0);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2xl);
	}

	.filter-group {
		margin-bottom: var(--space-lg);
	}

	.filter-label {
		display: block;
		font-size: var(--step--1);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-sm);
		font-weight: 500;
	}

	.filter-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.filter-pill {
		padding: 0.4rem 1rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text);
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.filter-pill:hover {
		border-color: var(--color-accent);
	}

	.filter-pill.active {
		background: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-text);
	}

	.artwork-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xl);
		margin-top: var(--space-2xl);
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--step-1);
		padding: var(--space-4xl) 0;
	}

	@media (max-width: 900px) {
		.artwork-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.artwork-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
