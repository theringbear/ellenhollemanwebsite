import { h as head, s as stringify, e as escape_html, c as ensure_array_like, d as derived } from "../../../../chunks/index.js";
import { A as ArtworkCard } from "../../../../chunks/ArtworkCard.js";
import { S as SEO } from "../../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let columnCount = 3;
    let columns = derived(() => {
      const cols = Array.from({ length: columnCount }, () => []);
      data.artworks.forEach((item, i) => cols[i % columnCount].push(item));
      return cols;
    });
    head("dvu8re", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.categoryTitle)} — ${escape_html(data.pageTitles.portfolio)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.categoryTitle)} — ${stringify(data.pageTitles.portfolio)} — ${stringify(data.siteName)}`,
      description: `${stringify(data.categoryTitle)} artworks by Ellen Holleman — explore the collection.`
    });
    $$renderer2.push(`<!----> <div class="container"><section class="section"><a href="/portfolio" class="back-btn svelte-dvu8re"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg> Back to Portfolio</a> <h1 class="section-title">${escape_html(data.categoryTitle)}</h1> `);
    if (data.artworks.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="masonry svelte-dvu8re"><!--[-->`);
      const each_array = ensure_array_like(columns());
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let col = each_array[$$index_1];
        $$renderer2.push(`<div class="masonry-col svelte-dvu8re"><!--[-->`);
        const each_array_1 = ensure_array_like(col);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let artwork = each_array_1[$$index];
          ArtworkCard($$renderer2, { artwork });
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-state svelte-dvu8re">No artworks in this category yet.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
