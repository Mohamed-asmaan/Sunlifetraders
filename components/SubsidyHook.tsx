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
        className={`grid items-center gap-5 overflow-hidden rounded-[24px] border border-amber/20 bg-amber-light p-5 md:gap-8 md:p-7 ${
          showImage ? "md:grid-cols-2" : ""
        }`}
      >
        {showImage ? (
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/images/services/subsidy.png"
              alt="Government solar subsidy for homes"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-col gap-5">
          <div>
            <p className="eyebrow text-amber">{title}</p>
            <p className="copy mt-2 max-w-[68ch] text-ink/80">{body}</p>
          </div>
          <ArrowButton href="/contact" variant="dark" className="self-start">
            Click here!
          </ArrowButton>
        </div>
      </div>
    </Reveal>
  );
}
