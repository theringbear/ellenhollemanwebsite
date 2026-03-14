import { r as root } from "./root.js";
import "./environment.js";
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
const options = {
  app_template_contains_nonce: false,
  async: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  service_worker_options: void 0,
  templates: {
    app: ({ head, body, assets, nonce, env }) => '<!doctype html>\r\n<html lang="en">\r\n  <head>\r\n    <meta charset="utf-8" />\r\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\r\n    <link\r\n      rel="apple-touch-icon"\r\n      sizes="180x180"\r\n      href="/favicon/apple-touch-icon.png"\r\n    />\r\n    <link\r\n      rel="icon"\r\n      type="image/png"\r\n      sizes="32x32"\r\n      href="/favicon/favicon-32x32.png"\r\n    />\r\n    <link\r\n      rel="icon"\r\n      type="image/png"\r\n      sizes="16x16"\r\n      href="/favicon/favicon-16x16.png"\r\n    />\r\n    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />\r\n    <link rel="manifest" href="/favicon/site.webmanifest" />\r\n    <link\r\n      rel="mask-icon"\r\n      href="/favicon/safari-pinned-tab.svg"\r\n      color="#333333"\r\n    />\r\n    <meta name="theme-color" content="#ffffff" />\r\n    <script>\r\n      (function () {\r\n        try {\r\n          var saved = localStorage.getItem("theme");\r\n          if (\r\n            saved === "dark" ||\r\n            (!saved &&\r\n              window.matchMedia("(prefers-color-scheme: dark)").matches)\r\n          ) {\r\n            document.documentElement.classList.add("dark");\r\n          }\r\n        } catch (e) {}\r\n      })();\r\n    <\/script>\r\n    ' + head + '\r\n  </head>\r\n  <body data-sveltekit-preload-data="hover">\r\n    <div style="display: contents">' + body + "</div>\r\n  </body>\r\n</html>\r\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "135trh2"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init;
  ({ handle, handleFetch, handleError, handleValidationError, init } = await import("../entries/hooks.server.js"));
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init,
    reroute,
    transport
  };
}
export {
  set_public_env as a,
  set_read_implementation as b,
  set_manifest as c,
  get_hooks as g,
  options as o,
  public_env as p,
  read_implementation as r,
  set_private_env as s
};
