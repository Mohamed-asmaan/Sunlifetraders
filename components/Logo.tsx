import Link from "next/link";

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Sunlife">
      <img
        src="/images/brand/mark.png"
        alt=""
        width={40}
        height={40}
        className="h-[34px] w-[34px] object-contain"
      />
      <span
        className={`${light ? "text-white" : "text-ink"}`}
        style={{
          fontFamily: "var(--font-host), sans-serif",
          fontWeight: 600,
          fontSize: 19,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          fontFeatureSettings: '"blwf", "cv03", "cv04", "cv09", "cv11"',
        }}
      >
        Sunlife Traders<span style={{ color: "var(--amber)" }}>{" "}LLP</span>
      </span>
    </Link>
  );
}
