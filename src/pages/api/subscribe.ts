// Receives the site's forms. Each submission is:
// 1. added (or updated) in the Mailchimp audience, tagged by form, with the answers saved in merge fields
//    (so contacts can be filtered and segmented) and the full inquiry saved as a note (so history is kept);
// 2. for agency and Equipos inquiries, sent to a Make.com webhook, where leads are scored and the team is alerted.
// The visitor sees success if either step worked, so an inquiry is never lost to one outage.
import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, MAKE_API_KEY, MAKE_WEBHOOK_URL } from "astro:env/server";

export const prerender = false;

type FormConfig = {
  tag: string;
  email: string;
  name: [string, string]; // first and last name fields
  company?: string;
  labels: Record<string, string>; // other form fields -> label in the note and the alert
  merge: Record<string, string>; // form field -> Mailchimp merge tag (each one must exist in the audience, as Text)
  make?: boolean; // also send to the Make.com webhook
  subscribe?: boolean; // save as subscribed (newsletter); everyone else is transactional, only to reply to them
};

// One entry per form, matched by the hidden "form" field.
const forms: Record<string, FormConfig> = {
  contact: {
    tag: "Agency Inquiry",
    email: "email",
    name: ["first_name", "last_name"],
    company: "company",
    labels: { website: "Website", role: "Role", size: "Company size", budget: "Budget", project: "Project" },
    merge: { website: "WEBSITE", role: "ROLE", size: "COMPSIZE", budget: "BUDGET" },
    make: true,
  },
  equipos: {
    tag: "Academy Teams Inquiry",
    email: "correo",
    name: ["nombre", "apellido"],
    company: "organizacion",
    labels: { sitio: "Sitio web", cargo: "Cargo", tipo: "Tipo de organización", personas: "Personas a capacitar", modalidad: "Modalidad", objetivo: "Objetivo" },
    merge: { sitio: "WEBSITE", cargo: "ROLE", tipo: "ORGTYPE", personas: "TEAMSIZE", modalidad: "MODALITY" },
    make: true,
  },
  newsletter: {
    tag: "Newsletter",
    email: "email",
    name: ["first_name", "last_name"],
    labels: {},
    merge: {},
    subscribe: true,
  },
};

const json = (status: number, body: object) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData().catch(() => null);
  const config = forms[String(data?.get("form"))];
  if (!data || !config) return json(400, { error: "Unknown form" });

  // Honeypot: people never see this field, bots fill it. Pretend it worked.
  if (data.get("company_url")) return json(200, { ok: true });

  const field = (name: string) => String(data.get(name) ?? "").trim().slice(0, 5000);
  const email = field(config.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: "Invalid email" });

  const inquiry = {
    email,
    first: field(config.name[0]),
    last: field(config.name[1]),
    company: config.company ? field(config.company) : "",
    // Merge fields hold at most 255 characters.
    merge: Object.fromEntries(Object.entries(config.merge).map(([name, tag]) => [tag, field(name).slice(0, 255)])),
    // Every answer by form field name (website, budget, personas…), for Make.
    answers: Object.fromEntries(Object.keys(config.labels).map((name) => [name, field(name)])),
    details: Object.entries(config.labels)
      .map(([name, label]) => [label, field(name)])
      .filter(([, v]) => v)
      .map(([label, v]) => `${label}: ${v}`)
      .join("\n"),
  };

  // Mailchimp first, so Make can tell whether the lead was saved there.
  const saved = await saveToMailchimp(config, inquiry).catch((err) => (console.error("Mailchimp request error", err), false));
  const sent = await sendToMake(data.get("form") as string, config, inquiry, saved).catch((err) => (console.error("Make request error", err), false));
  return saved || sent ? json(200, { ok: true }) : json(502, { error: "Could not save" });
};

type Inquiry = {
  email: string;
  first: string;
  last: string;
  company: string;
  merge: Record<string, string>;
  answers: Record<string, string>;
  details: string;
};

async function saveToMailchimp(config: FormConfig, q: Inquiry) {
  const dc = MAILCHIMP_API_KEY.split("-").pop();
  const member = `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${createHash("md5").update(q.email).digest("hex")}`;
  const call = (path: string, method: string, body: object) =>
    fetch(member + path, {
      method,
      headers: { Authorization: `Basic ${btoa(`riverius:${MAILCHIMP_API_KEY}`)}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });

  const filled = (fields: Record<string, string>) => Object.fromEntries(Object.entries(fields).filter(([, v]) => v));
  const base = filled({ FNAME: q.first, LNAME: q.last, COMPANY: q.company });
  const extra = filled(q.merge);
  const upsertWith = async (merge_fields: Record<string, string>) => {
    // Newsletter sign-ups are subscribed; inquiries are transactional, so they never get campaigns.
    const status = config.subscribe ? "subscribed" : "transactional";
    const upsert = { email_address: q.email, status_if_new: status, merge_fields };
    if (!config.subscribe) return call("", "PUT", upsert);
    const res = await call("", "PUT", { ...upsert, status });
    // Mailchimp refuses to resubscribe someone who unsubscribed: keep them unsubscribed, still save the sign-up.
    return res.status === 400 ? call("", "PUT", upsert) : res;
  };

  let res = await upsertWith({ ...base, ...extra });
  // A merge field missing from the audience must not lose the lead: save the contact without the extras (the note keeps them).
  if (res.status === 400 && Object.keys(extra).length) {
    console.error("Mailchimp rejected the extra merge fields, saving without them", await res.text());
    res = await upsertWith(base);
  }
  if (!res.ok) {
    console.error("Mailchimp upsert failed", res.status, await res.text());
    return false;
  }

  // Tags and notes are extras: the contact is already saved, so don't fail the request on them.
  // Notes are capped at 1,000 characters, so a long inquiry becomes several, posted in order.
  const logFailure = async (what: string, res: Response) => res.ok || console.error(`Mailchimp ${what} failed`, res.status, await res.text());
  const saveNotes = async () => {
    for (let i = 0; i < q.details.length; i += 1000) await logFailure("note", await call("/notes", "POST", { note: q.details.slice(i, i + 1000) }));
  };
  const saveTag = async () => logFailure("tag", await call("/tags", "POST", { tags: [{ name: config.tag, status: "active" }] }));
  await Promise.allSettled([saveTag(), saveNotes()]);
  return true;
}

async function sendToMake(form: string, config: FormConfig, q: Inquiry, saved: boolean) {
  // Optional, and only for forms flagged for it.
  if (!MAKE_WEBHOOK_URL || !config.make) return false;
  const res = await fetch(MAKE_WEBHOOK_URL, {
    method: "POST",
    // The webhook only accepts requests carrying its API key.
    headers: { "Content-Type": "application/json", ...(MAKE_API_KEY && { "x-make-apikey": MAKE_API_KEY }) },
    body: JSON.stringify({
      form,
      tag: config.tag,
      submittedAt: new Date().toISOString(),
      email: q.email,
      firstName: q.first,
      lastName: q.last,
      company: q.company,
      savedInMailchimp: saved,
      answers: q.answers,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) console.error("Make webhook failed", res.status, await res.text());
  return res.ok;
}
