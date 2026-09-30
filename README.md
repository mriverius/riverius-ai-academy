# Riverius AI

Agency site for Riverius AI. Astro 7 + Tailwind v4, static output, no UI framework on the client.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things live

| What | File |
| --- | --- |
| Brand tokens (color, type, radii, Aurora gradient, bezels, buttons) | `src/styles/global.css` |
| Name, email, nav, CTA, socials | `src/data/site.ts` |
| Services (Identify, Build, Adopt) and capabilities | `src/data/services.ts` |
| FAQ | `src/data/faq.ts` |
| Case studies (one Markdown file each) | `src/content/work/*.md` |
| Hero planet (WebGL shader: spin, ring, moon) | `src/scripts/opal.ts`, `src/components/HeroOpal.astro` |
| Academy (Spanish, own header/footer, Tropical sunrise palette) | `src/pages/academy/`, `src/layouts/Academy.astro`, `src/data/academy.ts` |
| Team members, recognition logos, principles | `src/data/team.ts` |
| Academy success stories and project gallery (Wistia IDs) | `src/data/academy.ts` (`stories`, `projects`) |
| Academy paths: hub + `/academy/profesional`, `/academy/emprendedor`, `/academy/equipos` | `src/pages/academy/`, sections in `src/components/academy/` |
| Motion (smooth scroll, reveals, scrub, stack, horizontal pan, magnetic) | `src/scripts/motion.ts` |
| Placeholder logo | `src/components/Logo.astro` |
| Client logos (fictional) | `src/components/ClientMarks.astro` |

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

- **Academy:** confirm the contact email in `src/data/academy.ts` (Skool, cal.com, WhatsApp, pricing and stats come from mriverius.com).

- **Case studies and clients are fictional.** Replace `src/content/work/*.md` and `ClientMarks.astro`.
- **Logo:** swap the SVG in `Logo.astro` and `public/favicon.svg` for the vector R.
- **Photography:** add `cover: /images/...` to each case (files go in `public/images/`).
- **Form:** set `PUBLIC_FORM_ENDPOINT` (Formspree, Basin, etc.). Without it, the form opens the visitor's email app.
- **Email:** update in `src/data/site.ts`. Form options (role, size, budget) live at the top of `src/pages/contact.astro`.
- **Aaisha:** add her bio, surname and links in `src/data/team.ts`.
