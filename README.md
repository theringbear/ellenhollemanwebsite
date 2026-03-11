# Ellen Holleman — Visual Artist Website

A modern, streamlined portfolio website built with **SvelteKit** and **Directus CMS**.

## Tech Stack

- **Frontend:** [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- **CMS:** [Directus](https://directus.io/) (headless, self-hosted)
- **Styling:** Modern CSS with custom properties, fluid typography
- **Email:** [EmailJS](https://www.emailjs.com/) for contact forms
- **Deployment:** Netlify / Vercel / Node.js

## Getting Started

### 1. Install Dependencies

```bash
cd ellen-holleman-svelte
npm install
```

### 2. Start Directus CMS

```bash
docker-compose up -d
```

Access Directus admin at `http://localhost:8055`

### 3. Set Up Directus Collections

Follow the schema guide in [DIRECTUS_SETUP.md](./DIRECTUS_SETUP.md) to create all required collections.

### 4. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── app.html              # HTML shell
├── app.css               # Global styles
├── lib/
│   ├── directus.js       # Directus SDK client & helpers
│   └── components/
│       ├── Carousel.svelte       # Image carousel
│       ├── ArtworkCard.svelte    # Portfolio artwork card
│       ├── ArchiveCard.svelte    # Archive item card
│       ├── EventCard.svelte      # Calendar event card
│       ├── CategoryGrid.svelte   # Category link grid
│       ├── ContactForm.svelte    # EmailJS contact form
│       └── NewsletterModal.svelte # Newsletter signup modal
└── routes/
    ├── +layout.svelte    # Header, footer, nav
    ├── +page.svelte      # Home page
    ├── +error.svelte     # 404 page
    ├── portfolio/
    │   ├── +page.svelte             # Portfolio overview
    │   └── [category]/
    │       ├── +page.svelte         # Category listing
    │       └── [slug]/+page.svelte  # Individual artwork
    ├── archive/
    │   ├── +page.svelte             # Archive overview
    │   └── [category]/
    │       ├── +page.svelte         # Category listing
    │       └── [slug]/+page.svelte  # Individual archive item
    ├── available/+page.svelte       # Available works
    ├── about/+page.svelte           # About page
    ├── calendar/+page.svelte        # Events calendar
    ├── contact/+page.svelte         # Contact form
    ├── copyright/+page.svelte
    ├── privacy-policy/+page.svelte
    └── terms-and-conditions/+page.svelte
```

## Directus Collections

| Collection      | Type       | Description                                                    |
| --------------- | ---------- | -------------------------------------------------------------- |
| `artworks`      | Collection | Paintings, mixed media, portraits, murals                      |
| `archive_items` | Collection | Cultural productions, urban activism, spatial design, specials |
| `events`        | Collection | Calendar/exhibition events                                     |
| `about`         | Singleton  | About page content                                             |
| `pages`         | Collection | Static pages (copyright, privacy, terms)                       |
| `site_settings` | Singleton  | Global settings                                                |

## Migrating Content

A migration script is provided to import existing Eleventy markdown content:

```bash
DIRECTUS_TOKEN=your-admin-token node scripts/migrate-content.js
```

## Building for Production

```bash
npm run build
npm run preview
```

## Deployment

### Netlify

- Adapter: `@sveltejs/adapter-auto` (auto-detects Netlify)
- Set environment variables in Netlify dashboard
- `PUBLIC_DIRECTUS_URL` should point to your production Directus instance

### Self-hosted

- Use `@sveltejs/adapter-node` for Node.js deployment
- Run the built app with `node build`

## Design Decisions

- **Playfair Display + Inter** font pairing for an elegant, modern feel
- **Fluid typography** using CSS `clamp()` for responsive text sizing
- **Minimal UI** with subtle animations and hover effects
- **Accessible** with proper ARIA labels and semantic HTML
- **Mobile-first** responsive design with slide-out navigation
- **Sticky header** with blur backdrop for a polished feel
