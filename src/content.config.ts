import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string(),
      country: z.string().optional(),
      summary: z.string(),
      // One pastel per case, used for its cover light.
      tone: z.enum(["morpho", "guaria", "pitahaya", "mango", "jade"]),
      results: z.array(z.object({ value: z.string(), label: z.string() })).min(1).max(3),
      // `short` is the excerpt for the home page; the case page shows the full text.
      quote: z.object({ text: z.string(), short: z.string().optional(), name: z.string(), role: z.string() }).optional(),
      // Video testimonial (YouTube, click to play). The poster is a local image.
      video: z.object({ youtube: z.string(), poster: image(), name: z.string(), role: z.string() }).optional(),
      // Path relative to the Markdown file, e.g. ../../assets/work/ceibo.jpg
      cover: image().optional(),
      // "contain" for a transparent mockup (e.g. phones) shown whole on the pastel light;
      // "logo" for a square client logo shown as a tile on that light.
      coverFit: z.enum(["cover", "contain", "logo"]).default("cover"),
      // Optional links shown under the results, e.g. the live site or the App Store listing.
      links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
      order: z.number().default(0),
    }),
});

export const collections = { work };
