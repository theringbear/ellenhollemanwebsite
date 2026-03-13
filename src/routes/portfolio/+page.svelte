<script>
	import ArtworkCard from '$lib/components/ArtworkCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	let activeCategory = $state('all');
	let activeAvailability = $state('all');
	let columnCount = $state(3);

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

	// Distribute items round-robin across columns so reading order is left→right, top→bottom
	let columns = $derived.by(() => {
		const cols = Array.from({ length: columnCount }, () => []);
		filteredArtworks.forEach((item, i) => cols[i % columnCount].push(item));
		return cols;
	});

	// Update column count based on viewport width
	function updateColumns() {
		if (typeof window === 'undefined') return;
		if (window.innerWidth <= 600) columnCount = 1;
		else if (window.innerWidth <= 900) columnCount = 2;
		else columnCount = 3;
	}

	$effect(() => {
		updateColumns();
	});
</script>

<svelte:window onresize={updateColumns} />

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
			<div class="masonry">
				{#each columns as col, colIdx}
					<div class="masonry-col">
						{#each col as artwork (artwork.id || artwork.slug)}
							<ArtworkCard {artwork} />
						{/each}
					</div>
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

	.masonry {
		display: flex;
		gap: var(--space-xl);
		margin-top: var(--space-2xl);
	}

	.masonry-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--step-1);
		padding: var(--space-4xl) 0;
	}
</style>
