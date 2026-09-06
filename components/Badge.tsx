export default function Badge({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow mb-4 inline-flex items-center gap-2 ${light ? "!text-white" : ""}`}>
      <span className={light ? "text-white/35" : "text-[#111]/30"}>/</span>
      <span>{children}</span>
    </div>
  );
}
