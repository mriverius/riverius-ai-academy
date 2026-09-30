import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    country: z.string(),
    summary: z.string(),
    // One pastel per case, used for its cover light.
    tone: z.enum(["morpho", "guaria", "pitahaya", "mango", "jade"]),
    results: z.array(z.object({ value: z.string(), label: z.string() })).min(1).max(3),
    quote: z.object({ text: z.string(), name: z.string(), role: z.string() }).optional(),
    cover: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { work };
