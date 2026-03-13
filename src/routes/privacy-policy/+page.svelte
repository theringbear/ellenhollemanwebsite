<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.page?.title || 'Privacy Policy'} — {data.siteName}</title>
</svelte:head>

<div class="container">
	<section class="static-page">
		<h1>{data.page?.title || 'Privacy Policy'}</h1>
		{#if data.page?.body}
			<div class="prose">
				{@html data.page.body}
			</div>
		{:else}
			<div class="prose">
				<p>Privacy policy content is managed through the CMS. Please add your privacy policy content in Directus.</p>
			</div>
		{/if}
	</section>
</div>

<style>
	.static-page {
		max-width: var(--content-width);
		margin: 0 auto;
		padding: var(--space-3xl) 0 var(--space-4xl);
		min-height: 50vh;
	}

	.static-page h1 {
		font-size: var(--step-4);
		font-weight: 400;
		margin-bottom: var(--space-2xl);
		text-align: center;
	}

	.static-page :global(li) {
		list-style: disc;
		margin-left: var(--space-xl);
		margin-bottom: var(--space-sm);
	}
</style>
