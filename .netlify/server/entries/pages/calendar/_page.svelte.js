import { b as attr, e as escape_html, a as attr_class, d as derived, h as head, s as stringify, c as ensure_array_like } from "../../../chunks/index.js";
import { c as assetUrl } from "../../../chunks/directus.js";
import { h as html, S as SEO } from "../../../chunks/SEO.js";
function EventCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { event, upcoming = false, happeningNow = false } = $$props;
    let imageUrl = derived(() => event.image ? assetUrl(event.image, { width: "600", quality: "80", format: "webp" }) : "");
    let formattedDate = derived(() => () => {
      if (!event.date) return "";
      const opts = { month: "long", day: "numeric", year: "numeric" };
      const startStr = new Date(event.date).toLocaleDateString("en-US", opts);
      if (event.end_date && event.end_date !== event.date) {
        const endStr = new Date(event.end_date).toLocaleDateString("en-US", opts);
        return `${startStr} – ${endStr}`;
      }
      return startStr;
    });
    let formattedTime = derived(() => () => {
      const parts = [];
      if (event.start_time) parts.push(event.start_time);
      if (event.end_time) parts.push(event.end_time);
      return parts.join(" – ");
    });
    let eventType = derived(() => event.event_type || event.type || "");
    $$renderer2.push(`<article class="event-card svelte-14fxf3u"><div class="event-media svelte-14fxf3u">`);
    if (event.video) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="event-video svelte-14fxf3u">${html(event.video)}</div>`);
    } else if (imageUrl()) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<img${attr("src", imageUrl())}${attr("alt", event.title)} loading="lazy" draggable="false" class="svelte-14fxf3u"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="event-badges svelte-14fxf3u">`);
    if (eventType()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="badge badge-type svelte-14fxf3u">${escape_html(eventType())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (happeningNow) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="badge badge-happening svelte-14fxf3u">Happening Currently</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<span${attr_class("badge svelte-14fxf3u", void 0, { "badge-upcoming": upcoming, "badge-past": !upcoming })}>${escape_html(upcoming ? "Upcoming" : "Past")}</span>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="event-info svelte-14fxf3u"><h3 class="event-title svelte-14fxf3u">${escape_html(event.title)}</h3> <div class="event-meta svelte-14fxf3u">`);
    if (event.location) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="event-detail svelte-14fxf3u"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="svelte-14fxf3u"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${escape_html(event.location)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (formattedDate()()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="event-detail svelte-14fxf3u"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="svelte-14fxf3u"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${escape_html(formattedDate()())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (formattedTime()()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="event-detail svelte-14fxf3u"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="svelte-14fxf3u"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${escape_html(formattedTime()())}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (event.info) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="event-text svelte-14fxf3u">${escape_html(event.info)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (event.link) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", event.link)} target="_blank" rel="noopener" class="event-btn svelte-14fxf3u">${escape_html(event.link_text || "Learn More")}</a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></article>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let activeFilter = "all";
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    function isHappening(event) {
      if (!event.date) return false;
      const start = new Date(event.date);
      start.setHours(0, 0, 0, 0);
      const end = event.end_date ? new Date(event.end_date) : new Date(event.date);
      end.setHours(23, 59, 59, 999);
      return today >= start && today <= end;
    }
    function isUpcoming(event) {
      if (!event.date) return false;
      if (isHappening(event)) return false;
      const start = new Date(event.date);
      return start > today;
    }
    function isPast(event) {
      if (!event.date) return false;
      const end = event.end_date ? new Date(event.end_date) : new Date(event.date);
      end.setHours(23, 59, 59, 999);
      return end < today;
    }
    function sortDate(event) {
      return new Date(event.end_date || event.date);
    }
    let sortedEvents = derived(() => [...data.events].sort((a, b) => sortDate(b) - sortDate(a)));
    let happeningCount = derived(() => sortedEvents().filter((e) => isHappening(e)).length);
    let upcomingCount = derived(() => sortedEvents().filter((e) => isUpcoming(e)).length);
    let pastCount = derived(() => sortedEvents().filter((e) => isPast(e)).length);
    let filteredEvents = derived(() => {
      return sortedEvents();
    });
    head("13luymz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.pageTitles.calendar)} — ${escape_html(data.siteName)}</title>`);
      });
    });
    SEO($$renderer2, {
      title: `${stringify(data.pageTitles.calendar)} — ${stringify(data.siteName)}`,
      description: "Upcoming and past exhibitions, open studios, and events by Ellen Holleman, visual artist."
    });
    $$renderer2.push(`<!----> <div class="container"><section class="calendar-section svelte-13luymz"><h1 class="page-title svelte-13luymz">${escape_html(data.pageTitles.calendar)}</h1> <p class="page-subtitle svelte-13luymz">Upcoming shows and past exhibitions</p> <div class="filter-pills svelte-13luymz"><button${attr_class("filter-pill svelte-13luymz", void 0, { "active": activeFilter === "all" })}>All Events (${escape_html(sortedEvents().length)})</button> `);
    if (happeningCount() > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button${attr_class("filter-pill happening svelte-13luymz", void 0, { "active": activeFilter === "happening" })}>Happening Currently (${escape_html(happeningCount())})</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button${attr_class("filter-pill svelte-13luymz", void 0, { "active": activeFilter === "upcoming" })}>Upcoming (${escape_html(upcomingCount())})</button> <button${attr_class("filter-pill svelte-13luymz", void 0, { "active": activeFilter === "past" })}>Past (${escape_html(pastCount())})</button></div> `);
    if (filteredEvents().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="events-list svelte-13luymz"><!--[-->`);
      const each_array = ensure_array_like(filteredEvents());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let event = each_array[$$index];
        EventCard($$renderer2, {
          event,
          upcoming: isUpcoming(event),
          happeningNow: isHappening(event)
        });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-state svelte-13luymz">No events to show. Check back soon!</p>`);
    }
    $$renderer2.push(`<!--]--></section></div>`);
  });
}
export {
  _page as default
};
