<script>
	import { PUBLIC_NEWSLETTER_URL } from '$env/static/public';

	/**
	 * @type {{ open?: boolean, onclose?: () => void }}
	 */
	let { open = $bindable(false), onclose = () => {} } = $props();

	let dialogEl = $state(null);
	let sending = $state(false);
	let sent = $state(false);
	let error = $state('');

	$effect(() => {
		if (!dialogEl) return;
		if (open) {
			dialogEl.showModal();
		} else {
			dialogEl.close();
		}
	});

	function handleClose() {
		open = false;
		onclose();
		// Reset state after a short delay so the closing animation isn't jarring
		setTimeout(() => {
			sent = false;
			error = '';
		}, 300);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		sending = true;
		error = '';

		try {
			const formData = new FormData(e.target);
			await fetch(PUBLIC_NEWSLETTER_URL, {
				method: 'POST',
				body: formData,
				mode: 'no-cors' // external provider won't have CORS headers
			});
			// With no-cors we can't read the response status,
			// but if fetch didn't throw, the request was sent successfully
			sent = true;
		} catch (err) {
			error = 'Something went wrong. Please try again.';
			console.error('Newsletter error:', err);
		} finally {
			sending = false;
		}
	}
</script>

<dialog bind:this={dialogEl} class="newsletter-modal" onclose={handleClose}>
	<button class="close-btn" onclick={handleClose} aria-label="Close">
		<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
	</button>

	<div class="modal-content">
		{#if sent}
			<div class="success-state">
				<div class="icon-circle success">
					<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</div>
				<h2>You're subscribed!</h2>
				<p>Thank you for signing up. You'll receive updates about new artworks and exhibitions.</p>
				<button class="subscribe-btn" onclick={handleClose}>Close</button>
			</div>
		{:else}
			<div class="icon-circle">
				<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="2" y="4" width="20" height="16" rx="2"/>
					<polyline points="22,4 12,13 2,4"/>
				</svg>
			</div>

			<h2>Stay Connected</h2>
			<p>Subscribe to receive updates about new artworks and exhibitions</p>

			<form onsubmit={handleSubmit}>
				<input type="hidden" name="a" value="ga0yzre3ec" />
				<input type="hidden" name="l" value="jgyzi3xu6m" />

				<div class="form-row">
					<input type="text" name="NV65W9GTx7" placeholder="First name" />
					<input type="text" name="1rgfyQeYt2" placeholder="Surname" />
				</div>
				<input type="email" name="wg5PV9slKN" placeholder="Enter your email address" required />

				<!-- Honeypot -->
				<input autocomplete="new-password" type="email" name="email" style="position:absolute;top:-9999px;left:-9999px;" tabindex="-1" />

				{#if error}
					<p class="error-message">{error}</p>
				{/if}

				<button type="submit" class="subscribe-btn" disabled={sending}>
					{sending ? 'Subscribing...' : 'Subscribe to Newsletter'}
				</button>
			</form>

			<p class="disclaimer">Unsubscribe anytime. No spam, just art.</p>
		{/if}
	</div>
</dialog>

<style>
	.newsletter-modal {
		max-width: 440px;
		width: 90vw;
		padding: var(--space-2xl) var(--space-xl);
		border-radius: var(--radius-xl);
        border: 1px solid var(--glass-border);
        background: var(--color-bg);
	}

	.close-btn {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		color: var(--color-text-muted);
		transition: all var(--transition-fast);
		cursor: pointer;
	}

	.close-btn:hover {
		color: var(--color-text);
		background: var(--glass-card-bg);
	}

	.modal-content {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon-circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-lg);
		color: var(--color-text);
	}

	.modal-content h2 {
		font-size: var(--step-3);
		font-weight: 600;
		margin-bottom: var(--space-sm);
	}

	.modal-content > p {
		font-size: var(--step--1);
		color: var(--color-text-muted);
		margin-bottom: var(--space-xl);
		line-height: 1.6;
		max-width: 340px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		width: 100%;
	}

	.form-row {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-md);
	}

	input[type="text"],
	input[type="email"] {
		padding: 0.85rem 1.1rem;
		border: 1.5px solid var(--glass-border);
		border-radius: 100px;
		font-size: var(--step--1);
		background-color: var(--glass-bg);
		color: var(--color-text);
		transition: border-color var(--transition-fast);
        width: 100%;
	}

	input[type="text"]::placeholder,
	input[type="email"]::placeholder {
		color: var(--color-text-muted);
	}

	input:focus {
		outline: none;
		border-color: var(--color-text);
	}

	.subscribe-btn {
		width: 100%;
		padding: 0.85rem;
		font-size: var(--step-0);
		font-weight: 500;
		color: var(--color-bg);
		background-color: var(--color-text);
		border: 1.5px solid var(--color-text);
		border-radius: 100px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.subscribe-btn:hover {
		background-color: transparent;
		color: var(--color-text);
	}

	.subscribe-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.success-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: var(--space-lg) 0;
	}

	.success-state h2 {
		font-size: var(--step-3);
		font-weight: 600;
		margin-bottom: var(--space-sm);
	}

	.success-state p {
		font-size: var(--step--1);
		color: var(--color-text-muted);
		line-height: 1.6;
		max-width: 340px;
		margin-bottom: var(--space-xl);
	}

	.icon-circle.success {
		color: #38a169;
		border-color: #38a16930;
		background: #38a16910;
	}

	.error-message {
		color: #e53e3e;
		font-size: var(--step--1);
		text-align: center;
	}

	.disclaimer {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-top: var(--space-md);
		margin-bottom: 0;
	}
</style>
