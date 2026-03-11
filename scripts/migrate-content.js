/**
 * Migration script: Import existing Eleventy markdown content into Directus.
 *
 * Usage:
 *   1. Start Directus (docker-compose up -d)
 *   2. Create all collections as described in DIRECTUS_SETUP.md
 *   3. Set DIRECTUS_URL and DIRECTUS_TOKEN below
 *   4. Run: node scripts/migrate-content.js
 *
 * This script reads the markdown files from the old site and creates
 * corresponding entries in Directus via the REST API.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OLD_SITE = path.resolve(__dirname, "../../"); // Points to the old Eleventy site root

const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://localhost:8055";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || "your-admin-token";

// Simple frontmatter parser
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const frontmatter = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.substring(0, colonIdx).trim();
      let value = line.substring(colonIdx + 1).trim();
      // Remove surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }

  return { data: frontmatter, body: match[2].trim() };
}

// Helper to create an item in Directus
async function createItem(collection, data) {
  const res = await fetch(`${DIRECTUS_URL}/items/${collection}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Failed to create ${collection} item:`, err);
    return null;
  }

  const result = await res.json();
  return result.data;
}

// Upload a file to Directus
async function uploadFile(filePath, title) {
  const formData = new FormData();
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);
  formData.append("file", blob, path.basename(filePath));
  if (title) formData.append("title", title);

  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
    body: formData,
  });

  if (!res.ok) {
    console.error(`Failed to upload file: ${filePath}`);
    return null;
  }

  const result = await res.json();
  return result.data.id;
}

// Slugify a string
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Read markdown files from a directory
function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(dir, entry.name, "index.md");
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf-8");
        files.push({ name: entry.name, ...parseFrontmatter(content) });
      }
    } else if (entry.name.endsWith(".md")) {
      const content = fs.readFileSync(path.join(dir, entry.name), "utf-8");
      files.push({
        name: entry.name.replace(".md", ""),
        ...parseFrontmatter(content),
      });
    }
  }

  return files;
}

async function migrateArtworks() {
  const categories = {
    paintings: path.join(OLD_SITE, "src/Portfolio/1-paintings"),
    "mixed-media": path.join(OLD_SITE, "src/Portfolio/2-mixed-media"),
    portraits: path.join(OLD_SITE, "src/Portfolio/3-portraits"),
    murals: path.join(OLD_SITE, "src/Portfolio/4-murals"),
  };

  for (const [category, dir] of Object.entries(categories)) {
    const files = readMarkdownFiles(dir);
    console.log(`Found ${files.length} ${category} artworks`);

    for (const file of files) {
      const item = {
        status: "published",
        title: file.data.title || file.name,
        slug: slugify(file.data.title || file.name),
        category,
        materials: file.data.materials || null,
        dimensions: file.data.dimensions || null,
        year: file.data.year || null,
        collection_name: file.data.collection || null,
        price: file.data.price || null,
        description: file.body || null,
        available: (file.data.tags || "").includes("available"),
        sort: parseInt(file.data.order) || 0,
      };

      const result = await createItem("artworks", item);
      if (result) {
        console.log(`  ✓ Created artwork: ${item.title}`);
      }
    }
  }
}

async function migrateArchive() {
  const categories = {
    "cultural-productions": path.join(
      OLD_SITE,
      "src/Archive/CulturalProductions",
    ),
    "urban-activism": path.join(OLD_SITE, "src/Archive/UrbanActivism"),
    "spatial-design": path.join(OLD_SITE, "src/Archive/SpatialDesign"),
    specials: path.join(OLD_SITE, "src/Archive/Specials"),
  };

  for (const [category, dir] of Object.entries(categories)) {
    const files = readMarkdownFiles(dir);
    console.log(`Found ${files.length} ${category} archive items`);

    for (const file of files) {
      const item = {
        status: "published",
        title: file.data.title || file.name,
        slug: slugify(file.data.title || file.name),
        category,
        description: file.body || null,
        sort: parseInt(file.data.order) || 0,
      };

      const result = await createItem("archive_items", item);
      if (result) {
        console.log(`  ✓ Created archive item: ${item.title}`);
      }
    }
  }
}

async function migrateEvents() {
  const eventsDir = path.join(OLD_SITE, "src/gebeurtenissen");
  const files = readMarkdownFiles(eventsDir);
  console.log(`Found ${files.length} events`);

  for (const file of files) {
    // Extract year from tags
    const tags = file.data.tags || "";
    let year = null;
    if (tags.includes("twintigzesentwintig")) year = 2026;
    else if (tags.includes("twintigvijfentwintig")) year = 2025;
    else if (tags.includes("twintigvierentwintig")) year = 2024;
    else if (tags.includes("twintigdrieentwintig")) year = 2023;
    else if (tags.includes("twintigtweeentwintig")) year = 2022;

    const item = {
      status: "published",
      title: file.data.title || file.name,
      date: file.data.date || null,
      time: file.data.time || null,
      location: file.data.location || null,
      info: file.data.info || null,
      link: file.data.link || null,
      link_text: file.data.linktext || null,
      year,
      video: file.data.video || null,
    };

    const result = await createItem("events", item);
    if (result) {
      console.log(`  ✓ Created event: ${item.title}`);
    }
  }
}

async function main() {
  console.log("🎨 Starting content migration to Directus...\n");
  console.log(`Directus URL: ${DIRECTUS_URL}`);
  console.log(`Old site path: ${OLD_SITE}\n`);

  await migrateArtworks();
  console.log("");
  await migrateArchive();
  console.log("");
  await migrateEvents();

  console.log("\n✅ Migration complete!");
  console.log("\nNote: Images need to be uploaded separately.");
  console.log(
    "Use the Directus Admin UI to upload images and link them to entries.",
  );
}

main().catch(console.error);
