import { h as head, s as stringify, e as escape_html, c as ensure_array_like, a as attr_class, d as derived } from "../../../chunks/index.js";
import { A as ArtworkCard } from "../../../chunks/ArtworkCard.js";
import { S as SEO } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let activeCategory = "all";
    let activeAvailability = "all";
    let columnCount = 3;
    const categories = [
      { slug: "all", title: "All" },
      { slug: "paintings", title: "Paintings" },
      { slug: "mixed-media", title: "Mixed Media" },
      { slug: "murals", title: "Murals" },
      { slug: "portraits", title: "Portraits" }
    ];
    const availabilities = [
      { slug: "all", title: "All Works" },
      { slug: "available", title: "Available" },
      { slug: "private", title: "Private Collection" }
    ];
    function getCategoryCount(slug) {
      if (slug === "all") return data.artworks.length;
      return data.artworks.filter((a) => a.category === slug).length;
    }
    function getAvailabilityCount(slug) {
      if (slug === "all") return data.artworks.length;
      if (slug === "available") return data.artworks.filter((a) => a.availability === "available").length;
      if (slug === "private") return data.artworks.filter((a) => a.availability === "private_collection").length;
      return 0;
    }
    let filteredArtworks = derived(() => {
      let result = data.artworks;
      return result;
    });
    let columns = derived(() => {
      const cols = Array.from({ length: columnCount }, () => []);
      filteredArtworks().forEach((item, i) => cols[i % columnCount].push(item));
      return cols;
    });
    head("1uo84gz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.pageTitles.portfolio)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.pageTitles.portfolio)} — ${stringify(data.siteName)}`,
      description: "Explore the portfolio of Ellen Holleman — paintings, mixed media, portraits, and murals by a Dutch visual artist."
    });
    $$renderer2.push(`<!----> <div class="container"><section class="portfolio-section svelte-1uo84gz"><h1 class="page-title svelte-1uo84gz"><em class="svelte-1uo84gz">${escape_html(data.pageTitles.portfolio)}</em></h1> <p class="page-subtitle svelte-1uo84gz">A curated collection of visual artworks</p> <div class="filter-group svelte-1uo84gz"><span class="filter-label svelte-1uo84gz">Category</span> <div class="filter-pills svelte-1uo84gz"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class("filter-pill svelte-1uo84gz", void 0, { "active": activeCategory === cat.slug })}>${escape_html(cat.title)} (${escape_html(getCategoryCount(cat.slug))})</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="filter-group svelte-1uo84gz"><span class="filter-label svelte-1uo84gz">Availability</span> <div class="filter-pills svelte-1uo84gz"><!--[-->`);
    const each_array_1 = ensure_array_like(availabilities);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let avail = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("filter-pill svelte-1uo84gz", void 0, { "active": activeAvailability === avail.slug })}>${escape_html(avail.title)} `);
      if (getAvailabilityCount(avail.slug) > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`(${escape_html(getAvailabilityCount(avail.slug))})`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (filteredArtworks().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="masonry svelte-1uo84gz"><!--[-->`);
      const each_array_2 = ensure_array_like(columns());
      for (let colIdx = 0, $$length = each_array_2.length; colIdx < $$length; colIdx++) {
        let col = each_array_2[colIdx];
        $$renderer2.push(`<div class="masonry-col svelte-1uo84gz"><!--[-->`);
        const each_array_3 = ensure_array_like(col);
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let artwork = each_array_3[$$index_2];
          ArtworkCard($$renderer2, { artwork });
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-state svelte-1uo84gz">No artworks match the selected filters.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
