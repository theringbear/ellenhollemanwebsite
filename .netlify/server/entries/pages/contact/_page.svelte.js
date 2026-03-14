import { h as head, e as escape_html, s as stringify, b as attr } from "../../../chunks/index.js";
import { C as ContactForm } from "../../../chunks/ContactForm.js";
import { N as NewsletterModal } from "../../../chunks/NewsletterModal.js";
import { S as SEO } from "../../../chunks/SEO.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let showNewsletter = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1bv7ezn", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(data.pageTitles.contact)} — ${escape_html(data.siteName)}</title>`);
        });
      });
      SEO($$renderer3, {
        title: `${stringify(data.pageTitles.contact)} — ${stringify(data.siteName)}`,
        description: "Get in touch with Ellen Holleman for artwork inquiries, collaborations, or commissions."
      });
      $$renderer3.push(`<!----> <div class="container"><section class="contact-section svelte-1bv7ezn"><div class="contact-header svelte-1bv7ezn"><h1 class="page-title svelte-1bv7ezn"><em class="svelte-1bv7ezn">${escape_html(data.pageTitles.contact)}</em></h1> <p class="svelte-1bv7ezn">Have a question about an artwork, want to collaborate, or just want to say hello? Send a message below.</p></div> <div class="contact-body svelte-1bv7ezn">`);
      ContactForm($$renderer3, {});
      $$renderer3.push(`<!----> <div class="contact-aside svelte-1bv7ezn"><div class="info-card svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Contact Info</h3> <a${attr("href", `mailto:${stringify(data.siteSettings?.email || "info@ellenholleman.nl")}`)} class="info-link svelte-1bv7ezn"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ${escape_html(data.siteSettings?.email || "info@ellenholleman.nl")}</a></div> <div class="info-card svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Follow</h3> <div class="social-row svelte-1bv7ezn">`);
      if (data.siteSettings?.social_instagram) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<a${attr("href", data.siteSettings.social_instagram)} target="_blank" rel="noopener" class="svelte-1bv7ezn">Instagram</a>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (data.siteSettings?.social_facebook) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<a${attr("href", data.siteSettings.social_facebook)} target="_blank" rel="noopener" class="svelte-1bv7ezn">Facebook</a>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (data.siteSettings?.social_linkedin) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<a${attr("href", data.siteSettings.social_linkedin)} target="_blank" rel="noopener" class="svelte-1bv7ezn">LinkedIn</a>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div></div> <button class="btn btn-outline newsletter-btn svelte-1bv7ezn"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Join Newsletter</button></div></div></section></div> `);
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
