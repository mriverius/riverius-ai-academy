// /llms.txt: a plain-text guide to the site for AI assistants (llmstxt.org).
// Built from the same data as the pages, so it stays in sync.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { phases, capabilities } from "../data/services";
import { faq } from "../data/faq";
import { team } from "../data/team";
import { OFFER, mentoriaPrice } from "../data/academy-offer";
import { academy, avatars, proClasses, mentoriaPromise, mentoriaSteps, faqHub, faqMentoria, faqEquipos } from "../data/academy";

export const GET: APIRoute = async ({ site: base }) => {
  const url = (p: string) => new URL(p, base).href;
  const cases = (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
  const qa = (items: { q: string; a: string }[]) => items.map((i) => `- **${i.q}** ${i.a}`).join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} is an AI agency. Riverius AI Academy is its Spanish-language school for professionals, entrepreneurs and teams in Latin America.
Contact: ${url("/contact")}

## Agency pages

- [Home](${url("/")}): what we do and how we work
- [Services](${url("/services")}): the three phases, Identify, Build and Adopt
- [Work](${url("/work")}): case studies
- [Team](${url("/team")}): who we are
- [Contact](${url("/contact")}): project inquiries, reply within one business day

## Services

${phases.map((p) => `### ${p.verb}: ${p.headline}\n\n${p.summary} ${p.how}\n\nDuration: ${p.duration}. Deliverables: ${p.deliverables.join("; ")}.`).join("\n\n")}

## What we build

${capabilities.map((c) => `- **${c.title}:** ${c.text}`).join("\n")}

## Case studies

${cases.map((c) => `- [${c.data.client}: ${c.data.title}](${url(`/work/${c.id}`)}): ${c.data.summary} Results: ${c.data.results.map((r) => `${r.value} ${r.label}`).join("; ")}.`).join("\n")}

## Team

${team.map((t) => `- **${t.name}**, ${t.role}. ${t.bio[0]}`).join("\n")}

## Agency FAQ

${qa(faq)}

## ${academy.name} (Spanish)

> ${academy.description}

- [Academy home](${url("/academy")})
${avatars.map((a) => `- [${a.title}](${url(a.href)}): ${a.text}`).join("\n")}
- [Calculadora](${url("/academy/calculadora")}): how many hours and how much money repetitive work costs you each year
- Free community on Skool: ${academy.skool}

### [Mentoría 1:1: your own AI agent](${url("/academy/mentoria")})

${mentoriaPromise} An AI agent for WhatsApp, Telegram, Microsoft Teams or your website, built together in 6 weekly 1:1 sessions, without code. ${mentoriaPrice ? `${mentoriaPrice} USD, one-time` : "Price on request"}.

${mentoriaSteps.map((s) => `- **${s.title}.** ${s.text}`).join("\n")}

Alternative, at your own pace: Premium ($${OFFER.premium.monthly}/month on Skool) with 10+ video lessons, or Standard (free, on Skool).

${proClasses.map((c, i) => `${i + 1}. **${c.title}.** ${c.text}`).join("\n")}

### Academy FAQ

${qa([...faqHub, ...faqMentoria, ...faqEquipos].filter((i, n, all) => all.findIndex((j) => j.q === i.q) === n))}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
