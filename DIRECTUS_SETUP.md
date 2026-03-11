# Directus CMS Schema Setup

This document describes the Directus collections and fields needed for this SvelteKit website.

## Hosting

Directus is hosted on **Railway** at:

- **Admin Panel**: https://directus-production-fa1a.up.railway.app
- **Database**: PostgreSQL (managed by Railway)
- **File Storage**: Railway persistent volume mounted at `/directus/uploads`

### Railway Environment Variables (Directus Service)

```json
{
  "PORT": "8055",
  "DB_CLIENT": "pg",
  "DB_HOST": "interchange.proxy.rlwy.net",
  "DB_PORT": "18022",
  "DB_DATABASE": "railway",
  "DB_USER": "postgres",
  "DB_PASSWORD": "<your-password>",
  "SECRET": "<your-secret>",
  "ADMIN_EMAIL": "admin@ellenholleman.com",
  "ADMIN_PASSWORD": "<your-admin-password>",
  "WEBSOCKETS_ENABLED": "true",
  "CORS_ENABLED": "true",
  "CORS_ORIGIN": "true",
  "PUBLIC_URL": "https://directus-production-fa1a.up.railway.app",
  "RAILWAY_RUN_UID": "0"
}
```

### Local Development (Docker)

```bash
docker-compose up -d
```

Access Directus locally at `http://localhost:8055`.

## Collections

### 1. `artworks` (Collection)

| Field             | Type    | Interface       | Notes                                                            |
| ----------------- | ------- | --------------- | ---------------------------------------------------------------- |
| `id`              | uuid    | —               | Auto-generated primary key                                       |
| `status`          | string  | Select Dropdown | `published`, `draft`, `archived`                                 |
| `sort`            | integer | —               | For manual ordering                                              |
| `title`           | string  | Input           | Required                                                         |
| `slug`            | string  | Input           | Required, unique, URL-friendly                                   |
| `category`        | string  | Select Dropdown | `paintings`, `mixed-media`, `portraits`, `murals`                |
| `materials`       | string  | Input           | e.g., "Oil on canvas"                                            |
| `dimensions`      | string  | Input           | e.g., "40x30 cm"                                                 |
| `year`            | string  | Input           | e.g., "2023"                                                     |
| `collection_name` | string  | Input           | e.g., "Private collection"                                       |
| `price`           | string  | Input           | e.g., "1200" (or leave empty if not for sale)                    |
| `description`     | text    | WYSIWYG         | Rich text body                                                   |
| `availability`    | string  | Select Dropdown | `available`, `sold`, `private_collection`                        |
| `images`          | m2m     | —               | Many-to-many with `directus_files` via junction `artworks_files` |

**Availability values:**

- `available` — shown with green badge, appears on available works page
- `sold` — shown with red badge
- `private_collection` — shown with purple badge

### 2. `archive_items` (Collection)

| Field         | Type    | Interface       | Notes                                                                  |
| ------------- | ------- | --------------- | ---------------------------------------------------------------------- |
| `id`          | uuid    | —               | Auto-generated primary key                                             |
| `status`      | string  | Select Dropdown | `published`, `draft`, `archived`                                       |
| `sort`        | integer | —               | For manual ordering                                                    |
| `title`       | string  | Input           | Required                                                               |
| `slug`        | string  | Input           | Required, unique                                                       |
| `category`    | string  | Select Dropdown | `cultural-productions`, `urban-activism`, `spatial-design`, `specials` |
| `description` | text    | WYSIWYG         | Rich text body                                                         |
| `images`      | m2m     | —               | Many-to-many with `directus_files` via junction `archive_items_files`  |

### 3. `events` (Collection)

| Field        | Type    | Interface       | Notes                                           |
| ------------ | ------- | --------------- | ----------------------------------------------- |
| `id`         | uuid    | —               | Auto-generated primary key                      |
| `status`     | string  | Select Dropdown | `published`, `draft`                            |
| `title`      | string  | Input           | Required                                        |
| `date`       | date    | Datetime        | Event start date                                |
| `end_date`   | date    | Datetime        | Event end date (optional, for multi-day events) |
| `start_time` | string  | Input           | e.g., "10:00" (optional)                        |
| `end_time`   | string  | Input           | e.g., "17:00" (optional)                        |
| `location`   | string  | Input           | Venue/address                                   |
| `info`       | text    | Textarea        | Event description                               |
| `link`       | string  | Input           | External URL                                    |
| `link_text`  | string  | Input           | Button text, e.g., "Learn more"                 |
| `year`       | integer | Input           | e.g., 2024 (for grouping)                       |
| `image`      | uuid    | Image           | Single file (M2O to directus_files)             |
| `video`      | text    | Input           | Embed HTML (iframe)                             |

