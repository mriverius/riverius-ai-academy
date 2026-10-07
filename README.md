# Riverius AI

Agency site for Riverius AI. Astro 7 + Tailwind v4, static pages on Vercel (one serverless function for forms), no UI framework on the client.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things live

| What | File |
| --- | --- |
| Brand tokens (color, type, radii, Aurora gradient, bezels, buttons) | `src/styles/global.css` |
| Name, nav, CTA, socials | `src/data/site.ts` |
| Services (Identify, Build, Adopt) and capabilities | `src/data/services.ts` |
| FAQ | `src/data/faq.ts` |
| Case studies (one Markdown file each) | `src/content/work/*.md` |
| Hero planet (WebGL shader: spin, ring, moon) | `src/scripts/opal.ts`, `src/components/HeroOpal.astro` |
| Academy (Spanish, own header/footer, Tropical sunrise palette) | `src/pages/academy/`, `src/layouts/Academy.astro`, `src/data/academy.ts` |
| Team members, recognition logos, principles | `src/data/team.ts` |
| Academy success stories and project gallery (Wistia IDs) | `src/data/academy.ts` (`stories`, `projects`) |
| Academy paths: hub + `/academy/automatizar`, `/academy/vender`, `/academy/equipos` (old `/profesional` and `/emprendedor` URLs redirect) | `src/pages/academy/`, sections in `src/components/academy/` |
| Motion (smooth scroll, reveals, scrub, stack, horizontal pan, magnetic) | `src/scripts/motion.ts` |
| Placeholder logo | `src/components/Logo.astro` |
| Client marquee (Retreat Sounds is real, the rest are samples) | `src/components/ClientMarks.astro` |
| Images (resized and converted to WebP at build) | `src/assets/` |
| SEO: sitemap (automatic), `robots.txt`, share images, touch icons | `astro.config.mjs`, `public/robots.txt`, `public/og/` |
| AEO: `/llms.txt` (built from the data files), schema.org structured data | `src/pages/llms.txt.ts`, `src/lib/schema.ts` |
| Form endpoint (Mailchimp) | `src/pages/api/subscribe.ts` |

## Themes

The agency is pinned to the dark Cosmos theme and the academy to the light Pearl theme via `<html data-theme>` (set in `src/layouts/Base.astro` and `src/layouts/Academy.astro`). Tokens live at the top of `global.css`.

## Motion

- Smooth scrolling with Lenis, synced to GSAP ScrollTrigger.
- `data-reveal` blur-up entrances, `data-words` word-by-word headlines.
- Manifesto words light up with scroll (`data-scrub`).
- Approach cards stack and recede (`data-stack`).
- Case studies pan sideways on desktop (`data-hpan`); swipe on mobile.
- Everything respects `prefers-reduced-motion`. The orb renders one still frame.

## Before launch

- **Academy:** Skool, cal.com, WhatsApp and stats live in `src/data/academy.ts` (from mriverius.com).

- **Client marquee:** Retreat Sounds is real; the other names in `ClientMarks.astro` are fictional samples. Case studies in `src/content/work/` are real clients.
- **Logo:** swap the SVG in `Logo.astro` and `public/favicon.svg` for the vector R.
- **Photography:** put case photos in `src/assets/work/` and add `cover: ../../assets/work/<file>.jpg` to each case. Images in `src/assets/` are resized and converted to WebP at build time.
- **Forms → Mailchimp:** `/contact`, `/academy/equipos` and `/newsletter` post to `src/pages/api/subscribe.ts`, which adds the person to the Mailchimp audience, tags them by form (`Agency Inquiry`, `Academy Teams Inquiry`, `Newsletter`), fills the merge fields (WEBSITE, ROLE, COMPSIZE, BUDGET, ORGTYPE, TEAMSIZE, MODALITY) and saves the full inquiry as a contact note. Newsletter sign-ups are subscribed; inquiries are stored as transactional, only to reply. Set `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` in `.env` locally (see `.env.example`) and in Vercel's environment variables.
- **Forms → Make.com:** with `MAKE_WEBHOOK_URL` and `MAKE_API_KEY` set, each agency and Equipos inquiry is also sent to a Make custom webhook (key in the `x-make-apikey` header), where leads are scored and the team is alerted. The form reports success if either Mailchimp or Make worked.
- **Email:** there is no public address yet. When hello@ / hola@ exist, add `email` back to `src/data/site.ts` and `src/data/academy.ts` and show it in the footers. Form options (role, size, budget) live at the top of `src/pages/contact.astro`.
- **Aaisha:** add her links (LinkedIn, Instagram…) in `src/data/team.ts`.
