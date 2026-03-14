import { h as head, s as stringify, e as escape_html, c as ensure_array_like, a as attr_class, d as derived } from "../../../chunks/index.js";
import { A as ArchiveCard } from "../../../chunks/ArchiveCard.js";
import { S as SEO } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let activeCategory = "all";
    const categories = [
      { slug: "all", title: "All Articles" },
      { slug: "cultural-productions", title: "Cultural Productions" },
      { slug: "urban-activism", title: "Urban Activism" },
      { slug: "spatial-design", title: "Spatial Design" },
      { slug: "specials", title: "Specials" }
    ];
    function getCategoryCount(slug) {
      if (slug === "all") return data.items.length;
      return data.items.filter((i) => i.category === slug).length;
    }
    let filteredItems = derived(
      () => data.items
    );
    head("1d6nxft", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.pageTitles.archive)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.pageTitles.archive)} — ${stringify(data.siteName)}`,
      description: "Browse the archive of Ellen Holleman — cultural productions, urban activism, spatial design, and special projects."
    });
    $$renderer2.push(`<!----> <div class="container"><section class="archive-section svelte-1d6nxft"><h1 class="page-title svelte-1d6nxft"><em class="svelte-1d6nxft">${escape_html(data.pageTitles.archive)}</em></h1> <p class="page-subtitle svelte-1d6nxft">Articles and writings on art, culture, and design</p> <div class="filter-pills svelte-1d6nxft"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class("filter-pill svelte-1d6nxft", void 0, { "active": activeCategory === cat.slug })}>${escape_html(cat.title)} (${escape_html(getCategoryCount(cat.slug))})</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredItems().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="archive-grid svelte-1d6nxft"><!--[-->`);
      const each_array_1 = ensure_array_like(filteredItems());
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        ArchiveCard($$renderer2, { item });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-state svelte-1d6nxft">No articles in this category yet.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
