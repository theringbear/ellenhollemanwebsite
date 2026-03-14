import { h as head, s as stringify, f as attr_style, e as escape_html, d as derived } from "../../../../../chunks/index.js";
import { C as Carousel } from "../../../../../chunks/Carousel.js";
import { C as ContactForm } from "../../../../../chunks/ContactForm.js";
import { S as SEO, h as html } from "../../../../../chunks/SEO.js";
import { c as assetUrl } from "../../../../../chunks/directus.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let images = derived(() => (data.artwork.images || []).map((img) => assetUrl(img.directus_files_id, { width: "1200", quality: "90", format: "webp" })).filter(Boolean));
    let thumbnails = derived(() => (data.artwork.images || []).map((img) => assetUrl(img.directus_files_id, {
      width: "200",
      height: "160",
      fit: "cover",
      quality: "70",
      format: "webp"
    })).filter(Boolean));
    const categoryColors = {
      "paintings": "#c4724a",
      "mixed-media": "#4a9c8c",
      "portraits": "#7b61a5",
      "murals": "#c44a6e"
    };
    let categoryLabel = derived(() => data.artwork.category ? data.artwork.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "");
    let badgeColor = derived(() => categoryColors[data.artwork.category] || "#666");
    let isMural = derived(() => data.artwork.category === "murals");
    let isAvailable = derived(() => data.artwork.availability === "available");
    let isSold = derived(() => data.artwork.availability === "sold");
    let isPrivateCollection = derived(() => data.artwork.availability === "private_collection");
    head("ror2uw", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.artwork.title)} — ${escape_html(data.categoryTitle)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.artwork.title)} — ${stringify(data.categoryTitle)} — ${stringify(data.siteName)}`,
      description: `${stringify(data.artwork.title)}${stringify(data.artwork.materials ? ` — ${data.artwork.materials}` : "")}${stringify(data.artwork.dimensions ? `, ${data.artwork.dimensions}` : "")} by Ellen Holleman.`,
      image: data.artwork.images?.[0]?.directus_files_id ? assetUrl(data.artwork.images[0].directus_files_id, {
        width: "1200",
        height: "630",
        fit: "cover",
        quality: "85",
        format: "webp"
      }) : "",
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        name: data.artwork.title,
        artist: { "@type": "Person", name: "Ellen Holleman" },
        artMedium: data.artwork.materials || void 0,
        artform: data.categoryTitle,
        dateCreated: data.artwork.year || void 0,
        image: data.artwork.images?.[0]?.directus_files_id ? assetUrl(data.artwork.images[0].directus_files_id, { width: "1200", quality: "85" }) : void 0,
        offers: data.artwork.availability === "available" ? {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "EUR"
        } : void 0
      }
    });
    $$renderer2.push(`<!----> <div class="container detail-page svelte-ror2uw"><a href="/portfolio" class="back-btn svelte-ror2uw"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg> Back to Portfolio</a> <section class="artwork-detail svelte-ror2uw"><div class="artwork-gallery svelte-ror2uw">`);
    if (images().length > 0) {
      $$renderer2.push("<!--[0-->");
      Carousel($$renderer2, {
        images: images(),
        thumbnails: thumbnails(),
        alt: data.artwork.title,
        autoplay: false,
        showThumbnails: true
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="artwork-card svelte-ror2uw">`);
    if (categoryLabel()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="category-badge svelte-ror2uw"${attr_style(`background-color: ${stringify(badgeColor())}`)}>${escape_html(categoryLabel())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <h1 class="artwork-title svelte-ror2uw">${escape_html(data.artwork.title)}</h1> `);
    if (!isMural()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="artwork-meta svelte-ror2uw">`);
      if (data.artwork.year) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="meta-item svelte-ror2uw"><span class="meta-label svelte-ror2uw">Year</span> <span class="meta-value svelte-ror2uw">${escape_html(data.artwork.year)}</span></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (data.artwork.materials) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="meta-item svelte-ror2uw"><span class="meta-label svelte-ror2uw">Medium</span> <span class="meta-value svelte-ror2uw">${escape_html(data.artwork.materials)}</span></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (data.artwork.dimensions) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="meta-item svelte-ror2uw"><span class="meta-label svelte-ror2uw">Dimensions</span> <span class="meta-value svelte-ror2uw">${escape_html(data.artwork.dimensions)}</span></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (data.artwork.collection_name) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="meta-item svelte-ror2uw"><span class="meta-label svelte-ror2uw">Collection</span> <span class="meta-value svelte-ror2uw">${escape_html(data.artwork.collection_name)}</span></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.artwork.description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="about-section svelte-ror2uw"><h2 class="about-heading svelte-ror2uw">About This Work</h2> <div class="about-text svelte-ror2uw">${html(data.artwork.description)}</div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.artwork.price) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="price svelte-ror2uw">€${escape_html(data.artwork.price.toLocaleString())}</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!isMural()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="inquire-btn svelte-ror2uw">Inquire About This Work</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (isAvailable()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="availability svelte-ror2uw"><span class="availability-dot svelte-ror2uw"></span> Available for purchase</div>`);
    } else if (isSold()) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="availability sold svelte-ror2uw"><span class="availability-dot sold svelte-ror2uw"></span> Sold</div>`);
    } else if (isPrivateCollection()) {
      $$renderer2.push("<!--[2-->");
      $$renderer2.push(`<div class="availability private svelte-ror2uw"><span class="availability-dot private svelte-ror2uw"></span> Private Collection</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></section></div> <dialog class="inquiry-dialog svelte-ror2uw"><button class="close-btn svelte-ror2uw" aria-label="Close"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> <div class="modal-content svelte-ror2uw"><div class="icon-circle svelte-ror2uw"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div> <h2 class="svelte-ror2uw">Inquire About This Work</h2> `);
    ContactForm($$renderer2, { artworkTitle: data.artwork.title });
    $$renderer2.push(`<!----></div></dialog>`);
  });
}
export {
  _page as default
};
