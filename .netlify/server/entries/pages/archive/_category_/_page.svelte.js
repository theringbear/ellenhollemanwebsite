import { h as head, s as stringify, e as escape_html, c as ensure_array_like } from "../../../../chunks/index.js";
import { A as ArchiveCard } from "../../../../chunks/ArchiveCard.js";
import { S as SEO } from "../../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1ujy7i4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.categoryTitle)} — ${escape_html(data.pageTitles.archive)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.categoryTitle)} — ${stringify(data.pageTitles.archive)} — ${stringify(data.siteName)}`,
      description: `${stringify(data.categoryTitle)} — archive projects by Ellen Holleman.`
    });
    $$renderer2.push(`<!----> <div class="container"><section class="section"><a href="/archive" class="back-btn svelte-1ujy7i4"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg> Back to Archive</a> <h1 class="section-title">${escape_html(data.categoryTitle)}</h1> `);
    if (data.items.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="archive-grid svelte-1ujy7i4"><!--[-->`);
      const each_array = ensure_array_like(data.items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        ArchiveCard($$renderer2, { item });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-state svelte-1ujy7i4">No items in this category yet.</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
