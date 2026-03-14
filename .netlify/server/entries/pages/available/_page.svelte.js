import { h as head, s as stringify, e as escape_html, c as ensure_array_like, d as derived } from "../../../chunks/index.js";
import { A as ArtworkCard } from "../../../chunks/ArtworkCard.js";
import { S as SEO } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let columnCount = 3;
    let columns = derived(() => {
      const cols = Array.from({ length: columnCount }, () => []);
      data.artworks.forEach((item, i) => cols[i % columnCount].push(item));
      return cols;
    });
    head("1yb49kk", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.pageTitles.available)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.pageTitles.available)} — ${stringify(data.siteName)}`,
      description: "Browse available artworks by Ellen Holleman — paintings, mixed media, and more, ready for purchase."
    });
    $$renderer2.push(`<!----> <div class="container"><section class="section"><h1 class="section-title">${escape_html(data.pageTitles.available)}</h1> `);
    if (data.artworks.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="masonry svelte-1yb49kk"><!--[-->`);
      const each_array = ensure_array_like(columns());
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let col = each_array[$$index_1];
        $$renderer2.push(`<div class="masonry-col svelte-1yb49kk"><!--[-->`);
        const each_array_1 = ensure_array_like(col);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let artwork = each_array_1[$$index];
          ArtworkCard($$renderer2, { artwork, showPrice: true });
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-state svelte-1yb49kk">No works currently available. Please check back or <a href="/contact" class="svelte-1yb49kk">get in touch</a> for inquiries.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
