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
      <div className="flex flex-col gap-5 rounded-[24px] border border-amber/20 bg-amber-light p-5 md:flex-row md:items-center md:gap-8 md:p-7">
        {showImage ? (
          <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-[20px] bg-ink md:mx-0 md:h-40 md:w-40">
            <Image
              src="/images/services/subsidy.png"
              alt="Government solar subsidy for homes"
              fill
              className="object-contain p-2"
              sizes="160px"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-amber">{title}</p>
          <p className="copy mt-2 max-w-[68ch] text-ink/80">{body}</p>
        </div>
        <ArrowButton href="/contact" variant="dark" className="shrink-0">
          Click here!
        </ArrowButton>
      </div>
    </Reveal>
  );
}
