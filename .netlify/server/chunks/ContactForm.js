import { b as attr, e as escape_html } from "./index.js";
function ContactForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { artworkTitle = "" } = $$props;
    let sending = false;
    $$renderer2.push(`<form class="contact-form svelte-fq8g2m" name="contact" data-netlify="true" netlify-honeypot="bot-field"><input type="hidden" name="form-name" value="contact" class="svelte-fq8g2m"/> <p class="honeypot svelte-fq8g2m" aria-hidden="true"><label class="svelte-fq8g2m">Don't fill this out: <input name="bot-field" class="svelte-fq8g2m"/></label></p> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="form-group svelte-fq8g2m"><label for="from_name" class="svelte-fq8g2m">Name <span class="required svelte-fq8g2m">*</span></label> <input type="text" id="from_name" name="from_name" required="" placeholder="Your name" class="svelte-fq8g2m"/></div> <div class="form-group svelte-fq8g2m"><label for="email" class="svelte-fq8g2m">Email <span class="required svelte-fq8g2m">*</span></label> <input type="email" id="email" name="email" required="" placeholder="your@email.com" class="svelte-fq8g2m"/></div> <div class="form-group svelte-fq8g2m"><label for="phonenumber" class="svelte-fq8g2m">Phone</label> <input type="tel" id="phonenumber" name="phonenumber" placeholder="Your phone number" class="svelte-fq8g2m"/></div> `);
      if (artworkTitle) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<input type="hidden" name="painting"${attr("value", artworkTitle)} class="svelte-fq8g2m"/> <div class="form-group svelte-fq8g2m"><label class="svelte-fq8g2m">Regarding</label> <p class="form-static svelte-fq8g2m">${escape_html(artworkTitle)}</p></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="form-group svelte-fq8g2m"><label for="message" class="svelte-fq8g2m">Message <span class="required svelte-fq8g2m">*</span></label> <textarea id="message" name="message" required="" placeholder="Your message..." rows="5" class="svelte-fq8g2m"></textarea></div> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button type="submit" class="btn btn-primary submit-btn svelte-fq8g2m"${attr("disabled", sending, true)}><span class="btn-text svelte-fq8g2m">${escape_html("Send Message")}</span> `);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<svg class="btn-arrow svelte-fq8g2m" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`);
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></form>`);
  });
}
export {
  ContactForm as C
};
