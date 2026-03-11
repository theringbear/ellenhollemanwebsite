<script>
	import { assetUrl } from '$lib/directus';

	/**
	 * @type {{ event: object, upcoming?: boolean, happeningNow?: boolean }}
	 */
	let { event, upcoming = false, happeningNow = false } = $props();

	let imageUrl = $derived(event.image
		? assetUrl(event.image, { width: '600', height: '400', fit: 'cover', quality: '80', format: 'webp' })
		: '');

	let formattedDate = $derived(() => {
		if (!event.date) return '';
		const opts = { month: 'long', day: 'numeric', year: 'numeric' };
		const startStr = new Date(event.date).toLocaleDateString('en-US', opts);
		if (event.end_date && event.end_date !== event.date) {
			const endStr = new Date(event.end_date).toLocaleDateString('en-US', opts);
			return `${startStr} – ${endStr}`;
		}
		return startStr;
	});

	let formattedTime = $derived(() => {
		const parts = [];
		if (event.start_time) parts.push(event.start_time);
		if (event.end_time) parts.push(event.end_time);
		return parts.join(' – ');
	});

	let eventType = $derived(event.event_type || event.type || '');
</script>

<article class="event-card">
	<div class="event-media">
		{#if event.video}
			<div class="event-video">
				{@html event.video}
			</div>
		{:else if imageUrl}
			<img src={imageUrl} alt={event.title} loading="lazy" draggable="false" />
		{/if}

		<!-- Badges -->
		<div class="event-badges">
			{#if eventType}
				<span class="badge badge-type">{eventType}</span>
			{/if}
			{#if happeningNow}
				<span class="badge badge-happening">Happening Currently</span>
			{:else}
				<span class="badge" class:badge-upcoming={upcoming} class:badge-past={!upcoming}>
					{upcoming ? 'Upcoming' : 'Past'}
				</span>
			{/if}
		</div>
	</div>

	<div class="event-info">
		<h3 class="event-title">{event.title}</h3>

		<div class="event-meta">
			{#if event.location}
				<span class="event-detail">
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
					{event.location}
				</span>
			{/if}

			{#if formattedDate()}
				<span class="event-detail">
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
					{formattedDate()}
				</span>
			{/if}

			{#if formattedTime()}
				<span class="event-detail">
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
					{formattedTime()}
				</span>
			{/if}
		</div>

		{#if event.info}
			<p class="event-text">{event.info}</p>
		{/if}

		{#if event.link}
			<a href={event.link} target="_blank" rel="noopener" class="event-btn">
				{event.link_text || 'Learn More'}
			</a>
		{/if}
	</div>
</article>

<style>
	.event-card {
		display: grid;
		grid-template-columns: 340px 1fr;
		gap: var(--space-2xl);
		padding: var(--space-2xl) 0;
		border-bottom: 1px solid var(--color-border-light);
		align-items: center;
	}

	.event-card:last-child {
		border-bottom: none;
	}

	.event-media {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		aspect-ratio: 3 / 2;
		background: var(--color-border-light);
	}

	.event-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.event-video {
		width: 100%;
		height: 100%;
	}

	.event-video :global(iframe) {
		width: 100%;
		height: 100%;
		border: none;
	}

	.event-badges {
		position: absolute;
		top: var(--space-sm);
		left: var(--space-sm);
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}

	.badge {
		padding: 0.2rem 0.6rem;
		border-radius: 100px;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		text-transform: lowercase;
	}

	.badge-type {
		background: rgba(30, 30, 30, 0.85);
		color: white;
	}

	.badge-upcoming {
		background: #7b61a5;
		color: white;
	}

	.badge-happening {
		background: #e67e22;
		color: white;
	}

	.badge-past {
		background: rgba(100, 100, 100, 0.75);
		color: white;
	}

	.event-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding-top: var(--space-sm);
	}

	.event-title {
		font-size: var(--step-2);
		font-weight: 500;
		line-height: 1.3;
	}

	.event-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm) var(--space-lg);
	}

	.event-detail {
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
		font-size: var(--step--1);
		color: var(--color-text-secondary);
		white-space: nowrap;
	}

	.event-detail svg {
		flex-shrink: 0;
	}

	.event-text {
		font-size: var(--step--1);
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-top: var(--space-xs);
	}

	.event-btn {
		display: inline-block;
		margin-top: var(--space-sm);
		padding: 0.6rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-bg);
		background: var(--color-text);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		width: fit-content;
	}

	.event-btn:hover {
		opacity: 0.85;
	}

	@media (max-width: 768px) {
		.event-card {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
			padding: var(--space-xl) 0;
		}
	}
</style>
