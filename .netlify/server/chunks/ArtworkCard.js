import { b as attr, s as stringify, f as attr_style, e as escape_html, d as derived } from "./index.js";
import { c as assetUrl } from "./directus.js";
function ArtworkCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { artwork, showPrice = false } = $$props;
    let firstImage = derived(() => artwork.images?.[0]?.directus_files_id);
    let imageUrl = derived(() => firstImage() ? assetUrl(firstImage(), { width: "600", quality: "80", format: "webp" }) : "");
    const categoryColors = {
      "paintings": "#c4724a",
      "mixed-media": "#4a9c8c",
      "portraits": "#7b61a5",
      "murals": "#c44a6e"
    };
    let categoryLabel = derived(() => artwork.category ? artwork.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "");
    let badgeColor = derived(() => categoryColors[artwork.category] || "#666");
    let isAvailable = derived(() => artwork.availability === "available");
    let isSold = derived(() => artwork.availability === "sold");
    let isPrivateCollection = derived(() => artwork.availability === "private_collection");
    let metaLine = derived(() => () => {
      const parts = [];
      if (artwork.year) parts.push(artwork.year);
      if (artwork.materials) parts.push(artwork.materials);
      return parts.join(" • ");
    });
    $$renderer2.push(`<a${attr("href", `/portfolio/${stringify(artwork.category)}/${stringify(artwork.slug)}`)} class="artwork-card svelte-p97lhu"><div class="artwork-image-wrap svelte-p97lhu">`);
    if (imageUrl()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", imageUrl())}${attr("alt", artwork.title)} loading="lazy" draggable="false" class="svelte-p97lhu"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (categoryLabel()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="category-badge svelte-p97lhu"${attr_style(`background-color: ${stringify(badgeColor())}`)}>${escape_html(categoryLabel())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="artwork-overlay svelte-p97lhu"><div class="overlay-content svelte-p97lhu"><div class="overlay-info svelte-p97lhu"><h3 class="overlay-title svelte-p97lhu">${escape_html(artwork.title)}</h3> `);
    if (metaLine()()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="overlay-meta svelte-p97lhu">${escape_html(metaLine()())}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (artwork.dimensions) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="overlay-dimensions svelte-p97lhu">${escape_html(artwork.dimensions)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="overlay-bottom svelte-p97lhu">`);
    if (artwork.price) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="overlay-price svelte-p97lhu">€${escape_html(artwork.price.toLocaleString())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (isAvailable()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="availability-badge available svelte-p97lhu">Available</span>`);
    } else if (isSold()) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<span class="availability-badge sold svelte-p97lhu">Sold</span>`);
    } else if (isPrivateCollection()) {
      $$renderer2.push("<!--[2-->");
      $$renderer2.push(`<span class="availability-badge private svelte-p97lhu">Private Collection</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></div></div></a>`);
  });
}
export {
  ArtworkCard as A
};
