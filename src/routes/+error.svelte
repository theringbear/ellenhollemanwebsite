<svelte:head>
	<title>Page Not Found — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="error-page">
		<h1>404</h1>
		<p>The page you're looking for doesn't exist.</p>
		<a href="/" class="btn btn-primary">Back to Home</a>
	</section>
</div>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		text-align: center;
		gap: var(--space-lg);
	}

	.error-page h1 {
		font-size: clamp(4rem, 10vw, 8rem);
		font-weight: 300;
		color: var(--color-border);
		line-height: 1;
	}

	.error-page p {
		font-size: var(--step-1);
		color: var(--color-text-secondary);
	}
</style>
