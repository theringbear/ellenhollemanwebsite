<script>
	import ArchiveCard from '$lib/components/ArchiveCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	let activeCategory = $state('all');

	const categories = [
		{ slug: 'all', title: 'All Articles' },
		{ slug: 'cultural-productions', title: 'Cultural Productions' },
		{ slug: 'urban-activism', title: 'Urban Activism' },
		{ slug: 'spatial-design', title: 'Spatial Design' },
		{ slug: 'specials', title: 'Specials' },
	];

	function getCategoryCount(slug) {
		if (slug === 'all') return data.items.length;
		return data.items.filter(i => i.category === slug).length;
	}

	let filteredItems = $derived(
		activeCategory === 'all'
			? data.items
			: data.items.filter(i => i.category === activeCategory)
	);
</script>

<svelte:head>
	<title>{data.pageTitles.archive} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.pageTitles.archive} — {data.siteName}"
	description="Browse the archive of Ellen Holleman — cultural productions, urban activism, spatial design, and special projects."
/>

<div class="container">
	<section class="archive-section">
		<h1 class="page-title"><em>{data.pageTitles.archive}</em></h1>
		<p class="page-subtitle">Articles and writings on art, culture, and design</p>

		<!-- Category Filter -->
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

		<!-- Archive Grid -->
		{#if filteredItems.length > 0}
			<div class="archive-grid">
				{#each filteredItems as item (item.id || item.slug)}
					<ArchiveCard {item} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">No articles in this category yet.</p>
		{/if}
	</section>
</div>

<style>
	.archive-section {
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

	.filter-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-bottom: var(--space-2xl);
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

	.archive-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-2xl);
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--step-1);
		padding: var(--space-4xl) 0;
	}

	@media (max-width: 768px) {
		.archive-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
