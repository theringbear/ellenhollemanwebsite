import { b as attr, e as escape_html, g as bind_props } from "./index.js";
function NewsletterModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onclose = () => {
    } } = $$props;
    let sending = false;
    $$renderer2.push(`<dialog class="newsletter-modal svelte-m2qpe8"><button class="close-btn svelte-m2qpe8" aria-label="Close"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button> <div class="modal-content svelte-m2qpe8">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="icon-circle svelte-m2qpe8"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="22,4 12,13 2,4"></polyline></svg></div> <h2 class="svelte-m2qpe8">Stay Connected</h2> <p class="svelte-m2qpe8">Subscribe to receive updates about new artworks and exhibitions</p> <form class="svelte-m2qpe8"><input type="hidden" name="a" value="ga0yzre3ec" class="svelte-m2qpe8"/> <input type="hidden" name="l" value="jgyzi3xu6m" class="svelte-m2qpe8"/> <div class="form-row svelte-m2qpe8"><input type="text" name="NV65W9GTx7" placeholder="First name" class="svelte-m2qpe8"/> <input type="text" name="1rgfyQeYt2" placeholder="Surname" class="svelte-m2qpe8"/></div> <input type="email" name="wg5PV9slKN" placeholder="Enter your email address" required="" class="svelte-m2qpe8"/> <input autocomplete="new-password" type="email" name="email" style="position:absolute;top:-9999px;left:-9999px;" tabindex="-1" class="svelte-m2qpe8"/> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button type="submit" class="subscribe-btn svelte-m2qpe8"${attr("disabled", sending, true)}>${escape_html("Subscribe to Newsletter")}</button></form> <p class="disclaimer svelte-m2qpe8">Unsubscribe anytime. No spam, just art.</p>`);
    }
    $$renderer2.push(`<!--]--></div></dialog>`);
    bind_props($$props, { open });
  });
}
export {
  NewsletterModal as N
};
