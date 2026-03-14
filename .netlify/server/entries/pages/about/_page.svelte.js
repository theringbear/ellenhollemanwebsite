import { h as head, s as stringify, e as escape_html, b as attr, d as derived } from "../../../chunks/index.js";
import { C as Carousel } from "../../../chunks/Carousel.js";
import { S as SEO, h as html } from "../../../chunks/SEO.js";
import { c as assetUrl } from "../../../chunks/directus.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let aboutImages = derived(() => [
      data.about?.image1,
      data.about?.image2,
      data.about?.image3,
      data.about?.image4
    ].filter(Boolean).map((img) => assetUrl(img, { width: "1400", quality: "85", format: "webp" })));
    let heroImage = derived(() => data.about?.image1 ? assetUrl(data.about.image1, { width: "1400", quality: "85", format: "webp" }) : "");
    let cvUrl = derived(() => data.about?.cv_file ? assetUrl(data.about.cv_file) : "");
    head("cwls5q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.pageTitles.about)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.pageTitles.about)} — ${stringify(data.siteName)}`,
      description: "Learn about Ellen Holleman, a Dutch painter, mixed-media artist, and spatial designer based in Zaltbommel, Netherlands.",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ellen Holleman",
        jobTitle: "Visual Artist",
        url: "https://www.ellenholleman.nl/about",
        sameAs: [
          data.siteSettings?.social_instagram || "",
          data.siteSettings?.social_facebook || "",
          data.siteSettings?.social_linkedin || ""
        ].filter(Boolean)
      }
    });
    $$renderer2.push(`<!----> <div class="container"><section class="about-section svelte-cwls5q"><h1 class="page-title svelte-cwls5q"><em class="svelte-cwls5q">${escape_html(data.pageTitles.about)}</em></h1> <p class="page-subtitle svelte-cwls5q">${escape_html(data.about?.title || "Visual artist based in the Netherlands")}</p> `);
    if (aboutImages().length > 1) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="about-hero-image svelte-cwls5q">`);
      Carousel($$renderer2, { images: aboutImages(), alt: "Ellen Holleman", interval: 6e3 });
      $$renderer2.push(`<!----></div>`);
    } else if (heroImage()) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="about-hero-image svelte-cwls5q"><img${attr("src", heroImage())} alt="Ellen Holleman" loading="eager" draggable="false" class="svelte-cwls5q"/></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="about-columns svelte-cwls5q"><div class="about-col svelte-cwls5q"><h2 class="svelte-cwls5q">My story</h2> `);
    if (data.about?.body) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose">${html(data.about.body)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="placeholder-text svelte-cwls5q">Ellen Holleman is a contemporary visual artist whose work explores the intersection of color, form, and emotion. Based in the Netherlands, she has been creating compelling visual narratives for over a decade.</p>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="about-col svelte-cwls5q"><h2 class="svelte-cwls5q">Artist Statement</h2> `);
    if (data.about?.artist_statement) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="prose">${html(data.about.artist_statement)}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="placeholder-text svelte-cwls5q">"Art is a conversation between the conscious and unconscious mind. Each painting is an attempt to capture fleeting moments of clarity and translate them into visual language."</p>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (cvUrl()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="cv-section svelte-cwls5q"><a${attr("href", cvUrl())} target="_blank" rel="noopener" class="cv-link svelte-cwls5q"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Download CV</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
