<script>
	import ArtworkCard from '$lib/components/ArtworkCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Available Works — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="section">
		<h1 class="section-title">Available Works</h1>

		{#if data.artworks.length > 0}
			<div class="artwork-grid">
				{#each data.artworks as artwork}
					<ArtworkCard {artwork} showPrice={true} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">No works currently available. Please check back or <a href="/contact">get in touch</a> for inquiries.</p>
		{/if}
	</section>
</div>

<style>
	.artwork-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

	@media (max-width: 768px) {
		.artwork-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}
</style>
