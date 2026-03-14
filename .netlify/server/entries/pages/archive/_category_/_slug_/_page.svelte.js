import { h as head, s as stringify, f as attr_style, e as escape_html, d as derived } from "../../../../../chunks/index.js";
import { C as Carousel } from "../../../../../chunks/Carousel.js";
import { S as SEO, h as html } from "../../../../../chunks/SEO.js";
import { c as assetUrl } from "../../../../../chunks/directus.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const categoryColors = {
      "cultural-productions": "#7b61a5",
      "urban-activism": "#c4724a",
      "spatial-design": "#4a9c8c",
      "specials": "#c44a6e"
    };
    let badgeColor = derived(() => categoryColors[data.category] || "#666");
    let images = derived(() => (data.item.images || []).map((img) => assetUrl(img.directus_files_id, { width: "1400", quality: "90", format: "webp" })).filter(Boolean));
    let thumbnails = derived(() => (data.item.images || []).map((img) => assetUrl(img.directus_files_id, {
      width: "200",
      height: "160",
      fit: "cover",
      quality: "70",
      format: "webp"
    })).filter(Boolean));
    let formattedDate = derived(() => () => {
      if (!data.item.date_published && !data.item.date_created) return "";
      const d = new Date(data.item.date_published || data.item.date_created);
      return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    });
    let readTime = derived(() => () => {
      if (!data.item.description) return "3 min read";
      const text = data.item.description.replace(/<[^>]*>/g, "");
      const words = text.split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      return `${minutes} min read`;
    });
    head("1idzbo2", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.item.title)} — ${escape_html(data.categoryTitle)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.item.title)} — ${stringify(data.categoryTitle)} — ${stringify(data.siteName)}`,
      description: `${stringify(data.item.title)} — ${stringify(data.categoryTitle)} project by Ellen Holleman.`,
      image: data.item.images?.[0]?.directus_files_id ? assetUrl(data.item.images[0].directus_files_id, {
        width: "1200",
        height: "630",
        fit: "cover",
        quality: "85",
        format: "webp"
      }) : "",
      type: "article"
    });
    $$renderer2.push(`<!----> <article class="article-page svelte-1idzbo2"><div class="container"><a href="/archive" class="back-btn svelte-1idzbo2"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg> Back to Archive</a> <div class="article-header svelte-1idzbo2"><span class="category-badge svelte-1idzbo2"${attr_style(`background-color: ${stringify(badgeColor())}`)}>${escape_html(data.categoryTitle)}</span> <h1 class="article-title svelte-1idzbo2">${escape_html(data.item.title)}</h1> <div class="article-meta svelte-1idzbo2">`);
    if (formattedDate()()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="meta-item svelte-1idzbo2"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1idzbo2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${escape_html(formattedDate()())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <span class="meta-item svelte-1idzbo2"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" class="svelte-1idzbo2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${escape_html(readTime()())}</span></div></div> `);
    if (images().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="article-carousel svelte-1idzbo2">`);
      Carousel($$renderer2, {
        images: images(),
        thumbnails: thumbnails(),
        alt: data.item.title,
        autoplay: false,
        showThumbnails: images().length > 1
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.item.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="article-body svelte-1idzbo2">${html(data.item.description)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></article>`);
  });
}
export {
  _page as default
};
