<script>
	/**
	 * @type {{ artworkTitle?: string }}
	 */
	let { artworkTitle = '' } = $props();

	let sending = $state(false);
	let sent = $state(false);
	let error = $state('');

	async function handleSubmit(e) {
		e.preventDefault();
		sending = true;
		error = '';

		try {
			const formData = new FormData(e.target);
			const response = await fetch('/forms/contact.html', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData).toString()
			});
			if (!response.ok) throw new Error('Form submission failed');
			sent = true;
			e.target.reset();
		} catch (err) {
			error = 'Failed to send message. Please try again or email directly.';
			console.error('Form error:', err);
		} finally {
			sending = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="contact-form" name="contact" data-netlify="true" netlify-honeypot="bot-field">
	<input type="hidden" name="form-name" value="contact" />
	<p class="honeypot" aria-hidden="true">
		<label>Don't fill this out: <input name="bot-field" /></label>
	</p>
	{#if sent}
		<div class="success-message">
			<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
			<p>Thank you! Your message has been sent successfully.</p>
			<button type="button" class="btn btn-outline" onclick={() => { sent = false; }}>Send another</button>
		</div>
	{:else}
		<div class="form-group">
			<label for="from_name">Name <span class="required">*</span></label>
			<input type="text" id="from_name" name="from_name" required placeholder="Your name" />
		</div>

		<div class="form-group">
			<label for="email">Email <span class="required">*</span></label>
			<input type="email" id="email" name="email" required placeholder="your@email.com" />
		</div>

		<div class="form-group">
			<label for="phonenumber">Phone</label>
			<input type="tel" id="phonenumber" name="phonenumber" placeholder="Your phone number" />
		</div>

		{#if artworkTitle}
			<input type="hidden" name="painting" value={artworkTitle} />
			<div class="form-group">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>Regarding</label>
				<p class="form-static">{artworkTitle}</p>
			</div>
		{/if}

		<div class="form-group">
			<label for="message">Message <span class="required">*</span></label>
			<textarea id="message" name="message" required placeholder="Your message..." rows="5"></textarea>
		</div>

		{#if error}
			<p class="error-message">{error}</p>
		{/if}

		<button type="submit" class="btn btn-primary submit-btn" disabled={sending}>
			<span class="btn-text">{sending ? 'Sending...' : 'Send Message'}</span>
			{#if !sending}
				<svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
			{/if}
		</button>
	{/if}
</form>

<style>
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		max-width: 520px;
		width: 100%;
	}

	.honeypot {
		display: none;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	label {
		font-size: var(--step--1);
		font-weight: 500;
		color: var(--color-text);
	}

	.required {
		color: #e53e3e;
	}

	input, textarea {
		padding: 0.75rem 1rem;
		border: 1.5px solid var(--glass-border);
		border-radius: var(--radius-xl);
		font-size: var(--step--1);
		transition: border-color var(--transition-fast);
		background: var(--glass-bg);
		color: var(--color-text);
	}

	input:focus, textarea:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	input::placeholder, textarea::placeholder {
		color: var(--color-text-secondary);
        font-weight: 300;
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.form-static {
		font-size: var(--step--1);
		color: var(--color-text-secondary);
		padding: 0.75rem 1rem;
		background: var(--color-border-light);
		border-radius: var(--radius-md);
	}

	.submit-btn {
		width: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.85rem;
		background-color: var(--color-text);
		font-size: var(--step-0);
		color: var(--color-bg);
		border: 1.5px solid var(--color-text);
		border-radius: var(--radius-xl);
		cursor: pointer;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.btn-text {
		transition: transform 0.3s ease;
	}

	.btn-arrow {
		opacity: 0;
		transform: translateX(-8px);
		transition: opacity 0.3s ease, transform 0.3s ease;
		flex-shrink: 0;
	}

	.submit-btn:hover:not(:disabled) {
		background-color: transparent;
		color: var(--color-text);
	}

	.submit-btn:hover:not(:disabled) .btn-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.success-message {
		text-align: center;
		padding: var(--space-2xl);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		color: #38a169;
	}

	.success-message p {
		color: var(--color-text);
		font-size: var(--step-0);
	}

	.error-message {
		color: #e53e3e;
		font-size: var(--step--1);
	}
</style>
