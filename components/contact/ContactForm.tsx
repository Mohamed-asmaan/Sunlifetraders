"use client";

import { FormEvent, useState } from "react";
import { submitLead } from "@/lib/actions";
import { areaClass, fieldClass, submitClass } from "@/components/ui/form";

export default function ContactForm({ propertyTypes }: { propertyTypes: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const result = await submitLead(data);
    if (result.ok) {
      setStatus("sent");
      form.reset();
      return;
    }
    setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-white p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Name</span>
          <input required name="name" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Phone Number</span>
          <input required name="phone" type="tel" className={fieldClass} />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Email</span>
        <input required name="email" type="email" className={fieldClass} />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Select</span>
        <select
          required
          name="propertyType"
          defaultValue={propertyTypes[0]}
          className={fieldClass}
        >
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-2 block font-medium">Message</span>
        <textarea required name="message" rows={5} className={areaClass} />
      </label>
      <button type="submit" disabled={status === "sending"} className={submitClass}>
        {status === "sending" ? "Submitting…" : "Submit"}
      </button>
      {status === "sent" ? (
        <p className="mt-3 text-sm text-ink">Thanks — we’ll get back to you shortly.</p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
