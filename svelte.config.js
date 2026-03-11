import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
      $directus: "src/lib/directus",
    },
  },
};

export default config;
