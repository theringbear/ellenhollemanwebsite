<script>
	/**
	 * @type {{ images: string[], thumbnails?: string[], alt?: string, autoplay?: boolean, interval?: number, showThumbnails?: boolean }}
	 */
	let { images = [], thumbnails = [], alt = '', autoplay = true, interval = 5000, showThumbnails = false } = $props();

	let current = $state(0);
	let timer = $state(null);
	let thumbnailsEl = $state(null);

	function next() {
		current = (current + 1) % images.length;
		resetTimer();
	}

	function prev() {
		current = (current - 1 + images.length) % images.length;
		resetTimer();
	}

	function goTo(index) {
		current = index;
		resetTimer();
	}

	function resetTimer() {
		if (timer) clearInterval(timer);
		if (autoplay && images.length > 1) {
			timer = setInterval(next, interval);
		}
	}

	// Smooth scroll helper with easing
	function smoothScrollTo(container, target, duration = 500) {
		const containerRect = container.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
		const targetCenter = targetRect.left + targetRect.width / 2 - containerRect.left;
		const containerCenter = containerRect.width / 2;
		const scrollTarget = container.scrollLeft + targetCenter - containerCenter;
		const startScroll = container.scrollLeft;
		const distance = scrollTarget - startScroll;
		const startTime = performance.now();

		function easeInOutCubic(t) {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		}

		function step(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			container.scrollLeft = startScroll + distance * easeInOutCubic(progress);
			if (progress < 1) {
				requestAnimationFrame(step);
			}
		}
		requestAnimationFrame(step);
	}

	// Scroll active thumbnail into view
	$effect(() => {
		if (thumbnailsEl) {
			const activeThumb = thumbnailsEl.children[current];
			if (activeThumb) {
				smoothScrollTo(thumbnailsEl, activeThumb, 500);
			}
		}
	});

	$effect(() => {
		if (autoplay && images.length > 1) {
			timer = setInterval(next, interval);
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	});
</script>

{#if images.length > 0}
	<div class="carousel-wrapper">
		<div class="carousel" role="region" aria-label="Image carousel">
			<div class="carousel-viewport">
				{#each images as src, i}
					<div class="slide" class:active={i === current}>
						<img
							{src}
							alt="{alt} - Image {i + 1}"
							loading={i === 0 ? 'eager' : 'lazy'}
							draggable="false"
						/>
					</div>
				{/each}
			</div>

			{#if images.length > 1}
				<button class="carousel-btn prev" onclick={prev} aria-label="Previous image">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>
				<button class="carousel-btn next" onclick={next} aria-label="Next image">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>

				<div class="carousel-dots">
					{#each images as _, i}
						<button
							class="dot"
							class:active={i === current}
							onclick={() => goTo(i)}
							aria-label="Go to slide {i + 1}"
						></button>
					{/each}
				</div>
			{/if}
		</div>

		{#if showThumbnails && thumbnails.length > 1}
			<div class="carousel-thumbnails" bind:this={thumbnailsEl}>
				{#each thumbnails as thumb, i}
					<button
						class="thumbnail"
						class:active={i === current}
						onclick={() => goTo(i)}
						aria-label="View image {i + 1}"
					>
						<img src={thumb} alt="{alt} - Thumbnail {i + 1}" draggable="false" />
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.carousel-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		max-width: 100%;
		overflow: hidden;
	}

	.carousel {
		position: relative;
		width: 100%;
		max-width: 100%;
		border-radius: var(--radius-xl);
		overflow: hidden;
		background: var(--color-border-light);
	}

	.carousel-viewport {
		position: relative;
		width: 100%;
		height: 100%;
		aspect-ratio: 4 / 3;
	}

	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 400ms ease;
	}

	.slide.active {
		opacity: 1;
		z-index: 1;
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		background: rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(6px);
		border: none;
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: none;
		color: white;
	}

	.carousel-btn:hover {
		background: rgba(0, 0, 0, 0.55);
		transform: translateY(-50%) scale(1.05);
	}

	.carousel-btn.prev {
		left: var(--space-lg);
	}

	.carousel-btn.next {
		right: var(--space-lg);
	}

	.carousel-dots {
		position: absolute;
		bottom: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0;
		background: none;
		backdrop-filter: none;
		border-radius: 0;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.45);
		border: none;
		cursor: pointer;
		transition: all 300ms ease;
		padding: 0;
	}

	.dot.active {
		background: white;
		width: 28px;
		border-radius: 10px;
	}

	/* Thumbnail strip */
	.carousel-thumbnails {
		display: flex;
		gap: var(--space-sm);
		overflow-x: auto;
		max-width: 100%;
		padding-bottom: var(--space-xs);
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		border-radius: var(--radius-sm);
	}

	.carousel-thumbnails::-webkit-scrollbar {
		height: 0;
	}

	.thumbnail {
		flex-shrink: 0;
		width: 100px;
		height: 80px;
		border-radius: var(--radius-md);
		overflow: hidden;
		cursor: pointer;
		border: 2px solid transparent;
		opacity: 0.5;
		transform: scale(0.92);
		transition: opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1),
			border-color 400ms cubic-bezier(0.25, 0.1, 0.25, 1),
			transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1),
			box-shadow 400ms cubic-bezier(0.25, 0.1, 0.25, 1);
		padding: 0;
		background: var(--color-border-light);
	}

	.thumbnail.active {
		opacity: 1;
		border-color: var(--color-accent);
		transform: scale(1);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.thumbnail:hover {
		opacity: 0.85;
		transform: scale(0.96);
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.carousel-btn {
			width: 40px;
			height: 40px;
		}

		.carousel-btn svg {
			width: 20px;
			height: 20px;
		}

		.thumbnail {
			width: 72px;
			height: 56px;
		}
	}
</style>
