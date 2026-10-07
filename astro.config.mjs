// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://riverius.ai",
  // One URL per page (/contact, not /contact/), matching the internal links.
  trailingSlash: "never",
  // The Academy paths were renamed after the visitor's goal; old links keep working.
  redirects: {
    "/academy/profesional": "/academy/automatizar",
    "/academy/emprendedor": "/academy/vender",
  },
  integrations: [icon(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  // Pages stay static; only src/pages/api/* runs as a Vercel function.
  adapter: vercel(),
  env: {
    schema: {
      MAILCHIMP_API_KEY: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_AUDIENCE_ID: envField.string({ context: "server", access: "secret" }),
      // Optional: a Make.com custom webhook that receives each agency and Equipos inquiry, for lead scoring.
      MAKE_WEBHOOK_URL: envField.string({ context: "server", access: "secret", optional: true }),
      MAKE_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
});