**Event display logic:**

- Events with `date` ≤ today ≤ `end_date` (or today = `date` if no end_date) show as **"Happening Currently"** with an orange badge
- Events with `date` in the future show as **"Upcoming"** with a purple badge
- Past events show as **"Past"** with a grey badge
- Date/time/location display inline in a single row

### 4. `about` (Singleton)

| Field              | Type   | Interface | Notes                            |
| ------------------ | ------ | --------- | -------------------------------- |
| `id`               | uuid   | —         | Auto                             |
| `title`            | string | Input     | Page title                       |
| `body`             | text   | WYSIWYG   | Main bio text                    |
| `artist_statement` | text   | WYSIWYG   | Artist statement section         |
| `cv_file`          | uuid   | File      | PDF file (M2O to directus_files) |
| `image1`           | uuid   | Image     | M2O to directus_files            |
| `image2`           | uuid   | Image     | M2O to directus_files            |
| `image3`           | uuid   | Image     | M2O to directus_files            |
| `image4`           | uuid   | Image     | M2O to directus_files            |

### 5. `pages` (Collection)

| Field    | Type   | Interface       | Notes                                                           |
| -------- | ------ | --------------- | --------------------------------------------------------------- |
| `id`     | uuid   | —               | Auto                                                            |
| `status` | string | Select Dropdown | `published`, `draft`                                            |
| `title`  | string | Input           | Page title                                                      |
| `slug`   | string | Input           | URL slug: `copyright`, `privacy-policy`, `terms-and-conditions` |
| `body`   | text   | WYSIWYG         | Page content                                                    |

### 6. `site_settings` (Singleton)

| Field              | Type   | Interface | Notes            |
| ------------------ | ------ | --------- | ---------------- |
| `id`               | uuid   | —         | Auto             |
| `site_title`       | string | Input     | Site name        |
| `description`      | text   | Textarea  | Meta description |
| `email`            | string | Input     | Contact email    |
| `social_facebook`  | string | Input     | Facebook URL     |
| `social_instagram` | string | Input     | Instagram URL    |
| `social_linkedin`  | string | Input     | LinkedIn URL     |

### 7. `homepage_settings` (Singleton)

| Field                     | Type | Interface | Notes                                                                      |
| ------------------------- | ---- | --------- | -------------------------------------------------------------------------- |
| `id`                      | uuid | —         | Auto                                                                       |
| `carousel_artworks`       | m2m  | —         | Many-to-many with `artworks` via junction `homepage_settings_artworks`     |
| `explore_portfolio_image` | uuid | Image     | Image for the "Portfolio" explore card on homepage (M2O to directus_files) |
| `explore_archive_image`   | uuid | Image     | Image for the "Archive" explore card on homepage (M2O to directus_files)   |
| `explore_about_image`     | uuid | Image     | Image for the "About" explore card on homepage (M2O to directus_files)     |

**How it works:**

- **Carousel artworks**: Select which artworks appear in the hero carousel on the homepage. The first image from each selected artwork is used. If none are selected, falls back to the first 8 artworks.
- **Explore images**: Choose the background images for the three explore cards (Portfolio, Archive, About) on the homepage.

## Roles & Permissions

Create a **Public** role with **read** access to all collections above so the SvelteKit frontend can fetch data without authentication.

### Required Public Read Access

| Collection                   | Permission |
| ---------------------------- | ---------- |
| `artworks`                   | Read       |
| `artworks_files`             | Read       |
| `archive_items`              | Read       |
| `archive_items_files`        | Read       |
| `events`                     | Read       |
| `about`                      | Read       |
| `pages`                      | Read       |
| `site_settings`              | Read       |
| `homepage_settings`          | Read       |
| `homepage_settings_artworks` | Read       |
| `directus_files`             | Read       |

> **Important**: Don't forget to give read access to the junction tables (`artworks_files`, `archive_items_files`, `homepage_settings_artworks`) and `directus_files` — without these, images won't load.

Alternatively, create an API token:

1. Go to Settings → Access Tokens
2. Create a static token
3. Add it to your `.env` as `DIRECTUS_TOKEN`

## Data Migration

To migrate existing content from the Eleventy markdown files:

1. Use the Directus API or Admin UI to create entries
2. Upload images to Directus and link them
3. Copy text content from `.md` frontmatter into the appropriate fields
