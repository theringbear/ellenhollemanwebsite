<script>
	import ArtworkCard from '$lib/components/ArtworkCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.categoryTitle} — Portfolio — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="section">
		<a href="/portfolio" class="back-btn">
			<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
			Back to Portfolio
		</a>

		<h1 class="section-title">{data.categoryTitle}</h1>

		{#if data.artworks.length > 0}
			<div class="artwork-grid">
				{#each data.artworks as artwork}
					<ArtworkCard {artwork} />
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

	.artwork-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-2xl);
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--step-1);
		padding: var(--space-4xl) 0;
	}

	@media (max-width: 768px) {
		.artwork-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: var(--space-xl);
		}
	}
</style>
