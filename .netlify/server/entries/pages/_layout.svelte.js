import { h as head, a as attr_class, b as attr, e as escape_html, s as stringify } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, data } = $$props;
    let navOpen = false;
    let scrolled = false;
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>`);
    });
    $$renderer2.push(`<div class="app svelte-12qhfyh"><header${attr_class("header svelte-12qhfyh", void 0, { "scrolled": scrolled })}><div class="header-inner container svelte-12qhfyh"><a href="/" class="logo svelte-12qhfyh"><span class="logo-name svelte-12qhfyh">Ellen Holleman</span> <span class="logo-subtitle svelte-12qhfyh">visual artist</span></a> <nav class="nav svelte-12qhfyh"><ul class="nav-list svelte-12qhfyh"><li class="nav-item svelte-12qhfyh"><a href="/portfolio"${attr_class("svelte-12qhfyh", void 0, {
      "active": page.url.pathname.startsWith("/portfolio") || page.url.pathname.startsWith("/available")
    })}>Portfolio</a></li> <li class="nav-item svelte-12qhfyh"><a href="/archive"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/archive") })}>Archive</a></li> <li class="nav-item svelte-12qhfyh"><a href="/about"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/about") })}>My story</a></li> <li class="nav-item svelte-12qhfyh"><a href="/calendar"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/calendar") })}>Calendar</a></li> <li class="nav-item svelte-12qhfyh"><a href="/contact"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/contact") })}>Contact</a></li></ul> <button class="dark-mode-toggle svelte-12qhfyh" aria-label="Toggle dark mode">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button></nav></div></header> <button${attr_class("menu-toggle svelte-12qhfyh", void 0, { "active": navOpen })} aria-label="Toggle menu"${attr("aria-expanded", navOpen)}><span class="bar svelte-12qhfyh"></span> <span class="bar svelte-12qhfyh"></span> <span class="bar svelte-12qhfyh"></span></button> <div${attr_class("mobile-overlay svelte-12qhfyh", void 0, { "open": navOpen })}${attr("aria-hidden", !navOpen)}><div class="mobile-overlay-top svelte-12qhfyh"><a href="/" class="logo svelte-12qhfyh"><span class="logo-name svelte-12qhfyh">Ellen Holleman</span> <span class="logo-subtitle svelte-12qhfyh">visual artist</span></a> <button class="mobile-close svelte-12qhfyh" aria-label="Close menu"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Close</button></div> <nav class="mobile-nav svelte-12qhfyh" aria-label="Main navigation"><ul class="mobile-nav-list svelte-12qhfyh"><li class="mobile-nav-item svelte-12qhfyh"><a href="/portfolio"${attr_class("svelte-12qhfyh", void 0, {
      "active": page.url.pathname.startsWith("/portfolio") || page.url.pathname.startsWith("/available")
    })}>Portfolio</a></li> <li class="mobile-nav-item svelte-12qhfyh"><a href="/archive"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/archive") })}>Archive</a></li> <li class="mobile-nav-item svelte-12qhfyh"><a href="/about"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/about") })}>My story</a></li> <li class="mobile-nav-item svelte-12qhfyh"><a href="/calendar"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/calendar") })}>Calendar</a></li> <li class="mobile-nav-item svelte-12qhfyh"><a href="/contact"${attr_class("svelte-12qhfyh", void 0, { "active": page.url.pathname.startsWith("/contact") })}>Contact</a></li></ul></nav> <div class="mobile-overlay-footer svelte-12qhfyh"><button class="dark-mode-toggle-overlay svelte-12qhfyh" aria-label="Toggle dark mode">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--> <span>${escape_html("Dark mode")}</span></button></div></div> <main class="page-content" style="padding-top: 90px;">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="footer svelte-12qhfyh"><div class="footer-inner container"><div class="footer-brand svelte-12qhfyh"><a href="/" class="logo svelte-12qhfyh"><span class="logo-name svelte-12qhfyh">Ellen Holleman</span> <span class="logo-subtitle svelte-12qhfyh">visual artist</span></a></div> <div class="footer-grid svelte-12qhfyh"><div class="footer-col svelte-12qhfyh"><h4 class="svelte-12qhfyh">Explore</h4> <ul class="svelte-12qhfyh"><li class="svelte-12qhfyh"><a href="/portfolio" class="svelte-12qhfyh">Portfolio</a></li> <li class="svelte-12qhfyh"><a href="/archive" class="svelte-12qhfyh">Archive</a></li> <li class="svelte-12qhfyh"><a href="/about" class="svelte-12qhfyh">About</a></li> <li class="svelte-12qhfyh"><a href="/calendar" class="svelte-12qhfyh">Calendar</a></li></ul></div> <div class="footer-col svelte-12qhfyh"><h4 class="svelte-12qhfyh">Information</h4> <ul class="svelte-12qhfyh"><li class="svelte-12qhfyh"><a href="/terms-and-conditions" class="svelte-12qhfyh">Terms &amp; Conditions</a></li> <li class="svelte-12qhfyh"><a href="/privacy-policy" class="svelte-12qhfyh">Privacy Policy</a></li> <li class="svelte-12qhfyh"><a href="/copyright" class="svelte-12qhfyh">Copyright</a></li></ul></div> <div class="footer-col svelte-12qhfyh"><h4 class="svelte-12qhfyh">Connect</h4> <ul class="svelte-12qhfyh"><li class="svelte-12qhfyh"><a${attr("href", `mailto:${stringify(data.siteSettings?.email || "info@ellenholleman.nl")}`)} class="svelte-12qhfyh">${escape_html(data.siteSettings?.email || "info@ellenholleman.nl")}</a></li></ul> <div class="social-links svelte-12qhfyh">`);
    if (data.siteSettings?.social_facebook) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", data.siteSettings.social_facebook)} target="_blank" rel="noopener" aria-label="Facebook" class="svelte-12qhfyh"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.siteSettings?.social_instagram) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", data.siteSettings.social_instagram)} target="_blank" rel="noopener" aria-label="Instagram" class="svelte-12qhfyh"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.siteSettings?.social_linkedin) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", data.siteSettings.social_linkedin)} target="_blank" rel="noopener" aria-label="LinkedIn" class="svelte-12qhfyh"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="footer-bottom svelte-12qhfyh"><p>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Ellen Holleman Visual Artist. All rights reserved.</p> <a href="https://ferismarketing.com/" target="_blank" rel="noopener" class="svelte-12qhfyh">Made by Feris</a></div></div></footer></div>`);
  });
}
export {
  _layout as default
};
