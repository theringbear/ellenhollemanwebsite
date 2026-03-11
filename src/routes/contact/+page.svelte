<script>
	import ContactForm from '$lib/components/ContactForm.svelte';
	import NewsletterModal from '$lib/components/NewsletterModal.svelte';

	let showNewsletter = $state(false);
</script>

<svelte:head>
	<title>Contact — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="contact-section">
		<div class="contact-header">
			<h1>Get in Touch</h1>
			<p>Have a question about an artwork, want to collaborate, or just want to say hello? Send a message below.</p>
		</div>

		<div class="contact-body">
			<ContactForm />

			<div class="contact-aside">
				<div class="info-card">
					<h3>Contact Info</h3>
					<a href="mailto:info@ellenholleman.nl" class="info-link">
						<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
						info@ellenholleman.nl
					</a>
				</div>

				<div class="info-card">
					<h3>Follow</h3>
					<div class="social-row">
						<a href="https://www.instagram.com/ellen_holleman/" target="_blank" rel="noopener">Instagram</a>
						<a href="https://www.facebook.com/ellen.holleman1" target="_blank" rel="noopener">Facebook</a>
						<a href="https://www.linkedin.com/in/ellen-holleman-429599a/" target="_blank" rel="noopener">LinkedIn</a>
					</div>
				</div>

				<button class="btn btn-outline newsletter-btn" onclick={() => showNewsletter = true}>
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					Join Newsletter
				</button>
			</div>
		</div>
	</section>
</div>

<NewsletterModal bind:open={showNewsletter} />

<style>
	.contact-section {
		padding: var(--space-3xl) 0 var(--space-4xl);
		max-width: 900px;
		margin: 0 auto;
	}

	.contact-header {
		text-align: center;
		margin-bottom: var(--space-3xl);
	}

	.contact-header h1 {
		font-size: var(--step-4);
		font-weight: 400;
		margin-bottom: var(--space-md);
	}

	.contact-header p {
		font-size: var(--step-0);
		color: var(--color-text-secondary);
		max-width: 500px;
		margin: 0 auto;
	}

	.contact-body {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: var(--space-4xl);
		align-items: start;
	}

	.contact-aside {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.info-card {
		padding: var(--space-xl);
		background: var(--glass-card-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-card-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-card-shadow);
	}

	.info-card h3 {
		font-family: 'Inter', sans-serif;
		font-size: var(--step--1);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: var(--space-md);
	}

	.info-link {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--step--1);
		color: var(--color-text-secondary);
	}

	.info-link:hover {
		color: var(--color-text);
		opacity: 1;
	}

	.social-row {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.social-row a {
		font-size: var(--step--1);
		color: var(--color-text-secondary);
	}

	.social-row a:hover {
		color: var(--color-text);
		opacity: 1;
	}

	.newsletter-btn {
		width: 100%;
		justify-content: center;
	}

	@media (max-width: 768px) {
		.contact-body {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}
	}
</style>
