import Image from "next/image";
import ArrowButton from "@/components/ArrowButton";
import { Reveal } from "@/components/motion/Reveal";

export default function SubsidyHook({
  title,
  body,
  showImage = false,
}: {
  title: string;
  body: string;
  showImage?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={`grid overflow-hidden rounded-[28px] border border-amber/20 bg-amber-light ${
          showImage ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" : ""
        }`}
      >
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="eyebrow text-amber">PM Surya Ghar · Save up to ₹78,000</p>
          <h2 className="display-card mt-3 max-w-[24ch] text-ink">{title}</h2>
          <p className="copy mt-3 max-w-[56ch] text-ink/70">{body}</p>
          <ArrowButton href="/contact" variant="dark" className="mt-6 self-start">
            Check my eligibility
          </ArrowButton>
        </div>
        {showImage ? (
          <div className="relative min-h-[220px] self-stretch md:min-h-[320px]">
            <Image
              src="/images/services/subsidy.png"
              alt="Government solar subsidy for homes"
              fill
              className="origin-bottom-right scale-[1.12] object-contain object-right-bottom drop-shadow-[0_24px_30px_rgba(17,17,17,0.18)]"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
