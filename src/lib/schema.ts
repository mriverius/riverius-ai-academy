// schema.org structured data (JSON-LD) shared by the pages.
// It helps search engines and AI assistants understand who we are and quote our answers.
import { site } from "../data/site";
import { academy } from "../data/academy";

type Thing = Record<string, unknown>;
const base = "https://riverius.ai";
const url = (p: string) => new URL(p, base).href;

export const ids = {
  org: url("/#organization"),
  website: url("/#website"),
  academy: url("/academy#organization"),
};

// A stable id per person, so the founders on every page and the full profiles on /team are one entity.
export const personId = (name: string) => url(`/team#${name.toLowerCase().replace(/[^a-z]+/g, "-")}`);

export const organization = (): Thing => ({
  "@type": "Organization",
  "@id": ids.org,
  name: site.name,
  url: url("/"),
  logo: url("/logo.png"),
  description: site.description,
  slogan: site.tagline,
  sameAs: [site.linkedin],
  areaServed: "Worldwide",
  knowsAbout: [
    "AI voice agents",
    "AI agents for business",
    "AI receptionist",
    "WhatsApp AI agents",
    "Knowledge assistants (RAG)",
    "Workflow automation",
    "AI audit",
    "AI readiness assessment",
    "AI roadmap",
    "Custom software development",
    "AI implementation",
  ],
  founder: [
    { "@type": "Person", "@id": personId("Mariano Rivera"), name: "Mariano Rivera" },
    { "@type": "Person", "@id": personId("Aaisha Ali"), name: "Aaisha Ali" },
  ],
});

export const website = (): Thing => ({
  "@type": "WebSite",
  "@id": ids.website,
  name: site.name,
  url: url("/"),
  publisher: { "@id": ids.org },
  inLanguage: ["en", "es"],
});

export const academyOrganization = (): Thing => ({
  "@type": "EducationalOrganization",
  "@id": ids.academy,
  name: academy.name,
  url: url("/academy"),
  logo: url("/logo-academy.png"),
  description: academy.description,
  sameAs: [academy.skool, ...academy.social.map((s) => s.href)],
  parentOrganization: { "@id": ids.org },
});

export const faqPage = (items: { q: string; a: string }[]): Thing => ({
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});

export const person = (p: { name: string; role: string; bio: string[]; links: { href: string }[] }, image: string): Thing => ({
  "@type": "Person",
  "@id": personId(p.name),
  name: p.name,
  jobTitle: p.role,
  image: url(image),
  description: p.bio.join(" "),
  worksFor: { "@id": ids.org },
  ...(p.links.length && { sameAs: p.links.map((l) => l.href) }),
});

export const service = (s: { name: string; description: string; provider?: string; path?: string }): Thing => ({
  "@type": "Service",
  name: s.name,
  description: s.description,
  provider: { "@id": s.provider ?? ids.org },
  ...(s.path && { url: url(s.path) }),
});

export const course = (c: { name: string; description: string; path: string }): Thing => ({
  "@type": "Course",
  name: c.name,
  description: c.description,
  url: url(c.path),
  inLanguage: "es",
  provider: { "@id": ids.academy },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online" },
});

export const caseStudy = (c: { title: string; client: string; summary: string; path: string }): Thing => ({
  "@type": "Article",
  headline: c.title,
  description: c.summary,
  url: url(c.path),
  about: { "@type": "Organization", name: c.client },
  author: { "@id": ids.org },
  publisher: { "@id": ids.org },
});

export const breadcrumbs = (items: { name: string; path: string }[]): Thing => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: url(i.path) })),
});

// One <script type="application/ld+json"> with every entity in a single graph.
export const graph = (things: Thing[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": things }).replace(/</g, "\\u003c");
