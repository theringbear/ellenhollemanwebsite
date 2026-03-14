import { b as attr, c as ensure_array_like, a as attr_class, s as stringify } from "./index.js";
function Carousel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      images = [],
      thumbnails = [],
      alt = "",
      autoplay = true,
      interval = 5e3,
      showThumbnails = false
    } = $$props;
    let current = 0;
    if (
      // Scroll active thumbnail into view
      images.length === 1
    ) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="carousel-wrapper svelte-8ojyxu"><div class="carousel single svelte-8ojyxu" role="region" aria-label="Image"><div class="single-image svelte-8ojyxu"><img${attr("src", images[0])}${attr("alt", `${stringify(alt)} - Image 1`)} loading="eager" draggable="false" class="svelte-8ojyxu"/></div></div></div>`);
    } else if (images.length > 1) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="carousel-wrapper svelte-8ojyxu"><div class="carousel svelte-8ojyxu" role="region" aria-label="Image carousel"><div class="carousel-viewport svelte-8ojyxu"><!--[-->`);
      const each_array = ensure_array_like(images);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let src = each_array[i];
        $$renderer2.push(`<div${attr_class("slide svelte-8ojyxu", void 0, { "active": i === current })}><img${attr("src", src)}${attr("alt", `${stringify(alt)} - Image ${stringify(i + 1)}`)}${attr("loading", i === 0 ? "eager" : "lazy")} draggable="false" class="svelte-8ojyxu"/></div>`);
      }
      $$renderer2.push(`<!--]--></div> <button class="carousel-btn prev svelte-8ojyxu" aria-label="Previous image"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-8ojyxu"><polyline points="15 18 9 12 15 6"></polyline></svg></button> <button class="carousel-btn next svelte-8ojyxu" aria-label="Next image"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-8ojyxu"><polyline points="9 18 15 12 9 6"></polyline></svg></button> <div class="carousel-dots svelte-8ojyxu"><!--[-->`);
      const each_array_1 = ensure_array_like(images);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        each_array_1[i];
        $$renderer2.push(`<button${attr_class("dot svelte-8ojyxu", void 0, { "active": i === current })}${attr("aria-label", `Go to slide ${stringify(i + 1)}`)}></button>`);
      }
      $$renderer2.push(`<!--]--></div></div> `);
      if (showThumbnails && thumbnails.length > 1) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="carousel-thumbnails svelte-8ojyxu"><!--[-->`);
        const each_array_2 = ensure_array_like(thumbnails);
        for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
          let thumb = each_array_2[i];
          $$renderer2.push(`<button${attr_class("thumbnail svelte-8ojyxu", void 0, { "active": i === current })}${attr("aria-label", `View image ${stringify(i + 1)}`)}><img${attr("src", thumb)}${attr("alt", `${stringify(alt)} - Thumbnail ${stringify(i + 1)}`)} draggable="false" class="svelte-8ojyxu"/></button>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  Carousel as C
};
