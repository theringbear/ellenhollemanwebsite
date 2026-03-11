<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Copyright — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="static-page">
		<h1>{data.page?.title || 'Copyright'}</h1>

		{#if data.page?.body}
			<div class="prose">
				{@html data.page.body}
			</div>
		{:else}
			<div class="prose">
				<h2>Intellectual Property Rights</h2>
				<p>All content and materials on this website, including but not limited to text, graphics, logos, images, digital downloads, and data, are the property of Ellen Holleman or its content suppliers and protected by copyright and trademark laws.</p>
				<p>The compilation of all content on this website is the exclusive property of Ellen Holleman and protected by copyright and trademark laws.</p>
			</div>
		{/if}
	</section>
</div>

<style>
	.static-page {
		max-width: var(--content-width);
		margin: 0 auto;
		padding: var(--space-3xl) 0 var(--space-4xl);
		text-align: center;
		min-height: 50vh;
	}

	.static-page h1 {
		font-size: var(--step-4);
		font-weight: 400;
		margin-bottom: var(--space-2xl);
	}

	.static-page :global(h2) {
		text-align: left;
	}

	.static-page :global(p) {
		text-align: left;
	}

	.static-page :global(li) {
		text-align: left;
		list-style: disc;
		margin-left: var(--space-xl);
		margin-bottom: var(--space-sm);
	}
</style>
