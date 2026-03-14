import { h as head, s as stringify, e as escape_html } from "../../../chunks/index.js";
import { S as SEO, h as html } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("f1q66e", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.page?.title || "Privacy Policy")} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.page?.title || "Privacy Policy")} — ${stringify(data.siteName)}`,
      description: "Privacy policy for Ellen Holleman's website.",
      noindex: true
    });
    $$renderer2.push(`<!----> <div class="container"><section class="static-page svelte-f1q66e"><h1 class="svelte-f1q66e">${escape_html(data.page?.title || "Privacy Policy")}</h1> `);
    if (data.page?.body) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose">${html(data.page.body)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="prose"><p>Privacy policy content is managed through the CMS. Please add your privacy policy content in Directus.</p></div>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
