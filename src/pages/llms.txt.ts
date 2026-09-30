// /llms.txt: a plain-text guide to the site for AI assistants (llmstxt.org).
// Built from the same data as the pages, so it stays in sync.
// Case studies are left out while they are fictional.
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { phases, capabilities } from "../data/services";
import { faq } from "../data/faq";
import { team } from "../data/team";
import { academy, avatars, path, faqHub, faqPro, faqEquipos } from "../data/academy";

export const GET: APIRoute = ({ site: base }) => {
  const url = (p: string) => new URL(p, base).href;
  const qa = (items: { q: string; a: string }[]) => items.map((i) => `- **${i.q}** ${i.a}`).join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} is an AI agency. Riverius AI Academy is its Spanish-language school for professionals, entrepreneurs and teams in Latin America.
Contact: ${site.email} · ${url("/contact")}

## Agency pages

- [Home](${url("/")}): what we do and how we work
- [Services](${url("/services")}): the three phases, Identify, Build and Adopt
- [Team](${url("/team")}): who we are
- [Contact](${url("/contact")}): project inquiries, reply within one business day

## Services

${phases.map((p) => `### ${p.verb}: ${p.headline}\n\n${p.summary} ${p.how}\n\nDuration: ${p.duration}. Deliverables: ${p.deliverables.join("; ")}.`).join("\n\n")}

## What we build

${capabilities.map((c) => `- **${c.title}:** ${c.text}`).join("\n")}

## Team

${team.map((t) => `- **${t.name}**, ${t.role}. ${t.bio[0]}`).join("\n")}

## Agency FAQ

${qa(faq)}

## ${academy.name} (Spanish)

> ${academy.description}

- [Academy home](${url("/academy")})
${avatars.map((a) => `- [${a.title}](${url(a.href)}): ${a.text}`).join("\n")}
- Free community on Skool: ${academy.skool}
- Contact: ${academy.email}

### Program levels

${path.map((l) => `- **${l.level} (${l.weeks}): ${l.title}.** ${l.text}`).join("\n")}

### Academy FAQ

${qa([...faqHub, ...faqPro, ...faqEquipos].filter((i, n, all) => all.findIndex((j) => j.q === i.q) === n))}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
