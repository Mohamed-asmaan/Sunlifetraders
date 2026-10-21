"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { site } from "./data";

const LEAD_TIMEOUT_MS = 6000;

type LeadResult = { ok: boolean; error?: string; whatsappUrl: string };

function withTimeout<T>(promise: Promise<T>) {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), LEAD_TIMEOUT_MS)),
  ]);
}

function whatsappLink(lines: string[]) {
  const base = site.company.whatsappHref.split("?")[0];
  return `${base}?text=${encodeURIComponent(lines.join("\n"))}`;
}

async function saveToPayload(data: Record<string, string | undefined>) {
  try {
    const payload = await withTimeout(getPayload({ config }));
    await withTimeout(
      payload.create({
        collection: "leads",
        data: {
          name: data.name!,
          phone: data.phone,
          email: data.email,
          city: data.city,
          source: data.source,
          propertyType: data.propertyType,
          message: data.message,
        },
      }),
    );
    return true;
  } catch {
    return false;
  }
}

async function sendEmail(subject: string, lines: string[], replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const to = (process.env.LEAD_EMAIL_TO || `${site.company.consultEmail},${site.company.email}`)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  try {
    const res = await withTimeout(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM || "Sunlife Website <onboarding@resend.dev>",
          to,
          subject,
          text: lines.join("\n"),
          reply_to: replyTo || undefined,
        }),
      }),
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitLead(formData: FormData): Promise<LeadResult> {
  const field = (key: string) => String(formData.get(key) || "").trim();
  const data = {
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    city: field("city"),
    source: field("source") || "proposal",
    propertyType: field("propertyType"),
    message: field("message"),
  };

  const lines = [
    `New ${data.source} enquiry from the website`,
    `Name: ${data.name}`,
    data.phone && `Phone: ${data.phone}`,
    data.email && `Email: ${data.email}`,
    data.city && `City / pincode: ${data.city}`,
    data.propertyType && `Type: ${data.propertyType}`,
    data.message && `Details: ${data.message}`,
  ].filter(Boolean) as string[];

  const whatsappUrl = whatsappLink(lines.map((line, i) => (i === 0 ? "Hi Sunlife, I'd like a solar proposal." : line)));

  if (!data.name || (!data.phone && !data.email)) {
    return { ok: false, error: "Please fill in the required fields.", whatsappUrl };
  }

  const clean = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v || undefined]));
  const [saved, emailed] = await Promise.all([
    saveToPayload(clean),
    sendEmail(`Website enquiry: ${data.name} (${data.source})`, lines, data.email),
  ]);

  return saved || emailed
    ? { ok: true, whatsappUrl }
    : { ok: false, error: "We couldn't send your details online.", whatsappUrl };
}
