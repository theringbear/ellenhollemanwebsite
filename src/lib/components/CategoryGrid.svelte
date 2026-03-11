<script>
	import { assetUrl } from '$lib/directus';

	/**
	 * @type {{ categories: Array<{ slug: string, title: string, image: string | null }>, basePath?: string }}
	 */
	let { categories = [], basePath = '/portfolio' } = $props();
</script>

<div class="category-grid">
	{#each categories as cat}
		<a href="{basePath}/{cat.slug}" class="category-card">
			<div class="category-image">
				{#if cat.image}
					<img
						src={assetUrl(cat.image, { width: '600', height: '600', fit: 'cover', quality: '80', format: 'webp' })}
						alt={cat.title}
						loading="lazy"
						draggable="false"
					/>
				{/if}
				<div class="category-overlay">
					<h3>{cat.title}</h3>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--space-xl);
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.category-card {
		display: block;
		text-decoration: none;
		border-radius: var(--radius-xl);
		overflow: hidden;
		transition: transform var(--transition-base);
	}

	.category-card:hover {
		opacity: 1;
		transform: translateY(-6px);
	}

	.category-image {
		position: relative;
		aspect-ratio: 1;
		background: var(--color-border-light);
	}

	.category-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--transition-slow);
	}

	.category-card:hover .category-image img {
		transform: scale(1.05);
	}

	.category-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 50%);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: var(--space-xl);
		transition: background var(--transition-base);
	}

	.category-card:hover .category-overlay {
		background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent 60%);
	}

	.category-overlay h3 {
		color: white;
		font-size: var(--step-2);
		font-weight: 500;
		text-align: center;
		letter-spacing: 0.02em;
	}

	@media (max-width: 600px) {
		.category-grid {
			grid-template-columns: 1fr;
		}

		.category-image {
			aspect-ratio: 3 / 1;
			border-radius: var(--radius-xl);
		}
	}
</style>
