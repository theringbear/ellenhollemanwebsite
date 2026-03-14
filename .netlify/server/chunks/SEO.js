import { h as head, b as attr, d as derived } from "./index.js";
import { p as page } from "./index2.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function SEO($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const SITE_URL = "https://ellenhollemanwebsite.netlify.app";
    let {
      title = "",
      description = "Ellen Holleman is a painter, mixed-media visual artist, and spatial designer based in Zaltbommel, Netherlands.",
      image = "",
      type = "website",
      noindex = false,
      jsonLd = null
    } = $$props;
    let canonicalUrl = derived(() => `${SITE_URL}${page.url.pathname}`);
    let ogImage = derived(() => image || `${SITE_URL}/favicon/android-chrome-384x384.png`);
    head("ojxrft", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="canonical"${attr("href", canonicalUrl())}/> <meta property="og:type"${attr("content", type)}/> <meta property="og:url"${attr("content", canonicalUrl())}/> `);
      if (title) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta property="og:title"${attr("content", title)}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <meta property="og:description"${attr("content", description)}/> <meta property="og:image"${attr("content", ogImage())}/> <meta property="og:site_name" content="Ellen Holleman — Visual Artist"/> <meta property="og:locale" content="en_US"/> <meta name="twitter:card"${attr("content", image ? "summary_large_image" : "summary")}/> `);
      if (title) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="twitter:title"${attr("content", title)}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", ogImage())}/> <meta name="description"${attr("content", description)}/> `);
      if (noindex) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="robots" content="noindex, nofollow"/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (jsonLd) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`${html(`<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`)}`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
  });
}
export {
  SEO as S,
  html as h
};
