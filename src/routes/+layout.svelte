<script>
	import { page } from '$app/state';

	let { children, data } = $props();

	let navOpen = $state(false);
	let scrolled = $state(false);
	let darkMode = $state(false);

	function toggleNav() {
		navOpen = !navOpen;
	}

	function closeNav() {
		navOpen = false;
	}

	function toggleDarkMode() {
		darkMode = !darkMode;
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', darkMode);
			try { localStorage.setItem('theme', darkMode ? 'dark' : 'light'); } catch(e) {}
		}
	}

	// Sync dark mode state with DOM class (set by inline script in app.html)
	// and listen for live system preference changes
	$effect(() => {
		if (typeof document !== 'undefined') {
			darkMode = document.documentElement.classList.contains('dark');

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			function onSystemChange(e) {
				const saved = localStorage.getItem('theme');
				if (!saved) {
					darkMode = e.matches;
					document.documentElement.classList.toggle('dark', darkMode);
				}
			}
			mediaQuery.addEventListener('change', onSystemChange);
			return () => mediaQuery.removeEventListener('change', onSystemChange);
		}
	});

	// Track scroll position for header styling
	$effect(() => {
		function onScroll() {
			scrolled = window.scrollY > 20;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<div class="app">
	<header class="header" class:scrolled>
		<div class="header-inner container">
			<a href="/" class="logo" onclick={closeNav}>
				<span class="logo-name">Ellen Holleman</span>
				<span class="logo-subtitle">visual artist</span>
			</a>

			<nav class="nav">
				<ul class="nav-list">
					<li class="nav-item"><a href="/portfolio" class:active={page.url.pathname.startsWith('/portfolio') || page.url.pathname.startsWith('/available')} onclick={closeNav}>Portfolio</a></li>
					<li class="nav-item"><a href="/archive" class:active={page.url.pathname.startsWith('/archive')} onclick={closeNav}>Archive</a></li>
					<li class="nav-item"><a href="/about" class:active={page.url.pathname.startsWith('/about')} onclick={closeNav}>My story</a></li>
					<li class="nav-item"><a href="/calendar" class:active={page.url.pathname.startsWith('/calendar')} onclick={closeNav}>Calendar</a></li>
					<li class="nav-item"><a href="/contact" class:active={page.url.pathname.startsWith('/contact')} onclick={closeNav}>Contact</a></li>
				</ul>
				<button class="dark-mode-toggle" onclick={toggleDarkMode} aria-label="Toggle dark mode">
					{#if darkMode}
						<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
					{:else}
						<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
					{/if}
				</button>
			</nav>

		</div>
	</header>

	<!-- Hamburger outside <header>: backdrop-filter on .header creates a containing block
	     that traps position:fixed children, so the button must live here to be truly viewport-fixed -->
	<button
		class="menu-toggle"
		class:active={navOpen}
		onclick={toggleNav}
		aria-label="Toggle menu"
		aria-expanded={navOpen}
	>
		<span class="bar"></span>
		<span class="bar"></span>
		<span class="bar"></span>
	</button>

	<!-- Mobile overlay -->
	<div class="mobile-overlay" class:open={navOpen} aria-hidden={!navOpen}>
		<div class="mobile-overlay-top">
			<a href="/" class="logo" onclick={closeNav}>
				<span class="logo-name">Ellen Holleman</span>
				<span class="logo-subtitle">visual artist</span>
			</a>
			<button class="mobile-close" onclick={closeNav} aria-label="Close menu">
				<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				Close
			</button>
		</div>
		<nav class="mobile-nav" aria-label="Main navigation">
			<ul class="mobile-nav-list">
				<li class="mobile-nav-item"><a href="/portfolio" class:active={page.url.pathname.startsWith('/portfolio') || page.url.pathname.startsWith('/available')} onclick={closeNav}>Portfolio</a></li>
				<li class="mobile-nav-item"><a href="/archive" class:active={page.url.pathname.startsWith('/archive')} onclick={closeNav}>Archive</a></li>
				<li class="mobile-nav-item"><a href="/about" class:active={page.url.pathname.startsWith('/about')} onclick={closeNav}>My story</a></li>
				<li class="mobile-nav-item"><a href="/calendar" class:active={page.url.pathname.startsWith('/calendar')} onclick={closeNav}>Calendar</a></li>
				<li class="mobile-nav-item"><a href="/contact" class:active={page.url.pathname.startsWith('/contact')} onclick={closeNav}>Contact</a></li>
			</ul>
		</nav>
		<div class="mobile-overlay-footer">
			<button class="dark-mode-toggle-overlay" onclick={toggleDarkMode} aria-label="Toggle dark mode">
				{#if darkMode}
					<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
				{:else}
					<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
				{/if}
				<span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
			</button>
		</div>
	</div>

	<main class="page-content" style="padding-top: 90px;">
		{@render children()}
	</main>

	<footer class="footer">
		<div class="footer-inner container">
			<div class="footer-brand">
				<a href="/" class="logo">
					<span class="logo-name">Ellen Holleman</span>
					<span class="logo-subtitle">visual artist</span>
				</a>
			</div>

			<div class="footer-grid">
				<div class="footer-col">
					<h4>Explore</h4>
					<ul>
						<li><a href="/portfolio">Portfolio</a></li>
						<li><a href="/archive">Archive</a></li>
						<li><a href="/about">About</a></li>
						<li><a href="/calendar">Calendar</a></li>
					</ul>
				</div>

				<div class="footer-col">
					<h4>Information</h4>
					<ul>
						<li><a href="/terms-and-conditions">Terms & Conditions</a></li>
						<li><a href="/privacy-policy">Privacy Policy</a></li>
						<li><a href="/copyright">Copyright</a></li>
					</ul>
				</div>

				<div class="footer-col">
					<h4>Connect</h4>
					<ul>
						<li><a href="mailto:{data.siteSettings?.email || 'info@ellenholleman.nl'}">{data.siteSettings?.email || 'info@ellenholleman.nl'}</a></li>
					</ul>
					<div class="social-links">
						{#if data.siteSettings?.social_facebook}
							<a href={data.siteSettings.social_facebook} target="_blank" rel="noopener" aria-label="Facebook">
								<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
							</a>
						{/if}
						{#if data.siteSettings?.social_instagram}
							<a href={data.siteSettings.social_instagram} target="_blank" rel="noopener" aria-label="Instagram">
								<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
							</a>
						{/if}
						{#if data.siteSettings?.social_linkedin}
							<a href={data.siteSettings.social_linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
								<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
							</a>
						{/if}
					</div>
				</div>
			</div>

			<div class="footer-bottom">
				<p>&copy; {new Date().getFullYear()} Ellen Holleman Visual Artist. All rights reserved.</p>
				<a href="https://ferismarketing.com/" target="_blank" rel="noopener">Made by Feris</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* ===== Header ===== */
	.header {
		position: fixed;
		top: var(--space-md);
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		width: calc(100% - var(--space-md) * 2);
		max-width: calc(var(--max-width) + 4rem);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 100px;
		transition: all var(--transition-base);
	}

	.header.scrolled {
		background: rgba(250, 250, 250, 0.92);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.06);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
		background: rgba(250, 250, 250, 0.75);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 68px;
		padding: 0 var(--space-xl);
	}

	.logo {
		display: flex;
		align-items: baseline;
		gap: 0.4em;
		text-decoration: none;
	}

	.logo:hover {
		opacity: 1;
	}

	.logo-name {
		font-family: 'Poppins', sans-serif;
		font-size: var(--step-2);
		font-weight: 500;
		color: var(--color-text);
		letter-spacing: -0.02em;
	}

	.logo-subtitle {
		font-size: var(--step--1);
		font-weight: 300;
		color: var(--color-text-muted);
		letter-spacing: 0.05em;
	}

	/* Navigation */
	.nav {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}

	.nav-item > a {
		display: block;
		padding: 0.35rem 0.95rem;
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--color-text);
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		transition: all var(--transition-fast);
		letter-spacing: 0.01em;
		white-space: nowrap;
	}

	.nav-item > a:hover {
		border-color: var(--color-accent);
		opacity: 1;
	}

	.nav-item > a.active {
		background: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-text);
	}

	/* Dark mode toggle */
	.dark-mode-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid var(--glass-border);
		border-radius: 50%;
		color: var(--color-text);
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		transition: all var(--transition-fast);
		cursor: pointer;
		flex-shrink: 0;
	}

	.dark-mode-toggle:hover {
		border-color: var(--color-accent);
	}

	/* Hamburger */
	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		padding: 8px;
		z-index: 110;
	}

	.bar {
		display: block;
		width: 24px;
		height: 2px;
		background: var(--color-text);
		border-radius: 2px;
		transition: all var(--transition-base);
		transform-origin: center;
	}

	.menu-toggle.active .bar:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.menu-toggle.active .bar:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}

	.menu-toggle.active .bar:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	/* ===== Mobile hamburger ===== */
	@media (max-width: 900px) {
		.menu-toggle {
			display: flex;
			position: fixed;
			top: var(--space-md);
			right: var(--space-md);
			z-index: 300;
			height: 68px;
			padding: 0 var(--space-lg);
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: 5px;
			background: transparent;
			border: none;
			transition: opacity var(--transition-base);
		}

		/* Fade out hamburger once overlay opens — close button inside the overlay takes over */
		.menu-toggle.active {
			opacity: 0;
			pointer-events: none;
		}

		.nav {
			display: none;
		}
	}

	/* ===== Mobile overlay ===== */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: var(--color-bg);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		visibility: hidden;
		pointer-events: none;
		transform: translateX(100%);
		transition:
			transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			visibility 0s linear 0.4s;
	}

	.mobile-overlay.open {
		transform: translateX(0);
		visibility: visible;
		pointer-events: auto;
		transition:
			transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
			visibility 0s linear 0s;
	}

	@media (min-width: 901px) {
		.mobile-overlay {
			display: none !important;
		}
	}

	/* Top bar — mirrors the header height so it aligns visually */
	.mobile-overlay-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--space-xl);
		height: calc(68px + var(--space-md) * 2);
		flex-shrink: 0;
		border-bottom: 1px solid var(--color-border-light);
	}

	.mobile-close {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.9rem 0.35rem 0.75rem;
		font-size: 0.82rem;
		font-weight: 500;
		letter-spacing: 0.01em;
		color: var(--color-text);
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		background: transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.mobile-close:hover {
		border-color: var(--color-accent);
	}

	/* Nav — centred vertically in the remaining space */
	.mobile-nav {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2xl) var(--space-xl);
	}

	.mobile-nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		width: 100%;
		max-width: 320px;
	}

	.mobile-nav-item {
		opacity: 0;
		transform: translateY(10px);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.mobile-overlay.open .mobile-nav-item:nth-child(1) { transition-delay: 0.12s; opacity: 1; transform: translateY(0); }
	.mobile-overlay.open .mobile-nav-item:nth-child(2) { transition-delay: 0.17s; opacity: 1; transform: translateY(0); }
	.mobile-overlay.open .mobile-nav-item:nth-child(3) { transition-delay: 0.22s; opacity: 1; transform: translateY(0); }
	.mobile-overlay.open .mobile-nav-item:nth-child(4) { transition-delay: 0.27s; opacity: 1; transform: translateY(0); }
	.mobile-overlay.open .mobile-nav-item:nth-child(5) { transition-delay: 0.32s; opacity: 1; transform: translateY(0); }

	.mobile-nav-item > a {
		display: block;
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		text-align: center;
		color: var(--color-text);
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		background: transparent;
		transition: all var(--transition-fast);
		letter-spacing: 0.01em;
	}

	.mobile-nav-item > a:hover {
		border-color: var(--color-accent);
		opacity: 1;
	}

	.mobile-nav-item > a.active {
		background: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-text);
	}

	/* Footer bar with dark mode toggle */
	.mobile-overlay-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xl);
		border-top: 1px solid var(--color-border-light);
		opacity: 0;
		transform: translateY(6px);
		transition: opacity 0.3s ease 0.35s, transform 0.3s ease 0.35s;
	}

	.mobile-overlay.open .mobile-overlay-footer {
		opacity: 1;
		transform: translateY(0);
	}

	.dark-mode-toggle-overlay {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.35rem 0.9rem;
		color: var(--color-text-muted);
		font-size: 0.82rem;
		font-weight: 400;
		letter-spacing: 0.04em;
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: 100px;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.dark-mode-toggle-overlay:hover {
		color: var(--color-text);
		border-color: var(--color-accent);
	}

	/* ===== Footer ===== */
	.footer {
		margin-top: auto;
		background: var(--glass-card-bg);
		backdrop-filter: var(--glass-blur);
		-webkit-backdrop-filter: var(--glass-blur);
		border-top: 1px solid var(--glass-card-border);
		padding: var(--space-4xl) 0 var(--space-xl);
	}

	.footer-brand {
		margin-bottom: var(--space-3xl);
	}

	.footer-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-2xl);
		margin-bottom: var(--space-3xl);
	}

	.footer-col h4 {
		font-family: 'Poppins', sans-serif;
		font-size: var(--step--1);
		font-weight: 500;
		color: var(--color-text);
		margin-bottom: var(--space-md);
	}

	.footer-col ul li {
		margin-bottom: var(--space-sm);
	}

	.footer-col a {
		font-size: var(--step--1);
		color: var(--color-text-secondary);
		transition: color var(--transition-fast);
	}

	.footer-col a:hover {
		color: var(--color-text);
		opacity: 1;
	}

	.social-links {
		display: flex;
		gap: var(--space-md);
		margin-top: var(--space-md);
	}

	.social-links a {
		color: var(--color-text-secondary);
		transition: color var(--transition-fast);
	}

	.social-links a:hover {
		color: var(--color-text);
		opacity: 1;
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--space-xl);
		border-top: 1px solid var(--color-border);
		font-size: var(--step--2);
		color: var(--color-text-muted);
	}

	.footer-bottom a {
		color: var(--color-text-muted);
	}

	.footer-bottom a:hover {
		color: var(--color-text);
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}

		.footer-bottom {
			flex-direction: column;
			gap: var(--space-sm);
			text-align: center;
		}

		.logo-subtitle {
			display: none;
		}
	}

	/* Dark mode overrides */
	:global(html.dark) .header {
		background: rgba(10, 10, 10, 0.75);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.15);
	}

	:global(html.dark) .header.scrolled {
		background: rgba(10, 10, 10, 0.92);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
	}


</style>
