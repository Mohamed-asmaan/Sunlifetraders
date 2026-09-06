"use server";

import { getPayload } from "payload";
import config from "@payload-config";

export async function submitLead(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const source = String(formData.get("source") || "proposal").trim();
  const propertyType = String(formData.get("propertyType") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || (!phone && !email)) {
    return { ok: false as const, error: "Please fill in the required fields." };
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "leads",
      data: {
        name,
        phone: phone || undefined,
        email: email || undefined,
        city: city || undefined,
        source,
        propertyType: propertyType || undefined,
        message: message || undefined,
      },
    });
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Something went wrong. Please try again." };
  }
}
