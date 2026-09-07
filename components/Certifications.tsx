import Image from "next/image";
import { MotionCard } from "@/components/motion/Reveal";

export default function Certifications() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MotionCard i={0} className="overflow-hidden rounded-[24px] border border-line bg-soft">
        <div className="relative h-48 w-full md:h-56">
          <Image
            src="/images/about/evvo.jpg"
            alt="EVVO certification for Sunlife Traders"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
        <div className="p-6">
          <h3 className="display-kicker">EVVO Certification: Ensuring the Highest Standards</h3>
          <p className="copy mt-3 text-muted">
            Certified by EVVO (2023–2025), we are committed to delivering premium solar installations. Our
            certification guarantees safety, reliability, and efficiency, giving you peace of mind while harnessing
            solar energy.
          </p>
        </div>
      </MotionCard>
      <MotionCard i={1} className="overflow-hidden rounded-[24px] border border-line bg-soft">
        <div className="relative grid h-48 place-items-center bg-white md:h-56">
          <Image
            src="/images/about/mnre.png"
            alt="MNRE registered vendor badge"
            width={180}
            height={180}
            className="h-32 w-auto object-contain"
          />
        </div>
        <div className="p-6">
          <h3 className="display-kicker">MNRE Registered Vendor: Government-Approved Solar Solutions</h3>
          <p className="copy mt-3 text-muted">
            Proudly recognized as an MNRE Registered Vendor, we offer government-approved solar solutions that
            ensure quality and sustainability. Trust us to help you achieve significant energy savings and make a
            positive impact on the environment.
          </p>
        </div>
      </MotionCard>
    </div>
  );
}
