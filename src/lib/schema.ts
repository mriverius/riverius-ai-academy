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

export const organization = (): Thing => ({
  "@type": "Organization",
  "@id": ids.org,
  name: site.name,
  url: url("/"),
  logo: url("/logo.png"),
  description: site.description,
  sameAs: [site.linkedin, ...site.social.map((s) => s.href)],
  founder: [
    { "@type": "Person", name: "Mariano Rivera" },
    { "@type": "Person", name: "Aaisha Ali" },
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

// One <script type="application/ld+json"> with every entity in a single graph.
export const graph = (things: Thing[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": things }).replace(/</g, "\\u003c");
