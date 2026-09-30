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
  integrations: [icon(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  // Pages stay static; only src/pages/api/* runs as a Vercel function.
  adapter: vercel(),
  env: {
    schema: {
      MAILCHIMP_API_KEY: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_AUDIENCE_ID: envField.string({ context: "server", access: "secret" }),
      // Optional: a Telegram alert for each inquiry.
      TELEGRAM_BOT_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      TELEGRAM_CHAT_ID: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
});
