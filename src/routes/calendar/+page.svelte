<script>
	import EventCard from '$lib/components/EventCard.svelte';

	let { data } = $props();

	let activeFilter = $state('all');

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	function isHappening(event) {
		if (!event.date) return false;
		const start = new Date(event.date);
		start.setHours(0, 0, 0, 0);
		const end = event.end_date ? new Date(event.end_date) : new Date(event.date);
		end.setHours(23, 59, 59, 999);
		return today >= start && today <= end;
	}

	function isUpcoming(event) {
		if (!event.date) return false;
		if (isHappening(event)) return false;
		const start = new Date(event.date);
		return start > today;
	}

	function isPast(event) {
		if (!event.date) return false;
		const end = event.end_date ? new Date(event.end_date) : new Date(event.date);
		end.setHours(23, 59, 59, 999);
		return end < today;
	}

	let happeningCount = $derived(data.events.filter(e => isHappening(e)).length);
	let upcomingCount = $derived(data.events.filter(e => isUpcoming(e)).length);
	let pastCount = $derived(data.events.filter(e => isPast(e)).length);

	let filteredEvents = $derived.by(() => {
		if (activeFilter === 'happening') return data.events.filter(e => isHappening(e));
		if (activeFilter === 'upcoming') return data.events.filter(e => isUpcoming(e));
		if (activeFilter === 'past') return data.events.filter(e => isPast(e));
		return data.events;
	});
</script>

<svelte:head>
	<title>Calendar — Ellen Holleman</title>
</svelte:head>

<div class="container">
	<section class="calendar-section">
		<h1 class="page-title">Events & Exhibitions</h1>
		<p class="page-subtitle">Upcoming shows and past exhibitions</p>

		<!-- Filter Pills -->
		<div class="filter-pills">
			<button class="filter-pill" class:active={activeFilter === 'all'} onclick={() => activeFilter = 'all'}>
				All Events ({data.events.length})
			</button>
			{#if happeningCount > 0}
				<button class="filter-pill happening" class:active={activeFilter === 'happening'} onclick={() => activeFilter = 'happening'}>
					Happening Currently ({happeningCount})
				</button>
			{/if}
			<button class="filter-pill" class:active={activeFilter === 'upcoming'} onclick={() => activeFilter = 'upcoming'}>
				Upcoming ({upcomingCount})
			</button>
			<button class="filter-pill" class:active={activeFilter === 'past'} onclick={() => activeFilter = 'past'}>
				Past ({pastCount})
			</button>
		</div>

		<!-- Events List -->
		{#if filteredEvents.length > 0}
			<div class="events-list">
				{#each filteredEvents as event (event.id || event.title)}
					<EventCard {event} upcoming={isUpcoming(event)} happeningNow={isHappening(event)} />
				{/each}
			</div>
		{:else}
			<p class="empty-state">No events to show. Check back soon!</p>
		{/if}
	</section>
</div>

<style>
	.calendar-section {
		padding: var(--space-3xl) 0 var(--space-4xl);
	}

	.page-title {
		font-size: var(--step-5);
		font-weight: 600;
		margin-bottom: var(--space-xs);
	}

	.page-subtitle {
		font-size: var(--step-0);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2xl);
	}

	.filter-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-bottom: var(--space-2xl);
	}

	.filter-pill {
		padding: 0.4rem 1rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text);
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.filter-pill:hover {
		border-color: var(--color-accent);
	}

	.filter-pill.active {
		background: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-text);
	}

	.filter-pill.happening {
		border-color: #e67e22;
		color: #e67e22;
	}

	.filter-pill.happening.active {
		background: #e67e22;
		color: white;
		border-color: #e67e22;
	}

	.events-list {
		max-width: 1000px;
	}

	.empty-state {
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--step-1);
		padding: var(--space-4xl) 0;
	}
</style>
