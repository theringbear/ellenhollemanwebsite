<script>
	import ArtworkCard from '$lib/components/ArtworkCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let { data } = $props();

	let columnCount = $state(3);

	let columns = $derived.by(() => {
		const cols = Array.from({ length: columnCount }, () => []);
		data.artworks.forEach((item, i) => cols[i % columnCount].push(item));
		return cols;
	});

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
	<title>{data.categoryTitle} — {data.pageTitles.portfolio} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.categoryTitle} — {data.pageTitles.portfolio} — {data.siteName}"
	description="{data.categoryTitle} artworks by Ellen Holleman — explore the collection."
/>

<div class="container">
	<section class="section">
		<a href="/portfolio" class="back-btn">
			<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
			Back to Portfolio
		</a>

		<h1 class="section-title">{data.categoryTitle}</h1>

		{#if data.artworks.length > 0}
			<div class="masonry">
				{#each columns as col}
					<div class="masonry-col">
						{#each col as artwork}
							<ArtworkCard {artwork} />
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-state">No artworks in this category yet.</p>
		{/if}
	</section>
</div>

<style>
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
		margin-bottom: var(--space-lg);
		transition: all var(--transition-fast);
	}

	.back-btn:hover {
		border-color: var(--color-accent);
		opacity: 1;
	}

	.masonry {
		display: flex;
		gap: var(--space-2xl);
	}

	.masonry-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-2xl);
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--step-1);
		padding: var(--space-4xl) 0;
	}
</style>
