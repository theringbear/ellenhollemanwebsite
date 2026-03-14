import { h as head, s as stringify, e as escape_html } from "../../../chunks/index.js";
import { S as SEO, h as html } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1d73e2x", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.page?.title || "Terms & Conditions")} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.page?.title || "Terms & Conditions")} — ${stringify(data.siteName)}`,
      description: "Terms and conditions for Ellen Holleman's website and artwork sales.",
      noindex: true
    });
    $$renderer2.push(`<!----> <div class="container"><section class="static-page svelte-1d73e2x"><h1 class="svelte-1d73e2x">${escape_html(data.page?.title || "Terms & Conditions")}</h1> `);
    if (data.page?.body) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose">${html(data.page.body)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="prose"><p>Terms and conditions content is managed through the CMS. Please add your terms content in Directus.</p></div>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
