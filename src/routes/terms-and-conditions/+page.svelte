<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Terms & Conditions — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="static-page">
		<h1>{data.page?.title || 'Terms & Conditions'}</h1>
		{#if data.page?.body}
			<div class="prose">
				{@html data.page.body}
			</div>
		{:else}
			<div class="prose">
				<p>Terms and conditions content is managed through the CMS. Please add your terms content in Directus.</p>
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
