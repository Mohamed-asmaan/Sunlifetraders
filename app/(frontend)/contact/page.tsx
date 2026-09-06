import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";
import { getContactPage } from "@/lib/cms";
import { contact, seo } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact | ${seo.title}`,
  description: contact.description,
};

export default async function ContactPage() {
  const page = await getContactPage();
  return <ContactView page={page} />;
}
