import Link from "next/link";

export default function PageBreadcrumb({
  items,
  light = false,
}: {
  items: { href?: string; label: string }[];
  light?: boolean;
}) {
  return (
    <nav
      className={`eyebrow mb-6 flex flex-wrap items-center gap-1.5 ${light ? "text-white/55" : "text-ink/45"}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
          {i > 0 ? <span>/</span> : null}
          {item.href ? (
            <Link href={item.href} className={`transition ${light ? "hover:text-white" : "hover:text-ink"}`}>
              {item.label}
            </Link>
          ) : (
            <span className={light ? "text-white" : "text-ink/80"}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
