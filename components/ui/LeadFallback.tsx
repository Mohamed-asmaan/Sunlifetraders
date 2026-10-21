import WhatsAppIcon from "@/components/WhatsAppIcon";
import { site } from "@/lib/data";

export default function LeadFallback({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-amber/20 bg-amber-light p-4">
      <p className="text-sm text-ink">
        We couldn&apos;t send your details online. Send them on WhatsApp instead. They&apos;re already filled in.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="ui inline-flex h-12 items-center gap-2 rounded-xl bg-[#25D366] px-4 text-white transition hover:bg-[#1fb858]"
        >
          <WhatsAppIcon size={16} className="text-white" />
          Send on WhatsApp
        </a>
        <a
          href={site.company.phoneHref}
          className="ui inline-flex h-12 items-center rounded-xl border border-line bg-white px-4 text-ink transition hover:border-amber/40"
        >
          Call {site.company.phone}
        </a>
      </div>
    </div>
  );
}
