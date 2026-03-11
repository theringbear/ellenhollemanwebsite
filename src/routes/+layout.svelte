<script>
	import { page } from '$app/state';

	let { children } = $props();

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

			<nav class="nav" class:open={navOpen}>
				<ul class="nav-list">
					<li class="nav-item"><a href="/portfolio" class:active={page.url.pathname.startsWith('/portfolio') || page.url.pathname.startsWith('/available')} onclick={closeNav}>Portfolio</a></li>
					<li class="nav-item"><a href="/archive" class:active={page.url.pathname.startsWith('/archive')} onclick={closeNav}>Archive</a></li>
					<li class="nav-item"><a href="/about" class:active={page.url.pathname.startsWith('/about')} onclick={closeNav}>About</a></li>
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
						<li><a href="mailto:info@ellenholleman.nl">info@ellenholleman.nl</a></li>
					</ul>
					<div class="social-links">
						<a href="https://www.facebook.com/ellen.holleman1" target="_blank" rel="noopener" aria-label="Facebook">
							<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
						</a>
						<a href="https://www.instagram.com/ellen_holleman/" target="_blank" rel="noopener" aria-label="Instagram">
							<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
						</a>
						<a href="https://www.linkedin.com/in/ellen-holleman-429599a/" target="_blank" rel="noopener" aria-label="LinkedIn">
							<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
						</a>
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

	@media (max-width: 900px) {
		.menu-toggle {
			display: flex;
		}

		.nav {
			position: fixed;
			top: 0;
			right: 0;
			width: min(380px, 85vw);
			height: 100vh;
			background: rgba(255, 255, 255, 0.98);
			backdrop-filter: blur(24px);
			-webkit-backdrop-filter: blur(24px);
			transform: translateX(100%);
			transition: transform var(--transition-base);
			padding: 6rem var(--space-2xl) var(--space-2xl);
			box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
			overflow-y: auto;
			flex-direction: column;
		}

		.nav.open {
			transform: translateX(0);
		}

		.nav-list {
			flex-direction: column;
			align-items: stretch;
			gap: var(--space-sm);
		}

		.nav-item > a {
			font-size: var(--step-0);
			padding: 0.65rem 1.25rem;
			text-align: center;
		}

		.dark-mode-toggle {
			margin-top: var(--space-lg);
			align-self: center;
		}
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

	@media (max-width: 900px) {
		:global(html.dark) .nav {
			background: rgba(0, 0, 0, 0.98);
			box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
		}
	}
</style>
