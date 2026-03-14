import { h as head, s as stringify, e as escape_html } from "../../../chunks/index.js";
import { S as SEO, h as html } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("ueqx1a", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.page?.title || "Copyright")} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.page?.title || "Copyright")} — ${stringify(data.siteName)}`,
      description: "Copyright information for Ellen Holleman's artworks and website content.",
      noindex: true
    });
    $$renderer2.push(`<!----> <div class="container"><section class="static-page svelte-ueqx1a"><h1 class="svelte-ueqx1a">${escape_html(data.page?.title || "Copyright")}</h1> `);
    if (data.page?.body) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose">${html(data.page.body)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="prose"><h2>Intellectual Property Rights</h2> <p>All content and materials on this website, including but not limited to text, graphics, logos, images, digital downloads, and data, are the property of Ellen Holleman or its content suppliers and protected by copyright and trademark laws.</p> <p>The compilation of all content on this website is the exclusive property of Ellen Holleman and protected by copyright and trademark laws.</p></div>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
