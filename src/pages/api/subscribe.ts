// Receives inquiry forms. Each inquiry is:
// 1. added (or updated) in the Mailchimp audience, tagged by form, with the inquiry saved as a note;
// 2. sent to the team as a Telegram alert.
// The visitor sees success if either step worked, so an inquiry is never lost to one outage.
import type { APIRoute } from "astro";
import { createHash } from "node:crypto";
import { MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "astro:env/server";

export const prerender = false;

type FormConfig = {
  tag: string;
  email: string;
  name: [string, string]; // first and last name fields
  company: string;
  labels: Record<string, string>; // other form fields -> label in the note and the alert
  alert: string; // first line of the Telegram alert, so agency and Academy leads are easy to tell apart
};

// One entry per form, matched by the hidden "form" field.
const forms: Record<string, FormConfig> = {
  contact: {
    tag: "Agency inquiry",
    email: "email",
    name: ["first_name", "last_name"],
    company: "company",
    labels: { website: "Website", role: "Role", size: "Company size", budget: "Budget", project: "Project" },
    alert: "🏢 AGENCY INQUIRY · Riverius AI (/contact)",
  },
  equipos: {
    tag: "Cotización equipos",
    email: "correo",
    name: ["nombre", "apellido"],
    company: "organizacion",
    labels: { sitio: "Sitio web", cargo: "Cargo", tipo: "Tipo de organización", personas: "Personas a capacitar", modalidad: "Modalidad", objetivo: "Objetivo" },
    alert: "🎓 ACADEMY INQUIRY · Equipos quote (/academy/equipos)",
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
    company: field(config.company),
    // Only people who tick the box get marketing email; everyone else is stored as transactional.
    optIn: data.get("newsletter") === "yes",
    details: Object.entries(config.labels)
      .map(([name, label]) => [label, field(name)])
      .filter(([, v]) => v)
      .map(([label, v]) => `${label}: ${v}`)
      .join("\n"),
  };

  // Mailchimp first, so the alert can say whether the lead was saved there.
  const saved = await saveToMailchimp(config, inquiry).catch((err) => (console.error("Mailchimp request error", err), false));
  const notified = await notifyTeam(config, inquiry, saved).catch((err) => (console.error("Telegram request error", err), false));
  return saved || notified ? json(200, { ok: true }) : json(502, { error: "Could not save" });
};

type Inquiry = { email: string; first: string; last: string; company: string; optIn: boolean; details: string };

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

  const merge_fields = Object.fromEntries(Object.entries({ FNAME: q.first, LNAME: q.last, COMPANY: q.company }).filter(([, v]) => v));
  const upsert = { email_address: q.email, status_if_new: q.optIn ? "subscribed" : "transactional", merge_fields };
  let res = await call("", "PUT", q.optIn ? { ...upsert, status: "subscribed" } : upsert);
  // Mailchimp refuses to resubscribe someone who unsubscribed; still save the inquiry.
  if (q.optIn && res.status === 400) res = await call("", "PUT", upsert);
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

async function notifyTeam(config: FormConfig, q: Inquiry, saved: boolean) {
  // Optional: without a bot, inquiries only go to Mailchimp.
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  const name = [q.first, q.last].filter(Boolean).join(" ");
  const text = [
    config.alert,
    "",
    `Name: ${name}`,
    `Email: ${q.email}`,
    q.company ? `Company: ${q.company}` : null,
    q.details,
    "",
    `Opted in to marketing email: ${q.optIn ? "yes" : "no"}`,
    saved ? `Saved in Mailchimp, tag: ${config.tag}` : "⚠️ NOT saved in Mailchimp. Add this lead by hand.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Plain text (no parse_mode) so visitors' messages need no escaping. Telegram caps messages at 4,096 characters.
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text.slice(0, 4096), link_preview_options: { is_disabled: true } }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) console.error("Telegram send failed", res.status, await res.text());
  return res.ok;
}
