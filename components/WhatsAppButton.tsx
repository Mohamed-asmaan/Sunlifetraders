import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { site } from "@/lib/data";

export default function WhatsAppButton({
  href = site.company.whatsappHref,
  children = "WhatsApp an engineer",
  variant = "onLight",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  variant?: "onLight" | "onDark" | "solid";
  className?: string;
}) {
  const styles = {
    onLight:
      "border border-line bg-white text-ink hover:border-amber/40",
    onDark: "border border-white/20 bg-white/10 text-white hover:bg-white/20",
    solid: "bg-[#25D366] text-white hover:bg-[#20b858]",
  }[variant];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`ui inline-flex items-center gap-2 rounded-xl px-4 py-[9px] transition ${styles} ${className}`}
    >
      <WhatsAppIcon size={16} />
      {children}
    </Link>
  );
}
