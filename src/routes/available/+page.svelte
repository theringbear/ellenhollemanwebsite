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
	<title>{data.pageTitles.available} — {data.siteName}</title>
</svelte:head>

<SEO
	title="{data.pageTitles.available} — {data.siteName}"
	description="Browse available artworks by Ellen Holleman — paintings, mixed media, and more, ready for purchase."
/>

<div class="container">
	<section class="section">
		<h1 class="section-title">{data.pageTitles.available}</h1>

		{#if data.artworks.length > 0}
			<div class="masonry">
				{#each columns as col}
					<div class="masonry-col">
						{#each col as artwork}
							<ArtworkCard {artwork} showPrice={true} />
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-state">No works currently available. Please check back or <a href="/contact">get in touch</a> for inquiries.</p>
		{/if}
	</section>
</div>

<style>
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
		font-size: var(--step-0);
		padding: var(--space-4xl) 0;
	}

	.empty-state a {
		color: var(--color-text);
		text-decoration: underline;
	}
</style>
