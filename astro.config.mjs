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
    "/academy/profesional": { status: 301, destination: "/academy/mentoria" },
    // Automatizar became the Mentoría page (one offer: your own AI agent, 1:1).
    "/academy/automatizar": { status: 301, destination: "/academy/mentoria" },
    "/academy/emprendedor": "/academy/vender",
  },
  // Certificate pages and their directory are shared by link, not found through search: keep them out of the sitemap.
  integrations: [icon(), sitemap({ filter: (page) => !/\/academy\/certificados?(\/|$)/.test(page) })],
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
