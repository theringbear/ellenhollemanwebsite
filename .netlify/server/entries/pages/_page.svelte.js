import { h as head, e as escape_html, s as stringify, b as attr, d as derived } from "../../chunks/index.js";
import { C as Carousel } from "../../chunks/Carousel.js";
import { N as NewsletterModal } from "../../chunks/NewsletterModal.js";
import { S as SEO } from "../../chunks/SEO.js";
import { c as assetUrl } from "../../chunks/directus.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let showNewsletter = false;
    let carouselImages = derived(() => data.carouselFileIds?.length > 0 ? data.carouselFileIds.map((id) => assetUrl(id, {
      width: "1600",
      height: "900",
      fit: "cover",
      quality: "85",
      format: "webp"
    })) : data.carouselArtworks.filter((a) => a.images?.length > 0).map((a) => assetUrl(a.images[0].directus_files_id, {
      width: "1600",
      height: "900",
      fit: "cover",
      quality: "85",
      format: "webp"
    })));
    let explorePortfolioImg = derived(() => data.exploreImages.portfolio ? assetUrl(data.exploreImages.portfolio, {
      width: "600",
      height: "600",
      fit: "cover",
      quality: "80",
      format: "webp"
    }) : "");
    let exploreArchiveImg = derived(() => data.exploreImages.archive ? assetUrl(data.exploreImages.archive, {
      width: "600",
      height: "600",
      fit: "cover",
      quality: "80",
      format: "webp"
    }) : "");
    let exploreAboutImg = derived(() => data.exploreImages.about ? assetUrl(data.exploreImages.about, {
      width: "600",
      height: "600",
      fit: "cover",
      quality: "80",
      format: "webp"
    }) : "");
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1uha8ag", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(data.siteName)} — ${escape_html(data.pageTitles.home)}</title>`);
        });
      });
      SEO($$renderer3, {
        title: `${stringify(data.siteName)} — ${stringify(data.pageTitles.home)}`,
        description: data.siteSettings?.description || "Ellen Holleman is a painter, mixed-media visual artist, and spatial designer based in Zaltbommel, Netherlands.",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.siteName,
          url: "https://www.ellenholleman.nl",
          description: data.siteSettings?.description || "Ellen Holleman is a painter, mixed-media visual artist, and spatial designer based in Zaltbommel, Netherlands.",
          author: {
            "@type": "Person",
            name: "Ellen Holleman",
            jobTitle: "Visual Artist"
          }
        }
      });
      $$renderer3.push(`<!----> <section class="hero svelte-1uha8ag">`);
      if (carouselImages().length > 0) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="hero-carousel svelte-1uha8ag">`);
        Carousel($$renderer3, {
          images: carouselImages(),
          alt: "Featured artwork by Ellen Holleman",
          interval: 6e3
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></section> <section class="welcome container svelte-1uha8ag"><h1 class="welcome-title svelte-1uha8ag">Welcome!</h1> <p class="welcome-subtitle svelte-1uha8ag">Explore a curated collection of visual art and creative works</p></section> <section class="explore container svelte-1uha8ag"><div class="explore-grid svelte-1uha8ag"><a href="/portfolio" class="explore-card svelte-1uha8ag">`);
      if (explorePortfolioImg()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<img${attr("src", explorePortfolioImg())} alt="Portfolio" loading="lazy" draggable="false" class="svelte-1uha8ag"/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <div class="explore-overlay svelte-1uha8ag"><h2 class="svelte-1uha8ag">Portfolio</h2></div></a> <a href="/archive" class="explore-card svelte-1uha8ag">`);
      if (exploreArchiveImg()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<img${attr("src", exploreArchiveImg())} alt="Archive" loading="lazy" draggable="false" class="svelte-1uha8ag"/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <div class="explore-overlay svelte-1uha8ag"><h2 class="svelte-1uha8ag">Archive</h2></div></a> <a href="/about" class="explore-card svelte-1uha8ag">`);
      if (exploreAboutImg()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<img${attr("src", exploreAboutImg())} alt="About" loading="lazy" draggable="false" class="svelte-1uha8ag"/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <div class="explore-overlay svelte-1uha8ag"><h2 class="svelte-1uha8ag">About</h2></div></a></div></section> `);
      NewsletterModal($$renderer3, {
        get open() {
          return showNewsletter;
        },
        set open($$value) {
          showNewsletter = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
