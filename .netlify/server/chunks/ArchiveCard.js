import { b as attr, s as stringify, f as attr_style, e as escape_html, d as derived } from "./index.js";
import { c as assetUrl } from "./directus.js";
import { h as html } from "./SEO.js";
function ArchiveCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { item, basePath = "/archive" } = $$props;
    let firstImage = derived(() => item.images?.[0]?.directus_files_id);
    let imageUrl = derived(() => firstImage() ? assetUrl(firstImage(), {
      width: "800",
      height: "500",
      fit: "cover",
      quality: "80",
      format: "webp"
    }) : "");
    let categoryLabel = derived(() => item.category ? item.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "");
    const categoryColors = {
      "cultural-productions": "#7b61a5",
      "urban-activism": "#c4724a",
      "spatial-design": "#4a9c8c",
      "specials": "#c44a6e"
    };
    let badgeColor = derived(() => categoryColors[item.category] || "rgba(30, 30, 30, 0.85)");
    let readTime = derived(() => () => {
      if (!item.description) return "";
      const words = item.description.replace(/<[^>]*>/g, "").split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      return `${minutes} min read`;
    });
    let formattedDate = derived(() => item.date_created ? new Date(item.date_created).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "");
    $$renderer2.push(`<a${attr("href", `${stringify(basePath)}/${stringify(item.category)}/${stringify(item.slug)}`)} class="archive-card svelte-dkti08"><div class="card-image svelte-dkti08">`);
    if (imageUrl()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", imageUrl())}${attr("alt", item.title)} loading="lazy" draggable="false" class="svelte-dkti08"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (categoryLabel()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="category-badge svelte-dkti08"${attr_style(`background-color: ${stringify(badgeColor())}`)}>${escape_html(categoryLabel())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="card-body svelte-dkti08">`);
    if (formattedDate() || readTime()()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="card-meta svelte-dkti08">`);
      if (formattedDate()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span>${escape_html(formattedDate())}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (formattedDate() && readTime()()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="meta-dot svelte-dkti08">·</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (readTime()()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span>${escape_html(readTime()())}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <h3 class="card-title svelte-dkti08">${escape_html(item.title)}</h3> `);
    if (item.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="card-excerpt svelte-dkti08">${html(item.description.replace(/<[^>]*>/g, "").substring(0, 150))}${escape_html(item.description.length > 150 ? "..." : "")}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <span class="card-link svelte-dkti08">Read article <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span></div></a>`);
  });
}
export {
  ArchiveCard as A
};
