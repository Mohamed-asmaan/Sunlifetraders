import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export default function SurveyCta({
  title = "Lock in your numbers with a free site survey",
  body = "Share your WhatsApp number and pincode. A senior engineer will send a full proposal — system size, subsidy, EMI and install timeline — within 2 working hours.",
  primaryHref = "/contact",
  primaryLabel = "Get a free proposal",
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[32px] bg-ink p-6 text-white md:p-10">
        <Image
          src="/images/ui/cta-sunburst.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-45"
          sizes="1280px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/35" />
        <div className="relative max-w-[62ch]">
          <h2 className="display-kicker text-white">{title}</h2>
          <p className="copy mt-2 text-white/75">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ArrowButton href={primaryHref} variant="light">
              {primaryLabel}
            </ArrowButton>
            <WhatsAppButton variant="onDark" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
